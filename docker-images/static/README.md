
# STEP 1: Static HTTP server with apache httpd

## Reference

### Criteria

* [Ask for the lab](https://github.com/IEscher/DAI-2022-HTTP-Infra/blob/main/Lab5-Statements.md#step1)

### Webcast

* [Labo HTTP (1): Serveur apache httpd "dockerisé" servant du contenu statique](https://www.youtube.com/watch?v=XFO4OmcfI3U)

### Web interface 

Asked to be different from the webcast.

* [Free boostrap theme](https://startbootstrap.com/theme/creative)

## General Note

- Cmds might need to be ran as sudo/admin
- PHP Version used: 7.2 (as recommended)

## Docker

The [Dockerfile](Dockerfile) create a container image based on an existing one, with the "FROM section", and add our own files (in our case, the [content/ folder](content) containing the interface downloaded from bootstrap).

### Running container

```shell
# Run (/Create if not existant) container
docker run -d -p 9000:80 php:7.2-apache

# And by naming it
docker run -d -p 9000:80 --name <CONTAINER_IMAGE_NAME> php:7.2-apache
```

**Flags:**

- -d : Run in background
- -p : Open vm ports to host's as \<HOST_PORT:VM_PORT\>
- php:7.2-apache : Is the existing image that we want to base our image from, equivalent to the FROM section in the Dockerfile
- --name : Instead of letting docker naming the container, we can do it ourselves

*This cmd might not find a docker image locally, so it will do a pulling to get it*

To check that the container is correctly running, it is possible to list running container with:

```shell
docker ps
```

With an output, like:

```text
CONTAINER ID   IMAGE            COMMAND                  CREATED          STATUS          PORTS                                   NAMES
9187753936d4   php:7.2-apache   "docker-php-entrypoi…"   10 minutes ago   Up 10 minutes   0.0.0.0:9000->80/tcp, :::9090->80/tcp   amazing_noyce
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

The default page can be set with an "index.html" file.

**Note: Everything done through that interaction is static and will be lost when the container is stopped!** This due to the fact that we run directly from the Dockerfile and not building it first.

### Avoid data loss by building an image

To avoid losing created and modified files, instead, we can create a local folder that will be copied to the docker image through Dockerfile's rule. Then each time we start the container, we begin with the same structure. (look the [content](content/) folder)

```shell
docker build --tag <A_USEFUL_AND_EASILY_IDENTIFIABLE_IMAGE_TAG> .
```

And then run it with:

```shell
docker run -p 9000:80 --rm <TAGGED_IMAGE_NAME>
```

**Flags:**

- -t, --tag : Give  the container a tag, instead of a name, you choose the better for you ;)
- --rm : Remove ressources used between the container and the host machine properly

