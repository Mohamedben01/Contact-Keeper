const mongoose = require('mongoose');
const config = require('config');
const dbURI = config.get('mongoURI2');


//>Connect to Database
const connectDB = async () => {
    try {
        await mongoose.connect(await dbURI, {
            useNewUrlParser: true,
            // useCreateIndex: true,
            useUnifiedTopology: true
        })
        console.log(`MongoDB Connected ${dbURI}`)
    } catch (err) {
        console.error(err.message)
        process.exit(1);
    }
}

module.exports = connectDB;