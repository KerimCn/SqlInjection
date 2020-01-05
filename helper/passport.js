const localStrategy = require('passport-local').Strategy;
const con = require('../connection/pg-con');

module.exports= function (passport) {
    passport.use(
        new localStrategy({usernameField:'username'},(username,password,done)=>{
            con.query("SELECT name FROM user where username = '" + username + "'",function(error,row,fields){
                if(error) res.send(error);
                else{
                    if(row.length>0){
                        if(row[0].status!=1){
                            return done(null,false,{message:'Hesabınız kapatılmıştır. Lütfen yöneticinize başvurun.'});                    
                        }
                        if(row[0].password==password){
                            const user=row[0];
                            return done(null,user);
                        }else{
                            return done(null,false,{message:'Kullanıcı Adı veya Şifreniz Yanlış'});                    
                        }
                    }else{
                            return done(null,false,{message:'Böyle Bir Hesap Bulunamadı'});
                    }
                }
            })         
        })
    )
    passport.serializeUser((user, done)=> {
        done(null, user.id);
      });
      
    passport.deserializeUser((id, done)=> {
        con.query("SELECT * FROM admin WHERE id=?",[id],function(error,row,fields){
            done(null,{username:row[0].username,id:row[0].id} );
        })   
    });
}
