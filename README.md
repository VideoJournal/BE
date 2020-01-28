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

## API Documentation

The One Line a Day is hosted on Heroku and can be [here](https://one-line-daily.herokuapp.com/).

The [full documentation](https://one-line-daily.herokuapp.com/api/docs/) is also available on heroku.

### API Endpoints

The following endpoints are available for use.

| Methods | Endpoint         | Description                              |
| ------- | ---------------- | ---------------------------------------- |
| GET     | /                | Returns the server status with a message |
| GET     | /api/user        | gets a user                              |
| PUT     | /api/user        | updates a user                           |
| POST    | /signup          | registers a new user                     |
| POST    | /signin          | logs a user in                           |
| GET     | /api/video       | gets all videos                          |
| GET     | /api/video/:id   | gets a video by id                       |
| DELETE  | /api/video:id    | deletes a video                          |
| POST    | /api/video       | creates a video                          |
| GET     | /api/comment     | gets all comments                        |
| GET     | /api/comment/:id | get a single comment                     |
| PUT     | /api/comment/:id | updates a comment                        |
| DELETE  | /api/comment/:id | deletes a comment                        |
| POST    | /api/comment     | creates a comment                        |

### Authentication Endpoints

#### Registration [POST]

**URL**: _https://videojournal.herokuapp.com/signup_

**Payload**:

```javascript
{
	"name": "Oyekunle Oloyede",
	"userName": "Chief Oye",
	"email": "chief@oye.com",
	"password": "thoushallnotpass"
}
```

**Returns**: A token to use for subsequent requests.

```javascript
{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVlMmNDJhNmU4ODcwMDAxNzkxOGUxNCIsImlhdCI6MTU4MDIwMTAiwiZXhwIjoxNTg4ODQxMDAyfQ.3nJf1OKt-GJ5qIwBNd4oNXdXSeUGE5256hwfoBlKRm4"
}
```

#### Login [POST]

**URL**: _https://videojournal.herokuapp.com/signin_

**Payload**:

```javascript
{
	"email": "chief@oye.com",
	"password": "thoushallnotpass"
}
```

**Returns**: A token to use for subsequent requests.

```javascript
{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVlMmNDJhNmU4ODcwMDAxNzkxOGUxNCIsImlhdCI6MTU4MDIwMTAiwiZXhwIjoxNTg4ODQxMDAyfQ.3nJf1OKt-GJ5qIwBNd4oNXdXSeUGE5256hwfoBlKRm4"
}
```

#### Get all users [GET]

**URL**: _https://videojournal.herokuapp.com/api/user_

**Returns**: A user object.

```javascript
{
    "data": {
        "_id": "5e2ff42a6e88700017918e14",
        "name": "Oyekunle Oloyede",
        "userName": "Chief Oye",
        "email": "chief@oye.com",
        "createdAt": "2020-01-28T08:43:22.909Z",
        "updatedAt": "2020-01-28T08:43:22.909Z",
        "__v": 0
    }
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
