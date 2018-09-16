# NewsAPI
newsletter using ReactJs and [NewsApi](https://newsapi.org/)

### Installation
Install the dependencies and devDependencies and start the server.
```sh
$ git clone https://github.com/abhinavRai23/NewsAPI.git
$ cd NewsAPI
$ npm install
```
To run development server
```sh
$ npm start
```
To create production build

```sh
$ npm run prod
```

### Usage
##### Home Page:- 

  - it shows list of Sources available
  - you have a option to filter out sources by **Country** or **Category**

##### NewsPage:- 

 - Top-Headlines as per choosed source
 - it contains bunch of headlines with thier **title**, **description** and **Image**
 - you have a option to filter out news by **Country** and **Category** or **Source**
 - Api comes with limitation so we can not mix Source with Country or Category params
  
### Technologies Used
 - [ReactJs](https://reactjs.org/) - React is a JavaScript library for building user interfaces.
 - [Redux](https://redux.js.org) - JavaScript library for managing application state
 - [Materialize](http://materializecss.com) - front-end framework based on Material Design
 - [Webpack](https://webpack.js.org/) - module bundler
