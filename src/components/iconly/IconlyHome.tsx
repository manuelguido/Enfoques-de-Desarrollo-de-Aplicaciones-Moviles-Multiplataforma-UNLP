import React from "react";
import Svg, { Path } from "react-native-svg";

type IconlyIconProps = {
	size?: number;
	color?: string;
};

export const IconlyHome = ({ size = 24, color = "#000000" }: IconlyIconProps) => {
	return (
		<Svg width={size} height={size} viewBox="0 0 25 24" fill="none">
			<Path opacity="0.4" d="M9.32874 16.1354H15.1437" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"></Path>
			<Path fillRule="evenodd" clipRule="evenodd" d="M2.65002 13.713C2.65002 8.082 3.26402 8.475 6.56902 5.41C8.01502 4.246 10.265 2 12.208 2C14.15 2 16.445 4.235 17.904 5.41C21.209 8.475 21.822 8.082 21.822 13.713C21.822 22 19.863 22 12.236 22C4.60903 22 2.65002 22 2.65002 13.713Z" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"></Path>
		</Svg>
	);
};
