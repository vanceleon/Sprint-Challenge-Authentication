const axios = require("axios");
const bcrypt = require("bcryptjs");
const { authenticate } = require("./middlewares");
const db = require("../database/dbConfig.js");
const jwtKey = require("../_secrets/keys");
const jwt = require("jsonwebtoken");


module.exports = server => {
  server.post("/api/register", register);
  server.post("/api/login", login);
  server.get("/api/jokes", authenticate, getJokes);
};

const secret = jwtKey.jwtKey;


const generateToken = users => {
  const payload = { username: users.username };
  const options = {
    expiresIn: "3h",
    jwtid: "6543"
  };
  // console.log("secret output ", secret)
  return jwt.sign(payload, secret, options);
};

//Register
// axios
// .post("http://localhost:3300/api/register",{
//   user: {
//     username: username,
//     password: password,
//   }
// })

function register(req, res) {
  // implement user registration
  const creds = req.body;
  const hash = bcrypt.hashSync(creds.password, 10);
  creds.password = hash;
  db("users")
    .insert(creds)
    .then(ids => {
      const id = ids[0];
      db("users")
        .where({ id })
        .first()
        .then(user => {
          const token = generateToken(user);
          res.status(201).json({ id: user.id, token });
        })
        .catch(err => {
          console.log("Error generating Token: ", err);
        });
    });
  }

  //login 
  // axios
  //   .post("http://localhost:3300/api/login")
  //   .then(response => {
  //     localStorage.setItem("jwt", response.data);
  //   })
  //   .catch(err => {
  //     console.log(err);
  //   });
  
function login(req, res) {
  // implement user login
  const creds = req.body;
  console.log(creds);
  db("users")
    .where({username: creds.username})
    .first()
    .then(user => {
      if(user && bcrypt.compareSync(creds.password, user.password)) {
        
        console.log("passed login: ", token)
        res.status(200).json(token);

      }else{
        console.log("didnt pass login")
        res.status(401).json({message: "You shall not hear jokes! Go back to the shadows"});
      }
    })
    .catch(err => res.status(500).send(err));
}

function getJokes(req, res) {
  axios
    .get(
      "https://08ad1pao69.execute-api.us-east-1.amazonaws.com/dev/random_ten"
    )
    .then(response => {
      res.status(200).json(response.data);
    })
    .catch(err => {
      res.status(500).json({ message: "Error Fetching Jokes", error: err });
    });
}
