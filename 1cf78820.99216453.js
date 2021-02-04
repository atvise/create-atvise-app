(window.webpackJsonp=window.webpackJsonp||[]).push([[4],{73:function(e,a,t){"use strict";t.r(a),t.d(a,"frontMatter",(function(){return c})),t.d(a,"metadata",(function(){return b})),t.d(a,"toc",(function(){return l})),t.d(a,"default",(function(){return p}));var i=t(3),n=t(7),s=(t(0),t(94)),c={slug:"/packages/react",title:"@atvise/webmi-react"},b={unversionedId:"packages/react/README",id:"packages/react/README",isDocsHomePage:!1,title:"@atvise/webmi-react",description:"React bindings for webmi",source:"@site/docs/packages/react/README.md",slug:"/packages/react",permalink:"/create-atvise-app/docs/packages/react",editUrl:"https://github.com/atvise/create-atvise-app/edit/master/packages/gh-pages/docs/packages/react/README.md",version:"current",sidebar:"someSidebar",previous:{title:"@atvise/modular-webmi",permalink:"/create-atvise-app/docs/packages/modular-webmi"},next:{title:"@atvise/types-webmi",permalink:"/create-atvise-app/docs/packages/types-webmi"}},l=[{value:"Installation",id:"installation",children:[{value:"create-atvise-app (recommended)",id:"create-atvise-app-recommended",children:[]},{value:"Manual installation",id:"manual-installation",children:[]}]},{value:"Usage",id:"usage",children:[{value:"Available hooks",id:"available-hooks",children:[]}]}],r={toc:l};function p(e){var a=e.components,t=Object(n.a)(e,["components"]);return Object(s.b)("wrapper",Object(i.a)({},r,t,{components:a,mdxType:"MDXLayout"}),Object(s.b)("blockquote",null,Object(s.b)("p",{parentName:"blockquote"},"React bindings for webmi")),Object(s.b)("h2",{id:"installation"},"Installation"),Object(s.b)("h3",{id:"create-atvise-app-recommended"},"create-atvise-app (recommended)"),Object(s.b)("p",null,"Run ",Object(s.b)("inlineCode",{parentName:"p"},"npx create-atvise-app my-app")," to create a new react app with webmi all set up."),Object(s.b)("h3",{id:"manual-installation"},"Manual installation"),Object(s.b)("p",null,"These are the steps required to add webmi bindings to your existing react project:"),Object(s.b)("ul",null,Object(s.b)("li",{parentName:"ul"},Object(s.b)("p",{parentName:"li"},"First install this package and ",Object(s.b)("inlineCode",{parentName:"p"},"atvise-scripts")," with npm:"),Object(s.b)("p",{parentName:"li"},Object(s.b)("inlineCode",{parentName:"p"},"npm install --save-dev @atvise/webmi-react atvise-scripts"))),Object(s.b)("li",{parentName:"ul"},Object(s.b)("p",{parentName:"li"},"Setup ",Object(s.b)("inlineCode",{parentName:"p"},"atvise-scripts")," with ",Object(s.b)("inlineCode",{parentName:"p"},"npx atvise-scripts init")))),Object(s.b)("h2",{id:"usage"},"Usage"),Object(s.b)("p",null,Object(s.b)("em",{parentName:"p"},"@atvise/webmi-react")," exports hooks that can be used in functional React components:"),Object(s.b)("pre",null,Object(s.b)("code",Object(i.a)({parentName:"pre"},{className:"language-jsx"}),"import { useSubscription } from '@atvise/webmi-react';\n\n/**\n * @example\n * <MyLabel address=\"AGENT.OBJECTS.test\" />\n */\nfunction MyLabel(props) {\n  const { loading, data, error } = useSubscription(props.address);\n\n  if (loading) return <i>loading...</i>;\n  if (error) return <i>An error ocurred</i>;\n\n  return <p>AGENT.OBJECTS.test currently is: {data.value}</p>;\n}\n")),Object(s.b)("h3",{id:"available-hooks"},"Available hooks"),Object(s.b)("ul",{className:"contains-task-list"},Object(s.b)("li",Object(i.a)({parentName:"ul"},{className:"task-list-item"}),Object(s.b)("input",Object(i.a)({parentName:"li"},{type:"checkbox",checked:!0,disabled:!0}))," ",Object(s.b)("inlineCode",{parentName:"li"},"useValue(address)")," - A hooks that reads a variable one time |"),Object(s.b)("li",Object(i.a)({parentName:"ul"},{className:"task-list-item"}),Object(s.b)("input",Object(i.a)({parentName:"li"},{type:"checkbox",checked:!0,disabled:!0}))," ",Object(s.b)("inlineCode",{parentName:"li"},"useSubscription(address)")," - A hooks that subscribes to a variable |")),Object(s.b)("p",null,Object(s.b)("strong",{parentName:"p"},"Upcoming")),Object(s.b)("ul",{className:"contains-task-list"},Object(s.b)("li",Object(i.a)({parentName:"ul"},{className:"task-list-item"}),Object(s.b)("input",Object(i.a)({parentName:"li"},{type:"checkbox",checked:!1,disabled:!0}))," ",Object(s.b)("inlineCode",{parentName:"li"},"useClientVariables()")," - Returns logged in user, selected language, ..."),Object(s.b)("li",Object(i.a)({parentName:"ul"},{className:"task-list-item"}),Object(s.b)("input",Object(i.a)({parentName:"li"},{type:"checkbox",checked:!1,disabled:!0}))," ",Object(s.b)("inlineCode",{parentName:"li"},"useFilterSubscription()")," - Subscription hook with filters (using ",Object(s.b)("em",{parentName:"li"},"webMI.data.subscribeFilters"),")"),Object(s.b)("li",Object(i.a)({parentName:"ul"},{className:"task-list-item"}),Object(s.b)("input",Object(i.a)({parentName:"li"},{type:"checkbox",checked:!1,disabled:!0}))," ",Object(s.b)("inlineCode",{parentName:"li"},"useAlarms")," - A hook that returns alarms, so it can be used for an alarm list / table"),Object(s.b)("li",Object(i.a)({parentName:"ul"},{className:"task-list-item"}),Object(s.b)("input",Object(i.a)({parentName:"li"},{type:"checkbox",checked:!1,disabled:!0}))," ",Object(s.b)("inlineCode",{parentName:"li"},"useCall")," - A hook that calls a webmi method (Requested in ",Object(s.b)("a",Object(i.a)({parentName:"li"},{href:"https://github.com/atvise/create-atvise-app/issues/33"}),"#33"),")")))}p.isMDXComponent=!0}}]);