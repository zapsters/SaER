//Get URL Variables Function
function getUrlVars() {
    var vars = {};
    var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m, key, value) {
        vars[key] = value;
    });
    return vars;

}

// Read variables using getUrlVars function
var DEV = getUrlVars()["astro"];
var URLSTYLE = getUrlVars()["s"];
var COMMANDHISTORY = [];
// If getUrlVars returns undefined, set it to 0
if (typeof DEV == 'undefined') {
    var DEV = "0";
}


// Static Variables - Change Freely
var version = "Beta0.2.5 DEVELOPMENT";
var versionSUB = "Project Astro";

//set Variables
var COPYRIGHT1 = "SaER Copyright 2021"
var COPYRIGHT2 = "SaER logo above, Websites, and other media are owned and claimed by Science and Entity Research"
var ACCESSLEVEL = 0;

var active_modify = "";
var PRIDE = 0;

//Variables used by Variable command
var Unlockedvars = ["DEV", "ACCESSLEVEL"];
//Files that can be read using Print command
var Unlockedfiles = ["VERSION", "ASTRO", "FAIL"];

//Update active vars at bottomn of screen
window.setInterval(function() {
    	//var COPYRIGHT1 = "SaER Copyright 2020"
    	document.getElementById("sub2").innerHTML = COPYRIGHT1;
    	//var COPYRIGHT2 = "SaER logo above, Websites, and other media are owned and claimed by Science and Entity Research"
    	document.getElementById("sub2v2").innerHTML = COPYRIGHT2;
	
	document.getElementById("subtext").innerHTML = "" + active_modify;
	//Dev Mode Alert at bottom
    	var activemodifytext = document.getElementById("subtext").innerHTML;
    	if (DEV == 1 && !activemodifytext.includes("[ DEV - TRUE ]")) {
		alert("Dev mode is unused currently.");
        	active_modify = " " + active_modify + "[ DEV - TRUE ]";
    	} else if (DEV != 1 && activemodifytext.includes("[ DEV - TRUE ]")) {
        	active_modify = "";
    	}
	
	//PRIDE
	if (PRIDE == 1) {
		//Rainbow text for every text with "rt" class
		var elements = document.getElementsByClassName("rt");
		for (let i = 0; i < elements.length; i++) {
		generateRainbowText(elements[i]);
		}
	}
}, 500);

//ONLOAD
function onLoad() {
    
}


//rainbow text generator function
var COLOR = 60;
function generateRainbowText(element) {
  var text = element.innerText + "";
  element.innerHTML = "";
  for (let i = 0; i < text.length; i++) {
    let charElem = document.createElement("span");
    charElem.style.color = "hsl(" + (COLOR * i / text.length) + ",80%,50%)";
	COLOR = COLOR + 1;
    charElem.innerHTML = text[i];
    element.appendChild(charElem);
	
	if (COLOR > 1467) {
		COLOR = 60;
	}
  }
}


//
// Below is the delivery function and Last Command function, it is used when a command is entered to log and display text
//
var COMNUM = -1;
COMNUM = COMMANDHISTORY.length;
if (typeof COMNUM == 'undefined') {
	COMNUM = COMMANDHISTORY.length;
}

//
// THE BRAINS!!!
//

//DELIVERY FUNCTION
function delivery(a, b) {
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
        var commandinput = rawinput.toUpperCase();
	if (commandinput == "" || commandinput == " ") {} else {
		COMMANDHISTORY.push(commandinput);
	}
	
		//Text delivery!
	switch (a) {
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
		para.innerHTML = "[" + time + "] > " + b;
		document.getElementById("log").appendChild(para);
		var element = document.getElementById("log");
		element.scrollTop = element.scrollHeight;
		document.getElementById("input").value = "";
		break;
	case 11:
		//Blank Screen with text
		document.body.style.visibility = "hidden";
		document.getElementById("topdivtext").style.visibility = "visible";
		document.getElementById("topdivtext").innerHTML = "" + b;
		break;
	}
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
	COMNUM = COMMANDHISTORY.length;

        //COMMAND LOGIC -------------------------------------------------------------------------------------------------------------XXXX
        //OLD METHOD --- || document.getElementById('input').value == "HELP"
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
			var commands = "COMMANDS<br> VAR (variable) (true/false/read/set) [value] - Change a local veriable.<br>COPYRIGHT - Print copyright information<br>PRINT (File Name) - Print from text file<br>CLEAR - Clear console log<br> VERSION - Prints the current version of the SaER OFFICIAL CONSOLE.";
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
				window[INPUT_VAR] = 1;
				delivery(10, "Variable '" + INPUT_VAR.toString() + "' has been set to " + window[INPUT_VAR.toString()] + ".")
			} else {
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
            case "PRIDE":
                document.getElementById("logo").src = "https://zapsters.github.io/Home/images/V4ZapsterLogoGlitchPride.gif";
                document.getElementById("logo").style.filter = "invert(0%)";
		PRIDE = !PRIDE;
                delivery(1)
                break;
            case "ASTRO":
                delivery(11, "oof")
                break;
            default:
                delivery(0);
                document.getElementById("topdivtext").innerHTML = "";
                document.getElementById("botdivtext").innerHTML = "";
                document.getElementById("input").value = "";
                break;
        }
    }

    function printcommand(f) {
        switch (f) {
            case "VERSION":
                delivery(10, "version.txt<br> - " + version + " - " + versionSUB)
                break;
            case "ASTRO":
                delivery(10, "astro.exe<br> - BLOCKED FILE - Suspicious activity detected on your ip address. You IP has been logged")
                break;
            default:
			delivery(10, "ERROR - File exists, but can not be read. Insufficient Access Level?");
        }
    }
}

//
// END OF DELIVERY FUNCTION
//
