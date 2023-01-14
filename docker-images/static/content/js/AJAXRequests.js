
// Proof that the static servers are implementing sticky sessions
function getServer() {
    console.log("getServerIPAddress");
    fetch('http://localhost/ip')
        .then((response) => response.text())
        .then((data) => {
            if (data.length > 0) {
                document.getElementsByClassName("server-name").item(0).innerHTML
                    = "<pre>" + data.toString().match(/Hostname: (.*)/)[1] + "</pre>";
            }
        });
}

function getDynamicResponse() {
    fetch('http://localhost/api')
        .then((response) => response.json())
        .then((data) => {
            let message = "";
            if (data.length > 0) {
                message = JSON.stringify(data, null, 4);
                document.getElementsByClassName("dynamic-content").item(0).innerHTML
                    = "<pre>" + message + "</pre>";
            }
        });
}

getServer();

getDynamicResponse();
setInterval(getDynamicResponse, 2000);


