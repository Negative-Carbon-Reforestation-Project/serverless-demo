import React from "react";

/**
 * Container for Loader
 * @returns {JSX.Element}
 */
const Loader = ({loaderClass}) => {

    return <div className="loader-container">
        <div className={loaderClass}></div>
    </div>;
}

export default Loader;