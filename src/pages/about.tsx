import * as React from 'react';
import { StaticImage } from 'gatsby-plugin-image';
import careerData from '@src/data/career.json';
import { LinkedinOutlined, MailOutlined } from '@ant-design/icons';
import Seo from '@src/components/seo';
import '@src/styles/common.css';
import '@src/styles/about.css';

const email = ['kwonjun8890', 'gmail.com'].join('@');

const About : React.FC = () => (
  <div className="aboutPage">
    <h2 id="about-title" className="mainColor">
      About
    </h2>
    <section className="aboutHero" aria-labelledby="about-title">
      <div className="aboutPortrait">
        <StaticImage
          src="../images/jun_circle_img.png"
          loading="eager"
          width={220}
          quality={70}
          formats={['auto', 'webp', 'avif']}
          alt="권준 프로필 사진"
        />
      </div>
      <div className="aboutHeroCopy">
        <div className="introductionText">
          <p>
            안녕하세요. 소프트웨어 엔지니어 권준입니다.
          </p>
          <p>
            저는 배우고 성장하는 과정에서 즐거움을 느끼고, 저와 비슷한 사람들과의 협업을 통해
            함께 성장해 나가고 싶습니다. 나아가, 이러한 경험들이 더 나은 세상을 만드는 데
            기여할 수 있기를 바랍니다.
          </p>
          <p>
            이곳을 찾아주신 모든 분과 좋은 인연이 있기를 바라며, 감사합니다.
          </p>
        </div>
        <div className="contactDiv" aria-label="Contact links">
          <a
            href="https://www.linkedin.com/in/jun-kwon-556246302/"
            target="_blank"
            rel="noreferrer"
            aria-label="LinkedIn profile"
          >
            <LinkedinOutlined className="contactIcon" />
          </a>
          <a href={`mailto:${email}`} aria-label="Send email">
            <MailOutlined className="contactIcon" />
          </a>
        </div>
      </div>
    </section>
    <section className="careerDiv" aria-labelledby="experience-title">
      <div className="sectionHeading">
        <p className="aboutEyebrow">Career</p>
        <h2 id="experience-title">Experience</h2>
      </div>
      <div className="careerList">
        {careerData.map((data, idx) => (
          <article className="careerContentsDiv" key={`career_${idx}`}>
            <time className="careerPeriodDiv" key={`career_period_${idx}`}>
              {data.period}
            </time>
            <div className="careerDetailDiv" key={`career_detail_${idx}`}>
              <h3 key={`career_detail_title_${idx}`}>
                {data.title}
              </h3>
              <ul key={`career_detail_contents_${idx}`}>
                {data.detail.map((detailData, detailIdx) => (
                  <li key={`${idx}-${detailIdx}`}>{detailData}</li>
                ))}
              </ul>
            </div>
          </article>
        ))}
      </div>
    </section>
  </div>
);

export const Head = () => (
  <Seo
    title="About"
    description="Jun Kwon의 경력, 관심 분야, 연락처를 소개하는 페이지입니다."
    pathname="/about"
  />
);

export default About;
