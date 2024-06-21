# Gemini API Caller Chrome Extension

## Overview

The **Gemini API Caller** Chrome extension allows users to interact with the Gemini API to generate content based on selected text or the entire body text of the current webpage. Users can save their Gemini API key and a system instruction for customized API calls.

## Features

- **API Key Management**: Save and edit the Gemini API key and system instruction.
- **Text Extraction**: Extract selected text or the entire body text from the current webpage.
- **API Calls**: Send the extracted text to the Gemini API and display the generated content.

## Installation

1. Clone this repository or download the zip file and extract it.
2. Open Chrome and navigate to `chrome://extensions/`.
3. Enable "Developer mode" by toggling the switch in the top right corner.
4. Click on "Load unpacked" and select the directory where you downloaded or extracted the extension.

## Usage

1. Click on the extension icon to open the popup.
2. If you haven't set your Gemini API key and system instruction:
   - Enter your Gemini API key in the "Gemini Key" input field.
   - Enter your desired system instruction in the "System Instruction" text area.
   - Click the "Save" button to store these values.
3. The extension will automatically extract text from the current webpage and display the generated content in the popup.
4. To edit your Gemini API key and system instruction, click the "Edit Gemini Key and System Instruction" button.

## File Structure

- `background.js`: Handles background tasks, including the API call to Gemini and message passing between the content script and the popup.
- `manifest.json`: Defines the extension's metadata and permissions.
- `popup.css`: Contains styles for the popup UI.
- `popup.html`: The HTML structure of the popup interface.
- `popup.js`: Handles the logic for the popup, including saving API keys, extracting text, and displaying responses.

## Development

### Setup

1. Clone the repository:
git clone https://github.com/wolkesau/gemini-api-caller.git
cd gemini-api-caller

2. use chrome extension developer mode to load files.

## Contributing

Feel free to fork this project, submit issues, and send pull requests. Contributions are welcome!

## Contact

For any questions or suggestions, please reach out to `wolkesau@gmail.com`.
