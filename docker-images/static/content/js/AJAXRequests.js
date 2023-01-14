function getDynamicResponse() {
    fetch('http://localhost/api')
        .then((response) => response.json())
        .then((data) => {
            console.log(JSON.stringify(data));
            let message = "";
            if (data.length > 0) {
                message = JSON.stringify(data, null, 4);
                document.getElementsByClassName("dynamic-content").item(0).innerHTML
                    = "<pre>" + message + "</pre>";
            }
        });
}

getDynamicResponse();
setInterval(getDynamicResponse, 2000);



