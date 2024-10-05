# Password Generator API
By Tanner Ghosen

<b>Requirements:</b>
<ul>
<li>Visual Studio 2019-2022 with Node.js OR Visual Studio Code with Node.js OR Node.js standalone</li>
<li>Express.js</li>
<li>Jest</li>
<li><a href="https://www.npmjs.com/package/express-rate-limit?activeTab=readme">express-rate-limit</a></li>
<li><a href="https://kulshekhar.github.io/ts-jest/">ts-jest</a></li>
</ul>

# Summary
## What is this?
This is a password generator API that runs using TypeScript through Node.js and the Express.js back-end framework.
It is the successor of the JavaScript one I created.
It can generate random passwords of specified length (or a default of 16) and has a 
password validation function as an extra bonus. It expects a JSON request and will send back a JSON response.

## How can I run it?
You can either run it through Visual Studio 2019 through 2022 (potentially earlier) using Node.js developer tools, or VS Code with Node.js installed, or Node.js itself.<br>
For Visual Studio, in the virtual terminal type npm install to install dependencies then npm start or launch the program manually in the IDE to launch it.<br>
For VS Code, in the virtual terminal type npm install to install dependencies then npm start to launch it.<br>
For Node.js, open up command prompt and cd to the project folder. Then, type npm install to install dependencies then npm start when you're located inside the project folder.<br>
In any of the above cases, to clean it you will need to use npm run clean, though it cleans itself on npm run build. You can use npm run test to run Jest tests.
In any case, the program will launch on localhost on port 3000, though this can be altered in app.ts.
After that, you can POST requests to it to generate and validate passwords, as well as GET request it for ping. More info is in the documentation listed below.<br>
Due to the sensitive nature of the content this API deals with, it is highly recommended to run it on a HTTPS server. <br>

## How do I use it?
For more specific information on how to use the API, please refer to the [API Documentation](DOCUMENTATION.md).