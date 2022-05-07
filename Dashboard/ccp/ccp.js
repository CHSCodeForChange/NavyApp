function submitcadet() {
    var xhr = new XMLHttpRequest();
    var url = "/api/add_cadet?token="+getCookie("token");
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            var json = JSON.parse(xhr.responseText);
            if (!json.success) {
                console.log("Error");
                console.log(json)
                check_token();
            } else {
                console.log(json);
            }
        }
    }
    var data = JSON.stringify({
        firstname: document.getElementById("firstname").value,
        lastname: document.getElementById("lastname").value,
        role: document.getElementById("role").value,
        email: document.getElementById("email").value,
        deltas: basicEditor.getContents().ops
    });
    xhr.send(data);
}