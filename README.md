<p align="center"><img src ="https://raw.githubusercontent.com/adrianobrito/vaporwave/master/vaporwave_logo.png" /></p>

Vaporwave is a HTTP server capable of support self-implemented REST API's. You can use HTTP methods to send request to this server as it was a JSON database or a Firebase endpoint. 

# Installation
The package comes as CLI. So you need to install it globally via npm.

```sh
$ npm install -g @adrianobrito/vaporwave 
```

# Usage
In order to show the usage of vaporwave server, it will be used `curl` to illustrate the behavior of that server.

## GET Requests 
```sh
$ curl -X GET http://localhost:8000/test
$ [{"trackname":"Watching you dance","artist":"18 Caret Affair","id":55396},{"trackname":"Midnight","artist":"Luxury Elite","id":86061}]
```