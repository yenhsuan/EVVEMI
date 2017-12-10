const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();

// Connect to database
const client = require('../database/connect');

// Student API - Create data 
router.post('/student', jsonParser, (req,res) => {

    let duplicates = false;
    const studentInfo = req.body; 
    console.log(studentInfo.sid);
    let checkExist = client.query('SELECT * FROM STUDENTS WHERE SID =' + studentInfo.sid);

    checkExist.on('row', (row) => {
        duplicates = true;
    });

    checkExist.on('end', () => {
        if (!duplicates) {
            created = true;
            let query = client.query('INSERT INTO STUDENTS(SID, FIRST_NAME, LAST_NAME) VALUES($1, $2, $3)', [studentInfo.sid, studentInfo.firstName, studentInfo.lastName]);
    
            studentInfo.records.forEach((record) => {
                query = client.query('INSERT INTO COURSES(SID, COURSE_NAME, SCORE) VALUES($1, $2, $3)', [studentInfo.sid, record.course_name, record.score]);
            });
    
            query = client.query('SELECT * FROM STUDENTS WHERE SID =' + studentInfo.sid);
            query.on('row', (row) => {
                console.log(row);
            });
    
            query = client.query('SELECT * FROM COURSES WHERE SID =' + studentInfo.sid);
            query.on('row', (row) => {
                console.log(row);
            });

            query.on('end', () => {
                res.json("success"); 
            });
        } else {
            res.json("fail");
        }
    });
});

// Student API - Delete data
router.delete('/student/:sid',(req,res)=>{
    let results = {};
    results.students = [];
    const sid = req.params.sid;
    let query = client.query("DELETE FROM STUDENTS WHERE SID =" + sid); 
    query.on('end', () => {
        let query2 = client.query("DELETE FROM COURSES WHERE SID =" + sid);
        query2.on('end', () => {
            res.json('success');
        });
    });
});

// Student API - Read All Data
router.get('/student/',(req,res)=>{
    let results = {};
    let query = client.query('SELECT * FROM STUDENTS');
    results.students = [];
    query.on('row', (row) => {
        results.students.push(row);
    });
    
    query.on('end', () => {
        res.json(results);
    });
});


// Student API - Read Data
router.get('/student/:sid',(req,res)=>{
    let results = {};
    const sid = req.params.sid;
    let query = client.query('SELECT * FROM STUDENTS WHERE SID =' + sid);
    
    query.on('row', (row) => {
        results.info = row;
    });
    
    query.on('end', () => {
        if (results['info']) {
            let query2 = client.query('SELECT * FROM COURSES WHERE SID =' + sid);
            results.record = [];
            query2.on('row', (row) => {
                results.record.push(row);
            });

            query2.on('end', () => {
                res.json(results);
            });

        } else {
            res.json(results);
        }
    });
});


// Course API - Read data 
router.get('/course/:cid',(req,res)=>{
    let results = {};
    results.students = [];
    const cid = req.params.cid;
    let query = client.query("SELECT * FROM (STUDENTS JOIN COURSES ON STUDENTS.SID = COURSES.SID) WHERE COURSE_NAME ='" + cid + "'");
    
    query.on('row', (row) => {
        results.students.push(row);
    });
    
    query.on('end', () => {
        res.json(results);
    });
});

// Course API - Read data 
router.get('/course/',(req,res)=>{
    let results = {};
    results.course = [];
    let query = client.query("SELECT DISTINCT(COURSE_NAME) FROM COURSES");
    
    query.on('row', (row) => {
        results.course.push(row['course_name']);
    });
    
    query.on('end', () => {
        res.json(results);
    });
});

module.exports = router;
