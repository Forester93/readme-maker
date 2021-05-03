// get important packages

const inquirer = require("inquirer");
const fs = require("fs");
const Choices = require("inquirer/lib/objects/choices");

// to build the body of the readme file
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
  relativeLinkScreenshot,
  test,
  contributing
) {
  //list of technologies used
  function buildList() {
    if (languages == null || languages.length == 0) return "";
    let listString = "";
    for (let item of languages) {
      listString += `• ${item}  \n`;
    }
    return `${listString}`;
  }
  //license
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
  //screenshot link
  function screenshot() {
    if (relativeLinkScreenshot == "") {
      return "";
    } else {
      return `### Screenshot of the Application\n![Screenshot of the page](${relativeLinkScreenshot})`;
    }
  }
  let page = `
  # ${projectTitle}.
  
## License
  ${badge()}

## Contents

• [License](#license)
• [Description](#description)
• [Usage](#usage)
• [Installation](#installation)
• [Technologies](#technologies)
• [Test](#test)
• [Links](#links)
• [Questions](#questions)
• [Contributing](#contributing)

## Description

${description}

### Usage

To run the application you need to run the following command line:

\`\`\`
${usage}
\`\`\`

### Installation

To install the application you need to run the following command line:

\`\`\`bash
${installation}
\`\`\`

### Technologies

${buildList()}

### Test

To test the application you need to run the following command line:

\`\`\`bash
${test}
\`\`\`

## Links

### Link to the Deployed Application
[${projectTitle} Deployed Webpage](https://${git}.github.io/${repository}/)

### Link to the Github Repository

[${projectTitle} Github Repo](https://github.com/${git}/${repository}/)

${screenshot()}

## Questions

You can reach out to me over one of the following for any questions about this application.

|Name|Email|Phone Numer|GitHubProfile|
|----|-----|-----------|-------------|
|${first} ${last}|${email}|${phoneNumber}|[${
    first + " " + last
  } Github Profile](https://github.com/${git}/)


## Contributing

${contributing}

      `;

  return page;
};

//getting the required information from the user
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
      message: "What technologies did you use?",
      choices: [
        "HTML",
        "CSS",
        "JavaScript",
        "JQuery",
        "NodeJS",
        "AngularJS",
        "React",
        "MongoDB",
        "Third-party APIs",
        "Others",
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
      message: "What is the command line required to install your application?",
      name: "installation",
    },
    {
      type: "input",
      message: "What is the command line required to test your application ?",
      name: "test",
    },
    {
      type: "input",
      message: "Enter the relative link for the application's screenshot: ",
      name: "relativeLinkScreenshot",
    },
    {
      type: "input",
      message:
        "Enter the relative link for the application's screenshot (Leave blank if inapplicable): ",
      name: "relativeLinkScreenshot",
    },
    {
      type: "input",
      message: "How can one contribute to this project?",
      name: "contributing",
    },
  ])
  .then((response) => {
    fs.writeFile(
      //writing the README.md file
      `./README.md`,
      buildPage(
        response.firstName,
        response.lastName,
        response.email,
        response.phoneNumber,
        response.license,
        response.installation,
        response.languages,
        response.git,
        response.description,
        response.usage,
        response.title,
        response.repository,
        response.relativeLinkScreenshot,
        response.test,
        response.contributing
      ),
      (err) => {
        if (err) console.error(err);
      }
    );
    console.log("Markdown File Generated Successfully"); //success prompt
  }) //catching errors
  .catch((err) => {
    console.log("Something went wrong\n");
    console.error(err);
  });
