//Caluculates fare price and returns to user through "result"
function calculate() {
  document.getElementById("result").textContent = "";
  document.getElementById("cheaper").innerHTML = "";
  //GET VALUES SELECTED FROM DROPDOWNS
  var file = document.getElementById("faretype").value;
  var boardId = document.getElementById("board").value.split("@");
  boardId = boardId[1];
  var alightId = document.getElementById("alight").value.split("@");
  alightId = alightId[1];
  //REVERSE CODES IF OUTBOUND
  if (file.includes("Outbound")) {
    var code = alightId + "+" + boardId;
  } else {
    var code = boardId + "+" + alightId;
  }

  //OPEN XML FILE
  var xhr = new XMLHttpRequest();
  xhr.open("GET", file, true);
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
      var xmlDoc = xhr.responseXML;
      //LOCATE REQUIRED DATA
      var elements = xmlDoc.getElementsByTagName("DistanceMatrixElement");
      for (var i = 0; i < elements.length; i++) {
        //CHECK MATCH
        if (elements[i].id == code) {
          ref = elements[i].firstElementChild.firstElementChild;
          priceBand = ref.getAttribute("ref");
        }
      }
    } else {
      priceBand = "ERR";
    }
    var price = priceBand.slice(11);
    //TELL USER IF CHEAPER TO BUY TWO SINGLES
    if (file.includes("Return") && price > 4) {
      select = document.getElementById("cheaper");
      select.innerHTML = "&#8505; You could"+" spend less ".bold()+
      "on this bus journey!<br>With the current "+"£2 single fare cap".bold()+
        ", it is cheaper to buy two single tickets than this return fare.";
    }
    var price = parseFloat(price).toFixed(2);
    var select = document.getElementById("result");
    select.innerHTML = "This journey will cost you ";
    var price = "£" + price;
    select.innerHTML += price.bold();
    select.innerHTML += ".";
  };
  xhr.send();
}
