const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
const patientRoutes = require('./routes/patient');
const doctorRoutes = require('./routes/doctor');
const appointmentRoutes = require('./routes/appointment');
const Appointment = require('./models/appointment');
const Patient = require('./models/patient');
const Doctor = require('./models/doctor');
const app = express();
const PORT = process.env.PORT || 3000;
app.set('view engine','ejs')
// Serve static files from the 'public' folder
app.use(express.static(path.join(__dirname, 'public')));
// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// Use routes
app.use('/patient', patientRoutes);
app.use('/doctor', doctorRoutes);
app.use('/appointment', appointmentRoutes);


// Connect to MongoDB
mongoose.connect('mongodb+srv://harsha:harsha@cluster.f46oor5.mongodb.net/hospital');
mongoose.connection.on('error', (err) => console.error('MongoDB connection error:', err));


app.get('/',(req,res)=>{
    res.render('index');
})


app.post("/viewAppointments",async (req,res)=>{
    try {
        // Fetch appointments from the database
        const appointments = await Appointment.find();
        console.log(appointments);
        // Render the HTML page and pass the data to it
        res.render('display_appointment', { appointments });
      } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
      }
  })

  app.post("/generateReport",async (req,res)=>{
    try {
        const patients = await Patient.find();
        const doctors = await Doctor.find();
        const appointments = await Appointment.find();
        console.log(patients);
        res.render('report', { patients, doctors, appointments });
      } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
      }
  })
// Start the server
app.listen(PORT, () => {
    console.log("Server is running on http://localhost:${PORT}");
});