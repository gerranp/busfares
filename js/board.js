//Using the supplies data file, this generates a list of the bus stops (FareZone) on the route to then populate the select tag.
function board() {
  document.getElementById("result").textContent = "";
  var file = document.getElementById("faretype").value;
  //INITIALLY EMPTY DROPDOWN
  var select = document.getElementById("board");
  var i,
    L = select.options.length;
  for (i = L; i > 0; i--) {
    select.remove(i);
  }
  //INITIALLY EMPTY DROPDOWN AL
  var select = document.getElementById("alight");
  var i,
    L = select.options.length;
  for (i = L; i > 0; i--) {
    select.remove(i);
  }
  //OPEN XML FILE
  var xhr = new XMLHttpRequest();
  xhr.open("GET", file, true);
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
      var xmlDoc = xhr.responseXML;
      //LOCATE REQUIRED DATA
      var elements = xmlDoc.getElementsByTagName("FareZone");
      for (var i = 0; i < elements.length; i++) {
        //GATHER
        var stopId = elements[i].id;
        var stopName = elements[i].firstElementChild.textContent;
        //ADD TO DROPDOWN
        if (stopId.includes("alighting") == false) {
          var select = document.getElementById("board");
          select.options[select.options.length] = new Option(stopName, stopId);
        }
      }
    }
    //REVERSE IF FCWL OUTBOUND
    if (file.includes("Outbound")) {
      var temp = new Array();
      for (var i = 0; i < select.options.length; i++) {
        temp[i] = new Array();
        temp[i][0] = select.options[i].text;
        temp[i][1] = select.options[i].value;
      }
      temp.reverse();
      while (select.options.length > 0) {
        select.options[0] = null;
      }
      for (var i = 0; i < temp.length; i++) {
        var op = new Option(temp[i][0], temp[i][1]);
        select.options[i] = op;
      }
      //AND MOVE ---select...--- TO TOP
      var element = select.lastElementChild;
      select.insertBefore(element, select.firstElementChild);
      //AND MAKE SELECTED OPTION
      select.selectedIndex = 0;
    }
  };
  xhr.send();
}
