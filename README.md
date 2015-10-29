[![Code Climate](https://codeclimate.com/github/liberty-x/lxissue/badges/gpa.svg)](https://codeclimate.com/github/liberty-x/lxissue)
[![Test Coverage](https://codeclimate.com/github/liberty-x/lxissue/badges/coverage.svg)](https://codeclimate.com/github/liberty-x/lxissue/coverage)
[![Build Status](https://travis-ci.org/liberty-x/lxissue.svg)](https://travis-ci.org/liberty-x/lxissue) [![bitHound Score](https://www.bithound.io/github/liberty-x/lxissue/badges/score.svg)](https://www.bithound.io/github/liberty-x/lxissue) [![bitHound Dependencies](https://www.bithound.io/github/liberty-x/lxissue/badges/dependencies.svg)](https://www.bithound.io/github/liberty-x/lxissue/master/dependencies/npm) [![Codecrystal](https://img.shields.io/badge/code-crystal-5CB3FF.svg)](http://codecrystal.herokuapp.com/crystalise/liberty-x/lxissue/master)

# LX Issue

Who else is going to get the bad guys closing other people's issues?

Please find our application here:

[Link]

## Who?

You *still* wanted more after [LX Data](http://lxdata.herokuapp.com/) didn't you?

From the same team who brought you such hits as LX News :newspaper:, LX Search :mag: and the infamous  [LX Riddle](http://agile-beyond-9343.herokuapp.com/) :question: Liberty-X, a team in the 6th iteration of the Founders & Coders academy, brings you **LX Issue**.

Our unchanged lineup is formed of members Justen Barget, Rachel Black, Huw Davies and Ruth Uwemedimo. :two_women_holding_hands::two_men_holding_hands:

## What?

This week we plan to build an application which queries the Github API and retrieves information about issues which have been raised on your organisations' repos. Our users will then have the ability to post to gitter to (*politely*) remind Github users to close their issue. The application will thus be a Github issue management tool. :+1:

## Why?

We are practising our API querying as well as using Github authentication for our users. We're using the Github and Gitter APIs. Hopefully this app will be useful for you!

### Server Requests

![plan](https://files.gitter.im/RachelBLondon/libert-x/NlWj/plan.jpg)

### Wireframe

![wireframe](https://files.gitter.im/RachelBLondon/libert-x/4MgX/wireframe.jpg)

note: because of our mid-project change, we're no longer looking at all the issues we ourselves have opened on other projects, so the wireframe is no longer quite correct.

### Dependencies

* env2

### Dev Dependencies

* Tape (backend testing)
* Shot (backend testing)
* Istanbul (Tests quality of code)
* Codeclimate (Badge at top of page!)
* Pre-commit hooks

### Testing

For backend testing, please download our repo and run our backendTest.js file, having used the command ``npm install`` to download our dependencies shown above.

## Problems we ran into

### Retrieving the username upon external authorisation

We spent a lot of time *thinking* we needed to get the user's Github **username** to send a request to Github for all their issues. (We later realised this wasn't necessary *at all* because the access token would match on Github to the user, so it would generate their issues anyway). *However*, we did learn how to do this regardless, which may come in useful in the future:

http://stackoverflow.com/questions/33411062/find-out-username-after-user-has-logged-in-to-github-via-oauth2

**Learning outcome**: If you make a request to [this endpoint](https://developer.github.com/v3/users/#get-a-single-user), as specified in the Stack Overflow answer in the above link, the JSON Object that returns will have a "login" key, the value of which will be the user's username.

### Making request to retrieve issues

This took up *most* of our time. We got several error messages from Github including "Not Found", and "Bad Credentials". The Github API has proven to be the most difficult one we've used to far, perhaps because it mixes normal API problems along with authenication, which we're still not confident with.

We solved our numerous problems with other groups' help and by using [Postman](https://www.getpostman.com/), which is a really handy tool which tests an API's endpoints. We needed to use [scope](http://stackoverflow.com/questions/33390666/making-a-post-request-to-github-api-for-creating-issue-is-not-working), and give our request the right syntax. Please see below link for the scope parameters that can be given:

https://developer.github.com/v3/oauth/#scopes

Our (eventually) correct code is as follows:

```
res.write("<a id='auth' href=https://github.com/login/oauth/authorize?client_id=" + process.env.client_id + "&scope=repo> Login To Github</a>");
```

Note ```&scope=repo``` which specifies the scope.

**Learning outcome**: Ask questions on Stack Overflow and ask your teammates **often**!

### Realisation of incorrect API use

Our original plan was to have a page which displayed all the *closed* issues that you had raised and if someone had **closed your issue** you would be able to name and shame them on the Founders and Coders gitter channel! We realised late on Thursday afternoon that this data *cannot* be retrieved and we changed our plan to more of a issue management tool, as described above.

**Learning outcome**: Read the [API documentation](https://developer.github.com/v3/issues/) thoroughly and carefully before you plan! We *did* read this part:

> List all issues across all the authenticated user’s visible repositories including owned repositories, member repositories, and organization repositories:

```
GET /issues
```

But didn't *fully* realise we wouldn't be able to retrieve issues that were created by the user on repos of organisations they aren't members of! So, yeah... **read documentation diligently**.

### Thanks for reading, enjoy the [app]()! Link needed :smile:
