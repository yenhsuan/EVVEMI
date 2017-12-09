const client = require('../database/connect');
const query = client.query(
    'DROP TABLE STUDENTS, COURSES;'
    + 'CREATE TABLE STUDENTS(SID INTEGER PRIMARY KEY, FIRST_NAME VARCHAR(20) not null, LAST_NAME VARCHAR(20) not null);'
    + 'CREATE TABLE COURSES(SID INT REFERENCES STUDENTS ON DELETE CASCADE, COURSE_NAME VARCHAR(20) not null, SCORE INT, PRIMARY KEY(SID, COURSE_NAME));'
);
query.on('end', () => {
    console.log("[v] Tables Created ")
    client.end(); 
});
