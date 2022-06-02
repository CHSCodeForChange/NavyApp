window.onload = function () {
  getdashboard();
  updatelist();
};

function getdashboard() {
  console.log("hi");
  var xhr = new XMLHttpRequest();
  var url = "/api/get_dashboard_info?token=" + getCookie("token");
  xhr.open("GET", url, true);
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
      var json = JSON.parse(xhr.responseText);
      if (!json.success) {
        console.log(json);
        console.log("Error");
      } else {
        console.log(json);
        document.getElementById("cadetcount").innerHTML = json.cadetcount;
        document.getElementById("usernamebold").innerHTML = json.username;
        document.getElementById("usernamesecondary").innerHTML = json.username;

        // var cadettable = "";

        // for (var i = 0; i < json.cadets.length; i++) {
        //   var cadet = json.cadets[i];
        //   cadettable += "<tr>";
        //   cadettable += `<td>${cadet.firstname} ${cadet.lastname}</td>`;
        //   cadettable += `<td>${cadet.shortdescript}</td>`;
        //   cadettable += `<td>${cadet.role}</td>`;
        //   cadettable += `<td><a class="primary" href="/dashboard/cadets/view.html?id=${cadet._id}">More Info</a></td>`;
        //   cadettable += `</tr>`;
        // }
        // document.getElementById("cadetpreview").innerHTML = cadettable;
      }
    }
  };
  xhr.send();
  return 0;
}

function updatelist() {
  var amount = document.getElementById("amount").value;
  var page = document.getElementById("page").value;
  try {
    amount = parseInt(amount);
    page = parseInt(page);
  } catch (e) {
    console.log(e);
    return;
  }
  var xhr = new XMLHttpRequest();
  var url = "/api/cadets/list";
  url += "?page=" + page + "&amount=" + amount;
  xhr.open("GET", url, true);
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
      var json = JSON.parse(xhr.responseText);
      if (!json.success) {
        console.log(json);
        console.log("Error");
      } else {
        console.log(json);
        var htmlstr = "";
        for (var i = 0; i < json.cadets.length; i++) {
          var cadet = json.cadets[i];
          htmlstr += "<tr>";
          htmlstr += `<td>${cadet._id}</td>`;
          htmlstr += `<td>${cadet.firstname} ${cadet.lastname}</td>`;
          htmlstr += `<td>${cadet.shortdescript}</td>`;
          htmlstr += `<td>${cadet.role}</td>`;
          htmlstr += `<td><a href="/dashboard/cadets/view.html?id=${cadet._id}">View</a></td>`;
          htmlstr += `</tr>`;
        }
        var cadetslist = document.getElementById("cadetslist");
        cadetslist.innerHTML = htmlstr;
      }

      document.getElementById("cadet_count").innerHTML = "<strong> "+json.count+"</strong>";
    }
  };
  xhr.send();
}