function line() {
  var xhr = new XMLHttpRequest();
  xhr.open("GET", "tree/tree.xml", true);
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
      var xmlDoc = xhr.responseXML;
      //LOCATE REQUIRED DATA
      var elements = xmlDoc.getElementsByTagName("line");
      for (var i = 0; i < elements.length; i++) {
        //GATHER
        var lineCode = elements[i].id;
        var lineName = elements[i].children[0].textContent;
        var lineDesc = elements[i].children[1].textContent;
        //ADD TO DROPDOWN
        var select = document.getElementById("line");
        select.options[select.options.length] = new Option(
          lineName + ": " + lineDesc,
          lineCode
        );
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
