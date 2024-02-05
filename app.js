/* Variables */
const express = require('express')
const app = express()
const port = 3000
const characters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890!@#$%^&*";
const defaultlength = 16;
const regex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,32}$/; // password check regex

/* Functions */
app.use(express.json());

// Allow CORS
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

app.post('/password', (req, res) =>
{
    let length = defaultlength;
    if (req.body.length != null) // if length is not null we can do stuff
    {
        if (!isNaN(req.body.length) && Number.isInteger(Number(req.body.length)))
        {
            length = req.body.length;
        }
        res.json({
            password: GeneratePassword(characters, length)
        });
    }
    else
    {
        res.status(400).send("ERROR: 'length' is missing in request body.");
    }
})

app.post('/validate', (req, res) =>
{
    if (req.body.password != null) // if password is not null we can do stuff
    {
        res.json({
            validate: ValidatePassword(req.body.password)
        });
    }
    else
    {
        res.status(400).send("ERROR: 'password' is missing in request body.");
    }
})

app.listen(port, () =>
{
    console.log(`Password Generator API App listening on port ${port}`)
})

function GeneratePassword(characterset = characters, length = defaultlength)
{
    let i = 0;
    let password = "";
    while (i < length)
    {
        password += characterset.charAt(Math.floor(Math.random() * characterset.length));
        i++;
    }
    return password;
}

function ValidatePassword(password)
{
    // if password does not match regex, say it isn't strong, otherwise it is.
    return !password.match(regex) ? "Sorry, this password isn't strong. A strong password should be a minimum of 8 characters but no longer than 32 and contain an uppercase, lowercase, digit, and special character and no excessive repeating characters." : "This password is strong.";
}