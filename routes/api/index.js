const express = require('express');

const router = express.Router();
const { get, post, patch } = require('services/api/rest');

router.get('/entities', (req, res, next) => {
  get.entities(req, res, next);
});

router.get('/entities/:id', (req, res, next) => {
  get.entity(req, res, next);
});

router.get('/entities/type/:id', (req, res, next) => {
  get.entityType(req, res, next);
});

router.get('/types', (req, res, next) => {
  get.types(req, res, next);
});

router.get('/types/:id', (req, res, next) => {
  get.type(req, res, next);
});

router.post('/entities', (req, res, next) => {
  post.createEntity(req, res, next);
});

router.post('/entities/update', (req, res, next) => {
  patch.updateEntity(req, res, next);
});

module.exports = router;
