"use strict";(self.webpackChunkgatsby_starter_default=self.webpackChunkgatsby_starter_default||[]).push([[410],{4001:function(e,t,a){var n=a(7294),l=a(1883);t.Z=e=>{var t,a;let{description:r,title:c,children:m}=e;const{site:o}=(0,l.useStaticQuery)("63159454"),i=r||o.siteMetadata.description,s=null===(t=o.siteMetadata)||void 0===t?void 0:t.title;return n.createElement(n.Fragment,null,n.createElement("title",null,s?c+" | "+s:c),n.createElement("meta",{name:"description",content:i}),n.createElement("meta",{property:"og:title",content:c}),n.createElement("meta",{property:"og:description",content:i}),n.createElement("meta",{property:"og:type",content:"website"}),n.createElement("meta",{name:"twitter:card",content:"summary"}),n.createElement("meta",{name:"twitter:creator",content:(null===(a=o.siteMetadata)||void 0===a?void 0:a.author)||""}),n.createElement("meta",{name:"twitter:title",content:c}),n.createElement("meta",{name:"twitter:description",content:i}),m)}},8645:function(e,t,a){a.r(t),a.d(t,{Head:function(){return o}});var n=a(7294),l=a(1883),r=a(381),c=a.n(r),m=a(4001);const o=()=>n.createElement(m.Z,{title:"Blog"});t.default=e=>{const t=e.data.allMarkdownRemark.edges.map((e=>{const t=e.node.frontmatter;return n.createElement("tr",{className:"postDiv",key:t.slug},n.createElement("td",{className:"dateStyle mgl30"},c()(t.date).format("YYYY.MM.DD")),n.createElement("td",null,n.createElement(l.Link,{className:"titleStyle",to:t.slug},t.title)))}));return n.createElement("div",null,n.createElement("h2",{className:"mainColor"},"Blog"),n.createElement("table",{className:"blogTable"},n.createElement("tbody",null,t)))}}}]);
//# sourceMappingURL=component---src-pages-blog-tsx-85f534e3c8fd6e80a0fc.js.map