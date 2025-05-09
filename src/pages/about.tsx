import * as React from 'react';
import { StaticImage } from 'gatsby-plugin-image';
import careerData from '@src/data/career.json';
import { ReactNode } from 'react';
import { LinkedinOutlined, MailOutlined } from '@ant-design/icons';
import Seo from '@src/components/seo';
import '@src/styles/common.css';
import '@src/styles/about.css';

const about : React.FC = () => (
  <div>
    <h2 className="mainColor">
      About
    </h2>
    <div className="textCenter">
      <StaticImage
        src="../images/jun_circle_img.png"
        loading="eager"
        width={200}
        quality={60}
        formats={['auto', 'webp', 'avif']}
        alt=""
      />
      <div className="introductionText">
        안녕하세요. 소프트웨어 엔지니어 권준입니다.
        <br />
        저는 배우고 성장하는 과정에서 즐거움을 느끼고, 저와 비슷한 사람들과의 협업을 통해 함께 성장해 나가고 싶습니다.
        &nbsp;나아가, 이러한 경험들이 더 나은 세상을 만드는 데 기여할 수 있기를 바랍니다.
        <br />
        이곳을 찾아주신 모든 분과 좋은 인연이 있기를 바라며, 감사합니다.
      </div>
    </div>
    <div className="contactDiv">
      <button
        type="button"
        onClick={() => {
          window.open(
            'https://www.linkedin.com/in/jun-kwon-556246302/',
            '_blank',
            'noopener,noreferrer',
          );
        }}
      >
        <LinkedinOutlined style={{ fontSize: '25px' }} />
      </button>
      <button type="button" onClick={() => { window.location.href = `mailto:${['kwonjun8890', 'gmail.com'].join('@')}`; }}>
        <MailOutlined style={{ fontSize: '25px' }} />
      </button>
    </div>
    <div className="careerDiv">
      <h2>Experience</h2>
      <div>
        {careerData.map((data, idx) => {
          const detailRender = data.detail.map((detailData, detailIdx) => <li color="red" key={`${idx}-${detailIdx}`}>{detailData}</li>);
          return (
            <div className="careerContentsDiv flexBox" key={`career_${idx}`}>
              <div className="careerPeriodDiv flexItem" key={`career_period_${idx}`}>
                {data.period}
              </div>
              <div className="careerDetailDiv" key={`career_detail_${idx}`}>
                <p key={`career_detail_title_${idx}`}>
                  {data.title}
                </p>
                <ul key={`career_detail_contents_${idx}`}>
                  {detailRender as ReactNode}
                </ul>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  </div>
);

export const Head = () => <Seo title="About" />;

export default about;
