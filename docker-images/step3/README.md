
# Step3

## 1st part: docker compose

The main difference between docker run and docker compose is that:

- docker run: is entirely cmd based 
- docker compose: read a configuration file (in a YAML format)
    - Compose's rules can be made from created Dockerfile. This is great knowing that we write some for previous steps.

From tutorial in repo's [README](../../README.md) and some more web references, we can write the [docker-compose rules file](docker-compose.yml)

The rules are written to run 2 services (each service represents b
oth previous steps) and expose their ports to the host machine.

At first, it is needed to build the recipe, by doing:

```shell
docker-compose up
```

Then, it will run the container by default. It is possible to run
the container in background, with:

```shell
docker-compose start
```

The container can be killed with:

```shell
docker-compose stop
```

