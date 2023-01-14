const bodyParser = require("body-parser");
const express = require("express");
var path = require("path");
const port = 3000;
const mysql = require("./Connection").con;

const app = express();

// app.set('view engines','hbs');
// app.set('views','./view');
// app.set('view engine', 'html');

app.set('views', path.join(__dirname, 'view'));
app.set('view engine', 'hbs');


app.use(express.static(__dirname + "/public"));

app.get("/", (req, res) => {

    console.log("In the index section for the web page");

    res.render("index");

});

app.get("/add", (req, res) => {
    res.render("add");
})

app.get("/delete",(req,res)=>{
    res.render("delete");
})

app.get("/update",(req,res)=>{
    res.render("update");
})

app.get("/search", (req, res) => {
    res.render("search")

});

app.get("/addemployee", (req, res) => {
    const { emp_id, emp_name, address,DOJ, salary } = req.query;
    let qry = "select * from employee where emp_id=?";
    mysql.query(qry, [emp_id], (err, results) => {
        if (err)
            throw err;
        else {
            if (results.length > 0) {
                res.render("add", { checkmesg:true});
            } else {
                let qry2 = "insert into employee values(?,?,?,?,?,?,?)";
                mysql.query(qry2, [emp_id, emp_name, address,DOJ, salary], (err, results) => {
                    if (results.affectedRows > 0) {
                        res.render("add", { mesg: true });
                    }
            })
        }
    }
})});

app.get("/deletebyid",(req,res)=>{
    const{ emp_id}=req.query;

    let qry="delete from employee where emp_id=?";
    mysql.query(qry,[emp_id],(err,results) =>{
        res.render("delete");
    })
})

app.get("/updatebyid",(req,res)=>{
    const {player_id}=req.query;
    let qry="select * from employee where emp_id=?";

    mysql.query(qry,[emp_id],(err,results)=>{
        res.render("update",{data:results});
    })

})

app.get("/updateemployee",(req,res)=>{
    const { emp_id, emp_name, address,DOJ, salary } = req.query;
    let qry="update employee set address=?,emp_name=?,DOJ=? where emp_id=?";

    mysql.query(qry,[city,player_name,player_id],(err,results)=>{
        res.render("update",{mesg:true});
    })
})

// app.get("/add",(req,resp)=>{
//     resp.render("add");
// })




app.get("/view", (req, res) => {
    let qry = "select * from employee ";
    mysql.query(qry, (err, results) => {
        if (err) throw err
        else {
            res.render("view", { data: results });
        }

    });

});


app.get("/searchplayer", (req, res) => {



    const { player_id } = req.query;

    let qry = "select * from player where player_id=?";
    mysql.query(qry, [player_id], (err, results) => {
        if (err) throw err
        else {
            if (results.length > 0) {
                res.render("search", { mesg1: true, mesg2: false, data: results });
            } else {

                res.render("search", { mesg1: false, mesg2: true })

            }

        }
    });
})

app.listen(port, (err) => {
    if (err)
        throw err
    else
        console.log("Server is running at port %d:", port);
});