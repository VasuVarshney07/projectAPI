const bodyParser = require('body-parser');
const express = require('express');
const request = require('request');

const app = express();
const https = require('https');
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', function(req, res){
    res.sendFile(__dirname + "/signuppage.html");
});

app.post("/", function(req, res){
    var lname = req.body.lname;
    var email = req.body.email;
    var fname = req.body.fname;
    console.log(lname + " " + email + " " + fname);
    var data = {
        members: [
            {
                email_address: email,
                status: "subscribed",
                merge_fields: {
                    FNAME: fname,
                    LNAME: lname
                }
            }
        ]
    };
    var Jsondata = JSON.stringify(data);
    const url = "https://us17.api.mailchimp.com/3.0/lists/89fcfa4515";
    const options = {
        method: 'POST',
        auth: "vasu:9ea35aecb5c29499c29f350298c7132f-us17"
    };

    const request = https.request(url, options, function(response){

        if(response.statusCode === 200){
            res.sendFile(__dirname + "/sucesspage.html");
        }
        else{
            res.sendFile(__dirname + "/errorpage.html");
        }

        response.on('data', function(data){
            console.log(JSON.parse(data));
        });
    });

    request.write(Jsondata); // Placed inside the callback
    request.end(); // Placed inside the callback
});
app.post('/failure', function(req, res) {
     res.redirect("/");

});
app.listen(process.env.PORT || 3000, function(){
    console.log("server is running");
});



// Api key -- 9ea35aecb5c29499c29f350298c7132f-us17

// audience -- 89fcfa4515