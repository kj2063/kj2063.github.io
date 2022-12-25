import * as React from "react"
import Layout from "../components/layout"
import "../styles/common.css"
import {StaticImage} from "gatsby-plugin-image";

const about : React.FC = () => {
    return (
        <Layout>
            <h1>
                <b>About</b>
            </h1>
            <div className={"textCenter"}>
                <StaticImage
                  src="../images/jun_circle_img.png"
                  loading="eager"
                  width={200}
                  quality={60}
                  formats={["auto", "webp", "avif"]}
                />
                <div className={"introductionText"}>
                    Hello. I'm software engineer Jun Kwon.<br/>
                    Thank you for visit my blog and you can check out my carrer below.<br/>
                    Have a nice day!
                </div>
            </div>
        </Layout>
    )
}
export default about;