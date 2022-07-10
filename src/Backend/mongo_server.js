// required dependencies
const cors = require('cors');
const mongo = require('mongodb');
const express = require('express');
const {ObjectId} = require("mongodb");

// connect to express
const app = express();
app.set('port', process.env.PORT || 3001);
app.use(cors());

// connect to mongodb
const url = "mongodb://localhost:27017";
const dbName = "brilliant-pro";
const MongoClient = mongo.MongoClient;
const mongoClient = new MongoClient(url);

// *************************************** LEARNER REQUESTS ********************************************************* //

// get all learners
app.get('/getAllLearners', function (req, res) {

    mongoClient.connect(function (err, client) {
        const db = client.db(dbName);

        db.collection("learners")
            .find()
            .toArray(function (err, items) {
                if (err) throw err;
                res.send(items);
            });
    })
})

// get a learner
app.post('/getLearnerByEmail', function (req, res) {
    let query = {email: req.query.email}

    mongoClient.connect(function (err, client) {
        const db = client.db(dbName);

        db.collection("learners")
            .find(query)
            .toArray(function (err, items) {
                if (err) throw err;
                res.send(items[0]);
            });
    })
})

// add a learner
app.post('/addLearner', function (req, res) {

    const learnerObject = {
        email: req.query.email,
        password: req.query.password,
        name: req.query.name
    };

    console.log(learnerObject)

    mongoClient.connect(function (err, client) {
        const db = client.db(dbName);
        db.collection("learners").insertOne(learnerObject)
            .then(result => {
                console.log(result);
                res.send(result);
        });
    });
})

// **************************************** ADMIN REQUESTS ********************************************************** //

// get an admin
app.post('/getAdminByEmail', function (req, res) {
    let query = {email: req.query.email}

    mongoClient.connect(function (err, client) {
        const db = client.db(dbName);

        db.collection("admins")
            .find(query)
            .toArray(function (err, items) {
                if (err) throw err;
                res.send(items[0]);
            });
    })
})

// *************************************** COURSE REQUESTS ********************************************************** //

// get all courses
app.get('/getAllCourses', function (req, res) {
    mongoClient.connect(function (err, client) {
        const db = client.db(dbName);

        db.collection("courses")
            .find()
            .toArray(function (err, items) {
                if (err) throw err;
                res.send(items);
            });
    })
})

// get a course
app.post('/getCourseById', function (req, res) {
    let query = {_id: ObjectId(req.query.id)}

    mongoClient.connect(function (err, client) {
        const db = client.db(dbName);

        db.collection("courses")
            .find(query)
            .toArray(function (err, items) {
                if (err) throw err;
                res.send(items[0]);
            });
    })
})

// get current courses of learner
app.post('/getEnrolledCoursesByLearnerId', function (req, res) {
    let query = {learner_id: ObjectId(req.query.id)}

    mongoClient.connect(function (err, client) {
        const db = client.db(dbName);

        db.collection("course_enrollment")
            .find(query)
            .toArray(function (err, items) {
                if (err) throw err;
                res.send(items);
            });
    })
})

// get completed courses of learner
app.post('/getCompletedCoursesByLearnerId', function (req, res) {
    let query = {learner_id: ObjectId(req.query.id)}

    mongoClient.connect(function (err, client) {
        const db = client.db(dbName);

        db.collection("completed_course")
            .find(query)
            .toArray(function (err, items) {
                if (err) throw err;
                res.send(items);
            });
    })
})

// add a course
app.post('/addCourse', function (req, res) {
    // get json data of new course
    const course = JSON.parse(req.query.course);

    mongoClient.connect(function (err, client) {
        const db = client.db(dbName);
        db.collection("courses").insertOne(course)
            .then(result => {
                console.log(result);
                res.send(result);
        });
    });
})

// delete a course
app.get('/deleteCourseById', function (req, res) {
    let filter = {_id: ObjectId(req.query.id)}

    mongoClient.connect(function (err, client) {
        const db = client.db(dbName);

        db.collection("courses").deleteOne(filter)
            .then(result => {
                console.log(result);
                res.send(result);
        })
    })
})

// *************************************** COURSE + LEARNER ********************************************************** //

// get learners in a course
app.post('/getLearnersInCourse', function (req, res) {
    let filter = {course_id: ObjectId(req.query.id)}

    mongoClient.connect(function (err, client) {
        const db = client.db(dbName);

        db.collection("course_enrollment")
            .find(filter)
            .project({_id:0, learner_id: 1})
            .toArray(function (err, items) {
                if (err) throw err;
                res.send(items);
            });
    })
})

// add a learner to a course
app.post('/addLearnerToCourse', function (req, res) {

    const newObject = {
        learner_id: ObjectId(req.query.learner_id),
        course_id: ObjectId(req.query.course_id)
    }

    mongoClient.connect(function (err, client) {
        const db = client.db(dbName);
        db.collection("course_enrollment").insertOne(newObject)
            .then(result => {
                console.log(result);
                res.send(result);
            });
    });
})

// remove learner from course
app.post('/removeLearnerFromCourse', function (req, res) {

    const newObject = {
        learner_id: ObjectId(req.query.learner_id),
        course_id: ObjectId(req.query.course_id)
    }

    mongoClient.connect(function (err, client) {
        const db = client.db(dbName);
        db.collection("course_enrollment").deleteOne(newObject)
            .then(result => {
                console.log(result);
                res.send(result);
            });
    });
})

// ****************************************************************************************************************** //

// set up server
module.exports = app;
app.listen(3001, () =>
    console.log('Listening on port 3001'));
