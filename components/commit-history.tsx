import { GitHubCommitMessage } from "@/lib/github";
import { Card } from "@/components/ui/card";
import { GitCommit } from "lucide-react";

const shortHash = (hash: string) => {
  return hash.slice(0, 7);
};

const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

export function CommitHistory({ commits }: { commits: GitHubCommitMessage[] }) {
  return (
    <div className="space-y-4 max-w-lg">
      {commits.map((commit) => (
        <Card key={commit.hash} className="flex items-start gap-4 p-4">
          <GitCommit className="mt-1 h-4 w-4 text-muted-foreground" />
          <div className="flex-1 space-y-1">
            <p className="font-medium text-wrap whitespace-pre-wrap">
              {commit.message}
            </p>
            <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
              <span>{shortHash(commit.hash)}</span>
              <span>•</span>
              <span>{commit.repository.name}</span>
              <span>•</span>
              <span>{formatDate(commit.date)}</span>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}
