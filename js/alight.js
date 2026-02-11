//Using the supplies data file, this generates a list of the bus stops (FareZone) on the route to then populate the select tag.
function alight() {
  document.getElementById("result").textContent = "";
  document.getElementById("cheaper").textContent = "";
  //INITIALLY EMPTY DROPDOWN
  var file = document.getElementById("faretype").value;
  var select = document.getElementById("alight");
  var i,
    L = select.options.length;
  for (i = L; i > 0; i--) {
    select.remove(i);
  }

  //SET UP ARRAYS
  const stopIda = [];
  const stopNamea = [];

  //FIND SELECTED VALUE IN BOARD
  var boardChosen = document.getElementById("board").value;

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
        var stopIda = elements[i].id;
        var stopNamea = elements[i].firstElementChild.textContent;
        //ADD TO DROPDOWN
        if (stopIda.includes("boarding") == false) {
          select.options[select.options.length] = new Option(
            stopNamea,
            stopIda
          );
        }
        //CHECK IF CURRENT VALUE IS SAME AS THAT SELECTED IN *BOARD*, IF SO EMPTY LIST
        //THIS WAY ONLY STOPS AFTER THE ONES SELECTED IN BOARD WILL BE SHOWN

        if (stopIda == boardChosen) {
          if (file.includes("Outbound")) {
          var boardChosenVal = i + 2;
          }else{
          var boardChosenVal = i - 2;
          }
        }
      }
      //REVERSE IF OUTBOUND
      if (file.includes("Outbound")) {
        boardChosenVal = select.options.length - boardChosenVal;
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
      //REMOVE UNWANTED VALS
      for (j = boardChosenVal; j > 0; j--) {
        select.remove(j);
      }
    }
  };
  xhr.send();
}
