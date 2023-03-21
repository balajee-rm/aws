const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const jwt_decode = require('jwt-decode');
const { expressjwt: exjwt } = require("express-jwt");
const bcryptjs = require('bcryptjs');

const app = express();
app.use(cors());
app.use(express.json());

const secretKey = "abcd";
const algorithm = "HS256";
const salt = 10;

const jwtMW = exjwt({
    algorithms: [algorithm],
    secret: secretKey
  });

app.get('/', async (req, res)=>{
    res.send("This is Home Page");
})

app.post('/login',async (req, res)=>{
    console.log(req.body);
    var token = null;
    var pass_check = false;
    var pw = "PASS 1";
    pw = await bcryptjs.hash(pw,salt);
    console.log(pw);
    await bcryptjs.compare(req.body.pw, pw).then(res => {
        pass_check = res;
    }).catch(err => console.error(err.message))  
    console.log(pass_check)
    if (req.body.un == "USER 1" && pass_check == true) {
            token = jwt.sign(req.body, secretKey, {
            algorithm: algorithm,
            expiresIn: '2m'
        })
        res.status(200).json({
            message: 'success',
            token: token
        });
    }
    else {
        res.status(401).json({
            message: 'fail',
            token: token
        });
    }
})

app.post('/page1', jwtMW, (req, res) => {
    var token = req.headers.authorization;
    console.log(token);
    console.log(jwt_decode(token));
    res.send("You are Authorized");
})

app.listen(8081);
console.log("Server Started")