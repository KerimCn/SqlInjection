const express = require('express');
const router = express.Router();
const procCon = require('../connection/pg-con');
const {ensureAuthenticated }=require('../helper/auth');
//Tüm adresler listesini getir
router.get('/',ensureAuthenticated, (req, res, next) => {
    req.session.username=req.user.username;
    res.render('index',{username:req.user.username,id:req.user.id});
});

module.exports=router;