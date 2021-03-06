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
    database: 'postoffice'
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
    SELECT postoffice.ShipStatus.Package_ID, postoffice.shipstatus.ShipStatus_ID, postoffice.ShipStatus.Date, postoffice.ShipStatus.Time, postoffice.Hub.Addr, postoffice.Status.Status_ID, postoffice.Status.Status_Type, postoffice.Package.ReceiverAddr
    FROM postoffice.ShipStatus
    LEFT JOIN postoffice.Hub ON postoffice.Hub.Hub_ID = postoffice.ShipStatus.Hub_ID OR postoffice.ShipStatus.Hub_ID = NULL
    LEFT JOIN postoffice.Status ON postoffice.Status.Status_ID = postoffice.ShipStatus.Status_ID
    LEFT JOIN postoffice.Package ON postoffice.Package.Package_ID = postoffice.ShipStatus.Package_ID
    WHERE postoffice.ShipStatus.Package_ID = '${package_id}'
    ORDER BY postoffice.ShipStatus.ShipStatus_ID DESC, postoffice.ShipStatus.Date DESC, postoffice.ShipStatus.Time DESC, postoffice.Status.Status_ID DESC`
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
    SELECT postoffice.Sender.FName, postoffice.Sender.LName, postoffice.Invoice.Date, postoffice.Invoice.Time, postoffice.Package.Package_ID, postoffice.Package.ReceiverFirstName, postoffice.Package.ReceiverLastName, postoffice.Package.ReceiverAddr,  postoffice.Invoice.Price, postoffice.Package.Weight, postoffice.ShipForm.ShipForm
    FROM postoffice.Invoice
    INNER JOIN postoffice.Package ON postoffice.Package.Invoice_ID = postoffice.Invoice.Invoice_ID
    INNER JOIN postoffice.ShipForm ON postoffice.ShipForm.ShipForm_ID = postoffice.Package.ShipForm_ID
    INNER JOIN postoffice.Sender ON postoffice.Sender.Sender_ID = postoffice.Invoice.Sender_ID
    WHERE postoffice.Invoice.Sender_ID = '${sender_id}'
    ORDER BY postoffice.Invoice.Date DESC, postoffice.Invoice.Time DESC`
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
    connection.query('SELECT Status_Type FROM postoffice.status', function (err, results) {
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
    connection.query(`SELECT Username FROM sendercredentials WHERE Sender_ID = "${req.query.sender_ID}";`, function (err, results) {
        if (err) {
            res.send(err);
        }
        else if (results.length !== 0) {
            //console.log("Results array not empty");
            let myusername = results[0].Username
            connection.query(`SELECT FName, LName, Addr1, Addr2, City_ID, State_ID,Country_ID, ZIP, Phone, Apt, Email FROM sender WHERE Sender_ID = ${req.query.sender_ID}`, function (err, results) {
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
    connection.query('SELECT * FROM postoffice.cities', function (err, results) {
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
    connection.query('SELECT * FROM postoffice.countries', function (err, results) {
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
    connection.query(`INSERT INTO postoffice.cities (City_Name) SELECT * FROM (SELECT '${sender_city}') AS tmp WHERE NOT EXISTS (SELECT City_Name FROM postoffice.cities WHERE City_Name='${sender_city}') LIMIT 1`, function (err, results) {
        if (err) {
            console.log(err);
        } else {
            connection.query(`SELECT City_ID from postoffice.cities WHERE City_Name='${sender_city}'`, function (err, results) {
                if (err) {
                    console.log(err);
                } else {
                    let city_id = results[0].City_ID

                    connection.query(`SELECT State_ID from postoffice.states WHERE State_Abbr='${sender_state}'`, function (err, results) {
                        if (err) {
                            console.log(err);
                        } else {
                            let state_id = results[0].State_ID

                            connection.query(`SELECT Country_ID from postoffice.countries WHERE Country_Name='${sender_country}'`, function (err, results) {
                                if (err) {
                                    console.log(err);
                                } else {
                                    let country_id = results[0].Country_ID

                                    connection.query(`UPDATE postoffice.sender 
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
            shipstatus.Hub_ID,
            hub.Addr,
            hub.Zip,
            COUNT(*) AS Total_Packages
        FROM
            postoffice.shipstatus
                JOIN
            postoffice.status ON shipstatus.Status_ID = status.Status_ID
                JOIN
            postoffice.hub ON shipstatus.Hub_ID = hub.Hub_ID
        WHERE (status.Status_Type = '${status_type}') AND (shipstatus.Date BETWEEN '${date1}' AND '${date2}')
        GROUP BY postoffice.shipstatus.Hub_ID
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
	            sum(invoice.Price) AS Total
            FROM postoffice.invoice
            WHERE (invoice.Date BETWEEN '${date1}' AND '${date2}')
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

    if (sender_apartment === '') {
        // add sender w/o apt to sender table if not exists
        connection.query(`INSERT INTO postoffice.sender (FName, LName, Addr1, City_ID, State_ID, ZIP, Country_ID, Email, Phone) SELECT * FROM (SELECT '${sender_firstName}' as FName, '${sender_lastName}' as LName, '${sender_address}' as Addr, (SELECT City_ID FROM postoffice.cities WHERE City_Name='${sender_city}') as City_ID,  (SELECT State_ID FROM postoffice.states WHERE State_Abbr='${sender_state}') as State_ID, '${sender_zip}' as Zip, (SELECT Country_ID FROM postoffice.countries WHERE Country_Name='${sender_country}') as Country_ID, '${sender_email}' as Email, '${sender_phone}' as Phone) AS tmp WHERE NOT EXISTS (SELECT FName, LName, Addr1, Email FROM postoffice.sender WHERE FName='${sender_firstName}' AND LName='${sender_lastName}' AND Addr1='${sender_address}' AND Email='${sender_email}') LIMIT 1`, function (err, results) {
            if (err) {
                console.log(err);
            }
        })
    } else {
        // add sender w/ apt to sender table if not exists
        connection.query(`INSERT INTO postoffice.sender (FName, LName, Addr1, Apt, City_ID, State_ID, ZIP, Country_ID, Email, Phone) SELECT * FROM (SELECT '${sender_firstName}' as FName, '${sender_lastName}' as LName, '${sender_address}' as Addr, '${sender_apartment}' as Apt, (SELECT City_ID FROM postoffice.cities WHERE City_Name='${sender_city}') as City_ID,  (SELECT State_ID FROM postoffice.states WHERE State_Abbr='${sender_state}') as State_ID, '${sender_zip}' as Zip, (SELECT Country_ID FROM postoffice.countries WHERE Country_Name='${sender_country}') as Country_ID, '${sender_email}' as Email, '${sender_phone}' as Phone) AS tmp WHERE NOT EXISTS (SELECT FName, LName, Addr1, Email FROM postoffice.sender WHERE FName='${sender_firstName}' AND LName='${sender_lastName}' AND Addr1='${sender_address}' AND Email='${sender_email}') LIMIT 1`, function (err, results) {
            if (err) {
                console.log(err);
            }
        })
    }

    // create invoice associated with the sender 
    connection.query(`INSERT INTO postoffice.invoice (Sender_ID, Price, Tender_ID, Date, Time, PackageQuantity) VALUES((SELECT Sender_ID from postoffice.sender WHERE FName='${sender_firstName}' AND LName='${sender_lastName}' AND Email='${sender_email}' AND Addr1='${sender_address}'), ${price}, 1, curdate(), now(), ${quantity})`, function (err, results) {
        if (err) {
            console.log(err);
        }
        else {
            query_res = results;

            if (receiver_apartment === '') {
                // query to create package for receiver w/o apt
                connection.query(`INSERT INTO postoffice.package (Invoice_ID, Sender_ID, ShipForm_ID, Weight, ReceiverFirstName, ReceiverLastName, ReceiverAddr, ReceiverCity_ID, ReceiverState_ID, ReceiverZip, ReceiverCountry_ID) VALUES (${query_res.insertId},(SELECT Sender_ID from postoffice.sender WHERE FName='${sender_firstName}' AND LName='${sender_lastName}' AND Email='${sender_email}' AND Addr1='${sender_address}'), (SELECT ShipForm_ID FROM postoffice.shipform WHERE ShipForm='${package_type}'), ${package_weight}, '${receiver_firstName}', '${receiver_lastName}', '${receiver_address}', (SELECT City_ID FROM postoffice.cities WHERE City_Name='${receiver_city}'), (SELECT State_ID FROM postoffice.states WHERE State_Abbr='${receiver_state}'), '${receiver_zip}', (SELECT Country_ID FROM postoffice.countries WHERE Country_Name='${receiver_country}'))`, function (err, results) {
                    if (err) {
                        console.log(err);
                    }
                    else {
                        // create initial awaiting arrival status
                        connection.query(`INSERT INTO postoffice.ShipStatus (Status_ID, Date, Time, Hub_ID, Package_ID) VALUES ((SELECT Status_ID FROM postoffice.status WHERE Status_Type='Awaiting Arrival'), curdate(), now(), (SELECT Hub_ID from postoffice.Hub WHERE State_ID=(SELECT State_ID FROM postoffice.states WHERE State_Abbr='${sender_state}')), ${results.insertId}) `)
                        return res.json({
                            invoice_ID: query_res.insertId,
                            tracking_ID: results.insertId
                        })
                    }
                })

            }
            else {
                // query to create package for receiver w/ apt
                connection.query(`INSERT INTO postoffice.package (Invoice_ID, Sender_ID, ShipForm_ID, Weight, ReceiverFirstName, ReceiverLastName, ReceiverAddr, ReceiverCity_ID, ReceiverState_ID, ReceiverZip, ReceiverCountry_ID, ReceiverApt) VALUES (${query_res.insertId},(SELECT Sender_ID from postoffice.sender WHERE FName='${sender_firstName}' AND LName='${sender_lastName}' AND Email='${sender_email}' AND Addr1='${sender_address}'), (SELECT ShipForm_ID FROM postoffice.shipform WHERE ShipForm='${package_type}'), ${package_weight}, '${receiver_firstName}', '${receiver_lastName}', '${receiver_address}', (SELECT City_ID FROM postoffice.cities WHERE City_Name='${receiver_city}'), (SELECT State_ID FROM postoffice.states WHERE State_Abbr='${receiver_state}'), '${receiver_zip}', (SELECT Country_ID FROM postoffice.countries WHERE Country_Name='${receiver_country}'), '${receiver_apartment}')`, function (err, results) {
                    if (err) {
                        console.log(err);
                    }
                    else {
                        // create initial awaiting arrival status
                        connection.query(`INSERT INTO postoffice.ShipStatus (Status_ID, Date, Time, Hub_ID, Package_ID) VALUES ((SELECT Status_ID FROM postoffice.status WHERE Status_Type='Awaiting Arrival'), curdate(), now(), (SELECT Hub_ID from postoffice.Hub WHERE State_ID=(SELECT State_ID FROM postoffice.states WHERE State_Abbr='${sender_state}')), ${results.insertId}) `)
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
    connection.query(`INSERT INTO postoffice.cities (City_Name) SELECT * FROM (SELECT '${sender_city}') AS tmp WHERE NOT EXISTS (SELECT City_Name FROM postoffice.cities WHERE City_Name='${sender_city}') LIMIT 1`, function (err, results) {
        if (err) {
            console.log(err);
        }
    })

    // check to see if that username or email exists in the db
    connection.query(`SELECT * FROM postoffice.sendercredentials WHERE Username='${username}'`, function (err, results) {
        if (err) {
            console.log(err);
        }
        else {
            if (results.length === 0) {
                if (sender_apartment === '') {
                    // add sender w/o apt to sender table if not exists
                    connection.query(`INSERT INTO postoffice.sender (FName, LName, Addr1, City_ID, State_ID, ZIP, Country_ID, Email, Phone) SELECT * FROM (SELECT '${sender_firstName}' as FName, '${sender_lastName}' as LName, '${sender_address}' as Addr, (SELECT City_ID FROM postoffice.cities WHERE City_Name='${sender_city}') as City_ID,  (SELECT State_ID FROM postoffice.states WHERE State_Abbr='${sender_state}') as State_ID, '${sender_zip}' as Zip, (SELECT Country_ID FROM postoffice.countries WHERE Country_Name='${sender_country}') as Country_ID, '${sender_email}' as Email, '${sender_phone}' as Phone) AS tmp WHERE NOT EXISTS (SELECT FName, LName, Addr1, Email FROM postoffice.sender WHERE FName='${sender_firstName}' AND LName='${sender_lastName}' AND Addr1='${sender_address}' AND Email='${sender_email}') LIMIT 1`, function (err, results) {
                        if (err) {
                            console.log(err);
                        }
                    })
                } else {
                    // add sender w/ apt to sender table if not exists
                    connection.query(`INSERT INTO postoffice.sender (FName, LName, Addr1, Apt, City_ID, State_ID, ZIP, Country_ID, Email, Phone) SELECT * FROM (SELECT '${sender_firstName}' as FName, '${sender_lastName}' as LName, '${sender_address}' as Addr, '${sender_apartment}' as Apt, (SELECT City_ID FROM postoffice.cities WHERE City_Name='${sender_city}') as City_ID,  (SELECT State_ID FROM postoffice.states WHERE State_Abbr='${sender_state}') as State_ID, '${sender_zip}' as Zip, (SELECT Country_ID FROM postoffice.countries WHERE Country_Name='${sender_country}') as Country_ID, '${sender_email}' as Email, '${sender_phone}' as Phone) AS tmp WHERE NOT EXISTS (SELECT FName, LName, Addr1, Email FROM postoffice.sender WHERE FName='${sender_firstName}' AND LName='${sender_lastName}' AND Addr1='${sender_address}' AND Email='${sender_email}') LIMIT 1`, function (err, results) {
                        if (err) {
                            console.log(err);
                        }
                    })
                }

                // create new account linked to a sender
                connection.query(`INSERT INTO postoffice.sendercredentials (Username, Password, Sender_ID) VALUES ('${username}', '${password}', (SELECT Sender_ID from postoffice.sender WHERE FName='${sender_firstName}' AND LName='${sender_lastName}' AND Email='${sender_email}' AND Addr1='${sender_address}'))`, function (err, results) {
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
    connection.query(`SELECT * FROM postoffice.senderCredentials WHERE Username='${username}' AND Password='${password}'`, function (err, results) {
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
    connection.query(`SELECT postoffice.EmployeeCredentials.Email, postoffice.JobTitles.JobTitle
    FROM postoffice.EmployeeCredentials 
    LEFT JOIN postoffice.Employee ON postoffice.EmployeeCredentials.Email=postoffice.Employee.Email 
    LEFT JOIN postoffice.JobTitles ON postoffice.JobTitles.Jobtitle_ID=postoffice.Employee.JobTitles_ID
    WHERE postoffice.EmployeeCredentials.Email='${employee_email}' AND postoffice.EmployeeCredentials.Password='${password}'`, function (err, results) {
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
    connection.query(`SELECT postoffice.ShipStatus.Package_ID, postoffice.Package.ReceiverAddr as 'Shipping_Address', Receiver_City.City_Name as 'Shipping_City', Receiver_State.State_Abbr as 'Shipping_State_Abbr', postoffice.Package.ReceiverZip as 'Shipping_Zip', postoffice.ShipStatus.Hub_ID as 'Hub_ID'
    FROM postoffice.ShipStatus
    LEFT JOIN postoffice.Package ON postoffice.Package.Package_ID=postoffice.ShipStatus.Package_ID
    LEFT JOIN postoffice.Hub ON postoffice.Hub.Hub_ID=postoffice.ShipStatus.Hub_ID or postoffice.ShipStatus.Hub_ID=null
    LEFT JOIN postoffice.Cities as Hub_City ON Hub_City.City_ID=postoffice.Hub.City_ID
    LEFT JOIN postoffice.Cities as Receiver_City ON Receiver_City.City_ID=postoffice.Package.ReceiverCity_ID
    LEFT JOIN postoffice.States as Hub_State ON Hub_State.State_ID=postoffice.Hub.State_ID
    LEFT JOIN postoffice.States AS Receiver_State ON Receiver_State.State_ID=postoffice.Package.ReceiverState_ID
    LEFT JOIN postoffice.Status ON postoffice.ShipStatus.Status_ID=postoffice.Status.Status_ID
    WHERE Hub_State.State_Abbr='${Hub_Location}' AND postoffice.Status.Status_Type='Awaiting Arrival' AND postoffice.ShipStatus.ShipStatus_ID IN (
        SELECT MAX(postoffice.ShipStatus.ShipStatus_ID)
        FROM postoffice.ShipStatus
        GROUP BY postoffice.ShipStatus.Package_ID)`, function (err, results) {
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
    connection.query(`SELECT postoffice.ShipStatus.Package_ID, postoffice.Package.ReceiverAddr as 'Shipping_Address', Receiver_City.City_Name as 'Shipping_City', Receiver_State.State_Abbr as 'Shipping_State_Abbr', postoffice.Package.ReceiverZip as 'Shipping_Zip', postoffice.ShipStatus.Hub_ID as 'Hub_ID'
    FROM postoffice.ShipStatus
    LEFT JOIN postoffice.Package ON postoffice.Package.Package_ID=postoffice.ShipStatus.Package_ID
    LEFT JOIN postoffice.Hub ON postoffice.Hub.Hub_ID=postoffice.ShipStatus.Hub_ID or postoffice.ShipStatus.Hub_ID=null
    LEFT JOIN postoffice.Cities as Hub_City ON Hub_City.City_ID=postoffice.Hub.City_ID
    LEFT JOIN postoffice.Cities as Receiver_City ON Receiver_City.City_ID=postoffice.Package.ReceiverCity_ID
    LEFT JOIN postoffice.States as Hub_State ON Hub_State.State_ID=postoffice.Hub.State_ID
    LEFT JOIN postoffice.States AS Receiver_State ON Receiver_State.State_ID=postoffice.Package.ReceiverState_ID
    LEFT JOIN postoffice.Status ON postoffice.ShipStatus.Status_ID=postoffice.Status.Status_ID
    WHERE Hub_State.State_Abbr='${Hub_Location}' AND Receiver_State.State_Abbr!='${Hub_Location}' AND postoffice.Status.Status_Type='Arrival Scan' AND postoffice.ShipStatus.ShipStatus_ID IN (
        SELECT MAX(postoffice.ShipStatus.ShipStatus_ID)
        FROM postoffice.ShipStatus
        GROUP BY postoffice.ShipStatus.Package_ID)`, function (err, results) {
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
    connection.query(`SELECT postoffice.ShipStatus.Package_ID, postoffice.Package.ReceiverAddr as 'Shipping_Address', Receiver_City.City_Name as 'Shipping_City', Receiver_State.State_Abbr as 'Shipping_State_Abbr', postoffice.Package.ReceiverZip as 'Shipping_Zip', postoffice.ShipStatus.Hub_ID as 'Hub_ID'
    FROM postoffice.ShipStatus
    LEFT JOIN postoffice.Package ON postoffice.Package.Package_ID=postoffice.ShipStatus.Package_ID
    LEFT JOIN postoffice.Hub ON postoffice.Hub.Hub_ID=postoffice.ShipStatus.Hub_ID or postoffice.ShipStatus.Hub_ID=null
    LEFT JOIN postoffice.Cities as Hub_City ON Hub_City.City_ID=postoffice.Hub.City_ID
    LEFT JOIN postoffice.Cities as Receiver_City ON Receiver_City.City_ID=postoffice.Package.ReceiverCity_ID
    LEFT JOIN postoffice.States as Hub_State ON Hub_State.State_ID=postoffice.Hub.State_ID
    LEFT JOIN postoffice.States AS Receiver_State ON Receiver_State.State_ID=postoffice.Package.ReceiverState_ID
    LEFT JOIN postoffice.Status ON postoffice.ShipStatus.Status_ID=postoffice.Status.Status_ID
    WHERE Hub_State.State_Abbr='${Hub_Location}' AND Receiver_State.State_Abbr='${Hub_Location}' AND postoffice.Status.Status_Type='Arrival Scan' AND postoffice.ShipStatus.ShipStatus_ID IN (
        SELECT MAX(postoffice.ShipStatus.ShipStatus_ID)
        FROM postoffice.ShipStatus
        GROUP BY postoffice.ShipStatus.Package_ID)`, function (err, results) {
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
    connection.query(`INSERT INTO postoffice.ShipStatus (Status_ID, Date, Time, Hub_ID, Package_ID) VALUES((SELECT Status_ID FROM postoffice.Status WHERE Status_Type='Arrival Scan'), curdate(), now(), ${Hub_ID}, ${Package_ID})`, function (err, results) {
        if (err) {
            console.log(err);
        }
        res.send('success');
    })
})

app.post('/get_drivers', (req, res) => {
    const { Hub_Location } = req.body;
    connection.query(`SELECT ID
    FROM postoffice.Employee
    LEFT JOIN postoffice.JobTitles ON postoffice.Employee.JobTitles_ID=postoffice.JobTitles.JobTitle_ID
    WHERE postoffice.JobTitles.JobTitle='Driver'`, function (err, results) {
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
    connection.query(`INSERT INTO postoffice.ShipStatus (Status_ID, Date, Time, Hub_ID, Package_ID) VALUES((SELECT Status_ID FROM postoffice.Status WHERE Status_Type='Package Processed'), curdate(), now(), (SELECT Hub_ID FROM postoffice.Hub LEFT JOIN postoffice.States ON postoffice.Hub.State_ID=postoffice.States.State_ID WHERE postoffice.States.State_Abbr='${Hub_ID}'), ${Package_ID})`, function (err, results) {
        if (err) {
            console.log(err);
        }
        else {
            connection.query(`INSERT INTO postoffice.ShipStatus (Status_ID, Date, Time, Hub_ID, Package_ID, Driver_ID) VALUES((SELECT Status_ID FROM postoffice.Status WHERE Status_Type='In Transit'), curdate(), now(), (SELECT Hub_ID FROM postoffice.Hub LEFT JOIN postoffice.States ON postoffice.Hub.State_ID=postoffice.States.State_ID WHERE postoffice.States.State_Abbr='${Next_Hub}'), ${Package_ID}, ${Driver_ID})`, function (err, results) {
                if (err) {
                    console.log(err);
                }
                connection.query(`INSERT INTO postoffice.ShipStatus (Status_ID, Date, Time, Hub_ID, Package_ID) VALUES ((SELECT Status_ID FROM postoffice.Status WHERE Status_Type='Awaiting Arrival'), curdate(), now(), (SELECT Hub_ID FROM postoffice.Hub LEFT JOIN postoffice.States ON postoffice.Hub.State_ID=postoffice.States.State_ID WHERE postoffice.States.State_Abbr='${Next_Hub}'), ${Package_ID})`, function (err, results) {
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
    connection.query(`INSERT INTO postoffice.ShipStatus (Status_ID, Date, Time, Hub_ID, Package_ID) VALUES((SELECT Status_ID FROM postoffice.Status WHERE Status_Type='Package Processed'), curdate(), now(), (SELECT Hub_ID FROM postoffice.Hub LEFT JOIN postoffice.States ON postoffice.Hub.State_ID=postoffice.States.State_ID WHERE postoffice.States.State_Abbr='${Hub_ID}'), ${Package_ID})`, function (err, results) {
        if (err) {
            console.log(err);
        }
        else {
            connection.query(`INSERT INTO postoffice.ShipStatus (Status_ID, Date, Time, Hub_ID, Package_ID, Driver_ID) VALUES((SELECT Status_ID FROM postoffice.Status WHERE Status_Type='Out For Delivery'), curdate(), now(), (SELECT Hub_ID FROM postoffice.Hub LEFT JOIN postoffice.States ON postoffice.Hub.State_ID=postoffice.States.State_ID WHERE postoffice.States.State_Abbr='${Hub_ID}'), ${Package_ID}, ${Driver_ID})`, function (err, results) {
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
    connection.query(`SELECT postoffice.ShipStatus.Package_ID, postoffice.Package.ReceiverAddr as 'Shipping_Address', Receiver_City.City_Name as 'Shipping_City', Receiver_State.State_Abbr as 'Shipping_State_Abbr', postoffice.Package.ReceiverZip as 'Shipping_Zip', postoffice.ShipStatus.Hub_ID as 'Hub_ID'
    FROM postoffice.ShipStatus
    lEFT JOIN postoffice.Employee ON postoffice.Employee.ID=postoffice.ShipStatus.Driver_ID
    LEFT JOIN postoffice.Package ON postoffice.Package.Package_ID=postoffice.ShipStatus.Package_ID
    LEFT JOIN postoffice.Hub ON postoffice.Hub.Hub_ID=postoffice.ShipStatus.Hub_ID or postoffice.ShipStatus.Hub_ID=null
    LEFT JOIN postoffice.Cities as Hub_City ON Hub_City.City_ID=postoffice.Hub.City_ID
    LEFT JOIN postoffice.Cities as Receiver_City ON Receiver_City.City_ID=postoffice.Package.ReceiverCity_ID
    LEFT JOIN postoffice.States as Hub_State ON Hub_State.State_ID=postoffice.Hub.State_ID
    LEFT JOIN postoffice.States AS Receiver_State ON Receiver_State.State_ID=postoffice.Package.ReceiverState_ID
    LEFT JOIN postoffice.Status ON postoffice.ShipStatus.Status_ID=postoffice.Status.Status_ID
    WHERE postoffice.Employee.Email='${Employee_Email}' AND postoffice.Status.Status_Type='Out For Delivery' AND postoffice.ShipStatus.ShipStatus_ID IN (
        SELECT MAX(postoffice.ShipStatus.ShipStatus_ID)
        FROM postoffice.ShipStatus
        GROUP BY postoffice.ShipStatus.Package_ID)`, function (err, results) {
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
    connection.query(`INSERT INTO postoffice.ShipStatus (Status_ID, Date, Time, Package_ID, Driver_ID) VALUES((SELECT Status_ID FROM postoffice.Status WHERE Status_Type='Delivered'), curdate(), now(), ${Package_ID}, (SELECT ID FROM postoffice.Employee WHERE Email='${Employee_Email}'))`, function (err, results) {
        if (err) {
            console.log(err);
        }
        else {
            connection.query(`SELECT Email, Package_ID
            FROM postoffice.Sender
            LEFT JOIN postoffice.Package ON postoffice.Package.Sender_ID=postoffice.Sender.Sender_ID
            WHERE postoffice.Package.Package_ID=(SELECT Package_ID FROM postoffice.ShipStatus WHERE ShipStatus_ID=${results.insertId})`, function (err, results) {
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
    connection.query(`SELECT ID, FName, LName, Email, JobTitle, postoffice.Hub.Addr, postoffice.Cities.City_Name, postoffice.States.State_Abbr, postoffice.Hub.Zip
    FROM postoffice.Employee
    LEFT JOIN postoffice.JobTitles ON postoffice.JobTitles.JobTitle_ID=postoffice.Employee.JobTitles_ID
    LEFT JOIN postoffice.Hub ON postoffice.Hub.Hub_ID=postoffice.Employee.Hub_ID
    LEFT JOIN postoffice.Cities ON postoffice.Hub.City_ID=postoffice.Cities.City_ID
    LEFT JOIN postoffice.States ON postoffice.Hub.State_ID=postoffice.States.State_ID`, function (err, results) {
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
    connection.query(`SELECT * FROM postoffice.JobTitles`, function (err, results) {
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
    connection.query(`SELECT postoffice.Hub.Hub_ID, postoffice.Hub.Addr, postoffice.Cities.City_Name, postoffice.States.State_Abbr, postoffice.Hub.Zip
    FROM postoffice.Hub
    LEFT JOIN postoffice.Cities ON postoffice.Hub.City_ID=postoffice.Cities.City_ID
    LEFT JOIN postoffice.States ON postoffice.Hub.State_ID=postoffice.States.State_ID`, function (err, results) {
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
    connection.query(`INSERT INTO postoffice.Employee
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
    connection.query(`INSERT INTO postoffice.Employee
    (FName, LName, Email, Hub_ID, JobTitles_ID)
    VALUES ('${FName}', '${LName}', '${Email}', ${Hub_ID}, ${JobTitle_ID})`, function (err, results) {
            if (err) {
                console.log(err);
            }
            else {
                connection.query(`INSERT INTO postoffice.Vehicles (VIN, Vehicle_Hub_Location_ID, Driver_Employee_ID)
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
    FROM postoffice.Sender
    LEFT JOIN postoffice.Cities ON postoffice.Cities.City_ID=postoffice.Sender.City_ID
    LEFT JOIN postoffice.States ON postoffice.States.State_ID=postoffice.Sender.State_ID
    LEFT JOIN postoffice.Countries ON postoffice.Countries.Country_ID=postoffice.Sender.Country_ID
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

app.listen(4000, () => {
    console.log(`listening on port 4000`)
});
