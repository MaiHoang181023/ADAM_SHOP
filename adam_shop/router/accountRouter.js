const router = require('express').Router();
const path = require('path');
const accountController = require('../controller/accountController');

router.post('/login', accountController.login);

router.post('/register', accountController.register);

router.delete('/delete', accountController.deleteAccount);

module.exports = router;
