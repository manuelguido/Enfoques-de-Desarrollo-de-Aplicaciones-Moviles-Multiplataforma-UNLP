import React from "react";
import Svg, { Path } from "react-native-svg";

type IconlyIconProps = {
	size?: number;
	color?: string;
};

export const IconlyBook = ({ size = 24, color = "#000000" }: IconlyIconProps) => {
	return (
		<Svg width={size} height={size} viewBox="0 0 25 24" fill="none">
			<Path d="M5.67459 18.3741C8.05059 18.5454 10.1191 19.5174 11.3383 20.2238C12.0592 20.6412 12.9408 20.6412 13.6617 20.2238C14.8809 19.5174 16.9494 18.5454 19.3254 18.3741C20.5406 18.2866 21.5 17.3136 21.5 16.0954V5.75371C21.5 4.38182 20.2994 3.33004 18.9362 3.4789C16.7246 3.72117 14.8137 4.62507 13.6617 5.2935C12.9408 5.7109 12.0592 5.7109 11.3383 5.2935C10.1863 4.62507 8.27535 3.72117 6.06378 3.4789C4.69968 3.33004 3.5 4.38182 3.5 5.75371V16.0954C3.5 17.3136 4.45935 18.2866 5.67459 18.3741Z" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"></Path>
			<Path opacity="0.4" d="M15.8848 9.36106L18.0701 8.49414M15.8848 13.8573L18.0701 12.9903" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"></Path>
			<Path opacity="0.4" d="M12.5 5.60742V10.2631" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"></Path>
		</Svg>
	);
};
