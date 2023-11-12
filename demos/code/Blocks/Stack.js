var stackHUE = 333;

Blockly.Blocks['stack'] = {
	init: function () {
		this.appendDummyInput()
			.appendField("stack<")
			.appendField(new Blockly.FieldDropdown([["int", "int"], ["size_t", "size_t"], ["double", "double"], ["char", "char"], ["string", "string"], ["bool", "bool"]]), "myStaType")
			.appendField(">")
			.appendField(new Blockly.FieldTextInput("mySta"), "myStaDef")
			.appendField('', 'init');


		this.setInputsInline(true);
		this.setPreviousStatement(true, null);
		this.setNextStatement(true, null);
		this.setColour(stackHUE);
		this.setTooltip("Stack");
		this.setHelpUrl("");

		this.typeName_ = this.getField('myStaType').getText();
		this.getVar_ = this.getField('myStaDef').getText();

		this.size_ = 0;

		this.isInitialized_ = false;

		//set data structure as a stack
		this.setDataStr("isSta", true);

		this.varProp_ = [];
		
	},
	onchange: function () {

		this.allocateValues();
		this.allocateWarnings();
	},
	allocateValues: function () {
		this.typeName_ = this.getField('myStaType').getText();
		this.getVar_ = this.getField('myStaDef').getText();

		this.setFieldValue('', 'init');


		//constant
		this.varProp_[0] = false;
		//type
		this.varProp_[1] = this.typeName_;
		//pointer
		this.varProp_[2] = "";
		//variable
		this.varProp_[3] = this.getVar_;

	},
	allocateWarnings: function () {
		var TT = "";

		for (var i = 1; i <= this.size_; ++i) {
			let block = this.getInputTargetBlock('valinp' + i);

			if (block) {
				if (this.typeName_ !== block.typeName_) {
					TT += 'Error, input #' + i + ' is of type "' + block.typeName_ + '", must be of type: "' + this.typeName_ + '".\n';
				}
			}
		}


		//create an instance of C_Include
		var librarySearch = C_Include;

		var libFoundStack = librarySearch.search_library(this, ['include_stack']);
		var libFoundString = librarySearch.search_library(this, ['include_string']);

		if (!libFoundStack) {
			TT += "Error, <stack> library must be included.\n";
		}

		if (this.typeName_ === "string" && !libFoundString) {
			TT += "Error, <string> library must be included.\n";
		}

		//End library check section


		if (TT.length > 0) {
			this.setWarningText(TT);
		}
		else {
			this.setWarningText(null);
		}

	},
	customContextMenu: function (options) {
		//save the current scope
		let BlockScope = this;

		var librarySearch = C_Include;
		var libFoundStack = librarySearch.search_library(this, ['include_stack']);
		var libFoundString = librarySearch.search_library(this, ['include_string']);

		//Create the option to automate a string library creation
		if (!libFoundStack) {
			automate_library_stack = {
				text: "include <stack>",
				enabled: true,

				callback: function () {
					var newBlock = BlockScope.workspace.newBlock('include_stack');
					let ptr = BlockScope;

					while (ptr) {
						//if we're at the top
						if (!ptr.parentBlock_) {
							newBlock.previousConnection.connect(ptr.previousConnection.targetConnection);
							newBlock.nextConnection.connect(ptr.previousConnection);
							newBlock.initSvg();
							newBlock.render();

							return;
						}

						ptr = ptr.parentBlock_;
					}

				}

			}
			options.push(automate_library_stack);
		}
		//Create the option to automate a string library creation
		if (this.typeName_ === "string" && !libFoundString) {
			automate_library_string = {
				text: "include <string>",
				enabled: true,

				callback: function () {
					var newBlock = BlockScope.workspace.newBlock('include_string');
					let ptr = BlockScope;

					while (ptr) {
						//if we're at the top
						if (!ptr.parentBlock_) {
							newBlock.previousConnection.connect(ptr.previousConnection.targetConnection);
							newBlock.nextConnection.connect(ptr.previousConnection);
							newBlock.initSvg();
							newBlock.render();

							return;
						}

						ptr = ptr.parentBlock_;
					}

				}

			}
			options.push(automate_library_string);
		}

	}

};
Blockly.C['stack'] = function (block) {
	var val0 = Blockly.C.valueToCode(block, 'valinp0', Blockly.C.ORDER_ATOMIC);
	var type = this.getField('myStaType').getText();

	C = C_Include;

	var code = '';
	var std = '';

	if (!C.using.std(block)) {
		std = 'std::';
	}

	code += std + 'stack<';


	code += type + '> ' + this.getVar_;
	if (this.size_ > 0) {
		code += ' = {';

		if (val0.length > 0) {
			code += val0;
		}

		for (var i = 1; i <= this.size_; ++i) {

			var arg = Blockly.C.valueToCode(block, 'valinp' + i, Blockly.C.ORDER_NONE);
			var childBlock = this.getInputTargetBlock('valinp' + i);

			if (childBlock) {
				code += arg;

				if (i < this.size_) {
					code += ", ";
				}

			}
		}
		code += '}';
	}

	code += ';\n';

	return code;
};

Blockly.Blocks['stack_size'] = {
	init: function () {

		this.appendValueInput('valinp1')
			.setCheck(null);

		this.appendDummyInput()
			.appendField(".size()");

		this.setOutput(true);
		this.setColour(stackHUE);

		this.setTooltip("");
		this.setHelpUrl("");

		this.typeName_ = "size_t";

		this.isGetter_ = true;
	},

	onchange: function () {
		this.allocateValues();
		this.allocateWarnings();
	},

	//Initialize variables
	allocateValues: function () {
		//Set variable to left input
		this.getVar_ = Blockly.C.valueToCode(this, 'valinp1', Blockly.C.ORDER_NONE);
	},

	allocateWarnings: function () {
		var TT = "";

		//If there is no left connection
		if (!this.parentBlock_) {
			TT += 'Block Error, this block has a return and must be connected.\n';
		}

		//If there is a variable
		if (this.getVar_.length > 0) {

		}
		//If there is not a variable
		else {
			TT += 'Error, a stack variable is required.\n';
		}

		//Check if this block is in a proper scope
		let Scope = C_Scope;
		if (!Scope.node.is_in_scope(this, ['isFunc'])) {
			TT += "Error, this block must be inside of a function or main.\n";
		}
		//End Scope check

		if (TT.length > 0) {
			this.setWarningText(TT);
		}
		else {
			this.setWarningText(null);
		}
	}
};

Blockly.C['stack_size'] = function (block) {
	var code = "";

	if (this.getVar_.length > 0) {
		code += this.getVar_ + ".size()";
	}

	return [code, Blockly.C.ORDER_ATOMIC];
};


Blockly.Blocks['stack_push'] = {
	init: function () {

		this.appendValueInput('valinp1')
			.setCheck(null);

		this.appendValueInput('valinp2')
			.appendField(".push(");

		this.appendDummyInput()
			.appendField(')');

		this.setOutput(false);
		this.setPreviousStatement(true);
		this.setNextStatement(true);
		this.setColour(stackHUE);
		this.setTooltip("");
		this.setHelpUrl("");
	},

	onchange: function () {
		this.allocateValues();
		this.allocateWarnings();
	},

	//Initialize variables
	allocateValues: function () {
		//Set variable to left input
		this.getVar_ = Blockly.C.valueToCode(this, 'valinp1', Blockly.C.ORDER_NONE);
		this.typeName_ = "";

		let ptr = this.parentBlock_;

		while (ptr) {

			if (ptr.getDataStr() === "isSta" && this.getVar_ === ptr.getVar_) {
				this.typeName_ = ptr.typeName_;
			}

			ptr = ptr.parentBlock_;
		}
	},

	allocateWarnings: function () {
		let C = C_Logic;

		//Parameter 
		var val2 = Blockly.C.valueToCode(this, 'valinp2', Blockly.C.ORDER_ATOMIC);
		//Parameter block
		let block = this.getInputTargetBlock('valinp2');

		var TT = "";

		//If there is no left connection
		if (!this.parentBlock_) {
			TT += 'Block Error, this block has a return and must be connected.\n';
		}

		//If there is a variable
		if (this.getVar_.length > 0) {
			//If a block is connected
			if (block) {

				//check types
				if (this.typeName_ !== block.typeName_) {
					TT += 'Error, parameter must be a type "' + this.typeName_ + '", current type: "' + block.typeName_ + '".\n';
				}

				if (val2.length < 1) {
					TT += 'Error, input is required.\n';
				}
			}
			else {
				TT += 'Error, parameter requires an input.\n';
			}

		}
		//If there is not a variable
		else {
			TT += 'Error, a stack variable is required.\n';
		}

		//Check if this block is in a proper scope
		let Scope = C_Scope;
		if (!Scope.node.is_in_scope(this, ['isFunc'])) {
			TT += "Error, this block must be inside of a function or main.\n";
		}
		//End Scope check

		if (TT.length > 0) {
			this.setWarningText(TT);
		}
		else {
			this.setWarningText(null);
		}
	}
};

Blockly.C['stack_push'] = function (block) {
	var val1 = Blockly.C.valueToCode(this, 'valinp2', Blockly.C.ORDER_ATOMIC);
	var code = "";

	if (this.getVar_.length > 0 && val1.length > 0) {
		code += this.getVar_ + ".push(" + val1 + ");\n";
	}

	return code;
};

Blockly.Blocks['stack_pop'] = {
	init: function () {

		this.appendValueInput('valinp1')
			.setCheck(null);

		this.appendDummyInput()
			.appendField(".pop()");


		this.setOutput(false);
		this.setPreviousStatement(true);
		this.setNextStatement(true);
		this.setColour(stackHUE);
		this.setTooltip("");
		this.setHelpUrl("");
	},

	onchange: function () {
		this.allocateValues();
		this.allocateWarnings();
	},

	//Initialize variables
	allocateValues: function () {
		//Set variable to left input
		this.getVar_ = Blockly.C.valueToCode(this, 'valinp1', Blockly.C.ORDER_NONE);
		this.typeName_ = "";

		let ptr = this.parentBlock_;

		while (ptr) {

			if (ptr.getDataStr() === "isSta" && this.getVar_ === ptr.getVar_) {
				this.typeName_ = ptr.typeName_;
			}

			ptr = ptr.parentBlock_;
		}
	},

	allocateWarnings: function () {
		let C = C_Logic;

		var TT = "";

		//If there is no left connection
		if (!this.parentBlock_) {
			TT += 'Block Error, this block has a return and must be connected.\n';
		}

		//If there is a variable
		if (this.getVar_.length > 0) {
			//If a block is connected

		}
		//If there is not a variable
		else {
			TT += 'Error, a stack variable is required.\n';
		}

		//Check if this block is in a proper scope
		let Scope = C_Scope;
		if (!Scope.node.is_in_scope(this, ['isFunc'])) {
			TT += "Error, this block must be inside of a function or main.\n";
		}
		//End Scope check

		if (TT.length > 0) {
			this.setWarningText(TT);
		}
		else {
			this.setWarningText(null);
		}
	}
};

Blockly.C['stack_pop'] = function (block) {
	var val1 = Blockly.C.valueToCode(this, 'valinp2', Blockly.C.ORDER_ATOMIC);
	var code = "";

	if (this.getVar_.length > 0) {
		code += this.getVar_ + ".pop();\n";
	}

	return code;
};
