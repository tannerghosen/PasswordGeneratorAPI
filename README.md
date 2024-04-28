# Password Generator API
By Tanner Ghosen

<b>Requirements:</b>
<ul>
<li>Visual Studio 2019-2022 with Node.js OR Node.js standalone</li>
<li>Express.js</li>
</ul>

# Summary
## What is this API?
This is a password generator API that runs using JavaScript through Node.js and the Express.js back-end framework. 
It can generate random passwords of specified length (or a default of 16) and has a 
password validation function as an extra bonus. It expects a JSON request and will send back a JSON response.

## How can I run it?
You can either run it through Visual Studio 2019 through 2022 (perhaps even earlier, I'm not 100% sure) using Node.js developer tools, or Node.js itself. You will need
Express.js installed for the latter globally.<br>
For Visual Studio, simply clone this project from GitHub and run the program in Visual Studio.<br>
For Node.js, open up command prompt and cd to the project folder. Then, type node app.js when you're located inside the project folder.<br>
In either case, it will run by default on localhost on port 3000, though this can be changed in app.js.
After that, open a web browser and go to localhost:3000.<br>
Due to the sensitive nature of the content this API deals with, it is highly recommended to run it on a HTTPS server. <br>

## How do I use it?
For more specific information on how to use the API, please refer to the [API Documentation](DOCUMENTATION.md).