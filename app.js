const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;
var db = require('./database');

app.use(bodyParser.json());
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
);

app.get('/api/v1/school', (req, res) => {
    var sql = 'SELECT * FROM schools';
    db.query(sql, function (err, data, fields) {
        if (err) throw err;
        res.json({ 'data': data });
    });
    const used = process.memoryUsage().heapUsed / 1024 / 1024;
    console.log(`The script uses approximately ${used} MB`);
})

app.get('/api/v1/school/:uuid', (req, res) => {
    var uuid = req.params.uuid;
    var sql = `SELECT * FROM schools WHERE uuid = '${uuid}'`;
    db.query(sql, function (err, data, fields) {
        if (err) throw err;
        res.json({ 'data': data });
    });
    const used = process.memoryUsage().heapUsed / 1024 / 1024;
    console.log(`The script uses approximately ${used} MB`);
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
});

