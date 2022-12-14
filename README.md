# Social Media API

This is an API for social media platforms. It supports jwt authentication & authorization along with features including getting a user profile, follow a user, upload a post, delete a post, like a post, unlike a liked post, and comment on a post.

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

