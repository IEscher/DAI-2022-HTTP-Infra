
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

## 2nd part: Launching pages

With a browser, it is now possible to access the static page by typing [localhost](http://localhost) in the nav. bar.

And for the dynamic page, it can be accessed by typing [localhost/api](http://localhost/api).
