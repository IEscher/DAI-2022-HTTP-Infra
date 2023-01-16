
# STEP 2: Dynamic HTTP Server

***Remark(s):***

- Cmds might need to be ran as sudo/admin

## Reference(s)

### What will be done

* [Step2' statement](https://github.com/IEscher/DAI-2022-HTTP-Infra/blob/main/Lab5-Statements.md#step-2-dynamic-http-server-with-expressjs)

## Nodejs + Express application

On step1, we used an html page (static version). Let's use a more dynamic approach through a nodejs + express application, with a ["index.js"](src/index.js) file.

### Dependencies

```shell
# On Ubuntu/Debian oses, install nodejs package manager
apt install npm
```

Create a project in a folder and initiate a nodejs project with 

```shell
npm --init
```

We need to add various packages: Chance (for RNG) + Express (Server manager)

```shell
npm install chance
npm install express
```

*Note: Add **--save** flag to make a permanent installation of the pkg on your machine*

Dependencies can then be seen in the [node_modules/](src/node_modules) folder

### Test app

Run [it](docker-images/dynamic/src/index.js) in local with:

```shell
npm index.js
```

And then connect to it with telnet:

```shell
telnet localhost 3000 # 3000 Default port for Express
```

And type cmd: 

```shell
GET / HTTP/1.0
```

It must result in the application returning server configuration, like:

```text
Will generate <N> server configurations
[
    {
        config: {
            ip: 'localhost',
            encoding: 'ASCII',
            portSMTP: 1590333714,
            portHTTP: 32524
        }
    },
    {
        config: {
            ip: 'smtp.tructruc.ch',
            encoding: 'UTF-8',
            portSMTP: 1183164885,
            portHTTP: 21846
        }
    },
    ...
]
```

## Docker

Let's use a docker container to deploy our application more easily.

The [rules](docker-images/dynamic/Dockerfile) create a container using a base image containing a version of nodejs.

Then it copies our [custom files](docker-images/dynamic/src/) into the app folder of the container.

Finally, it runs the application using the "CMD" keyword.

### Container creation

```shell
docker build --tag <A_USEFUL_AND_EASILY_IDENTIFIABLE_IMAGE_NAME> .
```

### Running container

```shell
docker run -p 9001:3000 --rm <TAGGED_IMAGE_NAME>
```

*Note: Port 3000, because it is the default value used by express*

We can access the app using port 9002, instead of its default one (being 3000).

We can see graphically the output, with a browser, by reaching [localhost:9002](http://localhost:9002)

