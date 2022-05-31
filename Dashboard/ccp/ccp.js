window.onload = function () {
  check_token();
  count_unread_messages();
};

function send_success() {
  var button = document.getElementById("submitbutton");
  button.innerHTML = "Success!";
  button.style.background = "#00bf6c";
  setTimeout(() => {
    window.location.reload();
  }, 1000);
}

function send_failed() {
  var button = document.getElementById("submitbutton");
  var innerhtml = button.innerHTML;
  var background = button.style.background;
  console.log(innerhtml + " " + background);

  button.innerHTML = "Failed";
  button.style.background = "#c40000";
  setTimeout(() => {
    button.innerHTML = innerhtml;
    button.style.background = background;
  }, 2);
}

function submitcadet() {
  var xhr = new XMLHttpRequest();
  var url = "/api/cadets/create?token=" + getCookie("token");
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
    firstname: document.getElementById("firstname").value,
    lastname: document.getElementById("lastname").value,
    role: document.getElementById("role").value,
    email: document.getElementById("email").value,
    deltas: editor.getContents().ops,
  });
  xhr.send(data);
}

var editor = new Quill("#description", {
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
