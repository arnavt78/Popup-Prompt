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
 */
export const VERSION: string;

/**
 * Get all of the default available values for parameters in methods (e.g. `showMessageBox`).
 *
 * If a key in a method is an empty array, then that means that it can be anything.
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
 */
export const showMessageBox: (
	title: string,
	message: string,
	type?: string,
	picture?: string,
	defaultOption?: string
) => Promise<string>;

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
 */
export const showPrompt: (title: string, message: string, defaultValue?: string) => Promise<string>;
