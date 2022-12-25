"use strict";(self.webpackChunkgatsby_starter_default=self.webpackChunkgatsby_starter_default||[]).push([[49],{3723:function(e,t,a){a.d(t,{L:function(){return g},M:function(){return E},P:function(){return v},S:function(){return A},_:function(){return l},a:function(){return s},b:function(){return c},g:function(){return d},h:function(){return o}});var r=a(7294),n=(a(2369),a(5697)),i=a.n(n);function s(){return s=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var a=arguments[t];for(var r in a)Object.prototype.hasOwnProperty.call(a,r)&&(e[r]=a[r])}return e},s.apply(this,arguments)}function l(e,t){if(null==e)return{};var a,r,n={},i=Object.keys(e);for(r=0;r<i.length;r++)t.indexOf(a=i[r])>=0||(n[a]=e[a]);return n}const o=()=>"undefined"!=typeof HTMLImageElement&&"loading"in HTMLImageElement.prototype;function c(e,t,a,r,n){return void 0===n&&(n={}),s({},a,{loading:r,shouldLoad:e,"data-main-image":"",style:s({},n,{opacity:t?1:0})})}function d(e,t,a,r,n,i,l,o){const c={};i&&(c.backgroundColor=i,"fixed"===a?(c.width=r,c.height=n,c.backgroundColor=i,c.position="relative"):("constrained"===a||"fullWidth"===a)&&(c.position="absolute",c.top=0,c.left=0,c.bottom=0,c.right=0)),l&&(c.objectFit=l),o&&(c.objectPosition=o);const d=s({},e,{"aria-hidden":!0,"data-placeholder-image":"",style:s({opacity:t?0:1,transition:"opacity 500ms linear"},c)});return d}const u=["children"],m=function(e){let{layout:t,width:a,height:n}=e;return"fullWidth"===t?r.createElement("div",{"aria-hidden":!0,style:{paddingTop:n/a*100+"%"}}):"constrained"===t?r.createElement("div",{style:{maxWidth:a,display:"block"}},r.createElement("img",{alt:"",role:"presentation","aria-hidden":"true",src:"data:image/svg+xml;charset=utf-8,%3Csvg height='"+n+"' width='"+a+"' xmlns='http://www.w3.org/2000/svg' version='1.1'%3E%3C/svg%3E",style:{maxWidth:"100%",display:"block",position:"static"}})):null},g=function(e){let{children:t}=e,a=l(e,u);return r.createElement(r.Fragment,null,r.createElement(m,s({},a)),t,null)},p=["src","srcSet","loading","alt","shouldLoad"],f=["fallback","sources","shouldLoad"],b=function(e){let{src:t,srcSet:a,loading:n,alt:i="",shouldLoad:o}=e,c=l(e,p);return r.createElement("img",s({},c,{decoding:"async",loading:n,src:o?t:void 0,"data-src":o?void 0:t,srcSet:o?a:void 0,"data-srcset":o?void 0:a,alt:i}))},h=function(e){let{fallback:t,sources:a=[],shouldLoad:n=!0}=e,i=l(e,f);const o=i.sizes||(null==t?void 0:t.sizes),c=r.createElement(b,s({},i,t,{sizes:o,shouldLoad:n}));return a.length?r.createElement("picture",null,a.map((e=>{let{media:t,srcSet:a,type:i}=e;return r.createElement("source",{key:t+"-"+i+"-"+a,type:i,media:t,srcSet:n?a:void 0,"data-srcset":n?void 0:a,sizes:o})})),c):c};var y;b.propTypes={src:n.string.isRequired,alt:n.string.isRequired,sizes:n.string,srcSet:n.string,shouldLoad:n.bool},h.displayName="Picture",h.propTypes={alt:n.string.isRequired,shouldLoad:n.bool,fallback:n.exact({src:n.string.isRequired,srcSet:n.string,sizes:n.string}),sources:n.arrayOf(n.oneOfType([n.exact({media:n.string.isRequired,type:n.string,sizes:n.string,srcSet:n.string.isRequired}),n.exact({media:n.string,type:n.string.isRequired,sizes:n.string,srcSet:n.string.isRequired})]))};const w=["fallback"],v=function(e){let{fallback:t}=e,a=l(e,w);return t?r.createElement(h,s({},a,{fallback:{src:t},"aria-hidden":!0,alt:""})):r.createElement("div",s({},a))};v.displayName="Placeholder",v.propTypes={fallback:n.string,sources:null==(y=h.propTypes)?void 0:y.sources,alt:function(e,t,a){return e[t]?new Error("Invalid prop `"+t+"` supplied to `"+a+"`. Validation failed."):null}};const E=function(e){return r.createElement(r.Fragment,null,r.createElement(h,s({},e)),r.createElement("noscript",null,r.createElement(h,s({},e,{shouldLoad:!0}))))};E.displayName="MainImage",E.propTypes=h.propTypes;const _=function(e,t,a){for(var r=arguments.length,n=new Array(r>3?r-3:0),s=3;s<r;s++)n[s-3]=arguments[s];return e.alt||""===e.alt?i().string.apply(i(),[e,t,a].concat(n)):new Error('The "alt" prop is required in '+a+'. If the image is purely presentational then pass an empty string: e.g. alt="". Learn more: https://a11y-style-guide.com/style-guide/section-media.html')},C={image:i().object.isRequired,alt:_},k=["as","image","style","backgroundColor","className","class","onStartLoad","onLoad","onError"],x=["style","className"],L=new Set;let S,T;const j=function(e){let{as:t="div",image:n,style:i,backgroundColor:c,className:d,class:u,onStartLoad:m,onLoad:g,onError:p}=e,f=l(e,k);const{width:b,height:h,layout:y}=n,w=function(e,t,a){const r={};let n="gatsby-image-wrapper";return"fixed"===a?(r.width=e,r.height=t):"constrained"===a&&(n="gatsby-image-wrapper gatsby-image-wrapper-constrained"),{className:n,"data-gatsby-image-wrapper":"",style:r}}(b,h,y),{style:v,className:E}=w,_=l(w,x),C=(0,r.useRef)(),j=(0,r.useMemo)((()=>JSON.stringify(n.images)),[n.images]);u&&(d=u);const z=function(e,t,a){let r="";return"fullWidth"===e&&(r='<div aria-hidden="true" style="padding-top: '+a/t*100+'%;"></div>'),"constrained"===e&&(r='<div style="max-width: '+t+'px; display: block;"><img alt="" role="presentation" aria-hidden="true" src="data:image/svg+xml;charset=utf-8,%3Csvg height=\''+a+"' width='"+t+"' xmlns='http://www.w3.org/2000/svg' version='1.1'%3E%3C/svg%3E\" style=\"max-width: 100%; display: block; position: static;\"></div>"),r}(y,b,h);return(0,r.useEffect)((()=>{S||(S=Promise.all([a.e(774),a.e(223)]).then(a.bind(a,8223)).then((e=>{let{renderImageToString:t,swapPlaceholderImage:a}=e;return T=t,{renderImageToString:t,swapPlaceholderImage:a}})));const e=C.current.querySelector("[data-gatsby-image-ssr]");if(e&&o())return e.complete?(null==m||m({wasCached:!0}),null==g||g({wasCached:!0}),setTimeout((()=>{e.removeAttribute("data-gatsby-image-ssr")}),0)):(null==m||m({wasCached:!0}),e.addEventListener("load",(function t(){e.removeEventListener("load",t),null==g||g({wasCached:!0}),setTimeout((()=>{e.removeAttribute("data-gatsby-image-ssr")}),0)}))),void L.add(j);if(T&&L.has(j))return;let t,r;return S.then((e=>{let{renderImageToString:a,swapPlaceholderImage:l}=e;C.current&&(C.current.innerHTML=a(s({isLoading:!0,isLoaded:L.has(j),image:n},f)),L.has(j)||(t=requestAnimationFrame((()=>{C.current&&(r=l(C.current,j,L,i,m,g,p))}))))})),()=>{t&&cancelAnimationFrame(t),r&&r()}}),[n]),(0,r.useLayoutEffect)((()=>{L.has(j)&&T&&(C.current.innerHTML=T(s({isLoading:L.has(j),isLoaded:L.has(j),image:n},f)),null==m||m({wasCached:!0}),null==g||g({wasCached:!0}))}),[n]),(0,r.createElement)(t,s({},_,{style:s({},v,i,{backgroundColor:c}),className:E+(d?" "+d:""),ref:C,dangerouslySetInnerHTML:{__html:z},suppressHydrationWarning:!0}))},z=(0,r.memo)((function(e){return e.image?(0,r.createElement)(j,e):null}));z.propTypes=C,z.displayName="GatsbyImage";const I=["src","__imageData","__error","width","height","aspectRatio","tracedSVGOptions","placeholder","formats","quality","transformOptions","jpgOptions","pngOptions","webpOptions","avifOptions","blurredOptions","breakpoints","outputPixelDensities"],O=function(e,t){for(var a=arguments.length,r=new Array(a>2?a-2:0),n=2;n<a;n++)r[n-2]=arguments[n];return"fullWidth"!==e.layout||"width"!==t&&"height"!==t||!e[t]?i().number.apply(i(),[e,t].concat(r)):new Error('"'+t+'" '+e[t]+" may not be passed when layout is fullWidth.")},N=new Set(["fixed","fullWidth","constrained"]),q={src:i().string.isRequired,alt:_,width:O,height:O,sizes:i().string,layout:e=>{if(void 0!==e.layout&&!N.has(e.layout))return new Error("Invalid value "+e.layout+'" provided for prop "layout". Defaulting to "constrained". Valid values are "fixed", "fullWidth" or "constrained".')}},A=(R=z,function(e){let{src:t,__imageData:a,__error:n}=e,i=l(e,I);return n&&console.warn(n),a?r.createElement(R,s({image:a},i)):(console.warn("Image not loaded",t),null)});var R;A.displayName="StaticImage",A.propTypes=q},2369:function(e){const t=(e,t)=>{if("string"!=typeof e&&!Array.isArray(e))throw new TypeError("Expected the input to be `string | string[]`");t=Object.assign({pascalCase:!1},t);if(e=Array.isArray(e)?e.map((e=>e.trim())).filter((e=>e.length)).join("-"):e.trim(),0===e.length)return"";if(1===e.length)return t.pascalCase?e.toUpperCase():e.toLowerCase();return e!==e.toLowerCase()&&(e=(e=>{let t=!1,a=!1,r=!1;for(let n=0;n<e.length;n++){const i=e[n];t&&/[a-zA-Z]/.test(i)&&i.toUpperCase()===i?(e=e.slice(0,n)+"-"+e.slice(n),t=!1,r=a,a=!0,n++):a&&r&&/[a-zA-Z]/.test(i)&&i.toLowerCase()===i?(e=e.slice(0,n-1)+"-"+e.slice(n-1),r=a,a=!1,t=!0):(t=i.toLowerCase()===i&&i.toUpperCase()!==i,r=a,a=i.toUpperCase()===i&&i.toLowerCase()!==i)}return e})(e)),e=e.replace(/^[_.\- ]+/,"").toLowerCase().replace(/[_.\- ]+(\w|$)/g,((e,t)=>t.toUpperCase())).replace(/\d+(\w|$)/g,(e=>e.toUpperCase())),a=e,t.pascalCase?a.charAt(0).toUpperCase()+a.slice(1):a;var a};e.exports=t,e.exports.default=t},2766:function(e,t,a){a.r(t);var r=a(7294),n=a(5592),i=a(3723);t.default=()=>r.createElement(n.Z,null,r.createElement("h1",null,r.createElement("b",null,"About")),r.createElement("div",{className:"textCenter"},r.createElement(i.S,{src:"../images/jun_circle_img.png",loading:"eager",width:200,quality:100,formats:["auto","webp","avif"],__imageData:a(6464)}),r.createElement("div",{className:"introductionText"},"Hello. I'm software engineer Jun Kwon.",r.createElement("br",null),"Thank you for visit my blog and you can check out my carrer below.",r.createElement("br",null),"Have a nice day!")))},5592:function(e,t,a){a.d(t,{Z:function(){return l}});var r=a(7294),n=a(1883),i=a(1278);var s=e=>{let{siteTitle:t}=e;return r.createElement(i.Z.Consumer,null,(e=>r.createElement("div",null,r.createElement("header",{style:{margin:"0 auto",padding:"var(--space-4) var(--size-gutter)",display:"flex",alignItems:"center",justifyContent:"space-between"}},r.createElement(n.Link,{to:"/",style:{fontSize:"var(--font-sm)",textDecoration:"none"}},r.createElement("b",null,t)),r.createElement("div",null,r.createElement(n.Link,{to:"/",style:{fontSize:"var(--font-sm)",textDecoration:"none"}},"Blog"),"  ",r.createElement(n.Link,{to:"/about",style:{fontSize:"var(--font-sm)",textDecoration:"none"}},"About"),"  ",r.createElement("button",{className:"dark-switcher",onClick:e.toggleDark},e.dark?r.createElement("b",null,"☀"):r.createElement("b",null,"☾")))))))};var l=e=>{let{children:t}=e;const a=(0,n.useStaticQuery)("3649515864");return r.createElement(i.Z.Consumer,null,(e=>{var n,i;return r.createElement("div",{className:e.dark?"dark":"light"},r.createElement(s,{siteTitle:null===(n=a.site.siteMetadata)||void 0===n?void 0:n.title}),r.createElement("div",{style:{margin:"0 auto",maxWidth:"var(--size-content)",padding:"var(--size-gutter)"}},r.createElement("main",null,t),r.createElement("footer",{style:{marginTop:"100px",fontSize:"var(--font-sm)",color:"darkgray"}},"© 2022 by ",null===(i=a.site.siteMetadata)||void 0===i?void 0:i.title)))}))}},6464:function(e){e.exports=JSON.parse('{"layout":"constrained","backgroundColor":"#080808","images":{"fallback":{"src":"/static/6f4be20ec1b01c2fb62eaaf7bd35275d/614dc/jun_circle_img.png","srcSet":"/static/6f4be20ec1b01c2fb62eaaf7bd35275d/5861f/jun_circle_img.png 50w,\\n/static/6f4be20ec1b01c2fb62eaaf7bd35275d/90cd3/jun_circle_img.png 100w,\\n/static/6f4be20ec1b01c2fb62eaaf7bd35275d/614dc/jun_circle_img.png 200w,\\n/static/6f4be20ec1b01c2fb62eaaf7bd35275d/5f2c3/jun_circle_img.png 400w","sizes":"(min-width: 200px) 200px, 100vw"},"sources":[{"srcSet":"/static/6f4be20ec1b01c2fb62eaaf7bd35275d/a713c/jun_circle_img.avif 50w,\\n/static/6f4be20ec1b01c2fb62eaaf7bd35275d/322dd/jun_circle_img.avif 100w,\\n/static/6f4be20ec1b01c2fb62eaaf7bd35275d/73fca/jun_circle_img.avif 200w,\\n/static/6f4be20ec1b01c2fb62eaaf7bd35275d/44a11/jun_circle_img.avif 400w","type":"image/avif","sizes":"(min-width: 200px) 200px, 100vw"},{"srcSet":"/static/6f4be20ec1b01c2fb62eaaf7bd35275d/9afd2/jun_circle_img.webp 50w,\\n/static/6f4be20ec1b01c2fb62eaaf7bd35275d/e64f1/jun_circle_img.webp 100w,\\n/static/6f4be20ec1b01c2fb62eaaf7bd35275d/8b00d/jun_circle_img.webp 200w,\\n/static/6f4be20ec1b01c2fb62eaaf7bd35275d/9c0a1/jun_circle_img.webp 400w","type":"image/webp","sizes":"(min-width: 200px) 200px, 100vw"}]},"width":200,"height":200}')}}]);
//# sourceMappingURL=component---src-pages-about-tsx-9f1b50e0068f3f16d9d7.js.map