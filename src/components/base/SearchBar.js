import hamburgerIcon from "../../resources/images/icons/hamburger-menu-50x50.webp";
import {useRef, useState} from "react";
import {useDispatch} from "react-redux";
import {fromLonLat} from "ol/proj";
import {addMarker, panMapView, removeMarker, setHistoryState} from "../../redux/reducers/mapReducer";
import SideMenu from "../overlays/SideMenu";

/**
 * Container for the Search Bar
 * @returns {JSX.Element}
 * @constructor
 */
const SearchBar = () => {

    const [searchResults, setSearchResults] = useState([]);
    const searchInputRef = useRef();
    const searchResultsRef = useRef();
    const sideMenuRef = useRef();
    const dispatch = useDispatch();


    /**
     * Geocodes an address
     * @param address The address to be geocoded
     * @remark Documentation for ArcGIS Geocoding is available at https://developers.arcgis.com/documentation/mapping-apis-and-services/search/services/geocoding-service/
     */
    const geocodeAddress = (address) => {

        fetch(`https://geocode-api.arcgis.com/arcgis/rest/services/World/GeocodeServer/findAddressCandidates?address=${address}&maxLocations=1&f=json&token=${process.env.REACT_APP_ARCTOKEN}`)
            .then(response => response.json())
            .then(data => {
                debugger;
                let location = data.candidates[0].location;
                let coordinates = fromLonLat([location.x, location.y]);

                dispatch(panMapView({center: coordinates, zoom: 10, duration: 2000}));
                dispatch(removeMarker());
                dispatch(addMarker({position: coordinates}));
                dispatch(setHistoryState({marker: coordinates}));
            })
            .catch(error => console.log(error));
    }

    /**
     * Geocodes a search result
     * @param address The address to be geocoded
     */
    const setSearchAddress = (address) => {
        searchInputRef.current.value = address;
        geocodeAddress(address);
    }

    /**
     * Searches a partial address for matches
     * @param event The event containing the address partial
     * @param timeout The debounce rate at which another search is executed. Default is 500 ms.
     *
     * @remark Debouncing is used to avoid multiple API calls being sent everytime the search is updated.
     */
    const searchAddress = (event, timeout=500) => {

        setTimeout(() => {
            let addressTarget = event.target.value;

            if (event.target.value === "")
            {
                setSearchResults(["No results found"]);
            }

            fetch(`https://geocode-api.arcgis.com/arcgis/rest/services/World/GeocodeServer/suggest?text=${addressTarget}&f=json&token=${process.env.REACT_APP_ARCTOKEN}`)
                .then(response => response.json())
                .then(data => {
                    let suggestions = data.suggestions.map(suggestion => suggestion.text);
                    setSearchResults(suggestions);
                })
                .catch(error => setSearchResults([]))
        }, 500)
    }

    /**
     * Shows the search results
     */
    const showSearchResults = () => {
        searchResultsRef.current.classList.add("active");
    }

    /**
     * Hides the search results
     */
    const hideSearchResults = (timeout=100) => {
        setTimeout(() => searchResultsRef.current.classList.remove("active"), timeout);
    }

    /**
     * Shows the side menu
     */
    const showSideMenu = () => {
        sideMenuRef.current.classList.toggle("active-flex");
        document.querySelector(".side-menu-shadow").classList.add("active");
        sideMenuRef.current.focus();
    }

    /**
     * Renders the search results
     * @returns {JSX.Element|unknown[]}
     * @remark If there are no results, a message indicating no results were found is displayed.
     */
    const renderSearchResults = () => {
        if (searchResults.length === 0)
        {
            return <li>No results found</li>
        }

        return searchResults.map((result, index) => <li key={index} onClick={(event) => setSearchAddress(event.target.innerText)}>{result}</li>);
    }

    return (
        <>
            <form role="search"
                  className="search-bar topo-skin"
                  tabIndex={0}
                  onSubmit={event => {
                      event.preventDefault();
                      geocodeAddress(event.target[1].value);
                  }}
              >

                <button className="menu-button"
                        aria-label="Toggle navigation menu"
                        onClick={(event) => {
                            event.preventDefault();
                            showSideMenu()
                        }}
                >
                    <img className="menu-icon" src={hamburgerIcon} alt="Navigation menu icon"/>
                </button>

                <input ref={searchInputRef}
                       className="search-input"
                       type="search"
                       aria-label="Search addresses for reforestation opportunities"
                       placeholder="Search Location"
                       onChange={(event) => {
                           showSearchResults();
                           searchAddress(event);
                       }}
                       onFocus={(event) => {
                           if (event.target.value !== "")
                           {
                               showSearchResults();
                           }
                       }}
                       onBlur={() => hideSearchResults()}
                />


                <ul ref={searchResultsRef} className="search-results" tabIndex={0}>
                    {renderSearchResults()}
                </ul>
            </form>

            <SideMenu ref={sideMenuRef}/>
        </>
    )
}

export default SearchBar;