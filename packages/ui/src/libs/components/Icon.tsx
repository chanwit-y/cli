import React from "react";
import type { LucideIcon, LucideProps } from "lucide-react";
import type { BaseComponentProps } from "./@types";

export type IconProps = BaseComponentProps<
  "span",
  {
    icon: LucideIcon;
    size?: number | string;
    color?: string;
    strokeWidth?: number;
    className?: string;
  } & Omit<LucideProps, "size" | "color" | "strokeWidth">
>;

export const Icon: React.FC<IconProps> = ({
  icon: IconComponent,
  size = 24,
  color,
  strokeWidth = 2,
  className,
  ...props
}) => {
  return (
    <span className={className} {...props}>
      <IconComponent
        size={size}
        color={color}
        strokeWidth={strokeWidth}
      />
    </span>
  );
};

export default Icon;
