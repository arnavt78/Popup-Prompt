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

//////////////
// Classes //
////////////

// Popup types //
type startPos =
	| "CenterParent"
	| "CenterScreen"
	| "Manual"
	| "WindowsDefaultBounds"
	| "WindowsDefaultLocation";

export class Popup {
	#code: {
		addTypes: string;
		name: string;
		components: string;
		render: string;
	};

	/**
	 * Create a new `Popup` instance.
	 *
	 * This is used to make a fully customizable popup.
	 *
	 * Example of usage:
	 * ```js
	 * const info = new popup.Popup(); // We are not chaining from here, but you can if you want.
	 *
	 * info.createWindow("Server Reboot", [275, 175], "C:/Users/Someone/Popup-Prompt/favicon.ico")
	 * 	.componentLabel(
	 * 		"information",
	 * 		"The server rebooted at 2:14 PM on 16/10/2021.",
	 * 		[10, 20],
	 * 		[280, 20]
	 * 	)
	 * 	.componentButton("button", "OK", [85, 75], [75, 25], "OK", true)
	 * 	.renderWindow(true)
	 * 	.openPopup((data, err) => {
	 * 		if (err) {
	 * 			console.log(err);
	 * 		} else {
	 * 			console.log(data);
	 * 		}
	 * 	});
	 * ```
	 */
	constructor();

	/**
	 * Concat all of the code in `this.#code`.
	 *
	 * @returns The concatted code.
	 */
	#concatCode(): string;
	/**
	 * Run a PowerShell file.
	 *
	 * @param filename The name of the PowerShell file to run.
	 * @param textFile The name of the text file to get the data from.
	 * @param script The script to run.
	 * @param callback The callback to invoke when the script ends.
	 */
	#runPowerShell(
		filename: string,
		textFile: string,
		script: string,
		callback: (data: string, err: string) => void
	): void;

	/**
	 * This method creates a window, which is where all of the popup components go.
	 *
	 * _Note: This method does not open the popup/window. To do this, run `openPopup`._
	 *
	 * ### Notes for Icons!
	 *
	 * _Note: The path must be from the drive. Otherwise, the icon will not display (e.g. `C:/Users/Someone/Popup-Prompt/favicon.ico`, not `./favicon.ico`). This bug will soon be fixed._
	 *
	 * The tipical sizes for an icon are _16 × 16_, _32 × 32_, and _48 × 48_ pixels. For great icons, see [this website](https://icon-icons.com/)!
	 *
	 * @param title A title, which is the main title of the popup.
	 * @param size The size, which is an array of two numbers. These numbers determine the size of the window. So, `[300, 200]` means that the width is `300`, and the height is `200`.
	 * @param iconPath The icon path for the icon on the popup window. This must be an `.ico` picture extension. If the icon is empty, then the default is a picture will red, blue, and yellow blocks.
	 * @param startPos the start position. This is the position of the window. This defaults to `CenterScreen`.
	 * @param name The name of the window. **It is not recommended to change this value**, since if you do change it, then you will have to pass it in almost every other method. Therefore, it is easier to leave it alone (the default value is `window`).
	 */
	createWindow(
		title: string,
		size: [number, number],
		iconPath?: string,
		startPos?: startPos,
		name?: string
	): this;

	/**
	 * This method creates a component label in the popup.
	 *
	 * _Note: This method does not open the popup/window. To do this, run `openPopup`._
	 *
	 * @param name A name, which is like a variable for the label. **If you pass in a value that already exists, there can be errors.**
	 * @param text The text, which is basically the text to display on the label.
	 * @param location The location. This is an array of two numbers. These numbers determine the location from the top-left corner of the popup text, from the top-left of the popup window. For example, if the numbers are `[10, 20]`, then `10` is the width, and `20` is the height.
	 * @param size The size. This is an array of two numbers. These numbers determine the size of the text. For example, if the numbers are `[300, 20]`, then `300` is the width, and `20` is the height.
	 * @param windowName The name of the window. **It is not recommended to change this value**, since if you do change it, then you will have to pass it in almost every other method. Therefore, it is easier to leave it alone (the default value is `window`).
	 */
	componentLabel(
		name: string,
		text: string,
		location: [number, number],
		size: [number, number],
		windowName?: string
	): this;
	/**
	 * Create a component button in the popup.
	 *
	 * _Note: This method does not open the popup/window. To do this, run `openPopup`._
	 *
	 * @param name The name, which is the variable for the button. **Beware that if you pass a value that exists, there could be errors.**
	 * @param text The text to display on the button.
	 * @param location The location. This is an array of two numbers. These numbers determine the location from the top-left corner of the popup text, from the top-left of the popup window. For example, if the numbers are `[10, 20]`, then `10` is the width, and `20` is the height.
	 * @param size The size. This is an array of two numbers. These numbers determine the size of the button. For example, if the numbers are `[75, 20]`, then `300` is the width, and `20` is the height.
	 * @param result The result, which is the result of the button (if `listen` is true). This is what is returned if `listen` is true.
	 * @param listen A listener. This will wait for a click event, and when it occurs, it will return the `result` value in `openPopup`.
	 * @param windowName The name of the window. **It is not recommended to change this value**, since if you do change it, then you will have to pass it in almost every other method. Therefore, it is easier to leave it alone (the default value is `window`).
	 */
	componentButton(
		name: string,
		text: string,
		location: [number, number],
		size: [number, number],
		result: string,
		listen?: boolean,
		windowName?: string
	): this;
	/**
	 *
	 * @param name A name, which is the text box's variable name. **Beware that if you pass a value that exists, there could be errors.**
	 * @param location The location. This is an array of two numbers. These numbers determine the location from the top-left corner of the popup text, from the top-left of the popup window. For example, if the numbers are `[10, 20]`, then `10` is the width, and `20` is the height.
	 * @param size The size. This is an array of two numbers. These numbers determine the size of the text box. For example, if the numbers are `[250, 20]`, then `250` is the width, and `20` is the height.
	 * @param listen A listener. This will wait for a _KeyUp_ event, and when it occurs, it will return the text in `openPopup`. _Note: This method does not return the text after each KeyUp event. Also, beware that there could be **null** readings at times._
	 * @param windowName The name of the window. **It is not recommended to change this value**, since if you do change it, then you will have to pass it in almost every other method. Therefore, it is easier to leave it alone (the default value is `window`).
	 */
	componentTextBox(
		name: string,
		location: [number, number],
		size: [number, number],
		listen?: boolean,
		windowName?: string
	): this;

	/**
	 * This method creates the code for the window to be properly rendered.
	 *
	 * _Note: This method does not open the popup/window. To do this, run `openPopup`._
	 *
	 * All of the parameters of this method are optional. Therefore, it is okay to not pass in anything.
	 *
	 * @param topmost If the window should be the topmost. This means that even if the window is out of focus, the popup will still stay on the top (unless the user clicks the minimize button).
	 * @param name The name of the window. **It is not recommended to change this value**, since if you do change it, then you will have to pass it in almost every other method. Therefore, it is easier to leave it alone (the default value is `window`).
	 */
	renderWindow(topmost?: boolean, name?: string): this;

	/**
	 * This method opens the popup on the users computer.
	 *
	 * There is only one required parameter, and that is the callback. It is usually called as below.
	 *
	 * ```js
	 * popup.openPopup((data, err) => {
	 * 	if (err) {
	 * 		console.log(err);
	 * 	} else {
	 * 		// Do whatever you want with the data returned.
	 * 		console.log(data);
	 * 	}
	 * });
	 * ```
	 *
	 * ### Callback Notes
	 *
	 * The first parameter that the callback passes is the data. This is the data from a button or text box (if `listen` is set to true). If there are no listeners, then the data will be a zero-length string. Otherwise, it will be the button clicked, or the text in the text box entered, depending on what has been listened.
	 *
	 * The second parameter that the callback passes is the error. This is a string telling the user that an error occured. _Note: This method does not exactly tell what the error is. This may be introduced in version 1.1.0._
	 *
	 * Once both of the parameters are there, then, in the callback body, you should add an `if/else` statement, and check if there is an error. The reason is because if there is an error, it will have a value, otherwise, it will have a value of `null`. The same applies for the `data`. In the `else` clause, you can do whatever you wish with the data.
	 *
	 * @param callback The callback to invoke when the callback has finished (or started, if there is an error).
	 */
	openPopup(callback: (data: string, err: string) => void): void;
}
