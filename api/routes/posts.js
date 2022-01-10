const router = require('express').Router();
const auth_token = require('./tokenVerify');
const verify_token = require('./tokenVerify');

router.get('/', auth_token, (req, res) => {
 res.send({post:"Here you are!", user: req.user});
})

module.exports = router;