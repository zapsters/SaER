//SaER is a fictional entity, created by me, Erin B, or screen name "Zapster" / "Zapsters".

// Static Variables - Change Freely
var version = "Beta0.2.6 DEVELOPMENT";
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
// THE BRAINS!!! Delivery Function
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
	if (commandinput == "" || commandinput == " ") {} else {
		COMMANDHISTORY.push(commandinput);
	}

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

function inputCommand(command) {
	
}

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
		var rawinput = document.getElementById('input').value;
		var commandinput = rawinput.toUpperCase();
		if (commandinput != "" && typeof commandinput != 'undefined' && commandinput != " " && COMNUM == COMMANDHISTORY.length) {
			COMNUM = COMMANDHISTORY.length + 1;
		}
		
		//Reset the current command number, so you can press up to go to the last command.
		COMNUM = 1 + COMMANDHISTORY.length;
		
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
				var commands = "COMMANDS<br> VAR (variable) (true/false/read/set) [value] - Change a local veriable.<br>COPYRIGHT - Print copyright information<br>PRINT (File Name) - Print from text file<br>RUN (File Name) - Search for and run a file on SaER servers.<br>CLEAR - Clear console log<br> VERSION - Prints the current version of the SaER OFFICIAL CONSOLE.";
                delivery(10, commands);
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
				//Read the filename
				var input_file = printarray[1];
				if (typeof input_file == 'undefined') {
					delivery(10, "Error - blank file name. [" + "PRINT" + " (FILE NAME)")
				} else if (Unlockedfiles.includes(input_file)) {
					printcommand(input_file)
				} else {
					delivery(10, "File not found.")
				}
				break;
			case "COPYRIGHT":
                delivery(10, COPYRIGHT1 + " - " + COPYRIGHT2)
                break;

			//The run command gets one variable and passes it onto the runcommand(input_file)
			case "RUN":
				var runarray = commandinput.split(/(\s+)/).filter(function(e) {
					return e.trim().length > 0;
				});
				//console.log(runarray); // ["RUN", "(FILENAME)"]
				//Read the filename
				var input_file = runarray[1];
				if (typeof input_file == 'undefined') {
					delivery(10, "Error - blank file name. [" + "RUN" + " (FILE NAME)")
				} else {
					runcommand(input_file)
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
}
		
//Function ran with the "Print [file]" command.
function printcommand(file) {
	switch (file) {
		case "VERSION":
			delivery(10, "version.txt<br> - " + version + " - " + versionSUB)
			break;
		default:
			delivery(10, "ERROR - File exists, but can not be read. Insufficient Access Level?");
			break;
		}
}

//Function ran with the "Ran [file]" command.
function runcommand(file) {
	switch (file) {
		case "ASTRO.EXE":
			delivery(10, "astro.exe<br> - BLOCKED FILE - Suspicious activity detected on your ip address. You IP has been logged.")
			break;
		default:
			delivery(10, "ERROR - File could not be found.");
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