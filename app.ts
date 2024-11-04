/* Variables */
import * as settings from './settings.json';
const express = require('express')
const expressrl = require('express-rate-limit');
const app = express();
const port : number = 3000;
const characters : String = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890!@#$%^&*";
const defaultlength : number = 16;
const regex: RegExp = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-])(?!.*(.)\1{5,}).{8,32}$/; // password check regex
const minutes = settings.minutes; // timeout duration
const requestlimit = settings.limit; // requests before timeout
const attemptlimit = settings.attempts; // password generator attempts before giving up

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
app.use((req : any, res : any, next : any) =>
{
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

// POST /password (length)
app.post('/password', (req : any, res : any) =>
{
    // We get the requester's IP for logging purposes, via .ip or Node.js's .socket.remoteAddress, both of which are a string representations of the IP
    let ip : any = req.ip || req.socket.remoteAddress;
    let length : number = defaultlength;
    if ((!isNaN(req.body.length) && Number.isInteger(Number(req.body.length))) || req.body.length == null) // if the length is not NaN and if it's a number OR it's null
    {
        // set length to req.body.length parsed to an Integer if it's not null, otherwise set it to length (defaultlength)
        length = req.body.length ? parseInt(req.body.length, 10) : length
    }
    console.log(length);
    console.log(ip + " on /password: success");
    //length = req.body.length ? req.body.length : length; // our length is changed to the requested length
    if (length < 8 || length > 32)
    {
        console.log("Length is not great: " + length);
        length = defaultlength;
    }
    let pass : string = "", i = 0;
    while (DoesItMatchRegex(pass) == false)
    {
        if (i >= attemptlimit)
            break;
        pass = GeneratePassword(length);
        i++;
    }
    // we create a json response
    return res.json({
        "data":
        {
            "password": pass // displayed as password: generatedpasswordgoeshere
        }
    });
})

// POST /validate (password)
app.post('/validate', (req : any, res : any) =>
{
    let ip : any = req.ip || req.socket.remoteAddress;
    if (req.body.password != null) // if password is not null we can do stuff
    {
        console.log(ip + " on /validate: success");
        // we create a json response 
        return res.json({
            "data":
            {
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
})

// GET /ping
app.get('/ping', (req : any, res : any) =>
{
    let ip : any = req.ip || req.socket.remoteAddress;
    console.log(ip + " is pinging");
    let timer = new Date().getTime();
    return res.json({
        ping: new Date().getTime() - timer + "ms"
    });
});

// App
app.listen(port, () =>
{
    if(process.env.NODE_ENV !== 'test')
        console.log(`Password Generator API App listening on port ${port}`)
})

// Main Functions
export function GeneratePassword(length: number = defaultlength)
{
    let password : string = "";
    for (let i: number = 0; i < length; i++)
    {
        // Floor(Random([0 , 1]) * character set's length)
        password += characters.toString().charAt(Math.floor(Math.random() * characters.length));
    }
    return password;
}

export function ValidatePassword(password: string)
{
    // if password does not match regex, say it isn't strong, otherwise it is.
    return !password.match(regex) ? "Sorry, this password isn't strong. A strong password should be a minimum of 8 characters but no longer than 32 and contain an uppercase, lowercase, digit, and special character and no excessive repeating characters." : "This password is strong.";
}

function DoesItMatchRegex(password: string)
{
    return !password.match(regex) ? false : true;
}