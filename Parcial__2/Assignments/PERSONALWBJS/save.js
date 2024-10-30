function saveData() {
    // Obtener los valores de los campos del formulario
    var date = document.getElementById("date").value;
    var startTime = document.getElementById("start-time").value;
    var endTime = document.getElementById("end-time").value;
    var activity = document.getElementById("activity").value;
    var place = document.getElementById("place").value;
    var type = document.getElementById("type").value;
    var notes = document.getElementById("notes").value;
    var flag = document.getElementById("flag").value;
  
   
    var disponibility = "";
    if (document.getElementById("free").checked) {
      disponibility += "Free ";
    }
    if (document.getElementById("busy").checked) {
      disponibility += "Busy ";
    }
  

    var table = document.getElementById("data-rows");
  

    var row = table.insertRow();
  
    
    row.insertCell(0).innerHTML = date;
    row.insertCell(1).innerHTML = startTime;
    row.insertCell(2).innerHTML = endTime;
    row.insertCell(3).innerHTML = activity;
    row.insertCell(4).innerHTML = place;
    row.insertCell(5).innerHTML = type;
    row.insertCell(6).innerHTML = notes;
    row.insertCell(7).innerHTML = `<div style="background-color:${flag}; width:20px; height:20px;"></div>`;
    row.insertCell(8).innerHTML = disponibility;
  
    document.getElementById("form").reset();
  }
  
  