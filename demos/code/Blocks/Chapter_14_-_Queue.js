var queueHUE = 424;


Blockly.Blocks['queue'] = {
	init: function () {
		this.appendDummyInput()
			.appendField("queue<")
			.appendField(new Blockly.FieldDropdown([["int", "int"], ["size_t", "size_t"], ["double", "double"], ["char", "char"], ["string", "string"], ["bool", "bool"]]), "myQueType")
			.appendField(">")
			.appendField(new Blockly.FieldTextInput("myQue"), "myQueDef")
			.appendField('', 'init');


		this.setInputsInline(true); //�Է� ���ηι迭 ���
		this.setPreviousStatement(true, null);//�������ϰ� ���� ���
		this.setNextStatement(true, null);//�������ϰ� ���� ���
		this.setColour(queueHUE);
		this.setTooltip("A queue is like an stack; it can store and access data. Unlike an stack, its FIFO type.");
		this.setHelpUrl('');

		//���ϼӼ� �ʱ�ȭ
		this.typeName_ = this.getField('myQueType').getText();//������ Ÿ�� ����
		this.getVar_ = this.getField('myQueDef').getText();//�����̸� ����

		this.size_ = 0;//ũ���ʱ�ȭ

		this.isInitialized_ = false;//�ʱ�ȭ ���� Ȯ��

		//������ ������ ť�� ������.
		this.setDataStr("isQue", true);

		this.varProp_ = [];//�����Ӽ��� �����ϴ� �迭�� �ʱ�ȭ

	},

	onchange: function () {

		this.allocateValues(); // allocateValues �Լ��� ȣ���մϴ�.
		this.allocateWarnings(); // allocateWarnings �Լ��� ȣ���մϴ�.
	},

	//����ڿ� ���� ���� ��ȣ�ۿ��� ���� �ʵ� ������ ������ ó���ϰ�, �� ���� �������� ������ ������ �����ϴ� ����
	allocateValues: function () {
		this.typeName_ = this.getField('myQueType').getText(); // myQueType �ʵ��� �ؽ�Ʈ�� typeName_ ������ �����մϴ�.
		this.getVar_ = this.getField('myQueDef').getText(); // myQueDef �ʵ��� �ؽ�Ʈ�� getVar_ ������ �����մϴ�.

		if (this.size_ > 0) { // ���� size_ ������ 0���� ũ�ٸ�:
			this.isInitialized_ = true; // isInitialized_ ������ true�� �����մϴ�.
		}
		else {
			this.isInitialized_ = false; // �׷��� ������ isInitialized_ ������ false�� �����մϴ�.
		}
		if (this.isInitialized_) { // ���� isInitialized_ ������ true�̸�:
			this.setFieldValue('= {', 'init'); // 'init' �ʵ��� ���� '= {'�� �����մϴ�.
		}
		else {
			this.setFieldValue('', 'init'); // �׷��� ������ 'init' �ʵ��� ���� �� ���ڿ��� �����մϴ�.
		}

		// constant, type, pointer, variable ������ varProp_ �迭�� �����մϴ�.
		this.varProp_[0] = false; // ��� ���θ� ��Ÿ���� ���� (false)
		this.varProp_[1] = this.typeName_; // ������ Ÿ�� ����
		this.varProp_[2] = ""; // ������ ����
		this.varProp_[3] = this.getVar_; // ������ �̸� ����

	},


	allocateWarnings: function () {
		var TT = ""; // ��� �޽����� �����ϴ� �����Դϴ�.

		for (var i = 1; i <= this.size_; ++i) { // 1���� size_ ���� �ݺ��մϴ�.
			let block = this.getInputTargetBlock('valinp' + i); // valinp1, valinp2 ���� �Է¿� ����� ������ �����ɴϴ�.

			if (block) { // ������ �����ϴ� ���:
				if (this.typeName_ !== block.typeName_) { // ������ Ÿ���� ���� ������ Ÿ�԰� �ٸ� ���:
					TT += 'Error, input #' + i + ' is of type "' + block.typeName_ + '", must be of type: "' + this.typeName_ + '".\n'; // ���� �޽����� �����Ͽ� TT ������ �߰��մϴ�.
				}
			}
		}

		// <string>�� <vector> ���̺귯���� ���� ���θ� Ȯ���մϴ�.

		// C_Include Ŭ������ �ν��Ͻ��� �����մϴ�.
		var librarySearch = C_Include;

		// 'include_queue'�� �˻��Ͽ� ���̺귯���� �߰ߵǾ����� Ȯ���մϴ�.
		var libFoundQueue = librarySearch.search_library(this, ['include_queue']);
		// 'include_string'�� �˻��Ͽ� ���̺귯���� �߰ߵǾ����� Ȯ���մϴ�.
		var libFoundString = librarySearch.search_library(this, ['include_string']);

		if (!libFoundQueue) { // <queue> ���̺귯���� �߰ߵ��� ���� ���:
			TT += "Error, <queue> library must be included.\n"; // ���� �޽����� TT ������ �߰��մϴ�.
		}

		if (this.typeName_ === "string" && !libFoundString) { // Ÿ���� "string"�̰� <string> ���̺귯���� �߰ߵ��� ���� ���:
			TT += "Error, <string> library must be included.\n"; // ���� �޽����� TT ������ �߰��մϴ�.
		}

		// ���̺귯�� üũ ���� ����

		if (TT.length > 0) { // TT ������ ����� ��� �޽����� ���̰� 0���� ū ��� (��, ��� �޽����� �����ϴ� ���):
			this.setWarningText(TT); // ��� �޽����� ���Ͽ� �����մϴ�.
		}
		else { // ��� �޽����� ���� ���:
			this.setWarningText(null); // ������ ��� �޽����� ���۴ϴ�.
		}

	}
};

Blockly.C['queue'] = function (block) {
	// 'valinp0'�� ����� ������ �ڵ带 �����ϰ�, �� ���� val0�� �����մϴ�.
	var val0 = Blockly.C.valueToCode(block, 'valinp0', Blockly.C.ORDER_ATOMIC);

	// 'myQueType' �ʵ忡�� ���õ� ������ ������ �����ͼ� type�� �����մϴ�. �̰��� ť�� ������ ������ ��Ÿ���ϴ�.
	var type = this.getField('myQueType').getText();

	// 'C_Include'�� 'C'�� ��Ī �����մϴ�.
	C = C_Include;

	// ������ C++ �ڵ带 ������ ������ �ʱ�ȭ�մϴ�.
	var code = '';

	// 'std'�� �� ���ڿ��� �ʱ�ȭ�մϴ�.
	var std = '';

	// ���� 'std' ���ӽ����̽��� ������ �ʾҴٸ� 'std::'�� ���Դϴ�.
	if (!C.using.std(block)) {
		std = 'std::';
	}

	// queue�� ����κ��� �����մϴ�.
	code += std + 'queue<';

	// ������ Ÿ���� 'string'�� ��� 'std::'�� �߰��մϴ�.
	if (type === 'string') {
		code += std;
	}

	// ť �������� �߰��մϴ�.
	code += type + '> ' + this.getVar_;

	// ���� �ʱⰪ�� �����Ѵٸ� �ʱ�ȭ ����� �����մϴ�.
	if (this.size_ > 0) {
		code += ' = {';

		// �ʱⰪ�� �ִ� ���, �ش� ���� �ʱ�ȭ ��Ͽ� �߰��մϴ�.
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

	// �ڵ� ������ �κ��� �߰��մϴ�.
	code += ';\n';

	// ������ C++ �ڵ带 ��ȯ�մϴ�.
	return code;
};


Blockly.Blocks['queue_size'] = {
	init: function () {
		// 'valinp1'�� ����� ������ �޾ƿ� �� �ֵ��� �����մϴ�.
		this.appendValueInput('valinp1')
			.setCheck(null);

		// �ؽ�Ʈ�� �߰��� �� �ִ� ���� �Է� ������ �����մϴ�.
		this.appendDummyInput()
			.appendField(".size()");

		// �� ������ ���� ��ȯ�ϹǷ� setOutput(true)�� �����մϴ�.
		this.setOutput(true);

		// ������ ������ �����մϴ�.
		this.setColour(queueHUE);

		// ������ ���� URL�� �����մϴ�.
		this.setTooltip("Returns the number of elements in the queue.");
		this.setHelpUrl("");

		// typeName_ ������ ������ ������ �����մϴ�.
		this.typeName_ = "size_t";

		// �� ������ ���� �������� ������ �����ϹǷ� isGetter_�� true�� �����մϴ�.
		this.isGetter_ = true;
	},

	onchange: function() {
		this.allocateValues();
		this.allocateWarnings();
	},

//Initialize variables
	allocateValues: function() {
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
			TT += 'Error, a queue variable is required.\n';
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

Blockly.C['queue_size'] = function (block) {
	var code = "";

	if (this.getVar_.length > 0) {
		code += this.getVar_ + ".size()";
	}

	return [code, Blockly.C.ORDER_ATOMIC];
};

Blockly.Blocks['queue_front'] = {
	init: function () {

		this.appendValueInput('valinp1')
			.setCheck(null);

		this.appendDummyInput()
			.appendField(".front()");

		this.setOutput(true);
		this.setColour(queueHUE);
		this.setTooltip("Returns the nth position in the queue.");
		this.setHelpUrl("https://www.cplusplus.com/reference/vector/vector/at/");

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
		this.typeName_ = "";

		//Traverse the block tree to find the type of the vector
		let ptr = this.parentBlock_;

		while (ptr) {

			if (ptr.getDataStr() === "isQue" && this.getVar_ === ptr.getVar_) {
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

		}
		//If there is not a variable
		else {
			TT += 'Error, a queue variable is required.\n';
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

Blockly.C['queue_front'] = function (block) {
	var code = "";

	if (this.getVar_.length > 0) {
		code += this.getVar_ + ".front()";
	}

	return [code, Blockly.C.ORDER_ATOMIC];
};


Blockly.Blocks['queue_back'] = {
	init: function () {

		this.appendValueInput('valinp1')
			.setCheck(null);

		this.appendDummyInput()
			.appendField(".back()");

		this.setOutput(true);
		this.setColour(queueHUE);
		this.setTooltip("Returns the nth position in the queue.");
		this.setHelpUrl("https://www.cplusplus.com/reference/vector/vector/at/");

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
		this.typeName_ = "";

		//Traverse the block tree to find the type of the vector
		let ptr = this.parentBlock_;

		while (ptr) {

			if (ptr.getDataStr() === "isQue" && this.getVar_ === ptr.getVar_) {
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

		}
		//If there is not a variable
		else {
			TT += 'Error, a vector variable is required.\n';
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

Blockly.C['queue_back'] = function (block) {
	var code = "";

	if (this.getVar_.length > 0) {
		code += this.getVar_ + ".back()";
	}

	return [code, Blockly.C.ORDER_ATOMIC];
};

Blockly.Blocks['queue_push'] = {
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
		this.setColour(queueHUE);
		this.setTooltip("Returns the nth position in the queue.");
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

		//Traverse the block tree to find the type of the vector
		let ptr = this.parentBlock_;

		while (ptr) {

			if (ptr.getDataStr() === "isQue" && this.getVar_ === ptr.getVar_) {
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
			TT += 'Error, a vector variable is required.\n';
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

Blockly.C['queue_push'] = function (block) {
	var val1 = Blockly.C.valueToCode(this, 'valinp2', Blockly.C.ORDER_ATOMIC);
	var code = "";

	if (this.getVar_.length > 0 && val1.length > 0) {
		code += this.getVar_ + ".push(" + val1 + ");\n";
	}

	return code;
};

Blockly.Blocks['queue_pop'] = {
	init: function () {

		this.appendValueInput('valinp1')
			.setCheck(null);

		this.appendDummyInput()
			.appendField(".pop()");


		this.setOutput(false);
		this.setPreviousStatement(true);
		this.setNextStatement(true);
		this.setColour(queueHUE);
		this.setTooltip("Removes the first element in the queue.");
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

		//Traverse the block tree to find the type of the vector
		let ptr = this.parentBlock_;

		while (ptr) {

			if (ptr.getDataStr() === "isQue" && this.getVar_ === ptr.getVar_) {
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
			TT += 'Error, a vector variable is required.\n';
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


Blockly.C['queue_pop'] = function (block) {
	var val1 = Blockly.C.valueToCode(this, 'valinp2', Blockly.C.ORDER_ATOMIC);
	var code = "";

	if (this.getVar_.length > 0) {
		code += this.getVar_ + ".pop();\n";
	}

	return code;
};