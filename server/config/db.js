const mongoose = require('mongoose');

async function connect (){
    try {
        await mongoose.connect(process.env.DATABASE_URI, {
        //mongoose.connect('mongodb+srv://joaquimpacheco:Andorra3000@clustertfg.0buwu8b.mongodb.net/test?retryWrites=true&w=majority', 
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        } catch (error){
        console.log(error)
    }
}

module.exports = connect
