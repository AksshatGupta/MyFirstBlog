const express = require('express');

const app = express();
const path = require('path');

const port = 3000;

app.get('/', (req, res) => res.sendFile(path.join(`${__dirname}/dist/index.html`)));

/*eslint-disable*/
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
/* eslint-enable */

app.use('/static', express.static(path.join(__dirname, 'dist')));
