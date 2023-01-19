import * as React from "react"
import Layout from "../components/layout"
import "../styles/common.css"
import "../styles/about.css"
import {StaticImage} from "gatsby-plugin-image"
import careerData from "../data/career.json"
import {Badge} from "antd";
import {ReactNode} from "react";
const about : React.FC = () => {

    console.log(careerData);

    return (
        <Layout>
            <h2 className={"mainColor"}>
                About
            </h2>
            <div className={"textCenter"}>
                <StaticImage
                  src="../images/jun_circle_img.png"
                  loading="eager"
                  width={200}
                  quality={60}
                  formats={["auto", "webp", "avif"]}
                  alt={""}/>
                <div className={"introductionText"}>
                    Hello. I'm software engineer Jun Kwon.<br/>
                    Thank you for visit my blog and you can check out my career below.<br/>
                    Have a nice day!
                </div>
            </div>
            <div className={"careerDiv"}>
                <h2>Experience</h2>
                <div >
                    {careerData.map((data) => {
                        const detailRender = data.detail.map((detailData) => {
                            return <li color={"red"} >{detailData}</li>
                        })
                        return (
                        <div className={"careerContentsDiv flexBox"}>
                            <div className={"careerPeriodDiv flexItem"}>
                                {data.period}
                            </div>
                            <div className={'careerDetailDiv'}>
                                <p>
                                    {data.title}
                                </p>
                                <p>
                                    <ul>
                                        {detailRender as ReactNode}
                                    </ul>
                                </p>
                            </div>
                        </div>
                        )
                    })}
                </div>
            </div>
        </Layout>
    )
}
export default about;