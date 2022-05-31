function getCookie(cname) {
  try {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(";");
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == " ") {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  } catch (e) {
    logout();
    return "";
  }
}

function logout() {
  document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  document.cookie = "username=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  var xhr = new XMLHttpRequest();
  var url = "/api/logout";
  xhr.open("POST", url, true);
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
      var json = JSON.parse(xhr.responseText);
      console.log(json);
      window.location.href = "/login/login-page.html";
    }
  };
  var data = JSON.stringify({
    token: getCookie("token"),
  });
  xhr.send(data);
}

function check_token() {
  var xhr = new XMLHttpRequest();
  var url = "/api/check_token";
  xhr.open("POST", url, true);
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
      var json = JSON.parse(xhr.responseText);
      console.log(json);
      if (!json.success || !json.valid) {
        logout();
      }
    }
  };
  var data = JSON.stringify({
    token: getCookie("token"),
    username: getCookie("username"),
  });
  xhr.send(data);
}

function count_unread_messages() {
  var xhr = new XMLHttpRequest();
  var url = "/api/messages/count?token=" + getCookie("token");
  xhr.open("GET", url, true);
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
      var json = JSON.parse(xhr.responseText);
      console.log(json);
      if (json.success) {
        if (json.messagecount > 0) {
          document.getElementById("unread_messages_count").innerHTML =
            json.messagecount;
        } else {
          document.getElementById("unread_messages_count").remove();
        }
      } else {
        document.getElementById("unread_messages_count").innerHTML = "--";
      }
    }
  };
  xhr.send();
}

const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
