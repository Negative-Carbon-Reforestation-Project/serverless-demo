import React, {useEffect, useRef, useState} from "react";
import exitIcon from "../../resources/images/icons/exit-icon-50x50.png";
import {useSelector} from "react-redux";

/**
 * Container for the Share Menu
 * @type {React.ForwardRefExoticComponent<React.PropsWithoutRef<{}> & React.RefAttributes<unknown>>}
 */
const ShareMenu = React.forwardRef((props, shareMenuRef) => {

    const mapHash = useSelector((state) => state.maps.value.mapHash);
    const embedRef = useRef();
    /**
     * Generates the html text for an embeddable map
     * @returns {string}
     */
    const generateEmbed = () => {
        let url = `${window.location.protocol}//${window.location.host}/maps/embed${window.location.hash}`;
        let embedHtml = `<iframe src='${url}' title='Embed of map' style='border: 0;' allowfullscreen='' loading='lazy' width='600' height='450' referrerpolicy='no-referrer-when-downgrade'></iframe>`;

        return embedHtml;
    }

    /**
     * Hides the Share menu
     */
    const hideMenu = () => {
        shareMenuRef.current.classList.remove("active-flex");
        document.querySelector(".side-menu-shadow").classList.remove("active");
    }

    /**
     * Copies the value of the element found via the given selector to the clipboard
     * @param selector The selector for the element
     */
    const copyToClipboard = (event, selector) => {
        let button = event.currentTarget;
        let currentText = button.innerText;
        button.innerText = "Copied"

       let input = document.querySelector(selector);
       navigator.clipboard.writeText(input.value);

       setTimeout(() => button.innerText = currentText, 300);
    }

    const [embedText, setEmbedText] = useState(generateEmbed());
    const [linkText, setLinkText] = useState(window.location.href);

    /**
     * Once the component is mounted onto the DOM, update the embed and link ref.
     *
     * @remark Updated whenever the window url changes.
     */
    useEffect(() => {
        setEmbedText(generateEmbed());
        setLinkText(window.location.href);
    }, [mapHash])

    return (
        <>
            <aside ref={shareMenuRef} className="share-menu topo-skin" tabIndex={0} aria-label="Share menu containing link to the map and html code for the map embed">
                <section className="share-menu-header">
                    <h2>Share</h2>
                    <button className="share-menu-exit" aria-label="Close share menu">
                        <img className="share-menu-exit-icon"
                             src={exitIcon}
                             alt="Exit share menu icon"
                             onClick={() => hideMenu()}
                        />
                    </button>
                </section>
                <hr className="share-menu-divider"/>

                <section className="share-link-section">
                    <h3>Share Link</h3>
                    <input id="share-link-input" className="share-input" type="text" value={linkText} readOnly={true} aria-label="Shareable link to the map"/>
                    <button className="share-button"
                            onClick={(event) => copyToClipboard(event, "#share-link-input")}
                            title="Copy link to clipboard"
                            aria-label="Copy link to clipboard">
                        Copy Link
                    </button>
                </section>

                <section className="share-embed-section">
                    <h3>Embed Our Map</h3>
                    <input id="share-embed-input" className="share-input" type="text" value={embedText} readOnly={true} aria-label="Shareable html code for the map embed"/>
                    <button className="share-button"
                            onClick={(event) => copyToClipboard(event, "#share-embed-input")}
                            title="Copy embed html to clipboard"
                            aria-label="Copy link to clipboard">
                        Copy HTML
                    </button>
                    <div className="embed-container" tabIndex={-1}>
                        <iframe ref={embedRef}
                                key={mapHash}
                                src={`${window.location.protocol}//${window.location.host}/maps/embed${mapHash}`}
                                className="embed"
                                frameBorder="0"
                                title="Embed of map"
                                allowFullScreen=""
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                                aria-label="Embed of map"
                        >
                        </iframe>
                    </div>
                    <p className="share-embed-notice">
                        By sharing our map, you agree to the <a href="/terms" target="_blank" rel="noreferrer">Terms Of Service</a>.
                    </p>
                </section>
            </aside>
        </>
    )
});

export default ShareMenu;