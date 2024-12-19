const { Welcome, SignUp, SignIn  } = require("../controllers/auth-controller.js");
const router = require("express").Router();

router.get('/', Welcome);
router.post('/signup', SignUp);
router.post('/signin', SignIn);

module.exports = router;