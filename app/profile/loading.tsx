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
import { Skeleton } from "@/components/ui/skeleton";

export default async function LoadingPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gradient-to-b from-background to-secondary/20">
      {/* Header */}
      <header className="border-b">
        <div className="container py-6">
          <div className="flex items-center gap-4">
            <Avatar className="h-24 w-24">
              <AvatarImage src={""} />
              <AvatarFallback>
                <Skeleton />
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <h1 className="text-2xl font-bold">
                <Skeleton className="h-6 w-32" />
              </h1>
              <Skeleton className="h-4 w-28 mt-2" />
              <div className="mt-2 flex flex-wrap gap-4 text-sm text-muted-foreground">
                <span className="flex items-center gap-1">
                  <MapPin className="h-4 w-4" />
                  <Skeleton className="h-4 w-20" />
                </span>
                <span className="flex items-center gap-1">
                  <LinkIcon className="h-4 w-4" />
                  <a href="#" className="hover:text-primary">
                    <Skeleton className="h-4 w-20" />
                  </a>
                </span>
                <span className="flex items-center gap-1">
                  <Github className="h-4 w-4" />
                  <a href="#" className="hover:text-primary">
                    <Skeleton className="h-4 w-20" />
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
                  {[{ name: 1 }, { name: 2 }, { name: 3 }].map((repo) => (
                    <div
                      key={`repo-${repo.name}`}
                      className="flex items-center justify-between gap-4"
                    >
                      <div className="space-y-1">
                        <Skeleton className="h-6 w-24" />
                        <div className="flex items-center gap-2">
                          <Badge variant="secondary" className="text-xs">
                            <div className="h-4 w-8" />
                          </Badge>
                          <span className="flex items-center text-sm text-muted-foreground">
                            <Star className="mr-1 h-3 w-3" />
                            <Skeleton className="h-4 w-8" />
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
                    <div className="text-2xl font-bold">
                      <Skeleton className="h-6 w-24" />
                    </div>
                    <Skeleton className="h-4 w-24 mt-2" />
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
                    <div className="text-2xl font-bold">
                      <Skeleton className="h-6 w-24" />
                    </div>
                    <Skeleton className="h-4 w-24 mt-2" />
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
                    {/* Add skeleton loader instead of text */}
                    <div className="text-2xl font-bold">
                      <Skeleton className="h-6 w-24" />
                    </div>
                    <Skeleton className="h-4 w-24 mt-2" />
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
