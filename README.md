For Your Feed (4YF)
==================
[![Build Status](https://drone.io/github.com/EnoF/4YF/status.png)](https://drone.io/github.com/EnoF/4YF/latest)
[![Code Climate](https://codeclimate.com/github/EnoF/4YF.png)](https://codeclimate.com/github/EnoF/4YF)
[![Coverage Status](https://coveralls.io/repos/EnoF/4YF/badge.png?branch=master)](https://coveralls.io/r/EnoF/4YF?branch=master)

4YF is a Chat client with focus on the messages for the user!

Installation
============
Fork and clone the project.

Make sure to install a version of `nodejs` higher then `0.10`.

In the directory where the Gruntfile.js relies, run the following commands:

    npm install -g grunt-cli
    npm install -g bower
    npm install
    bower install

You are ready to go!

Running the server
==================
To run the server including serving frontend pages, run the following command:

    grunt run

You can now connect to the client at: `http://localhost:9000`.

You can now connect to the server at: `http://localhost:3000`.

Drone.io
========
To connect to your [drone.io](https://drone.io/) account, sign up for free!
*This is an optional step, you can skip if you wish.*

### Setup
On the setup tab set the correct environment variables:

    GH_REF=github.com/[your github username]/4YF.git
    GH_TOKEN=[your github oauth token]
    COVERALLS_SERVICE_NAME=drone.io
    COVERALLS_SERVICE_JOB_ID=$BUILD_ID
    COVERALLS_REPO_TOKEN=[your coveralls repository token]
    COVERALLS_GIT_COMMIT=$GIT_COMMIT

Enter the following commands:

    npm install -g bower
    npm install -g grunt-cli
    sudo pip install Pygments
    npm install
    bower install
    grunt test
    grunt coveralls
    git checkout master
    grunt groc
    rm -rf src/**/*.js test .jshintrc bower.json package.json
    git config user.name "done.io CI"
    git config user.email "[your email used for the commit]"
    git add -A
    git commit -m "Automatically updated the groc documentation via drone.io"
    git push -f --quiet "https://${GH_TOKEN}@${GH_REF}" master:gh-pages

This will test the application on each of your commits! It will also update your documentation on your gh-pages and
update the code coverage on your `coveralls` account!