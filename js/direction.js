//RENAMES INB AND OUT RADIO BUTTONS TO TERMINUS NAMES
function direction() {
  //GIVE NAME OF OPERATOR
  const opNames = new Map([
    ["FCWL", "First Kernow"],
    ["TFCN", "Go Cornwall Bus"],
    ["HOPE", "Hopley's Coaches"],
    ["NEJH", "Rosevidney Travel"],
    ["OTSS", "OTS Falmouth"],
    ["SMMC", "Travel Cornwall"],
    ["RSLN", "Roselyn Coaches"],
    ["ESTW", "Royal Buses"],
    ["YEOS", "Yeos Contracts"],
    ["DTCO", "Dartline Coaches"],
    ["SDVN", "Stagecoach South West"],
  ]);
  var operator = document.getElementById("line").value.slice(0, 4);
  var operator = opNames.get(operator);
  select = document.getElementById("operator");
  select.innerHTML = `This service is operated by <b>${operator}</b>.`;

  document.getElementById("result").textContent = "";
  var array = ["faretype", "board", "alight"]; //FOR FOR LOOPS
  //RESET ALL DROPDOWNS
  for (var i = 0; i < array.length; i++) {
    document.getElementById(array[i]).value = "default";
  }
  //CHANGE BG COLOUR TO LINE COLOUR
  var xhr = new XMLHttpRequest();
  xhr.open("GET", "./tree/tree.xml", true);
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
      var xmlDoc = xhr.responseXML;
      var line = document.getElementById("line").value;
      if (line == "default") {
        var background = "bbbbbb";
      } else {
        var background = xmlDoc.getElementById(line).children[2].textContent;
      }
      //FIND BEST CONTRAST FOR TEXT
      ///"one must obtain the values of its red, green, and blue" and mix them in next proportion: R:30% G:59% B:11%"
      r = background.slice(0, 2);
      g = background.slice(2, 4);
      b = background.slice(4, 6);
      r = parseInt(r, 16);
      g = parseInt(g, 16);
      b = parseInt(b, 16);
      luminance = r * 0.3 + g * 0.59 + b * 0.11;

      if (luminance <= 120) {
        text = "#ffffff";
      } else {
        text = "#000000";
      }

      //CHANGE BGs TO COLOUR
      var r = document.querySelector(":root");
      r.style.setProperty("--col", "#" + background);
      r.style.setProperty("--text", text);
    }
  };
  xhr.send();
  //EMPTY FARETYPE,BOARD,ALIGHT
  for (var i = 0; i < array.length; i++) {
    var select = document.getElementById(array[i]);
    var j,
      L = select.options.length;
    for (j = L; j > 0; j--) {
      select.remove(j);
    }
  }
  //TAKE TERMINUS NAMES
  var desc = document.getElementById("line");
  desc = desc.options[desc.selectedIndex].text.split(":")[1].split("-");
  inboundName = desc[desc.length - 1];
  outboundName = desc[0];
  //DISPLAY
  var inboundLabel = document.getElementById("inboundLabel");
  var outboundLabel = document.getElementById("outboundLabel");
  inboundLabel.textContent = "To " + inboundName;
  outboundLabel.textContent = "To " + outboundName;
  //CLEAR SELECTED VALUE
  radios = document.getElementsByName("direction");
  radios[0].checked = false;
  radios[1].checked = false;
}
