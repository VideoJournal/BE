# Video Journal --- Backend

The Video Journal project backend.

Video journal allows users to upload, manage and share videos with friends. A user can upload videos and others can comment on the videos.

## NPM Scripts

### `npm i`

Installs project dependencies.

### `npm  run build`

Creates a build of the project and outputs to the `dist` folder.

### `npm start`

Starts the server at port 3000.

### `npm run dev`

Starts the development server in watch mode at port 2000.

### `npm test`

Runs all the test suites and displays test coverage.

### `npm run watch`

Starts the test in watch mode. Great for development 😄.

### `npm run prod`

Uses the _npm-run-all_ library to run the rollback, migrate and seed scripts. Sweet little combo ✌️.

## API Documentation

The One Line a Day is hosted on Heroku and can be [here](https://one-line-daily.herokuapp.com/).

The [full documentation](https://one-line-daily.herokuapp.com/api/docs/) is also available on heroku.

### API Endpoints

The following endpoints are available for use.

| Methods | Endpoint              | Description                              |
| ------- | --------------------- | ---------------------------------------- |
| GET     | /                     | Returns the server status with a message |
| GET     | /api/auth/users       | gets all users                           |
| GET     | /api/auth/users/:id   | gets a user by id                        |
| POST    | /api/auth/register    | registers a new user                     |
| POST    | /api/auth/login       | logs a user in                           |
| GET     | /api/entries          | gets all entries                         |
| GET     | /api/entries/:id      | gets an entry by id                      |
| GET     | /api/entries/user/:id | returns the ticket created by a user     |
| POST    | /api/entries          | creates an entry                         |
| PUT     | /api/entries/:id      | updates an entry                         |
| DELETE  | /api/entries/:id      | deletes an entry                         |
| POST    | /subscribe            | subscribes a user to get push message    |

#### User Schema

|  Fields   |    Data type     |                      Metadata                       |
| :-------: | :--------------: | :-------------------------------------------------: |
|    id     | unsigned integer | primary key, auto-increments, generated by database |
| firstname |      string      |                      required                       |
| lastname  |      string      |                      required                       |
| username  |      string      |                  required, unique                   |
|   email   |      string      |                  required, unique                   |
| password  |      string      |                  required, unique                   |

#### Entry Schema

|     Fields      |    Data type     |                      Metadata                       |
| :-------------: | :--------------: | :-------------------------------------------------: |
|       id        | unsigned integer | primary key, auto-increments, generated by database |
|      title      |      string      |        required, maximum of 250 characters.         |
|      text       |       text       |                      required                       |
|   created_at    |    timestamp     |                generated by database                |
|     user_id     | unsigned integer |     required, foreign key, references users(id)     |
| image(optional) |       file       |                  defaults to null                   |

**NOTE**: To send an image along with an entry, the request type must be _multipart/form-data_.

### Authentication Endpoints

#### Registration [POST]

**URL**: _https://one-line-daily.herokuapp.com/api/auth/register_

**Payload**:

```javascript
{
    "firstname": "wale",
    "lastname": "Doe",
    "username": "janeDoe2",
    "email": "janeDoe2@doe.com",
    "password": "12345"
}
```

**Returns**: A message that user has been added successfully.

```javascript
{
    "status": 201,
    "message": "User created successfully"
}
```

#### Login [POST]

**URL**: _https://one-line-daily.herokuapp.com/api/auth/login_

**Payload**:

```javascript
{
    "email": "janeDoe2@doe.com",
    "password": "12345"
}
```

**Returns**: An object with the token

```javascript
{
    "status": 200,
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6OCwiaWF0IjoxNTY0NDIydfdferleHAiOjE1NjQ0MjYyODV9.QkVwzXvzZpDw2BXTVyzEid-yba5RoiYUQoqXloaMZ-8",
    "user": {
        "id": 8,
        "firstname": "wale",
        "lastname": "Doe",
        "email": "me@me.com"
    }
}
```

#### Get all users [GET]

**URL**: _https://one-line-daily.herokuapp.com/api/auth/users_

**Returns**: An array of user object.

```javascript
{
    "status": 200,
    "data": [
        {
            "id": 1,
            "firstname": "John",
            "lastname": "Doe",
            "email": "jh@john.com"
        },
        {
            "id": 2,
            "firstname": "Jane",
            "lastname": "Doe",
            "email": "jn@john.com"
        },
        {
            "id": 3,
            "firstname": "Will",
            "lastname": "Smith",
            "email": "fresh@prince.com"
        },
        {
            "id": 4,
            "firstname": "Vin",
            "lastname": "Diesel",
            "email": "vin@diesel.com"
        },
        {
            "id": 5,
            "firstname": "Van",
            "lastname": "Damme",
            "email": "van@damme.com"
        },
        {
            "id": 6,
            "firstname": "wale",
            "lastname": "Doe",
            "email": "wale@doe.com"
        },
        {
            "id": 7,
            "firstname": "wale",
            "lastname": "Doe",
            "email": "wale@doe.coms"
        },
        {
            "id": 8,
            "firstname": "wale",
            "lastname": "Doe",
            "email": "me@me.com"
        }
    ]
}
```

#### Get user by id [GET]

**URL**: _https://one-line-daily.herokuapp.com/api/auth/users/1_

**Returns**: the user object.

```javascript
{
    "status": 200,
    "data": {
        "id": 5,
        "firstname": "Van",
        "lastname": "Damme",
        "email": "van@damme.com"
    }
}
```

### Protected Endpoints

#### Get all entries [GET]

**URL**: _https://one-line-daily.herokuapp.com/api/entries_

**Returns**: Returns an array of entries.

```javascript
{
    "status": 200,
    "data": [
        {
            "id": 1,
            "title": "first entry",
            "text": "this is quite awesome right.",
            "created_at": "2019-07-30T13:34:38.772Z",
            "user_id": 1
        },
        {
            "id": 2,
            "title": "second entry",
            "text": "keep hacking and never look back.",
            "created_at": "2019-07-30T13:34:38.772Z",
            "user_id": 2
        },
        {
            "id": 3,
            "title": "third entry",
            "text": "go, and may the codes be with you.",
            "created_at": "2019-07-30T13:34:38.772Z",
            "user_id": 3
        },
        {
            "id": 4,
            "title": "fourth entry",
            "text": "fourth time lucky?",
            "created_at": "2019-07-30T13:34:38.772Z",
            "user_id": 4
        },
        {
            "id": 5,
            "title": "fifth entry",
            "text": "the dark forces will never prevail while the server is up.",
            "created_at": "2019-07-30T13:34:38.772Z",
            "user_id": 5
        }
    ]
}
```

#### Get entry by id [GET]

**URL**: _https://one-line-daily.herokuapp.com/api/entries/17_

**Returns**: Returns an entry object.

```javascript
{
    "status": 200,
    "data": {
        "id": 17,
        "title": "file upload",
        "text": "this uploads file to cloudinary",
        "created_at": "2019-07-31T14:43:29.686Z",
        "user_id": 2,
        "image": {
            "url": "http://res.cloudinary.com/dopxebhwn/image/upload/v1564584208/one_line_a_day/jspat0k0fjihpcqredrm.png"
        }
    }
}
```

#### Get a user's entry [GET]

**URL**: _https://one-line-daily.herokuapp.com/api/entries/user/1_

**Returns**: An array of user's entry

```javascript
{
    "status": 200,
    "data": [
        {
            "id": 4,
            "title": "fourth entry",
            "text": "fourth time lucky?",
            "created_at": "2019-07-30T10:46:09.135Z"
        },
        {
            "id": 10,
            "title": "seventh entry",
            "text": "lets go",
            "created_at": "2019-07-30T11:35:13.775Z"
        }
    ]
}
```

#### Create an entry [POST]

**URL**: _https://one-line-daily.herokuapp.com/api/entries_

**Payload**: The entry object to be created.

```javascript
{
    "title": "random entry",
    "text": "go, and may the codes be with you.",
    "user_id": 1
}
```

**Returns**: The newly created entry.

```javascript
{
    "status": 201,
    "data": [
        {
            "id": 23,
            "title": "random entry",
            "text": "go, and may the codes be with you.",
            "user_id": 1,
            "created_at": "2019-07-31T14:45:03.165Z",
            "image": null
        }
    ]
}
```

#### Update an entry [PUT]

**URL**: _https://one-line-daily.herokuapp.com/api/entries/6_

**Payload**: The entry object to be updated.

```javascript
{
    "title": "sixth entry",
    "text": "go, and may the codes be with you.",
    "user_id": 1
}
```

**Returns**: The updated entry.

```javascript
{
    "status": 200,
    "data": [
        {
            "id": 6,
            "title": "sixth entry",
            "text": "go, and may the codes be with you.",
            "user_id": 1,
            "created_at": "2019-07-30T14:14:04.095Z",
            "image": null
        }
    ]
}
```

#### Delete entry [DELETE]

**URL**: _https://one-line-daily.herokuapp.com/api/entries/6_

**Returns**: A JSON object with a message

```javascript
{
    "status": 200,
    "data": "1 entry deleted."
}
```

## Testing

The server uses the Jest testing framework to run tests.

Check tests with the `npm test` command.

Coverage is also integrated and the can be viewed with the `npm test` command.

Run the test in watch mode with `npm run watch`.

## Push Notifications

This server is built to support push notifications 📱 💻.

Make `POST` request to `/subscribe` when subscribing a client for push messages.

## Author

💻 ☕️ **Oyekunle Oloyede** 😎 🤙
