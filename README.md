# alchmy

A generator for the Alchmy ecosystem that makes it easy to add components from the ecosystem onto a webpage. Making it trivial to create beautiful webpages. Moreover, Alchmy is designed to be decentralized, so that the individual components can be downloaded separately, which, at scale, means that much of the data from many websites will already be cached. Reusable, fast, easy-to-use, easy-to-maintain.

## <a name="summary"></a> Summary

`alchmy` is a tool for quickly adding and creating webcomponents from different libraries. For adding prebuilt components quickly, it uses the [related github polymer_web_components](https://github.com/alchmy/alchmy_web_components). That library contains the official Polymer elements as well as some other custom components and some elements based on typical implementations from some popular styling frameworks or component libraries [listed below](#libraries). 

The cli is usable without reference to these libraries to help you create the boiler code for new custom elements and convert markdown to clean HTML5 code. The cli tool is a useful way to install components quickly, rapidly speeding development, but it is also designed to be used with IPFS peers. Thus, if a significant number of people use this project, your website resources should load faster as each element could be downloaded from peers within your neigbourhood. 

## <a name="libraries"></a>Libraries Planned for Inclusion

* [Polymer Elements](https://www.webcomponents.org/collection/Polymer/elements) - Official Polymer components of Google.
* [simplajs](https://www.simplajs.org/) - Clean, prebuilt components for user live editing. Helpful for forms, Social media, CMSs.
* [Material Design Components](https://material.io/components/web/catalog) - Official Google Components based on Material Design. Though called components, without Angular or Polymer it's more a styling framework or a framework for building components. 
* [Semantic-ui](https://semantic-ui.com/) - Clean, modern, easier to use than MDC as there is less to include in the modules.
* [Materialize](http://next.materializecss.com) - Easy to use Material Design based css framework.
* [MUI](https://www.muicss.com) - Lightweight framework based on Googles Material Design. 

## <a name="contents"></a> Contents

### General

1. [Introduction](#introduction)
2. [Summary](#summary)
3. [Component Libraries and Styling Frameworks](#libraries)
4. [Contents](#contents)

### Tutorial

1. [Installation](#installation)
    1. [Environment Setup](#environment-setup)
    2. [alchmy Setup](#alchmy-setup)
2. [Building the App](#building)
    1. [Initialize - Installing A Template ](#building-1)
    2. [Improving  - Adding Prebuilt Components](#building-2)
    3. [Improving  - Mixing Your Own Components](#building-3)
3. [Serving](#serving) 
    1. [Serving Method 1 - Serving from IPFS](#serving-1) 
    2. [Serving Method 2 - Serving from Local/Own Server](#serving-2) 
___

### 1. <a name="installation"></a>Installation

#### <a name="environment-setup"></a>Environment Setup
If you are not building an environment from scratch, skip to [alchmy setup](#alchmy-setup). Sometimes Linux users have trouble with global installations of npm packages due to [permissions errors](https://docs.npmjs.com/getting-started/fixing-npm-permissions).

```bash
curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.8/install.sh | bash
source ~/.bashrc
nvm install node
nvm use node
mkdir <myproject>
cd <myproject>
```

#### <a name="alchmy-cli-setup"></a>alchmy Setup

```bash
yarn init -y
yarn add alchmy --save
yarn add alchmy --global
```

### 2. <a name="building"></a>Building the App

There are two main commands to be used to build a website. You can stick with one method, or you can do a little of each. 

1. [Building Method 1](#building-method-1) - Adding prebuilt elements using 
    `alchmy add prebuilt-component-name`
2. [Building Method 2](#building-method-2) - building your own components using 
    `alchmy new my-custom-component-name`

These two methods can be combined on the same project. If you want a simple introduction, choose [Building Method 1](#building-method-1)

#### <a name="building-method-1"></a>Building Method 1 - Linking to Components (in P2P/IPFS or other Repo)

```bash
alchmy add materialize-navbar
alchmy add mui-grid-fluid-1-2
alchmy add materialize-footer
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
alchmy new my-custom-navbar -s materialize
alchmy new my-custom-grid 
alchmy new my-custom-table -h html_template_url
alchmy new materialize-footer -b polymer_component_url
```

This code shows you how to create your own polymer web components. These components will be placed into a `components` folder. Note the options that can be used with this tag. 

Using `-s` you can add the name of one of the supported frameworks listed in the introduction and it will include links to the libraries in your polymer component. Note, this may use a lot of unnecessary code, as it includes the libraries separately for each element. This might be a problem, but your browser also might solve this automatically with cacheing. Also note, styles do leak out of Web Components in Firefox, but they don't in Chrome. It is better at this stage to stick with using one styling framework. I hope to include tools in this `alchmy` later that will make it easier to [treeshake](https://en.wikipedia.org/wiki/Tree_shaking). Until then, stick with one styling framework or deal with the consequences.

The `-h` option needs to be followed by a the path or url of html that you wish to be included in the template. This is mostly useful for converting blocks of html into polymer web components. In the future, this might be able to be used in batch processes to crawl websites and produce custom components  programatically, perhaps in conjunction with [Beautiful Soup](https://pypi.python.org/pypi/beautifulsoup4/) or a Javascript equivalent, perhaps [Selenium](https://github.com/SeleniumHQ/selenium) or [Nightmare](https://github.com/segmentio/nightmare).

The `-b` tag allows you to choose a base component to use, which will use the path/url given but it will give the component the name you specify. This is useful for modifying existing prebuilt components. The downside is that these will not exist on IPFS peer hosting and you will have to link to these components locally or add the component to IPFS and host the component from there(you will be your own peer).

The following options can be used to specify a download source when youWhen the `--github`, `--cdn`, `--ipfs`, `--local` tags are implemented with the , they will specify where the component should be hosted.

#### <a name="building-method-3"></a>Building Method 3 - Installing a Prebuilt-App

This hasn't been started, but will be implemented eventually. It will have a bunch of examples, and users can submit their prebuilt templates.The github repo and documentation will be the first instance of this. 

### 3. <a name="serving"></a>Serving

You can serve the web components of this app through any method you like, the built-in methods are local, ipfs, and github, but with an option of serving from arbitrary links. Any custom components need to be served by something that you set up. You can set up local hosting, your own link, or an IPFS server(this is the recommended method, and the inspiration of this project). Since your html file is edited by you, it will need to set up by you. 
Any non-modified components can be downloaded from IPFS(I am hosting the components, in time, I hope others will join me hosting these components in IPFS, so it will be fast for all of us :) ), or you could download them yourself and make your `index.html` references to your components local. 


1. [Serving Method 1](#serving-method-1) - (Recommended when developed) IPFS 
4. [Serving Method 4](#serving-method-2) - (Recommended) Local


#### <a name="serving-method-1"></a>Serving Method 1 - (Use [local](#serving-method-4) until this is completed, local is default) IPFS
```bash
alchmy add materialize-navbar --ipfs
```

*or*

```bash
alchmy new my-custom-tabs --ipfs
```

To start your own IPFS server, see the video linked under this paragraph. More information will be written about this soon. This is the recommended method. It is experimental, but the hope is that the components should be loaded quickly if a lot of people use them. And components are incredibly reusable as they are so modular and self-contained, and the styles are not supposed to leak outside of the component itself([The Shadow DOM](https://www.webcomponents.org/community/articles/introduction-to-shadow-dom)), although they do leak in Firefox 52.6!

[Tutorial: Start an IPFS server and host files on the IPFS Network](https://ipfs.io/ipfs/QmXXuLvSGQq8XA6LEVeiYYEeogzSo6WPEf9XdXoP1i7UxF/How%20to%20Host%20a%20Website%20with%20IPFS.mp4)  

#### <a name="serving-method-2"></a>Serving Method 2 - Local/Your own server
```bash
alchmy add materialize-navbar --local
```

*or*

```bash
alchmy new my-custom-tabs --local
```

Presently only this method is working. The imports need to be changed in the other models to be hostable from a remote source.
