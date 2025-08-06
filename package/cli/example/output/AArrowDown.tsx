import React from 'react';

interface IconProps extends React.SVGProps<SVGSVGElement> {
  xmlns?: string;
  width?: number | string | undefined;
  height?: number | string | undefined;
  viewBox?: string | undefined;
  fill?: string | undefined;
  stroke?: string | undefined;
  strokeWidth?: number | string | undefined;
  strokeLinecap?: "butt" | "round" | "square" | "inherit" | undefined;
  strokeLinejoin?: "miter" | "round" | "bevel" | "inherit" | undefined;
  className?: string;  
}

export const AArrowDownIcon: React.FC<IconProps> = ({ 
  xmlns = "http://www.w3.org/2000/svg",
  width = "24",
  height = "24",
  viewBox = "0 0 24 24",
  fill = "none",
  stroke = "currentColor",
  strokeWidth = "2",
  strokeLinecap = "round",
  strokeLinejoin = "round",
  className = "lucide lucide-aarrow-down-icon lucide-a-arrow-down",
  ...props }) => {
  return (
    <svg
      xmlns={xmlns}
		  width={width}
		  height={height}
		  viewBox={viewBox}
		  fill={fill}
		  stroke={stroke}
		  strokeWidth={strokeWidth}
		  strokeLinecap={strokeLinecap}
		  strokeLinejoin={strokeLinejoin}
		  className={className}
      {...props}
    >
      <path d="M3.5 13h6" xmlns="http://www.w3.org/2000/svg"/>
			<path d="m2 16 4.5-9 4.5 9" xmlns="http://www.w3.org/2000/svg"/>
			<path d="M18 7v9" xmlns="http://www.w3.org/2000/svg"/>
			<path d="m14 12 4 4 4-4" xmlns="http://www.w3.org/2000/svg"/>
    </svg>
  );
};