/* Variables */
const express = require('express')
const app = express()
const port = 3000
const characters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890!@#$%^&*";
const defaultlength = 16;
const regex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-])(?!.*(.)\1{5,}).{8,32}$/; // password check regex
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

// Allow CORS
app.use((req, res, next) =>
{
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

// POST /password (length)
app.post('/password', (req, res) =>
{
    // We get the requester's API for logging purposes, via x-forwarded-for or Node.js's socket.remoteAddress which is a string representation of the IP
    let ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
    let length = defaultlength;
    if ((!isNaN(req.body.length) && Number.isInteger(Number(req.body.length))) || req.body.length == null) // if the length is not NaN and if it's a number
    {
        console.log(ip + " on /password: success");
        length = req.body.length ? req.body.length : length; // our length is changed to the requested length
        // we create a json response
        return res.json({
            password: GeneratePassword(characters, length), // displayed as password: generatedpasswordgoeshere
            error: ""
        });
    }
    else // if our length is NaN, it's not the end of the world, we have a fallback
    {
        console.log(ip + " on /password: warning");
        return res.status(400).json({
            password: GeneratePassword(characters, length), 
            error: "WARNING: 'length' was NaN. Defaulting to 16."
        });
    }
})

// POST /validate (password)
app.post('/validate', (req, res) =>
{
    let ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
    if (req.body.password != null) // if password is not null we can do stuff
    {
        console.log(ip + " on /validate: success");
        // we create a json response 
        return res.json({
            validate: ValidatePassword(req.body.password), // displayed as validate: validationgoeshere
            error: ""
        });
    }
    else // if it's null we let the user know
    {
        console.log(ip + " on /validate: error");
        return res.status(400).json({
            validate: "",
            error: "ERROR: 'password' is missing in request body."
        });
    }
})

// App
app.listen(port, () =>
{
    console.log(`Password Generator API App listening on port ${port}`)
})

// Functions
function GeneratePassword(characterset = characters, length = defaultlength)
{
    let password = "";
    for (let i = 0; i < length; i++)
    {
                    // Floor(Random([0 , 1]) * character set's length)
        password += characterset.charAt(Math.floor(Math.random() * characterset.length));
    }
    return password;
}

function ValidatePassword(password)
{
    // if password does not match regex, say it isn't strong, otherwise it is.
    return !password.match(regex) ? "Sorry, this password isn't strong. A strong password should be a minimum of 8 characters but no longer than 32 and contain an uppercase, lowercase, digit, and special character and no excessive repeating characters." : "This password is strong.";
}