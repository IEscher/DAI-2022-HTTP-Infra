
# Step 4

## Launch servers

First of all, we needed to build the recipe, by doing:

```docker
docker-compose up
# OR
docker-compose up --build
```

The first cmd will print warning that the image has not been built already.

Then, it will run the container by default. It is possible to run
the container in background, with:

```docker
docker-compose start
```

The container can be killed with:

```docker
docker-compose stop
# OR
docker-compose kill 
```

## Accessing page

With a browser, it is now possible to access the static page by typing [localhost](http://localhost) in the nav. bar.

Thanks to the script ```./static/js/AJAXRequest.js```, the static page is able to formulate a GET request to localhost/api 
and pint it into the page every two seconds. It works by changing the text of a specific class in the html document.

## Difference between JQuery and the JS Fetch API

>The fetch specification differs from jQuery.ajax() in the following significant ways:
>
> * The Promise returned from fetch() won't reject on HTTP error status even if the response is an HTTP 404 or 500. Instead, as soon as the server responds with headers, the Promise will resolve normally (with the ok property of the response set to false if the response isn't in the range 200–299), and it will only reject on network failure or if anything prevented the request from completing.
> * Unless fetch() is called with the credentials option set to include, fetch():
>  * won't send cookies in cross-origin requests
>  * won't set any cookies sent back in cross-origin responses
>  * As of August 2018, the default credentials policy changed to same-origin. Firefox was also modified in version 61.0b13)
>
> -- <cite>https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch</cite>

In terms of syntax, the fetch API is a bit easier to read but is fundamentally the same.

## Static server modifications

### HTML file

The first modification is to add a script tag to the html file, in order to call the AJAXRequest.js file.
To achieve this, we added the following line at the very end of the body tag:

```html
<script src="js/AJAXRequests.js"></script>
```
This will call the script file ```AJAXRequests.js``` and execute it when the page loads.

The second modification is to add a new class that we will call ```dynamic-content``` somewhere in the HTML file, in 
order to display the data from the API. To do that we modified the line 77 of our ```index.html``` file:

```html
<div class="dynamic-content mt-0"></div>
```

This class will be used by the script file ```AJAXRequests.js``` to display the data.

### JS file

First, we wrote the function ```getDynamicResponse()```, using the Fetch API, that will query the API at the address 
```localhost/api``` (the dynamic server) and display the data in the ```dynamic-content``` class from the HTML file.

```js
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
```

Then, we use the function ```setInterval()``` that will call the function ```getDynamicResponse()``` every two seconds.

```js
setInterval(getDynamicResponse, 2000);
```

## Dynamic server modifications

### index.js file

The function ```generateConfig()``` being already written, we just need to send its result when the client is calling
the ```localhost/api``` address.

```js
app.get('/api', function(req, res) {
	res.send( generateConfig() );
});
```

This will send the result of the function ```generateConfig()``` to the client.

## Docker compose modifications

No modifications were needed since the path prefix ```/api``` is already defined for the dynamic server.



