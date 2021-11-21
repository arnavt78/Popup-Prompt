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

const path = require("path");
const spawn = require("child_process").spawn;

const _powerShellScript = require("../utils/_powerShellScript");
const _readOutput = require("../utils/_readOutput");
const _deleteFileContents = require("../utils/_deleteFileContents");

class Popup {
	#code;
	constructor() {
		this.#code = {
			addTypes: "",
			name: "",
			components: "",
			render: "",
		};
	}

	#concatCode() {
		let allCode = "";
		Object.values(this.#code).forEach((code) => {
			allCode += code;
		});

		return allCode;
	}
	#runPowerShell(filename, textFile, script, callback) {
		_deleteFileContents(textFile);
		_powerShellScript(filename, script);

		const child = spawn("powershell.exe", [filename]);

		child.stdout.on("data", (data) => {
			// Do something if needed (e.g. debugging)
		});
		child.stderr.on("data", (data) => {
			callback(null, data.toString("utf8").split("\n")[0]);
			return;
		});
		child.on("exit", () => {
			let content = "";
			try {
				content = _readOutput(textFile);
			} catch (err) {
				callback(
					null,
					"The script does not return a value. Try adding a listener when adding components."
				);
				return;
			}

			callback(content, null);
			return;
		});
	}
	#getUserDir(relativePath) {
		const userDir = process.cwd();
		const fullPath = path.resolve(userDir, relativePath);

		return fullPath;
	}

	createWindow(
		title,
		size,
		resizable = true,
		iconPath = "",
		startPos = "CenterScreen",
		name = "window"
	) {
		let code = `\n
[System.Windows.Forms.Application]::EnableVisualStyles()
$${name} = New-Object System.Windows.Forms.Form
$${name}.Text = "${title}"
$${name}.Size = New-Object System.Drawing.Size(${size[0]}, ${size[1]})
$${name}.StartPosition = "${startPos}"`;

		if (!resizable) {
			code += `\n$${name}.FormBorderStyle = "FixedDialog"
$${name}.MaximizeBox = $false`;
		}
		if (iconPath) {
			code += `\n$${name}.Icon = [System.Drawing.Icon]::ExtractAssociatedIcon("${this.#getUserDir(
				iconPath
			)}")`;
		}

		this.#code.name = code;
		return this;
	}

	componentLabel(name, text, location, size, windowName = "window") {
		const code = `\n
$${name} = New-Object System.Windows.Forms.Label
$${name}.Location = New-Object System.Drawing.Point(${location[0]}, ${location[1]})
$${name}.Size = New-Object System.Drawing.Size(${size[0]}, ${size[1]})
$${name}.Text = "${text}"
$${windowName}.Controls.Add($${name})`;

		this.#code.components += code;
		return this;
	}
	componentButton(name, text, location, size, result, listen = false, windowName = "window") {
		let code = `\n
$${name} = New-Object System.Windows.Forms.Button
$${name}.Location = New-Object System.Drawing.Point(${location[0]}, ${location[1]})
$${name}.Size = New-Object System.Drawing.Size(${size[0]}, ${size[1]})
$${name}.Text = "${text}"
$${name}.DialogResult = [System.Windows.Forms.DialogResult]::${result}
$${windowName}.Controls.Add($${name})`;

		if (listen) {
			code += `\n$${name}.Add_Click({
	Set-Content .\\popup.txt $${name}.DialogResult
})`;
		}

		this.#code.components += code;
		return this;
	}
	componentTextBox(name, location, size, listen = false, windowName = "window") {
		let code = `\n
$${name} = New-Object System.Windows.Forms.TextBox
$${name}.Location = New-Object System.Drawing.Point(${location[0]}, ${location[1]})
$${name}.Size = New-Object System.Drawing.Size(${size[0]}, ${size[1]})
$${windowName}.Controls.Add($${name})`;

		if (listen) {
			code += `\n$${name}.add_KeyUp({
    Set-Content .\\popup.txt $${name}.Text
})`;
		}

		this.#code.components += code;
		return this;
	}
	componentImage(name, path, location, windowName = "window") {
		const fileName = `${name}File`;
		const imgName = `${name}Img`;

		let code = `\n
$${fileName} = (Get-Item "${this.#getUserDir(path)}")
$${imgName} = [System.Drawing.Image]::Fromfile($${fileName})

$${name} = New-Object Windows.Forms.PictureBox
$${name}.Width = $${imgName}.Size.Width
$${name}.Height = $${imgName}.Size.Height
$${name}.Location = New-Object System.Drawing.Point(${location[0]}, ${location[1]})
$${name}.Image = $${imgName}
$${windowName}.Controls.Add($${name})
		`;

		this.#code.components += code;
		return this;
	}
	componentListBox(name, items, location, size, height, listen = false, windowName = "window") {
		let list = "";
		items.forEach((item) => {
			list += `[void] $${name}.Items.Add("${item}")\n`;
		});

		let code = `\n
$${name} = New-Object System.Windows.Forms.ListBox
$${name}.Location = New-Object System.Drawing.Point(${location[0]}, ${location[1]})
$${name}.Size = New-Object System.Drawing.Size(${size[0]}, ${size[1]})
$${name}.Height = ${height}
${list}
$${windowName}.Controls.Add($${name})`;

		if (listen) {
			code += `\n$${name}.add_SelectedIndexChanged({
    Set-Content .\\popup.txt $${name}.SelectedItem
})`;
		}

		this.#code.components += code;
		return this;
	}

	renderWindow(topmost = false, name = "window") {
		const addTypes = `Add-Type -AssemblyName System.Windows.Forms
Add-Type -AssemblyName System.Drawing`;
		const renderCode = `\n
$${name}.Topmost = $${topmost}
$result = $${name}.ShowDialog()`;

		this.#code.addTypes = addTypes;
		this.#code.render = renderCode;
		return this;
	}

	openPopup(callback) {
		this.#runPowerShell("./popup.ps1", "./popup.txt", this.#concatCode(), callback);
	}
}

module.exports = { Popup };
