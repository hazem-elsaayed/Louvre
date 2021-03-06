# Louvre App

a mini online version of the Louvre museum in which guests can login and view ancient art pieces and know about their history and artists. Also, museum staff can manage art pieces and view system guests. <br/>
This is a MERN app which uses React and Bootstrap for the front end and Node JS (Express) and MongoDB (Mongoose) for the backend

## Live Version

you can see a live version of the app deployed on an AWS EC2 Ubuntu instance by  clicking <a target='_blank' href='http://ec2-18-193-157-74.eu-central-1.compute.amazonaws.com/'>here</a> 
## Installation

Clone the Github repository and use npm to install dependencies at the server folder <br/>
```
$ git clone https://github.com/Zomaldinho/Louvre.git
$ cd Louvre
$ cd server
$ npm install
```
After installation copy the env.sh file into server folder and run `$ source env.sh` from bash terminal so that the app can see the DB URL then run `$ node app.js` to start the server at port 5000 and make sure that the following message are shown in the terminal `app is running on port 5000`. if not, restart the server by pressing CTRL+C and `$ node app.js` again <br/>
Then open a new terminal window inside the **frontend** folder.
Finally start the front end with `$ npm start` at port 3000 and wait until it opens a new tap in your browser.

### Alternative way

There is an alternative way to setup and start the project using docker by simply clone the repo and change terminal directory inside the main folder then run the following command `$ docker-compose up` but you have to change the backend links inside frontend code from http://localhost:5000 to `backend` to match the backend container name

## Usage
First of all you have to create an account to get to the app. you can do so by navigating to sign up page and fill the form and submit it, then you'll be redirected to login page to login. <br/>
Once you login as guest you can view all the art pieces created by admins and you can click on any piece to view more details about them.<br/>
If you log in as Admin you will be able to view arts as a list, add new art, delete previous arts or view users details.