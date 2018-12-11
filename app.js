var express = require('express');
var app = express();
var fs = require("fs");
const body = require('body-parser')
const PORT = process.env.PORT || 3000;

app.use(body.json())

app.get('/getUser', function (req, res) {

    fs.readFile(__dirname + "/" + "db.json", 'UTF-8', function (err, data) {

        res.end(data);
    });
});

app.get('/getUser/:id', function (req, res) {
    fs.readFile(__dirname + "/" + "db.json", 'UTF-8', function (err, data) {
        var users = JSON.parse(data);
        for (i = 0; i < users["staffcoc"].length; i++) {
            //var user = users["staffcoc"][i][req.params.id];
            var data = users["staffcoc"][i];
            if (data.id == req.params.id) {
                res.end(JSON.stringify(data));
            }
        }
        //res.end(JSON.stringify(user));
    });
});
// var user ={
//     "staffcoc" : [
//         {
//                 "id": 1,
//                 "staffName": "Sinchai",
//                 "staffLastName": "Kamolphiwong",
//                 "position": "Assoc.Prof.Dr."            
//         }
//     ]
// }

app.post('/addUser', function (req, res) {
    fs.readFile(__dirname + "/" + "db.json", 'UTF-8', function (err, data) {
        data = JSON.parse(data);
        var sizeuser = data["staffcoc"].length;
        var userdata = {
            "id": sizeuser + 1,
            "staffName": req.body.staffName,
            "staffLastName": req.body.staffLastName,
            "position": req.body.position
        }
        data["staffcoc"].push(userdata)
        fs.writeFile(__dirname + "/" + "db.json", JSON.stringify(data), (err, data) => {
            console.log(data)
        })
    });
});

app.delete('/deleteUser/:index', function (req, res) {
    fs.readFile(__dirname + "/" + "db.json", 'UTF-8', function (err, data) {
        var users = JSON.parse(data);
        for (i = 0; i < users["staffcoc"].length; i++) {
            //var user = users["staffcoc"][i][req.params.id];
            var data = users["staffcoc"][i];
            if (data.id == req.params.index) {
                res.end(JSON.stringify(data));
            }
        }
        //res.end(JSON.stringify(user));
    });
});

var server = app.listen(PORT, function () {
    var host = server.address().address
    var port = server.address().port
    console.log("Application Run At http://%s:%s", host, port);
})