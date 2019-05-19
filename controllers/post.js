const express = require('express');

const Post = require('../models/db.js');

const router = express.Router();
const ROUTE_NAME = 'blog';

router.get(`/${ROUTE_NAME}`, (req, res) => {
  Post.find((err, posts) => res.render('blog', {
    post: posts,
    activeBlog: true,
    flashMessage: res.locals.flashMessage,
    layout: 'main',
  }));
});

router.get(`/${ROUTE_NAME}/new`, (req, res) => res.render('newPost', {
  title: 'new',
  activeBlog: true,
}));

router.get(`/${ROUTE_NAME}/:permalink`, (req, res) => {
  const { permalink } = req.params;
  Post.findOne({ permalink }, (err, post) => {
    const {
      headline, subHeadline, createdAt, body,
    } = post;
    res.render('postShow', {
      title: post.headline,
      headline,
      subHeadline,
      createdAt,
      body,
      activeBlog: true,
    });
  });
});

router.post(`/${ROUTE_NAME}/create`, (req, res) => {
  const { headline } = req.body;
  const { subheadline } = req.body;
  const body = req.body.post_body;
  const { permalink } = req.body;

  const post = new Post({
    headline,
    subHeadline: subheadline,
    body,
    permalink,
  });

  // eslint-disable-next-line no-unused-vars
  post.save((err, savedPost) => {
    if (err) {
      req.session.flashMessage = {
        type: 'danger',
        message: 'Post Not Created.',
      };
    } else {
      req.session.flashMessage = {
        type: 'success',
        message: 'Post Created Successfully.',
      };
    }

    res.redirect(`/${ROUTE_NAME}`);
  });
});

module.exports = router;
