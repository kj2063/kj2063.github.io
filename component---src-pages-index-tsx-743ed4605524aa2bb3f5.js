"use strict";(self.webpackChunkgatsby_starter_default=self.webpackChunkgatsby_starter_default||[]).push([[245],{1042:function(e,t,n){var a=n(6540),l=n(4810);t.A=e=>{var t,n;let{description:r,title:c,children:s}=e;const{site:o}=(0,l.useStaticQuery)("63159454"),i=r||o.siteMetadata.description,m=null===(t=o.siteMetadata)||void 0===t?void 0:t.title;return a.createElement(a.Fragment,null,a.createElement("title",null,m?c+" | "+m:c),a.createElement("meta",{name:"description",content:i}),a.createElement("meta",{property:"og:title",content:c}),a.createElement("meta",{property:"og:description",content:i}),a.createElement("meta",{property:"og:type",content:"website"}),a.createElement("meta",{name:"twitter:card",content:"summary"}),a.createElement("meta",{name:"twitter:creator",content:(null===(n=o.siteMetadata)||void 0===n?void 0:n.author)||""}),a.createElement("meta",{name:"twitter:title",content:c}),a.createElement("meta",{name:"twitter:description",content:i}),s)}},8090:function(e,t,n){n.r(t),n.d(t,{Head:function(){return s},default:function(){return o}});var a=n(6540),l=n(1042);var r=()=>{const e=["학습 및 포스팅","코딩테스트 문제풀이","개인 프로젝트 진행","블로그 확장 개발"],{0:t,1:n}=(0,a.useState)(0),{0:l,1:r}=(0,a.useState)(!1);let c=[];for(let a=0;a<5;a+=1)c=c.concat(e);return a.createElement("div",{className:"roulette-container"},a.createElement("div",{className:"roulette-title"},a.createElement("h3",null,"✏️ 오늘의 개발공부")),a.createElement("div",{className:"roulette-content"},a.createElement("div",{className:"roulette"},a.createElement("div",{className:"roulette-items",style:{transform:"translateY("+t+"px)",transition:"transform 1s ease-out"}},c.map(((e,t)=>a.createElement("div",{key:t,className:"roulette-item"},e))))),a.createElement("button",{type:"button",className:"roulette-button",onClick:()=>{if(l)return;const t=document.querySelector(".roulette-items");t&&(t.style.transition="none",n(0)),r(!0);const a=-60*(4*e.length+Math.floor(Math.random()*e.length));setTimeout((()=>{t&&(t.style.transition="transform 1s ease-out",n(a)),r(!1)}),0)},disabled:l},l?"Spinning...":"Start")))};var c=()=>{const{0:e,1:t}=(0,a.useState)([]),{0:n,1:l}=(0,a.useState)(!0),r=new Date,c=new Date;c.setDate(r.getDate()-10);const s="https://newsapi.org/v2/everything?sources=wired,cnn&q=artificial+intelligence+OR+AI&from="+c.toISOString().split("T")[0]+"&to="+r.toISOString().split("T")[0]+"&sortBy=popularity&pageSize=10&apiKey=d513e6cf816442df8989483cf16d96a1";(0,a.useEffect)((()=>{(async()=>{try{const e=await fetch(s),n=await e.json();t(n.articles),l(!1)}catch(e){t([]),l(!1)}})()}),[]);return a.createElement("div",null,a.createElement("table",{key:"news-table",className:"news-table"},a.createElement("thead",null,a.createElement("tr",null,a.createElement("th",null,"📰 AI 관련 최신 뉴스"))),a.createElement("tbody",null,n?a.createElement("tr",null,a.createElement("td",null,a.createElement("b",null,"Loading..."))):e.length>0?e.map(((e,t)=>a.createElement("tr",{key:"news-table-tr"+t},a.createElement("td",{key:"news-table-td"+t},a.createElement("a",{href:e.url,target:"_blank",rel:"noopener noreferrer"},e.title))))):a.createElement("tr",null,a.createElement("td",null,"최신 기사가 없습니다.")))))};const s=()=>a.createElement(l.A,{title:"Home"});var o=()=>a.createElement("div",null,a.createElement("h2",{className:"mainColor"},"Home"),a.createElement("div",{className:"textCenter"},a.createElement(r,null),a.createElement("br",null),a.createElement("br",null),a.createElement(c,null)))}}]);
//# sourceMappingURL=component---src-pages-index-tsx-743ed4605524aa2bb3f5.js.map