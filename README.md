# Jira Amplifier

**A chrome extension developed to assist Helpdesk dispatchers in Jira.**

![Extension Screenshot](https://drive.google.com/uc?id=1h-SuTZxpiSMIw83FoHm1GsvxI2Zla6Ad)

## Table of Contents

1. [Introduction](#introduction)
2. [Features](#features)
3. [Installation](#installation)
4. [Usage](#usage)
5. [Permissions](#permissions)
6. [Contributing](#contributing)
7. [Support](#support)
8. [License](#license)

## Introduction

Jira Amplifier is a Chrome extension developed to assist Helpdesk dispatchers in Jira in their daily tasks by making it easier to differentiate between English and German tickets. There's also a feature for highlighting tickets assigned to the layer 2 team.

## Features

- Language Detection: Checks if tickets are opened by a English or German user and highlights the title accordingly with colored tags.
- Layer 2 Team Tags: Checks if the tickets are currently assigned to layer 2 agents and adds a tag to their name.

## Installation

You can manually load the extension:

1. Clone or download this repository.
2. Open Chrome and go to `chrome://extensions/`.
3. Enable "Developer mode" (toggle in the upper right).
4. Click "Load unpacked" and select the directory where the extension is located.

## Usage

1. After installation, the extension is available in the extensions menu.
2. You can pin the extension to your browser for easy access.
3. THe extensions popup contain different toggles for each corresponding functionality.

## Permissions

This extension requires the following permissions:

- `currentTab`: Access to the currrent tab is required to perform tasks on different DOM elements.
- `storage`: Used to save the users preferences.

## Contributing

Contributions are welcome! To contribute:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Make your changes and commit them (`git commit -m 'Add some feature'`).
4. Push to the branch (`git push origin feature-branch`).
5. Open a pull request.

## Support

If you encounter any issues or have questions, please open an issue on the [GitHub repository](https://github.com/dimitarraychev/jira-amplifier) or contact [draytchev@gmail.com].

## License

This project is licensed under the MIT License - see the LICENSE file for details.
