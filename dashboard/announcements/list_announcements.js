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
  var url = "/api/announcements/list";
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
        for (var i = 0; i < json.announcements.length; i++) {
          var announcement = json.announcements[i];
          htmlstr += "<tr>";
          htmlstr += `<td>${announcement._id}</td>`;
          htmlstr += `<td>${announcement.title}</td>`;
          htmlstr += `<td>${announcement.shortdescript}</td>`;
          htmlstr += `<td>${announcement.dateadded}</td>`;
          htmlstr += `<td><a href="/dashboard/announcements/view.html?id=${announcement._id}">View</a></td>`;
          htmlstr += `</tr>`;
        }
        announcementslist.innerHTML = htmlstr;
      }

      document.getElementById("announcement_count").innerHTML = "<strong> "+json.count+"</strong>";
    }
  };
  xhr.send();
}