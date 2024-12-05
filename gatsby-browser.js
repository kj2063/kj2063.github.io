/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/reference/config-files/gatsby-browser/
 */

import React, { useEffect} from "react"

import { ThemeProvider } from "@src/context/ThemeContext"
import Layout from "@src/components/layout"

export const wrapRootElement = ({ element }) => {
    return <ThemeProvider>{element}</ThemeProvider>
}

export const wrapPageElement = ({ element, props }) => {
    const ScrollToTop = ({ children }) => {
        const pathname = props.location.pathname;

        useEffect(() => {
            window.scrollTo(0, 0);
        }, [pathname]);

        return <>{children}</>;
    };

    return (
        <ScrollToTop>
            <Layout>{element}</Layout>
        </ScrollToTop>
    )
};

export const onRouteUpdate = ({ location, prevLocation }) => {
    /* url 마지막 '/' 제거 */
    if (location.pathname.endsWith('/') && location.pathname !== '/') {
        const trimmedPath = location.pathname.slice(0, -1);
        window.history.replaceState({}, '', trimmedPath);
    }
};