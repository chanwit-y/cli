import React from 'react';

interface IconProps extends React.SVGProps<SVGSVGElement> {
  xmlns: string;  
}

export const UserIcon: React.FC<IconProps> = ({ 
  xmlns = "http://www.w3.org/2000/svg",
  ...props }) => {
  return (
    <svg
      xmlns={xmlns}
      {...props}
    >
      <path d="M3.5 13h6" xmlns="http://www.w3.org/2000/svg"/>
			<path d="m2 16 4.5-9 4.5 9" xmlns="http://www.w3.org/2000/svg"/>
			<path d="M18 7v9" xmlns="http://www.w3.org/2000/svg"/>
			<path d="m14 12 4 4 4-4" xmlns="http://www.w3.org/2000/svg"/>
    </svg>
  );
};