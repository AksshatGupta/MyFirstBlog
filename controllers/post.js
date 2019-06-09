const express = require('express');

const { Post } = require('../models');

const router = express.Router();
const ROUTE_NAME = 'blog';

router.get(`/${ROUTE_NAME}`, (req, res) => {
  Post.find((err, posts) => res.render('blog', {
    post: posts,
    isAdmin: req.user && req.user.admin,
    user: req.user,
    activeBlog: true,
    flashMessage: res.locals.flashMessage,
    layout: 'main',
  }));
});

router.get(`/${ROUTE_NAME}/new`, (req, res) => {
  if (!req.user) res.redirect('/404');
  if (req.user && !req.user.admin) res.redirect('/404');
  res.render('newPost', {
    title: 'new',
    user: req.user,
    activeBlog: true,
  });
});

router.get(`/${ROUTE_NAME}/edit/:id`, (req, res) => {
  if (!req.user) res.redirect('/404');
  if (req.user && !req.user.admin) res.redirect('/404');
  Post.findOne({
    _id: req.params.id,
  }, (err, post) => {
    if (err) res.redirect('/404');
    console.log(post);
    res.render('editPost', {
      title: 'edit',
      user: req.user,
      activeBlog: true,
      headline: post.headline,
      subHeadline: post.subHeadline,
      author: post.author,
      postBody: post.body,
      permalink: post.permalink,
      // eslint-disable-next-line no-underscore-dangle
      id: post._id,
    });
  });
});

router.get(`/${ROUTE_NAME}/delete/:id`, (req, res) => {
  if (!req.user) res.redirect('/404');
  if (req.user && !req.user.admin) res.redirect('/404');
  Post.findOneAndRemove(req.params.id, (err, post) => {
    if (err) throw err;
    // eslint-disable-next-line no-console
    console.log('Deleted: ', post);
  });
  res.redirect('/blog');
});

router.get(`/${ROUTE_NAME}/:permalink`, (req, res) => {
  const { permalink } = req.params;
  Post.findOne({ permalink }, (err, post) => {
    const {
      headline, subHeadline, author, createdAt, body,
    } = post;
    res.render('postShow', {
      title: post.headline,
      headline,
      subHeadline,
      author,
      createdAt,
      body,
      user: req.user,
      activeBlog: true,
    });
  });
});

router.post(`/${ROUTE_NAME}/create`, (req, res) => {
  if (!req.user) res.redirect('/404');
  if (req.user && !req.user.admin) res.redirect('/404');
  const { headline } = req.body;
  const { subheadline } = req.body;
  const { author } = req.body;
  const body = req.body.post_body;
  const { permalink } = req.body;

  const post = new Post({
    headline,
    subHeadline: subheadline,
    author,
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

router.post(`/${ROUTE_NAME}/update/:id`, (req, res) => {
  if (!req.user) res.redirect('/404');
  if (req.user && !req.user.admin) res.redirect('/404');

  const { headline } = req.body;
  const { subheadline } = req.body;
  const { author } = req.body;
  const body = req.body.post_body;
  const { permalink } = req.body;

  Post.findByIdAndUpdate(req.params.id, {
    headline,
    subHeadline: subheadline,
    author,
    body,
    permalink,
  }, {
    new: true,
  }, (err, post) => {
    if (err) throw err;
    res.redirect(`/blog/${post.permalink}`);
  });
});

module.exports = router;
