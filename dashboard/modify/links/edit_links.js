window.onload = function () {
  check_token();
  get_edits();
};

function get_edits() {
  var xhr = new XMLHttpRequest();
  var parameters = new URLSearchParams(window.location.search);
  var url =
    "/api/links/edit?token=" +
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
    window.location.href = "/dashboard/dashboard.html";
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

function sendlinks() {
  var xhr = new XMLHttpRequest();
  var parameters = new URLSearchParams(window.location.search);
  var url =
    "/api/links/update?token=" +
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
    deltas: editor.getContents().ops,
  });
  xhr.send(data);
}

Quill.register("modules/imageUploader", ImageUploader);
var editor = new Quill("#linkedit", {
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

