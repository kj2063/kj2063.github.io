import * as React from 'react';
import { StaticImage } from 'gatsby-plugin-image';
import careerEnData from '@src/data/career.en.json';
import careerKoData from '@src/data/career.ko.json';
import { LinkedinOutlined, MailOutlined } from '@ant-design/icons';
import Seo from '@src/components/seo';
import '@src/styles/common.css';
import '@src/styles/about.css';

const email = ['kwonjun8890', 'gmail.com'].join('@');

type AboutLanguage = 'ko' | 'en';

type CareerItem = {
  detail: string[];
  period: string;
  title: string;
}

type AboutContent = {
  career: CareerItem[];
  careerEyebrow: string;
  contactLabel: string;
  experienceTitle: string;
  htmlLang: string;
  introduction: string[];
  languageSwitcherLabel: string;
  pageTitle: string;
  profileAlt: string;
}

const technologyDetailPattern = /^(사용 기술(?:\([^)]+\))?|(?:web|ai) technologies|technologies):\s*(.+)$/i;

const parseCareerDetail = (detail: string) => {
  const match = detail.match(technologyDetailPattern);

  if (!match) {
    return {
      text: detail,
      type: 'description' as const,
    };
  }

  return {
    label: match[1],
    technologies: match[2]
      .split(',')
      .map((technology) => technology.trim())
      .filter(Boolean),
    type: 'technology' as const,
  };
};

const aboutLanguageStorageKey = 'aboutLanguage';

const languageOptions: { label: string; value: AboutLanguage }[] = [
  { label: '한국어', value: 'ko' },
  { label: 'English', value: 'en' },
];

const aboutContent: Record<AboutLanguage, AboutContent> = {
  ko: {
    career: careerKoData as CareerItem[],
    careerEyebrow: 'Career',
    contactLabel: '연락처 링크',
    experienceTitle: 'Experience',
    htmlLang: 'ko',
    introduction: [
      '안녕하세요. 소프트웨어 엔지니어 권준입니다.',
      '저는 배우고 성장하는 과정에서 즐거움을 느끼고, 저와 비슷한 사람들과의 협업을 통해 함께 성장해 나가고 싶습니다. 나아가, 이러한 경험들이 더 나은 세상을 만드는 데 기여할 수 있기를 바랍니다.',
      '이곳을 찾아주신 모든 분과 좋은 인연이 있기를 바라며, 감사합니다.',
    ],
    languageSwitcherLabel: '언어 선택',
    pageTitle: 'About',
    profileAlt: '권준 프로필 사진',
  },
  en: {
    career: careerEnData as CareerItem[],
    careerEyebrow: 'Career',
    contactLabel: 'Contact links',
    experienceTitle: 'Experience',
    htmlLang: 'en',
    introduction: [
      'Hello. I am Jun Kwon, a software engineer.',
      'I enjoy the process of learning and growing, and I want to keep improving through collaboration with people who share a similar mindset. I also hope these experiences can contribute to building a better world.',
      'Thank you for visiting. I hope this space leads to meaningful connections.',
    ],
    languageSwitcherLabel: 'Select language',
    pageTitle: 'About',
    profileAlt: 'Jun Kwon profile photo',
  },
};

const isAboutLanguage = (value: string | null): value is AboutLanguage => value === 'ko' || value === 'en';

const getBrowserLanguage = (): AboutLanguage => {
  const browserLanguages = navigator.languages && navigator.languages.length > 0
    ? navigator.languages
    : [navigator.language];

  return browserLanguages.some((languageCode) => languageCode.toLowerCase().startsWith('ko')) ? 'ko' : 'en';
};

const About : React.FC = () => {
  const [language, setLanguage] = React.useState<AboutLanguage>('ko');
  const content = aboutContent[language];

  React.useEffect(() => {
    const storedLanguage = window.localStorage.getItem(aboutLanguageStorageKey);
    const nextLanguage = isAboutLanguage(storedLanguage) ? storedLanguage : getBrowserLanguage();

    setLanguage(nextLanguage);
  }, []);

  React.useEffect(() => {
    document.documentElement.lang = content.htmlLang;
  }, [content.htmlLang]);

  const handleLanguageChange = (nextLanguage: AboutLanguage) => {
    window.localStorage.setItem(aboutLanguageStorageKey, nextLanguage);
    setLanguage(nextLanguage);
  };

  return (
    <div className="aboutPage" lang={content.htmlLang}>
      <div className="aboutPageHeader">
        <h2 id="about-title" className="mainColor">
          {content.pageTitle}
        </h2>
        <div className="languageSwitcher" aria-label={content.languageSwitcherLabel}>
          {languageOptions.map((option) => (
            <button
              type="button"
              className={language === option.value ? 'languageSwitcherButton isActive' : 'languageSwitcherButton'}
              aria-pressed={language === option.value}
              key={option.value}
              onClick={() => handleLanguageChange(option.value)}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>
      <section className="aboutHero" aria-labelledby="about-title">
        <div className="aboutPortrait">
          <StaticImage
            src="../images/jun_circle_img.png"
            loading="eager"
            width={220}
            quality={70}
            formats={['auto', 'webp', 'avif']}
            alt={content.profileAlt}
          />
        </div>
        <div className="aboutHeroCopy">
          <div className="introductionText">
            {content.introduction.map((paragraph) => (
              <p key={paragraph}>
                {paragraph}
              </p>
            ))}
          </div>
          <div className="contactDiv" aria-label={content.contactLabel}>
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
          <p className="aboutEyebrow">{content.careerEyebrow}</p>
          <h2 id="experience-title">{content.experienceTitle}</h2>
        </div>
        <div className="careerList">
          {content.career.map((data, idx) => (
            <article className="careerContentsDiv" key={`${language}-${data.period}-${idx}`}>
              <time className="careerPeriodDiv">
                {data.period}
              </time>
              <div className="careerDetailDiv">
                <h3>
                  {data.title}
                </h3>
                <ul>
                  {data.detail.map((detailData, detailIdx) => {
                    const careerDetail = parseCareerDetail(detailData);

                    if (careerDetail.type === 'technology') {
                      return (
                        <li className="careerTechItem" key={`${idx}-${detailIdx}`}>
                          <span className="careerTechLabel">{careerDetail.label}</span>
                          <span className="careerTechStack">
                            {careerDetail.technologies.map((technology) => (
                              <span className="careerTechChip" key={`${idx}-${detailIdx}-${technology}`}>
                                {technology}
                              </span>
                            ))}
                          </span>
                        </li>
                      );
                    }

                    return <li key={`${idx}-${detailIdx}`}>{careerDetail.text}</li>;
                  })}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
};

export const Head = () => (
  <Seo
    title="About"
    description="Jun Kwon의 경력, 관심 분야, 연락처를 소개하는 페이지입니다."
    pathname="/about"
  />
);

export default About;
