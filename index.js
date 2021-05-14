//Dependencies and variables that are provided by npm install
const inquirer = require("inquirer");
const fs = require("fs");
const util = require("util");
const generateMarkdown = require("./utils/generateMarkdown");
const writeFileAsync = util.promisify(fs.writeFile);
// Questions asked to the user
function promptUser() {
  return inquirer.prompt([
    {
      type: "input",
      message: "What is the title for your project?",
      name: "projectTitle",
    },
    {
      type: "input",
      message: "Write a description of your project:",
      name: "description",
    },
    {
      type: "input",
      message: "Describe the installation process if any:",
      name: "installation",
    },
    {
      type: "input",
      message: "Please provide information usage for your project:",
      name: "usage",
    },
    {
      type: "list",
      message: "What license was used for this README?",
      name: "license",
      choices: [
        "None",
        "Apache License 2.0",
        "GNU General Public License v3.0",
        "MIT License",
        "BSD 2-Clause Simplified License",
        "BSD 3-Clause New or Revised License",
        "Boost Software License 1.0",
      ],
    },
    {
      type: "input",
      message: "Please advise any contributions you have made:",
      name: "contributions",
    },
    {
      type: "input",
      message: "Please advise your test opporation performed for your project:",
      name: "tests",
    },
    {
      type: "input",
      message: "What is your GitHub username?",
      name: "username",
    },
    {
      type: "input",
      message: "What is your email address?",
      name: "email",
    },
  ]);
}
//Async function uses util.promisify
async function init() {
  try {
    // Ask user questions and generate responses
    const answers = await promptUser();
    const generateContent = generateMarkdown(answers);
    // Write new README.md to dist directory
    await writeFileAsync("./dist/README.md", generateContent);
    console.log("✔️  Successfully wrote to README.md");
  } catch (err) {
    console.log(err);
  }
}

// Function call to initialize app
init();
