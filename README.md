# Password Generator API
By Tanner Ghosen

<b>Requirements:</b>
<ul>
<li>Visual Studio 2019-2022 with Node.js OR Node.js standalone</li>
<li>Express.js</li>
</ul>

# Summary
## What is this program and how was it made?
This is a password generator API that runs using JavaScript through Node.js and the Express.js back-end framework. 
It can generate random passwords of specified length (or a default of 16) in multiple formats (JSON only at the moment<!-- or XML -->, depending on your use of the API) and has a 
password validation function as an extra bonus.

## How can I run it?
You can either run it through Visual Studio 2019 through 2022 (perhaps even earlier, I'm not 100% sure) using Node.js developer tools, or Node.js itself. You will need
Express.js installed for the latter globally.<br>
For Visual Studio, simply clone this project from GitHub and run the program in Visual Studio.<br>
For Node.js, open up command prompt and cd to the project folder. Then, type node app.js when you're located inside the project folder.<br>
In either case, it will run by default on localhost on port 3000, though this can be changed in app.js.
After that, open a web browser and go to localhost:3000.<br>

## API Documentation
This API expects all requests to be formatted as JSON strings.<br>
Since this API deals with passwords it's recommended this it's ran on a server using HTTPS.

### password 
Endpoint: POST /password
Request parameters: length (integer, passed in the request body, optional)
Response type: JSON
Response properties: password (contains generated password), warning (contains warning), error (contains error)
Responses:
1. A password of the desired length.
2. If length was null, the default length of 16 is used.
3. If length was NaN, the default length of 16 is used and a warning is mentioned in the response.

Request Example:
```
{
	"length": 12
}
```

Response Examples:
Successful Response:
```
{
    "password": "dh73&plA!s9q",
    "warning": null,
    "error": null
}
```
NaN Length Warning Response:
```
{
    "password": "sF@l1Szq89",
    "warning": "WARNING: 'length' was NaN. Defaulting to 16.",
    "error": null
}
```

### validate
Endpoint: POST /validate
Request parameters: password (string, passed in request body, required)
Response type: JSON
Response properties: validate (contains result of validation), error (contains error)
Responses:
1. The password's strength after it's validated against a regex, either a. weak or b. strong.
2. If password was null, an error is sent back in the response, and no validation occurs.

Request Example:
```
{
	"validate": "dummypassword"
}
```

Response Examples:
Successful (Strong) Response:
```
{
    "validate": "This password is strong.",
    "error": null
}
```
Successful (Weak) Response:
```
{
    "validate": "Sorry, this password isn't strong. A strong password should be a minimum of 8 characters but no longer than 32 and contain an uppercase, lowercase, digit, and special character and no excessive repeating characters.",
    "error": null
}
```
Null Length Error Response:
```
{
    "validate": "",
    "error": "ERROR: 'password' is missing in request body."
}
```