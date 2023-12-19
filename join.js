const express = require('express')
const app = express()
const port = 3000

const { initializeApp, cert } = require('firebase-admin/app');
const { getFirestore} = require('firebase-admin/firestore');

var serviceAccount = require("./key.json");

initializeApp({
  credential: cert(serviceAccount)
});

const db = getFirestore();

app.use(express.static("public"));

app.set("view engine", "ejs");

app.get('/', (req, res) => {
  res.send('Hello World!')
});

app.get('/loginsubmit', (req, res) => {
  const name = req.query.name;
  console.log("name: ", name);
  const password = req.query.password;
  console.log("password: ", password);

  db.collection('Users')
  .where('name', '==', name)
  .where('password','==', password)
  .get()
  .then((docs)=>{
      if(docs.size>0){
        res.render("home");
      }
      else{
        res.send("login failed");
      }        
   });

});

app.get('/loginn', (req, res) => {
    res.render("loginn")
});

app.get('/signupsubmit', (req, res) => {
    const name = req.query.name;
    console.log("name: ", name);
    const email = req.query.email;
    console.log("email: ", email);
    const password = req.query.password;
    console.log("password: ", password);
    const confirmpassword= req.query.confirmpassword;
    console.log("confirmpassword: ", confirmpassword);

    //Adding new data to collection
db.collection('Users')
.add({
  name:name,
  email:email,
  password:password,
}).then(()=>{
  res.render("loginn");
});
});

app.get('/signupp', (req, res) => {
    res.render("signupp")
});

app.get('/home', (req, res) => {
    res.render("home")
  });
  
  app.get('/quiz', (req, res) => {
    res.render("quiz")
  });
  
  app.get('/urls', (req, res) => {
    res.render("urls")
  });

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});
