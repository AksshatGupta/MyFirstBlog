const express = require('express');
const hbs = require('express-hbs');
const flash = require('connect-flash');
const session = require('express-session');
// const helpers = require('handlebars-helpers')();

const app = express();
const path = require('path');

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const sessionStore = new session.MemoryStore();

const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const hbsHelpers = require('./helpers/helpers.js');
const { postController, userController } = require('./controllers');
const { User } = require('./models');

function relative(fp) {
  return path.join(__dirname, fp);
}

const port = process.env.PORT || 3000;

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(express.static(`${__dirname}/dist`));
app.use(cookieParser());
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
app.use(session({
  secret: 'keyboard cat',
  resave: 'true',
  saveUninitialized: true,
  cookie: { maxAge: 60000 },
  store: sessionStore,
}));
app.use(passport.initialize());
app.use(passport.session());

app.engine('hbs', hbs.express4({
  partialsDir: [relative('views/partials')],
  layoutsDir: relative('views/layouts'),
  defaultLayout: relative('views/layouts/main.hbs'),
  helpers: hbsHelpers,
}));

app.set('view engine', 'hbs');
app.set('views', `${__dirname}/views`);

// app.use('/static', express.static(path.join(__dirname, 'dist')));

app.use(flash());
app.use((req, res, next) => {
  res.locals.flashMessage = req.session.flashMessage;
  delete req.session.flashMessage;
  next();
});

app.use(postController);
app.use(userController);

app.get('/', (req, res) => res.render('index', {
  title: 'home',
  homePage: 'This is the home page',
  activeHome: true,
  user: req.user,
}));

app.get('/about', (req, res) => res.render('about', {
  title: 'about',
  activeAbout: true,
  user: req.user,
}));

app.get(['*', '404'], (req, res) => res.status(404).end('Page Not Found'));

/*eslint-disable*/
app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`)
  if(process.send) {
    process.send("online");
  }
});
/* eslint-enable */
