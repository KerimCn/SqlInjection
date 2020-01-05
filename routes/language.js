const express = require('express');
const router = express.Router();
const con = require('../connection/pg-con');
const {ensureAuthenticated }=require('../helper/auth');
//Tüm adresler listesini getir
router.get('/',ensureAuthenticated, (req, res, next) => {

   con.query('Select * from language',function (error,row,fields) {
       if(error) throw error;
       else{
           if(row.length>0){
            const data = row;
            console.log(data);
            res.render('setting/language/index',{data:data});
           }else{
            res.render('setting/language/index',{data:{},message:'Herhangi bir veri bulunamadı.'});            
           }
       }

       
   })
    
    
});
router.get('/add',ensureAuthenticated, (req, res, next) => {

    con.query('Select * from language',function (error,row,fields) {
        if(error) throw error;
        else{
            if(row.length>0){
             const data = row;
             console.log(data);
             res.render('setting/language/add/language',{data:data});
            }else{
             res.render('setting/language/add/language',{message:'Herhangi bir kayıt bulunamadı.'});            
            }
        }
 
        
    })
     
     
 });

 router.get('/update',ensureAuthenticated, (req, res, next) => {
    con.query('Select * from language where id=?',[parseInt(req.query.id)],function (error,row,fields) {
        if(error) throw error;
        else{
            if(row[0].length>0 || 1==1){
             const data = row[0];
             console.log(data);
             res.render('setting/language/update/language',{data:data});
            }else{
             res.render('setting/language/update/language',{message:'Herhangi bir kayıt bulunamadı.'});            
            }
        }
 
        
    })
     
     
 });
 router.get('/delete',ensureAuthenticated, (req, res, next) => {
    con.query('DELETE FROM language WHERE id=?',[parseInt(req.query.id)],function (error,row,fields) {
        if(error) throw error;
        else{
            if(row.RowAffected>0 || 1==1){
             const data = row[0];
             console.log(data);
             res.redirect('http://localhost:3000/language');
            }else{
             res.redirect('http://localhost:3000/language');            
            }
        }
 
        
    })
     
     
 });

// Paneli kullanacak kullanıcının kaydını yapan method
router.post('/add',ensureAuthenticated, (req, res, next) => {
    const langName = req.body.langName;
    const icon = req.body.icon;
    const alias = req.body.alias;
    const data ={
        langName:langName,
        icon:icon,
        alias:alias
    }

    if(langName=='' || icon=='' || alias==''){
        return res.render('setting/language/add/language',{data:data,message:'Lütfen *\' lı alanları doldurun.'});
    }

    con.query('INSERT INTO language (name,icon,alias,status) VALUES(?,?,?,?) ',[langName,icon,alias,1],function(error,row,fields){
        if (error) throw error;
       console.log(row);
        if(row.affectedRows >0){
            return res.redirect('http://localhost:3000/language');        
        }

    })

    

});

module.exports=router;