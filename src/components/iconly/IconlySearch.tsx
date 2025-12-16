import React from "react";
import Svg, { Path } from "react-native-svg";

export const IconlySearch = ({ size = 24, color = "#000000" }) => {
	return (
		<Svg width={size} height={size} viewBox="0 0 25 24" fill="none">
			<Path d="M20.5499 11.4175C20.5499 6.76847 16.7814 3 12.1324 3C7.48331 3 3.71484 6.76847 3.71484 11.4175C3.71484 16.0666 7.48331 19.836 12.1324 19.836C16.7814 19.836 20.5499 16.0666 20.5499 11.4175Z" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
			<Path opacity="0.4" d="M17.8604 17.584L21.2853 21.0002" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
			<Path opacity="0.4" d="M13.832 6.74072C15.2302 7.16593 16.3356 8.25375 16.7841 9.64029" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
		</Svg>
	);
};
