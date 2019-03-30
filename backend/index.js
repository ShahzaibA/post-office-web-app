const express = require('express');
const cors = require('cors');
const mysql = require('mysql');
const app = express();

const connection = mysql.createConnection({
    host: 'localhost',
    port: '3306',
    user: 'root',
    password: 'Group2PO',
    database: 'postoffice'
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

app.get('/get_package_types', (req, res) => {
    connection.query('SELECT * FROM postoffice.shipform', function (err, results) {
        if (err) {
            res.send(err);
        }
        else {
            return res.json({
                package_types: results
            })
        }
    })
});

app.listen(4000, () => {
    console.log(`listening on port 4000`)
}); 