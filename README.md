<p align="center"><img src ="https://raw.githubusercontent.com/adrianobrito/vaporwave/master/vaporwave_logo.png" /></p>

Vaporwave is a HTTP server capable of support self-implemented REST API's. You can use HTTP methods to send request to this server as it was a JSON database or a Firebase endpoint. It's provide the minimal necessary infrastructure to allow you adopt an UI-First development flow. 

# Installation
The package comes as CLI. So you need to install it globally via npm.

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
$ curl -X GET http://localhost:8000/api/users
[]
```

When you startup server throught `vaporwave` command, you can access using port 8000. When you perform a simple **HTTP GET** on **api/users** the server get the current state of related collection in this endpoint. The previous example returned a empty array because the related collection with **api/users** is empty. In order to change the state of this endpoint, let's perform a **HTTP POST** throught `curl`.

```sh
$ curl -X POST 
	-H "Content-Type: application/json" 
	-d '{"name":"Adriano Brito", "username": "adrianobrito", "password" : "qwe123"}' 
	"http://localhost:8000/api/users"
{"name":"Adriano Brito","username":"adrianobrito","password":"qwe123","id":2323}
```
