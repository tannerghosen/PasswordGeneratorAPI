"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GeneratePassword = GeneratePassword;
exports.ValidatePassword = ValidatePassword;
/* Variables */
var settings = require("./settings.json");
var express = require('express');
var expressrl = require('express-rate-limit');
var app = express();
var port = 3000;
var characters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890!@#$%^&*";
var defaultlength = 16;
var regex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-])(?!.*(.)\1{5,}).{8,32}$/; // password check regex
var minutes = settings.minutes; // timeout duration
var requestlimit = settings.limit; // requests before timeout
var attemptlimit = settings.attempts; // password generator attempts before giving up
/* It checks for:
1 uppercase letter
1 lowercase letter
1 number
1 special character
should not repeat characters more than 5 times consecutively
8-32 characters in width
*/
/* Functions */
app.use(express.json());
app.use(expressrl.rateLimit({
    windowMs: minutes * 60 * 1000, // 15 minutes
    limit: requestlimit, // Limit each IP to 20 requests per 15 minutes
}));
// Allow CORS
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    next();
});
// POST /password (length)
app.post('/password', function (req, res) {
    // We get the requester's IP for logging purposes, via .ip or Node.js's .socket.remoteAddress, both of which are a string representations of the IP
    var ip = req.ip || req.socket.remoteAddress;
    console.log(ip + " on /password: starting...");
    // console.log("DEBUG: Length: " + req.body.length + " " + typeof req.body.length);
    var length = defaultlength;
    if (Number.isInteger(Number(req.body.length))) // if the length is not NaN and if it's a number OR it's null
     {
        length = req.body.length;
    }
    if (typeof req.body.length === "string") {
        if (!isNaN(parseInt(req.body.length, 10))) {
            length = parseInt(req.body.length, 10);
        }
        else {
            console.log("Length is a non-numeric string, setting it to default length");
            length = defaultlength;
        }
    }
    if (req.body.length == null || typeof req.body.length === "undefined") {
        console.log("Length is null / undefined, setting it to default length");
        length = defaultlength;
    }
    if (length < 8 || length > 32) {
        console.log("Length is bad, length provided is " + length + " (needs to be 8> or <32)");
        length = defaultlength;
    }
    console.log(ip + " on /password: success");
    //length = req.body.length ? req.body.length : length; // our length is changed to the requested length
    var pass = "", i = 0;
    while (DoesItMatchRegex(pass) == false && i <= attemptlimit) // while it doesn't match a password regex and is less than or equal to attempt limit
     {
        pass = GeneratePassword(length);
        i++;
    }
    // we create a json response
    return res.json({
        "data": {
            "password": pass // displayed as password: generatedpasswordgoeshere
        }
    });
});
// POST /validate (password)
app.post('/validate', function (req, res) {
    var ip = req.ip || req.socket.remoteAddress;
    console.log(ip + " on /validate: starting...");
    if (req.body.password != null) // if password is not null we can do stuff
     {
        console.log(ip + " on /validate: success");
        // we create a json response 
        return res.json({
            "data": {
                "validate": ValidatePassword(req.body.password) // displayed as validate: validationgoeshere
            }
        });
    }
    else // if it's null we let the user know
     {
        console.log(ip + " on /validate: error");
        return res.status(400).json({
            error: "ERROR: 'password' is missing in request body."
        });
    }
});
// GET /ping
app.get('/ping', function (req, res) {
    var ip = req.ip || req.socket.remoteAddress;
    console.log(ip + " is pinging");
    var timer = new Date().getTime();
    return res.json({
        ping: new Date().getTime() - timer + "ms"
    });
});
// App
app.listen(port, function () {
    if (process.env.NODE_ENV !== 'test')
        console.log("Password Generator API App listening on port ".concat(port));
});
// Main Functions
function GeneratePassword(length) {
    if (length === void 0) { length = defaultlength; }
    var password = "";
    for (var i = 0; i < length; i++) {
        // Floor(Random([0 , 1]) * character set's length)
        password += characters.toString().charAt(Math.floor(Math.random() * characters.length));
    }
    return password;
}
function ValidatePassword(password) {
    // if password does not match regex, say it isn't strong, otherwise it is.
    return !password.match(regex) ? "Sorry, this password isn't strong. A strong password should be a minimum of 8 characters but no longer than 32 and contain an uppercase, lowercase, digit, and special character and no excessive repeating characters." : "This password is strong.";
}
function DoesItMatchRegex(password) {
    return !password.match(regex) ? false : true;
}
