# Social Media API

This is an API for social media platforms. It supports jwt authentication & authorization along with features including getting a user profile, follow a user, upload a post, delete a post, like a post, unlike a liked post, and comment on a post.

## Setup

Create a ```.env``` file with the following credentials for connecting to the server:

```
PORT = <port>
MONGO_URI = <MONGO URI>
DB_NAME = <Database Name>
DB_USER = <Database User>
DB_PASS = <Password>
```

## Installation

Use the package manager [npm](https://docs.npmjs.com/cli/v8/commands/npm-install) to install the application and it's dependencies.

```bash
npm install 
node server.js
```

## Login

A dummy account has been created for authentication.

Login on the endpoint ```/api/authenticate``` with json body:

```json
{
    "email": "abcd@gmail.com",
    "password":"12345678"
}
```

Set the Authorization header with the bearer token received to access further APIs

## Docker Image

To get the docker image use the following command:
```
docker pull shreydock7/social-media-api:latest
```

Expose the container ```PORT: 3000``` 

The server is live and running on ```http://localhost:3000```

Follow the same authentication steps as listed above for further access.

