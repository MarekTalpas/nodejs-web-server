const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const app = express();

const port = process.env.PORT || 3000;

hbs.registerPartials(__dirname + '/views/partials');

hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear();
});

hbs.registerHelper('capitalizeText', (text) => {
  return text.toUpperCase();
});

app.set('view engine', 'hbs');

app.use((req, res, next) => {
  console.log('now: ', );
  const logMessage = `now: ${new Date().toString()} \nmethod: ${res.method} \nurl: ${res.url}`;
  fs.appendFile('responses.log', logMessage, (error) => {
    console.log(error);
  });

  next();
});

// app.use((req, res, next) => {
//   res.render('maintainance.hbs');
// });

app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
  res.render('home.hbs', {
    pageTitle: 'Home page',
    welcomeTitle: 'Welcome to the Home Page'
  });
});

app.get('/projects', (req, res) => {
  res.render('projects.hbs', {
    pageTitle: 'Project page',
    welcomeTitle: 'Welcome to the Projects Page'
  });
});

app.get('/about', (req, res) => {
  res.render('about.hbs', {
    pageTitle: 'About page',
    welcomeTitle: 'Welcome to the About Page'
  });
});

app.get('/bad', (req, res) => {
  res.send({
    errorMessage: 'Unable to connect to server'
  });
});

app.listen(port, () => {
  console.log(`app is up on port ${port}`);
});