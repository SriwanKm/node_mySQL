const express = require('express')
const mysql = require('mysql');

const con = mysql.createConnection({
    host: "localhost",
    port: "3306",
    user: "root",
    password: "password",
    database: "students"
});
const app = express()

con.connect(function(err) {

    let sql = "INSERT INTO studentData (Name, Address, School) VALUES ('Sriwan Khao', 'Highway 37', 'BHCC')"

    if (err) throw err;
    console.log("Connected!");
    // con.query("CREATE DATABASE sriwandb", function (err, result) {
    //     if (err) throw err;
    //     console.log("Database created");


    // con.query(sql, function (err, result) {
    //     if (err) throw err;
    //     console.log("1 record inserted");


        con.query("SELECT * FROM studentData", function (err, result) {
            if (err) throw err;
            console.log(result);
    });
});
