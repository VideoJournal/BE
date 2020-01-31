# Video Journal --- Backend

The Video Journal project backend.

Video journal allows users to upload, manage and share videos with friends. A user can upload videos and others can comment on the videos.

## Deploy

This app is deployed on heroku and can be found [here](https://videojournal.herokuapp.com/)

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

## API Documentation

The [full documentation](https://documenter.getpostman.com/view/6495381/SWTAAyLH) is also available.

### API Endpoints

The following endpoints are available for use.

| Methods | Endpoint                | Description                              |
| ------- | ----------------------- | ---------------------------------------- |
| GET     | /                       | Returns the server status with a message |
| GET     | /api/user               | gets a user                              |
| PUT     | /api/user               | updates a user                           |
| POST    | /signup                 | registers a new user                     |
| POST    | /signin                 | logs a user in                           |
| GET     | /api/video              | gets all videos                          |
| GET     | /api/video/:id          | gets a video by id                       |
| DELETE  | /api/video:id           | deletes a video                          |
| POST    | /api/video              | creates a video                          |
| GET     | /api/comment            | gets all comments                        |
| GET     | /api/comment/:id        | get a single comment                     |
| PUT     | /api/comment/:id        | updates a comment                        |
| DELETE  | /api/comment/:id        | deletes a comment                        |
| POST    | /api/comment            | creates a comment                        |
| GET     | /api/comment/videos/:id | gets comments by video id                |

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

### Protected Endpoints

#### Get user [GET]

**URL**: _https://videojournal.herokuapp.com/api/user_

**Returns**: A user object.

```javascript
{
    "data": {
        "_id": "5e313c3274970a0d47269eae",
        "name": "Oyekunle Oloyede",
        "userName": "Chief Oye",
        "email": "chief@oye.com",
        "createdAt": "2020-01-29T08:02:58.035Z",
        "updatedAt": "2020-01-29T08:02:58.035Z",
        "__v": 0,
        "videos": [
            {
                "_id": "5e313d4874970a0d47269eaf",
                "videos": [
                    "First url",
                    "second url"
                ],
                "description": "Watch Kobe Bryant bring magic.",
                "createdBy": "5e313c3274970a0d47269eae",
                "__v": 0
            },
            {
                "_id": "5e313d6774970a0d47269eb0",
                "videos": [
                    "url"
                ],
                "description": "Lionel Messi is the GOAT",
                "createdBy": "5e313c3274970a0d47269eae",
                "__v": 0
            }
        ]
    }
}
```

#### Update user [PUT]

**URL**: _https://videojournal.herokuapp.com/api/user_

**Payload**:

```javascript
{
	"userName": "Chief Oye"
}
```

**Returns**: the response object.

```javascript
{
    "data": null
}
```

#### Get all videos [GET]

**URL**: _https://videojournal.herokuapp.com/api/video_

**Returns**: Returns an array of videos.

```javascript
{
    "data": [
        {
            "_id": "5e2ff8456e88700017918e15",
            "videos": [
                "First url",
                "second url"
            ],
            "description": "a very fun video to watch",
            "createdBy": "5e2ff42a6e88700017918e14",
            "__v": 0
        },
        {
            "_id": "5e2ff9956e88700017918e18",
            "videos": [
                "First url",
                "second url"
            ],
            "description": "a very fun video to watch",
            "createdBy": "5e2ff42a6e88700017918e14",
            "__v": 0
        }
    ]
}
```

#### Get video by id [GET]

**URL**: _https://videojournal.herokuapp.com/api/video/5e2ff8456e88700017918e15_

**Returns**: Returns a video object.

```javascript
{
    "data": {
        "_id": "5e2ff8456e88700017918e15",
        "videos": [
            "First url",
            "second url"
        ],
        "description": "a very fun video to watch",
        "createdBy": "5e2ff42a6e88700017918e14",
        "__v": 0
    }
}
```

#### Create a video [POST]

**URL**: _https://videojournal.herokuapp.com/api/video_

**Payload**: The video object to be created.

```javascript
{
	"videos": ["First url", "second url"],
	"description": "a very fun video to watch"
}
```

**Returns**: The newly created video.

```javascript
{
    "data": {
        "videos": [
            "First url",
            "second url"
        ],
        "_id": "5e2ff9956e88700017918e18",
        "description": "a very fun video to watch",
        "createdBy": "5e2ff42a6e88700017918e14",
        "__v": 0
    }
}
```

#### Delete video [DELETE]

**URL**: _https://videojournal.herokuapp.com/api/video/5e2ff8ec6e88700017918e17_

**Returns**: A JSON object with the deleted video

```javascript
{
    "data": {
        "videos": [
            "First url",
            "second url"
        ],
        "_id": "5e2ff8ec6e88700017918e17",
        "description": "a very fun video to watch",
        "createdBy": "5e2ff42a6e88700017918e14",
        "__v": 0
    }
}
```

#### Get comments [GET]

**URL**: _https://videojournal.herokuapp.com/api/comment_

**Returns**: Returns comment object.

```javascript
{
    "data": [
        {
            "_id": "5e2ff9bd6e88700017918e19",
            "video": "5e2ff8456e88700017918e15",
            "comment": "This is a great video",
            "createdBy": "5e2ff42a6e88700017918e14",
            "createdAt": "2020-01-28T09:07:09.018Z",
            "updatedAt": "2020-01-28T09:07:09.018Z",
            "__v": 0
        },
        {
            "_id": "5e2ff9d26e88700017918e1a",
            "video": "5e2ff8456e88700017918e15",
            "comment": "lol please share more videos.",
            "createdBy": "5e2ff42a6e88700017918e14",
            "createdAt": "2020-01-28T09:07:30.292Z",
            "updatedAt": "2020-01-28T09:10:06.238Z",
            "__v": 0
        },
        {
            "_id": "5e2ff9dc6e88700017918e1b",
            "video": "5e2ff8456e88700017918e15",
            "comment": "please share more videos",
            "createdBy": "5e2ff42a6e88700017918e14",
            "createdAt": "2020-01-28T09:07:40.974Z",
            "updatedAt": "2020-01-28T09:07:40.974Z",
            "__v": 0
        }
    ]
}
```

#### Create a comment [POST]

**URL**: _https://videojournal.herokuapp.com/api/comment_

**Payload**: The comment object to be created.

```javascript
{
	"video": "5e2ff8456e88700017918e15",
	"comment": "dfdf please share more videos",
	"createdBy": "5e2ff42a6e88700017918e14"
}
```

**Returns**: The newly created comment.

```javascript
{
    "data": {
        "_id": "5e2ffadd6e88700017918e1d",
        "video": "5e2ff8456e88700017918e15",
        "comment": "dfdf please share more videos",
        "createdBy": "5e2ff42a6e88700017918e14",
        "createdAt": "2020-01-28T09:11:57.939Z",
        "updatedAt": "2020-01-28T09:11:57.939Z",
        "__v": 0
    }
}
```

#### Get comment by id [GET]

**URL**: _https://videojournal.herokuapp.com/api/comment/5e2ff9d26e88700017918e1a_

**Returns**: Returns a comment object.

```javascript
{
    "data": {
        "_id": "5e2ff9d26e88700017918e1a",
        "video": "5e2ff8456e88700017918e15",
        "comment": "lol",
        "createdBy": "5e2ff42a6e88700017918e14",
        "createdAt": "2020-01-28T09:07:30.292Z",
        "updatedAt": "2020-01-28T09:07:30.292Z",
        "__v": 0
    }
}
```

#### Update a comment [PUT]

**URL**: _https://videojournal.herokuapp.com/api/comment/5e2ff9d26e88700017918e1a_

**Payload**: The comment object to be updated.

```javascript
{
	"video": "5e2ff8456e88700017918e15",
	"comment": "lol please share more videos.",
	"createdBy": "5e2ff42a6e88700017918e14"
}
```

**Returns**: The updated comment.

```javascript
{
    "data": {
        "_id": "5e2ff9d26e88700017918e1a",
        "video": "5e2ff8456e88700017918e15",
        "comment": "lol please share more videos.",
        "createdBy": "5e2ff42a6e88700017918e14",
        "createdAt": "2020-01-28T09:07:30.292Z",
        "updatedAt": "2020-01-28T09:10:06.238Z",
        "__v": 0
    }
}
```

#### Delete comment [DELETE]

**URL**: _https://videojournal.herokuapp.com/api/comment/5e2ffadd6e88700017918e1d_

**Returns**: A JSON object with the deleted comment

```javascript
{
    "data": {
        "_id": "5e2ffadd6e88700017918e1d",
        "video": "5e2ff8456e88700017918e15",
        "comment": "dfdf please share more videos",
        "createdBy": "5e2ff42a6e88700017918e14",
        "createdAt": "2020-01-28T09:11:57.939Z",
        "updatedAt": "2020-01-28T09:11:57.939Z",
        "__v": 0
    }
}
```

## Author

💻 ☕️ **The Video Journal Team** 😎 🤙
