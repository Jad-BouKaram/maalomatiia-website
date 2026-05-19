import type { ReactNode } from "react";
import ChevronRightIcon from "@/components/ui/icons/ChevronRightIcon";
import ScrollLink from "@/components/ui/ScrollLink";

interface CtaButtonProps {
  targetId: string;
  label: string;
  icon?: ReactNode;
}

export default function CtaButton({ targetId, label, icon }: CtaButtonProps) {
  return (
    <ScrollLink
      targetId={targetId}
      className="inline-flex items-center gap-2.5 rounded-full bg-gradient-to-r from-brand-teal to-brand-teal-dark px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-brand-teal/25 transition-transform hover:scale-[1.03] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-accent-glow"
    >
      {icon}
      {label}
      <ChevronRightIcon className="h-4 w-4" />
    </ScrollLink>
  );
}
