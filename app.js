var express=require("express");
var bodyParser=require("body-parser");

const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://meenakshi:9AMwYqt8FTb7Fr2Z@nodeapi.4dd3k.mongodb.net/sih?retryWrites=true&w=majority');
var db=mongoose.connection;
db.on('error', console.log.bind(console, "connection error"));
db.once('open', function(callback){
   console.log("connection succeeded");
})
var app=express()

app.use(bodyParser.json());
app.use(express.static('public'));
app.use(bodyParser.urlencoded({
   extended: true
}));

app.post('/sign_up', function(req,res){
   var name = req.body.name;
   var email =req.body.email;
   var pass = req.body.password;


   var data = {
      "name": name,
      "email":email,
      "password":pass

   }
   db.collection('details').insertOne(data,function(err, collection){
   if (err) throw err;
      console.log("Record inserted Successfully");
   });
   return res.redirect('success.html');
})
// app.post('/login', function (req, res, next) {
// 	//console.log(req.body);
// 	User.findOne({email:req.body.email},function(err,data){
// 		if(data){
//
// 			if(data.password==req.body.password){
// 				//console.log("Done Login");
// 				req.session.userId = data.unique_id;
// 				//console.log(req.session.userId);
// 				res.send({"Success":"Success!"});
//         return res.redirect("success.html")
//
// 			}else{
// 				res.send({"Success":"Wrong password!"});
// 			}
// 		}else{
// 			res.send({"Success":"This Email Is not regestered!"});
// 		}
// 	});
// });
app.get('/',function(req,res){
   res.set({
      'Access-control-Allow-Origin': '*'
   });
   return res.redirect('index.html');
}).listen(3000)

// app.get('/logout', function(req, res) {
//     res.clearCookie('nToken');
//     return res.redirect('index.html');
//   });


console.log("server listening at port 3000");
