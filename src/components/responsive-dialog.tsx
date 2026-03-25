"use client";

import { useEffect, useState } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import { Dialog, DialogContent, DialogTitle, DialogHeader, DialogDescription } from "@/components/ui/dialog";
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerDescription } from "@/components/ui/drawer";

interface ResponsiveDialogProps {
    open: boolean;
    description?: string;
    children: React.ReactNode;
    title: string;
    onOpenChange: (open: boolean) => void;
}

export const ResponsiveDialog: React.FC<ResponsiveDialogProps> = ({
    open,
    description,
    children,
    title,
    onOpenChange
}) => {
    const isMobile = useIsMobile();
    const [hasMounted, setHasMounted] = useState(false);

    useEffect(() => {
        setHasMounted(true);
    }, []);

    if (!hasMounted) {
        return null;
    }

    if (isMobile) {
        return (
            <Drawer key="mobile-drawer" open={open} onOpenChange={onOpenChange}>
                <DrawerContent className="border-t-primary/30 bg-gradient-to-b from-card to-background">
                    <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/60 to-transparent" />
                    <div className="absolute -top-32 left-1/2 -translate-x-1/2 h-64 w-64 rounded-full bg-primary/10 blur-3xl animate-glow-pulse" />
                    <DrawerHeader className="relative animate-dialog-content-slide">
                        <DrawerTitle className="text-lg font-semibold">
                            {title}
                        </DrawerTitle>
                        {description && (
                            <DrawerDescription className="text-muted-foreground/80">
                                {description}
                            </DrawerDescription>
                        )}
                    </DrawerHeader>
                    <div className="p-4 pt-2 animate-dialog-content-slide" style={{ animationDelay: "0.1s" }}>
                        {children}
                    </div>
                </DrawerContent>
            </Drawer>
        );
    }

    return (
        <Dialog key="desktop-dialog" open={open} onOpenChange={onOpenChange}>
            <DialogContent className="overflow-hidden border-primary/20 bg-gradient-to-br from-card via-card to-card/95 shadow-2xl shadow-primary/20 backdrop-blur-sm">
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/60 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
                <div className="absolute -top-32 -right-32 h-64 w-64 rounded-full bg-primary/10 blur-3xl animate-glow-pulse" />
                <div className="absolute -bottom-32 -left-32 h-64 w-64 rounded-full bg-primary/10 blur-3xl animate-glow-pulse" style={{ animationDelay: "1.5s" }} />
                <DialogHeader className="relative animate-dialog-content-slide">
                    <DialogTitle className="text-xl font-semibold">
                        {title}
                    </DialogTitle>
                    {description && (
                        <DialogDescription className="text-muted-foreground/80">
                            {description}
                        </DialogDescription>
                    )}
                </DialogHeader>
                <div className="relative animate-dialog-content-slide" style={{ animationDelay: "0.15s" }}>
                    {children}
                </div>
            </DialogContent>
        </Dialog>
    );
};