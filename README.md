# Community Events PWA

![Travis Build Status](https://travis-ci.org/tonyedwardspz/community-events-pwa.svg?branch=master "Travis Build Status")

## Overview
This is an application which draws events into one single web application.
This app has been created for module at university.

## Prerequisites

In order to run this project you need `npm` and `node.js` installed. Please
refer to the relevant documentation for instructions.

Add your environment variables as indicated in the `example.env` file, saving it as `.env`.
If you're lucky enough to have the variables provided by me, add them in the same way.

## Installation
To install the project:

Clone the project locally, and move into project directory:

```
git clone https://github.com/tonyedwardspz/community-events-pwa && cd community-events-pwa
```

Install dependencies:

```
npm install
```

## Run things

The project uses [Gulp](http://gulpjs.com/) for the build system. There
are a few tasks which are suggested. All tasks are run from the project directory
on the command line.

To build the project run:

```
gulp
```

To build the project and watch for changes use:
```
gulp dev
```
Upon changes to the project the server will restart / files will be
regenerated as appropriate. If you'd like the browser to refresh for each change,
run:
```
gulp debug
```

### Other tasks
There are a couple other tasks you may wish to run:

#### Tests

To run the projects tests use the command `npm test`. This will execute some
good 'ol assertion tests followed by QUnit integration tests, which require the
building of the project.

#### Documentation

To generate the project's documentation, run the command `gulp doc`. The documentation
can be found in the `./doc/gen` folder, with `index.html` as the starting point.

## Deployment

The project uses a TravisCI to run tests, deploying code to a heroku dyno if passing.
This is triggered by a push to the master branch.
- [Travis](https://travis-ci.org/tonyedwardspz/community-events-pwa)

## Contributing

Contributions / pull requests etc are not accepted without being discussed via GitHub issues. This is a university project and
that would break guidelines. If you see something that I can improve please get in touch
initially on [twitter](https://twitter.com/tonyedwardspz).

## Author
- *Tony Edwards*
    - [Twitter](https://twitter.com/tonyedwardspz)

## License
There is not license until I hand this in. :(  Technically it's property of Plymouth University.
