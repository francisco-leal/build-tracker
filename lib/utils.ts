import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { GitHubContributionType } from "@/lib/github";

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

  return maxStreak;
};
