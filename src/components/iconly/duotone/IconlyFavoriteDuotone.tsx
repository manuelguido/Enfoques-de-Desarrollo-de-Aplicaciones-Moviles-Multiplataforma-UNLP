import React from "react";
import Svg, { Path } from "react-native-svg";

type IconlyIconProps = {
	size?: number;
	color?: string;
};

export const IconlyFavoriteDuotone = ({ size = 24, color = "#000000" }: IconlyIconProps) => {
	return (
		<Svg width={size} height={size} viewBox="0 0 25 24" fill="none">
			<Path fillRule="evenodd" clipRule="evenodd" d="M3.1719 12.4463C2.0989 9.09631 3.3539 4.93131 6.8709 3.79931C8.7209 3.20231 11.0039 3.70031 12.3009 5.48931C13.5239 3.63431 15.8729 3.20631 17.7209 3.79931C21.2369 4.93131 22.4989 9.09631 21.4269 12.4463C19.7569 17.7563 13.9299 20.5223 12.3009 20.5223C10.6729 20.5223 4.8979 17.8183 3.1719 12.4463Z" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"></Path>
			<Path opacity="0.4" d="M16.0386 7.56396C17.2456 7.68796 18.0006 8.64496 17.9556 9.98596" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"></Path>
		</Svg>
	);
};
