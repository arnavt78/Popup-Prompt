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

### Constant: `AVAILABLE_VALUES`

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

### Method: `showMessageBox`

```
showMessageBox(title, message[, type][, picture][, defaultOption])
```

This method shows a customizable message box. It can have a title, message, button/buttons and an image.

_Note: When you run this method, you will notice a PowerShell file appear in your current working directory. This is essential for the popup to display. Also, when a user clicks on a button, a text file will appear with the button clicked. This is for the PowerShell file to communicate with NodeJS._

This method returns a `Promise`, which contains the button on which the user clicked on. The value can be either of the below.

-   OK
-   Cancel
-   Yes
-   No
-   None

Let's see a quick example of how to use it, and then, we will look at the functionality more deeply.

```js
popup
	.showMessageBox(
		"Confirm Deleting File",
		"Are you sure you want to delete the file? This action is irreversible.",
		"YesNoCancel",
		"Warning",
		"No"
	)
	.then((btn) => {
		console.log(btn);
	})
	.catch((err) => {
		console.log(err);
	});
```

So, when you run this code, you should see a PowerShell file appear in your working directory. Soon after that, a message should appear, similar to this one.

_Note: Depending on your OS platform and version, your popup may look slightly different. However, the functionality should be the same. Also, the window icon is the PowerShell logo._

![Show-Message-Box-Popup-One](https://raw.githubusercontent.com/arnavthorat78/Popup-Prompt/main/img/Show-Message-Box-Popup-One.png)

Then, logged to the console will be whatever the user chose (in this case, the choosen one is _No_).

```
No
```

Now, let's break it down.

The first parameter of `showMessageBox` is the title. The title is, as it may suggest, a string of the name of the popup/window. This appears when the user sees the top of the popup, and also when they see the taskbar (Windows) and see the name.

The second parameter is the description, where you can write a sentence or two, telling the user what the popup is for.

After that, the optional parameters come in. The third parameter are the buttons that display on the bottom. They, however, can only be of the following values. Passing anything other than this will cause an error.

-   OK
-   OKCancel
-   YesNo\*
-   YesNoCancel

_\* When this value is set, the **X** (close) button is disabled._

The fourth optional parameter is the icon to display. This is a set list of icons, and must only be of the following values.

-   Asterisk
-   Error
-   Exclamation
-   Hand
-   Information
-   None\*
-   Question
-   Stop
-   Warning

_\* When `None` is set, there is no icon._

The last parameter is optional, and it is the default value for the button. So, if the user clicks _Enter_ when the popup comes, and the default value is set, then it will automatically go with it. It must be one of the following.

-   OK
-   Cancel
-   Yes
-   No
-   None

And that's it! This method can be very helpful for displaying information, warning, and error messages to your users, instead of just logging it to the console!
