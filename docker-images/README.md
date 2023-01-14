
# Step 4

## docker compose

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

## Launching page

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
