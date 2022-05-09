const res = require('express/lib/response');
const mysql = require('mysql');

function insert(connection,  data, callback){
    let insertQuery = "INSERT INTO category(id_category, id_parent, id_shop_default, level_depth, active, date_add, date_upd, name) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
    let query = mysql.format(insertQuery, [data.id_category, data.id_parent, data.id_shop_default, data.level_depth, data.active, data.date_add, data.date_upd, data.name])
    connection.query(query, function(err, result){
        if(err) throw err;
        callback(result);
        connection.end();

    });
}

function read(connection, callback){
    connection.query('SELECT * FROM category', function(err, result){
        if(err) throw err;
        callback(result);
        connection.end();
    });
}

function update(connection, data, callback){
    const newItem = 'new';
    let updateQuery = 'UPDATE category SET name = ? WHERE id_category = ?' ;
    let query = mysql.format(updateQuery, [newItem, data.id_category]);

    connection.query(query, function(err, result){
        if(err) throw err;
        callback(result);
        connection.end();
    })
}

function remove(connection, data, callback){
    let removeQuery = 'DELETE FROM category WHERE id_category = ?' ;
    let query = mysql.format(removeQuery, [data.id_category]);

    connection.query(query, function(err, result){
        if(err) throw err;
        callback(result);
        connection.end();
    })
}

module.exports =  { insert, read, update, remove};