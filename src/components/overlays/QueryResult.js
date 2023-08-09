import Coordinates from "./Coordinates";
import exitIcon from "../../resources/images/icons/exit-icon-50x50.png";
import Gauge from "./Gauge";
import PieChart from "./PieChart";
import React from "react";

const QueryResult = ({data}) => {

    /**
     * Generates a descriptive statement for the reforestation opportunity percentages
     * @param actual The actual reforestation opportunity
     * @param predicted The predicted reforestation opportunity by our model
     * @returns {string} A descriptive statement for the actual and predicted values
     */
    const reforestationPercentToString = (actual, predicted) => {
        let explanation = "";
        explanation += `The reforestation opportunity for this area is ${(actual * 100).toFixed(2)}%. `

        if (predicted && predicted >= 0)
        {
            explanation += `Our machine learning model predicted an opportunity of ${predicted.toFixed(2)}%`;
        }

        return explanation;
    };


    return (
        <>
            <section className="query-result-header">
                <Coordinates className="query-result-coordinates" coordinates={data.coordinates} />
            </section>

            <section className="chart-container">
                <section className="gauge-container">
                    <p className="chart-title">OPPORTUNITY FOR REFORESTATION</p>
                    <hr className="chart-title-divider"/>
                    {/*<Gauge chartID={"gauge-chart"} data={data.wa_total_reforestation_opportunity}/>*/}
                    <p className="gauge-data-explanation">
                        {reforestationPercentToString(data.wa_total_reforestation_opportunity, data.prediction)}
                    </p>
                </section>

                <section className="pie-container">
                    <p className="chart-title">TREE SPECIES</p>
                    <hr className="chart-title-divider"/>
                    <PieChart data={data.species} />
                </section>
            </section>
        </>
    )
}

export default QueryResult;