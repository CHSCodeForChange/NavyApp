window.onload = function () {
  check_token();
  count_unread_messages();
  load_cadet();
};

function load_cadet() {
  var xhr = new XMLHttpRequest();
  var parameters = new URLSearchParams(window.location.search);
  var url = "/api/cadets/get?token=" + getCookie("token") + "&id=" + parameters.get('id');
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
        document.getElementById("title").innerHTML = json.firstname+" "+json.lastname;
        document.getElementById("role").innerHTML = "Role: "+json.role;
        document.getElementById("email").innerHTML = "Email: "+ json.email;
        document.getElementById("description").innerHTML = json.html;
        console.log("HI");
      }
    }
  };
  xhr.send();
}
