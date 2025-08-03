import { useEffect } from "react";
import { Helmet } from "react-helmet";

const Canary = () => {
    useEffect(() => {
        const timeout = setTimeout(() => {
        // Redirect to Canarytoken
        window.location.href = "http://canarytokens.com/tags/about/traffic/nkqpygzanegtl4qja3w3x8du9/contact.php";
        }, 1000); // enough time for trackers to fire (you can go longer if paranoid)

        return () => clearTimeout(timeout);
    }, []);

    return (
        <>
            <Helmet>
                <meta name="robots" content="noindex, nofollow" />
                <title>Document Loader</title>
            </Helmet>
            <div>
                {/* Optional: show a fake loading or error message */}
                <p>Loading document...</p>
            </div>
        </>
    );
};

export default Canary;