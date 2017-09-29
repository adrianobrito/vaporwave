<p align="center"><img src ="https://raw.githubusercontent.com/adrianobrito/vaporwave/master/vaporwave_logo.png" /></p>

![CI Status](https://travis-ci.org/adrianobrito/vaporwave.svg?branch=master)


Vaporwave is a HTTP server capable of support self-implemented REST API's. You can use HTTP methods to send request to this server as it was a JSON database or a Firebase endpoint. It's provide the minimal necessary infrastructure to allow you adopt an UI-First development flow.

# Installation
The package comes as CLI. So you need to install it globally via npm. The current version is not definitive release. You can check the roadmap to first candidate release.

```sh
$ npm install -g @adrianobrito/vaporwave
```

# Usage
After installation, it's necessary to execute a command to startup server. If it's successfull started you will have a output like that below on your command shell.

```sh
$ vaporwave
Vaporwave is running on port 8000
  _    _
  |   /
--|--/-----__------__----__---)__-----------__---------__-
  | /    /   )   /   ) /   ) /   )| /| /  /   ) | /  /___)
__|/____(___(___/___/_(___/_/_____|/_|/__(___(__|/__(___ _
               /
              /
```
In order to show the usage of vaporwave server, it will be used `curl` to illustrate the behavior of that server.

Basically the server receive HTTP Requests on any endpoint, but do the REST task related with the HTTP method used on that particular endpoint. If you do a **HTTP GET** on **api/users** endpoint, the server will list all the data contained on **api/users** endpoint, like it was supposed to do on a RESTful application. Let's check an example:

```sh
$ curl -X GET "http://localhost:8000/api/users"
[]
```

When you startup the server throught `vaporwave` command, you can access it using port 8000. When you perform a simple **HTTP GET** on **api/users** the server gets the current state of related collection in this endpoint. The previous example returned a empty array, because the related collection with **api/users** is empty. In order to change the state of this endpoint, let's do **HTTP POST** request throught `curl`.

```sh
$ curl -X POST
	-H "Content-Type: application/json"
	-d '{"name":"Adriano Brito", "username": "adrianobrito", "password" : "qwe123"}'
	"http://localhost:8000/api/users"
{"name":"Adriano Brito","username":"adrianobrito","password":"qwe123","id":2323}
```
As a response it was given a JSON that was sent with an `id` property with some random number. If a new **HTTP GET** request is performed on **api/users** endpoint you will get the following output:

```sh
$ curl -X GET http://localhost:8000/api/users
[{"name":"Adriano Brito","username":"adrianobrito","password":"qwe123","id":2323}]
```

It's easy to check that the collection related with **api/users** is not empty anymore.

The returned object from **HTTP POST** request has an `id` property. This `id` allows you to create a request to that specific object using **api/users/{id}** endpoint like it's shown below:

```sh
$ curl -X GET "http://localhost:8000/api/users/2323"
{"name":"Adriano Brito","username":"adrianobrito","password":"qwe123","id":2323}
```

In order to update this unique object, it's necessary dispacth a **HTTP PUT** against vaporwave in some specific endpoint, sending the new version of the resource as request body, like below:

```sh
$ curl -X PUT
	-H "Content-Type: application/json"
	-d '{"name":"Adriano Brito Bispo","username":"adrianobritobispo","password":"qwe123","id":2323}'
	"http://localhost:8000/api/users/2323"
{"name":"Adriano Brito Bispo","username":"adrianobritobispo","password":"qwe123","id":2323}

$ curl -X GET "http://localhost:8000/api/users/2323"
{"name":"Adriano Brito Bispo","username":"adrianobritobispo","password":"qwe123","id":2323}
```

It's easy to see that the object related with **api/users/2323** endpoint was updated with the object sent in **HTTP PUT** request body.

If you need to remove a specific object from server, you can perform a **HTTP DELETE** with an ID in request path, like is shown below:

```sh
$ curl -X DELETE "http://localhost:8000/api/users/2323"
{"name":"Adriano Brito Bispo","username":"adrianobritobispo","password":"qwe123","id":2323}

$ curl -X GET "http://localhost:8000/api/users/2323"

```
After execute an **HTTP DELETE** request in **api/users/2322** endpoint, the server will remove that specific object from your internal database. It's shown on subsequent **HTTP GET** request.

# Contribute

If you want to help on development of vaporwave first release, you can check our issues [here](https://github.com/adrianobrito/vaporwave/milestone/1). Feel free to create a pull request or suggest some new changes to be added to the first release proposal.
