# Hello!

I've split the app into two. The UI, and the API. Please follow the below steps to run the app.

## How to run this thing

1. Start the api
    * Run `cd vivid-api && ./gradlew bootRun` from the vivid-api folder
    * App will be running on port 8080

2. Start the UI
    * Run `cd ../vivid-ui && npm install && npm start` in the vivid-ui folder
    * UI will be viewable on port http://localhost:3000

3. Browser should open and you'll see the app.

## How to run this thing _with Docker_

1. Build the API  using `cd vivid-api && ./gradlew build`
2. Build the UI using `cd ../vivid-ui && npm install && npm run build`.
3. Run `cd .. && docker-compose up`. Docker compose must be run at the top level.
4. Open your browser to `http://localhost`

If this doesn't work, please reach out to calebmfreed@gmail.com