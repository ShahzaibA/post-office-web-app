const express = require('express');
const cors = require('cors');
const mysql = require('mysql');
const app = express();
const bodyParser = require('body-parser')
const nodemailer = require('nodemailer');


const connection = mysql.createConnection({
    host: 'localhost',
    port: '3306',
    user: 'root',
    password: 'Group2PO',
    database: 'mydb'
})

connection.connect(err => {
    if (err) {
        throw err;
    }
    else {
        console.log("Connected successfully to MySQL Database");
    }
});

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'Group2PO@gmail.com',
        pass: 'Group2PO123!'
    }
});

app.use(cors());
app.use(bodyParser.json())

//Chris Query->
app.post('/get_shipstatus', (req, res) => {
    const { package_id } = req.body;

    connection.query(`
    SELECT mydb.ShipStatus.Package_ID, mydb.ShipStatus.ShipStatus_ID, mydb.ShipStatus.Date, mydb.ShipStatus.Time, mydb.Hub.Addr, mydb.Status.Status_ID, mydb.Status.Status_Type, mydb.Package.ReceiverAddr
    FROM mydb.ShipStatus
    LEFT JOIN mydb.Hub ON mydb.Hub.Hub_ID = mydb.ShipStatus.Hub_ID OR mydb.ShipStatus.Hub_ID = NULL
    LEFT JOIN mydb.Status ON mydb.Status.Status_ID = mydb.ShipStatus.Status_ID
    LEFT JOIN mydb.Package ON mydb.Package.Package_ID = mydb.ShipStatus.Package_ID
    WHERE mydb.ShipStatus.Package_ID = '${package_id}'
    ORDER BY mydb.ShipStatus.ShipStatus_ID DESC, mydb.ShipStatus.Date DESC, mydb.ShipStatus.Time DESC, mydb.Status.Status_ID DESC`
        , function (err, results) {
            if (err) {
                console.log(err);
            }
            else {
                return res.json({
                    data: results
                })
            }
        })
});

app.post('/get_invoices', (req, res) => {
    const { sender_id } = req.body;
    connection.query(`
    SELECT mydb.Sender.FName, mydb.Sender.LName, mydb.Invoice.Date, mydb.Invoice.Time, mydb.Package.Package_ID, mydb.Package.ReceiverFirstName, mydb.Package.ReceiverLastName, mydb.Package.ReceiverAddr,  mydb.Invoice.Price, mydb.Package.Weight, mydb.ShipForm.ShipForm
    FROM mydb.Invoice
    INNER JOIN mydb.Package ON mydb.Package.Invoice_ID = mydb.Invoice.Invoice_ID
    INNER JOIN mydb.ShipForm ON mydb.ShipForm.ShipForm_ID = mydb.Package.ShipForm_ID
    INNER JOIN mydb.Sender ON mydb.Sender.Sender_ID = mydb.Invoice.Sender_ID
    WHERE mydb.Invoice.Sender_ID = '${sender_id}'
    ORDER BY mydb.Invoice.Date DESC, mydb.Invoice.Time DESC`
        , function (err, results) {
            if (err) {
                console.log(err);
            }
            else {
                return res.json({
                    data: results,
                })
            }
        })
});

app.get('/get_status_types', (req, res) => {
    connection.query('SELECT Status_Type FROM mydb.Status', function (err, results) {
        if (err) {
            res.send(err);
        }
        else {
            return res.json({
                status_types: results
            })
        }
    })
});

//<-Chris Query

//Victor Query->
app.get('/get_user', (req, res) => {
    connection.query(`SELECT Username FROM SenderCredentials WHERE Sender_ID = "${req.query.sender_ID}";`, function (err, results) {
        if (err) {
            res.send(err);
        }
        else if (results.length !== 0) {
            //console.log("Results array not empty");
            let myusername = results[0].Username
            connection.query(`SELECT FName, LName, Addr1, Addr2, City_ID, State_ID,Country_ID, ZIP, Phone, Apt, Email FROM mydb.Sender WHERE Sender_ID = ${req.query.sender_ID}`, function (err, results) {
                //console.log(results);
                if (err) {
                    res.send(err);
                }
                else if (results.length !== 0) {
                    //console.log(results)
                    return res.json({
                        username: myusername,
                        sender_firstName: results[0].FName,
                        sender_lastName: results[0].LName,
                        sender_address: results[0].Addr1,
                        sender_address2: results[0].Addr2,
                        sender_apartment: results[0].Apt,
                        sender_city: results[0].City_ID,
                        sender_state: results[0].State_ID,
                        sender_zip: results[0].ZIP,
                        sender_country: results[0].Country_ID,
                        sender_email: results[0].Email,
                        sender_phone: results[0].Phone,
                    })
                }
            })
        }
    })
});


app.get('/get_cities', (req, res) => {
    connection.query('SELECT * FROM mydb.Cities', function (err, results) {
        if (err) {
            res.send(err);
        }
        else {
            return res.json({
                cities: results
            })
        }
    })
});

app.get('/get_countries', (req, res) => {
    connection.query('SELECT * FROM mydb.Countries', function (err, results) {
        if (err) {
            res.send(err);
        }
        else {
            return res.json({
                countries: results
            })
        }
    })
});

app.post('/edit_user', (req, res) => {
    const { username, password, sender_firstName, sender_lastName, sender_address, sender_address2, sender_apartment, sender_city, sender_state,
        sender_zip, sender_country, sender_email, sender_phone, sender_id } = req.body;


    // insert senders city into lookup table if not exists
    connection.query(`INSERT INTO mydb.Cities (City_Name) SELECT * FROM (SELECT '${sender_city}') AS tmp WHERE NOT EXISTS (SELECT City_Name FROM mydb.Cities WHERE City_Name='${sender_city}') LIMIT 1`, function (err, results) {
        if (err) {
            console.log(err);
        } else {
            connection.query(`SELECT City_ID from mydb.Cities WHERE City_Name='${sender_city}'`, function (err, results) {
                if (err) {
                    console.log(err);
                } else {
                    let city_id = results[0].City_ID

                    connection.query(`SELECT State_ID from mydb.States WHERE State_Abbr='${sender_state}'`, function (err, results) {
                        if (err) {
                            console.log(err);
                        } else {
                            let state_id = results[0].State_ID

                            connection.query(`SELECT Country_ID from mydb.Countries WHERE Country_Name='${sender_country}'`, function (err, results) {
                                if (err) {
                                    console.log(err);
                                } else {
                                    let country_id = results[0].Country_ID

                                    connection.query(`UPDATE mydb.Sender 
                                                      SET Addr1='${sender_address}', 
                                                      Addr2='${sender_address2}', 
                                                      City_ID=${city_id}, 
                                                      State_ID=${state_id}, 
                                                      ZIP=${sender_zip}, 
                                                      Country_ID=${country_id},
                                                      Apt=${sender_apartment},
                                                      Phone=${sender_phone}
                                                      WHERE Sender_ID = ${sender_id};`, function (err, results) {
                                            if (err) {
                                                console.log(err);
                                            } else {
                                                //console.log('done');
                                                return res



                                            }
                                        })

                                }
                            })
                        }
                    })
                }
            })
        }
    })
})

app.get('/get_report', function (req, res) {

    let date1 = req.query.date1;
    let date2 = req.query.date2;
    let status_type = req.query.status_type;

    let q =
        `SELECT 
            mydb.ShipStatus.Hub_ID,
            mydb.Hub.Addr,
            mydb.Hub.Zip,
            COUNT(*) AS Total_Packages
        FROM
            mydb.ShipStatus
                JOIN
            mydb.Status ON mydb.ShipStatus.Status_ID = mydb.Status.Status_ID
                JOIN
            mydb.Hub ON mydb.ShipStatus.Hub_ID = mydb.Hub.Hub_ID
        WHERE (mydb.Status.Status_Type = '${status_type}') AND (mydb.ShipStatus.Date BETWEEN '${date1}' AND '${date2}')
        GROUP BY mydb.ShipStatus.Hub_ID
        `;
    connection.query(q, function (err, results) {
        if (err) {
            res.send(err);
        }
        else {
            return res.json(results);
        }
    })
});

app.get('/get_total_income', function (req, res) {

    let date1 = req.query.date1;
    let date2 = req.query.date2;

    let q = `SELECT
	            sum(mydb.Invoice.Price) AS Total
            FROM mydb.Invoice
            WHERE (mydb.Invoice.Date BETWEEN '${date1}' AND '${date2}')
            `;

    connection.query(q, function (err, results) {
        if (err) {
            res.send(err);
        }
        else {
            return res.json(results);
        }
    })
});



//<-Victor Query


app.get('/get_packages', (req, res) => {
    connection.query('SELECT * FROM mydb.Package', function (err, results) {
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
    connection.query('SELECT * FROM mydb.States', function (err, results) {
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
    connection.query('SELECT * FROM mydb.ShipForm', function (err, results) {
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
    connection.query(`INSERT INTO mydb.Cities (City_Name) SELECT * FROM (SELECT '${sender_city}') AS tmp WHERE NOT EXISTS (SELECT City_Name FROM mydb.Cities WHERE City_Name='${sender_city}') LIMIT 1`, function (err, results) {
        if (err) {
            console.log(err);
        }
    })

    // insert receivers city into lookup table if not exists
    connection.query(`INSERT INTO mydb.Cities (City_Name) SELECT * FROM (SELECT '${receiver_city}') AS tmp WHERE NOT EXISTS (SELECT City_Name FROM mydb.Cities WHERE City_Name='${receiver_city}') LIMIT 1`, function (err, results) {
        if (err) {
            console.log(err);
        }
    })

    if (sender_apartment === '') {
        // add sender w/o apt to sender table if not exists
        connection.query(`INSERT INTO mydb.Sender (FName, LName, Addr1, City_ID, State_ID, ZIP, Country_ID, Email, Phone) SELECT * FROM (SELECT '${sender_firstName}' as FName, '${sender_lastName}' as LName, '${sender_address}' as Addr, (SELECT City_ID FROM mydb.Cities WHERE City_Name='${sender_city}') as City_ID,  (SELECT State_ID FROM mydb.States WHERE State_Abbr='${sender_state}') as State_ID, '${sender_zip}' as Zip, (SELECT Country_ID FROM mydb.Countries WHERE Country_Name='${sender_country}') as Country_ID, '${sender_email}' as Email, '${sender_phone}' as Phone) AS tmp WHERE NOT EXISTS (SELECT FName, LName, Addr1, Email FROM mydb.Sender WHERE FName='${sender_firstName}' AND LName='${sender_lastName}' AND Addr1='${sender_address}' AND Email='${sender_email}') LIMIT 1`, function (err, results) {
            if (err) {
                console.log(err);
            }
        })
    } else {
        // add sender w/ apt to sender table if not exists
        connection.query(`INSERT INTO mydb.Sender (FName, LName, Addr1, Apt, City_ID, State_ID, ZIP, Country_ID, Email, Phone) SELECT * FROM (SELECT '${sender_firstName}' as FName, '${sender_lastName}' as LName, '${sender_address}' as Addr, '${sender_apartment}' as Apt, (SELECT City_ID FROM mydb.Cities WHERE City_Name='${sender_city}') as City_ID,  (SELECT State_ID FROM mydb.States WHERE State_Abbr='${sender_state}') as State_ID, '${sender_zip}' as Zip, (SELECT Country_ID FROM mydb.Countries WHERE Country_Name='${sender_country}') as Country_ID, '${sender_email}' as Email, '${sender_phone}' as Phone) AS tmp WHERE NOT EXISTS (SELECT FName, LName, Addr1, Email FROM mydb.Sender WHERE FName='${sender_firstName}' AND LName='${sender_lastName}' AND Addr1='${sender_address}' AND Email='${sender_email}') LIMIT 1`, function (err, results) {
            if (err) {
                console.log(err);
            }
        })
    }

    // create invoice associated with the sender 
    connection.query(`INSERT INTO mydb.Invoice (Sender_ID, Price, Tender_ID, Date, Time, PackageQuantity) VALUES((SELECT Sender_ID from mydb.Sender WHERE FName='${sender_firstName}' AND LName='${sender_lastName}' AND Email='${sender_email}' AND Addr1='${sender_address}'), ${price}, 1, curdate(), now(), ${quantity})`, function (err, results) {
        if (err) {
            console.log(err);
        }
        else {
            query_res = results;

            if (receiver_apartment === '') {
                // query to create package for receiver w/o apt
                connection.query(`INSERT INTO mydb.Package (Invoice_ID, Sender_ID, ShipForm_ID, Weight, ReceiverFirstName, ReceiverLastName, ReceiverAddr, ReceiverCity_ID, ReceiverState_ID, ReceiverZip, ReceiverCountry_ID) VALUES (${query_res.insertId},(SELECT Sender_ID from mydb.Sender WHERE FName='${sender_firstName}' AND LName='${sender_lastName}' AND Email='${sender_email}' AND Addr1='${sender_address}'), (SELECT ShipForm_ID FROM mydb.ShipForm WHERE ShipForm='${package_type}'), ${package_weight}, '${receiver_firstName}', '${receiver_lastName}', '${receiver_address}', (SELECT City_ID FROM mydb.Cities WHERE City_Name='${receiver_city}'), (SELECT State_ID FROM mydb.States WHERE State_Abbr='${receiver_state}'), '${receiver_zip}', (SELECT Country_ID FROM mydb.Countries WHERE Country_Name='${receiver_country}'))`, function (err, results) {
                    if (err) {
                        console.log(err);
                    }
                    else {
                        // create initial awaiting arrival status
                        connection.query(`INSERT INTO mydb.ShipStatus (Status_ID, Date, Time, Hub_ID, Package_ID) VALUES ((SELECT Status_ID FROM mydb.Status WHERE Status_Type='Awaiting Arrival'), curdate(), now(), (SELECT Hub_ID from mydb.Hub WHERE State_ID=(SELECT State_ID FROM mydb.States WHERE State_Abbr='${sender_state}')), ${results.insertId}) `)
                        return res.json({
                            invoice_ID: query_res.insertId,
                            tracking_ID: results.insertId
                        })
                    }
                })

            }
            else {
                // query to create package for receiver w/ apt
                connection.query(`INSERT INTO mydb.Package (Invoice_ID, Sender_ID, ShipForm_ID, Weight, ReceiverFirstName, ReceiverLastName, ReceiverAddr, ReceiverCity_ID, ReceiverState_ID, ReceiverZip, ReceiverCountry_ID, ReceiverApt) VALUES (${query_res.insertId},(SELECT Sender_ID from mydb.Sender WHERE FName='${sender_firstName}' AND LName='${sender_lastName}' AND Email='${sender_email}' AND Addr1='${sender_address}'), (SELECT ShipForm_ID FROM mydb.ShipForm WHERE ShipForm='${package_type}'), ${package_weight}, '${receiver_firstName}', '${receiver_lastName}', '${receiver_address}', (SELECT City_ID FROM mydb.Cities WHERE City_Name='${receiver_city}'), (SELECT State_ID FROM mydb.States WHERE State_Abbr='${receiver_state}'), '${receiver_zip}', (SELECT Country_ID FROM mydb.Countries WHERE Country_Name='${receiver_country}'), '${receiver_apartment}')`, function (err, results) {
                    if (err) {
                        console.log(err);
                    }
                    else {
                        // create initial awaiting arrival status
                        connection.query(`INSERT INTO mydb.ShipStatus (Status_ID, Date, Time, Hub_ID, Package_ID) VALUES ((SELECT Status_ID FROM mydb.Status WHERE Status_Type='Awaiting Arrival'), curdate(), now(), (SELECT Hub_ID from mydb.Hub WHERE State_ID=(SELECT State_ID FROM mydb.States WHERE State_Abbr='${sender_state}')), ${results.insertId}) `)
                        return res.json({
                            invoice_ID: query_res.insertId,
                            tracking_ID: results.insertId
                        })
                    }
                })
            }
        }
    })
})

app.post('/create_user', (req, res) => {
    const { username, password, sender_firstName, sender_lastName, sender_address, sender_apartment, sender_city, sender_state,
        sender_zip, sender_country, sender_email, sender_phone } = req.body;

    // insert senders city into lookup table if not exists
    connection.query(`INSERT INTO mydb.Cities (City_Name) SELECT * FROM (SELECT '${sender_city}') AS tmp WHERE NOT EXISTS (SELECT City_Name FROM mydb.Cities WHERE City_Name='${sender_city}') LIMIT 1`, function (err, results) {
        if (err) {
            console.log(err);
        }
    })

    // check to see if that username or email exists in the db
    connection.query(`SELECT * FROM mydb.SenderCredentials WHERE Username='${username}'`, function (err, results) {
        if (err) {
            console.log(err);
        }
        else {
            if (results.length === 0) {
                if (sender_apartment === '') {
                    // add sender w/o apt to sender table if not exists
                    connection.query(`INSERT INTO mydb.Sender (FName, LName, Addr1, City_ID, State_ID, ZIP, Country_ID, Email, Phone) SELECT * FROM (SELECT '${sender_firstName}' as FName, '${sender_lastName}' as LName, '${sender_address}' as Addr, (SELECT City_ID FROM mydb.Cities WHERE City_Name='${sender_city}') as City_ID,  (SELECT State_ID FROM mydb.States WHERE State_Abbr='${sender_state}') as State_ID, '${sender_zip}' as Zip, (SELECT Country_ID FROM mydb.Countries WHERE Country_Name='${sender_country}') as Country_ID, '${sender_email}' as Email, '${sender_phone}' as Phone) AS tmp WHERE NOT EXISTS (SELECT FName, LName, Addr1, Email FROM mydb.Sender WHERE FName='${sender_firstName}' AND LName='${sender_lastName}' AND Addr1='${sender_address}' AND Email='${sender_email}') LIMIT 1`, function (err, results) {
                        if (err) {
                            console.log(err);
                        }
                    })
                } else {
                    // add sender w/ apt to sender table if not exists
                    connection.query(`INSERT INTO mydb.Sender (FName, LName, Addr1, Apt, City_ID, State_ID, ZIP, Country_ID, Email, Phone) SELECT * FROM (SELECT '${sender_firstName}' as FName, '${sender_lastName}' as LName, '${sender_address}' as Addr, '${sender_apartment}' as Apt, (SELECT City_ID FROM mydb.Cities WHERE City_Name='${sender_city}') as City_ID,  (SELECT State_ID FROM mydb.States WHERE State_Abbr='${sender_state}') as State_ID, '${sender_zip}' as Zip, (SELECT Country_ID FROM mydb.Countries WHERE Country_Name='${sender_country}') as Country_ID, '${sender_email}' as Email, '${sender_phone}' as Phone) AS tmp WHERE NOT EXISTS (SELECT FName, LName, Addr1, Email FROM mydb.Sender WHERE FName='${sender_firstName}' AND LName='${sender_lastName}' AND Addr1='${sender_address}' AND Email='${sender_email}') LIMIT 1`, function (err, results) {
                        if (err) {
                            console.log(err);
                        }
                    })
                }

                // create new account linked to a sender
                connection.query(`INSERT INTO mydb.SenderCredentials (Username, Password, Sender_ID) VALUES ('${username}', '${password}', (SELECT Sender_ID from mydb.Sender WHERE FName='${sender_firstName}' AND LName='${sender_lastName}' AND Email='${sender_email}' AND Addr1='${sender_address}'))`, function (err, results) {
                    if (err) {
                        console.log(err);
                    }
                    else {
                        return res.json({
                            accountCreated: true
                        })
                    }
                })
            }
            else {
                return res.json({
                    accountCreated: false
                })
            }
        }
    })
})

app.post('/login_user', (req, res) => {
    const { username, password } = req.body;
    connection.query(`SELECT * FROM mydb.SenderCredentials WHERE Username='${username}' AND Password='${password}'`, function (err, results) {
        if (err) {
            console.log(err);
        }
        else {
            return res.json({
                data: results
            })
        }
    })
})

app.post('/login_employee', (req, res) => {
    const { employee_email, password } = req.body;
    connection.query(`SELECT mydb.EmployeeCredentials.Email, mydb.JobTitles.JobTitle
    FROM mydb.EmployeeCredentials 
    LEFT JOIN mydb.Employee ON mydb.EmployeeCredentials.Email=mydb.Employee.Email 
    LEFT JOIN mydb.JobTitles ON mydb.JobTitles.Jobtitle_ID=mydb.Employee.JobTitles_ID
    WHERE mydb.EmployeeCredentials.Email='${employee_email}' AND mydb.EmployeeCredentials.Password='${password}'`, function (err, results) {
            if (err) {
                console.log(err);
            }
            else {
                if (results.length !== 0) {
                    return res.json({
                        data: results
                    })
                }
            }
        })
})

app.post('/get_packages_awaiting_arrival', (req, res) => {
    const { Hub_Location } = req.body;
    connection.query(`SELECT mydb.ShipStatus.Package_ID, mydb.Package.ReceiverAddr as 'Shipping_Address', Receiver_City.City_Name as 'Shipping_City', Receiver_State.State_Abbr as 'Shipping_State_Abbr', mydb.Package.ReceiverZip as 'Shipping_Zip', mydb.ShipStatus.Hub_ID as 'Hub_ID'
    FROM mydb.ShipStatus
    LEFT JOIN mydb.Package ON mydb.Package.Package_ID=mydb.ShipStatus.Package_ID
    LEFT JOIN mydb.Hub ON mydb.Hub.Hub_ID=mydb.ShipStatus.Hub_ID or mydb.ShipStatus.Hub_ID=null
    LEFT JOIN mydb.Cities as Hub_City ON Hub_City.City_ID=mydb.Hub.City_ID
    LEFT JOIN mydb.Cities as Receiver_City ON Receiver_City.City_ID=mydb.Package.ReceiverCity_ID
    LEFT JOIN mydb.States as Hub_State ON Hub_State.State_ID=mydb.Hub.State_ID
    LEFT JOIN mydb.States AS Receiver_State ON Receiver_State.State_ID=mydb.Package.ReceiverState_ID
    LEFT JOIN mydb.Status ON mydb.ShipStatus.Status_ID=mydb.Status.Status_ID
    WHERE Hub_State.State_Abbr='${Hub_Location}' AND mydb.Status.Status_Type='Awaiting Arrival' AND mydb.ShipStatus.ShipStatus_ID IN (
        SELECT MAX(mydb.ShipStatus.ShipStatus_ID)
        FROM mydb.ShipStatus
        GROUP BY mydb.ShipStatus.Package_ID)`, function (err, results) {
            if (err) {
                console.log(err);
            }
            else {
                return res.json({
                    data: results
                })
            }
        })
})

app.post('/get_arrived_packages', (req, res) => {
    const { Hub_Location } = req.body;
    connection.query(`SELECT mydb.ShipStatus.Package_ID, mydb.Package.ReceiverAddr as 'Shipping_Address', Receiver_City.City_Name as 'Shipping_City', Receiver_State.State_Abbr as 'Shipping_State_Abbr', mydb.Package.ReceiverZip as 'Shipping_Zip', mydb.ShipStatus.Hub_ID as 'Hub_ID'
    FROM mydb.ShipStatus
    LEFT JOIN mydb.Package ON mydb.Package.Package_ID=mydb.ShipStatus.Package_ID
    LEFT JOIN mydb.Hub ON mydb.Hub.Hub_ID=mydb.ShipStatus.Hub_ID or mydb.ShipStatus.Hub_ID=null
    LEFT JOIN mydb.Cities as Hub_City ON Hub_City.City_ID=mydb.Hub.City_ID
    LEFT JOIN mydb.Cities as Receiver_City ON Receiver_City.City_ID=mydb.Package.ReceiverCity_ID
    LEFT JOIN mydb.States as Hub_State ON Hub_State.State_ID=mydb.Hub.State_ID
    LEFT JOIN mydb.States AS Receiver_State ON Receiver_State.State_ID=mydb.Package.ReceiverState_ID
    LEFT JOIN mydb.Status ON mydb.ShipStatus.Status_ID=mydb.Status.Status_ID
    WHERE Hub_State.State_Abbr='${Hub_Location}' AND Receiver_State.State_Abbr!='${Hub_Location}' AND mydb.Status.Status_Type='Arrival Scan' AND mydb.ShipStatus.ShipStatus_ID IN (
        SELECT MAX(mydb.ShipStatus.ShipStatus_ID)
        FROM mydb.ShipStatus
        GROUP BY mydb.ShipStatus.Package_ID)`, function (err, results) {
            if (err) {
                console.log(err);
            }
            else {
                return res.json({
                    data: results
                })
            }
        })
})

app.post('/get_packages_to_deliver', (req, res) => {
    const { Hub_Location } = req.body;
    connection.query(`SELECT mydb.ShipStatus.Package_ID, mydb.Package.ReceiverAddr as 'Shipping_Address', Receiver_City.City_Name as 'Shipping_City', Receiver_State.State_Abbr as 'Shipping_State_Abbr', mydb.Package.ReceiverZip as 'Shipping_Zip', mydb.ShipStatus.Hub_ID as 'Hub_ID'
    FROM mydb.ShipStatus
    LEFT JOIN mydb.Package ON mydb.Package.Package_ID=mydb.ShipStatus.Package_ID
    LEFT JOIN mydb.Hub ON mydb.Hub.Hub_ID=mydb.ShipStatus.Hub_ID or mydb.ShipStatus.Hub_ID=null
    LEFT JOIN mydb.Cities as Hub_City ON Hub_City.City_ID=mydb.Hub.City_ID
    LEFT JOIN mydb.Cities as Receiver_City ON Receiver_City.City_ID=mydb.Package.ReceiverCity_ID
    LEFT JOIN mydb.States as Hub_State ON Hub_State.State_ID=mydb.Hub.State_ID
    LEFT JOIN mydb.States AS Receiver_State ON Receiver_State.State_ID=mydb.Package.ReceiverState_ID
    LEFT JOIN mydb.Status ON mydb.ShipStatus.Status_ID=mydb.Status.Status_ID
    WHERE Hub_State.State_Abbr='${Hub_Location}' AND Receiver_State.State_Abbr='${Hub_Location}' AND mydb.Status.Status_Type='Arrival Scan' AND mydb.ShipStatus.ShipStatus_ID IN (
        SELECT MAX(mydb.ShipStatus.ShipStatus_ID)
        FROM mydb.ShipStatus
        GROUP BY mydb.ShipStatus.Package_ID)`, function (err, results) {
            if (err) {
                console.log(err);
            }
            else {
                return res.json({
                    data: results
                })
            }
        })
})

app.post('/arrival_scan', (req, res) => {
    const { Package_ID, Hub_ID } = req.body;
    connection.query(`INSERT INTO mydb.ShipStatus (Status_ID, Date, Time, Hub_ID, Package_ID) VALUES((SELECT Status_ID FROM mydb.Status WHERE Status_Type='Arrival Scan'), curdate(), now(), ${Hub_ID}, ${Package_ID})`, function (err, results) {
        if (err) {
            console.log(err);
        }
        res.send('success');
    })
})

app.post('/get_drivers', (req, res) => {
    const { Hub_Location } = req.body;
    connection.query(`SELECT ID, FName, LName
    FROM mydb.Employee
    LEFT JOIN mydb.JobTitles ON mydb.Employee.JobTitles_ID=mydb.JobTitles.JobTitle_ID
    WHERE mydb.JobTitles.JobTitle='Driver'`, function (err, results) {
            if (err) {
                console.log(err);
            }
            else {
                return res.json({
                    drivers: results
                })
            }
        })

})

app.post('/in_transit_scan', (req, res) => {
    const { Package_ID, Hub_ID, Next_Hub, Driver_ID } = req.body;
    connection.query(`INSERT INTO mydb.ShipStatus (Status_ID, Date, Time, Hub_ID, Package_ID) VALUES((SELECT Status_ID FROM mydb.Status WHERE Status_Type='Package Processed'), curdate(), now(), (SELECT Hub_ID FROM mydb.Hub LEFT JOIN mydb.States ON mydb.Hub.State_ID=mydb.States.State_ID WHERE mydb.States.State_Abbr='${Hub_ID}'), ${Package_ID})`, function (err, results) {
        if (err) {
            console.log(err);
        }
        else {
            connection.query(`INSERT INTO mydb.ShipStatus (Status_ID, Date, Time, Hub_ID, Package_ID, Driver_ID) VALUES((SELECT Status_ID FROM mydb.Status WHERE Status_Type='In Transit'), curdate(), now(), (SELECT Hub_ID FROM mydb.Hub LEFT JOIN mydb.States ON mydb.Hub.State_ID=mydb.States.State_ID WHERE mydb.States.State_Abbr='${Next_Hub}'), ${Package_ID}, ${Driver_ID})`, function (err, results) {
                if (err) {
                    console.log(err);
                }
                connection.query(`INSERT INTO mydb.ShipStatus (Status_ID, Date, Time, Hub_ID, Package_ID) VALUES ((SELECT Status_ID FROM mydb.Status WHERE Status_Type='Awaiting Arrival'), curdate(), now(), (SELECT Hub_ID FROM mydb.Hub LEFT JOIN mydb.States ON mydb.Hub.State_ID=mydb.States.State_ID WHERE mydb.States.State_Abbr='${Next_Hub}'), ${Package_ID})`, function (err, results) {
                    if (err) {
                        console.log(err);
                    }
                    else {
                        res.send('success');
                    }
                })
            })
        }
    })
})

app.post('/send_out_for_delivery', (req, res) => {
    const { Package_ID, Hub_ID, Driver_ID } = req.body;
    connection.query(`INSERT INTO mydb.ShipStatus (Status_ID, Date, Time, Hub_ID, Package_ID) VALUES((SELECT Status_ID FROM mydb.Status WHERE Status_Type='Package Processed'), curdate(), now(), (SELECT Hub_ID FROM mydb.Hub LEFT JOIN mydb.States ON mydb.Hub.State_ID=mydb.States.State_ID WHERE mydb.States.State_Abbr='${Hub_ID}'), ${Package_ID})`, function (err, results) {
        if (err) {
            console.log(err);
        }
        else {
            connection.query(`INSERT INTO mydb.ShipStatus (Status_ID, Date, Time, Hub_ID, Package_ID, Driver_ID) VALUES((SELECT Status_ID FROM mydb.Status WHERE Status_Type='Out For Delivery'), curdate(), now(), (SELECT Hub_ID FROM mydb.Hub LEFT JOIN mydb.States ON mydb.Hub.State_ID=mydb.States.State_ID WHERE mydb.States.State_Abbr='${Hub_ID}'), ${Package_ID}, ${Driver_ID})`, function (err, results) {
                if (err) {
                    console.log(err);
                }
                res.send('success');
            })
        }
    })

})

app.post('/get_deliveries', (req, res) => {
    const { Employee_Email } = req.body;
    connection.query(`SELECT mydb.ShipStatus.Package_ID, mydb.Package.ReceiverAddr as 'Shipping_Address', Receiver_City.City_Name as 'Shipping_City', Receiver_State.State_Abbr as 'Shipping_State_Abbr', mydb.Package.ReceiverZip as 'Shipping_Zip', mydb.ShipStatus.Hub_ID as 'Hub_ID'
    FROM mydb.ShipStatus
    lEFT JOIN mydb.Employee ON mydb.Employee.ID=mydb.ShipStatus.Driver_ID
    LEFT JOIN mydb.Package ON mydb.Package.Package_ID=mydb.ShipStatus.Package_ID
    LEFT JOIN mydb.Hub ON mydb.Hub.Hub_ID=mydb.ShipStatus.Hub_ID or mydb.ShipStatus.Hub_ID=null
    LEFT JOIN mydb.Cities as Hub_City ON Hub_City.City_ID=mydb.Hub.City_ID
    LEFT JOIN mydb.Cities as Receiver_City ON Receiver_City.City_ID=mydb.Package.ReceiverCity_ID
    LEFT JOIN mydb.States as Hub_State ON Hub_State.State_ID=mydb.Hub.State_ID
    LEFT JOIN mydb.States AS Receiver_State ON Receiver_State.State_ID=mydb.Package.ReceiverState_ID
    LEFT JOIN mydb.Status ON mydb.ShipStatus.Status_ID=mydb.Status.Status_ID
    WHERE mydb.Employee.Email='${Employee_Email}' AND mydb.Status.Status_Type='Out For Delivery' AND mydb.ShipStatus.ShipStatus_ID IN (
        SELECT MAX(mydb.ShipStatus.ShipStatus_ID)
        FROM mydb.ShipStatus
        GROUP BY mydb.ShipStatus.Package_ID)`, function (err, results) {
            if (err) {
                console.log(err);
            }
            else {
                return res.json({
                    data: results
                })
            }
        })

})

app.post('/delivered', (req, res) => {
    const { Package_ID, Employee_Email } = req.body;
    connection.query(`INSERT INTO mydb.ShipStatus (Status_ID, Date, Time, Package_ID, Driver_ID) VALUES((SELECT Status_ID FROM mydb.Status WHERE Status_Type='Delivered'), curdate(), now(), ${Package_ID}, (SELECT ID FROM mydb.Employee WHERE Email='${Employee_Email}'))`, function (err, results) {
        if (err) {
            console.log(err);
        }
        else {
            connection.query(`SELECT Email, Package_ID
            FROM mydb.Sender
            LEFT JOIN mydb.Package ON mydb.Package.Sender_ID=mydb.Sender.Sender_ID
            WHERE mydb.Package.Package_ID=(SELECT Package_ID FROM mydb.ShipStatus WHERE ShipStatus_ID=${results.insertId})`, function (err, results) {
                    if (err) {
                        console.log(err);
                    }
                    else if (results.length !== 0) {
                        var mailOptions = {
                            from: 'Group2PO@gmail.com',
                            to: results[0].Email,
                            subject: 'The Package You Sent Has Been Delivered!',
                            text: 'Your package #' + results[0].Package_ID + ' has been delivered to the recepients address.'
                        };

                        transporter.sendMail(mailOptions, function (error, info) {
                            if (error) {
                                console.log(error);
                            }
                        });

                        res.send('success');
                    }
                    else {
                        res.send('success')
                    }
                })
        }
    })
})

app.post('/get_employees', (req, res) => {
    const { Employee_Email } = req.body;
    connection.query(`SELECT ID, FName, LName, Email, JobTitle, mydb.Hub.Addr, mydb.Cities.City_Name, mydb.States.State_Abbr, mydb.Hub.Zip
    FROM mydb.Employee
    LEFT JOIN mydb.JobTitles ON mydb.JobTitles.JobTitle_ID=mydb.Employee.JobTitles_ID
    LEFT JOIN mydb.Hub ON mydb.Hub.Hub_ID=mydb.Employee.Hub_ID
    LEFT JOIN mydb.Cities ON mydb.Hub.City_ID=mydb.Cities.City_ID
    LEFT JOIN mydb.States ON mydb.Hub.State_ID=mydb.States.State_ID`, function (err, results) {
            if (err) {
                console.log(err);
            }
            else {
                return res.json({
                    data: results
                })
            }
        })
})

app.get('/get_job_titles', (req, res) => {
    connection.query(`SELECT * FROM mydb.JobTitles`, function (err, results) {
        if (err) {
            console.log(err);
        }
        else {
            return res.json({
                data: results
            })
        }
    })
})

app.get('/get_hubs', (req, res) => {
    connection.query(`SELECT mydb.Hub.Hub_ID, mydb.Hub.Addr, mydb.Cities.City_Name, mydb.States.State_Abbr, mydb.Hub.Zip
    FROM mydb.Hub
    LEFT JOIN mydb.Cities ON mydb.Hub.City_ID=mydb.Cities.City_ID
    LEFT JOIN mydb.States ON mydb.Hub.State_ID=mydb.States.State_ID
    ORDER BY State_Abbr`, function (err, results) {
            if (err) {
                console.log(err);
            }
            else {
                return res.json({
                    data: results
                })
            }
        })
})

app.post('/create_employee', (req, res) => {
    console.log("Im in here")
    const { FName, LName, Email, JobTitle_ID, Hub_ID } = req.body;
    connection.query(`INSERT INTO mydb.Employee
    (FName, LName, Email, Hub_ID, JobTitles_ID)
    VALUES ('${FName}', '${LName}', '${Email}', ${Hub_ID}, ${JobTitle_ID})`, function (err, results) {
            if (err) {
                console.log(err);
            }
            else {
                res.send('success')
            }
        })
})

app.post('/create_driver_employee', (req, res) => {
    const { FName, LName, Email, JobTitle_ID, Hub_ID, VIN } = req.body;
    connection.query(`INSERT INTO mydb.Employee
    (FName, LName, Email, Hub_ID, JobTitles_ID)
    VALUES ('${FName}', '${LName}', '${Email}', ${Hub_ID}, ${JobTitle_ID})`, function (err, results) {
            if (err) {
                console.log(err);
            }
            else {
                connection.query(`INSERT INTO mydb.Vehicles (VIN, Vehicle_Hub_Location_ID, Driver_Employee_ID)
                VALUES ('${VIN}', '${Hub_ID}', ${results.insertId})`, function (err, results) {
                        if (err) {
                            console.log(err);
                        }
                        else {
                            res.send('success')
                        }
                    })
            }
        })
})

app.post('/get_sender_information', (req, res) => {
    const { Sender_ID } = req.body;
    connection.query(`SELECT FName, LName, Addr1, Apt, City_Name, State_Abbr, Zip, Country_Name, Email, Phone
    FROM mydb.Sender
    LEFT JOIN mydb.Cities ON mydb.Cities.City_ID=mydb.Sender.City_ID
    LEFT JOIN mydb.States ON mydb.States.State_ID=mydb.Sender.State_ID
    LEFT JOIN mydb.Countries ON mydb.Countries.Country_ID=mydb.Sender.Country_ID
    WHERE Sender_ID='${Sender_ID}'`, function (err, results) {
            if (err) {
                console.log(err);
            }
            else {
                return res.json({
                    data: results
                })
            }
        })
})

app.post('/update_user_password', (req, res) => {
    const { Sender_ID, New_Password } = req.body;
    connection.query(`UPDATE mydb.SenderCredentials
    SET Password='${New_Password}', Date_Updated=null
    WHERE Sender_ID=${Sender_ID}`, function (err, results) {
            if (err) {
                console.log(err);
            }
            else {
                connection.query(`
                SELECT Date_Updated 
                FROM mydb.SenderCredentials 
                WHERE Sender_ID=${Sender_ID}`, function (err, results) {
                        if (err) {
                            console.log(err);
                        }
                        else {
                            return res.json({
                                data: results
                            })
                        }
                    }
                )
            }
        })
})

app.post('/get_last', (req, res) => {
    const { Sender_ID } = req.body;
    connection.query(`
    SELECT Date_Updated 
    FROM mydb.SenderCredentials 
    WHERE Sender_ID=${Sender_ID}`, function (err, results) {
            if (err) {
                console.log(err);
            }
            else {
                if (results.length !== 0) {
                    return res.json({
                        LastUpdated: results[0].Date_Updated
                    })
                }
            }
        }
    )
})

app.listen(4000, () => {
    console.log(`listening on port 4000`)
});
