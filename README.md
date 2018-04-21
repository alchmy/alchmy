# <a name="introduction"></a> PINE Web Components 

[![polymer-image](https://ipfs.io/ipfs/QmXcmDzTAWsAtUQVpybo5zF3FVw9qyUZDh3ujDD2WerLxd/polymer-3.0-da89b4.svg)](https://www.polymer-project.org/blog/2017-08-23-hands-on-30-preview)
[![ipfs-image](https://ipfs.io/ipfs/QmXcmDzTAWsAtUQVpybo5zF3FVw9qyUZDh3ujDD2WerLxd/ipfs-0.4.13-256272.svg)](https://ipfs.io)
[![npm-image](https://ipfs.io/ipfs/QmXcmDzTAWsAtUQVpybo5zF3FVw9qyUZDh3ujDD2WerLxd/npm-5.6.1-e42a2a.svg)](https://npmjs.org)
[![express-image](https://ipfs.io/ipfs/QmXcmDzTAWsAtUQVpybo5zF3FVw9qyUZDh3ujDD2WerLxd/express-4.16.0-cacdcf.svg)](https://expressjs.com)

*BE WARNED THIS IS NOT PRODUCTION READY, UNLESS YOU HAVE PLANS TO HELP ITS NOT WORTH DOWNLOADING,* **IT'S VERY MUCH A LIVING DOCUMENT!**

SPINE Components. A generator for installing SPINE web components and hosting them in a decentralized database. SPINE is an acronym for Storj Polymer IPFS Node Express.

## <a name="summary"></a> Summary

`pine-cli` is a cli tool for quickly adding and creating webcomponents from several different libraries. For adding prebuilt components quickly, it uses the [related github polymer_web_components](https://github.com/musicsmithnz/pine_web_components) which is a library still in development that contains ready-made components based on typical implementations from the styling frameworks or component libraries [listed below](#libraries). The cli is usable without reference to these libraries, as you have the option to download components peer-to-peer using [IPFS](https://ipfs.io), as well as create your own elements without using these pre-built components at all. The cli tool is a useful way to install components quickly, rapidly speeding development, but it is also designed to be used with IPFS peers. Thus, if a significant number of people use this project, your website resources should load faster as each element will essentially be torrented separately by your peers hosting their own websites with these components.

It is a new project but I anticipate it being able to save people a lot of time in the future. It is made with Polymer3, using the new standard for importing components with ES modules. I plan to make a easy to use cli tool allowing easy import of web components from the component libraries and styling frameworks. For the styling frameworks, I will need to create the components first based on common paradigms and code snippets from official tutorials and examples. 

#### <a name="libraries"></a>Supported Component Libraries and Styling Frameworks

*component libraries*

* [Polymer Elements](https://www.webcomponents.org/collection/Polymer/elements) - Official Polymer components of Google.
* [simplajs](https://www.simplajs.org/) - Clean, prebuilt components for user live editing. Helpful for forms, Social media, CMSs.

*styling frameworks*

* [Material Design Components](https://material.io/components/web/catalog) - Official Google Components based on Material Design. Though called components, without Angular or Polymer it's more a styling framework or a framework for building components. See [more](https://github.com/musicsmithnz/pine-cli/tutorial_and_examples/material_design_components/SUMMARY.md).
* [Semantic-ui](https://semantic-ui.com/) - Clean, modern, easier to use than MDC as there is less to include in the modules.
* [Materialize](http://next.materializecss.com) - Easy to use Material Design based css framework.
* [MUI](https://www.muicss.com) - Lightweight framework based on Googles Material Design. 
* [Material Bootstrap](https://mdbootstrap.com) - Perhaps implemented later.
* [Bootstrap](https://getbootstrap.com) - Perhaps implemented later.
* [Foundation](https://foundation.zurb.com) - Perhaps implemented later.

When `pine-cli` is downloaded, one can easily search, download, and insert web components into your own project. At the moment, entire libraries are imported for every element. Obviously this is not ideal. I intend to do some kind of code splicing and tree shakng so that each element has the bare minimum for each library. Bootstrap, Foundation, Material components can then all be easily used together(if you like), and in a much more minimal way. 


# <a name="contents"></a> Contents

#### _There is a * over sections in the Tutorial Contents that show the corresponding feature has not been implemented._

## General

1. [Introduction](#introduction)
2. [Summary](#summary)
3. [Component Libraries and Styling Frameworks](#libraries)
4. [Contents](#contents)

## Tutorial

1. [Installation](#installation)
    1. [Environment Setup](#environment-setup)
    2. [pine-cli Setup](#spinec-setup)
2. [Building the App](#building)
    1. [Building Method 1 (Recommended) - Adding and Linking to Prebuilt Components](#building-method-1)
    2. [Building Method 2 - Downloading, Customizing and Building Your Own Components](#building-method-2) *
    3. [Building Method 3 - Installing a Pre-Built App](#building-method-3)*
3. [Serving](#serving) 
    1. [Serving Method 1 (Recommended) - Serving from IPFS](#serving-method-1) *(Only Static Resources Sofar)*
    2. [Serving Method 2 - Serving from Github](#serving-method-2)*
    3. [Serving Method 3 - Serving from CDN](#serving-method-3) *
    4. [Serving Method 4 - Serving from Local/Own Server](#serving-method-4) 
___

### 1. <a name="installation"></a>Installation

#### <a name="environment-setup"></a>Environment Setup
If you are not starting a project from scratch, skip to [pine-cli setup](#spinec-setup). Sometimes Linux users have trouble with global installations of npm packages due to [permissions errors](https://docs.npmjs.com/getting-started/fixing-npm-permissions).

```bash
curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.8/install.sh | bash
source ~/.bashrc
nvm install node
nvm use node
mkdir myproject
cd myproject
```

#### <a name="pine-cli-setup"></a>spinec Setup

```bash
npm init -y
npm install pine-cli --save
npm install pine-cli --global
wget --output-document=index.html https://ipfs.io/ipfs/QmWckGtnq3dnFWuJUqqwPQ7HWH28SA31RWN7VZREGStgFR
mkdir -p src/components
```

This will install a global command that can be used right away to help you build a website by downloading ready made components and automatically injecting references to them into an `index.html` file. The references can be to any repository mentioned in [Serving](#serving).

### 2. <a name="building"></a>Building the App

There are two main commands to be used to build a website. You can stick with one method, or you can do a little of each. 

1. [Building Method 1](#building-method-1) - Adding prebuilt elements using 
    `pine-cli add prebuilt-component-name`
2. [Building Method 2](#building-method-2) - building your own components using 
    `pine-cli new my-custom-component-name`

These two methods can be combined on the same project. If you want a simple introduction, choose [Building Method 1](#building-method-1)

#### <a name="building-method-1"></a>Building Method 1 - Linking to Components (in P2P/IPFS or other Repo)

```bash
pine-cli add materialize-navbar
pine-cli add mui-grid-fluid-1-2
pine-cli add materialize-footer
```
The `<materialize-navbar>` and `<materialize-footer>` above will probably be exactly what you expect. The first word of the tag name is the css styling framework that is used, and the following words are a description of the tags content. The `<mui-grid-fluid-1-2>` is a grid for placing other elements inside. The `1-2` at the end represents the basic layout of the site. Which means the right section is twice the width of the left section.

Once each component has been added, a reference to the component will be inserted into your `index.html` file. At this point, you should be able to use the webcomponents within your `index.html` just like you would use any other html tag. For example, you could use the elements you added above like this:

```html
<body>
    <header>
        <materialize-navbar></materialize-navbar>
    </header>
    <main>
        <mui-grid-fluid-1-2></mui-grid-fluid-1-2>
    </main>
    <footer>
        <materialize-footer></materialize-footer>
    </footer>
</body>
```

#### <a name="building-method-2"></a>Building Method 2 - Downloading, Building, and Customizing New Components

```bash
pine-cli new my-custom-navbar -s materialize
pine-cli new my-custom-grid 
pine-cli new my-custom-table -h html_template_url
pine-cli new materialize-footer -b polymer_component_url
```

This code shows you how to create your own polymer web components. These components will be placed into a `components` folder. Note the options that can be used with this tag. 

Using `-s` you can add the name of one of the supported frameworks listed in the introduction and it will include links to the libraries in your polymer component. Note, this may use a lot of unnecessary code, as it includes the libraries separately for each element. This might be a problem, but your browser also might solve this automatically with cacheing. Also note, styles do leak out of Web Components in Firefox, but they don't in Chrome. It is better at this stage to stick with using one styling framework. I hope to include tools in this `pine-cli` later that will make it easier to [treeshake](https://en.wikipedia.org/wiki/Tree_shaking). Until then, stick with one styling framework or deal with the consequences.

The `-h` option needs to be followed by a the path or url of html that you wish to be included in the template. This is mostly useful for converting blocks of html into polymer web components. In the future, this might be able to be used in batch processes to crawl websites and produce custom components  programatically, perhaps in conjunction with [Beautiful Soup](https://pypi.python.org/pypi/beautifulsoup4/) or a Javascript equivalent, perhaps [Selenium](https://github.com/SeleniumHQ/selenium) or [Nightmare](https://github.com/segmentio/nightmare).

The `-b` tag allows you to choose a base component to use, which will use the path/url given but it will give the component the name you specify. This is useful for modifying existing prebuilt components. The downside is that these will not exist on IPFS peer hosting and you will have to link to these components locally or add the component to IPFS and host the component from there(you will be your own peer).

The following options can be used to specify a download source when youWhen the `--github`, `--cdn`, `--ipfs`, `--local` tags are implemented with the , they will specify where the component should be hosted.

#### <a name="building-method-3"></a>Building Method 3 - Installing a Prebuilt-App

This hasn't been started, but will be implemented eventually. It will have a bunch of examples, and users can submit their prebuilt templates.The github repo and documentation will be the first instance of this. 

### 3. <a name="serving"></a>Serving

You can serve the web components of this app through any method you like, the built-in methods are local, ipfs, and github, but with an option of serving from arbitrary links. Any custom components need to be served by something that you set up. You can set up local hosting, your own link, or an IPFS server(this is the recommended method, and the inspiration of this project). Since your html file is edited by you, it will need to set up by you. 
Any non-modified components can be downloaded from IPFS(I am hosting the components, in time, I hope others will join me hosting these components in IPFS, so it will be fast for all of us :) ), or you could download them yourself and make your `index.html` references to your components local. 


1. [Serving Method 1](#serving-method-1) - (Recommended when developed) IPFS 
2. [Serving Method 2](#serving-method-2) - Github
3. [Serving Method 3](#serving-method-3) - CDN
4. [Serving Method 4](#serving-method-4) - (Recommended) Local


#### <a name="serving-method-1"></a>Serving Method 1 - (Use [local](#serving-method-4) until this is completed, local is default) IPFS
```bash
pine-cli add materialize-navbar --ipfs
```
*or*
```bash
pine-cli new my-custom-tabs --ipfs
```

To start your own IPFS server, see the video linked under this paragraph. More information will be written about this soon. This is the recommended method. It is experimental, but the hope is that the components should be loaded quickly if a lot of people use them. And components are incredibly reusable as they are so modular and self-contained, and the styles are not supposed to leak outside of the component itself([The Shadow DOM](https://www.webcomponents.org/community/articles/introduction-to-shadow-dom)), although they do leak in Firefox 52.6!

[Tutorial: Start an IPFS server and host files on the IPFS Network](https://ipfs.io/ipfs/QmXXuLvSGQq8XA6LEVeiYYEeogzSo6WPEf9XdXoP1i7UxF/How%20to%20Host%20a%20Website%20with%20IPFS.mp4)  

#### <a name="serving-method-2"></a>Serving Method 2 - Github

```bash
pine-cli add materialize-navbar --github
```
*or*
```bash
pine-cli new my-custom-tabs --github
```
See my Github https://github.com/musicsmithnz/polymer_web_components for the location of the development Github of the polymer web components. This will be updated frequently, but if you are downloading the versions from IPFS, it wont update, as any new files saved to IPFS gets saved based on its files hash. This means that if two files have the same content, but a different name, they are still the same file to IPFS. Files saved to IPFS are referenced according to their content.

#### <a name="serving-method-3"></a>Serving Method 3 - CDN
```bash
pine-cli add materialize-navbar --vendor
```
*or*
```bash
pine-cli new my-custom-tabs --vendor
```

Use this if you want to use a custom styling Library that isn't supported. But to my knowledge, there is no easy way to use a CDN to deliver components to the user. Generally Polymer expects you to have the Library installed.

#### <a name="serving-method-4"></a>Serving Method 4 - Local/Your own server
```bash
pine-cli add materialize-navbar --local
```
*or*
```bash
pine-cli new my-custom-tabs --local
```

Presently only this method is working. The imports need to be changed in the other models to be hostable from a remote source.

#### Standards
*The Following standards will be perused, but not necessarliy followed completely, we will specify in each case the extent to which it is followed*

[Javascript](https://google.github.io/styleguide/jsguide.html)

I am seeking to apply this style guide to all of the code. It has not been implemented yet.  

[Web Components and Style]

[webcomponents.org](https://github.com/webcomponents/gold-standard/wiki)
According to their website these are based on [four w3c specifications](https://www.webcomponents.org/introduction#specifications). Unfortunately, as this project is based on Polymer 3 and Web Components that are made with Javascript Module imports, not all of these standards are relevant. But we are busy making our components comply with the standards as much as is possible.

1. [Custom Elements](https://w3c.github.io/webcomponents/spec/custom/)
2. [Shadow DOM](https://w3c.github.io/webcomponents/spec/shadow/)
3. [HTML Imports](https://w3c.github.io/webcomponents/spec/imports/)
4. [HTML Template](https://html.spec.whatwg.org/multipage/scripting.html#the-template-element/)

We have some unique ideas about styling that we have not yet been implemented or even crystalized in our own minds. In a word, it's about applying mathematics and the science of perception to Material Design, and the concept of an n-dimensional visual space. We will seek to study and understand the following style guides, and if possible, we will be a superset of these standards, applying these rules and more.

1. [Google](https://material.io/).
2. [U.S. Web Design System](https://github.com/uswds/uswds)
3. We are still looking for good resources to include to apply the Mathematics :-)

[Style](my custom url for my new standard based on MD). We are working on a new Standard which extends Googles Material Design that adds more algorithmic exactness to color and distance css generation based on the science of perception, as well as an n-dimensional concept of webpages. 3 for Space, 1 for Time, and an extra n-4 dimensions for data that changes upon clicks or other interactive activity.
Generic elements like div should be used as much as possible only for styling. More specific and semantic elements should be used as much as possible. Custom elements are encouraged to use these HTML tags, custom html elements should be named semantically.

a templating engine like jade or perhaps even yaml, will give you the opportunity to quickly write website with custom elements. Pug should work very well, and it could use the mixin syntax to add custom elements, this way we can get custom elements by prepending + to a custom element-name. Otherwise, they could just be treated as a replacement for the mixin syntax, this might be preferable, as it would probably make it more portable. One suggested naming convention for your components is to have the designer name, framework, or organization as the first word, and the top-level Tag of your custom component as the second word. For example, [materialize](http://materializecss.com/navbar.html) might decide to make a custom component like so:

```html
<nav>
    <div class="nav-wrapper">
        <a href="#" class="brand-logo">Logo</a>
        <ul id="nav-mobile" class="right hide-on-med-and-down">
            <li><a href="sass.html">Sass</a></li>
            <li><a href="badges.html">Components</a></li>
            <li><a href="collapsible.html">JavaScript</a></li>
        </ul>
    </div>
</nav>
```

If this element is then styled with the materialize framework, the most appropriate name according to this standard would me <materialize-nav>

Generic elements like `<div>` should be used as little as possible and primarily for styling.

### Provable Code

We like the idea of 'Provable Code', and to implement the principles of writting code that is secure, as small as mathematically possible, and provably these things, is extremely time consuming. But we revere these principles and if budget allows in the future we will try to follow these techniques. Actually given the way that the javascript community develops, we think that this might challenge the community to rethink the way it operates and write code that is more robust and can withstand the test of time.
