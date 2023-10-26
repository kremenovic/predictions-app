# Side project - Sports prediction web app

Sports prediction web app is my ‘wanna-be’ side project that I have never been able to finish. The project is based on React and I implemented Firebase to save data from the API there in order to save API calls.

Img

## Table of contents

-   [Overview](#overview)
    -   [The challenge](#the-challenge)
    -   [Screenshot](#screenshot)
    -   [Built with](#built-with)
-   [Installation](#installation)

## Overview

Side project based on React and implementing [https://www.api-football.com/](football API)</a>. They have other APIs such as basketball, baseball and it could be implemented in an all-in-one sports prediction application.

### The challenge

The idea and challenge was to build a sports prediction web application (there’s a PWA) that would help sports bettors decide which game to bet on. Most people use the Flashscore application to see the stats like previous games and standings, but here they can see more than that.

Also, there are advice and tips that come from the API and I am going to show you in the screenshots all the data.

Besides predictions I wanted to implement in this project:

News
Bankroll
Chatroom
Live streams (add streaming links
User profile / Settings

### Screenshot

<h4>Dashboard page</h4>

<img src="https://i.imgur.com/voEFkhR.png"/>

Clicking on the banner on the /dashboard page will initiate downloading/installation of the PWA.

<h4>Single game page - Overview</h4>

<img src="https://i.imgur.com/1yESjqZ.png"/>

<h4>Single game page - Teams</h4>

<img src="https://i.imgur.com/1vloE3F.png"/>

<h4>Single game page - H2H</h4>

<img src="https://i.imgur.com/HYfu3hw.png"/>

<h4>Single game page - Standings</h4>

<img src="https://i.imgur.com/TvKoYtW.png"/>

<h4>Register w/PaypPal page</h4>

<img src="https://i.imgur.com/WhfmJtm.png"/>

### Built with

-   React
-   Firebase

## Installation

Rename 'example_dot_env' file to '.env' file and update 'REACT_APP_API_URL' with your localhost URL.

### `npm install`

This command installs a package and any packages that it depends on.

<h4>1. Create new Firebase project</h4>

Create new Firebase project, and copy/paste your web app's Firebase configuration in firebase.js file.

<h4>2. Update Firestore Database Rules</h4>

After that, you need to go to Firestore Database and update the rules:

```

rules_version = '2';
service cloud.firestore {
match /databases/{database}/documents {
match /{document=\*\*} {
allow read, write;
}
// match any doc in transactions collection
match /transactions/{transactionId} {
allow read, write: if request.auth.uid != null;
}
}

```

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

<h4>Pages</h4>

-   /register
-   /dashboard
