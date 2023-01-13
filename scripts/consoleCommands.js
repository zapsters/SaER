//SaER is a fictional entity, created by me, Erin B, or screen name "Zapster" / "Zapsters".

// Static Variables - Change Freely
var version = "Beta0.8.1 DEVELOPMENT";
var versionSUB = "Project Astro";

var COPYRIGHT1 = "SaER Copyright 2021";
var COPYRIGHT2 = "SaER logo above, Websites, and other media are owned and claimed by Science and Entity Research";
var alertColor = "#e30b25";

//Variables used by Variable command
var Unlockedvars = ["version", "versionSUB", "COPYRIGHT1", "COPYRIGHT2", "alertColor"];
//Files that can be read by using Print command
var Unlockedfiles = ["VERSION", "ASTRO", "FAIL"];
var users = [{username:"guest", password:undefined, level:0}, {username:"admin", password:"admin", level:10}];
var login = undefined;

function loginCommand(username, password) {
	//Sort through the users array to find a username matching to password.
	var usernameIdentity = Object.values(users).filter(word => word.username == username.toLowerCase());
	var formattedUsername = username.toLowerCase().charAt(0).toUpperCase() + username.toLowerCase().slice(1);
	console.log(usernameIdentity.password);
	if(usernameIdentity !== undefined && usernameIdentity.length != 0) {
		//If a user exists by that username...
		if(password == usernameIdentity[0].password) {
			login = usernameIdentity;
			delivery(9, "> Logged in as " + usernameIdentity[0].username + "!", alertColor);
			delivery(9, "----------------------------------");
		} else if(usernameIdentity[0].username == "guest") {
			login = usernameIdentity;
			delivery(9, "> Logged in as " + usernameIdentity[0].username + "!", alertColor);
			delivery(9, "----------------------------------");
		} else {
			delivery(9, "Invalid password for " + usernameIdentity[0].username + ".", alertColor);
		}
	} else {
		delivery(9, "There is no user by '" + formattedUsername + "'.", alertColor);
	}
}

//
// THE BRAINS!!
//
function inputCommand(command) {
	//var rawinput = document.getElementById('input').value;
	var commandinput = command;
	if (commandinput != "" && typeof commandinput != 'undefined' && commandinput != " " && COMNUM == COMMANDHISTORY.length) {
		COMNUM = COMMANDHISTORY.length + 1;
	}
	
	delivery(10, command, "black");

	COMMANDHISTORY.push(command);
	//Reset the current command number, so you can press up to go to the last command.
	COMNUM = COMMANDHISTORY.length;
	
	//COMMAND LOGIC -------------------------------------------------------------------------------------------------------------XXXX
	//NEW METHOD --- Makes input capital and reads the first word to run that command.

	//Seperate the input by spaces.
	//console.log(commandarray); // ["First", "(Second)", "(Third)" ...] 
	var commandarray = commandinput.split(/(\s+)/).filter(function(e) {
		return e.trim().length > 0;
	});
	
	//Check if there is a current login. If there isn't, terminate the command.
	if(login == undefined) {
                delivery(9, "SECURITY ISSUE - User is not logged in! See the 'Help Login' command for information.", alertColor);
		return;	
	}
	
	var commandfirstword = commandarray[0];
	switch (commandfirstword.toUpperCase()) {
		case "HELP":
			if(commandarray[1] != undefined && commandarray[1] != "") {
				switch (commandarray[1].toUpperCase()) {
					case "CLEAR":
						delivery(9, "CLEAR");
						delivery(9, "Clears the console.");
						break;
					case "VERSION":
						delivery(9, "VERSION");
						delivery(9, "Displays the current version of the SaER console.");
						break;
					case "COPYRIGHT":
						delivery(9, "COPYRIGHT");
						delivery(9, "Displays the copyright information of SaER.");
						break;
					case "LOGIN":
						delivery(9, "LOGIN [USERNAME] [PASSWORD]");
						delivery(9, "Attempts to login to the SaER console under a recognized user. Not inputting a password or username will return the current user.");
						delivery(9, "Provides higher level access depending on your security ranking. See the tech department for help.");
						delivery(9, "A guest login exists under username 'guest' with no password.");
						break;
					case "PRINT":
						delivery(9, "PRINT [FILE]");
						delivery(9, "[FILE] should include extensions (.txt, .exe, etc.) and no spaces.");
                        			delivery(9, "This command is deprecated.", alertColor);
					break;
						break;
					case "OPEN":
						delivery(9, "OPEN [FILE]");
						delivery(9, "[FILE] should include extensions (.txt, .exe, etc.) and no spaces.");
						break;
					case "VAR":
						delivery(9, "VAR [VARIABLE NAME] [TRUE/FALSE/READ/SET] (VALUE)");
						delivery(9, "Sets a variable in the console state. Mainly used for debug.");
						break;
					default:
                    				delivery(9, "" + commandarray[1] + " is not a recognized command.");
						break;
				}
			} else {
				//help commands
				var commands = ["COMMANDS",
				"CLEAR - Clear console log", 
				"VERSION - Prints the current version of the console.",
				"COPYRIGHT - Print copyright information",
				"LOGIN [USERNAME] [PASSWORD] - Used for authentication.",
				"PRINT [FILE] - Print from text file. (DEPRECATED AS OF BETA 0.8)",
				"OPEN [FILE] - Search for and open a file on SaER servers.",
				"VAR [variable] [true/false/read/set] (value) - Used more for debug testing.",
				];
				delivery(9, commands.join("<br>&nbsp;&nbsp;&nbsp;"));
				delivery(9, "Type HELP [Command] for specific information.");
			}
			break;
		case "CLEAR":
			document.getElementById("log").innerHTML = "";
			delivery(9, "Console cleared");
			break;
		case "LOGIN":
			//commandarray = LOGIN [Username] [Password]
			if(commandarray[1] != undefined) {
				//If a username is given, call the LoginCommand function.
				loginCommand(commandarray[1], commandarray[2]);
			} else {
				//If command is just "LOGIN" print the current user information.
				if(login != undefined) {
					delivery(9, "Currently logged in as " + login[0].username + ".");	
					delivery(9, "DEBUG+Password '" + login[0].password + "'.", alertColor);	
					delivery(9, "DEBUG+Security Level " + login[0].level + ".", alertColor);	
				} else {
					delivery(9, "No user is logged in!");	
				}
			}
			break;
		case "VERSION":
			var versiontext = version.toString() + " - - - [" + versionSUB.toString() + "]";
			delivery(9, versiontext);
			break;
		case "VAR":
			//console.log(commandarray); // ["VAR", "(Variable)", "(True/False/Set/Read)", ...] 
			//Read the inputed variable
			var INPUT_VAR = commandarray[1];
			//Read the 3rd term - The action to be preformed (True/False/Read)
			var THIRD_TERM = commandarray[2];
			var FORTH_TERM = commandarray[3];
			if (typeof INPUT_VAR == 'undefined') {
				delivery(9, "Error - blank variable. [ VAR (VARIABLE) (TRUE/FALSE/READ)]")
			} else if (typeof THIRD_TERM == 'undefined') {
				delivery(9, "Error - no action input. [ VAR (VARIABLE) (TRUE/FALSE/READ)]")
			} else if (THIRD_TERM == "READ") {
				//READ VARIABLE
				delivery(9, "Variable '" + INPUT_VAR.toString() + "' is " + window[INPUT_VAR.toString()] + ".")
			} else if (THIRD_TERM == "TRUE") {
				//Check Unclockvars for the variable trying to be changed, if it is there, change it. 
				if (Unlockedvars.includes(INPUT_VAR)) {
					window[INPUT_VAR] = 1;
					delivery(9, "Variable '" + INPUT_VAR.toString() + "' has been set to " + window[INPUT_VAR.toString()] + ".")
				} else {
					delivery(9, "Variable '" + INPUT_VAR.toString() + "' can not be changed.")
				}
			} else if (THIRD_TERM == "FALSE") {
				if (Unlockedvars.includes(INPUT_VAR)) {
					window[INPUT_VAR] = 0;
					delivery(9, "Variable '" + INPUT_VAR.toString() + "' has been set to " + window[INPUT_VAR.toString()] + ".")
				} else {
					delivery(9, "Variable '" + INPUT_VAR.toString() + "' can not be changed.")
				}
			} else if (THIRD_TERM == "SET") {
				switch(FORTH_TERM) {
					case "TRUE":
						delivery(9, "USE THE COMMAND ' VAR " + INPUT_VAR.toString() + " TRUE'")
						break;
					case "FALSE":
						delivery(9, "USE THE COMMAND ' VAR " + INPUT_VAR.toString() + " FALSE'")
						break;
					default:
						if (Unlockedvars.includes(INPUT_VAR)) {
							window[INPUT_VAR] = FORTH_TERM;
							delivery(9, "Variable '" + INPUT_VAR.toString() + "' has been set to " + window[INPUT_VAR.toString()] + ".")
						} else {
							delivery(9, "Variable '" + INPUT_VAR.toString() + "' can not be changed.")
						}
						break;
					}
				} else if (THIRD_TERM !== "TRUE" || THIRD_TERM !== "FALSE" || THIRD_TERM !== "READ") {
					delivery(9, "Error - " + "VAR" + " (VARIABLE) (TRUE/FALSE/READ) [VALUE]")
				}
				break;
				
		case "PRINT":
			//console.log(commandarray); // ["PRINT", "(FILENAME)"]
			var input_file = commandarray[1];
			if(input_file != undefined) {
				printcommand(input_file);
			} else {
				delivery(9, "Missing filename. 'print [filename]'");
			}
			break;

		case "COPYRIGHT":
			delivery(9, COPYRIGHT1 + " - " + COPYRIGHT2)
			break;

		//The OPEN command gets one variable and passes it onto the opencommand(input_file)
		case "OPEN":
			//console.log(runarray); // ["RUN", "(FILENAME)"]
			var input_file = commandarray[1];
			if(input_file != undefined) {
				opencommand(input_file);
			} else {
				delivery(9, "Missing filename. 'open [filename]'");
			}
			break;
		
		case "ASTRO.EXE":
			delivery(11, "Connection Terminated");
			break;
		case "PRIDE":
			document.getElementById("logo").src = "images/SaERLogoGlitchPride.gif";
			delivery(9, "very prideful.")
			break;
		
		//Ran if the command isn't recognized
		default:
			delivery(0, command);
			document.getElementById("topdivtext").innerHTML = "";
			document.getElementById("botdivtext").innerHTML = "";
			document.getElementById("input").value = "";
			break;
	}
}


//
// Delivery Function
//
function delivery(type, textinput, color) {
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

    if (color === undefined) {
        color = "#000000";
    }
	
	//REDEFINE TIME (FORMATTED)
	var time = today.getHours() + ":" + minutes + ":" + seconds;
	var rawinput = document.getElementById('input').value;

	//Text delivery!
	switch (type) {
		case 0:
			//Unkown Command
			if (textinput != "" && textinput != " ") {
				var para = document.createElement("P");
				para.innerHTML = "'" + textinput + "' is not recognized as an internal or externam command.";
				para.className = "responseText";
				para.style.color = color;
				document.getElementById("log").appendChild(para);
				document.getElementById("input").value = "";
			}
			break;
		case 1:
			// [TIME] (textinput)
			var para = document.createElement("P");
			para.innerHTML = "[" + time + "] > " + textinput + "";
			para.className = "responseText";
			para.style.color = color;
			document.getElementById("log").appendChild(para);
			document.getElementById("input").value = "";
			break;
		case 9:
			//Used mainly for commandResponses
			// (Custom text in var B)  -- Does not clear inputbox. Does not include the time.
			var para = document.createElement("P");
			para.innerHTML = textinput;
			para.className = "responseText";
			para.style.color = color;
			document.getElementById("log").appendChild(para);
			break;
		case 10:
			//Used mainly for userCommands
			// [TIME] (Custom text in var B)
			var para = document.createElement("P");
			para.innerHTML = "[" + time + "] > " + textinput;
			para.className = "userCommand";
			para.style.color = color;
			document.getElementById("log").appendChild(para);
			document.getElementById("input").value = "";
			break;
		case 11:
			//Blank Screen with text
			document.body.style.visibility = "hidden";
			document.getElementById("topdivtext").style.visibility = "visible";
			document.getElementById("topdivtext").innerHTML = "" + textinput;
			break;
	}

	//Scroll log to the bottom.
	var element = document.getElementById("log");
	element.scrollTop = element.scrollHeight;

}
//Call delivery() after a delay.
function deliveryAfterDelay(type, input, delay, color) {
	setTimeout(function() {
		delivery(type, input, color);
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
		var inputval = document.getElementById("input").value;
		//Return if input is only spaces or empty.
		if(inputval == "" || !inputval.replace(/\s/g, '').length) return;
		inputCommand(document.getElementById("input").value);
	}
}
		
//Function ran with the "Print [file]" command.
function printcommand(file) {
	switch (file) {
		case "ERROR2":
			delivery(9, "[version.txt]<br>" + version + " - " + versionSUB)
			break;
		default:
			delivery(9, "ERROR - File not found by name '" + file + "'. <span style='color:" + alertColor + "'><br> This command is depricated, use the 'OPEN' command instead.</span>");
			break;
		}
}

//Function ran with the "Open [file]" command.
function opencommand(file) {
	switch (file) {
		case "ASTRO.EXE":
			delivery(9, "KEYWORD DETECTED. Suspicious activity has been detected on your ip address. Your IP has been logged.");
			break;
		case "VERSION.TXT":
			delivery(9, "[version.txt]<br>" + version + " - " + versionSUB)
			break;
		case "TEST.TXT":
			delivery(9, "[test.txt]<br>" + " This is a test!")
			break;
		default:
			delivery(9, "ERROR - File not found by name '" + file + "'.");
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

	deliveryAfterDelay(9, "Connecting to SaER Servers...", 500);
	deliveryAfterDelay(9, "Connection Established!", 1230);
	deliveryAfterDelay(9, "----------------------------------", 1550);
	deliveryAfterDelay(9, "Alert - [Login Required] Use the LOGIN command. --- LOGIN (USERNAME) (PASSWORD)", 1550, alertColor);
	deliveryAfterDelay(9, "----------------------------------", 1550);
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
