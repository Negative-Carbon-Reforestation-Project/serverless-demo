import Navigation from "../base/Navigation";
import Footer from "../base/Footer";
import React, {useEffect} from "react";

/**
 * Container for the Mission page
 * @returns {JSX.Element}
 */
const Mission = () => {

    /**
     * Once the component is mounted onto the DOM, dynamically update the page's title.
     */
    useEffect(() =>{
        document.title = "Negative Carbon Reforestation Project - Mission";
    })

    return (
        <>
            <Navigation skipLink="#mission-container"/>

            <main id="mission-container" className="container">
                <section id="mission-hero" className="hero">
                    <h1 className="hero-header">Our Mission</h1>
                </section>

                <section className="mission-content" tabIndex={0} aria-label="Mission statement" role="document">
                    <p>
                        The Pacific Northwest is home to some of the most beautiful and intact forest ecosystems in the continental US. However,
                        <a className="mission-study-link" href="https://pubmed.ncbi.nlm.nih.gov/16903097/" target="_blank" rel="noreferrer"> according to a study on the status of old-growth forests in the Pacific Northwest</a>,
                        72% of the original old-growth conifer forests have been lost through logging and other human developments. Forest preservation has a new urgency as a crucial defense against climate disruption that poses catastrophic risks for both the natural world and humanity.
                   </p>
                   <p>We understand that technology cannot take the place of hands in the earth, but it can serve to empower those involved. That's why we developed a platform that utilizes convolutional neural networks and data science to help identify potential locations for successful reforestation – assisting those involved by reducing time and cost.</p>
                    <p>We hope that through the use of our software, we can help Washington remain green for decades to come. Now that you’re here, maybe you can help too!</p>
                </section>

                <section className="services-content" tabIndex={0} aria-label="Mission statement" role="document">
                    <h1>Services</h1>

                    <h2>REST API</h2>
                    <p>Our web application is built on top of a REST API that is available at the following endpoint:</p>
                    <pre aria-label="rest endpoint" className="language-bash">https://www.ncrp.app/maps/api/search/geo</pre>
                    <p>The endpoint expects two parameters, longitude and latitude, and returns opportunities for reforestation and the tree species at the given coordinate.</p>
                    <p>For example:</p>
                    <pre aria-label="rest api endpoint example" className="language-bash">https://ncrp.app/api/search/geo?latitude=47.70023082782143&longitude=-123.58968272261251</pre>
                    <p>Returns the following json response:</p>
                    <pre aria-label="json response from rest endpoint" className="line-numbers language-json"><code className="language-json">{JSON.stringify({"species": [
                            {
                                "wa_douglas_fir_stand_density": 0.08574207399322036,
                                "wa_western_hemlock_stand_density": 0.11730453391478986,
                                "wa_pacific_yew_basal_area": 0.036677908904923597
                            }
                        ],
                        "wa_total_reforestation_opportunity": 0
                    }, null, 2)}
                    </code></pre>

                    <h2>Web Application</h2>
                    <p>Our web application allows users to visualize and explore reforestation opportunities on a 2D and 3D map.</p>

                    <h3>Visualization</h3>
                    <p>We offer several base layers and land cover layers. The land cover layers were pre-processed by our data scientists.</p>
                    <p>Users are also able to visualize in 3D.</p>

                    <h3>Searching</h3>
                    <p>To explore reforestation opportunities, users are able to place a marker on the map that makes requests to our REST API.</p>
                    <p>Alternatively, users are able to search for locations directly using our search bar -- which supports auto-completion and geocoding.</p>
                    <button id="explore-button" className="call-to-action-button" onClick={() => document.location.href = "/maps"} >Explore Opportunities</button>
                </section>
            </main>

            <Footer/>
        </>
    )
}

export default Mission;