"use client";
import { UserButton, useUser, SignedIn, SignedOut, SignInButton } from "@clerk/nextjs";

export default function Profile04() {
  const { user } = useUser();

  return (
    <div className="p-8 flex flex-col items-center">
      <h1 className="text-2xl font-bold mb-4">Your Profile</h1>
      <SignedIn>
        <UserButton afterSignOutUrl="/" appearance={{ elements: { userButtonPopoverCard: { width: '350px' } } }} />
        <div className="mt-6 text-lg">
          <p><strong>Name:</strong> {user?.fullName}</p>
          <p><strong>Email:</strong> {user?.primaryEmailAddress?.emailAddress}</p>
        </div>
      </SignedIn>
      <SignedOut>
        <p className="mb-4">Please sign in to view your profile.</p>
        <SignInButton mode="modal">
          <button className="px-4 py-2 bg-blue-600 text-white rounded">Sign In</button>
        </SignInButton>
      </SignedOut>
    </div>
  );
} 