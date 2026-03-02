"use client";

import { useState } from "react";
import { authClient } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function Home() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);


    const {
        data: session,
        refetch: refetchSession,
    } = authClient.useSession();

    const onSubmit = async () => {
        const normalizedName = name.trim();
        const normalizedEmail = email.trim().toLowerCase();

        if (!normalizedName || !normalizedEmail || !password) {
            window.alert("Please fill in name, email, and password.");
            return;
        }

        if (password.length < 8) {
            window.alert("Password must be at least 8 characters.");
            return;
        }

        setLoading(true);
        const { error, data } = await authClient.signUp.email({
            name: normalizedName,
            email: normalizedEmail,
            password,
        });
        setLoading(false);

        if (error) {
            window.alert(`Error signing up: ${error.message}`);
            return;
        }

        const currentSession = await authClient.getSession();
        if (!currentSession.data?.session) {
            const { error: signInError } = await authClient.signIn.email({
                email: normalizedEmail,
                password,
            });

            if (signInError) {
                window.alert(`Signed up, but automatic sign in failed: ${signInError.message}`);
                return;
            }
        }

        await refetchSession();

        console.log("User signed up successfully:", data);
        window.alert("Sign up successful.");
    };

    const onLogin = async () => {
        const normalizedName = name.trim();
        const normalizedEmail = email.trim().toLowerCase();

        if (!normalizedName || !normalizedEmail || !password) {
            window.alert("Please fill in name, email, and password.");
            return;
        }

        if (password.length < 8) {
            window.alert("Password must be at least 8 characters.");
            return;
        }

        setLoading(true);
        const { error, data } = await authClient.signIn.email({
            email: normalizedEmail,
            password,
        });
        setLoading(false);

        if (error) {
            window.alert(`Error signing in: ${error.message}`);
            return;
        }

        const currentSession = await authClient.getSession();
        if (!currentSession.data?.session) {
            const { error: signInError } = await authClient.signIn.email({
                email: normalizedEmail,
                password,
            });

            if (signInError) {
                window.alert(`Signed in, but automatic session refresh failed: ${signInError.message}`);
                return;
            }
        }

        await refetchSession();

        console.log("User signed in successfully:", data);
        window.alert("Sign in successful.");
    };
    if (session) {
        return (
            <div className="mx-auto mt-10 flex w-full max-w-sm flex-col gap-4">
                <h1 className="text-2xl font-bold">Welcome, {session.user.name}!</h1>
                <p>Email: {session.user.email}</p>
                <Button
                    onClick={async () => {
                        await authClient.signOut();
                        await refetchSession();
                    }}
                >
                    Sign Out
                </Button>
            </div>
        );
    }
    return (
        <div>
            <div className="mx-auto mt-10 flex w-full max-w-sm flex-col gap-4">
                <Input placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
                <Input placeholder="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                <Input placeholder="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                <Button onClick={onSubmit} disabled={loading}>
                    {loading ? "Signing up..." : "Sign Up"}
                </Button>
            </div>
            <div className="mx-auto mt-10 flex w-full max-w-sm flex-col gap-4">
                <Input placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
                <Input placeholder="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                <Button onClick={onLogin} disabled={loading}>
                    {loading ? "Signing in..." : "Sign In"}
                </Button>
            </div>
        </div>
    );
}