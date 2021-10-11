# Popup-Prompt

![npm](https://img.shields.io/npm/v/popup-prompt?color=red&label=npm&logo=version&logoColor=grey)
![npm](https://img.shields.io/npm/dt/popup-prompt?color=orange&label=downloads&logo=downloads&logoColor=grey)
![NPM](https://img.shields.io/npm/l/popup-prompt?color=green&label=license&logo=licenseName&logoColor=grey)
![npm type definitions](https://img.shields.io/npm/types/popup-prompt?color=blue&label=types&logo=typeDefinitions&logoColor=grey)

> Show popup and prompt windows to your users.

## PowerShell Needed

Please make sure that you have PowerShell 5.1 installed on your device, so that the popups and prompts show up without any disruption.

On Windows devices, it should come pre-installed. However, on MacOS and Linux, you may need to download it at [this website](https://docs.microsoft.com/en-us/powershell/scripting/install/installing-powershell?view=powershell-5.1).

_Note: The PowerShell version may change at anytime in the future._

**Important Note: Make sure your computer is supported for PowerShell at [this website](https://docs.microsoft.com/en-us/powershell/scripting/install/installing-powershell?view=powershell-5.1).**

## Installation

To install, simply type the following command in your terminal/command prompt (making sure you have Node.js installed).

```
$ npm install popup-prompt
```

Then, when it is successfully installed, and the `node_modules` folder shows up, type the following in your JavaScript file.

```js
const popup = require("popup-prompt");
```

And that's it!

## Functionality

Below is a table of all of the constants and methods available in the `popup-prompt` package.

**Table coming soon!**

## Usage

There are currently two methods, and two constants available. They will be shown below.

### Constant: `VERSION`

This constant simply shows the current version of the package.

**Warning: This may be out-of-date at times. Please make a [new Issue](https://github.com/arnavthorat78/Popup-Prompt/issues) for this.**

To log it (with the `popup` variable) to the console, simple run the following code. It should show the current version as a string.

```js
console.log(popup.VERSION);
```

### Constant: AVAILABLE_VALUES

`AVAILABLE_VALUES` shows the available values for the methods, since PowerShell has limited values for specific parameters.
If you get stuck on what values are available, you can simply `console.log` it, and see an object with each method.

You may be a bit stuck on what `AVAILABLE_VALUES` prints out, so let's do it _now_!

In JavaScript:

```js
console.log(popup.AVAILABLE_VALUES);
```

Which then outputs...

```
{
    showMessageBox: {
        title: [],
        message: [],
        type: [ "OK", "OKCancel", "YesNo", "YesNoCancel" ],
        picture: [
            "Asterisk",    "Error",
            "Exclamation", "Hand",
            "Information", "None",
            "Question",    "Stop",
            "Warning"
        ],
        defaultOption: [ "Cancel", "No", "None", "OK", "Yes" ]
    },
    showPrompt: { title: [], message: [], defaultValue: [] }
}
```

Just a quick side note on this output: when the value of a parameter (e.g. `showPrompt.title`) is an empty array (`[]`), then it means that there are no default parameters; they can be anything!
