
# Step3

## 1st part: docker compose

The main difference between docker run and docker compose is that:

- docker run: is entirely cmd based 
- docker compose: read a configuration file (in a YAML format)
    - Compose's rules can be made from created Dockerfile. This is great knowing that we write some for previous steps.

From tutorial in repo's [README](../README.md) and some more web references, we can write the first [docker-compose rules file](docker-compose.yml.old)

The rules are written to run 2 services (each service represents both previous steps) and expose their ports to the host machine.

At first, it is needed to build the recipe, by doing:

```docker
docker-compose build
# OR
docker-compose up --build
```

*Note: The second cmd will monopolize the shell. Plus, it might print warning that the image has not been built already. Don't worry and accept if needed*

Then, it will run the container by default. It is possible to run
the container in background, with:

```docker
docker-compose start
```

We can access each service by typing localhost:\<SERVICE_PORT\> in the nav. bar. In our case, `localhost:9000` for the static page, and `localhost:9001` for the dynamic.

The container can be killed with:

```docker
docker-compose stop
# OR
docker-compose kill 
```

## 2nd part: Launching pages using a reverse proxy

Using the service Traefik and by adding its part in the [compose rules](docker-compose.yml), it is now possible to access the static page by typing [localhost](http://localhost) and [localhost/api](http://localhost/api) for the dynamic one, in the nav. bar of the broswer of your choice.

## 3rd part: Multiple instances

To launch multiple instances of a service, it can be done with the cmd:

```docker
docker-compose up --scale <SERVICE_NAME>=<N_INSTANCES>
```

Ex. we wrote a service ```static``` in [docker-compose.yml](docker-compose.yml):

```docker
# Launch 3 instances of the static service (see step1)
docker-compose up -d --scale static=3
```

To check the IPs of the different instances, we need to reach the Traefik dashboard at [localhost:9000](http://localhost:9000) (9000 because we remap port 8080 on 9000 in the [docker-compose rules](docker-compose.yml) file.

Then reach: HTTP > Services, we have then a dashboard like:

![http_services](pics/httpServicesDashboard.png)

On last row, we can see that the static-step3@docker has 3 servers launched. By clicking on it, we can see their IPs to reach them:

![static_ips](pics/staticIps.png)

