const express = require('express');

const router = express.Router();

const authentication_controller = require('../controller/authentication.controller');

router.get('/signup', authentication_controller.getSignup);

router.get('/login',authentication_controller.getLogin);

router.post('/signup',authentication_controller.signup);

router.post('/login', authentication_controller.Login);

router.post('/logout', authentication_controller.logout);

module.exports= router;