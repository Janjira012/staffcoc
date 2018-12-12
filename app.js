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

app.delete('/delUser/:index', function (req, res) {
    fs.readFile(__dirname + "/" + "db.json", 'UTF-8', function (err, data) {
        var users = JSON.parse(data);
        // console.log(users["staffcoc"]);
        for (i = 0; i < users["staffcoc"].length; i++) {

            var data = users["staffcoc"][i];
            if (data.id == req.params.index) {
                console.log(data.staffName);
                users["staffcoc"].splice(i, 1); 
                res.end(JSON.stringify(data)); 
                // delete data.id;
                // var removeUser = "test2";
                // var data = fs.readFileSync('results.json');
                // var json = JSON.parse(data);
                var user = users.staffcoc;
                users.user = user.filter((data) => { return data.id !== req.params.index });
                fs.writeFile(__dirname + "/" + "db.json", JSON.stringify(users, null, 2), (err,data) => {
                        // console.log(data)
                 });
                // delete data.id;
                
                
                // fs.writeFileSync(__dirname + "/" + "db.json", JSON.stringify(json, null, data.id));

                // json.users = users.filter((user) => { return user.username !== removeUser });
                // fs.writeFileSync('results.json', JSON.stringify(json, null, 2));
                // fs.writeFile(__dirname + "/" + "db.json", JSON.stringify(data.id), (err,data) => {
                //     console.log(data)
                // });
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