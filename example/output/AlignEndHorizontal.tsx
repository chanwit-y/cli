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
      <rect width="6" height="16" x="4" y="2" rx="2" xmlns="http://www.w3.org/2000/svg"/>
			<rect width="6" height="9" x="14" y="9" rx="2" xmlns="http://www.w3.org/2000/svg"/>
			<path d="M22 22H2" xmlns="http://www.w3.org/2000/svg"/>
    </svg>
  );
};