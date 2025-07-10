### introduction
this app was created with the purpose of allowing other apps to be rated. think of this app as a survey that can be used to guage interest or used as a template for creating other apps with similar apps. 
features include: ability to add a rating, a user, or an app. ability to add an app is on the frontend but in a admin dedicated page. display the average rating and all of the existing ratings to the user without allowing the user to manipulate them.

### installation and starting it
1. download version1 from the appRatingProject github page (thats this one!)
2. install node.js (https://nodejs.org/en/)
3. open a command prompt use cd to navigate to version1/server
4. run npm install --legacy-peer-deps
5. run node index.js
6. use cd to navigate to version1/client/my-app/src
7. run npm install --legacy-peer-deps
8. use cd to navigate to version1/client/my-app
9. run npm start
10. the application is now running on localhost 3000 and the backend on localhost 3001

### API routes 
/applicationsInsert ---- adds an application to the applications table
/ratingsInsert ---- adds a rating to the ratings table
/userInsert ---- adds a user to the users table
/filteredRatings ---- filters ratings based on appId received from ether ratings or apps component
/filteredUsers ---- filters users by user id
/applications ---- gets every application
/users ---- gets every user
/ratings ---- gets every rating
/apps ---- gets every application
/api/data ---- gets the collumns required to build the database
/apps/:id/average-rating ---- used to show the average ratings of a perticular app based on the appId in ratings

### tech stack
node.js
express
cors
pg
dotenv
nodemon
chakra
react
zustand

### notable URLs
---FRONTEND
/ratings --- DO NOT GO TO --- requires an app id to function properly
/apps --- lists the apps --- this is the proper way to access /ratings
/home --- allows the creation of a user and shows some info on the app
/AdminJP7191979 --- contains admin features

### possible improvements
1. accesibility (currently there is none)
2. security (tokens)
3. general UI / styling
4. editing reviews
5. user authentication
6. searching users and reviews
7. a page that shows all the users, each with a link to teh reviews they have given
8. ability for a user to delete themselves or there own rating
9. signing out
10. email authentication
11. copying other reviews (optional)
12. profile page (ability to edit there own name and email)
13. settings page with ability to edt things like background color, text color, ETC
14. show the user the charecter limits for fields and apply them to more fields
15. show the total number of review for an app and on the home page the total number of apps, users, and reviews
16. change ratings table to show only a few and have a show more option
17. blocked word list (blocking swear words)
18. build out scalability to allow better feel on mobile devices (edge case)