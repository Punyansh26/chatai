import {createAvatar} from "@dicebear/core";
import {botttsNeutral, initials} from "@dicebear/collection";

import {cn} from "@/lib/utils";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";

interface GeneratedAvatarProps {
    seed: string;
    className?: string;
    variant?: "botttsNeutral" | "initials";
}

export const GeneratedAvatar = ({ seed, className, variant = "botttsNeutral" }: GeneratedAvatarProps) => {
    const avatarSvg = variant === "botttsNeutral"
        ? createAvatar(botttsNeutral, { seed, size: 24, scale: 90 }).toString()
        : createAvatar(initials, { seed, size: 24, scale: 90, fontSize: 50, fontWeight: 700 }).toString();

    const svgBase64 = btoa(unescape(encodeURIComponent(avatarSvg)));

    return (
        <Avatar className={cn("h-8 w-8", className)}>
            <AvatarImage src={`data:image/svg+xml;base64,${svgBase64}`} alt="Generated Avatar" />
            <AvatarFallback>{seed.charAt(0).toUpperCase()}</AvatarFallback>
        </Avatar>
    );
};