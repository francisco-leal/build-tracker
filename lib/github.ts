"use server";

import { GraphQLClient, gql } from "graphql-request";

export async function fetchGitHubUsername(
  accessToken: string
): Promise<string> {
  const endpoint = "https://api.github.com/user";

  const headers = {
    Authorization: `Bearer ${accessToken}`,
    Accept: "application/vnd.github.v3+json",
  };

  const response = await fetch(endpoint, { headers });

  if (!response.ok) {
    throw new Error("Failed to fetch GitHub user data.");
  }

  const data: { login: string } = await response.json();
  return data.login;
}

export async function fetchTotalCommits(
  username: string,
  accessToken: string
): Promise<number> {
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
        }
      }
    }
  `;

  // fetch from past 7 days
  const fromDate = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString();
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

    return user.contributionsCollection.totalCommitContributions;
  } catch (error) {
    console.error("Error fetching commits:", error);
    throw new Error("Failed to fetch commit data.");
  }
}
