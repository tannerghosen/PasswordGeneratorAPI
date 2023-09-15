/* Variables */
const express = require('express')
const app = express()
const port = 3000
const characters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890!@#$%^&*";
const defaultlength = 16;

/* Functions */
app.get('/password', (req, res) => {
    var length;
    if (req.query.length != null)
    {
        length = req.query.length;
        res.send(GeneratePassword(characters,length));
    }
    else
    {
        res.send(GeneratePassword());
    }
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

function GeneratePassword(characterset = characters, length = defaultlength) {
    var i = 0;
    var password = "";
    while (i < length) {
        password += characterset.charAt(Math.floor(Math.random() * characterset.length));
        i++;
    }
    return password;
}