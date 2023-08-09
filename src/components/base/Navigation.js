import Logo from "./Logo";
import hamburgerIcon from "../../resources/images/icons/hamburger-menu-50x50.webp";
import hamburgerIconFallback from "../../resources/images/icons/hamburger-menu-50x50.png";
import hamburgerExitIcon from "../../resources/images/icons/exit-icon-50x50.webp";
import hamburgerExitIconFallback from "../../resources/images/icons/exit-icon-50x50.png";
import React, {useEffect, useRef} from "react";

/**
 * Container for custom navigation
 * @returns {JSX.Element}
 * @constructor
 */
const Navigation = ({skipLink = "#main"}) => {

    const navRef = useRef();
    const hamburgerMenuRef = useRef();

    /**
     * Toggles the hamburger menu on and off
     */
    const toggleHamburgerMenu = () => {
        hamburgerMenuRef.current.classList.toggle("active-flex-column");
    }

    /**
     * Subscribes the navigation to the window scroll event.
     *
     * @remark Based on the scroll position, the transparency of the nav is adjusted
     */
    const subscribeToScroll = () => {
        window.onscroll = () => {
            if (document.body.scrollTop > 10 || document.documentElement.scrollTop > 10)
            {
                navRef.current.style.background = "black";
            }
            else
            {
                navRef.current.style.background = "none";
            }
        }
    }

    /**
     * Once the component is mounted onto the DOM, we subscribe to the scroll event.
     */
    useEffect(() => {
        subscribeToScroll();
    });

    return (
        <>
            <a href={skipLink} className="skip-to-content" tabIndex={0}>Skip To Content</a>

            <nav ref={navRef} className="nav" tabIndex={0} aria-label="primary navigation">
                <Logo className="nav-logo" tabIndex={0}/>

                <ul className="nav-items">
                    <li className="nav-item">
                        <a href="/mission" className="nav-link" >Our Mission</a>
                    </li>
                    <li className="nav-item">
                        <a id="explore-nav-button" href="/maps" className="nav-link call-to-action-button" >Explore</a>
                    </li>

                    <li className="mobile-nav-item hamburger-menu-button" onClick={() => toggleHamburgerMenu()} aria-label="Toggle menu">
                        <picture>
                            <source
                                type="image/webp"
                                srcSet={`${hamburgerIcon} 50w`}
                            />

                            <img src={hamburgerIconFallback} className="hamburger-icon" alt="Open navigation menu icon" loading="lazy"/>
                        </picture>
                    </li>
                </ul>


            </nav>

            <nav ref={hamburgerMenuRef} className="mobile-nav topo-skin">
                <li className="mobile-nav-item hamburger-exit-button" onClick={() => toggleHamburgerMenu()} aria-label="Exit menu">
                    <picture>
                        <source
                            type="image/webp"
                            srcSet={`${hamburgerExitIcon} 50w`}
                        />
                        <img src={hamburgerExitIconFallback} className="exit-hamburger-icon" alt="Exit navigation menu icon" loading="lazy"/>
                    </picture>
                </li>

                <ul className="mobile-nav-items">
                    <li className="mobile-nav-item">
                        <a href="/mission" className="nav-link" >Our Mission</a>
                    </li>
                    <li className="mobile-nav-item">
                        <a href="/maps" className="nav-link" >Explore</a>
                    </li>
                    <li className="mobile-nav-item">
                        <a href="/terms" className="nav-link" >Terms of Service</a>
                    </li>
                    <li className="mobile-nav-item">
                        <a href="/privacy" className="nav-link" >Privacy Policy</a>
                    </li>
                    <li className="mobile-nav-item">
                        <a href="/accessibility" className="nav-link" >Accessibility</a>
                    </li>
                </ul>
            </nav>
        </>
    )
}

export default Navigation;