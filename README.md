# Mock Social Network API

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Description

A mock social network API using Mongoose to create and manipulate a database in a simple social network-style structure. Users can create "Thoughts" and leave "Reactions" on other peoples' Thoughts. Express was used to create routes to allow a client to modify and fetch data from the database.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Credits](#credits)
- [License](#license)
- [Questions](#questions)

## Installation:

This app requires the use of Node JS, so download and learn how to install/use the Node CLI at https://nodejs.org/en/.

Clone the github repository, and in the CLI run "npm install" to install the required packages.

If you choose to seed the database with data before using it, run "npm run seed" in the CLI; this should fill the database with randomized information.

Then, run "npm start" from the CLI to initialize the MongoDB server.

If all is well, the console will print "API server running on port 3001!" After this you'll be ready to use an API client to send queries to the routes you'll find in the [usage section](#usage) of this readme.

I personally used the [Insomnia API client](https://insomnia.rest/); visit the link to download it or learn about its usage.

## Usage

First, [here's](https://drive.google.com/file/d/1xeiWY_4rvbz__mqk97UhQt0JFQTbeDTl/view?usp=sharing) a link to a video of me using Insomnia to test each route, if you're curious.

Once you've got your API client installed, you'll be able to use the defined routes to create and modify data within this database (those routes are below).

### Database Structure

The database structure is fairly simple: There are 2 collections named users and thoughts (thoughts are synonymous with posts).

Each document in the users collection defines the identifying information for a user, specifically an \_id, username, email, an array of thought \_ids that they've created, an array of their friends' \_ids, and the times at which it was created and updated.

Each document in the thoughts collection defines a user's thought. Each one has an \_id, the text of the thought, the \_id and username of the user that created it, the time at which it was created and updated, and an array of subdocuments called reactions.

Each reaction is a response left by another user to this thought; each one includes an \_id, the text of the reaction, the username and \_id of the user that created it, and the time at which it was created and updated.

### Routes

To create and modify data within this db yourself, you can use an API client to query these routes:

#### User Routes

<span style="color: dodgerblue;">
Get all users:
</span>

```
http://localhost:3001/api/users
```

---

<span style="color: dodgerblue;">
Get one user by _id (replace # with the _id you'd like to query. You can obtain this _id by using other routes, such as the get all users route):
</span>

```
http://localhost:3001/api/users/#
```

---

<span style="color: dodgerblue;">
Create new user (JSON body required):
</span>

```
http://localhost:3001/api/users
```

<span style="color: goldenrod;">
A sample JSON body for this route:
</span>

```
{"username": "CrabEnthusiast4",
"email":"tenLeggedTerror@gmail.com"}
```

---

<span style="color: dodgerblue;">
Update user (JSON body required, and replace # with a user's _id)
</span>

```
http://localhost:3001/api/users/#
```

<span style="color: goldenrod;">
Sample JSON bodies for this route:
</span>

```
{"username": "CrustaceanCaretaker"}
```

<span style="color: goldenrod;">
or
</span>

```
{"email": "DecapodianDomination@gmail.com"}
```

<span style="color: goldenrod;">
or
</span>

```
{"username": "CrustaceanCaretaker",
email": "DecapodianDomination@gmail.com}
```

---

<span style="color: dodgerblue;">
Delete user (replace # with a user's _id, this will also delete all the user's thoughts in the thoughts collection. Their reactions will remain):
</span>

```
http://localhost:3001/api/users/#
```

---

<span style="color: dodgerblue;">
Get Friends (replace # with a user's _id):
</span>

```
http://localhost:3001/api/users/#/friends
```

---

<span style="color: dodgerblue;">
Add or remove friend (replace # with the user's _id and ?? with the _id of the user you want to add or remove as a friend):
</span>

```
http://localhost:3001/api/users/#/friends/??
```

---

#### Thought Routes

<span style="color: dodgerblue;">
Get all thoughts:
</span>

```
http://localhost:3001/api/thoughts
```

---

<span style="color: dodgerblue;">
Get one thought (replace # with a thought's _id):
</span>

```
http://localhost:3001/api/thoughts/#
```

---

<span style="color: dodgerblue;">
Create new thought (JSON body required, this will also add the new thought's ID the user's "thoughts" array):
</span>

```
http://localhost:3001/api/thoughts
```

<span style="color: goldenrod;">
Sample JSON body for this route (replace # with a user's _id):
</span>

```
{"thoughtText":"Hey!",
"userId":"#"}
```

---

<span style="color: dodgerblue;">
Update thought (JSON body required, and replace # with a thought's _id):
</span>

```
http://localhost:3001/api/thoughts/#
```

<span style="color: goldenrod;">
Sample JSON body for this route:
</span>

```
{"thoughtText":"Hola!"}
```

---

<span style="color: dodgerblue;">
Delete thought (replace # with a thought's _id, this will also delete the thought's _id from the user's "thoughts" array):
</span>

```
http://localhost:3001/api/thoughts/#
```

---

<span style="color: dodgerblue;">
Get all reactions to a thought (replace # with a thought's _id):
</span>

```
http://localhost:3001/api/thoughts/#/reactions
```

---

<span style="color: dodgerblue;">
Create new reaction to a thought (JSON body required, and replace # with a thought's _id):
</span>

```
http://localhost:3001/api/thoughts/#/reactions
```

<span style="color: goldenrod;">
Sample JSON body for this route (replace # with a user's _id):
</span>

```
{"userId":"#",
 "reactionBody":"Hello!"}
```

---

<span style="color: dodgerblue;">
Update reaction (JSON body required, replace # with a thought's _id, and replace ?? with a reaction's _id):
</span>

```
http://localhost:3001/api/thoughts/#/reactions/??
```

<span style="color: goldenrod;">
Sample JSON body for this route:
</span>

```
{"reactionBody":"This is the updated text!"}
```

---

<span style="color: dodgerblue;">
Delete reaction (replace # with a thought's _id, and replace ?? with a reaction's _id):
</span>

```
http://localhost:3001/api/thoughts/#/reactions/??
```

---


Screenshots of the API during function:

![Screenshot](images/userCreationScreenshot.jpg?raw=true "Screenshot")

![Screenshot](images/thoughtCreationScreenshot.jpg?raw=true "Screenshot")

## Credits

The Node packages [Mongoose](https://mongoosejs.com/), [Express JS](https://expressjs.com/), and [Nodemon](https://www.npmjs.com/package/nodemon) were used to develop this app.

As always, I've got to give a lot of credit to Trey Eckels and the instructional staff at the GA Tech full stack boot camp I'm attending. Without their careful and supportive instruction, I never would've been able to develop apps like this one.

## License

Copyright 2022 Adam Brock

This software is licensed using the MIT license: https://opensource.org/licenses/MIT.

## Questions

Feel free to reach out to me with questions at a.paulbrock@gmail.com.

My GitHub profile is at https://github.com/abrock3.
