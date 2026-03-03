"use client";

import { Card, CardContent } from "@/components/ui/card";
import { use } from "react";

export const SignInViews = () => {
    console.log("Sign In Views");
    return (
        <div className="flex flex-col gap-6">
            <Card className="overflowhidden p-0">
                <CardContent className="grid p-0 md:grid-cols-2">
                    <form>col1</form>
                    <div className="backround-radial">col2</div>
                </CardContent>
            </Card>
        </div>
    );
};