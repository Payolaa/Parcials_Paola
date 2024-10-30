const express = require('express');
const app = express();
const path = require('path');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.engine('html', require('ejs').renderFile);
app.set('view engine', 'ejs');


app.route('/')
    .get((req, res) => {
        res.sendFile(path.join(__dirname, 'main.html'));
    });

app.route('/calculate-bmi')
    .post((req, res) => {
        const weight = parseFloat(req.body.weight);
        const height = parseFloat(req.body.height);
        
        if (!weight || !height) {
            return res.status(400).send('ERROR. Make sure you write the info in both spaces.');
        }
        const bmi = (weight / (height * height)) * 10000;
        res.send(`Your BMI is ${bmi.toFixed(2)} :D`);
    });

app.listen(7000, () => { //I had port 3000 full, so i migrated it, jej
    console.log("Listening on port 7000");
});
