window.onload = refreshannouncements(0, 50);
function refreshannouncements(page, amount) {
    var announcementslist=document.getElementById("announcementslist");
    var xhr = new XMLHttpRequest();
    var url = "/api/announcementrange";
    url+="?page="+page+"&amount="+amount;
    xhr.open("GET", url, true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            var json = JSON.parse(xhr.responseText);
            if (!json.success) {
                console.log(json);
                console.log("Error");
            } else {
                console.log(json);
                var htmlstr="";
                htmlstr='<thead><tr>';
                htmlstr+='<th>ID</th>';
                htmlstr+='<th>Title</th>';
                htmlstr+='<th>Description</th>';
                htmlstr+='<th>Date</th>';
                htmlstr+='</tr></thead>';
                htmlstr+='<tbody>';
                for(var i=0;i<json.announcements.length;i++) {
                    var announcement=json.announcements[i];
                    htmlstr+="<tr>";
                    htmlstr+=`<td>${announcement._id}</td>`;
                    htmlstr+=`<td>${announcement.title}</td>`;
                    htmlstr+=`<td>${announcement.shortdescript}</td>`;
                    htmlstr+=`<td>${announcement.dateadded}</td>`;
                    htmlstr+=`</tr>`;
                }
                htmlstr+='</tbody>';
                announcementslist.innerHTML="";
                announcementslist.innerHTML=htmlstr;
            }
        }
    };
    xhr.send();
}