var mongoose    = require('mongoose');
var bcrypt      = require('bcrypt-nodejs'),
    config      = require('../config');
var Schema      = mongoose.Schema;

mongoose.connect('mongodb://' + config.mongodb.credentials + config.mongodb.host + config.mongodb.port + '/' + config.mongodb.dbName, function(err) {
    if (err) throw err;
});

var userSchema = mongoose.Schema({
    username: String,
    fullName: String,
    provider: String,
    image: String,
    role: {
        type: String,
        default: 'user'
    },
    email: String,
    registerDate: {
        type: Date,
        default: Date.now
    },
    accountState: {
        type: String,
        default: 'waiting'
    },
    password: String,
    salt: String
});

// generating a hash
userSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
userSchema.methods.validPassword = function(password) {
    console.warn('PASSWORD', password);
    console.warn('THIS', this.local.password);
    return bcrypt.compareSync(password, this.local.password);
};

var articleSchema = mongoose.Schema({
    title: String,
    // slug: String,
    // category: {
    //     type: String,
    //     default: 'No category'
    // },
    content: String,
    markdown: String,
    // postDate: {
    //     type: Date,
    //     default: Date.now
    // },
    // description: String,
    // tags: Array,
    // state: String,
    // views: {
    //     type: Number,
    //     default: 0
    // },
    // comments: Array,
    author: { type : Schema.ObjectId, ref : 'user' }
});

module.exports = {
    User: mongoose.model('user', userSchema),
    Article: mongoose.model('article', articleSchema)
};