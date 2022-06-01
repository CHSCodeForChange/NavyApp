window.onload = function () {
  check_token();
  count_unread_messages();
  load_announcement();
};

function load_announcement() {
  var xhr = new XMLHttpRequest();
  var parameters = new URLSearchParams(window.location.search);
  var url =
    "/api/announcements/get?token=" +
    getCookie("token") +
    "&id=" +
    parameters.get("id");
  xhr.open("GET", url, true);
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
      var json = JSON.parse(xhr.responseText);
      if (!json.success) {
        console.log("Error");
        console.log(json);
      } else {
        console.log(json);
        document.getElementById("title").innerHTML = json.title;
        var date = new Date(json.dateadded);
        document.getElementById("subtitle").innerHTML =
          date.toDateString() +
          " " +
          date.toTimeString().trim().split(/\s+/)[0];
        document.getElementById("announcement").innerHTML = json.html;
        console.log("HI");
      }
    }
  };
  xhr.send();
}
