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

//Chris Query->
app.get('/get_shipstatus', (req, res) => {
    connection.query('SELECT * FROM postoffice.shipstatus', function (err, results) {
        if (err) {
            res.send(err);
        }
        else {
            return res.json({
                data: results
            })
        }
    })
});
//<-Chris Query

app.get('/get_packages', (req, res) => {
    connection.query('SELECT * FROM postoffice.package', function (err, results) {
        if (err) {
            res.send(err);
        }
        else {
            return res.json({
                data: results
            })
        }
    })
});

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


    // insert senders city into lookup table if not exists
    connection.query(`INSERT INTO postoffice.cities (City_Name) SELECT * FROM (SELECT '${sender_city}') AS tmp WHERE NOT EXISTS (SELECT City_Name FROM postoffice.cities WHERE City_Name='${sender_city}') LIMIT 1`, function (err, results) {
        if (err) {
            console.log(err);
        }
    })

    // insert receivers city into lookup table if not exists
    connection.query(`INSERT INTO postoffice.cities (City_Name) SELECT * FROM (SELECT '${receiver_city}') AS tmp WHERE NOT EXISTS (SELECT City_Name FROM postoffice.cities WHERE City_Name='${receiver_city}') LIMIT 1`, function (err, results) {
        if (err) {
            console.log(err);
        }
    })

    // add sender to sender table if not exists
    connection.query(`INSERT INTO postoffice.sender (FName, LName, Addr1, City_ID, State_ID, ZIP, Country_ID, Email, Phone) SELECT * FROM (SELECT '${sender_firstName}', '${sender_lastName}', '${sender_address}', (SELECT City_ID FROM postoffice.cities WHERE City_Name='${sender_city}'),  (SELECT State_ID FROM postoffice.states WHERE State_Abbr='${sender_state}'), '${sender_zip}', (SELECT Country_ID FROM postoffice.countries WHERE Country_Name='${sender_country}'), '${sender_email}', '${sender_phone}') AS tmp WHERE NOT EXISTS (SELECT FName, LName, Addr1, Email FROM postoffice.sender WHERE FName='${sender_firstName}' AND LName='${sender_lastName}' AND Addr1='${sender_address}' AND Email='${sender_email}') LIMIT 1`, function (err, results) {
        if (err) {
            console.log(err);
        }
    })

    // create invoice associated with the sender 
    connection.query(`INSERT INTO postoffice.invoice (Sender_ID, Price, Tender_ID, Date, Time, PackageQuantity) VALUES((SELECT Sender_ID from postoffice.sender WHERE FName='${sender_firstName}' AND LName='${sender_lastName}' AND Email='${sender_email}' AND Addr1='${sender_address}'), ${price}, 1, curdate(), now(), ${quantity})`, function (err, results) {
        if (err) {
            console.log(err);
        }
        else {
            query_res = results;
            // query to create package
            connection.query(`INSERT INTO postoffice.package (Invoice_ID, Sender_ID, ShipForm_ID, Weight, ReceiverFirstName, ReceiverLastName, ReceiverAddr, ReceiverCity_ID, ReceiverState_ID, ReceiverZip, ReceiverCountry_ID) VALUES (${query_res.insertId},(SELECT Sender_ID from postoffice.sender WHERE FName='${sender_firstName}' AND LName='${sender_lastName}' AND Email='${sender_email}' AND Addr1='${sender_address}'), (SELECT ShipForm_ID FROM postoffice.shipform WHERE ShipForm='${package_type}'), ${package_weight}, '${receiver_firstName}', '${receiver_lastName}', '${receiver_address}', (SELECT City_ID FROM postoffice.cities WHERE City_Name='${receiver_city}'), (SELECT State_ID FROM postoffice.states WHERE State_Abbr='${receiver_state}'), '${receiver_zip}', (SELECT Country_ID FROM postoffice.countries WHERE Country_Name='${receiver_country}'))`, function (err, results) {
                if (err) {
                    console.log(err);
                }
                else {
                    res.json({
                        invoice_ID: query_res.insertId,
                        tracking_ID: results.insertId
                    })
                }
            })
        }
    })
})

app.listen(4000, () => {
    console.log(`listening on port 4000`)
});



/*
UNUSED QUERIES:

connection.query(`INSERT INTO postoffice.sender (FName, LName, Addr1, City_ID, State_ID, ZIP, Country_ID, Email, Phone) VALUES('${sender_firstName}', '${sender_lastName}', '${sender_address}', (SELECT City_ID FROM postoffice.cities WHERE City_Name='${sender_city}'),  (SELECT State_ID FROM postoffice.states WHERE State_Abbr='${sender_state}'), '${sender_zip}', (SELECT Country_ID FROM postoffice.countries WHERE Country_Name='${sender_country}'), '${sender_email}', '${sender_phone}') WHERE `, function (err, results) {
        if (err) {
            console.log(err);
        }
    })

*/