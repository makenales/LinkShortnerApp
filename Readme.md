Here are the instructions to test the application.

1. Extract LinkShortnerApp.zip file.
2. cd to LinkShortnerApp folder.
3. Open server/config/db.config.js file.
4. Change host, MySQL username and password values in that file.
5. Create database "testdb" in MySQL server if you don't already have that. If you wish to use the existing test database change "testdb" name to that database name in db.config.js file.
6. Run "npm run build" command. This will install node libraries for both client and server applications.
7. Run "npm start" command. This will start both server and client app. React app will be opened in new browser tab with URL http://localhost:3000.
8. To run API tests use command "npm test".

LinkShortner App is a git repository. You can find git logs using "git log" command.
