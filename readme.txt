Website Url: www.shipit.ml:3000

User Login Credentials (Can create your own): 
    // Already contains mock invoices and data
    username: Shahzaib
    password: 321

Employee Login Credentials:
    // Manager Employee
    email: manager@email.com
    password: password

    // Driver Employee
    email: driver@email.com
    password: password

    ** If you create an employee, the email will be the entered email
        and password will be the LastName+FirstName+'pass'
        i.e. 'John Doe' -> password is 'DoeJohnpass'

General package flow pipeline:
    1. Package is scanned for arrival at the state package is being sent from.
    2. Package is then routed to another hub from the location it was scanned at.
    3. Repeat steps 1 & 2 until the package is scanned as arrived in the state is supposed to be delivered to.
    4. Send package out for delivery with a driver.
    5. Driver employee will see all of his/her packages and can mark as delivered.
    
2 Reports:
    You can find the reports in the employees page. Click on the "Employee" > "Reports".
