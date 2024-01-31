/* Variables */
const express = require('express')
const app = express()
const port = 3000
const characters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890!@#$%^&*";
const defaultlength = 16;
const regex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,32}$/; // password check regex

/* Functions */
app.use(express.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

app.post('/password', (req, res) =>
{
    let length = defaultlength;
    if (req.body.length != null)
    {
        if (!isNaN(req.body.length) && Number.isInteger(Number(req.body.length)))
        {
            length = req.body.length;
        }
    }
    switch (req.body.response)
    {
        // response types: XML/xml, JSON/json
        /*case "XML":
        case "xml":
            let data = `<?xml version="1.0" encoding="UTF-8"?><password>` + GeneratePassword(characters, length) + `</password>`;
            res.header("Content-Type", "application/xml");
            res.status(200).send(data);
            break;*/
        case "JSON":
        case "json":
            try
            {
                res.status(200).json({
                    password: GeneratePassword(characters, length)
                });
            }
            catch (error)
            {
                console.error(error);
                res.status(500).send("An error occured during password generation");
            }
            break;
        default:
            res.status(400).send("Invalid response type defined.");
            break;
    }
})

app.post('/validate', (req, res) =>
{
    if (req.body.password != null)
    {
        switch (req.body.response)
        {
            // response types: XML/xml, JSON/json
           /* case "XML":
            case "xml":
                let data = `<?xml version="1.0" encoding="UTF-8"?><validate>` + ValidatePassword(req.body.password) + `</validate>`;
                res.header("Content-Type", "application/xml");
                res.status(200).send(data);
                break; */
            case "JSON":
            case "json":
                res.json({
                    validate: ValidatePassword(req.body.password)
                });
                break;
            default:
                res.status(400).send("Invalid response type defined.");
                break;
        }
    }
    else
    {
        res.status(400).send("Password is missing.");
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