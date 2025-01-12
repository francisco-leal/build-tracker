"use client";

import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";
import { Github } from "lucide-react";

export const LoginButton = () => {
  return (
    <Button
      variant="outline"
      className="hover:border-[#2DA44E] hover:bg-[#2DA44E]/10 hover:text-[#2DA44E]"
      onClick={() => signIn("github")}
    >
      <Github className="mr-2 h-5 w-5" />
      continue with github
    </Button>
  );
};
