const express = require('express');

const pool =require("./db");

const jwt=require("jsonwebtoken");
const secret="908@sachin$$%^";

function setUser(user){
    return jwt.sign(user,secret);
}

