import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Terminal } from "lucide-react";
import { LoginButton } from "@/components/login-button";

export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-b from-background to-secondary/20">
      <div className="w-full max-w-md space-y-8">
        {/* Terminal-like header */}
        <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
          <div className="flex h-8 items-center border-b px-4">
            <div className="flex space-x-2">
              <div className="h-2 w-2 rounded-full bg-red-500" />
              <div className="h-2 w-2 rounded-full bg-yellow-500" />
              <div className="h-2 w-2 rounded-full bg-green-500" />
            </div>
          </div>
          <div className="p-4 font-mono text-sm text-muted-foreground">
            <p className="flex items-center gap-2">
              <Terminal className="h-4 w-4" />
              <span className="text-green-500">~/</span> loading your recent
              builds...
            </p>
          </div>
        </div>

        {/* Login card */}
        <Card className="border-2">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold">welcome</CardTitle>
            <CardDescription>get more out of your profile.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              <LoginButton />
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-background px-2 text-muted-foreground">
                    MORE INFORMATION
                  </span>
                </div>
              </div>
              <div className="text-xs text-muted-foreground">
                <p className="font-mono">
                  share what you are building with the world.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <p className="text-center text-sm text-muted-foreground">
          <a href="#" className="underline hover:text-primary">
            open an issue
          </a>{" "}
          if you have any questions.
        </p>
      </div>
    </main>
  );
}
