const express = require('express');

module.exports = app => {
  app.use(express.static('dist'));
  app.use(express.json());
};
