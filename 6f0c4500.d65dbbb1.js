(window.webpackJsonp=window.webpackJsonp||[]).push([[7],{75:function(e,t,r){"use strict";r.r(t),r.d(t,"frontMatter",(function(){return s})),r.d(t,"metadata",(function(){return c})),r.d(t,"toc",(function(){return o})),r.d(t,"default",(function(){return l}));var n=r(3),a=r(7),i=(r(0),r(86)),s={slug:"/packages/atvise-scripts",title:"atvise-scripts"},c={unversionedId:"packages/atvise-scripts/README",id:"packages/atvise-scripts/README",isDocsHomePage:!1,title:"atvise-scripts",description:"The scripts used by create-atvise-app to interact with atvise server.",source:"@site/docs/packages/atvise-scripts/README.md",slug:"/packages/atvise-scripts",permalink:"/create-atvise-app/docs/packages/atvise-scripts",editUrl:"https://github.com/LukasHechenberger/create-atvise-app/edit/master/packages/gh-pages/docs/packages/atvise-scripts/README.md",version:"current",sidebar:"someSidebar",previous:{title:"create-atvise-app",permalink:"/create-atvise-app/docs/"},next:{title:"@atvise/caa-docs",permalink:"/create-atvise-app/docs/packages/gh-pages"}},o=[{value:"Usage",id:"usage",children:[]},{value:"Known limitations",id:"known-limitations",children:[]}],p={toc:o};function l(e){var t=e.components,r=Object(a.a)(e,["components"]);return Object(i.b)("wrapper",Object(n.a)({},p,r,{components:t,mdxType:"MDXLayout"}),Object(i.b)("blockquote",null,Object(i.b)("p",{parentName:"blockquote"},"The scripts used by create-atvise-app to interact with atvise server.")),Object(i.b)("h2",{id:"usage"},"Usage"),Object(i.b)("pre",null,Object(i.b)("code",Object(n.a)({parentName:"pre"},{}),"Usage: atvise-scripts <script> [options]\n\n  The scripts used by create-atvise-app to interact with atvise server\n\nScripts:\n\n  deploy   Deploy build files to atvise server\n  prepare  Prepare project for atvise-scripts\n  init     Setup a project for atvise-scripts\n\nOptions:\n\n  --version, -v  Print atvise-scripts version and exit\n  --help, -h     Print usage and exit\n")),Object(i.b)("h2",{id:"known-limitations"},"Known limitations"),Object(i.b)("p",null,Object(i.b)("strong",{parentName:"p"},Object(i.b)("inlineCode",{parentName:"strong"},"atvise-scripts deploy"))),Object(i.b)("ul",{className:"contains-task-list"},Object(i.b)("li",Object(n.a)({parentName:"ul"},{className:"task-list-item"}),Object(i.b)("input",Object(n.a)({parentName:"li"},{type:"checkbox",checked:!1,disabled:!0}))," ","Currenty does not delete ",Object(i.b)("em",{parentName:"li"},"Translate")," references on deployed svg files (See ",Object(i.b)("a",Object(n.a)({parentName:"li"},{href:"https://github.com/LukasHechenberger/create-atvise-app/issues/14"}),"create-atvise-app#14"),")")))}l.isMDXComponent=!0},86:function(e,t,r){"use strict";r.d(t,"a",(function(){return u})),r.d(t,"b",(function(){return v}));var n=r(0),a=r.n(n);function i(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function s(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function c(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?s(Object(r),!0).forEach((function(t){i(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):s(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function o(e,t){if(null==e)return{};var r,n,a=function(e,t){if(null==e)return{};var r,n,a={},i=Object.keys(e);for(n=0;n<i.length;n++)r=i[n],t.indexOf(r)>=0||(a[r]=e[r]);return a}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(n=0;n<i.length;n++)r=i[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(a[r]=e[r])}return a}var p=a.a.createContext({}),l=function(e){var t=a.a.useContext(p),r=t;return e&&(r="function"==typeof e?e(t):c(c({},t),e)),r},u=function(e){var t=l(e.components);return a.a.createElement(p.Provider,{value:t},e.children)},b={inlineCode:"code",wrapper:function(e){var t=e.children;return a.a.createElement(a.a.Fragment,{},t)}},d=a.a.forwardRef((function(e,t){var r=e.components,n=e.mdxType,i=e.originalType,s=e.parentName,p=o(e,["components","mdxType","originalType","parentName"]),u=l(r),d=n,v=u["".concat(s,".").concat(d)]||u[d]||b[d]||i;return r?a.a.createElement(v,c(c({ref:t},p),{},{components:r})):a.a.createElement(v,c({ref:t},p))}));function v(e,t){var r=arguments,n=t&&t.mdxType;if("string"==typeof e||n){var i=r.length,s=new Array(i);s[0]=d;var c={};for(var o in t)hasOwnProperty.call(t,o)&&(c[o]=t[o]);c.originalType=e,c.mdxType="string"==typeof e?e:n,s[1]=c;for(var p=2;p<i;p++)s[p]=r[p];return a.a.createElement.apply(null,s)}return a.a.createElement.apply(null,r)}d.displayName="MDXCreateElement"}}]);