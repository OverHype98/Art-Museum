# Art Museum
# [React](https://reactjs.org/) 
[![npm version](https://img.shields.io/npm/v/react.svg?style=flat)](https://www.npmjs.com/package/react) [![Build Status](https://travis-ci.org/joemccann/dillinger.svg?branch=master)](https://travis-ci.org/joemccann/dillinger)

The project consists from a mobile application for the users who can book their visits to the museum and look through the collections of paintings and a website for the admin so he could manage the database that means CRUD functionality (create, read, update, delete) for some of the documents in the database(exhibits, exhibit_object, art objects).


### Tech

Technologies used:

* [ReactJS] - React is a JavaScript library for building user interfaces.
* [WebStorm] - WebStorm is a powerful IDE for modern JavaScript development.
* [React Native] - React Native is a javascript framework for developing mobile applications.
* [Firebase] - Firebase is an extremely simple to use NoSQL data store from Google.
* [Expo] - Expo is a framework and a platform for universal React applications.
*  [Cloudinary] - Cloudinary provides a cloud-based image and video management services.


### Installation

Art Museum was built with [node.js] v12.9.1, [npm] v6.13.1 or higher.

Install the dependencies on both folders.
You can use either npm or yarn.

```sh
$ npm install 
```
Then to run it
```sh
$ npm start 
```
### Firebase Configuration

* copy/paste your configuration from your Firebase project's dashboard both on the mobile and website
  * ArtMuseum-Mobile\config\firebaseConfig
  * ArtMuseum-Website\src\firebase

This is how the configuration would look like

```
REACT_APP_API_KEY=AIzaSyBtxZ3phPeXcsZsRTySIXa7n33NtQ
REACT_APP_AUTH_DOMAIN=react-firebase-s2233d64f8.firebaseapp.com
REACT_APP_DATABASE_URL=https://react-firebase-s2233d64f8.firebaseio.com
REACT_APP_PROJECT_ID=react-firebase-s2233d64f8
REACT_APP_STORAGE_BUCKET=react-firebase-museum-s2233d64f8.appspot.com
REACT_APP_MESSAGING_SENDER_ID=701928454501
```
Also after you created the firebase project you can import the json to your realtime database.

![demo](ArtMuseum-Mobile/assets/artMuseum.gif)


   [React Native]: <https://reactnative.dev/>
   [Firebase]: <https://firebase.google.com/>
   [node.js]: <http://nodejs.org>
   [WebStorm]: <https://www.jetbrains.com/webstorm/>
   [Expo]: <https://expo.io/dashboard/overhype>
   [ReactJS]: <https://reactjs.org/>
   [npm]: <https://www.npmjs.com/>
   [Cloudinary]: <https://cloudinary.com/>
