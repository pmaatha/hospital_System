const express = require('express');
const router = express.Router();
const Patient = require('../models/patient');
const path = require('path');
const app = express();
app.set('view engine', 'ejs');


router.post("/",(req,res)=>{
    res.sendFile(path.join(__dirname, '../patient', 'signLogin.html'));
})

router.post('/signup', (req, res) => {
    res.sendFile(path.join(__dirname, '../patient', 'signup.html'));
})

router.post('/signupdb', (req, res) => {
    console.log(req.body);
    const newpatient = new Patient({
        firstName:req.body.firstName,
        lastName:req.body.lastName,
        dateOfBirth:req.body.dateOfBirth,
        gender:req.body.gender,
        contactNumber:req.body.contactNumber,
        address:req.body.address,
        patientId:req.body.patientId
    });
    newpatient.save()
    .then(async()=>{
        const patient = await Patient.find();
        res.render('dashboard',{patient});
    })
    .catch(()=>{
        console.error(err);
        res.sendFile(path.join(__dirname, '../error.html'));
    })
  });



  router.post('/login', (req, res) => {
    res.sendFile(path.join(__dirname, '../patient', 'login.html'));
  })
  router.post('/logindb', (req, res) => {
    const { firstName, password } = req.body;
    // Find the patient in the database
    Patient.findOne({ firstName, password })
    .then(async()=>{
        const patient = await Patient.find();
        res.render('dashboard',{patient});
    })
    .catch(()=>{
        console.error(err);
        res.sendFile(path.join(__dirname, '../error.html'));
    })
  }); 


module.exports = router;