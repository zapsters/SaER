//SaER is a fictional entity, created by me, Erin B, or under the handle(s) "Zapster" / "Zapsters" / "Zapster Studios".
// SaER, along with any other related assets, are owned by Erin Ballinger. My github can be found here https://github.com/zapsters
var version = "Beta 2.0";
var versionSUB = "SaERv2 Redesign";

var COPYRIGHT1 = "SaER 2023&copy;";
var COPYRIGHT2 =
  "SaER logo above, Websites, and other media are owned and claimed by Science and Entity Research";
var actualCopyright =
  "Note: [Science and Enity Research (SaER) is an intellectual property owned and created by Erin Ballinger.]";

var users = [
  { username: "guest", password: undefined, level: 0 },
  { username: "admin", password: "admin", level: 10 },
];
var login = users[0];

var alertColor = "#e30b25";

//
// THE BRAINS!!
//
function inputCommand(command) {
  //var rawinput = document.getElementById('input').value;
  var commandinput = command;
  if (
    commandinput != "" &&
    typeof commandinput != "undefined" &&
    commandinput != " " &&
    COMNUM == COMMANDHISTORY.length
  ) {
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
  var commandarray = commandinput.split(/(\s+)/).filter(function (e) {
    return e.trim().length > 0;
  });

  //Check if there is a current login. If there isn't, terminate the command.
  if (
    login == undefined &&
    commandarray[0].toUpperCase() != "LOGIN" &&
    commandarray[0].toUpperCase() != "HELP"
  ) {
    delivery(
      9,
      "SECURITY ISSUE - User is not logged in! See the 'Help Login' command for information.",
      alertColor
    );
    return;
  }

  var commandfirstword = commandarray[0];
  switch (commandfirstword.toUpperCase()) {
    case "HELP":
      if (commandarray[1] != undefined && commandarray[1] != "") {
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
            delivery(
              9,
              "Attempts to login to the SaER console under a recognized user. Not inputting a password or username will return the current user."
            );
            delivery(
              9,
              "Provides higher level access depending on your security ranking. See the tech department for help."
            );
            delivery(
              9,
              "A guest login exists under username 'guest' with no password."
            );
            break;
          case "PRINT":
            delivery(9, "PRINT [FILE]");
            delivery(
              9,
              "[FILE] should include extensions (.txt, .exe, etc.) and no spaces."
            );
            delivery(9, "This command is deprecated.", alertColor);
            break;
            break;
          case "OPEN":
            delivery(9, "OPEN [FILE]");
            delivery(
              9,
              "[FILE] should include extensions (.txt, .exe, etc.) and no spaces."
            );
            break;
          default:
            delivery(9, "" + commandarray[1] + " is not a recognized command.");
            break;
        }
      } else {
        //help commands
        var commands = [
          "COMMANDS",
          "CLEAR - Clear console log",
          "VERSION - Prints the current version of the console.",
          "COPYRIGHT - Print copyright information",
          "LOGIN [USERNAME] [PASSWORD] - Used for authentication.",
          "OPEN [FILE] - Search for and open a file on SaER servers.",
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
      if (commandarray[1] != undefined) {
        //If a username is given, call the LoginCommand function.
        loginCommand(commandarray[1], commandarray[2]);
      } else {
        //If command is just "LOGIN" print the current user information.
        if (login != undefined) {
          delivery(9, "Currently logged in as " + login.username + ".");
          delivery(9, "DEBUG+Password '" + login.password + "'.", alertColor);
          delivery(9, "DEBUG+Security Level " + login.level + ".", alertColor);
        } else {
          delivery(9, "No user is logged in!");
        }
      }
      break;
    case "VERSION":
      delivery(9, "Current Console Version: " + version + " - " + versionSUB);
      break;
    case "COPYRIGHT":
      delivery(9, COPYRIGHT1 + " - " + COPYRIGHT2);
      delivery(9, actualCopyright);
      break;
    //The OPEN command gets one variable and passes it onto the opencommand(input_file)
    case "OPEN":
      //console.log(runarray); // ["RUN", "(FILENAME)"]
      var input_file = commandarray[1];
      if (input_file != undefined) {
        opencommand(input_file);
      } else {
        delivery(9, "Missing filename. 'open [filename]'");
      }
      break;
    case "ASTRO.EXE":
      delivery(11, "Connection Terminated");
      break;
    case "PRIDE":
      // document.getElementById("logo").src = "images/SaERLogoGlitchPride.gif";
      document.body.style.backgroundImage =
        "url('../images/SaERv2SpinPride.gif')";
      delivery(9, "very prideful.");
      break;

    //Ran if the command isn't recognized
    default:
      delivery(0, command);
      document.getElementById("floatingTopText").innerHTML = "";
      document.getElementById("floatingBtmText").innerHTML = "";
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
  var time =
    today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
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
  var rawinput = document.getElementById("input").value;

  //Text delivery!
  switch (type) {
    case 0:
      //Unkown Command
      if (textinput != "" && textinput != " ") {
        var para = document.createElement("P");
        para.innerHTML = "'" + textinput + "' is not recognized as a command.";
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
      document.getElementById("floatingTopText").style.visibility = "visible";
      document.getElementById("floatingTopText").innerHTML = "" + textinput;
      break;
    case 12:
      //ServerResponses that DO NOT have padding.
      // (Custom text in var B)  -- Does not clear inputbox. Does not include the time.
      var para = document.createElement("P");
      para.innerHTML = textinput;
      para.className = "serverText";
      para.style.color = color;
      document.getElementById("log").appendChild(para);
      break;
    default:
      console.error("Error with delivery switch function.");
      console.error("Type: " + type);
      console.error("Text: " + textinput);
  }

  //Scroll log to the bottom.
  var element = document.getElementById("log");
  element.scrollTop = element.scrollHeight;
}
//Call delivery() after a delay.
function deliveryAfterDelay(type, input, delay, color) {
  setTimeout(function () {
    delivery(type, input, color);
  }, delay);
}

//Function ran with the "Open [file]" command.
function opencommand(file) {
  switch (file.toUpperCase()) {
    case "ASTRO.EXE":
      delivery(
        9,
        "KEYWORD DETECTED. Suspicious activity has been detected on your ip address. Your IP has been logged.",
        alertColor
      );
      break;
    case "VERSION.TXT":
      delivery(9, "[version.txt]<br>" + version + " - " + versionSUB);
      break;
    case "TEST.TXT":
      delivery(9, "[test.txt]<br>" + " This is a test!");
      break;
    default:
      delivery(9, "ERROR - File not found by name '" + file + "'.");
      break;
  }
}

function loginCommand(username, password) {
  //Sort through the users array to find a username matching to password.
  var usernameIdentity = Object.values(users).filter(
    (word) => word.username == username.toLowerCase()
  );
  var formattedUsername =
    username.toLowerCase().charAt(0).toUpperCase() +
    username.toLowerCase().slice(1);
  if (login != undefined && usernameIdentity[0] == login) {
    delivery(
      9,
      "You are already logged in as " + usernameIdentity[0].username + ".",
      alertColor
    );
    return;
  }
  if (usernameIdentity !== undefined && usernameIdentity.length != 0) {
    //If a user exists by that username...
    if (password == usernameIdentity[0].password) {
      login = usernameIdentity[0];
      delivery(
        9,
        "Logged in as " + usernameIdentity[0].username + "!",
        alertColor
      );
    } else if (usernameIdentity[0].username == "guest") {
      login = usernameIdentity[0];
      delivery(
        9,
        "Logged in as " + usernameIdentity[0].username + "!",
        alertColor
      );
    } else {
      delivery(
        9,
        "Invalid password for " + usernameIdentity[0].username + ".",
        alertColor
      );
    }
  } else {
    delivery(9, "There is no user by '" + formattedUsername + "'.", alertColor);
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
  // document.getElementById("BtmTextBtm").innerHTML = COPYRIGHT2;

  deliveryAfterDelay(12, "Connecting to SaER Servers...", 500);
  deliveryAfterDelay(12, "Connection Established!", 1230);
  deliveryAfterDelay(12, "----------------------------------", 1550);
  deliveryAfterDelay(
    12,
    "[Login Required] Use the LOGIN command. --- LOGIN (USERNAME) (PASSWORD)",
    1550,
    alertColor
  );

  deliveryAfterDelay(12, "Currently logged in as guest", 1560, alertColor);
  deliveryAfterDelay(12, "----------------------------------", 1600);

  // setTimeout(() => {
  //   loginCommand("guest", null);
  // }, 1560);

  //Set Command Number for command history.
  COMNUM = COMMANDHISTORY.length;
  if (typeof COMNUM == "undefined") {
    COMNUM = COMMANDHISTORY.length;
  }
}

//Get URL Variables Function
function getUrlVars() {
  var vars = {};
  var parts = window.location.href.replace(
    /[?&]+([^=&]+)=([^&]*)/gi,
    function (m, key, value) {
      vars[key] = value;
    }
  );
  return vars;
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
    if (inputval == "" || !inputval.replace(/\s/g, "").length) return;
    inputCommand(document.getElementById("input").value);
  }
}
