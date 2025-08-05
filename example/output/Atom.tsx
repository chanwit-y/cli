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

export const AtomIcon: React.FC<IconProps> = ({ 
  xmlns = "http://www.w3.org/2000/svg",
  width = "24",
  height = "24",
  viewBox = "0 0 24 24",
  fill = "none",
  stroke = "currentColor",
  strokeWidth = "2",
  strokeLinecap = "round",
  strokeLinejoin = "round",
  className = "lucide lucide-atom-icon lucide-atom",
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
      <circle cx="12" cy="12" r="1" xmlns="http://www.w3.org/2000/svg"/>
			<path d="M20.2 20.2c2.04-2.03.02-7.36-4.5-11.9-4.54-4.52-9.87-6.54-11.9-4.5-2.04 2.03-.02 7.36 4.5 11.9 4.54 4.52 9.87 6.54 11.9 4.5Z" xmlns="http://www.w3.org/2000/svg"/>
			<path d="M15.7 15.7c4.52-4.54 6.54-9.87 4.5-11.9-2.03-2.04-7.36-.02-11.9 4.5-4.52 4.54-6.54 9.87-4.5 11.9 2.03 2.04 7.36.02 11.9-4.5Z" xmlns="http://www.w3.org/2000/svg"/>
    </svg>
  );
};