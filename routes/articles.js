const express = require('express');
const router = express.Router();
const con = require('../connection/pg-con');
const {ensureAuthenticated }=require('../helper/auth');
//Tüm adresler listesini getir
router.get('/',ensureAuthenticated, (req, res, next) => {

   con.query('Select * from pages',function (error,row,fields) {
       if(error) throw error;
       else{
           if(row.length>0){
            const data = row;
            console.log(data);
            con.query('Select * from language where status =1',function (error,langRow,fields) {
                if(error) throw error;
                else{
                    if(row.length>0){
                     const langData = langRow;
                     console.log(langData);
                     res.render('pages/index',{data:data,langData:langData});
                    }else{
                     res.render('pages/index',{data:{},message:'Herhangi bir veri bulunamadı.'});            
                    }
                }
         
                
            })
           }else{
            res.render('pages/index',{data:{},message:'Herhangi bir veri bulunamadı.'});            
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
             res.render('pages/add/pages',{data:data});
            }else{
             res.render('pages/add/pages',{message:'Herhangi bir kayıt bulunamadı.'});            
            }
        }
 
        
    })
     
     
 });

 router.get('/update',ensureAuthenticated, (req, res, next) => {
    con.query('Select * from pages where id=?',[parseInt(req.query.id)],function (error,row,fields) {
        if(error) throw error;
        else{
            if(row[0].length>0 || 1==1){
             const data = row[0];
             console.log(data);
             let lower = data.alias.toLowerCase();
             lower =='en' ? lower='gb' : lower= lower;
             res.render('pages/update/pages',{data:data,icon:lower});
            }else{
             res.render('pages/update/pages',{message:'Herhangi bir kayıt bulunamadı.'});            
            }
        }
 
        
    })
     
     
 });

 router.post('/update',ensureAuthenticated, (req, res, next) => {
     let data={
        name: req.body.name,
        status: 0,
        url: req.body.url,
        content: req.body.editor,
        keywords: req.body.tag
     }
    con.query('UPDATE pages SET name=?,status=?,url=?,content=?,keywords=? where id=?',[data.name,data.status,data.url,data.content,data.keywords,parseInt(req.query.id)],function (error,row,fields) {
        if(error) throw error;
        else{
            if(row.RowAffected>0 || 1==1){

             res.redirect('http://localhost:3000/pages');
            }else{
             res.render('http://localhost:3000/pages/update/pages',{data:data,message:'Herhangi bir kayıt bulunamadı.'});            
            }
        }
 
        
    })
     
     
 });

 router.post('/updateStatus',ensureAuthenticated, (req, res, next) => {
   let status=req.body.status;
   let id=req.body.id;
   con.query('UPDATE pages SET status=? where id=?',[status,parseInt(id)],function (error,row,fields) {
       if(error) throw error;
       else{
           if(row.RowAffected>0 || 1==1){

            res.send(true);
           }else{
            res.send(false);     
           }
       }

       
   })
    
    
});

 router.get('/delete',ensureAuthenticated, (req, res, next) => {
    con.query('DELETE FROM pages WHERE id=?',[parseInt(req.query.id)],function (error,row,fields) {
        if(error) throw error;
        else{
            if(row.RowAffected>0 || 1==1){
             const data = row[0];
             console.log(data);
             res.redirect('http://localhost:3000/pages');
            }else{
             res.redirect('http://localhost:3000/pages');            
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
    
    con.query('Select * from language where status=1',function (error,row,fileds) {
        if (error) throw error;

        for (let i = 0; i < row.length; i++) {
           let alias = row[i].alias;
            let content = req.body[alias];
            console.log(content);
            if(content.name=='' || content.tag=='' || content.editor==''){
                return res.render('pages/add/pages',{data:row,message:'Lütfen *\' '+alias+'lı alanları doldurun.'});
            }
            let url = content.name.replace(/\s/g, "-");
        
         con.query('INSERT INTO pages (name,url,content,keywords,status,alias) VALUES(?,?,?,?,?,?) ',[content.name,url,content.editor,content.tag,1,alias],function(error,insertRow,fields){
            if (error) throw error;
        console.log(row.length+''+i);
            if(i==row.length-1){
                return res.redirect('http://localhost:3000/pages');        
            }
            })     
        }
    })


    /* con.query('INSERT INTO pages (name,icon,alias,status) VALUES(?,?,?,?) ',[langName,icon,alias,1],function(error,row,fields){
        if (error) throw error;
       console.log(row);
        if(row.affectedRows >0){
            return res.redirect('http://localhost:3000/pages');        
        }

    }) */

});
    


module.exports=router;