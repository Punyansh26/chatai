"use client";
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Field, FieldDescription, FieldGroup, FieldLabel, FieldSeparator } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useState } from "react";

import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import Link from "next/link";
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { OctagonAlertIcon } from "lucide-react"
import { Alert } from "@/components/ui/alert";
import { Spinner } from "@/components/ui/spinner";
import { useForm } from "react-hook-form"
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import path from "path";



const SOCIALS = [
    {
        label: "Apple",
        path: "M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701",
    },
    {
        label: "Google",
        path: "M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z",
    },
    {
        label: "Meta",
        path: "M6.915 4.03c-1.968 0-3.683 1.28-4.871 3.113C.704 9.208 0 11.883 0 14.449c0 .706.07 1.369.21 1.973a6.624 6.624 0 0 0 .265.86 5.297 5.297 0 0 0 .371.761c.696 1.159 1.818 1.927 3.593 1.927 1.497 0 2.633-.671 3.965-2.444.76-1.012 1.144-1.626 2.663-4.32l.756-1.339.186-.325c.061.1.121.196.183.3l2.152 3.595c.724 1.21 1.665 2.556 2.47 3.314 1.046.987 1.992 1.22 3.06 1.22 1.075 0 1.876-.355 2.455-.843a3.743 3.743 0 0 0 .81-.973c.542-.939.861-2.127.861-3.745 0-2.72-.681-5.357-2.084-7.45-1.282-1.912-2.957-2.93-4.716-2.93-1.047 0-2.088.467-3.053 1.308-.652.57-1.257 1.29-1.82 2.05-.69-.875-1.335-1.547-1.958-2.056-1.182-.966-2.315-1.303-3.454-1.303zm10.16 2.053c1.147 0 2.188.758 2.992 1.999 1.132 1.748 1.647 4.195 1.647 6.4 0 1.548-.368 2.9-1.839 2.9-.58 0-1.027-.23-1.664-1.004-.496-.601-1.343-1.878-2.832-4.358l-.617-1.028a44.908 44.908 0 0 0-1.255-1.98c.07-.109.141-.224.211-.327 1.12-1.667 2.118-2.602 3.358-2.602zm-10.201.553c1.265 0 2.058.791 2.675 1.446.307.327.737.871 1.234 1.579l-1.02 1.566c-.757 1.163-1.882 3.017-2.837 4.338-1.191 1.649-1.81 1.817-2.486 1.817-.524 0-1.038-.237-1.383-.794-.263-.426-.464-1.13-.464-2.046 0-2.221.63-4.535 1.66-6.088.454-.687.964-1.226 1.533-1.533a2.264 2.264 0 0 1 1.088-.285z",
    },
]

const formSchema = z.object({
    name: z.string().min(1, { message: "Name is required" }),
    email: z.email(),
    password: z.string().min(6, { message: "Password is required" }).max(100),
    confirmPassword: z.string().min(6, { message: "Confirm Password is required" }).max(100),
})

.refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"]
});

export const SignUpViews = () => {
    console.log("Sign Up Views");
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            email: "",
            password: "",
            confirmPassword: "",
        },
    });
    const router = useRouter();
    const [error, seterror] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const onSubmit = (data: z.infer<typeof formSchema>) => {
        seterror(null);
        setLoading(true);

        authClient.signUp.email({
            name: data.name,
            email: data.email,
            password: data.password,
        },
            {
                onSuccess: () => {
                    setLoading(false);
                    router.push("/dashboard");
                },
                onError: ({ error }) => {
                    setLoading(false);
                    console.error("Error signing up:", error);
                    seterror(error.message || "An error occurred while signing up.");
                }
            },
        );
    }


    return (
        <div
            className={cn("relative min-h-svh overflow-hidden flex items-center justify-center")}
            style={{ background: "linear-gradient(135deg, #0a0015 0%, #12002a 40%, #0d001f 70%, #180030 100%)" }}

        >
            {/* ── Animated background orbs ─────────────────── */}
            <div className="pointer-events-none absolute inset-0 overflow-hidden">
                <div
                    className="animate-float absolute -top-40 -left-40 h-112 w-md rounded-full blur-3xl opacity-25"
                    style={{ background: "radial-gradient(circle, #7c3aed, transparent 70%)" }}
                />
                <div
                    className="animate-float-delayed absolute -right-48 top-1/4 h-136 w-136 rounded-full blur-3xl opacity-20"
                    style={{ background: "radial-gradient(circle, #9333ea, transparent 70%)" }}
                />
                <div
                    className="animate-float-slow absolute -bottom-48 left-1/3 h-80 w-80 rounded-full blur-3xl opacity-20"
                    style={{ background: "radial-gradient(circle, #6d28d9, transparent 70%)" }}
                />
                <div
                    className="animate-float absolute left-1/4 top-2/3 h-56 w-56 rounded-full blur-2xl opacity-15"
                    style={{ background: "radial-gradient(circle, #a855f7, transparent 70%)" }}
                />
            </div>

            {/* ── Subtle dot grid ──────────────────────────── */}
            <div
                className="pointer-events-none absolute inset-0 opacity-[0.04]"
                style={{
                    backgroundImage:
                        "radial-gradient(rgba(168,85,247,0.8) 1px, transparent 1px)",
                    backgroundSize: "32px 32px",
                }}
            />

            {/* ── Card ─────────────────────────────────────── */}
            <div className="animate-fade-in-up relative z-10 w-full h-full max-w-4xl px-4 p-1  sm:px-6 lg:px-8">
                <Card
                    className="overflow-hidden border border-purple-500/20 bg-white/3 backdrop-blur-2xl"
                    style={{ boxShadow: "0 30px 60px rgba(109,40,217,0.35), 0 0 0 1px rgba(168,85,247,0.08)" }}
                >
                    <CardContent className="grid p-0 m-0 md:grid-cols-2">

                        {/* ── Left: Form ─────────────────────────── */}
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col justify-center p-4 md:p-10">
                                <FieldGroup>

                                    {/* Header */}
                                    <div className="mb-2 flex flex-col items-center gap-4 text-center">
                                        <div>
                                            <h1
                                                className="text-3xl font-bold tracking-tight"
                                                style={{
                                                    background: "linear-gradient(135deg, #ffffff 30%, #c4b5fd)",
                                                    WebkitBackgroundClip: "text",
                                                    WebkitTextFillColor: "transparent",
                                                }}
                                            >
                                                Create an account
                                            </h1>
                                            <p className="mt-1.5 text-sm text-purple-100/60">
                                                Sign up for your Chat AI account
                                            </p>
                                        </div>
                                    </div>

                                    <FormField
                                        control={form.control}
                                        name="name"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FieldLabel htmlFor="name" className="text-sm font-medium text-purple-100/80">Name</FieldLabel>
                                                <FormControl>
                                                    <Input
                                                        id="name"
                                                        type="text"
                                                        placeholder="John Doe"
                                                        className="input-glow border-purple-700/40 bg-purple-950/50 text-purple-100 placeholder:text-purple-100/50 transition-all duration-300 focus:border-purple-500/70"
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="email"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FieldLabel htmlFor="email" className="text-sm font-medium text-purple-100/80">Email</FieldLabel>
                                                <FormControl>
                                                    <Input
                                                        id="email"
                                                        type="email"
                                                        placeholder="you@example.com"
                                                        className="input-glow border-purple-700/40 bg-purple-950/50 text-purple-100 placeholder:text-purple-100/50 transition-all duration-300 focus:border-purple-500/70"
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="password"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FieldLabel htmlFor="password" className="text-sm font-medium text-purple-100/80">Password</FieldLabel>
                                                <FormControl>
                                                    <Input
                                                        id="password"
                                                        type="password"
                                                        placeholder="••••••••"
                                                        className="input-glow border-purple-700/40 bg-purple-950/50 text-purple-100 placeholder:text-purple-100/50 transition-all duration-300 focus:border-purple-500/70"
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="confirmPassword"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FieldLabel htmlFor="confirmPassword" className="text-sm font-medium text-purple-100/80">Confirm Password</FieldLabel>
                                                <FormControl>
                                                    <Input
                                                        id="confirmPassword"
                                                        type="password"
                                                        placeholder="••••••••"
                                                        className="input-glow border-purple-700/40 bg-purple-950/50 text-purple-100 placeholder:text-purple-100/50 transition-all duration-300 focus:border-purple-500/70"
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    {!!error && (
                                        <Alert variant="destructive" className=" mt-2">
                                            <OctagonAlertIcon className="h-4 w-4 text-destructive!" />
                                            <span>{error}</span>
                                        </Alert>
                                    )}





                                    <Field>
                                        <Button
                                            type="submit"
                                            disabled={loading}
                                            className="btn-shimmer w-full font-semibold text-white transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed disabled:scale-100"
                                            style={{ boxShadow: "0 4px 22px rgba(124,58,237,0.45)" }}
                                        >
                                            {loading ? <><Spinner className="mr-2" />Signing up...</> : "Sign Up"}
                                        </Button>
                                    </Field>

                                    <FieldSeparator className="*:data-[slot=field-separator-content]:bg-[#170A2F] text-xs text-purple-100/50">
                                        Or continue with
                                    </FieldSeparator>

                                    <Field className="grid grid-cols-3 gap-3">
                                        {SOCIALS.map((s) => (
                                            <Button
                                                key={s.label}
                                                variant="outline"
                                                type="button"
                                                className="border-purple-600/30 bg-purple-950/30 text-purple-300/70 transition-all duration-300 hover:scale-105 hover:border-purple-500/50 hover:bg-purple-800/30 hover:text-purple-100"
                                                style={{ boxShadow: "0 2px 10px rgba(109,40,217,0.15)" }}
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="h-4 w-4">
                                                    <path d={s.path} fill="currentColor" />
                                                </svg>
                                                <span className="sr-only">Login with {s.label}</span>
                                            </Button>
                                        ))}
                                    </Field>

                                    <FieldDescription className="text-center text-xs text-purple-100/60">
                                        Already have an account?{" "}
                                        <Link href="/sign-in" className="font-medium text-purple-100 underline-offset-2 transition-colors duration-200 hover:text-purple-100 hover:underline">
                                            Sign in
                                        </Link>
                                    </FieldDescription>

                                </FieldGroup>
                            </form>
                        </Form>

                        {/* ── Right: Visual panel ─────────────────── */}
                        <div
                            className="relative hidden flex-col items-center justify-center overflow-hidden p-10 md:flex"
                            style={{ background: "linear-gradient(145deg, rgba(124,58,237,0.18) 0%, rgba(109,40,217,0.28) 50%, rgba(76,29,149,0.38) 100%)" }}
                        >
                            {/* Inner glow orbs */}
                            <div
                                className="animate-float pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full blur-3xl opacity-30"
                                style={{ background: "radial-gradient(circle, #a78bfa, transparent)" }}
                            />
                            <div
                                className="animate-float-delayed pointer-events-none absolute -bottom-16 -left-16 h-64 w-64 rounded-full blur-3xl opacity-25"
                                style={{ background: "radial-gradient(circle, #7c3aed, transparent)" }}
                            />

                            {/* Border glow top */}
                            <div className="pointer-events-none absolute inset-y-0 left-0 w-px bg-linear-to-b from-transparent via-purple-500/30 to-transparent" />

                            <div className="relative z-10 flex flex-col items-center gap-7 text-center">
                                {/* Logo */}
                                <div
                                    className="h-20 w-20 overflow-hidden rounded-3xl"
                                    style={{ boxShadow: "0 20px 50px rgba(124,58,237,0.6), 0 0 0 1px rgba(168,85,247,0.2)" }}
                                >
                                    <img
                                        src="/images/logoipsum-338.svg"
                                        alt="Logo"
                                        className="h-full object-cover "
                                    />
                                </div>

                                <div>
                                    <h2
                                        className="text-2xl font-bold tracking-tight"
                                        style={{
                                            background: "linear-gradient(135deg, #ffffff, #e9d5ff)",
                                            WebkitBackgroundClip: "text",
                                            WebkitTextFillColor: "transparent",
                                        }}
                                    >
                                        Chat AI
                                    </h2>
                                    <p className="mt-2 text-sm leading-relaxed text-purple-300/60">
                                        Your intelligent assistant,<br />available around the clock.
                                    </p>
                                </div>

                                {/* Feature pills */}
                                <div className="flex w-full flex-col gap-2.5">
                                    {["Smart Conversations", "Real-time Responses", "Privacy First"].map((f, i) => (
                                        <div
                                            key={f}
                                            className="flex items-center gap-3 rounded-xl border border-purple-500/15 bg-white/4 px-4 py-3 backdrop-blur-sm transition-all duration-300 hover:border-purple-400/25 hover:bg-white/[0.07]"
                                            style={{ animationDelay: `${i * 0.1}s` }}
                                        >
                                            <div
                                                className="h-2 w-2 shrink-0 rounded-full"
                                                style={{ background: "linear-gradient(135deg, #a855f7, #7c3aed)", boxShadow: "0 0 8px rgba(168,85,247,0.7)" }}
                                            />
                                            <span className="text-xs font-medium text-purple-200/75">{f}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                    </CardContent>
                </Card>

                <FieldDescription className="mt-10 p-2 text-center text-xs text-purple-100/50">
                    By signing up you agree to our{" "}
                    <a href="#" className="text-purple-100/70 underline-offset-2 transition-colors hover:text-purple-400 hover:underline">Terms of Service</a>
                    {" "}and{" "}
                    <a href="#" className="text-purple-100/70 underline-offset-2 transition-colors hover:text-purple-400 hover:underline">Privacy Policy</a>.
                </FieldDescription>
            </div>
        </div>
    );
};