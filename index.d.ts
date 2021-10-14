// MIT License
//
// Copyright (c) 2021 arnavthorat78
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in all
// copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
// SOFTWARE.

////////////////
// Constants //
//////////////

/**
 * The current version of `popup-prompt`.
 *
 * _Note: This can be out-of-date at times. If it is, please make a [new Issue](https://github.com/arnavthorat78/Popup-Prompt/issues)!_
 */
export const VERSION: string;

/**
 * Get all of the default available values for parameters in methods (e.g. `showMessageBox`).
 *
 * If a key in a method is an empty array, then that means that the value can be anything.
 */
export const AVAILABLE_VALUES: {
	showMessageBox: {
		title: undefined[];
		message: undefined[];
		type: string[];
		picture: string[];
		defaultOption: string[];
	};
	showPrompt: {
		title: undefined[];
		message: undefined[];
		defaultValue: undefined[];
	};
};

////////////////
// Functions //
//////////////

// showMessageBox types //
type typeType = "OK" | "OKCancel" | "YesNo" | "YesNoCancel";
type pictureType =
	| "Asterisk"
	| "Error"
	| "Exclamation"
	| "Hand"
	| "Information"
	| "None"
	| "Question"
	| "Stop"
	| "Warning";
type buttonType = "Cancel" | "No" | "None" | "OK" | "Yes";

/**
 * This method shows a customizable message box. It can have a title, message, button/buttons and an image.
 *
 * _Note: When you run this method, you will notice a PowerShell file appear in your current working directory. This is essential for the popup to display. Also, when a user clicks on a button, a text file will appear with the button clicked. This is for the PowerShell file to communicate with NodeJS._
 *
 * This method returns a `Promise`, which contains the button on which the user clicked on.
 *
 * Example of usage:
 *
 * ```js
 * popup
 * 	.showMessageBox(
 * 		"Confirm Deleting File",
 * 		"Are you sure you want to delete the file? This action is irreversible.",
 * 		"YesNoCancel",
 * 		"Warning",
 * 		"No"
 * 	)
 * 	.then((btn) => {
 * 		console.log(btn);
 * 	})
 * 	.catch((err) => {
 * 		console.log(err);
 * 	});
 * ```
 *
 * So, when you run this code, you should see a PowerShell file appear in your working directory. Soon after that, a message should appear, similar to this one.
 *
 * _Note: Depending on your OS platform and version, your popup may look slightly different. However, the functionality should be the same. Also, the window icon is the PowerShell logo._
 *
 * ![Show-Message-Box-Popup-One](https://raw.githubusercontent.com/arnavthorat78/Popup-Prompt/main/img/Show-Message-Box-Popup-One.png)
 *
 * Then, logged to the console will be whatever the user chose (in this case, the choosen one is _No_).
 *
 * ```
 * No
 * ```
 *
 * @param title The title is a string of the name of the popup/window. This appears when the user sees the top of the popup, and also when they see the taskbar (Windows) and see the name.
 * @param message The description, where you can write a sentence or two, telling the user what the popup is for.
 * @param type The buttons that display on the bottom. They, however, can only be a few values. Passing anything other than this will cause an error.
 * @param picture The icon to display. This is a set list of icons, and must only be of a few values.
 * @param defaultOption The default value for the button. So, if the user clicks _Enter_ when the popup comes, and the default value is set, then it will automatically go with it. It must be one of the button values.
 * @returns This method returns a `Promise`, which contains the button on which the user clicked on.
 */
export const showMessageBox: (
	title: string,
	message: string,
	type?: typeType,
	picture?: pictureType,
	defaultOption?: buttonType
) => Promise<buttonType>;

/**
 * The method creates a customizable prompt popup. This includes the title, the message, and the default value for the text field.
 * 
 * _Note: When you run this method, you will notice a PowerShell file appear in your current working directory. This is essential for the prompt to display. Also, when the user enters their text, a text file will appear with the text entered. This is for the PowerShell file to communicate with NodeJS._
 * 
 * This method returns a `Promise`, which contains the string that the user entered. _Note: If the user presses the Cancel button, or presses the **X** (close) button, then the returned value will be a zero-length string._
 * 
 * Below is an example of how to use the method.

 * ```js
 * popup
 * 	.showPrompt("New File", "Type the new file name below.", "text.txt")
 * 	.then((fileName) => {
 * 		console.log(fileName);
 * 	})
 * 	.catch((err) => {
 * 		console.log(err);
 * 	});
 * ```
 * 
 * When you run the code, like `showMessageBox`, a PowerShell file will appear in your current working directory, and then, a prompt message similar to this one (depending on your OS, the prompt may look different) will show up.
 * 
 * ![Show-Prompt-Popup-Two](https://raw.githubusercontent.com/arnavthorat78/Popup-Prompt/main/img/Show-Prompt-Popup-Two.png)
 * 
 * Once the user clicks _Enter_, the _OK_ button, the _Cancel_ button, or the _Close_ button, a text file will appear in your current working directory, and then, in the terminal/command prompt, the text that the user entered will show up. In this example, we will pretend that the user entered _text.txt_.
 * 
 * ```
 * text.txt
 * ```
 * 
 * Then, you can do whatever you want with the value!
 * 
 * @param title The title. This is a string that should appear at the top on the popup window, and also on the taskbar (Windows) when they hover over the window.
 * @param message The message. This can be a sentence or two, telling the user what the prompt is for.
 * @param defaultValue The default value. This is the value that should appear by default in the text field. This will be highlighted (like in the picture), so that if the user wants to go with it, they can just press _Enter_.
 * @returns A `Promise`, which contains the string that the user entered. _Note: If the user presses the Cancel button, or presses the **X** (close) button, then the returned value will be a zero-length string._
 */
export const showPrompt: (title: string, message: string, defaultValue?: string) => Promise<string>;
