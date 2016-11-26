### Meetup Event Planner Web App

### What is this?
Web application that lets anyone create events easily

### Features / Functions
- User registration/login
- Event creation, modification, deletion
- Browse events ("Load More" functionality)
- User profile (can be edited)

### Technology stack
- HTML5, CSS3, Javascript, Node.js, Express.js, MongoDB

### References
- [Recommended input name and autocomplete attribute values - Google Developers](https://developers.google.com/web/fundamentals/design-and-ui/input/forms/label-and-name-inputs?hl=en#recommended-input-name-and-autocomplete-attribute-values)

### NPM Packages
```
npm install --save express mongoose bcrypt body-parser connect-mongo cookie-parser express-session passport passport-local ejs connect-flash moment
```

### Extra feature idea
- email notification on forgot password

### Issue
- Need to find a way to populate 'datetime-local' value in input tag in event-edit page
- [Mongo connection error - gist](https://gist.github.com/yhagio/e0604502d17d840a55a6)

### Run locally

```
mongod
npm run start
```
