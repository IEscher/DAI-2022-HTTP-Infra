
# STEP 1: Dynamic HTTP Server

***Remark(s):***

- Cmds might need to be ran as sudo/admin

## Docker

### Container creation

```shell
# Run (/Create if not existant) container
docker run -d -p 9090:80 php:5.6-apache
```

**Flags:**

- -d : Run in background
- -p : Open vm ports to host's as \<HOST_PORT:VM_PORT\>
- \<DOCKER_IMAGE_NAME\> : Might be the FROM section in the Dockerfile, an ex.: **php:5.6-apache**

*This cmd might not find an docker image locally, so it will do a pulling to get it*

To check that the container is correctly running, it is possible to list running container with:

```shell
docker ps
```

With an output, like:

```text
CONTAINER ID   IMAGE            COMMAND                  CREATED          STATUS          PORTS                                   NAMES
9187753936d4   php:5.6-apache   "docker-php-entrypoi…"   10 minutes ago   Up 10 minutes   0.0.0.0:9090->80/tcp, :::9090->80/tcp   amazing_noyce
```

### Image structure exploration

We can interact directly within the container and modify its content.

In this step, it will be shown how to:

```shell
# Run bash terminal inside running docker image (identified with its NAME in the NAMES column)
docker exec -it amazing_noyce /bin/bash
```

The terminal then goes to:

```text
root@9187753936d4:/var/www/html#
```

We can then interact with some commands like: ls, echo and so on...

**Note: Everything done through that interaction is static and will be lost when the container is stopped!**

The default page can be set with an "index.html" file.

To avoid losing created and modified files, we can create a docker image through Dockerfile's rules. Then each time we start the container, we begin with the same structure. (look the [content](content/) folder)

```shell
docker build --tag <A_USEFUL_AND_EASILY_IDENTIFIABLE_IMAGE_NAME> .
```

And then run it with:

```shell
docker run -p 9090:80 --rm <TAGGED_IMAGE_NAME>
```

