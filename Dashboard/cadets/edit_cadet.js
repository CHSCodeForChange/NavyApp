window.onload = function () {
  check_token();
  count_unread_messages();
  get_edits();
};

function get_edits() {
  var xhr = new XMLHttpRequest();
  var parameters = new URLSearchParams(window.location.search);
  var url =
    "/api/announcements/edit?token=" +
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
        document.getElementById("title").value = json.title;
        editor.setContents(json.deltas);
      }
    }
  };
  xhr.send();
}

function send_success() {
  var button = document.getElementById("submitbutton");
  button.innerHTML = "Success!";
  button.style.background = "#00bf6c";
  var parameters = new URLSearchParams(window.location.search);
  setTimeout(() => {
    window.location.href = "view.html?id=" + parameters.get("id");
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

function sendcadet() {
  var xhr = new XMLHttpRequest();
  var parameters = new URLSearchParams(window.location.search);
  var url =
    "/api/announcements/update?token=" +
    getCookie("token") +
    "&id=" +
    parameters.get("id");
  console.log(url);
  xhr.open("POST", url, true);
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
      var json = JSON.parse(xhr.responseText);
      if (!json.success) {
        console.log("Error");
        console.log(json);
        send_failed();
        check_token();
      } else {
        send_success();
        console.log(json);
      }
    }
  };
  var data = JSON.stringify({
    title: document.getElementById("title").value,
    deltas: editor.getContents().ops,
  });
  xhr.send(data);
}

var editor = new Quill("#announcement", {
  modules: {
    toolbar: [
      [{ font: [] }, { size: [] }],
      ["bold", "italic", "underline", "strike"],
      [{ color: [] }, { background: [] }],
      [{ script: "super" }, { script: "sub" }],
      [{ header: "1" }, { header: "2" }, "blockquote", "code-block"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
      ],
      ["direction", { align: [] }],
      ["link", "clean"],
    ],
  },
  theme: "snow",
});
