const express = require ("express");
const app = express();
const mysql =  require ("mysql");
const Connection = require("mysql/lib/Connection");
require("dotenv").config();

const{insert, read, update, remove } = require("./operations");


app.use(express.json());

const connection = mysql.createConnection({
    host: process.env.DBHOST,
    user: process.env.DBUSER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    port: 3307
    
});

connection.connect((err) => {
    if (err) throw err; 
    console.log("Connected to database")
});

app.get("/", (req, res) => {
    res.send("Hello World");
});

app.get("/insert", (req, res) => {
    insert(connection, { id_category:'14', id_parent: '2', id_shop_default: '11', level_depth:'1', active:'1 ', date_add:'2018-10-24 00:00:00', date_upd:'2018-10-24 00:00:00', name: 'iPad'}, result => {
        res.json(result);
    });
});

app.get("/read", (req, res) => {
    read(connection, (result) => {
        res.json(result);
    });
});

app.get("/update", (req, res) => {
    update(connection, {id_category:8}, (result) => {
        res.json(result);
    });
});

app.get("/remove", (req, res) => {
    remove(connection, {id_category:1}, (result) => {
        res.json(result);
    });
});

app.listen(3000, () => {
    console.log("Servidor en puerto 3000...");
});

module.exports = { insert };