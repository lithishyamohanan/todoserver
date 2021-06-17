const db=require('./db');
let currentUser;
let Details = {
    1000: { uid: 1000,  username: "userone", password: "userone",todos:[]},
    1001: { uid: 1001, username: "usertwo", password: "usertwo",todos:[] },
    1002: { uid: 1002, username: "userthree", password: "userthree",todos:[]},
    1003: { uid: 1003,  username: "userfour", password: "userfour",todos:[]}
}
const register=(uid,uname,pswd)=>{
    return db.Todo.findOne({uid})
    .then(user=>{
      console.log(user);
      if(user){
       return{
         statusCode:422,
         status:false,
         message:"user exist please login"
     } 
      }
     else{
       const newUser=new db.Todo({
         uid,
         username:uname,
         password:pswd,
         ltodos:[]
       })
       newUser.save();
       return {
         statusCode:200,
         status:true,
         message:"successfully registerd"
      }
     }
   
    })
    
   }
   const login=(req,uid,password)=>{
    var uid = parseInt(uid);
     return db.Todo.findOne({uid,password})
     .then(user=>{
      //  console.log(user);
       if(user){
        req.session.currentUser=user.uid;
        return {
          statusCode:200,
          status:true,
          message:"successfully login",
      }
       }
       else{
        return {
          statusCode:422,
          status:false,
          message:"Invalid credentials"
      }
       }
     })
     
     
    }
    const save=(uid,password,ltodo)=>{
        var uid = parseInt(uid);
        return db.Todo.findOne({uid,password})
        .then(user=>{
          if(user){
            user.ltodos.push(ltodo)
            user.save()
            return {
              statusCode:200,
              status:true,
              message:"successfully saved"
          }
          }
          else{
            return {
              statusCode:422,
              status:false,
              message:"failed to add"
          }
          }
        })
          
        }
        const view=(req)=>{
            let uid=req.session.currentUser;
            return db.Todo.findOne({uid})
           .then(user=>{
             if(user){
              return {
                statusCode:200,
                status:true,
                message:user.ltodos
            }
             }
             else{
              return {
                statusCode:422,
                status:false,
                message:"failed to view"
            }
             }
           })
          } 
  const deletetodo=(req,index)=>{
    let uid=req.session.currentUser;
    // console.log(req.session.currentUser)
    return db.Todo.findOne({uid})
    .then(user=>{
        if(user){
               user.ltodos.splice(index, 1);
                user.save()
           
            return {
                statusCode:200,
                status:true,
                message:"successfully deleted"
            }
        }
      else{
        return {
            statusCode:422,
            status:false,
            message:"failed to delete"
        }
      }
    })
  }
   module.exports={
    register,
    login,
    save,
    view,
    deletetodo
    
   }   