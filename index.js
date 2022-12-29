const express = require('express');
const mongoose = require('mongoose');

require('dotenv').config();
const bodyParser = require('body-parser');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const userAuthRoute = require('./Routes/Auth/user');
const getUserRoutes = require('./Routes/get/user');
const routes = require('./Routes/index');

const app = express();
const PORT = process.env.PORT || 1438;
var mongourl = process.env.MONGOURL;


//dotenv.config();
app.use(bodyParser.json({ limit: '30mb', extended: true }))
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }))
app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.use((req, res, next) => {
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
	res.setHeader('Access-Control-Allow-Headers', 'content-type');
	next();
});

app.use('/api/userauth', userAuthRoute);
app.use('/api/getuser', getUserRoutes);
app.use('/api', routes);

app.get('/', (req, res) => {
	res.send('Welcome');
});

 // Database connection
 
 // MongoDB Connection Success
mongoose.connection.on('connected', () => {
    console.log('MongoDb connected');
});

// MongoDB Connection Fail
mongoose.connection.on('error', (err) => {
    console.log('Error connecting MongoDb', err);
});


app.listen(PORT, async () => {
    mongoose.connect(mongourl);
	mongoose.set('strictQuery', true);
    console.log(`Node Server started on port ${PORT}`)
})
 
//  mongoose
//  .connect('mongodb+srv://mreccsa:CSA#@2023@csa.6qiml1r.mongodb.net/?retryWrites=true&w=majority', {useMongoClient:true})
//  .then((result) => {
//      console.log(`mongo db connected`);
//      app.listen(PORT, console.log(`Server is running at port ${PORT}`));
//  })
//  .catch((error) => console.log(error));