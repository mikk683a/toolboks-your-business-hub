import { Camera, Mail, MessageCircle, MessageSquare } from "lucide-react";

/** Own colour and shape per channel. Generic icons, no brand logos. */
export const CHANNELS = {
  email: {
    label: "E-mail",
    Icon: Mail,
    chip: "bg-[hsl(217_91%_58%)] text-white rounded-md",
    soft: "bg-[hsl(217_91%_58%/0.12)] text-[hsl(217_91%_45%)]",
    line: "hsl(217 91% 58%)",
  },
  sms: {
    label: "SMS",
    Icon: MessageSquare,
    chip: "bg-[hsl(152_60%_38%)] text-white rounded-lg",
    soft: "bg-[hsl(152_60%_38%/0.12)] text-[hsl(152_60%_30%)]",
    line: "hsl(152 60% 38%)",
  },
  messenger: {
    label: "Messenger",
    Icon: MessageCircle,
    chip: "bg-[hsl(262_83%_58%)] text-white rounded-full",
    soft: "bg-[hsl(262_83%_58%/0.12)] text-[hsl(262_70%_48%)]",
    line: "hsl(262 83% 58%)",
  },
  instagram: {
    label: "Instagram",
    Icon: Camera,
    chip: "bg-gradient-to-tr from-[hsl(38_92%_52%)] to-[hsl(330_81%_55%)] text-white rounded-xl",
    soft: "bg-[hsl(330_81%_55%/0.12)] text-[hsl(330_70%_45%)]",
    line: "hsl(330 81% 55%)",
  },
} as const;

export type ChannelKey = keyof typeof CHANNELS;
