(window.webpackJsonp=window.webpackJsonp||[]).push([[5],{159:function(e,t,a){"use strict";a.r(t),t.default=a.p+"assets/images/atmonitor-add-project-f62e6168b95a2d734a6c6b60bba73526.png"},160:function(e,t,a){"use strict";a.r(t),t.default=a.p+"assets/images/atmonitor-started-a2dc253c4ecad2f94b5afa4001cb1c3a.png"},161:function(e,t,a){"use strict";a.r(t),t.default=a.p+"assets/images/react-app-44619da7cfe2bc83e7d3f91d33019e88.png"},162:function(e,t,a){"use strict";a.r(t),t.default=a.p+"assets/images/atbuilder-deployed-resources-4febe13ea6534f1ff65b8a1e378ad623.png"},76:function(e,t,a){"use strict";a.r(t),a.d(t,"frontMatter",(function(){return c})),a.d(t,"metadata",(function(){return p})),a.d(t,"toc",(function(){return i})),a.d(t,"default",(function(){return s}));var n=a(3),r=a(7),b=(a(0),a(94)),c={slug:"/",title:"create-atvise-app",custom_edit_url:"https://github.com/atvise/create-atvise-app/edit/master/README.md",sidebar_label:"Introduction"},p={unversionedId:"README",id:"README",isDocsHomePage:!1,title:"create-atvise-app",description:"Tools to integrate atvise into your modern web app project.",source:"@site/docs/README.md",slug:"/",permalink:"/create-atvise-app/docs/",editUrl:"https://github.com/atvise/create-atvise-app/edit/master/README.md",version:"current",sidebar_label:"Introduction",sidebar:"someSidebar",next:{title:"atvise-scripts",permalink:"/create-atvise-app/docs/packages/atvise-scripts"}},i=[{value:"Overview",id:"overview",children:[]},{value:"Quickstart",id:"quickstart",children:[]},{value:"Development",id:"development",children:[]},{value:"Deployment",id:"deployment",children:[]},{value:"Configuration",id:"configuration",children:[]},{value:"Limitations",id:"limitations",children:[]},{value:"What&#39;s included?",id:"whats-included",children:[]},{value:"Packages",id:"packages",children:[]}],o={toc:i};function s(e){var t=e.components,c=Object(r.a)(e,["components"]);return Object(b.b)("wrapper",Object(n.a)({},o,c,{components:t,mdxType:"MDXLayout"}),Object(b.b)("p",null,"Tools to integrate atvise into your modern web app project."),Object(b.b)("blockquote",null,Object(b.b)("p",{parentName:"blockquote"},Object(b.b)("strong",{parentName:"p"},"Note:")," This project is currently under development.")),Object(b.b)("h2",{id:"overview"},"Overview"),Object(b.b)("p",null,Object(b.b)("em",{parentName:"p"},"create-atvise-app")," sets up a modern React development environment for your atvise project in no time. It's built upon facebook's ",Object(b.b)("a",Object(n.a)({parentName:"p"},{href:"https://create-react-app.dev"}),Object(b.b)("em",{parentName:"a"},"create-react-app")),"."),Object(b.b)("h2",{id:"quickstart"},"Quickstart"),Object(b.b)("p",null,"First, make sure you have ",Object(b.b)("a",Object(n.a)({parentName:"p"},{href:"https://nodejs.org/en/"}),"node.js")," (version 12 or newer) installed."),Object(b.b)("blockquote",null,Object(b.b)("details",null,Object(b.b)("summary",null,"How?"),Object(b.b)("p",{parentName:"blockquote"},"Run ",Object(b.b)("inlineCode",{parentName:"p"},"node --version")," on the command line."),Object(b.b)("pre",{parentName:"blockquote"},Object(b.b)("code",Object(n.a)({parentName:"pre"},{className:"language-sh"}),"node --version\nv12.18.2 # The node.js version installed\n")),Object(b.b)("p",{parentName:"blockquote"},"If this command fails or prints a version number lower than ",Object(b.b)("em",{parentName:"p"},"12")," download and install the latest LTS (long term support) version from ",Object(b.b)("a",Object(n.a)({parentName:"p"},{href:"https://nodejs.org/en/"}),"nodejs.org"),"."))),Object(b.b)("p",null,"Next, run ",Object(b.b)("em",{parentName:"p"},"create-react-app")," to create a new project:"),Object(b.b)("blockquote",null,Object(b.b)("p",{parentName:"blockquote"},"Don't worry about installing ",Object(b.b)("em",{parentName:"p"},"create-react-app"),", ",Object(b.b)("inlineCode",{parentName:"p"},"npx")," (npm package runner, shipped with node.js) does this for you \ud83d\ude00")),Object(b.b)("pre",null,Object(b.b)("code",Object(n.a)({parentName:"pre"},{className:"language-bash"}),"npx create-react-app \\\n  --template @atvise/cra-template \\\n  --scripts-version @atvise/react-scripts \\\n  --use-npm \\\n  my-app\n\ncd my-app\n")),Object(b.b)("p",null,"What this does:"),Object(b.b)("ul",null,Object(b.b)("li",{parentName:"ul"},Object(b.b)("p",{parentName:"li"},"Use the custom atvise create-react-app template ",Object(b.b)("em",{parentName:"p"},"@atvise/cra-template")),Object(b.b)("blockquote",{parentName:"li"},Object(b.b)("details",null,Object(b.b)("summary",null,"Use ",Object(b.b)("i",null,"@atvise/cra-template-typescript")," to setup ",Object(b.b)("strong",null,"TypeScript support")),Object(b.b)("pre",{parentName:"blockquote"},Object(b.b)("code",Object(n.a)({parentName:"pre"},{className:"language-bash"}),"npx create-react-app \\\n  --template @atvise/cra-template-typescript \\\n  --scripts-version @atvise/react-scripts \\\n  --use-npm \\\n  my-ts-app\n\ncd my-ts-app\n"))))),Object(b.b)("li",{parentName:"ul"},Object(b.b)("p",{parentName:"li"},"Use an adapted version of react-scripts ",Object(b.b)("em",{parentName:"p"},"@atvise/react-scripts"))),Object(b.b)("li",{parentName:"ul"},Object(b.b)("p",{parentName:"li"},"Use ",Object(b.b)("em",{parentName:"p"},"npm")," instead of ",Object(b.b)("em",{parentName:"p"},"yarn")," to install packages (optional)"))),Object(b.b)("p",null,"Running ",Object(b.b)("inlineCode",{parentName:"p"},"create-react-app")," will generate the initial project structure and install all the tools and resources required to build and run your app. These are the most important files:"),Object(b.b)("pre",null,Object(b.b)("code",Object(n.a)({parentName:"pre"},{className:"language-sh"}),"my-app\n\u251c\u2500\u2500 README.md               # Contains information on how to run the app\n\u251c\u2500\u2500 node_modules            # Contains the app's dependencies\n\u251c\u2500\u2500 package.json            # The app's manifest file\n\u251c\u2500\u2500 .atviserc.json          # Project configuration\n\u251c\u2500\u2500 public                  # Put your static files in here, e.g. images\n\u2502   \u2514\u2500\u2500 index.html          # The file you see when you open your browser\n\u2514\u2500\u2500 src                     # Contains your project's source files\n    \u251c\u2500\u2500 App.js              # The App component (React)\n    \u2514\u2500\u2500 index.js            # Renders the 'App' component\n")),Object(b.b)("p",null,"All in all, we have a fully functional React/atvise app at this point, no more configuration required. Let's test it!"),Object(b.b)("p",null,"First, you have to ",Object(b.b)("strong",{parentName:"p"},"start an atvise server")," in the ",Object(b.b)("inlineCode",{parentName:"p"},"atserver")," directory. The easiest way to do so is via the atvise Project Console."),Object(b.b)("ul",null,Object(b.b)("li",{parentName:"ul"},Object(b.b)("p",{parentName:"li"},"Create a new project"),Object(b.b)("p",{parentName:"li"},Object(b.b)("img",{alt:"Start atvise server",src:a(159).default}))),Object(b.b)("li",{parentName:"ul"},Object(b.b)("p",{parentName:"li"},"Select the ",Object(b.b)("inlineCode",{parentName:"p"},"atserver")," directory as it's path")),Object(b.b)("li",{parentName:"ul"},Object(b.b)("p",{parentName:"li"},"Click ",Object(b.b)("em",{parentName:"p"},"OK")," to create it and")),Object(b.b)("li",{parentName:"ul"},Object(b.b)("p",{parentName:"li"},"Make sure that the ports ",Object(b.b)("em",{parentName:"p"},"4844")," and ",Object(b.b)("em",{parentName:"p"},"8084")," are selected and start atvise server via the \u25b6\ufe0f-Button"),Object(b.b)("p",{parentName:"li"},Object(b.b)("img",{alt:"Start atvise server",src:a(160).default})),Object(b.b)("p",{parentName:"li"},"Jump to ",Object(b.b)("a",Object(n.a)({parentName:"p"},{href:"#configuration"}),"Configuration")," if you need to use other ports."))),Object(b.b)("blockquote",null,Object(b.b)("details",null,Object(b.b)("summary",null,"You can also start atvise server from the command line"),Object(b.b)("p",{parentName:"blockquote"},Object(b.b)("strong",{parentName:"p"},"On Windows")),Object(b.b)("pre",{parentName:"blockquote"},Object(b.b)("code",Object(n.a)({parentName:"pre"},{}),'"C:\\Program Files\\atvise\\atserver.exe" /proj=%cd% atserver/nodes.db /boot\n')),Object(b.b)("p",{parentName:"blockquote"},Object(b.b)("strong",{parentName:"p"},"On Linux")),Object(b.b)("pre",{parentName:"blockquote"},Object(b.b)("code",Object(n.a)({parentName:"pre"},{}),"atserver --proj $(pwd) --boot\n")))),Object(b.b)("p",null,"Now we're ready to start the React development server:"),Object(b.b)("pre",null,Object(b.b)("code",Object(n.a)({parentName:"pre"},{}),"npm start\n")),Object(b.b)("p",null,"This will open your browser and show a fully functional React app, displaying the value of an atvise variable:"),Object(b.b)("p",null,Object(b.b)("img",{alt:"React app",src:a(161).default})),Object(b.b)("h2",{id:"development"},"Development"),Object(b.b)("p",null,"This project makes very little assumptions on how you will develop your React app: You can use almost all UI libraries, routers, internationalization frameworks etc. that work with react."),Object(b.b)("p",null,"Additionally, the ",Object(b.b)("a",Object(n.a)({parentName:"p"},{href:"./packages/react"}),Object(b.b)("inlineCode",{parentName:"a"},"@atvise/webmi-react"))," package provides data bindings between your react app and atvise server. For example, you can use the ",Object(b.b)("inlineCode",{parentName:"p"},"useSubscription")," hook to display a variable's value:"),Object(b.b)("pre",null,Object(b.b)("code",Object(n.a)({parentName:"pre"},{className:"language-jsx"}),"import { useSubscription } from '@atvise/webmi-react';\n\n/**\n * @example\n * <MyLabel address=\"AGENT.OBJECTS.test\" />\n */\nfunction MyLabel(props) {\n  const { loading, data, error } = useSubscription(props.address);\n\n  if (loading) return <i>loading...</i>;\n  if (error) return <i>An error ocurred</i>;\n\n  return <p>AGENT.OBJECTS.test currently is: {data.value}</p>;\n}\n")),Object(b.b)("p",null,"Check out the ",Object(b.b)("a",Object(n.a)({parentName:"p"},{href:"./packages/react"}),Object(b.b)("inlineCode",{parentName:"a"},"@atvise/webmi-react"))," package for details."),Object(b.b)("h2",{id:"deployment"},"Deployment"),Object(b.b)("p",null,"You can deploy it to your atvise server by running ",Object(b.b)("inlineCode",{parentName:"p"},"npm run deploy"),". This command will create a new production build (by running ",Object(b.b)("inlineCode",{parentName:"p"},"npm run build"),") and upload it to your atvise server's project resources. Afterwards, you should see your react app when you open your atvise server in the browser (usually available at ",Object(b.b)("a",Object(n.a)({parentName:"p"},{href:"http://localhost:8084"}),"localhost:8084"),")."),Object(b.b)("p",null,"You can view the deployed files in atvise builder by navigating to the project library's resources:"),Object(b.b)("p",null,Object(b.b)("img",{alt:"Deployment in atvise builder",src:a(162).default})),Object(b.b)("h2",{id:"configuration"},"Configuration"),Object(b.b)("p",null,"You can adjust some project settings inside the ",Object(b.b)("inlineCode",{parentName:"p"},".atviserc.json")," file. It contains a reference to it's schema, so autocompletion should be available in modern IDEs. These are the most important properties:"),Object(b.b)("table",null,Object(b.b)("thead",{parentName:"table"},Object(b.b)("tr",{parentName:"thead"},Object(b.b)("th",Object(n.a)({parentName:"tr"},{align:"left"}),"Key"),Object(b.b)("th",Object(n.a)({parentName:"tr"},{align:"left"}),"Description"),Object(b.b)("th",Object(n.a)({parentName:"tr"},{align:null}),"Default"))),Object(b.b)("tbody",{parentName:"table"},Object(b.b)("tr",{parentName:"tbody"},Object(b.b)("td",Object(n.a)({parentName:"tr"},{align:"left"}),Object(b.b)("inlineCode",{parentName:"td"},"host")),Object(b.b)("td",Object(n.a)({parentName:"tr"},{align:"left"}),"The host atvise server is running at"),Object(b.b)("td",Object(n.a)({parentName:"tr"},{align:null}),Object(b.b)("inlineCode",{parentName:"td"},'"localhost"'))),Object(b.b)("tr",{parentName:"tbody"},Object(b.b)("td",Object(n.a)({parentName:"tr"},{align:"left"}),Object(b.b)("inlineCode",{parentName:"td"},"port.opc")),Object(b.b)("td",Object(n.a)({parentName:"tr"},{align:"left"}),"atvise server's OPC-UA port"),Object(b.b)("td",Object(n.a)({parentName:"tr"},{align:null}),Object(b.b)("inlineCode",{parentName:"td"},"4840"))),Object(b.b)("tr",{parentName:"tbody"},Object(b.b)("td",Object(n.a)({parentName:"tr"},{align:"left"}),Object(b.b)("inlineCode",{parentName:"td"},"port.http")),Object(b.b)("td",Object(n.a)({parentName:"tr"},{align:"left"}),"atvise server's HTTP port"),Object(b.b)("td",Object(n.a)({parentName:"tr"},{align:null}),Object(b.b)("inlineCode",{parentName:"td"},"80"))))),Object(b.b)("h2",{id:"limitations"},"Limitations"),Object(b.b)("p",null,"Using React instead of regular atvise displays and components comes with some drawbacks, too. These are the most important:"),Object(b.b)("ul",null,Object(b.b)("li",{parentName:"ul"},Object(b.b)("p",{parentName:"li"},Object(b.b)("strong",{parentName:"p"},"Regular atvise displays cannot be used")," alongside the react app."),Object(b.b)("p",{parentName:"li"},"In addition the ",Object(b.b)("inlineCode",{parentName:"p"},"webMI.display")," API does not work as expected.")),Object(b.b)("li",{parentName:"ul"},Object(b.b)("p",{parentName:"li"},Object(b.b)("strong",{parentName:"p"},"The graphics functions won't work")),Object(b.b)("p",{parentName:"li"},"Don't use ",Object(b.b)("inlineCode",{parentName:"p"},"webMI.translate")," or ",Object(b.b)("inlineCode",{parentName:"p"},"webMI.gfx"),". You can do almost everything in CSS instead."))),Object(b.b)("blockquote",null,Object(b.b)("p",{parentName:"blockquote"},"This project is currently under development so there may be additional incompatibilities we don't know about yet - Feel free to ",Object(b.b)("a",Object(n.a)({parentName:"p"},{href:"https://github.com/atvise/create-atvise-app/issues/new"}),"create an issue")," if you find one.")),Object(b.b)("h2",{id:"whats-included"},"What's included?"),Object(b.b)("p",null,"Currently, we only support ",Object(b.b)("strong",{parentName:"p"},"React apps"),", but we're planning to add support for Vue and Angular in the future."),Object(b.b)("h2",{id:"packages"},"Packages"),Object(b.b)("p",null,"The whole project is split into different packages:"),Object(b.b)("table",null,Object(b.b)("thead",{parentName:"table"},Object(b.b)("tr",{parentName:"thead"},Object(b.b)("th",Object(n.a)({parentName:"tr"},{align:"left"}),"Name"),Object(b.b)("th",Object(n.a)({parentName:"tr"},{align:"left"}),"Description"))),Object(b.b)("tbody",{parentName:"table"},Object(b.b)("tr",{parentName:"tbody"},Object(b.b)("td",Object(n.a)({parentName:"tr"},{align:"left"}),Object(b.b)("a",Object(n.a)({parentName:"td"},{href:"./examples/playground"}),"@atvise/caa-playground")),Object(b.b)("td",Object(n.a)({parentName:"tr"},{align:"left"}),"A playground that allows you to explore the benefits of using React in an atvise project online")),Object(b.b)("tr",{parentName:"tbody"},Object(b.b)("td",Object(n.a)({parentName:"tr"},{align:"left"}),Object(b.b)("a",Object(n.a)({parentName:"td"},{href:"./packages/atvise-scripts"}),"atvise-scripts")),Object(b.b)("td",Object(n.a)({parentName:"tr"},{align:"left"}),"The scripts used by create-atvise-app to interact with atvise server")),Object(b.b)("tr",{parentName:"tbody"},Object(b.b)("td",Object(n.a)({parentName:"tr"},{align:"left"}),Object(b.b)("a",Object(n.a)({parentName:"td"},{href:"./packages/gh-pages"}),"@atvise/caa-docs")),Object(b.b)("td",Object(n.a)({parentName:"tr"},{align:"left"}),"Sources of our docs")),Object(b.b)("tr",{parentName:"tbody"},Object(b.b)("td",Object(n.a)({parentName:"tr"},{align:"left"}),Object(b.b)("a",Object(n.a)({parentName:"td"},{href:"./packages/modular-webmi"}),"@atvise/modular-webmi")),Object(b.b)("td",Object(n.a)({parentName:"tr"},{align:"left"}),"Modular exports for webmi.js")),Object(b.b)("tr",{parentName:"tbody"},Object(b.b)("td",Object(n.a)({parentName:"tr"},{align:"left"}),Object(b.b)("a",Object(n.a)({parentName:"td"},{href:"./packages/react"}),"@atvise/webmi-react")),Object(b.b)("td",Object(n.a)({parentName:"tr"},{align:"left"}),"React bindings for webmi")),Object(b.b)("tr",{parentName:"tbody"},Object(b.b)("td",Object(n.a)({parentName:"tr"},{align:"left"}),Object(b.b)("a",Object(n.a)({parentName:"td"},{href:"./packages/types-webmi"}),"@atvise/types-webmi")),Object(b.b)("td",Object(n.a)({parentName:"tr"},{align:"left"}),"Type definitions for webmi.js")))))}s.isMDXComponent=!0}}]);