// app/profile/page.jsx

import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

export default async function ProfilePage() {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    redirect("/");
  }

  return (
    <div>
      <h1>Your Profile</h1>
      <p>Welcome, {session.user.name}!</p>
    </div>
  );
}
