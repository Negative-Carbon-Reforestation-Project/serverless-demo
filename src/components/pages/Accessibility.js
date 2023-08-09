import Navigation from "../base/Navigation";
import Footer from "../base/Footer";
import {useEffect} from "react";
import wcagCheckList from "../../resources/files/WCAG Checklist.pdf";

const Accessibility = () => {

    /**
     * Once the component is mounted onto the DOM, dynamically update the page's title.
     */
    useEffect(() =>{
        document.title = "Negative Carbon Reforestation Project - Accessibility";
    })

    return (
        <>
            <Navigation skipLink="#accessibility-container"/>
            <main id="accessibility-container" className="container">
                <section id="accessibility-hero" className="hero">
                    <h1 className="hero-header">Accessibility</h1>
                </section>

                <section className="accessibility-content" tabIndex={0} role="document" aria-label="Accessibility Policy">
                    <article className="content-article">
                        <p>Last updated: April 10, 2022</p>
                        <p>We are committed to the universal accessibility of information contained on our Website. Our accessibility policy lays out our goals with regard to accessibility on our Website.</p>
                    </article>

                    <article className="content-article">
                        <h1>Interpretation and Definitions</h1>
                        <h2>Interpretation</h2>
                        <p>The words of which the initial letter is capitalized have meanings defined under the following conditions. The following definitions shall have the same meaning regardless of whether they appear in singular or in plural.</p>
                        <h2>Definitions</h2>
                        <p>For the purposes of this Accessibility policy:</p>
                        <ul className="terms-definitions">
                            <li>
                                <p><strong>Application</strong> means the software program provided by the Company downloaded by You on any electronic device, named Negative Carbon Reforestation Project</p>
                            </li>
                            <li>
                                <p><strong>Application Store</strong> means the digital distribution service operated and developed by Apple Inc. (Apple App Store) or Google Inc. (Google Play Store) in which the Application has been downloaded.</p>
                            </li>
                            <li>
                                <p><strong>Affiliate</strong> means an entity that controls, is controlled by or is under common control with a party, where &quot;control&quot; means ownership of 50% or more of the shares, equity interest or other securities entitled to vote for election of directors or other managing authority.</p>
                            </li>
                            <li>
                                <p><strong>Country</strong> refers to: Washington,  United States</p>
                            </li>
                            <li>
                                <p><strong>Company</strong> (referred to as either &quot;the Company&quot;, &quot;We&quot;, &quot;Us&quot; or &quot;Our&quot; in this Agreement) refers to Negative Carbon Reforestation Project, Bellevue, WA.</p>
                            </li>
                            <li>
                                <p><strong>Device</strong> means any device that can access the Service such as a computer, a cellphone or a digital tablet.</p>
                            </li>
                            <li>
                                <p><strong>Service</strong> refers to the Application.</p>
                            </li>
                            <li>
                                <p><strong>Guidelines</strong> refer to the accessibility compliance standards outlined in Section 508 of the United States Rehabilitation Act of 1973, as amended, the Americans with Disabilities Act and the Web Content Accessibility Guidelines (WCAG 2.1).</p>
                            </li>
                            <li>
                                <p><strong>Third-party Social Media Service</strong> means any services or content (including data, information, products or services) provided by a third-party that may be displayed, included or made available by the Service.</p>
                            </li>
                            <li>
                                <p><strong>You</strong> means the individual accessing or using the Service, or the company, or other legal entity on behalf of which such individual is accessing or using the Service, as applicable.</p>
                            </li>
                        </ul>
                    </article>

                    <article className="content-article">
                        <h1>Accessible Content</h1>
                        <h2>Accessibility Testing</h2>
                        <p>In addition to periodic browser testing on our Supported Devices, we do less frequent but
                            thorough testing from an accessibility perspective using the following tools:</p>
                        <ul>
                            <li>Windows Narrator</li>
                            <li>NVDA</li>
                            <li>JAWS</li>
                            <li>Color Contrast Analyzer Extension</li>
                            <li>High Contrast Emulation on Browsers</li>
                        </ul>

                        <h2>Meeting Accessibility Requirements</h2>

                        <h3>Keyboard Access</h3>
                        <p>One of Our goals with the Website is keyboard accessibility. Many users with disabilities are unable to use a mouse or other pointing device. For this reason, elements will be focusable when relevant and will always be distinguishable from its unfocused state.</p>

                        <h3>Skip Links</h3>
                        <p>Some users often find they have to <kbd>TAB</kbd> through a large number of irrelevant links to get to the content they want. To circumvent this, we’ve provided elements for skipping large groups of links and navigation elements.</p>

                        <h3>Alternative Text</h3>
                        <p>Where applicable, We attempt to provide concise and relevant alt text for all non-text content on Our Website.</p>

                        <h3>Headings</h3>
                        <p>Some users prefer navigating a document via its headings. For this reason, We attempt to provide heading tags in a manner that conveys document structure.</p>

                        <h3>Landmarks</h3>
                        <p>Some users prefer navigating a document via its landmarks. For this reason, We attempt to provide distinguishable landmarks using the appropriate semantic elements and where applicable, its appropriate aria role.</p>

                        <h3>Screen Readers</h3>
                        <p>This Website has been designed to work with screen readers.</p>

                        <h3>WCAG 2.1 Checklist</h3>
                        <p>We tested for WCAG 2.1 AA compliance using the following checklist. We chose to interpret DNA as a pass and wherever notes aren't present, the criterion for the requirement should be interpreted</p>
                        <iframe src={`${wcagCheckList}#toolbar=0`} width="100%" height="500px"></iframe>
                    </article>

                    <article className="content-article">
                        <h1>Non-accessible content</h1>
                        <p>Portions of this Website may not be in compliance with the Guidelines, and some existing content may meet only the minimum required compliance standards. This will be resolved as We continue to redesign and update the website with accessibility in mind. </p>
                        <p>While We will make every effort to monitor and maintain acceptable compliance levels, please understand that creating accessible formats for some content may be unfeasible or impractical. Moreover, We are not responsible for ensuring that third-party products that We do not maintain or control conform to the Guidelines.Even if these products are located or linked on Our Website, We shall not be liable if these products are inaccessible to individuals with disabilities.</p>
                        <p>The content listed below sets out some areas where We are non-compliant with the Guidelines and the reasons for it:</p>
                        <ul>
                            <li>Maps and layers - The level of accessibility during live events such as map modifications and map layers being toggled is limited. We’ve ensured that pertinent information such as information on layers and queries is accessible to users with disabilities.</li>
                            <li>Zoom Levels - Zoom levels past 200% are not currently supported. In future refactors, We plan to provide full support for zoom levels 100% through 500%.</li>
                        </ul>
                     </article>

                    <article className="content-article">
                        <h1>Contact Us</h1>
                        <p>If you have any questions about the accessibility policy or wish to report an issue, You can contact us:</p>
                        <ul>
                            <li>By visiting this page on our website: [In construction]</li>
                        </ul>
                    </article>
                </section>

            </main>

            <Footer />

        </>

    )
}

export default Accessibility;