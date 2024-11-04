## API Documentation
This API expects all requests to be formatted as JSON strings.<br>

### password 
Endpoint: POST /password<br>
Request parameters: length (integer, passed in the request body, optional)<br>
Response type: JSON<br>
Response properties: data, which contains password (contains generated password)<br>
Responses:
1. A password of the desired length.
2. If length was null / undefined, a password with the default length of 16.
3. If length was NaN, a password with the default length of 16.
4. If length is less than 8 or greater than 32, a password with the default length of 16. This is to meet a regex criteria.

Request Example:
```
{
	"length": 12
}
```

Response Examples:<br>
Response:
```
{
    "data"
    {
        "password": "dh73&plA!s9q"
    }
}
```

### validate
Endpoint: POST /validate<br>
Request parameters: password (string, passed in request body, required)<br>
Response type: JSON<br>
Response properties: data, which contains validate (contains result of validation), or error (error that occured)<br>
Responses:
1. The password's strength after it's validated against a regex, either a. weak or b. strong.
2. If password was null or undefined, an error is sent back in the response, and no validation occurs.

Request Example:
```
{
	"validate": "dummypassword"
}
```

Response Examples:<br>
Successful (Strong) Response:
```
{
    "data":
    {
        "validate": "This password is strong."
    }
}
```
Successful (Weak) Response:
```
{
    "data":
    {
        "validate": "Sorry, this password isn't strong. A strong password should be a minimum of 8 characters but no longer than 32 and contain an uppercase, lowercase, digit, and special character and no excessive repeating characters.",
    }
}
```
Null Length Error Response:
```
{
    "error": "ERROR: 'password' is missing in request body."
}
```

### ping
Endpoint: GET /ping<br>
Request parameters: none<br>
Response type: JSON<br>
Response properties: ping (contains response time)<br>
Response: Response time between client and the API in ms

Response Example:<br>
```
{
    "ping": "30ms"
}
```