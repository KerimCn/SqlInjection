const express = require('express');
const router = express.Router();
const con = require('../connection/pg-con');
const {ensureAuthenticated }=require('../helper/auth');
//Tüm adresler listesini getir
router.get('/',ensureAuthenticated, (req, res, next) => {

   con.query('Select * from admin',function (error,row,fields) {
       if(error) throw error;
       else{
           if(row[0].length>0 || 1==1){
            const data = row;
            console.log(data);
            res.render('setting/user/user',{data:data});
           }else{
            res.render('setting/user/user',{message:'Herhangi bir kayıt bulunamadı.'});            
           }
       }

       
   })
    
    
});
router.get('/add',ensureAuthenticated, (req, res, next) => {

    con.query('Select * from admin',function (error,row,fields) {
        if(error) throw error;
        else{
            if(row[0].length>0 || 1==1){
             const data = row;
             console.log(data);
             res.render('setting/user/add/user',{data:data});
            }else{
             res.render('setting/user/add/user',{message:'Herhangi bir kayıt bulunamadı.'});            
            }
        }
 
        
    })
     
     
 });

 router.get('/update',ensureAuthenticated, (req, res, next) => {
    con.query('Select * from admin where id=?',[parseInt(req.query.id)],function (error,row,fields) {
        if(error) throw error;
        else{
            if(row[0].length>0 || 1==1){
             const data = row[0];
             console.log(data);
             res.render('setting/user/update/user',{data:data});
            }else{
             res.render('setting/user/update/user',{message:'Herhangi bir kayıt bulunamadı.'});            
            }
        }
 
        
    })
     
     
 });
 router.get('/delete',ensureAuthenticated, (req, res, next) => {
    con.query('DELETE FROM admin WHERE id=?',[parseInt(req.query.id)],function (error,row,fields) {
        if(error) throw error;
        else{
            if(row.RowAffected>0 || 1==1){
             const data = row[0];
             console.log(data);
             res.redirect('http://localhost:3000/user');
            }else{
             res.redirect('http://localhost:3000/user');            
            }
        }
 
        
    })
     
     
 });
// Paneli kullanacak kullanıcının kaydını yapan method
router.post('/add',ensureAuthenticated, (req, res, next) => {
    const fullname = req.body.name;
    const phone = req.body.phone;
    const birth = req.body.birth;
    const mail = req.body.email;
    const tc_kimlik = req.body.tc_kimlik;
    const username = req.body.username;
    const password = req.body.password;
    const passwordtwo = req.body.passwordtwo;
    const address = req.body.address;
    const facebook = req.body.facebook;
    const twitter = req.body.twitter;
    const instagram = req.body.instagram;
    const data ={
        fullname:fullname,
        phone:phone,
        birth:birth,
        mail:mail,
        tc_kimlik:tc_kimlik,
        username:username,
        password:password,
        passwordtwo:passwordtwo,
        address:address,
        facebook:facebook,
        twitter:twitter,
        instagram:instagram
    }
    if(password!=passwordtwo){
        return res.render('setting/user/add/user',{data:data,message:'Girdiğiniz şifreler uyuşmamaktadır.'});
    }
    if(fullname=='' || phone=='' || username=='' || password=='' || passwordtwo=='' || mail==''){
        return res.render('setting/user/add/user',{data:data,message:'Lütfen *\' lı alanları doldurun.'});
    }

    con.query('INSERT INTO admin (fullname,phone,birth_date,mail,tc_kimlik,username,password,address,facebook,twitter,instagram,status) VALUES(?,?,?,?,?,?,?,?,?,?,?,?) ',[fullname,phone,birth,mail,tc_kimlik,username,password,address,facebook,twitter,instagram,1],function(error,row,fields){
        if (error) throw error;
       console.log(row);
        if(row.affectedRows >0){
            return res.redirect('http://localhost:3000/user');        
        }

    })

    

});

module.exports=router;