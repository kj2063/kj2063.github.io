/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/reference/config-files/gatsby-browser/
 */

import React from "react"

import { ThemeProvider } from "@src/context/ThemeContext"
import Layout from "@src/components/layout"

export const wrapRootElement = ({ element }) => (
    <ThemeProvider><Layout>{element}</Layout></ThemeProvider>
)

export const onRouteUpdate = ({ location, prevLocation }) => {
    /* url 마지막 '/' 제거 */
    if (location.pathname.endsWith('/') && location.pathname !== '/') {
        const trimmedPath = location.pathname.slice(0, -1);
        window.history.replaceState({}, '', trimmedPath);
    }

    /* 페이지 조회시 항상 스크롤 상단으로 이동 */
    if (location.pathname !== prevLocation?.pathname) {
        requestAnimationFrame(() => {
            window.scrollTo(0, 0);
        })
    }
};