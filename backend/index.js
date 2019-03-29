const express = require('express');
const cors = require('cors');
const mysql = require('mysql');
//const mysqlssh = require('mysql-ssh');


const app = express();


/*
const client = mysqlssh.connect(
    {
        host: '68.183.131.116',
        port: 22,
        username: 'root',
        password: 'coogs123'
    },
    {
        host: 'localhost',
        user: 'root',
        password: 'Group2PO',
        database: 'mydb'
    }
)
*/
const connection = mysql.createConnection({
    host: 'localhost',
    port: '3306',
    user: 'root',
    password: 'Group2PO',
    database: 'mydb'
})

connection.connect(err => {
    if (err) {
        return err;
    }
    else {
        console.log("Connection successful");
    }
});


app.use(cors());

app.get('/get_states', (req, res) => {
    connection.query('SELECT * FROM postoffice.States', function (err, results) {
        if (err) {
            res.send(err);
        }
        else {
            return res.json({
                states: results
            })
        }
    })
});

app.listen(4000, () => {
    console.log(`listening on port 4000`)
}); 