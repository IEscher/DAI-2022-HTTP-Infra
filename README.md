# Labo HTTP Infra

## Authors

- Ian Escher
- Kévin Bougnon-Peigne

## Objectives

The first objective of this lab is to get familiar with software tools that will allow us to build a **complete web infrastructure**. By that, we mean that we will build an environment that will allow us to serve **static and dynamic content** to web browsers. To do that, we will see how to configure a **Web server** and a **reverse proxy**. We will also see that **express.js** is a JavaScript framework that makes it very easy to write dynamic web apps.

The second objective is to implement a simple, yet complete, **dynamic web application**. We will create **HTML**, **CSS** and **JavaScript** assets that will be served to the browsers and presented to the users. The JavaScript code executed in the browser will issue asynchronous HTTP requests to our web infrastructure (**AJAX requests**) and fetch content generated dynamically.

The third objective is to practice our usage of **Docker**. All the components of the web infrastructure will be packaged in custom Docker images (we will create at least 3 different images). We will also use **Docker compose** to define a complete infrastructure with several components.

For further explanations, please refer to [Lab5' statements file](Lab5-Statements.md) (the original README).

### Note

A dedicated branch has been made for each step of the laboratory. Doing so, it allows us to easily test each step separately.
In each of these branches are also README.md files that explain the step in more detail.

The main branch is a copy of the 6th step, but containing the report as main README.

## Step 1: Static HTTP server with apache httpd

### Acceptance criteria

All steps to dockerfile's rules, create container, launch and access it are described in the [step1's README](https://github.com/IEscher/DAI-2022-HTTP-Infra/blob/step1/README.md).

The static page uses this [free bootstrap's template](https://startbootstrap.com/theme/creative).

### In brief

Change directory to [docker-images/static](docker-images/static)

In the shell, create the container:

```shell
docker build --tag <A_USEFUL_AND_EASILY_IDENTIFIABLE_IMAGE_NAME> .
# Here's a tag if you don't have one easily :D
docker build --tag dai/http_step1 .
```

Run it:

```shell
docker run -p 9001:80 --rm <TAGGED_IMAGE_NAME>
# With tagged container
docker run -p 9001:80 --rm dai/http_step1
```

With a browser, access it by typing in the nav. bar:

```shell
http://localhost:9001
```

## Step 2: Dynamic HTTP server with express.js

All steps to dockerfile's rules, create container, launch and access it are described in the [step2's README file](https://github.com/IEscher/DAI-2022-HTTP-Infra/blob/step2/README.md).

As asked to do differently (see [Step2 section in statements](Lab5-Statements.md#acceptance-criteria-1), our generator gives random server's configuration (formatted as JSON, like those used in [our previous lab](https://github.com/KC5-BP/DAI-2022-SMTP-Classe-B/blob/main/config/configServer.json)) as dynamic payloads.

### In brief

Change directory to [docker-images/dynamic](docker-images/dynamic)

In the shell, create container:

```shell
# Here's a friendly tag again ^^
docker build --tag dai/http_step2 .
```

Run it:

```shell
docker run -p 9002:3000 --rm <TAGGED_IMAGE_NAME>
# With tagged container
docker run -p 9002:3000 --rm dai/http_step2
```

With a browser, access it by typing in the nav. bar:

```shell
http://localhost:9002
```

This must output some server's config. in JSON format, and different ones at each page reload.

## Step 3: Docker compose to build the infrastructure

Here, we will deploy a 1st version of the infrastructure with a static and dynamic web servers (respectively step1 & step2) using Docker compose.

All steps to dockerfile's rules and more detailed informations are described in the [step3's README file](https://github.com/IEscher/DAI-2022-HTTP-Infra/blob/step3/README.md).

This can be done using the [first version of compose rules](https://github.com/IEscher/DAI-2022-HTTP-Infra/blob/step3/docker-images/docker-compose.yml.old).

### In brief

The first time, it is good to build all services:

```shell
docker-compose build
```

Then, start them:

```shell
# To build and run in background [-d] (optional), but this will monopolize the shell without the "-d" flag
docker-compose up [-d] [--build]

# To run easily in background
docker-compose start
```

We can visit the services through a browser by typing in the nav. bar:

```shell
# Accessing static
http://localhost:9001

# Accessing dynamic
http://localhost:9002 # '/' being the default will tell that you'll have better chance with '/api' (kept because of the following part)
http://localhost:9002/api # JSON configs
```

*Note: Might need to clear "Form & search history" to avoid auto-completion of a suggested page*

## Step 3 (follow up): Reverse proxy with Traefik

The goal of this step is to run a reverse proxy in front of the dynamic and static Web servers such that the reverse proxy receives all connections and relays them to the respective Web server. 

Using this time, the [docker-compose.yml](docker-images/docker-compose.yml).

### In brief

The build and run section are the same.

The difference here is that we can access our services (always in the nav. bar of our browser) by only typing:

```shell
# Accessing static
http://localhost

# Accessing dynamic
http://localhost/api
```

That must result with the same behavior as the previous section.

Plus, we can access Traefik's dashboard through: `localhost:8999` to see the services status.

## Step 3a: Dynamic cluster management

The goal of this section is to allow Traefik to dynamically detect several instances of the (dynamic/static) Web servers. You may have already done this in the previous step 3.

Modify your `docker-compose.yml` file such that several instances of each Web server are started. Check that the reverse proxy distributes the connections between the different instances.

### In brief

Here, we have 2 possibilities to instanciate multiple instances.

#### Using 'replicas' rules

Add the `deploy` section to a service in the docker-compose.yml, like:

```docker
    static:
        build: ./static/.
        deploy:
            replicas: 3
```

That will launch 3 instances of the static server.

#### Using CLI argument

```shell
docker-compose up -d --scale <SERVICE_NAME>=<N_INSTANCES>
# Ex. with the static service
docker-compose up -d --scale static=3
```

This will have the same effect that using the replicas rules.

*Reminder: -d flag launch the up cmd in background*

Both can be verified through Traefik's dashboard.

## Step 4: AJAX requests with JQuery

The goal of the step is to use AJAX requests to dynamically update a Web page every few seconds with data coming from the dynamic Web server.

Note: in the webcast we introduce you to JQuery, but you can also use the more modern [JavaScript Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch) to easily make AJAX requests.

### In brief

The static server will query the dynamic server every 2 seconds using the fetch API.

```javascript
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

To launch the servers, please refer to the step 3 instructions.

## Step 5: Load balancing: round-robin and sticky sessions

By default, Traefik uses Round Robin to distribute the load among all available instances. However, if a service is stateful, it would be better to send requests of the same session always to the same instance. This is called sticky sessions.

The goal of this step is to change the configuration such that:

* Traefik uses sticky session for the static Web server instances
* Traefik continues to use round robin for the dynamic servers (no change required)

### In brief

To establish sticky sessions, we need to add the `traefik.http.routers.<SERVICE_NAME>.sticky` rule to the service in the docker-compose.yml, like:

```docker
        labels:
            
            # ...
            
            # sticky session
            - traefik.http.services.static.loadbalancer.sticky.cookie=true
            - traefik.http.services.static.loadbalancer.sticky.cookie.name=static-cookie
```

This will tell Traefik to use sticky sessions for the service.

To prove that the sticky sessions are enabled, we also added 3 whoami to a total of 3 static, 3 dynamic and 3 whoami services.
The static service and the whoami service have sticky sessions enabled, and the dynamic service has not. 

![Example](./docker-images/pics/example.png)

The Session hostname is the name of the whoami container that is serving the request. Below, just above the configs, is
the "Dynamic_server" field with its host name. We can see that the session hostname is the same for the same session, 
but the dynamic one alternates between 3 hostname in a round-robin way. This proves that the whoami service has sticky 
sessions enabled, and the dynamic service has not.

To launch the servers, please refer to the step 3 instructions.

## Step 6: Management UI

The dedicated README is [here](https://github.com/IEscher/DAI-2022-HTTP-Infra/blob/step6-ui/README.md).

The goal of this step is to deploy or develop a Web app that can be used to monitor and update your Web infrastructure dynamically. You should be able to list running containers, start/stop them and add/remove instances.

The solution used is through Portainer.

Exploring the step6's README, it is explained how to use the service and the container's management.

