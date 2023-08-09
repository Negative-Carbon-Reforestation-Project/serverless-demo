import {useEffect, useState} from "react";
import Loader from "../utils/Loader";
import QueryResult from "../overlays/QueryResult";
import QueryError from "./QueryError";

/**
 * Container for query logic
 * @returns {{queryData: *, queryState: *}} The data of the query and the state of the query -- indicating whether the fetch was a success or fail.
 */
const useQuery = (coordinates, queryMenuRef) => {
    const [queryContent, setQueryContent] = useState();
    /**
     * Once the component is mounted onto the DOM, create the overlay and populate it via a click listener on the map.
     * Add a click listener for the popup closer as well.
     */
    useEffect(async () => {
        if (!coordinates) {
            return;
        }

        setQueryContent(<Loader loaderClass="spinner-loader"/>);
        queryMenuRef.current.classList.add("active-flex");

        let [longitude, latitude] = [...coordinates];

        try
        {
            let response = await fetch(`https://ncrp.app/api/search/geo?latitude=${latitude}&longitude=${longitude}`);

            if (response.status !== 200)
            {
                setQueryContent(<QueryError/>);
            }
            else
            {
                let data = await response.json();
                data["coordinates"] = coordinates;
                setQueryContent(<QueryResult data={data}/>);
            }
        }
        catch (error)
        {
            setQueryContent(<QueryError/>);
        }

    }, [coordinates]);

    return { queryContent };
};

export default useQuery;
