const inquirer = require("inquirer");
const fs = require("fs");
const Choices = require("inquirer/lib/objects/choices");

let buildPage = function (
  first,
  last,
  email,
  phoneNumber,
  badges,
  installation,
  languages,
  git,
  description,
  usage,
  projectTitle,
  repository,
  relativeLinkScreenshot
) {
  function buildList() {
    if (languages == null || languages.length == 0) return "";
    let listString = "";
    for (let item of languages) {
      listString += `• ${item}  \n`;
    }
    return `${listString}`;
  }
  function badge() {
    switch (badges) {
      case "Apache":
        return "[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)";
      case "MIT":
        return "[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)";
      case "IBM":
        return "[![License: IPL 1.0](https://img.shields.io/badge/License-IPL%201.0-blue.svg)](https://opensource.org/licenses/IPL-1.0)";
      case "Perl":
        "[![License: Artistic-2.0](https://img.shields.io/badge/License-Perl-0298c3.svg)](https://opensource.org/licenses/Artistic-2.0)";
    }
  }
  let page = `
  # ${projectTitle}.
  
## License
  ${badge()}

## Contents

• [Description](#description)
• [Usage](#usage)
• [Installation](#installation)
• [Languages](#languages)
• [License](#license)
• [Contributions](#contributions)
• [Test](#test)
• [Links](#links)
• [Questions](#questions)

## Description

${description}

### Usage

${usage}

### Installation

${installation}

### Languages

${buildList()}

### Test

## Links

### Link to the Deployed Application
[${projectTitle} Deployed Webpage](https://${git}.github.io/${repository}/)

### Link to the Github Repository

[${projectTitle} Github Repo](https://github.com/${git}/${repository}/)

### Screenshot of the Application
![Screenshot of the page](${relativeLinkScreenshot})

## Questions

You can reach out to me over one of the following for any questions about this application.

|Name|Email|Phone Numer|GitHubProfile|
|----|-----|-----------|-------------|
|${first} ${last}|${email}|${phoneNumber}|[${
    first + " " + last
  } Github Profile](https://github.com/${git}/)

      `;

  return page;
};

inquirer
  .prompt([
    {
      type: "input",
      message: "What is your first name?",
      name: "firstName",
    },
    {
      type: "input",
      message: "What is your last name?",
      name: "lastName",
    },
    {
      type: "input",
      message: "What is your phone number?",
      name: "phoneNumber",
    },
    {
      type: "input",
      message: "What is your email address?",
      name: "email",
    },
    {
      type: "input",
      message: "What is your project title?",
      name: "title",
    },
    {
      type: "input",
      message: "What is the repository's name?",
      name: "repository",
    },
    {
      type: "input",
      message: "Describe your project here.",
      name: "description",
    },
    {
      type: "input",
      message: "Please enter usage information for the project.",
      name: "usage",
    },
    {
      type: "checkbox",
      message: "What technologies do you use?",
      choices: [
        "HTML",
        "CSS",
        "JavaScript",
        "JQuery",
        "NodeJS",
        "AngularJS",
        "React",
        "MongoDB",
        "Third Parties APIs",
      ],
      name: "languages",
    },
    {
      type: "input",
      message: "What is your GitHub user name?",
      name: "git",
    },
    {
      type: "list",
      message: "Please choose your license: ",
      name: "license",
      choices: ["Apache", "IBM", "MIT", "Perl"],
    },
    {
      type: "input",
      message: "Please provide installation instructions: ",
      name: "installation",
    },
    {
      type: "input",
      message: "Enter the relative link for the application's screenshot ",
      name: "relativeLinkScreenshot",
    },
  ])
  .then((response) => {
    console.log(response);
    fs.writeFile(
      `./README.md`,
      buildPage(
        response.firstName,
        response.lastName,
        response.email,
        response.phoneNumber,
        response.license,
        response.installation,
        response.languages,
        response.githubHandle,
        response.description,
        response.usage,
        response.title,
        response.repository,
        response.relativeLinkScreenshot
      ),
      (err) => {
        if (err) console.error(err);
      }
    );
  });
