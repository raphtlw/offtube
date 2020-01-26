const express = require('express');
const path = require('path');
const fs = require('fs');

const router = express.Router();

// Routes

router.get('/', (req, res) => {
  const url = req.query.url
  console.log(url);
});

module.exports = router;