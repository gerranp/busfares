//RESTORE ALL DROPDOWNS TO DEAFULT VALUES
function reset() {
  var array = ["line", "faretype", "board", "alight", "calculate", "reset"]; //FOR FOR LOOPS
  //RESET ALL DROPDOWNS
  for (var i = 0; i < array.length; i++) {
    document.getElementById(array[i]).value = "default";
    document.getElementById(array[i]).style.background = "#bbbbbb";
    document.getElementById(array[i]).style.color = "#000000";
  }
  //RESET RESULT TEXT
  document.getElementById("result").textContent = "";
  document.getElementById("cheaper").textContent = "";
  document.getElementById("operator").textContent = "";
  //RESET RADIOS
  document.getElementById("inboundLabel").textContent = "Inbound";
  document.getElementById("outboundLabel").textContent = "Outbound";
  document.getElementsByName("direction")[0].checked = false;
  document.getElementsByName("direction")[1].checked = false;
  //RESET ITEMS IN DROPDOWNS
  var array2 = ["faretype", "board", "alight"];
  for (var i = 0; i < array2.length; i++) {
    var select = document.getElementById(array2[i]);
    var j,
      L = select.options.length;
    for (j = L; j > 0; j--) {
      select.remove(j);
    }
  }
}
