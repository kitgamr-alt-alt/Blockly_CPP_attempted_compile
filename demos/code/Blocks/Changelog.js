'use strict';

//Function for readme button
function updateLog(){
	var code = Blockly.C.workspaceToCode(Blockly.getMainWorkspace());
	document.getElementById('code').value = code;
}


//Function to download code
function downloadCode() {
	var code = Blockly.C.workspaceToCode();
	var codeArray = [];
	codeArray.push(code);
	
	var codeBlob = new Blob(codeArray, {type: "text/plain;charset=utf-8"});
	saveAs(codeBlob, "main.cpp");
}

function test1() {
    // 이미지 경로를 여기에 입력
    var imageUrl = "../../media/005.png";
    // 새 창 열기
    var newWindow = window.open('', 'Example using I/O');

    // 이미지 요소 생성
    var imageElement = document.createElement("img");

    // 이미지 속성 설정
    imageElement.src = imageUrl;
    imageElement.alt = "변수, 입출력 활용 문제";

    // 이미지를 새 창에 추가
    newWindow.document.body.appendChild(imageElement);
}

function test2() {
    // 이미지 경로를 여기에 입력
    var imageUrl = "../../media/006.png";
    // 새 창 열기
    var newWindow = window.open('', 'Example using string');

    // 이미지 요소 생성
    var imageElement = document.createElement("img");

    // 이미지 속성 설정
    imageElement.src = imageUrl;
    imageElement.alt = "문자열 활용 문제";

    // 이미지를 새 창에 추가
    newWindow.document.body.appendChild(imageElement);
}

function test3() {
    // 이미지 경로를 여기에 입력
    var imageUrl = "../../media/007.png";
    // 새 창 열기
    var newWindow = window.open('', 'Example using if');

    // 이미지 요소 생성
    var imageElement = document.createElement("img");

    // 이미지 속성 설정
    imageElement.src = imageUrl;
    imageElement.alt = "if문 활용 문제";

    // 이미지를 새 창에 추가
    newWindow.document.body.appendChild(imageElement);
}

function test4() {
    // 이미지 경로를 여기에 입력
    var imageUrl = "../../media/008.png";
    // 새 창 열기
    var newWindow = window.open('', 'Example using switch');

    // 이미지 요소 생성
    var imageElement = document.createElement("img");

    // 이미지 속성 설정
    imageElement.src = imageUrl;
    imageElement.alt = "switch문 활용 문제";

    // 이미지를 새 창에 추가
    newWindow.document.body.appendChild(imageElement);
}

function test5() {
    // 이미지 경로를 여기에 입력
    var imageUrl = "../../media/009.png";
    // 새 창 열기
    var newWindow = window.open('', 'Example using while/for');

    // 이미지 요소 생성
    var imageElement = document.createElement("img");

    // 이미지 속성 설정
    imageElement.src = imageUrl;
    imageElement.alt = "while, for문 활용 문제";

    // 이미지를 새 창에 추가
    newWindow.document.body.appendChild(imageElement);
}

function test6() {
    // 이미지 경로를 여기에 입력
    var imageUrl = "../../media/010.png";
    // 새 창 열기
    var newWindow = window.open('', 'Example using function');

    // 이미지 요소 생성
    var imageElement = document.createElement("img");

    // 이미지 속성 설정
    imageElement.src = imageUrl;
    imageElement.alt = "함수활용 문제";

    // 이미지를 새 창에 추가
    newWindow.document.body.appendChild(imageElement);
}

function test7() {
    // 이미지 경로를 여기에 입력
    var imageUrl = "../../media/011.png";
    // 새 창 열기
    var newWindow = window.open('', 'Example using class');

    // 이미지 요소 생성
    var imageElement = document.createElement("img");

    // 이미지 속성 설정
    imageElement.src = imageUrl;
    imageElement.alt = "class활용 문제";

    // 이미지를 새 창에 추가
    newWindow.document.body.appendChild(imageElement);
}

function test8() {
    // 이미지 경로를 여기에 입력
    var imageUrl = "../../media/012.png";
    // 새 창 열기
    var newWindow = window.open('', 'Example using struct');

    // 이미지 요소 생성
    var imageElement = document.createElement("img");

    // 이미지 속성 설정
    imageElement.src = imageUrl;
    imageElement.alt = "struct활용 문제";

    // 이미지를 새 창에 추가
    newWindow.document.body.appendChild(imageElement);
}

function test9() {
    // 이미지 경로를 여기에 입력
    var imageUrl = "../../media/013.png";
    // 새 창 열기
    var newWindow = window.open('', 'Example using array, vector');

    // 이미지 요소 생성
    var imageElement = document.createElement("img");

    // 이미지 속성 설정
    imageElement.src = imageUrl;
    imageElement.alt = "attay, vector활용 문제";

    // 이미지를 새 창에 추가
    newWindow.document.body.appendChild(imageElement);
}

function test10() {
    // 이미지 경로를 여기에 입력
    var imageUrl = "../../media/001.png";
    // 새 창 열기
    var newWindow = window.open('', 'Example using stack');

    // 이미지 요소 생성
    var imageElement = document.createElement("img");

    // 이미지 속성 설정
    imageElement.src = imageUrl;
    imageElement.alt = "stack활용 문제";

    // 이미지를 새 창에 추가
    newWindow.document.body.appendChild(imageElement);
}

function test11() {
    // 이미지 경로를 여기에 입력
    var imageUrl = "../../media/002.png";
    // 새 창 열기
    var newWindow = window.open('', 'Example using queue');

    // 이미지 요소 생성
    var imageElement = document.createElement("img");

    // 이미지 속성 설정
    imageElement.src = imageUrl;
    imageElement.alt = "queue활용 문제";

    // 이미지를 새 창에 추가
    newWindow.document.body.appendChild(imageElement);
}

function test12() {
    // 이미지 경로를 여기에 입력
    var imageUrl = "../../media/003.png";
    // 새 창 열기
    var newWindow = window.open('', 'Example using deque');

    // 이미지 요소 생성
    var imageElement = document.createElement("img");

    // 이미지 속성 설정
    imageElement.src = imageUrl;
    imageElement.alt = "deque활용 문제";

    // 이미지를 새 창에 추가
    newWindow.document.body.appendChild(imageElement);
}

function test13() {
    // 이미지 경로를 여기에 입력
    var imageUrl = "../../media/004.png";
    // 새 창 열기
    var newWindow = window.open('', 'Example using pointer');

    // 이미지 요소 생성
    var imageElement = document.createElement("img");

    // 이미지 속성 설정
    imageElement.src = imageUrl;
    imageElement.alt = "pointer활용 문제";

    // 이미지를 새 창에 추가
    newWindow.document.body.appendChild(imageElement);
}

//function to load
function readFile(input){

	let file = input.files[0];
	
	let reader = new FileReader();
	
	reader.readAsText(file);
	
	reader.onload = function(){
		Blockly.mainWorkspace.clear();
		
		let saveXML = reader.result;

		let textToDom = Blockly.Xml.textToDom(saveXML);
		Blockly.Xml.domToWorkspace(textToDom, Blockly.mainWorkspace);
	};
	
	reader.onerror = function() {
		console.log(reader.error);
	};
	
}



//Function to save
function downloadXML() {
	//Grab the workspace XML
	let codeXML = Blockly.Xml.workspaceToDom(Blockly.mainWorkspace);
	
	//Prettify the XML
	let saveXML = Blockly.Xml.domToPrettyText(codeXML);
	
	var codeArray = [];
	codeArray.push(saveXML);

	console.log(Blockly.mainWorkspace);

	console.log(saveXML);
	
	//Get current date, used to make sure no save file with overwrite another
	
	var today = new Date();
	
	var time = today.getHours() + "-" + today.getMinutes() + "-" + today.getSeconds();
	
	var codeBlob = new Blob(codeArray, {type: "text/plain;charset=utf-8"});
	saveAs(codeBlob, "blockly save " + time + ".txt");
}










