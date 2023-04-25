const mysql = require('mysql2');
const express = require('express');
const app = express();
const courses =express.Router();
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/', userRoute);

//----------select----------

courses.get("/courses",(req,res)=>{
      const query = `
      SELECT *
      FROM courses
    `;
    pool.query(query,  (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).send(err.message);
        } else {
            res.json(result.rows);
        }
    });
      
})

//--------apdate--------

courses.post("/courses/apdate",(req,res)=>{
    const { courseId,courseName,coursePrice,courseDescription } = req.body;
    const query = `
    UPDATE courses
    SET name='${courseName}',price='${coursePrice}',description='${courseDescription}'
    WHERE courseId ='${courseID}';
  `;
  pool.query(query,  (err, result) => {
      if (err) {
          console.error(err);
          res.status(500).send(err.message);
      } else {
        res.json({ message: `You have successfully apdated the course with id  ${courseId}` });
      }
  });
    
})

//--------add-----

courses.post("/courses/add",(req,res)=>{
    const { courseId,courseName,coursePrice,courseDescription } = req.body;
    const query = `
    INSERT INTO courses (id,name,price,description)
     VALUES ('${courseId}', '${courseName}','${coursePrice}','${courseDescription}')
    SET name='${courseName}',price='${coursePrice}',description='${courseDescription}';
  `;
  pool.query(query,  (err, result) => {
      if (err) {
          console.error(err);
          res.status(500).send(err.message);
      } else {
        res.json({ message: `You have successfully added the course with id  ${courseId}` });
      }
  });
    
})

//-----------delete--------
courses.get("/courses/delete",(req,res)=>{
    const { courseId } = req.body;
    const query = `
    DELETE FROM courses 
    WHERE courseId='${courseId}';
  `;
  pool.query(query,  (err, result) => {
      if (err) {
          console.error(err);
          res.status(500).send(err.message);
      } else {
        res.json({ message: `You have successfully dleated the course with id  ${courseId}` });
      }
  });
    
})



module.exports = courses;