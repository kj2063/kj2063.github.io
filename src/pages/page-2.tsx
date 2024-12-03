import * as React from "react"
import { Link } from "gatsby"

import Seo from "@src/components/seo"

const SecondPage = () => (
    <div>
      <h1>Hi from the second page</h1>
      <p>Welcome to page 2</p>
      <Link to="/">Go back to the homepage</Link>
    </div>
)

export const Head = () => <Seo title="Page two" />

export default SecondPage
