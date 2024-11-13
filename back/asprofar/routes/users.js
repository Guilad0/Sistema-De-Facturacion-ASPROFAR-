var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

const {
    getById,
    changeState
} = require('../controllers/users');

router.get("/:id", getById);
router.patch("/:id", changeState);

module.exports = router;
