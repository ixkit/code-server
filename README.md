### Code Server ☁️🔨
 
 - The CodeServer☁️🔨 IDE is online code editor for cloud server now, purpose is build security and collaboration online working platform.
 - The IDE goal is speed up development business application for Digital Native Enterprise 🚀.

  ## nvm  
```
  nvm use  v18.20.2
```
  ## build & start 
``` 
  yarn clean 

   
  yarn build:extensions  
   
  yarn browser build

  yarn browser start   

  yarn browser start    /my-workspace --hostname 0.0.0.0 --port 8080

  yarn born // build -> run

  yarn reborn // clean -> build -> run
  
```

  ## usage & api 
  #### usage
  While code server lauched, open browser naviaget to address:   
    http://127.0.0.1:8080/folder?dir={}&file={}&line=1&keywords={}

  paramters:
  - dir: the folder path, eg:  /a/b/c

  - file: the file want open, eg:  index.html

  - line: the line number that want locate to, eg: 1 
  
  - keywords: seek to locate, eg: hello, if the parameter {line} was set then this keywords ignored 

  example:  
  http://127.0.0.1:8080/folder?dir=/a/b/c&file=index.html&line=1&keywords=hello

 ### api 
  feature: add accessable folders via api
  route: /api/folders
  method: post
  body: json format, eg:
  ```
  {
    folders=[{
      id: ? optional
      name: 
      data:
      path: 
      items:[
          {
            id: ? optional
            name: 
            data:
            path: 
          }
      ]
    }]
  }
  ```


##  build executeable application
  #### install pkg
```
   npm install -g pkg  
```
  #### pkg => build exe 
```
  yarn pkg
```
## Eclipse Theia IDE Template
<details>
<br/>
<div id="theia-logo" align="center">
    <br />
    <img src="https://raw.githubusercontent.com/eclipse-theia/theia-blueprint/master/theia-extensions/product/src/browser/icons/TheiaIDE.png" alt="Theia Logo" width="300"/>
    <h3>Eclipse Theia IDE</h3>
</div>

<div id="badges" align="center">

The Eclipse Theia IDE is built with this project.\
Eclipse Theia IDE/Blueprint also serves as a template for building desktop-based products based on the Eclipse Theia platform.

</div>

[![Installers](https://img.shields.io/badge/download-installers-blue.svg?style=flat-curved)](https://theia-ide.org//#theiaidedownload)
[![Build Status](https://ci.eclipse.org/theia/buildStatus/icon?subject=latest&job=Theia2%2Fmaster)](https://ci.eclipse.org/theia/job/Theia2/job/master/)
<!-- currently we have no working next job because next builds are not published -->
<!-- [![Build Status](https://ci.eclipse.org/theia/buildStatus/icon?subject=next&job=theia-next%2Fmaster)](https://ci.eclipse.org/theia/job/theia-next/job/master/) -->

[Main Theia Repository](https://github.com/eclipse-theia/theia)

[Visit the Theia website](http://www.theia-ide.org) for more documentation: [Using the Theia IDE](https://theia-ide.org/docs/user_getting_started/), [Packaging Theia as a Desktop Product](https://theia-ide.org/docs/blueprint_documentation/).

## License

- [Eclipse Public License 2.0](LICENSE)
- [一 (Secondary) GNU General Public License, version 2 with the GNU Classpath Exception](LICENSE)

## Trademark

"Theia" is a trademark of the Eclipse Foundation
<https://www.eclipse.org/theia>

## What is this?

The Eclipse IDE is a modern and open IDE for cloud and desktop. The Theia IDE is based on the [Theia platform](https://theia-ide.org).
The Theia IDE is available as a [downloadable desktop application](https://theia-ide.org//#theiaidedownload). You can also try the latest version of the Theia IDE online. The online test version is limited to 30 minutes per session and hosted via Theia.cloud. Finally, we provide an [experimental Docker image](#docker) for hosting the Theia IDE online.

The Eclipse Theia IDE also serves as a **template** for building desktop-based products based on the Eclipse Theia platform, as well as to showcase Eclipse Theia capabilities. It is made up of a subset of existing Eclipse Theia features and extensions. [Documentation is available](https://theia-ide.org/docs/composing_applications/) to help you customize and build your own Eclipse Theia-based product.

## Theia IDE vs Theia Blueprint

The Theia IDE has been rebranded from its original name “Theia Blueprint”. To avoid any confusion, the repository and code artifacts will keep the name “Blueprint”. You can therefore assume the terms “Theia IDE” and “Theia Blueprint” to be synonymous.

## Development

### Requirements

Please check Theia's [prerequisites](https://github.com/eclipse-theia/theia/blob/master/doc/Developing.md#prerequisites), and keep node versions aligned between Theia IDE and that of the referenced Theia version.

### Documentation

Documentation on how to package Theia as a Desktop Product may be found [here](https://theia-ide.org/docs/blueprint_documentation/)

### Repository Structure

- Root level configures mono-repo build with lerna
- `applications` groups the different app targets
  - `browser` contains a browser based version of Eclipse Theia IDE that may be packaged as a Docker image
  - `electron` contains the electron app to package, packaging configuration, and E2E tests for the electron target.
- `theia-extensions` groups the various custom theia extensions for the Eclipse Theia IDE
  - `product` contains a Theia extension contributing the product branding (about dialogue and welcome page).
  - `updater` contains a Theia extension contributing the update mechanism and corresponding UI elements (based on the electron updater).
  - `launcher` contains a Theia extension contributing, for AppImage applications, the option to create a script that allows to start the Eclipse Theia IDE from the command line by calling the 'theia' command.

### Build

For development and casual testing of the Eclipse Theia IDE, one can build it in "dev" mode. This permits building the IDE on systems with less resources, like a Raspberry Pi 4B with 4GB of RAM.

```sh
# Build "dev" version of the app. Its quicker, uses less resources, 
# but the front end app is not "minified"
yarn && yarn build:dev && yarn download:plugins
```

Production applications:

```sh
# Build production version of the Eclipse Theia IDE app
yarn && yarn build && yarn download:plugins
```

### Package the Applications

ATM we only produce packages for the Electron application.

```sh
yarn package:applications
# or
yarn electron package
```

The packaged application is located in `applications/electron/dist`.

### Create a Preview Electron Electron Application (without packaging it)

```sh
yarn electron package:preview
```

The packaged application is located in `applications/electron/dist`.

### Running E2E Tests on Electron

The E2E tests basic UI tests of the actual application.
This is done based on the preview of the packaged application.

```sh
yarn electron package:preview
yarn electron test
```

### Running Browser app

The browser app may be started with

```sh
yarn browser start
```

and connect to <http://localhost:3000/>

### Troubleshooting

- [_"Don't expect that you can build app for all platforms on one platform."_](https://www.electron.build/multi-platform-build)

### Reporting Feature Requests and Bugs

The features in the Eclipse Theia IDE are based on Theia and the included extensions/plugins. For bugs in Theia please consider opening an issue in the [Theia project on Github](https://github.com/eclipse-theia/theia/issues/new/choose).
The Eclipse Theia IDE only packages existing functionality into a product and installers for the product. If you believe there is a mistake in packaging, something needs to be added to the packaging or the installers do not work properly, please [open an issue on Github](https://github.com/eclipse-theia/theia-blueprint/issues/new/choose) to let us know.

### Docker

The Docker image of the Theia IDE is currently in *experimental state*. It is built from the same sources and packages as the desktop version, but it is not part of the [preview test](https://github.com/eclipse-theia/theia-blueprint/blob/master/PUBLISHING.md#preview-testing-and-release-process-for-the-theia-ide).
You can find a prebuilt Docker image of the IDE [here](https://github.com/eclipse-theia/theia-blueprint/pkgs/container/theia-blueprint%2Ftheia-ide).

You can also create the Docker image for the Eclipse Theia IDE based on the browser app with the following build command:

```sh
docker build -t theia-ide -f browser.Dockerfile .
```

You may then run this with

```sh
docker run -p=3000:3000 --rm theia-ide
```

and connect to <http://localhost:3000/>

</details>
