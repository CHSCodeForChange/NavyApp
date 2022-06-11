window.onload = function () {
  get_edits();
};

function get_edits() {
  var xhr = new XMLHttpRequest();
  var parameters = new URLSearchParams(window.location.search);
  var url =
    "/api/cadets/edit?token=" +
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
        document.getElementById("firstname").value = json.firstname;
        document.getElementById("lastname").value = json.lastname;
        document.getElementById("email").value = json.email;
        document.getElementById("role").value = json.role;
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
    "/api/cadets/update?token=" +
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
    firstname: document.getElementById("firstname").value,
    lastname: document.getElementById("lastname").value,
    role: document.getElementById("role").value,
    email: document.getElementById("email").value,
    deltas: editor.getContents().ops,
  });
  xhr.send(data);
}
Quill.register("modules/imageUploader", ImageUploader);
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
      ["image"]
    ],
    imageUploader: {
      upload: file => {
        return new Promise((resolve, reject) => {
          const formData = new FormData();
          formData.append("image", file);

          fetch(
            "/api/images/upload?token="+getCookie("token"),
            {
              method: "POST",
              body: formData
            }
          )
            .then(response => response.json())
            .then(result => {
              console.log(result);
              resolve(result.data.url);
            })
            .catch(error => {
              reject("Upload failed");
              console.error("Error:", error);
            });
        });
      }
    }
  },
  theme: "snow",
});

