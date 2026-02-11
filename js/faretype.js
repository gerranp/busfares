function faretype() {
  document.getElementById("result").textContent = "";
  //GRAB SELECTED ROUTE
  line = document.getElementById("line").value;

  //INITIALLY EMPTY DROPDOWN
  var select = document.getElementById("faretype");
  var i,
    L = select.options.length;
  for (i = L; i > 0; i--) {
    select.remove(i);
  }

  //FIND FAREFILES ASSOCIATED
  var xhr = new XMLHttpRequest();
  xhr.open("GET", "./tree/tree.xml", true);
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
      var xmlDoc = xhr.responseXML;
      //WHICH DIRECTION IS THE USER TRAVELLING?
      var direction = document.getElementById("inbound").checked;
      var select = document.getElementById("result");
      if (direction == true) {
        direction = "Inbound";
      } else {
        direction = "Outbound";
      }

      //LOCATE REQUIRED DATA
      var elements = xmlDoc.getElementById(line).children[3].children;
      for (var i = 0; i < elements.length; i++) {
        //GATHER
        var fareFile = elements[i].children[1].textContent;
        var fareFile = "./data/" + fareFile;
        var fareName = elements[i].children[0].textContent;
        //ADD TO DROPDOWN
        if (
          fareFile.includes(direction) == true ||
          (direction == "Inbound" && fareFile.includes("Clockwise") == true)
        ) {
          fareName = fareName.replace(direction, "");
          var select = document.getElementById("faretype");
          select.options[select.options.length] = new Option(
            fareName,
            fareFile
          );
        }
      }
      //SORT LIST INTO ORDER
      var temp = new Array();
      for (var i = 0; i < select.options.length; i++) {
        temp[i] = new Array();
        temp[i][0] = select.options[i].text;
        temp[i][1] = select.options[i].value;
      }
      temp.sort();
      while (select.options.length > 0) {
        select.options[0] = null;
      }
      for (var i = 0; i < temp.length; i++) {
        var op = new Option(temp[i][0], temp[i][1]);
        select.options[i] = op;
      }
    }
  };
  xhr.send();
}
