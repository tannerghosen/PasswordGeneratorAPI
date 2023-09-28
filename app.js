/* Variables */
const express = require('express')
const app = express()
const port = 3000
const characters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890!@#$%^&*";
const defaultlength = 16;
const regex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,32}$/;

/* Functions */
app.get('/password', (req, res) =>
{
    var length = 16;
    if (req.query.length != null)
    {
        length = req.query.length;
    }
    switch(req.query.response)
    {
        case "XML":
        case "xml":
            var data = `<?xml version="1.0" encoding="UTF-8"?><password>` + GeneratePassword(characters, length) + `</password>`;
            res.header("Content-Type", "application/xml");
            res.status(200).send(data);
            break;
        case "JSON":
        case "json":
            res.json({
                password: GeneratePassword(characters, length)
            });
            break;
        default:
            res.send(GeneratePassword(characters, length));
            break;
    }
})

app.get('/validate', (req, res) =>
{
    if (req.query.password != null)
    {
        res.send(ValidatePassword(req.query.password));
    }
})

app.listen(port, () =>
{
    console.log(`Password Generator API App listening on port ${port}`)
})

function GeneratePassword(characterset = characters, length = defaultlength)
{
    var i = 0;
    var password = "";
    while (i < length)
    {
        password += characterset.charAt(Math.floor(Math.random() * characterset.length));
        i++;
    }
    return password;
}

function ValidatePassword(password)
{
    return !password.match(regex) ? "Sorry, this password isn't strong. A strong password should be a minimum of 8 characters but no longer than 32 and contain an uppercase, lowercase, digit, and special character and no excessive repeating characters." : "This password is good.";
}