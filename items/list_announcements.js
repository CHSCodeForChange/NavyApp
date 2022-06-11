window.onload = function () {
  updatelist();
  putpdf();
};

function updatelist() {
  var xhr = new XMLHttpRequest();
  var url = "/api/documents/list";
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
        for (var i = 0; i < json.documents.length; i++) {
          var doc = json.documents[i];
          htmlstr += "<tr>";
          htmlstr += `<td>${doc.id}</td>`;
          htmlstr += `<td>${doc.title}</td>`;
          htmlstr += `<td>${doc.filename}</td>`;
          htmlstr += `<td><a href="${doc.url}">Download</a></td>`;
          htmlstr += `</tr>`;
        }
        var announcementslist = document.getElementById("announcementslist");
        announcementslist.innerHTML = htmlstr;
      }

      //document.getElementById("announcement_count").innerHTML = "<strong> "+json.count+"</strong>";
    }
  };
  xhr.send();
}

function putpdf() {
  var xhr = new XMLHttpRequest();
  var url = "/api/policy/get";
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
        document.getElementById("pdfframe").src = json.url;
      }
    }
  };
  xhr.send();
}