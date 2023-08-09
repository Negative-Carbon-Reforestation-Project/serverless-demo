import React from "react";
import {toStringHDMS} from "ol/coordinate";

/**
 * Container for coordinates in HDMS format
 * @param coordinates The coordinate data to be converted to HDMS
 * @returns {JSX.Element}
 */
const Coordinates = ({className, coordinates}) => {
	const longLatInfo = toStringHDMS(coordinates);
    const longLatDisplay = `${String.fromCodePoint("0x1F4CD")} ${longLatInfo}`;

	return <p className={className}>{longLatDisplay}</p>;
};

export default Coordinates;