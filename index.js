const express = require('express');
const hbs = require('express-hbs');

const app = express();
const path = require('path');

const bodyParser = require('body-parser');

function relative(fp) {
  return path.join(__dirname, fp);
}
// TODO: Move this to helpers
hbs.registerHelper('activeRoute', (isActive) => {
  if (isActive) {
    return new hbs.SafeString(
      '<span>&#8226;</span>',
    );
  }
});

hbs.registerHelper('activeLink', (isActive) => {
  if (isActive) {
    return new hbs.SafeString(
      'active',
    );
  }
});

const port = 3000;

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

// app.use('/static', express.static(path.join(__dirname, 'dist')));
app.use(express.static(`${__dirname}/dist`));

app.engine('hbs', hbs.express4({
  partialsDir: [relative('views/partials')],
  layoutsDir: relative('views/layouts'),
  defaultLayout: relative('views/layouts/main.hbs'),
}));

app.set('view engine', 'hbs');
app.set('views', `${__dirname}/views`);


app.get('/', (req, res) => res.render('index', {
  title: 'home',
  homePage: 'This is the home page',
  activeHome: true,
}));

app.get('/about', (req, res) => res.render('about', {
  title: 'about',
  activeAbout: true,
}));

app.get('/blog', (req, res) => res.render('blog', {
  title: 'blog',
  activeBlog: true,
}));

app.get('/admin', (req, res) => res.render('admin', {
  title: 'admin',
  activeAdmin: true,
}));

app.get('/blog/new', (req, res) => res.render('newPost', {
  title: 'new',
  activeBlog: true,
}));

app.post('/blog/create', (req, res) => {
  const { headline } = req.body;
  const { subheadline } = req.body;
  const body = req.body.post_body;
  console.log(headline + subheadline + body);
  res.end('Yes');
});

/*eslint-disable*/
app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`)
  if(process.send) {
    process.send("online");
  }
});
/* eslint-enable */
