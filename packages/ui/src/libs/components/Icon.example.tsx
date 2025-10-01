import React from "react";
import { Icon } from "./Icon";
import { Heart, Star, Search, User, Settings } from "lucide-react";

// Example usage of the Icon component
export const IconExamples: React.FC = () => {
  return (
    <div className="flex gap-4 items-center p-4">
      {/* Basic usage */}
      <Icon icon={Heart} />
      
      {/* With custom size */}
      <Icon icon={Star} size={32} />
      
      {/* With custom color */}
      <Icon icon={Search} color="blue" />
      
      {/* With custom stroke width */}
      <Icon icon={User} strokeWidth={3} />
      
      {/* With custom className */}
      <Icon icon={Settings} className="text-red-500 hover:text-red-700" />
      
      {/* All props combined */}
      <Icon 
        icon={Heart} 
        size={28} 
        color="red" 
        strokeWidth={2.5}
        className="hover:scale-110 transition-transform cursor-pointer"
      />
    </div>
  );
};

export default IconExamples;
