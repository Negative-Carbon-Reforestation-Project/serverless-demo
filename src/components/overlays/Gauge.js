import React from "react";
import GaugeChart from "react-gauge-chart";

/**
 * Container for the Gauge Chart
 * @param reforestationOpportunity The reforestation opportunity for the given coordinate
 * @returns {JSX.Element}
 */
const Gauge = ({ chartID, data:reforestationOpportunity }) => {

    const arcColors = [
        "#cc5e5d", // --color-red
        "#ecb65a", // --color-yellow
        "#127f2c" // --color-dark-green
    ];

    const percent = reforestationOpportunity / 100;

    const chartStyle = {
        height: 200,
        // height: 40,
    };

    return <GaugeChart
                id={chartID}
                colors={arcColors}
                percent={percent}
                redraw={true}
                needleColor="#5d97cc" // --color-blue
                needleBaseColor="#5d97cc" // --color-blue
                style={chartStyle}
            />;
};
 
export default Gauge;