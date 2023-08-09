import React, {useEffect, useRef} from "react";
import heroVideo from "../../resources/videos/hero-1280x720.mp4";
import Navigation from "../base/Navigation";
import Footer from "../base/Footer";
import "../../styles/main.css";

/***
 * Container for the Index page
 * @returns {JSX.Element}
 * @constructor
 */
const Index = () => {

    const videoRef = useRef();
    /**
     * Once the component is mounted onto the DOM, dynamically update the page's title and autoplay the hero video.
     *
     * @remarks The autoplay video is a temporary workaround for the play button appearing in some mobile phones during low power mode.
     */
    useEffect(() =>{
        document.title = "Negative Carbon Reforestation Project - Home";

        if (videoRef.current)
        {
           videoRef.current.play();
        }
    })

    return (
        <>
            <Navigation skipLink="#index-hero"/>

            <main id="index-container" className="container">
                <section id="index-hero" className="hero" tabIndex={0} aria-label="Let's Re-forest Washington">
                    <article className="hero-caption">
                        <h1 className="hero-caption-text">Let's Reforest Washington</h1>
                        <button id="hero-button" className="call-to-action-button" onClick={() => document.location.href = "/maps"} >Explore Opportunities</button>
                    </article>

                    <video ref={videoRef} className="hero-video"  muted={true} loop={true} playsInline={true}>
                        <source src={heroVideo} type="video/mp4"/>
                    </video>
                </section>

                <section id="mission-excerpt" className="content" tabIndex={0} aria-label="Excerpt on why reforestation is important">
                    <article className="mission-excerpt-container" tabIndex={0}>
                        <h2>Why is reforestation important?</h2>
                        <p>Forest ecosystems are critical to the health of the planet and therefore our own. They play an important role in climate, water retention, temperature regulation, and ecosystem services such as clean water, air, and the protection of biodiversity. Unfortunately, forests throughout the world are being destroyed and damaged on a daily basis</p>
                        <p>Reforestation is the process of regenerating or replanting forests that have been destroyed or damaged. Even though forests have the capability to self-regenerate via natural dispersion of seeds, forest lands that have been badly damaged cannot be regenerated easily on their own unless aided through manual reforestation.
                        </p>
                        <p><abbr title="Negative Carbon Reforestation Project">NCRP</abbr> is committed to aiding communities and organizations who are directly involved in the reforestation efforts of Washington.</p>
                        <button id="learn-more-button" className="call-to-action-button" onClick={() => document.location.href = "/mission"}>Learn More</button>
                    </article>
                </section>

            </main>

            <Footer/>

        </>
    )
};

export default Index;