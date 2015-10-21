# Baltimore Arrest Data

This is a simple AngularJS web app that leverages [nvD3](https://github.com/krispo/angular-nvd3) and
[leaflet](https://github.com/tombatossals/angular-leaflet-directive) directives, as well as a number
of other JS libraries in order to display arrest data from the Baltimore Police Department in interesting contexts. I chose
to highlight arrest data from April 28th and 29th of 2015, which was the [
peak of violent protests in the city](https://en.wikipedia.org/wiki/2015_Baltimore_protests).
Additionally, data from January through September of 2015 is examined.

The application was built from a fork of the [angular seed](https://github.com/angular/angular-seed) project. The following
instructions detail how to build and run the application on your local machine.

## Getting Started

To get you started you can simply clone the angular-seed repository and install the dependencies:

### Prerequisites

You need git to clone the angular-seed repository. You can get git from
[http://git-scm.com/](http://git-scm.com/).

We also use a number of node.js tools to initialize and test angular-seed. You must have node.js and
its package manager (npm) installed.  You can get them from [http://nodejs.org/](http://nodejs.org/).

### Install Dependencies

We have two kinds of dependencies in this project: tools and angular framework code.  The tools help
us manage and test the application.

* We get the tools we depend upon via `npm`, the [node package manager][npm].
* We get the angular code via `bower`, a [client-side code package manager][bower].

We have preconfigured `npm` to automatically run `bower` so we can simply do:

```
npm install
```

Behind the scenes this will also call `bower install`.  You should find that you have two new
folders in your project.

* `node_modules` - contains the npm packages for the tools we need
* `app/bower_components` - contains the angular framework files

*Note that the `bower_components` folder would normally be installed in the root folder but
angular-seed changes this location through the `.bowerrc` file.  Putting it in the app folder makes
it easier to serve the files by a webserver.*

### Run the Application

We have preconfigured the project with a simple development web server.  The simplest way to start
this server is:

```
npm start
```

Now browse to the app at `http://localhost:8000/app/index.html`.