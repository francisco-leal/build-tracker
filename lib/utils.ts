import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { GitHubCommitMessage, GitHubContributionType } from "@/lib/github";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const ensureValidURL = (url: string) => {
  if (!url.startsWith("http://") && !url.startsWith("https://")) {
    return `https://${url}`;
  }
  return url;
};

export const calculateStreak = ({
  contributionCalendar,
}: GitHubContributionType) => {
  const weeks = contributionCalendar.weeks;
  let currentStreak = 0;
  let maxStreak = 0;

  for (const week of weeks) {
    const hasContribution = week.contributionDays.some(
      (day) => day.contributionCount > 0
    );

    if (hasContribution) {
      currentStreak += 1;

      if (currentStreak > maxStreak) {
        maxStreak = currentStreak;
      }
    } else {
      currentStreak = 0;
    }
  }

  return { maxStreak, currentStreak };
};

export const getListOfRepositories = (commits: GitHubCommitMessage[]) => {
  const repos = commits.map((commit) => commit.repository);
  const repoMap: Map<
    string,
    { repository: { name: string; owner: { login: string } }; count: number }
  > = new Map();

  for (const repo of repos) {
    const repoName = repo.name;

    if (repoMap.has(repoName)) {
      // If the repository name already exists in the map, increment its count
      const existingRepo = repoMap.get(repoName)!;
      existingRepo.count += 1;
      // Optionally, you can decide which repository data to keep (first occurrence, last, etc.)
      // For example, to keep the first occurrence, do nothing
      // To keep the latest, you can update the repository data here
    } else {
      // If the repository name does not exist, add it to the map with a count of 1
      repoMap.set(repoName, { repository: repo, count: 1 });
    }
  }

  // Convert the Map values to an array and return
  return Array.from(repoMap.values());
};
