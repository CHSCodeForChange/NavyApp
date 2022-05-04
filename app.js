const menu = document.querySelector('#mobile-menu');
const menuLinks = document.querySelector('.navbar__menu');
const navLogo = document.querySelector('#navbar__logo');


const mobileMenu = () => {
    menu.classList.toggle('is-active');
    menuLinks.classList.toggle('active');
  };
  
  menu.addEventListener('click', mobileMenu);

function test() {
    var xhr = new XMLHttpRequest();
    var url = "/api/add_announcement?token="+getCookie("token");
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            var json = JSON.parse(xhr.responseText);
            if (!json.success) {
                console.log("Error");
                check_token();
            } else {
                console.log(json);
            }
        }
    };
    var data = JSON.stringify({
        title: "test title",
        deltas: [
            {
                "insert": "Hello World!\n"
            },
            {
                "attributes": {
                    "bold": true
                },
                "insert": "agegaergaegr"
            },
            {
                "insert": "\n"
            },
            {
                "attributes": {
                    "bold": true
                },
                "insert": "ndjsrtj"
            },
            {
                "attributes": {
                    "italic": true,
                    "bold": true
                },
                "insert": "srhshsthsrth"
            },
            {
                "insert": "\n"
            },
            {
                "attributes": {
                    "bold": true
                },
                "insert": "srhsrthsrthsrh"
            },
            {
                "insert": "\n"
            }
        ]
    });
    xhr.send(data);
}