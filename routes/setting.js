const express = require('express');
const router = express.Router();
const con = require('../connection/pg-con');
const {ensureAuthenticated }=require('../helper/auth');
//Tüm adresler listesini getir
router.get('/',ensureAuthenticated, (req, res, next) => {

    con.query('Select * from company where id=1',(err,row,fields)=>{

        res.render('setting/company_info',{data:row[0]});

    })

    
});
// Firma Bilgilerini MySQL'e kayıt eder.
router.post('/info',ensureAuthenticated, (req, res, next) => {
    const name = req.body.name;
    const phone1 = req.body.phone1;
    const phone2 = req.body.phone2;
    const email = req.body.email;
    const tax = req.body.tax;
    const address = req.body.address;
    const province = req.body.province;
    const state = req.body.state;
    const facebook = req.body.facebook;
    const twitter = req.body.twitter;
    const instagram = req.body.instagram;
    const data ={
        name:name,
        phone1:phone1,
        phone2:phone2,
        email:email,
        tax:tax,
        address:address,
        province:province,
        state:state,
        facebook:facebook,
        twitter:twitter,
        instagram:instagram
    }
    if(name=='' || phone1=='' || email=='' || address=='' || province=='' || state==''){
        return res.render('setting/company_info',{data:data,message:'Lütfen *\' lı alanları doldurun.'});
    }

    con.query('UPDATE company SET name=?,phone1=?,phone2=?,tax=?,address=?,province=?,state=?,facebook=?,twitter=?,instagram=? where id=1',[name,phone1,phone2,tax,address,province,state,facebook,twitter,instagram],function(error,row,fields){
        if (error) throw error;
       
        if(row.affectedRows >0){
            return res.render('setting/company_info',{data:data,message_success:'Firma Bilgileri başarıyla güncellendi.'});        
        }

    })

    

});

//Tüm adresler listesini getir
router.get('/seo',ensureAuthenticated, (req, res, next) => {

    con.query('Select * from seo where id=1',(err,row,fields)=>{

        res.render('setting/seo',{data:row[0]});

    })

    
});

module.exports=router;