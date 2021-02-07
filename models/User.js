const mongoose = require('mongoose');
const FavoritePlace = require('./FavoritePlace');
const Place = require('./Place');
let userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    name: String,
    admin: {
        type: Boolean,
        default: false
    }
});
userSchema.post('save', function (user,next) {
    User.count({}).then(count=>{
        if(count == 1){
            //user.admin = true;
            //user.save().then(next);
            User.updateOne({'_id':user._id},{admin:true}).then(result=>{
                next();
            })
        }else{
            next();
        }
    })
});

userSchema.virtual('places').get(function(){
    return Place.find({'_user': this._id});
})

userSchema.virtual('favorites').get(function(){
    return FavoritePlace.find({'_user': this._id}, {'_place': true})
        .then(favs =>{
            let placeIds = favs.map(fav => fav._place);

            return Place.find({'_id': {$in: placeIds}})
        })
})
userSchema.plugin(require('mongoose-bcrypt'));
const User = mongoose.model('User', userSchema);

module.exports = User;