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
 * **Deprecation warning! This variable has been deprecated since _v1.2.0_. It has not been updated since then. Use with caution.**
 *
 * Get all of the default available values for parameters in methods (e.g. `showMessageBox`).
 *
 * If a key in a method is an empty array, then that means that the value can be anything.
 *
 * @deprecated
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
	showCredentials: {
		title: undefined[];
		message: undefined[];
		username: undefined[];
		targetName: undefined[];
	};
};

////////////////
// Functions //
//////////////

// showMessageBox types and interfaces //
type TypeType = "OK" | "OKCancel" | "YesNo" | "YesNoCancel";
type PictureType =
	| "Asterisk"
	| "Error"
	| "Exclamation"
	| "Hand"
	| "Information"
	| "None"
	| "Question"
	| "Stop"
	| "Warning";
type ButtonType = "Cancel" | "No" | "None" | "OK" | "Yes";

interface MessageBoxOptions {
	type?: TypeType;
	picture?: PictureType;
	defaultOption?: ButtonType;
}

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
 * 		{
 * 			type: "YesNoCancel",
 * 			picture: "Warning",
 * 			defaultOption: "No"
 * 		}
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
 * ### `options` Parameter
 *
 * See the list of parameters below for the `options`.
 * -   `type` (_optional_) - The buttons that display on the bottom. They, however, can only be a few values. Passing anything other than this will cause an error.
 * -   `picture` (_optional_) - The icon to display. This is a set list of icons, and must only be of a few values.
 * -   `defaultOption` (_optional_) - The default value for the button. So, if the user clicks _Enter_ when the popup comes, and the default value is set, then it will automatically go with it. It must be one of the button values.
 *
 * @param title The title is a string of the name of the popup/window. This appears when the user sees the top of the popup, and also when they see the taskbar (Windows) and see the name.
 * @param message The description, where you can write a sentence or two, telling the user what the popup is for.
 * @param options A list of options for customizing the message box. See the above header for information of the values.
 * @returns This method returns a `Promise`, which contains the button on which the user clicked on.
 */
export const showMessageBox: (
	title: string,
	message: string,
	options?: MessageBoxOptions
) => Promise<ButtonType>;

// showPrompt interfaces //

interface PromptOptions {
	defaultValue?: string;
}

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
 * 	.showPrompt("New File", "Type the new file name below.", { defaultValue: "text.txt" })
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
 * ### `options` Parameter
 * 
 * See the list of options available!
 * -   `defaultValue` (_optional_) -  The default value. This is the value that should appear by default in the text field. This will be highlighted (like in the picture), so that if the user wants to go with it, they can just press _Enter_.
 * 
 * @param title The title. This is a string that should appear at the top on the popup window, and also on the taskbar (Windows) when they hover over the window.
 * @param message The message. This can be a sentence or two, telling the user what the prompt is for.
 * @param options A list of options for customizing the prompt. See the above header for information of the values.
 * @returns A `Promise`, which contains the string that the user entered. _Note: If the user presses the Cancel button, or presses the **X** (close) button, then the returned value will be a zero-length string._
 */
export const showPrompt: (
	title: string,
	message: string,
	options?: PromptOptions
) => Promise<string>;

// showCredentials interfaces //

interface CredentialsOptions {
	username?: string;
	targetName?: string;
}

interface CredentialsReturn {
	username: string | null;
	password: string | null;
	error: string | null;
}

/**
 * Show a credential prompt to the user. On Windows, this includes a picture of keys as the header, along with the username and password input.
 *
 * This method returns an object, with the username, password, and error. If an error occured, then username and password are `null`, otherwise, if everything went okay, error is `null`.
 *
 * Please note that the password is stored in plain text. It is your responsibility to make the string secure.
 *
 * Example:
 *
 * ```js
 * popup
 *	    .showCredentials(
 *	   	    "Popup Prompt Login",
 *	   	    "Please enter your credentials to login to Popup Prompt.",
 *	   	    { username: "", targetName: "popup-prompt" }
 *	    )
 *	    .then((cred) => {
 *	   	    console.log(cred);
 *	    })
 *	    .catch((err) => {
 *	   	    console.log(err);
 *	    });
 * ```
 *
 * If the user does not cancel the authentication, then the returned value should be an object. The popup will look as below (on Windows 10).
 *
 * ![Show-Credentials-Popup-Four](https://raw.githubusercontent.com/arnavthorat78/Popup-Prompt/main/img/Show-Credentials-Popup-Four.png)
 *
 * That's all!
 *
 * ### `options` Parameter
 *
 * The options parameter can be used to entend the functionality of `showCredentials` even further!
 * -   `username` (_optional_) - The default username to show in the username field.
 * -   `targetName` (_optional_) - The name that will show behind the username. This shows the target of the user.
 *
 * @param title The title to display on the top of the popup.
 * @param message The message to display to the user, telling them what the credential prompt is for.
 * @param options A list of options for customizing the credential prompt. See the above header for information of the values.
 * @returns A `Promise`, which contains an object, having the `username`, `password`, and `error` parameters.
 */
export const showCredentials: (
	title: string,
	message: string,
	options?: CredentialsOptions
) => Promise<CredentialsReturn>;

//////////////
// Classes //
////////////

// Popup types and interfaces //
type StartPos =
	| "CenterParent"
	| "CenterScreen"
	| "Manual"
	| "WindowsDefaultBounds"
	| "WindowsDefaultLocation";
type ScrollBars = "None" | "Both" | "Horizontal" | "Vertical";
type CharacterCasing = "Normal" | "Lower" | "Upper";

interface PopupSize {
	w?: number;
	width?: number;
	h?: number;
	height?: number;
}
interface PopupLocation {
	x: number;
	y: number;
}

interface PopupWindowOptions {
	maximize?: boolean;
	minimize?: boolean;
	showIcon?: boolean;
	showInTaskbar?: boolean;
	iconPath?: string;
	startPos?: StartPos;
	name?: string;
}
interface PopupLabelOptions {
	windowName?: string;
}
interface PopupButtonOptions {
	listen?: boolean;
	enabled?: boolean;
	windowName?: string;
}
interface PopupTextBoxOptions {
	listen?: boolean;
	multiline?: boolean;
	enabled?: boolean;
	maxLength?: number;
	maskChar?: string | number;
	wordWrap?: boolean;
	scrollBars?: ScrollBars;
	casing?: CharacterCasing;
	defaultText?: string;
	windowName?: string;
}
interface PopupImageOptions {
	windowName?: string;
}

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
	 * info.createWindow("Server Reboot", { width: 275, h: 175 }, { iconPath: "./favicon.ico" })
	 * 	.componentLabel(
	 * 		"information",
	 * 		"The server rebooted at 2:14 PM on 16/10/2021.",
	 * 		{ x: 10, y: 20 },
	 * 		{ w: 280, h: 20 }
	 * 	)
	 * 	.componentButton("button", "OK", { x: 85, y: 75 }, { w: 75, h: 25 }, "OK", { listen: true })
	 * 	.renderWindow({ topmost: true })
	 * 	.openPopup((data, err) => {
	 * 		console.log(err ? err : data);
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
	 * Get the full path to the user's file.
	 *
	 * @param relativePath The relative path provided by the user.
	 * @returns The full path.
	 */
	#getUserDir(relativePath: string): string;

	/**
	 * This method creates a window, which is where all of the popup components go.
	 *
	 * _Note: This method does not open the popup/window. To do this, run `openPopup`._
	 *
	 * The tipical sizes for an icon are _16 × 16_, _32 × 32_, and _48 × 48_ pixels. For great icons, see [this website](https://icon-icons.com/)!
	 *
	 * ### `options` Parameter
	 *
	 * The options parameter can be used to entend the functionality of creating the window!
	 * -   `maximize` (_optional_) - If the window should be allowed to maximize. The default is `true`.
	 * -   `minimize` (_optional_) - If the window can be minimized. Default is `true`.
	 * -   `showIcon` (_optional_) - If the icon should be shown on the ribbon. If this is `false`, then there will be no icon displayed. Default is `true`.
	 * -   `showInTaskbar` (_optional_) - If the window should be displayed in the user's taskbar. Default is `true`.
	 * -   `iconPath` (_optional_) - The icon path for the icon on the popup window. This must be an `.ico` picture extension. If the icon is empty, then the default is a picture with red, blue, and yellow blocks. Default is an empty string.
	 * -   `startPos` (_optional_) - The (start) position of the window. This defaults to `CenterScreen`.
	 * -   `name` (_optional_) - The name of the window. **It is not recommended to change this value**, since if you do change it, then you will have to pass it in almost every other method. Therefore, it is easier to leave it alone (the default value is `window`).
	 *
	 * @param title A title, which is the main title of the popup.
	 * @param size The size, which is an object. This can be used to set the width and height. For the width, you can use either `w` or `width`, and then the number of pixels. The same with the height; use `h` or `height`.
	 * @param options The options for customizing the window. See the above for the available items.
	 */
	createWindow(title: string, size: PopupSize, options?: PopupWindowOptions): this;

	/**
	 * This method creates a component label in the popup.
	 *
	 * _Note: This method does not open the popup/window. To do this, run `openPopup`._
	 *
	 * ### `options` Parameter
	 *
	 * The options parameter can be used to entend the functionality of a label!
	 * -   `windowName` (_optional_) - The name of the window. **It is not recommended to change this value**, since if you do change it, then you will have to pass it in almost every other method. Therefore, it is easier to leave it alone (the default value is `window`).
	 *
	 * @param name A name, which is like a variable for the label. **If you pass in a value that already exists, there can be errors.**
	 * @param text The text, which is basically the text to display on the label.
	 * @param location The location, which is an object. This is used to set the top-left area of the shape, using _x_ and _y_ coordinates. You can use the keys `x` and `y` for setting the coordinates.
	 * @param size The size, which is an object. This can be used to set the width and height. For the width, you can use either `w` or `width`, and then the number of pixels. The same with the height; use `h` or `height`.
	 * @param options The options for customizing the label. See the above for the available items.
	 */
	componentLabel(
		name: string,
		text: string,
		location: PopupLocation,
		size: PopupSize,
		options?: PopupLabelOptions
	): this;
	/**
	 * Create a component button in the popup.
	 *
	 * _Note: This method does not open the popup/window. To do this, run `openPopup`._
	 *
	 * ### `options` Parameter
	 *
	 * The options parameter can be used to entend the functionality of a label!
	 * -   `listen` (_optional_) - A listener. This will wait for a click event, and when it occurs, it will return the `result` value in `openPopup`.
	 * -   `enabled` (_optional_) - If the button is enabled or not. If this value is `false`, then it will showed a greyed-out button, that will not respond to user interaction. Defaults to `true`.
	 * -   `windowName` (_optional_) - The name of the window. **It is not recommended to change this value**, since if you do change it, then you will have to pass it in almost every other method. Therefore, it is easier to leave it alone (the default value is `window`).
	 *
	 * @param name The name, which is the variable for the button. **Beware that if you pass a value that exists, there could be errors.**
	 * @param text The text to display on the button.
	 * @param location The location, which is an object. This is used to set the top-left area of the shape, using _x_ and _y_ coordinates. You can use the keys `x` and `y` for setting the coordinates.
	 * @param size The size, which is an object. This can be used to set the width and height. For the width, you can use either `w` or `width`, and then the number of pixels. The same with the height; use `h` or `height`.
	 * @param result The result, which is the result of the button (if `options.listen` is true). This is what is returned if `options.listen` is true.
	 * @param options The options for customizing the button. See the above for the available items.
	 */
	componentButton(
		name: string,
		text: string,
		location: PopupLocation,
		size: PopupSize,
		result: string,
		options?: PopupButtonOptions
	): this;
	/**
	 * Create a text box for the user to enter text in.
	 *
	 * _Note: This method does not open the popup/window. To do this, run `openPopup`._
	 * 
	 * ### `options` Parmeter
	 *
	 * The options parameter can be used to entend the functionality of a text box!
	 * -   `listen` (_optional_) - A listener. This will wait for a click event, and when it occurs, it will return the `result` value in `openPopup`.
	 * -   `multiline` (_optional_) - If the text box should be allowed to be stretched multiline. If this is `true`, then the height for `size` will work. Defaults to `true`.
	 * -   `enabled` (_optional_) - If the button is enabled or not. If this value is `false`, then it will showed a greyed-out button, that will not respond to user interaction. Defaults to `true`.
	 * -   `maxLength` (_optional_) - The maximum length that the text box should allow. The default is `32767`.
	 * -   `maskChar` (_optional_) - The character to mask the letters with. This is useful for passwords. If the letter should not be masked, set to `0`. Defaults to `0`.
	 * -   `wordWrap` (_optional_) - If the words should wrap when it reaches the width of the text box, or it should keep going. Defaults to `true`.
	 * -   `scrollBars` (_optional_) - The types of scroll bars that should show on the text box. This can be _None_, _Both_, _Horizontal_, or _Vertical_. Defaults to _None_.
	 * -   `casing` (_optional_) - The casing that the text in the text box should turn to. This is the actual value as well as the displayed value. Defaults to _Normal_, and can also have values of _Lower_ or _Upper_.
	 * -   `defaultText` (_optional_) - The default text that the text box should show. Defaults to an empty string.
	 * -   `windowName` (_optional_) - The name of the window. **It is not recommended to change this value**, since if you do change it, then you will have to pass it in almost every other method. Therefore, it is easier to leave it alone (the default value is `window`).
	 *
	 * @param name A name, which is the text box's variable name. **Beware that if you pass a value that exists, there could be errors.**
	 * @param location The location, which is an object. This is used to set the top-left area of the shape, using _x_ and _y_ coordinates. You can use the keys `x` and `y` for setting the coordinates.
	 * @param size The size, which is an object. This can be used to set the width and height. For the width, you can use either `w` or `width`, and then the number of pixels. The same with the height; use `h` or `height`.
	 * @param options The options for customizing the text box. See the above for the available items.
	 */
	componentTextBox(
		name: string,
		location: PopupLocation,
		size: PopupSize,
		options?: PopupTextBoxOptions
	): this;
	/**
	 * Create an image to display.
	 *
	 * _Note: This method does not open the popup/window. To do this, run `openPopup`._
	 * 
	 * ### `options` Parameter
	 * 
	 * This parameter can be used to customize the component more!
	 * -   `windowName` (_optional_) - The name of the window. **It is not recommended to change this value**, since if you do change it, then you will have to pass it in almost every other method. Therefore, it is easier to leave it alone (the default value is `window`).
	 *
	 * @param name A name, which is the image's variable name. **Beware that if you pass a value that exists, there could be errors.**
	 * @param path The path to the image. This can be a relative path, and you can pass any valid picture type, such as _.png_ or _.jpg_.
	 * @param location The location, which is an object. This is used to set the top-left area of the shape, using _x_ and _y_ coordinates. You can use the keys `x` and `y` for setting the coordinates.
	 * @param options The options for customizing the text box. See the above for the available items.
	 */
	componentImage(
		name: string,
		path: string,
		location: PopupLocation,
		options?: PopupImageOptions,
	): this;
	/**
	 * Create a list box, which is a list of items for the user to select from.
	 *
	 * _Note: This method does not open the popup/window. To do this, run `openPopup`._
	 *
	 * @param name A name, which is the list's variable name. **Beware that if you pass a value that exists, there could be errors.**
	 * @param items An array of strings, which are the items to display.
	 * @param location The location. This is an array of two numbers. These numbers determine the location from the top-left corner of the popup text, from the top-left of the popup window. For example, if the numbers are `[10, 10]`, then `10` is the width, and `10` is the height.
	 * @param size The size. This is an array of two numbers. These numbers determine the size of the list box.
	 * @param height The height. This is the displayed height.
	 * @param listen This parameter specifies if the end result should be the selected value. Default value is `false`.
	 * @param windowName The name of the window. **It is not recommended to change this value**, since if you do change it, then you will have to pass it in almost every other method. Therefore, it is easier to leave it alone (the default value is `window`).
	 */
	componentListBox(
		name: string,
		items: string[],
		location: [number, number],
		size: [number, number],
		height: number,
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
