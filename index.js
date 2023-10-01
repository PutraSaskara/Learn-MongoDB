const express = require('express')
const mongoose = require('mongoose')



const app = express()
const cors = require('cors')
const bodyParser = require('body-parser')
const User = require('./src/models/user')
const path = require('path')
const multer = require('multer')
const {v4:uuidv4} = require('uuid')
const authRoutes = require('./src/routes.js/auth')
const env = require('dotenv')
const cookieParser = require("cookie-parser")


app.use(cookieParser())
env.config()
app.use((req, res, next) => {
    User.findById('64d2373b882f8e5b35a3fa40').then(resUser => {
        req.user = resUser
        next()
    }).catch(err => console.log(err))
})

app.use(cors())
// app.use(bodyParser.urlencoded({extended:false}))

app.use(bodyParser.json())
mongoose.set('strictQuery', true);
const adminRoutes = require('./src/routes.js/admin')
const shopRoutes = require('./src/routes.js/shop')





const fileStorage = multer.diskStorage({
    destination: function( req, file, cb) {
        cb(null, 'image')
    },
    // handle jika terdapat nama file sama
    filename: function( req, file, cb) {
        cb(null, uuidv4() + file.originalname)
    }
})

const fileFilter = (req, file, cb) => {
    if(
        file.mimetype === 'image/png' ||
        file.mimetype === 'image/jpg' ||
        file.mimetype === 'image/JPG' ||
        file.mimetype === 'image/jpeg' 
    ){
        cb(null, true)
    }else
        cb(null, false)
}

app.use(
    multer({storage:fileStorage, fileFilter: fileFilter}).single('file')
)

app.use('/auth', authRoutes)
app.use('/images', express.static(path.join(__dirname,'image')))
app.use('/admin', adminRoutes)
app.use('/shop', shopRoutes)


mongoose.connect(process.env.ACCESS_MONGODB_KEY)
.then(res => {
    console.log("connected")
    app.listen(8000)
}).catch(err => console.log(err))