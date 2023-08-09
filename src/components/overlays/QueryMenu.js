import React from "react";
import useQuery from "./useQuery";
import exitIcon from "../../resources/images/icons/exit-icon-50x50.png";

/**
 * Container for the Query Menu
 * @returns {JSX.Element}
 */
const QueryMenu = React.forwardRef(({coordinates}, queryMenuRef) => {


    const { queryContent } = useQuery(coordinates, queryMenuRef);

    /**
     * Hides the query menu
     */
    const hideMenu = () => {
        queryMenuRef.current.classList.remove("active-flex");
    }


    return (
        <>
            <section
                ref={queryMenuRef}
                className="query-menu topo-skin"
                aria-label="Query information"
            >
                <button className="query-menu-exit" aria-label="Close query menu">
                    <img className="query-menu-exit-icon"
                         src={exitIcon}
                         alt="Exit query menu icon"
                         onClick={() => hideMenu()}
                    />
                </button>
                {queryContent}
            </section>
        </>
    );
})

export default QueryMenu;
