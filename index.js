const express = require('express');
const app = express();
const { con } = require('./sql.config');
require('./mongoose.config');
const Employee = require('./employeeSchema');
const port = 3000;

app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb', extended: true, parameterLimit: 50000}));
// con.query(`CREATE TABLE Persons (
//             id int AUTO_INCREMENT,
//             name varchar(255),
//             gender varchar(255),
//             age int(3),
//             PRIMARY KEY (id)
//         )`, (err, res)=>{
//     if(err) throw err;
//     console.log(res);
// });
// con.query('DROP TABLE Persons', (err, res)=>{
//     if(err) throw err;
//     console.log(res);
// });
// con.query('INSERT INTO persons (name, gender, age) values ("mohsin", "male", 30)', (err, res)=>{
//     if(err) throw err;
//     console.log(res);
// });

// con.query(`SELECT * FROM persons`, (err, res)=>{
//     if(err) throw err;
//     console.log(res);
// });

// function getPersonById(id){
// con.query(`SELECT * FROM Persons WHERE id = ?`, id, (err, res)=>{
//     if(err) throw err;
//     console.log(res);
// });
// }
// getPersonById(1);


app.get('/sql/api/employee', (req, res)=>{
    con.query(`SELECT * FROM Persons`,(err, result) => {
        if(err) throw err;
        res.json(result);
    });
});
app.get('/sql/api/employee/:id', (req, res)=>{
    con.query(`SELECT * FROM Persons WHERE id = ?`,[req.params.id],(err, result) => {
        if(err) throw err;
        res.json(result);
    });
});

app.post('/sql/api/employee/add', (req, res) => {
    // con.query(`INSERT INTO persons (name, gender, age) values('john','male',23)`, (err, result)=>{
    con.query(`INSERT INTO persons SET ?`,[req.body], (err, result) => {
        if(err) throw err;
        res.json(result);
    });
});
app.put('/sql/api/employee/update/:id', (req, res) => {
    con.query(`UPDATE persons SET ? WHERE id = ?`,[req.body, req.params.id], (err, result) => {
        if(err) throw err;
        res.json(result);
    });
});
app.delete('/sql/api/employee/delete/:id', (req, res) => {
    con.query(`DELETE FROM persons WHERE id = ?`,[req.params.id], (err, result) => {
        if(err) throw err;
        res.json(result);
    });
});

app.get('/mongodb/api/employee', async(req, res) => {
    try {
        let employee = await Employee.find();
        // let employee = await Employee.find({age: {$lte: 21}});
        // let employee = await Employee.aggregate([{$match:{age: {$gte: 18, $lte: 30}}}]);
        

        
    } catch (error) {
    console.log("ERROR", error)
        
    }
});
app.get('/mongodb/api/employee/:id', async(req, res) => {
    try {
        // this will write object inside array
        // let employee = await Employee.find({_id: req.params.id});

        // this will write object only and remove outer array brackets
        // let employee = await Employee.findOne({_id: req.params.id});
        // below method accepts both single value or object as a parameter and lookup in id field only, this method and findOne method will write single object and remove outer array brackets.
        let employee = await Employee.findById(req.params.id);
        res.send(employee); 
        
    } catch (error) {
    console.log("ERROR", error)
        
    }
});

app.post('/mongodb/api/employee/add', async(req, res) => {
    try {
        let employee = await Employee.create(req.body);
        res.send(employee);

    } catch (error) {
    console.log("ERROR", error);   
    }
});
app.put('/mongodb/api/employee/update/:id', async(req, res) => {
    try {
        let employee = await Employee.findByIdAndUpdate(req.params.id, req.body, {new: true});
        res.send(employee);

    } catch (error) {
    console.log("ERROR", error);   
    }
});
app.delete('/mongodb/api/employee/delete/:id', async(req, res) => {
    try {
        let employee = await Employee.findByIdAndDelete(req.params.id);
        res.send(employee);

    } catch (error) {
    console.log("ERROR", error);   
    }
});

app.listen(port, ()=>{
    console.log(`you are listening to port ${port}`);
});