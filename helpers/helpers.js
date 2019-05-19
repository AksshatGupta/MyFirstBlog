const hbs = require('express-hbs');
const moment = require('moment');

const activeRoute = hbs.registerHelper('activeRoute', (isActive) => {
  if (isActive) {
    return new hbs.SafeString(
      '<span>&#8226;</span>',
    );
  }
  return null;
});

const activeLink = hbs.registerHelper('activeLink', (isActive) => {
  if (isActive) {
    return new hbs.SafeString(
      'active',
    );
  }
  return null;
});

const prettyDate = hbs.registerHelper('prettyDate', (date) => {
  const createdAt = moment(date, 'MMMM Do YYYY, h:mm:ss a').fromNow();
  return `Created: ${createdAt}`;
});

const hbsHelpers = {
  activeRoute,
  activeLink,
  prettyDate,
};

module.exports = hbsHelpers;
