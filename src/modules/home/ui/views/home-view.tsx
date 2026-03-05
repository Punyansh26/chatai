"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import { session } from "@/db/schema";


export const HomeViwe = () => {
    const { data: session } = authClient.useSession();
    const router = useRouter();
    if (!session) {
        return (
            <div className="flex flex-col p-4 gap-y-4">
                <p>Not logged in</p>
                <Button onClick={() => authClient.signIn.social({ provider: "github", callbackURL: "/" })}>Sign In with GitHub</Button>
                <Button onClick={() => authClient.signIn.social({ provider: "google", callbackURL: "/" })}>Sign In with Google</Button>
            </div>
        )
    }
    return (
        <div className="flex flex-col p-4 gap-y-4">
            <p>logged in as {session.user.name}</p>
            <Button onClick={() => authClient.signOut({ fetchOptions: { onSuccess: () => router.push("/sign-in") } })}>Sign Out</Button>
        </div>
    )
};

