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

const spawn = require("child_process").spawn;

const _powerShellScript = require("../utils/_powerShellScript");
const _readOutput = require("../utils/_readOutput");

const showMessageBox = (title, message, options = {}) => {
	return new Promise((resolve, reject) => {
		options.type = options.type ?? "YesNoCancel";
		options.picture = options.picture ?? "None";
		options.defaultOption = options.defaultOption ?? "Yes";

		_powerShellScript(
			"./message.ps1",
			`Add-Type -AssemblyName PresentationFramework;
$result = [System.Windows.MessageBox]::Show("${message}", "${title}", "${options.type}", "${options.picture}", "${options.defaultOption}");
Set-Content .\\message.txt $result;`
		);

		const child = spawn("powershell.exe", ["./message.ps1"]);

		child.stdout.on("data", (data) => {
			// Do something if needed (e.g. debugging)
		});
		child.stderr.on("data", (data) => {
			reject(
				"A PowerShell error occured while processing the popup. Please check your parameter values."
			);
		});
		child.on("exit", () => {
			resolve(_readOutput("./message.txt"));
		});
	});
};

module.exports = { showMessageBox };
