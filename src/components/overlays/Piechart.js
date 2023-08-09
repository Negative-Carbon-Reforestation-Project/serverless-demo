import React from "react";
import { Pie } from "react-chartjs-2";
import {Chart as ChartJS, ArcElement, Legend, Tooltip} from "chart.js";

/**
 * COntainer for the Pie Chart
 * @param data The chart data
 * @returns {JSX.Element}
 */
const PieChart = ({data}) => {

    ChartJS.register(ArcElement, Tooltip, Legend);

    /**
     * Map containing hex colors for specific tree types
     * @type {Map<string, string>}
     */
    const colorMap = new Map([
        ["Red Alder", "#cc5e5d"], // --color-red
        ["Douglas Fir", "#127f2c"], // --color-dark-green
        ["Western Hemlock", "#4567a3"], // --color-dark-blue
        ["Pacific Yew", "#b83130"], // --color-dark-red
        ["Bigleaf Maple", "#5d97cc"], // --color-blue
        ["Ponderosa Pine", "#93b4d2"], // --color-light-blue
        ["Sitka Spruce", "#5fba77"], // --color-light-green
        ["Western Red Cedar", "#ecb65a"], // -- color--yellow
    ]);

    /**
     * Map containing readable labels for specific tree types
     * @type {Map<string, string>}
     * @remark This should be handled in Spring Boot
     */
    const labelMap = new Map([
       ["wa_red_alder_stand_density", "Red Alder"],
       ["wa_douglas_fir_stand_density", "Douglas Fir"],
       ["wa_western_hemlock_stand_density", "Western Hemlock"],
       ["wa_pacific_yew_basal_area", "Pacific Yew"],
       ["wa_bigleaf_maple_stand_density", "Bigleaf Maple"],
       ["wa_ponderosa_pine_stand_density", "Ponderosa Pine"],
       ["wa_sitka_spruce_stand_density", "Sitka Spruce"],
       ["wa_western_redcedar_stand_density", "Western Red Cedar"],

    ]);

    /**
     * Retrieves the label for the given key
     * @param key They key representing the tree type
     * @returns {string|string} The label if found, otherwise returns Uknown.
     */
	const getLabel = (key) => {
        return labelMap.get(key) ?? "Not available";
    }

    // TODO
    // Add error handling and a display message for non-reforestable area when the list is emtpy

    /**
     * Parses the reforestation data as chart labels and data
     * @param data The reforestation data
     * @returns {{labels: *[], densities: *[]}} Labels representing the tree types and densities representing the density for that specific type
     */
    const getData = (data) =>  {
        let labels = [];
        let densities = [];

        for (const [key, value] of Object.entries(data[0])) {
            labels.push(getLabel(key));
            densities.push(value);
        }

        return {labels, densities};
    }

    /**
     * Gets the colors associated with the given labels
     * @param labels The labels representing the various tree types
     * @returns {*[]} An array containing the colors for the labels in hex
     */
    const getColors = (labels) => {
        let colorArray = []

        labels.forEach(element => {
            colorArray.push(colorMap.get(element));
        });

        return colorArray;
    }

    const {labels, densities} = getData(data);

    const pieData = {
        labels: labels,
        datasets: [
            {
                label: "Tree Species Data",
                data: densities,
                backgroundColor: getColors(labels),
            },
        ],
    };

	const options = {
		responsive: true,
		plugins: {
			legend: {
				position: "bottom",
                labels: {
                    color: "#ffffff",
                },
			},
		}
	};

    return <Pie data={pieData}
                options={options}
                redraw={true}
            />;
};

export default PieChart;
