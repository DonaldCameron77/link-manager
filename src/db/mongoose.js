const mongoose = require('mongoose')
const validator = require('validator')

mongoose.connect('mongodb://127.0.0.1:27017/link-manager-api', {
    useNewUrlParser: true,
    useCreateIndex: true
})

const User = mongoose.model('User', {
    name: {
        type: String,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minlength: 7,
        validate(value) {
            if (value.toLowerCase().includes('password')) {
                throw new Error('Password must not inlucde the string "password')
            }
        }
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Email is invalid')
            }
        }
    },
    age: {
        type: Number,
        default: 0,
        validate(value) {
            if (value < 0) {
                throw new Error('Age must be a nonnegative number')
            }
        }
    }
})

// const me = new User({
//     name: 'Durward',
//     age: 24,
//     email: 'wedontneednosteenkinemail'
// })

// me.save().then(() => {
//     console.log(me)
// }).catch((error) => {
//     console.log('Error', error)
// })

const Link = mongoose.model('Link', {
    title: {
        type: String,
        required: true,
        trim: true // does this remove spaces within the title?  We don't want that
    },
    link: {
        type: String, // need some kind of url validation
        required: true
    },
    description: {
        type: String
    },
    tags: [ {
        type: String,
        trim: true,
        lowercase: true 
    } ]
        // how do we validate array elements? See https://github.com/Automattic/mongoose/issues/5133
        // we want to remove internal spaces in tags and camel case instead.
        // Mongoose has pre-save hooks we can use for this.
})

const myLink = new Link({
    title: 'Top 10 Investment Exotic Cars',
    link: 'https://www.youtube.com/watch?v=wIYG6Ck2g9s',
    description: "Ed's take on the top ten exotics to buy for investment today - as of July 2018",
    tags: [ '   Vinwiki', 'Ed Bolian', ]
})

myLink.save().then(() => {
    console.log(myLink)
}).catch((error) => {
    console.log('Error', error)
})

const myLink2 = new Link({
    title: 'Three-Cheese Pizza Blend Recipe : Tips for Making Pizza',
    link: 'https://www.youtube.com/watch?v=nfxpwbWBNuU',
    description: "So off-the-wall it made it to Comedy Central's Tosh.0",
    tags: [ '  two-time personal chef Mike Neylan  ']
})

myLink2.save().then(() => {
    console.log(myLink2)
}).catch((error) => {
    console.log('Error', error)
})
