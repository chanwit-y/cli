import { ChefManCapSvgrepoComIcon } from "./ChefManCapSvgrepoCom";
import { IceCreamConeSvgrepoComIcon } from "./IceCreamConeSvgrepoCom";
import { AtomIcon } from "./Atom";
import { AArrowDownIcon } from "./AArrowDown";

// Base Icon component type
type BaseIconComponent = React.FC<React.SVGProps<SVGSVGElement>>;

// Icon component with dot notation access
type IconComponent = BaseIconComponent & {
	ChefManCapSvgrepoCom: typeof ChefManCapSvgrepoComIcon,
	IceCreamConeSvgrepoCom: typeof IceCreamConeSvgrepoComIcon,
	Atom: typeof AtomIcon,
	AArrowDown: typeof AArrowDownIcon,
};

// Create the Icon component with attached sub-components
export const Icon = {} as IconComponent;

// Attach individual icon components to Icon for dot notation access
Icon.ChefManCapSvgrepoCom = ChefManCapSvgrepoComIcon;
Icon.IceCreamConeSvgrepoCom = IceCreamConeSvgrepoComIcon;
Icon.Atom = AtomIcon;
Icon.AArrowDown = AArrowDownIcon;