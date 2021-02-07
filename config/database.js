const mongoose = require('mongoose');

const dbName = "placesapi";
module.exports = {
    connect: () => mongoose.connect('mongodb://localhost/'+dbName),
    dbName, //shorthand property
    connection: ()=>{
        if (mongoose.connection)
            return mongoose.connection;
        return this.connect();
    }
}