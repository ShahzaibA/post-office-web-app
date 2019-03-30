const express = require('express');
const cors = require('cors');
const mysql = require('mysql');
const app = express();
const bodyParser = require('body-parser')

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
app.use(bodyParser.json())

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

app.post('/create_order', (req, res) => {
    const { sender_firstName, sender_lastName, sender_address, sender_apartment, sender_city, sender_state,
        sender_zip, sender_country, sender_email, sender_phone, receiver_firstName, receiver_lastName,
        receiver_address, receiver_apartment, receiver_city, receiver_state, receiver_zip, receiver_country,
        package_type, package_weight, quantity, price } = req.body;

    // add sender to sender table if not exists
    connection.query(`INSERT INTO postoffice.sender (FName, LName, Addr1, City_ID, State_ID, ZIP, Country_ID, Email, Phone) VALUES('${sender_firstName}', '${sender_lastName}', '${sender_address}', (SELECT City_ID FROM postoffice.cities WHERE City_Name='${sender_city}'),  (SELECT State_ID FROM postoffice.states WHERE State_Abbr='${sender_state}'), '${sender_zip}', (SELECT Country_ID FROM postoffice.countries WHERE Country_Name='${sender_country}'), '${sender_email}', '${sender_phone}')`, function (err, results) {
        if (err) {
            console.log(err);
        }
    })

    // create invoice associated with the sender 


})

app.listen(4000, () => {
    console.log(`listening on port 4000`)
}); 