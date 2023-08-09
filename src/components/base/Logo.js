import React from "react";

import logo192 from "../../resources/images/logo/ncrp-logo-192x65.png";
import logo250 from "../../resources/images/logo/ncrp-logo-250x85.png";
import logo300 from "../../resources/images/logo/ncrp-logo-300x102.png";
import logo339 from "../../resources/images/logo/ncrp-logo-339x115.png";
import logo442 from "../../resources/images/logo/ncrp-logo-442x150.png";
import logo590 from "../../resources/images/logo/ncrp-logo-590x200.png";

/**
 * Container for site logo
 * @remark The picture tag is used to support a wide variety of resolutions in both screen orientations
 * and the img tag is used as a fallback.
 * @returns {JSX.Element}
 */
const Logo = ({className, alt="Site logo", tabIndex=-1, href="/"}) => {

    return <picture>
                <source
                    type="image/png"
                    srcSet={`${logo192} 192w, ${logo250} 250w, ${logo300} 300w, ${logo339} 320w, ${logo590} 590w`}
                    sizes="(max-width: 600px) 250px, (min-width: 600px) 300px, (min-width: 992px) 320px (min-width: 2560px) 590px"
                />

                <img
                    src={logo339}
                    className={className}
                    alt={alt}
                    tabIndex={tabIndex}
                    draggable={false}
                    onClick={() => document.location.href = href}
                />
           </picture>
}

export default Logo;