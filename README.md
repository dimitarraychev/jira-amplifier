# Jira Amplifier

**A browser extension designed to streamline tasks for Helpdesk dispatchers in Jira.**

![Extension Screenshot](https://github.com/dimitarraychev/jira-amplifier/raw/main/src/assets/preview.png)

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

Jira Amplifier is a Chrome extension designed to enhance the workflow of Helpdesk dispatchers using Jira. It simplifies the process of distinguishing between English and German tickets, while also highlighting tickets assigned to the Layer 2 team, making task management more efficient. Additionally, the extension can remove distracting announcement banners from the top of the page, keeping your workspace clutter-free.

## Features

- Language Detection: Checks if tickets are opened by a English or German user and highlights the title accordingly with colored [EN] and [DE] tags.
- Layer 2 Team Tags: Adds a [L2] tag in front of layer 2 agents' names.
- Remove Banner: Removes announcement banners from the top.

## Installation

You can manually load the extension:

1. Clone or download this repository.
2. Open Chrome and go to `chrome://extensions/`.
3. Enable "Developer mode" (toggle in the upper right).
4. Click "Load unpacked" and select the directory where the extension is located.

## Usage

1. After installation, the extension is available in the extensions menu.
2. You can pin the extension to your browser for easy access.
3. The extensions popup contain different toggles for each corresponding functionality.

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
