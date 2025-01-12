"use server";

import { GraphQLClient, gql } from "graphql-request";
import { unstable_cache } from "next/cache";
import { CACHE_5_MINUTES } from "./constants";
import { CacheKey } from "@/types/cache-key";

export type GitHubUserProfile = {
  login: string;
  name: string;
  avatar_url: string;
  html_url: string;
  company: string;
  blog: string;
  location: string;
  bio: string;
  public_repos: number;
  public_gists: number;
  followers: number;
  following: number;
  total_private_repos: number;
  plan: {
    name: string;
    space: number;
    private_repos: number;
  };
};

export type GitHubContributionType = {
  contributionCalendar: {
    totalContributions: number;
    colors: string[];
    weeks: {
      contributionDays: {
        contributionCount: number;
        date: string;
      }[];
    }[];
  };
  totalCommitContributions: number;
};

export type GitHubCommitMessage = {
  message: string;
  date: string;
  repository: string;
  hash: string;
};

export const fetchCachedGitHubUserProfile: (
  accessToken: string
) => Promise<GitHubUserProfile> = async (accessToken: string) => {
  return unstable_cache(
    async (accessToken: string): Promise<GitHubUserProfile> => {
      return await fetchGitHubUserProfile(accessToken);
    },
    [`github-profile-${accessToken}`] as CacheKey[],
    {
      revalidate: CACHE_5_MINUTES,
    }
  )(accessToken);
};

export async function fetchGitHubUserProfile(
  accessToken: string
): Promise<GitHubUserProfile> {
  const endpoint = "https://api.github.com/user";

  const headers = {
    Authorization: `Bearer ${accessToken}`,
    Accept: "application/vnd.github.v3+json",
  };

  const response = await fetch(endpoint, { headers });

  if (!response.ok) {
    throw new Error("Failed to fetch GitHub user data.");
  }

  const data: GitHubUserProfile = await response.json();
  return data;
}

export const fetchCachedGitHubContributionCalendar: (
  username: string,
  accessToken: string
) => Promise<GitHubContributionType> = async (
  username: string,
  accessToken: string
) => {
  return unstable_cache(
    async (
      username: string,
      accessToken: string
    ): Promise<GitHubContributionType> => {
      return await fetchGitHubContributionCalendar(username, accessToken);
    },
    [`github-total-commits-${username}`] as CacheKey[],
    {
      revalidate: CACHE_5_MINUTES,
    }
  )(username, accessToken);
};

export async function fetchGitHubContributionCalendar(
  username: string,
  accessToken: string
): Promise<GitHubContributionType> {
  const endpoint = "https://api.github.com/graphql";
  const graphQLClient = new GraphQLClient(endpoint, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  const query = gql`
    query ($username: String!, $from: DateTime!, $to: DateTime!) {
      rateLimit {
        limit
        cost
        remaining
        resetAt
      }
      user(login: $username) {
        contributionsCollection(from: $from, to: $to) {
          totalCommitContributions
          totalPullRequestContributions
          totalPullRequestReviewContributions
          totalRepositoriesWithContributedCommits
          contributionCalendar {
            totalContributions
            colors
            weeks {
              contributionDays {
                contributionCount
                date
              }
            }
          }
        }
      }
    }
  `;

  const fromDate = new Date(
    Date.now() - 365 * 24 * 60 * 60 * 1000
  ).toISOString();
  const toDate = new Date().toISOString();

  const variables = {
    username,
    from: fromDate,
    to: toDate,
  };

  try {
    const data = await graphQLClient.request<{
      rateLimit: {
        limit: number;
        cost: number;
        remaining: number;
        resetAt: string;
      };
      user: {
        contributionsCollection: {
          totalCommitContributions: number;
          totalPullRequestContributions: number;
          totalPullRequestReviewContributions: number;
          totalRepositoriesWithContributedCommits: number;
          contributionCalendar: {
            totalContributions: number;
            colors: string[];
            weeks: {
              contributionDays: {
                contributionCount: number;
                date: string;
              }[];
            }[];
            months: {
              firstDay: string;
              totalWeeks: number;
            }[];
          };
        };
      };
    }>(query, variables);

    const { rateLimit, user } = data;

    console.log(`Rate Limit: ${rateLimit.remaining}/${rateLimit.limit}`);

    if (rateLimit.remaining < 10) {
      // Example threshold
      console.warn("Approaching GitHub API rate limit.");
      // Implement logic to handle rate limiting if necessary
    }

    return user.contributionsCollection;
  } catch (error) {
    console.error("Error fetching commits:", error);
    throw new Error("Failed to fetch commit data.");
  }
}

export const fetchCachedGitHubCommitMessages: (
  username: string,
  accessToken: string
) => Promise<GitHubCommitMessage[]> = async (
  username: string,
  accessToken: string
) => {
  return unstable_cache(
    async (
      username: string,
      accessToken: string
    ): Promise<GitHubCommitMessage[]> => {
      return await fetchGitHubCommitMessages(username, accessToken);
    },
    [`github-commit-messages-${username}`] as CacheKey[],
    {
      revalidate: CACHE_5_MINUTES,
    }
  )(username, accessToken);
};

export const fetchGitHubCommitMessages = async (
  username: string,
  accessToken: string
) => {
  // past 7 days
  const since = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString();

  const query = `author:${username} author-date:>${since}`;
  const url = `https://api.github.com/search/commits?q=${encodeURIComponent(
    query
  )}&sort=author-date-desc`;

  const response = await fetch(url, {
    headers: {
      Accept: "application/vnd.github.cloak-preview", // Required for commit search
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!response.ok) {
    const errorBody = await response.text();
    throw new Error(
      `GitHub API error: ${response.status} ${response.statusText} - ${errorBody}`
    );
  }

  const data = await response.json();

  // Extract commit messages
  const commitMessages: GitHubCommitMessage[] = data.items.map((item: any) => {
    return {
      message: item.commit.message,
      date: item.commit.author.date,
      repository: item.repository.name,
      hash: item.sha,
    };
  });

  return commitMessages;
};
