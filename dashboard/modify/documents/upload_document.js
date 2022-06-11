window.onload = function () {
  check_token();
};

function send_success(id) {
  var button = document.getElementById("submitbutton");
  button.innerHTML = "Success!";
  button.style.background = "#00bf6c";
  setTimeout(() => {
    window.location.href = "list.html";
  }, 1000);
}

function send_failed() {
  var button = document.getElementById("submitbutton");
  var innerhtml = button.innerHTML;
  var background = button.style.background;
  button.innerHTML = "Failed";
  button.style.background = "#c40000";
  setTimeout(() => {
    button.innerHTML = innerhtml;
    button.style.background = background;
  }, 2);
}

function loadtitle() {
  document.getElementById("title").value = document.getElementById("file").files[0].name;
}

function senddocument() {
  var xhr = new XMLHttpRequest();
  var url = "/api/documents/upload?token=" + getCookie("token");
  xhr.open("POST", url, true);
  //xhr.setRequestHeader("Content-Type", "application/json");
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
      var json = JSON.parse(xhr.responseText);
      if (!json.success) {
        console.log("Error");
        console.log(json);
        send_failed();
        check_token();
      } else {
        send_success(json.id);
        console.log(json);
      }
    }
  };

  let file = document.getElementById("file").files[0];
  let formData = new FormData();
  formData.append("file", file);
  formData.append("title", document.getElementById("title").value);
  console.log(file);
  xhr.send(formData);
}