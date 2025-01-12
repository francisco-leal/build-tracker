// app/profile/page.jsx

import { getServerSession } from "next-auth";
import { authOptions } from "@/config/auth-options";
import { redirect } from "next/navigation";
import {
  Activity,
  Calendar,
  Github,
  LinkIcon,
  MapPin,
  Star,
  Timer,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";

export default async function ProfilePage() {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    redirect("/");
  }

  const { name, image } = session.user;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gradient-to-b from-background to-secondary/20">
      {/* Header */}
      <header className="border-b">
        <div className="container py-6">
          <div className="flex items-center gap-4">
            <Avatar className="h-24 w-24">
              <AvatarImage src={image || ""} />
              <AvatarFallback>{name?.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <h1 className="text-2xl font-bold">{name}</h1>
              <p className="text-muted-foreground">Senior Software Engineer</p>
              <div className="mt-2 flex flex-wrap gap-4 text-sm text-muted-foreground">
                <span className="flex items-center gap-1">
                  <MapPin className="h-4 w-4" />
                  San Francisco, CA
                </span>
                <span className="flex items-center gap-1">
                  <LinkIcon className="h-4 w-4" />
                  <a href="#" className="hover:text-primary">
                    jane.dev
                  </a>
                </span>
                <span className="flex items-center gap-1">
                  <Github className="h-4 w-4" />
                  <a href="#" className="hover:text-primary">
                    @janedev
                  </a>
                </span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container py-6">
        <div className="flex flex-col items-center justify-center gap-6">
          <div className="space-y-6">
            {/* Stats */}
            <div className="flex gap-4">
              <Card>
                <CardHeader>
                  <CardTitle>Top Repositories</CardTitle>
                  <CardDescription>
                    Most contributed to projects
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {[
                    {
                      name: "awesome-project",
                      stars: 1234,
                      lang: "TypeScript",
                    },
                    { name: "cool-lib", stars: 567, lang: "Rust" },
                    { name: "dev-tools", stars: 89, lang: "Python" },
                  ].map((repo) => (
                    <div
                      key={repo.name}
                      className="flex items-center justify-between gap-4"
                    >
                      <div className="space-y-1">
                        <p className="font-medium">{repo.name}</p>
                        <div className="flex items-center gap-2">
                          <Badge variant="secondary" className="text-xs">
                            {repo.lang}
                          </Badge>
                          <span className="flex items-center text-sm text-muted-foreground">
                            <Star className="mr-1 h-3 w-3" />
                            {repo.stars}
                          </span>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm">
                        View
                      </Button>
                    </div>
                  ))}
                </CardContent>
              </Card>
              <div className="flex flex-col gap-4">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 gap-4">
                    <CardTitle className="text-sm font-medium">
                      Total Commits
                    </CardTitle>
                    <Activity className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">2,543</div>
                    <p className="text-xs text-muted-foreground">
                      +123 this month
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 gap-4">
                    <CardTitle className="text-sm font-medium">
                      Contributions
                    </CardTitle>
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">365</div>
                    <p className="text-xs text-muted-foreground">
                      Current streak
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 gap-4">
                    <CardTitle className="text-sm font-medium">
                      Code Time
                    </CardTitle>
                    <Timer className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">32.5h</div>
                    <p className="text-xs text-muted-foreground">This week</p>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Tabs */}
            <Tabs defaultValue="commits" className="space-y-4">
              <TabsList>
                <TabsTrigger value="commits">Commit History</TabsTrigger>
                <TabsTrigger value="changelog">Changelog</TabsTrigger>
              </TabsList>
              <TabsContent value="commits" className="space-y-4">
                {/* <CommitHistory /> */}
                <p>Commit History</p>
              </TabsContent>
              <TabsContent value="changelog" className="space-y-4">
                {/* <Changelog /> */}
                <p>Changelog</p>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
    </div>
  );
}
