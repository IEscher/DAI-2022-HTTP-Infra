# STEP 6: Management UI

## Reference(s)

* [Find a solution, keyword: `docker container managing web`](https://search.brave.com/search?q=docker+container+managing+web)

* [Some solutions](https://karthi-net.medium.com/top-6-gui-tools-for-managing-docker-environments-ee2d69ba5a4f)

* [How to add portainer in a docker-compose.yml](https://jacar.es/en/como-instalar-portainer-con-docker-compose/)

## Implementation

With the last reference, we add the rules to launch a Portainer service to the [docker-compose.yml](docker-compose.yml).

## Usage

Starting by launching containers:

```shell
docker-compose up -d --build
```

Now, Portainer' service is accessible through a browser, by reaching [localhost:9000](http://localhost:9000) (port defined in compose rules).

### Login

First, it asks for a login:

![pic-portainer-login](pics/portainer-1stLogin.png)

Define your credentials.

This configuration will then be set in a `portainer-data/` folder. We haven't committed it in the repo. , for security reasons obviously.

So feel free to delete the [.gitignore](.gitignore) if you're copying the project and need to share datas throughout the repo. .

### Listing containers

After login phase passed, it is possible to see which services are actually running.

Go to Home \> Dashboard, reach the local section that is displaying on the screen:

![pic-portainer-dashboard](pics/portainer-dashboard.png)

You'll reach a page listing infos, so reach the `Containers` to see various containers that the service detected on your machine.

Let's order them by creation date:

![pic-portainer-containers](pics/portainer0-atStart.png)

We can also see them on the [Traefik services section](http://localhost:8999/dashboard/#/http/services):

![pic-traefik-containers](pics/traefik0-atStart.png)

### Operations

#### Stop

Let's start the demo., by stopping the static server:

On Portainer:

![pic-portainer-stopped-static](pics/portainer1-stoppedStatic.png)

On Traefik:

![pic-traefik-stopped-static](pics/traefik1-stoppedStatic.png)

#### Duplicate

Let's the duplication:

On Portainer:

![pic-portainer-duplicated-static](pics/portainer2-duplicatedStatic.png)

**Remark: /!\ A WARNING can be obtained if you don't change the container's name /!\ .**

So look at your name before reporting any issue.

On Traefik:

![pic-traefik-duplicated-static](pics/traefik2-duplicatedStatic.png)

Both services offer us to see the access IP & port.

But Traefik gives us the full path, so let's be lazy here:

![pic-traefik-duplicated-static](pics/traefik2-servicesAccesses.png)

#### Kill on CLI

We will see that killing the composer through the CLI kills every instances, duplicated ones as well:

![pic-traefik-duplicated-static](pics/cli0-stoppedDuplicatedAsWell.png)

