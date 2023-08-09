import React from "react";
import errorIcon from "../../resources/images/icons/error_icon-50x50.png";

const QueryError = () => {
    return (
        <>
            <section className="query-error-content">
                <img src={errorIcon} alt="Error icon"/>
                <p>Something went wrong</p>
                <p>
                    <a href="https://github.com/Negative-Carbon-Reforestation-Project/openlayers-springboot-react-demo/issues/new?assignees=&labels=bug&template=bug_report.md&title=Bug%3A+%5BError%5D" target="_blank" rel="noreferrer">Report this issue to our technical team</a>
                </p>
            </section>
        </>
    )
};

export default QueryError;