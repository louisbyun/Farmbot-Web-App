[![Code Climate](https://codeclimate.com/github/FarmBot/farmbot-web-app/badges/gpa.svg)](https://codeclimate.com/github/FarmBot/farmbot-web-app)
[![Test Coverage](https://codeclimate.com/github/FarmBot/farmbot-web-app/badges/coverage.svg)](https://codeclimate.com/github/FarmBot/farmbot-web-app)
[![Build Status](https://travis-ci.org/FarmBot/farmbot-web-app.svg)](https://travis-ci.org/FarmBot/farmbot-web-app)

# Do I need this?

This repository is intended for *software developers* who wish to modify the [Farmbot Web App](http://my.farmbot.io/). **If you are not a developer**, you are highly encouraged to use [the publicly available web app](http://my.farmbot.io/).

If you are a developer interested in contributing or would like to provision your own server, you are in the right place.

# Farmbot Web API

**[LATEST STABLE VERSION IS HERE](https://github.com/FarmBot/Farmbot-Web-API/tree/a3762b25dab757d43623de3ed67c3c2d56dccb6c)** :star: :star: :star:

This Repo is RESTful JSON API for Farmbot. This includes things like storage of user data, plant data, authorization tokens and a variety of other resources.

The key responsibility of the API is *information and permissions management*. This should not be confused with device control, which is done via [MQTT](https://github.com/FarmBot/mqtt-gateway).

# Developer setup

 0. `git clone https://github.com/FarmBot/Farmbot-Web-API farmbot-web-app`
 0. `cd farmbot-web-app`
 0. `bundle install`
 0. `MQTT_HOST=your_mqtt_server_domain rails s`
 0. Start the [Web Front End](https://github.com/FarmBot/farmbot-web-frontend) (See it's README)
 0. Open localhost in your [favorite web browser](www.google.com/chrome‎)

# Provisioning Your Own with Dokku
#TODO

**We can't fix issues we don't know about.** Please submit an issue if you are having trouble installing on your local machine.

## Running Specs

Please run them before submitting pull requests.

 * `bundle exec rspec spec`
# Generating an API token

You must pass a `token` string into most HTTP requests under the `Authorization: ` request header.

Here's what a response looks like when you request a token:

```json
{
    "token": {
        "unencoded": {
            "sub": "test123@test.com",
            "iat": 1459109728,
            "jti": "922a5a0d-0b3a-4767-9318-1e41ae600352",
            "iss": "http://localhost:3000/",
            "exp": 1459455328,
            "mqtt": "localhost",
            "bot": "aa7bb37f-5ba3-4654-b2e4-58ed5746508c"
        },
        "encoded":
        // THE IMPORTANT PART IS HERE!!:
         "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJzdWIiOiJ0ZXN0MTIzQHRlc3QuY29tIiwiaWF0IjoxNDU5MTA5NzI4LCJqdGkiOiI5MjJhNWEwZC0wYjNhLTQ3NjctOTMxOC0xZTQxYWU2MDAzNTIiLCJpc3MiOiJodHRwOi8vbG9jYWxob3N0OjMwMDAvIiwiZXhwIjoxNDU5NDU1MzI4LCJtcXR0IjoibG9jYWxob3N0IiwiYm90IjoiYWE3YmIzN2YtNWJhMy00NjU0LWIyZTQtNThlZDU3NDY1MDhjIn0.KpkNGR9YH68AF3iHP48GormqXzspBJrDGm23aMFGyL_eRIN8iKzy4gw733SaJgFjmebJOqZkz3cly9P5ZpCKwlaxAyn9RvfjQgFcUK0mywWAAvKp5lHfOFLhBBGICTW1r4HcZBgY1zTzVBw4BqS4zM7Y0BAAsflYRdl4dDRG_236p9ETCj0MSYxFagfLLLq0W63943jSJtNwv_nzfqi3TTi0xASB14k5vYMzUDXrC-Z2iBdgmwAYUZUVTi2HsfzkIkRcTZGE7l-rF6lvYKIiKpYx23x_d7xGjnQb8hqbDmLDRXZJnSBY3zGY7oEURxncGBMUp4F_Yaf3ftg4Ry7CiA"
    }
}
```

**Important:** The response is provided as JSON for human readability. For you `Authorization` header, you will only be using `data.token.encoded`. In this example, it's the string starting with `eyJ0eXAiOiJ...`

## Via CURL

```
curl -H "Content-Type: application/json" \
     -X POST \
     -d '{"user":{"email":"test123@test.com","password":"password123"}}' \
     https://my.farmbot.io/api/tokens
```

## Via JQuery

Since the API supports [CORS](http://enable-cors.org/), you can generate your token right in the browser.

Here's an example:

```javascript
$.ajax({
    url: "https://my.farmbot.io/api/tokens",
    type: "POST",
    data: JSON.stringify({user: {email: 'admin@admin.com', password: 'password123'}}),
    contentType: "application/json"
})
.then(function(data){
  // You can now use your token:
  var MY_SHINY_TOKEN = data.token.encoded;
});
```

# How to Contribute

 * Pull requests are always appreciated, but *please*
   * Write tests.
   * Follow the [Ruby Community Style Guide](https://github.com/bbatsov/ruby-style-guide).
   * Raise issues. We love to know about issues. Even the issues you think are only relevant to your setup. Just submit issues if you have issues.
