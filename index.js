const express = require('express');
const hbs = require('express-hbs');

const app = express();
const path = require('path');

function relative(fp) {
  return path.join(__dirname, fp);
}

const port = 3000;

app.get('/', (req, res) => res.render('index', {
  title: 'home',
  homePage: 'This is the home page',
}));

app.get('/about', (req, res) => res.render('about', {
  title: 'about',
}));

app.get('/blog', (req, res) => res.render('blog', {
  title: 'blog',
}));

/*eslint-disable*/
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
/* eslint-enable */

//app.use('/static', express.static(path.join(__dirname, 'dist')));
app.use(express.static(__dirname + "/dist"));

app.engine('hbs', hbs.express4({
  partialsDir: [relative('views/partials')],
  layoutsDir: relative('views/layouts'),
  defaultLayout: relative('views/layouts/main.hbs'),
}));

app.set('view engine', 'hbs');
app.set('views', `${__dirname}/views`);
