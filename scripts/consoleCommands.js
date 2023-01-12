//SaER is a fictional entity, created by me, Erin B, or screen name "Zapster" / "Zapsters".

// Static Variables - Change Freely
var version = "Beta0.8 DEVELOPMENT";
var versionSUB = "Project Astro";

var COPYRIGHT1 = "SaER Copyright 2021";
var COPYRIGHT2 = "SaER logo above, Websites, and other media are owned and claimed by Science and Entity Research";
var ACCESSLEVEL = 0;
var DEV = false;

//Variables used by Variable command
var Unlockedvars = ["DEV", "ACCESSLEVEL"];
//Files that can be read by using Print command
var Unlockedfiles = ["VERSION", "ASTRO", "FAIL"];

//
// THE BRAINS!!
//
function inputCommand(command) {
	//var rawinput = document.getElementById('input').value;
	var rawinput = command;
	var commandinput = rawinput.toUpperCase();
	if (commandinput != "" && typeof commandinput != 'undefined' && commandinput != " " && COMNUM == COMMANDHISTORY.length) {
		COMNUM = COMMANDHISTORY.length + 1;
	}
	
	COMMANDHISTORY.push(command);
	//Reset the current command number, so you can press up to go to the last command.
	COMNUM = COMMANDHISTORY.length;
	
	//COMMAND LOGIC -------------------------------------------------------------------------------------------------------------XXXX
	//NEW METHOD --- Makes input capital and reads the first word to run that command.
	function getFirstWord(str) {
		let spaceIndex = str.indexOf(' ');
		return spaceIndex === -1 ? str : str.substr(0, spaceIndex);
	};
	
	var commandfirstword = getFirstWord(commandinput);
	switch (commandfirstword) {
		case "HELP":
			document.getElementById("topdivtext").innerHTML = "Printing Help Receipt";
			document.getElementById("botdivtext").innerHTML = "";
			document.getElementById("input").value = "";
			//help commands
			var commands = ["COMMANDS",
			"CLEAR - Clear console log", 
			"VERSION - Prints the current version of the SaER CONSOLE Software.",
			"COPYRIGHT - Print copyright information",
			"PRINT [File Name] - Print from text file. (DEPRECATED AS OF BETA 0.8)",
			"OPEN [File Name] - Search for and open a file on SaER servers. [File Name] should include extensions (.txt, .exe, etc.) and no spaces.",
			"VAR [variable] [true/false/read/set] (value) - Used more for debug testing.",
			];
			delivery(10, commands.join("<br>&nbsp;&nbsp;&nbsp;"));
			break;
		case "CLEAR":
			document.getElementById("log").innerHTML = "";
			delivery(1);
			break;
		case "VERSION":
			var versiontext = version.toString() + " - - - [" + versionSUB.toString() + "]";
			delivery(10, versiontext);
			break;
		case "VAR":
			//var onlyvariable = commandinput.replace("VAR", '');
			var variablearray = commandinput.split(/(\s+)/).filter(function(e) {
				return e.trim().length > 0;
			});
			//console.log(variablearray); // ["VAR", "(VARIABLE)", "TRUE/FALSE/READ"] 
			//(PRINTS ARRAY IN CONSOLE)
			
			//Read the inputed variable
			var INPUT_VAR = variablearray[1];
			//Read the 3rd term - The action to be preformed (True/False/Read)
			var THIRD_TERM = variablearray[2];
			var FORTH_TERM = variablearray[3];
			if (typeof INPUT_VAR == 'undefined') {
				delivery(10, "Error - blank variable. [ VAR (VARIABLE) (TRUE/FALSE/READ)]")
			} else if (typeof THIRD_TERM == 'undefined') {
				delivery(10, "Error - no action input. [ VAR (VARIABLE) (TRUE/FALSE/READ)]")
			} else if (THIRD_TERM == "READ") {
				//READ VARIABLE
				delivery(10, "Variable '" + INPUT_VAR.toString() + "' is " + window[INPUT_VAR.toString()] + ".")
			} else if (THIRD_TERM == "TRUE") {
				if(DEV) {
					//If dev is true, set the variable no matter what.
					window[INPUT_VAR] = 1;
					delivery(10, "Variable '" + INPUT_VAR.toString() + "' has been set to " + window[INPUT_VAR.toString()] + ".")
				} else {
					//Check Unclockvars for the variable trying to be changed, if it is there, change it. 
					if (Unlockedvars.includes(INPUT_VAR)) {
						window[INPUT_VAR] = 1;
						delivery(10, "Variable '" + INPUT_VAR.toString() + "' has been set to " + window[INPUT_VAR.toString()] + ".")
					} else {
						delivery(10, "Variable '" + INPUT_VAR.toString() + "' can not be changed.")
					}
				}
			} else if (THIRD_TERM == "FALSE") {
				if(DEV) {
					window[INPUT_VAR] = 0;
					delivery(10, "Variable '" + INPUT_VAR.toString() + "' has been set to " + window[INPUT_VAR.toString()] + ".")
				} else {
					if (Unlockedvars.includes(INPUT_VAR)) {
						window[INPUT_VAR] = 0;
						delivery(10, "Variable '" + INPUT_VAR.toString() + "' has been set to " + window[INPUT_VAR.toString()] + ".")
					} else {
						delivery(10, "Variable '" + INPUT_VAR.toString() + "' can not be changed.")
					}
				}
			} else if (THIRD_TERM == "SET") {
				switch(FORTH_TERM) {
					case "TRUE":
						delivery(10, "ERROR USE THE COMMAND ' VAR " + INPUT_VAR.toString() + " TRUE'")
						break;
						case "FALSE":
							delivery(10, "ERROR USE THE COMMAND ' VAR " + INPUT_VAR.toString() + " FALSE'")
						break;
					default:
						if(DEV) {
							window[INPUT_VAR] = FORTH_TERM;
							delivery(10, "Variable '" + INPUT_VAR.toString() + "' has been set to " + window[INPUT_VAR.toString()] + ".")
							break;
						} else {
							if (Unlockedvars.includes(INPUT_VAR)) {
								window[INPUT_VAR] = FORTH_TERM;
								delivery(10, "Variable '" + INPUT_VAR.toString() + "' has been set to " + window[INPUT_VAR.toString()] + ".")
							} else {
								delivery(10, "Variable '" + INPUT_VAR.toString() + "' can not be changed.")
							}
							break;
						}
					}
				} else if (THIRD_TERM !== "TRUE" || THIRD_TERM !== "FALSE" || THIRD_TERM !== "READ") {
					delivery(10, "Error - " + "VAR" + " (VARIABLE) (TRUE/FALSE/READ) [VALUE]")
				}
				break;
				
		case "PRINT":
			//var onlyvariable = commandinput.replace("VAR", '');
			var printarray = commandinput.split(/(\s+)/).filter(function(e) {
				return e.trim().length > 0;
			});

			//console.log(printarray); // ["PRINT", "(FILENAME)"]
			var input_file = printarray[1];
			if(input_file != undefined) {
				printcommand(input_file);
			} else {
				delivery(10, "Missing filename. 'print [filename]'");
			}
			break;

		case "COPYRIGHT":
			delivery(10, COPYRIGHT1 + " - " + COPYRIGHT2)
			break;

		//The OPEN command gets one variable and passes it onto the opencommand(input_file)
		case "OPEN":
			var runarray = commandinput.split(/(\s+)/).filter(function(e) {
				return e.trim().length > 0;
			});
			//console.log(runarray); // ["RUN", "(FILENAME)"]
			var input_file = runarray[1];
			if(input_file != undefined) {
				opencommand(input_file);
			} else {
				delivery(10, "Missing filename. 'open [filename]'");
			}
			break;
		
		case "ASTRO.EXE":
			delivery(11, "Connection Terminated");
			break;
		case "PRIDE":
			document.getElementById("logo").src = "images/SaERLogoGlitchPride.gif";
			delivery(1)
			break;
		
		//Ran if the command isn't recognized
		default:
			delivery(0);
			document.getElementById("topdivtext").innerHTML = "";
			document.getElementById("botdivtext").innerHTML = "";
			document.getElementById("input").value = "";
			break;
	}
}


//
// Delivery Function
//
function delivery(type, textinput) {
	//GET CURRENT DATE / TIME (UNFORMATED)
	var today = new Date();
	var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
	//FORMAT MINUTES & SECONDS
	var minutes = today.getMinutes();
	if (minutes >= 0 && minutes < 10) {
		var minutes = "0" + minutes;
	}
	
	var seconds = today.getSeconds();
	if (seconds >= 0 && seconds < 10) {
		var seconds = "0" + seconds;
	}
	
	//REDEFINE TIME (FORMATTED)
	var time = today.getHours() + ":" + minutes + ":" + seconds;
	var rawinput = document.getElementById('input').value;
	
	//Get command input
	var commandinput = rawinput.toUpperCase();

	//Text delivery!
	switch (type) {
		case 0:
			//Unkown Command
			if (commandinput == "" || commandinput == " ") {} else {
				var para = document.createElement("P");
				para.innerHTML = "[" + time + "] > '" + commandinput + "' is an unkown command. See help command.";
				document.getElementById("log").appendChild(para);
				var element = document.getElementById("log");
				element.scrollTop = element.scrollHeight;
				document.getElementById("input").value = "";
			}
			break;
		case 1:
			// [TIME] (CommandInput)
			var para = document.createElement("P");
			para.innerHTML = "[" + time + "] > " + commandinput + "";
			document.getElementById("log").appendChild(para);
			var element = document.getElementById("log");
			element.scrollTop = element.scrollHeight;
			document.getElementById("input").value = "";
			break;
		case 10:
			// [TIME] (Custom text in var B)
			var para = document.createElement("P");
			para.innerHTML = "[" + time + "] > " + textinput;
			document.getElementById("log").appendChild(para);
			var element = document.getElementById("log");
			element.scrollTop = element.scrollHeight;
			document.getElementById("input").value = "";
			break;
		case 11:
			//Blank Screen with text
			document.body.style.visibility = "hidden";
			document.getElementById("topdivtext").style.visibility = "visible";
			document.getElementById("topdivtext").innerHTML = "" + textinput;
			break;
	}
}
//Call delivery() after a delay.
function deliveryAfterDelay(type, input, delay) {
	setTimeout(function() {
		delivery(type, input);
	}, delay);
}
//Check for the keys like the enter key. Calls the inputCommand function. 
document.onkeydown = logKey;
function logKey(e) {
	//Up arrow last command.
	if (e.keyCode === 38) {
		if (COMNUM > 0) {
			COMNUM = COMNUM - 1;
			document.getElementById("input").value = COMMANDHISTORY[COMNUM];
		}
	}
	//Down arrowd
	if (e.keyCode === 40) {
		if (COMNUM < COMMANDHISTORY.length - 1) {
			COMNUM = COMNUM + 1;
			document.getElementById("input").value = COMMANDHISTORY[COMNUM];
		} else if (COMNUM + 1 == COMMANDHISTORY.length) {
			COMNUM = COMNUM + 1;
			document.getElementById("input").value = "";
		}
	}
	//Enter Key
	if (e.keyCode === 13) {
		inputCommand(document.getElementById("input").value);
	}
}
		
//Function ran with the "Print [file]" command.
function printcommand(file) {
	switch (file) {
		case "ERROR2":
			delivery(10, "[version.txt]<br>" + version + " - " + versionSUB)
			break;
		default:
			delivery(10, "ERROR - File not found by name '" + file + "'. <br> This command is depricated, use the 'OPEN' command instead.");
			break;
		}
}

//Function ran with the "Open [file]" command.
function opencommand(file) {
	switch (file) {
		case "ASTRO.EXE":
			delivery(10, "KEYWORD DETECTED. Suspicious activity has been detected on your ip address. Your IP has been logged.");
			break;
		case "VERSION.TXT":
			delivery(10, "[version.txt]<br>" + version + " - " + versionSUB)
			break;
		case "TEST.TXT":
			delivery(10, "[test.txt]<br>" + " This is a test!")
			break;
		default:
			delivery(10, "ERROR - File not found by name '" + file + "'.");
			break;
	}	
}
	
//ONLOAD, "connect" to servers.
var COMNUM = -1;
var COMMANDHISTORY = [];
function onLoad() {
	//Set Text
	//var COPYRIGHT1 = "SaER Copyright 2020"
	document.getElementById("BtmTextTop").innerHTML = COPYRIGHT1;
	//var COPYRIGHT2 = "SaER logo above, Websites, and other media are owned and claimed by Science and Entity Research"
	document.getElementById("BtmTextBtm").innerHTML = COPYRIGHT2;

	deliveryAfterDelay(10, "Connecting to SaER Servers...", 500);
	deliveryAfterDelay(10, "Connection Established!", 1230);
	deliveryAfterDelay(10, "_________________________________", 1430);
	deliveryAfterDelay(10, "[Login Required] Use the LOGIN command. --- LOGIN (USERNAME) (PASSWORD)", 1450);
	deliveryAfterDelay(10, "_________________________________", 1480);
	//Set Command Number for command history.  
	COMNUM = COMMANDHISTORY.length;
	if (typeof COMNUM == 'undefined') {
		COMNUM = COMMANDHISTORY.length;
	}
}

//Get URL Variables Function
function getUrlVars() {
    var vars = {};
    var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m, key, value) {
        vars[key] = value;
    });
    return vars;
}