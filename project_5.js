
const fs = require("fs");
const fastcsv = require("fast-csv");
const express = require('express')
const mysql = require('mysql');



let stream = fs.createReadStream("newCustomers.csv");
let csvData = [];
let csvStream = fastcsv
    .parse()
    .on("data", function(data) {
        csvData.push(data);
    })



const con = mysql.createConnection({
    host: "localhost",
    port: "3306",
    user: "root",
    password: "password",
    database: "SriwanCustomer"
});
const app = express()

con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");

    con.query("CREATE DATABASE SriwanCustomer", function (err, result) {
        if (err) throw err;
        console.log("Database created");
    });


    let sql1 = "CREATE TABLE customers (Customer VARCHAR(5) NOT NULL, Type INT(1) NOT NULL, Gender VARCHAR(1) NOT NULL, First VARCHAR(50) NOT NULL, Last VARCHAR(50) NOT NULL, Street VARCHAR(100) NOT NULL, City VARCHAR(50) NOT NULL, State VARCHAR(2) NOT NULL, Zip VARCHAR(5) NOT NULL, Phone VARCHAR(10) NOT NULL, Since VARCHAR(255) NOT NULL, Visit VARCHAR(255) NOT NULL)";
    con.query(sql1, function (err, result) {
        if (err) throw err;
        console.log("Table created");
    });



    let query = "INSERT INTO customers (Customer, Type, Gender, First, Last, Street, City, State, Zip, Phone, Since, Visit) VALUES ?";
    con.query(query, [csvData], (error, response) => {
        console.log(error || response);
    });



    let sql2 = 'SELECT Type, COUNT(*) FROM customers GROUP BY Type;'
    con.query(sql2, function (err, result) {
        if (err) throw err;
        console.log(result);
    });



    // let sql = "DROP TABLE customers";
    // con.query(sql, function (err, result) {
    //     if (err) throw err;
    //     console.log("Table dropped");
    // });
});

stream.pipe(csvStream);




