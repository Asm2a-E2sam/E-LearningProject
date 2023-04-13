const mysql = require('mysql2');
const express = require('express');
const userRoute = express.Router();
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/', userRoute);


// ------------signup--------------
app.post('/signup', (req, res) => {
    const { name, password } = req.body;

    const mysql = `INSERT INTO users (name, password) VALUES ('${name}', '${password}')`;

    db.query(mysql, (error, results) => {
        if (error) {
            console.error(error);
            alert('An error occurred while signing up');

        } else {
            res.status(200).render("signin_signup");
        }
    });
});



// ------------log in--------------
app.get('/signup', (req, res) => {
    const { name, password } = req.body;

    const mysql = `SELECT * FROM users WHERE name = '${name}'`;

    db.query(mysql, (error, results) => {
        if (error) {
            console.error(error);
            alert('An error occurred while logging up');

        } else {
            const user = results[0];

            if (!user) {
                alert('Invalid username or password');

            } else if (user.password !== password) {
                alert('Invalid password');

            } else {
                req.session.name = name;

                res.status(200).render("signin_signup");
            }
        }
    });
});




// ------------log out--------------

app.post('/logout', (req, res) => {
    // Destroy the session on the server here
    req.session.destroy((err) => {
        if (err) {
            console.error(err);
            alert('An error occurred while logging out');

        } else {
            res.status(200).render("signin_signup");
        }
    });
});






//---------------- courses that the user is enrolled in-----------
userRoute.get('/my-courses', (req, res) => {
    const userId = req.user.id;
    const query = `
    SELECT id, name
    FROM courses
    INNER JOIN enrollment ON id = courses_id
    WHERE user_id = ${userId};
  `;
    pool.query(query, [userId], (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).send(err.message);
        } else {
            res.status(200).render("course_details")
        }
    });
});


// ------------------------enroll course----------------
userRoute.post('/enroll-course', (req, res) => {
    const userId = req.user.id;
    const { courseId } = req.body;

    const query = `
    INSERT INTO enrollment (user_id, courses_id)
    VALUES ('${userId}', '${courseId}');
  `;
    pool.query(query, [userId, courseId], (err) => {
        if (err) {
            console.error(err);
            res.status(500).send(err.message);
        } else {
            res.status(200).render("enroll")
        }
    });
});

module.exports = userRoute;
