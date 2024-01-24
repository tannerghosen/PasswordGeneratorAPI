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
It can generate random passwords of specified length (or a default of 16) in multiple formats (plaintext, json or xml, depending on your use of the API) and has a 
password strength function as an extra bonus.

## How can I run it?
You can either run it through Visual Studio 2019 through 2022 (perhaps even earlier, I'm not 100% sure) using Node.js developer tools, or Node.js itself. You will need
Express.js installed for the latter globally.<br>
For Visual Studio, simply clone this project from GitHub and run the program in Visual Studio.<br>
For Node.js, open up command prompt and cd to the project folder. Then, type node app.js when you're located inside the project folder.<br>
In either case, it will run by default on localhost on port 3000, though this can be changed in app.js.
After that, open a web browser and go to localhost:3000.<br>
The commands for the API are as follows:<br>
/password - Generates a password. Has a length query parameter (which determines password length) and a response query parameter (which determines response type,
either XML or JSON)<br>
/validate - Validates a password against a regex to determine if it's strong or not based on a few criterias. Has a a password query parameter
(which is the password you wish to validate) and a response query parameter (which determines response type, either XML or JSON)