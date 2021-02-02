(window.webpackJsonp=window.webpackJsonp||[]).push([[11],{80:function(e,t,n){"use strict";n.r(t),n.d(t,"frontMatter",(function(){return o})),n.d(t,"metadata",(function(){return c})),n.d(t,"toc",(function(){return s})),n.d(t,"default",(function(){return l}));var r=n(3),a=n(7),i=(n(0),n(86)),o={slug:"/packages/types-webmi",title:"@atvise/types-webmi"},c={unversionedId:"packages/types-webmi/README",id:"packages/types-webmi/README",isDocsHomePage:!1,title:"@atvise/types-webmi",description:"Type definitions for webmi.js",source:"@site/docs/packages/types-webmi/README.md",slug:"/packages/types-webmi",permalink:"/create-atvise-app/docs/packages/types-webmi",editUrl:"https://github.com/atvise/create-atvise-app/edit/master/packages/gh-pages/docs/packages/types-webmi/README.md",version:"current",sidebar:"someSidebar",previous:{title:"@atvise/webmi-react",permalink:"/create-atvise-app/docs/packages/react"},next:{title:"@atvise/caa-playground",permalink:"/create-atvise-app/docs/examples/playground"}},s=[{value:"Installation",id:"installation",children:[]},{value:"Usage",id:"usage",children:[]}],p={toc:s};function l(e){var t=e.components,n=Object(a.a)(e,["components"]);return Object(i.b)("wrapper",Object(r.a)({},p,n,{components:t,mdxType:"MDXLayout"}),Object(i.b)("blockquote",null,Object(i.b)("p",{parentName:"blockquote"},"Type definitions for webmi.js"),Object(i.b)("p",{parentName:"blockquote"},Object(i.b)("strong",{parentName:"p"},"Please note that these definitions are currently work in progress."))),Object(i.b)("h2",{id:"installation"},"Installation"),Object(i.b)("p",null,"Run ",Object(i.b)("inlineCode",{parentName:"p"},"npm install --save-dev @atvise/types-webmi")," to install this package from npm."),Object(i.b)("h2",{id:"usage"},"Usage"),Object(i.b)("p",null,"In your script, that has access to ",Object(i.b)("inlineCode",{parentName:"p"},"window.webMI")," add a ",Object(i.b)("a",Object(r.a)({parentName:"p"},{href:"https://www.typescriptlang.org/docs/handbook/triple-slash-directives.html"}),"Tripple-Slash-Directive"),"."),Object(i.b)("pre",null,Object(i.b)("code",Object(r.a)({parentName:"pre"},{className:"language-ts"}),'/// <reference types="@atvise/types-webmi" />\n\n// At this point, TypeScript will know the `webMI` global and it\'s type.\n\n// Fails, because `isPaused()` returns a boolean\nconst test = webMI.data.isPaused() + 3;\n')))}l.isMDXComponent=!0},86:function(e,t,n){"use strict";n.d(t,"a",(function(){return u})),n.d(t,"b",(function(){return d}));var r=n(0),a=n.n(r);function i(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function o(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function c(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?o(Object(n),!0).forEach((function(t){i(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):o(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function s(e,t){if(null==e)return{};var n,r,a=function(e,t){if(null==e)return{};var n,r,a={},i=Object.keys(e);for(r=0;r<i.length;r++)n=i[r],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(r=0;r<i.length;r++)n=i[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var p=a.a.createContext({}),l=function(e){var t=a.a.useContext(p),n=t;return e&&(n="function"==typeof e?e(t):c(c({},t),e)),n},u=function(e){var t=l(e.components);return a.a.createElement(p.Provider,{value:t},e.children)},b={inlineCode:"code",wrapper:function(e){var t=e.children;return a.a.createElement(a.a.Fragment,{},t)}},m=a.a.forwardRef((function(e,t){var n=e.components,r=e.mdxType,i=e.originalType,o=e.parentName,p=s(e,["components","mdxType","originalType","parentName"]),u=l(n),m=r,d=u["".concat(o,".").concat(m)]||u[m]||b[m]||i;return n?a.a.createElement(d,c(c({ref:t},p),{},{components:n})):a.a.createElement(d,c({ref:t},p))}));function d(e,t){var n=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var i=n.length,o=new Array(i);o[0]=m;var c={};for(var s in t)hasOwnProperty.call(t,s)&&(c[s]=t[s]);c.originalType=e,c.mdxType="string"==typeof e?e:r,o[1]=c;for(var p=2;p<i;p++)o[p]=n[p];return a.a.createElement.apply(null,o)}return a.a.createElement.apply(null,n)}m.displayName="MDXCreateElement"}}]);