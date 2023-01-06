
function getServerIPAddress() {
    console.log("getServerIPAddress");
    fetch('http://localhost/ip')
        .then((response) => response.text())
        .then((data) => {
            if (data.length > 0) {
                console.log("Response IP Address: " + data);
                document.getElementsByClassName("server-name").item(0).innerHTML
                    = "<pre>" + data + "</pre>";
            }
        });

    // document.getElementsByClassName("server-name").item(0).innerHTML
    //                 = "<pre>" +  + "</pre>";
}

function getDynamicResponse() {
    fetch('http://localhost/api')
        .then((response) => response.json())
        .then((data) => {
            // console.log(JSON.stringify(data));
            let message = "";
            if (data.length > 0) {
                message = JSON.stringify(data, null, 4);
                document.getElementsByClassName("dynamic-content").item(0).innerHTML
                    = "<pre>" + message + "</pre>";
            }
        });
}

getServerIPAddress();

getDynamicResponse();
setInterval(getDynamicResponse, 2000);


