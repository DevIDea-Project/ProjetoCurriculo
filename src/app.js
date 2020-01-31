require('dotenv').config()
const express = require('express')

class App{
    constructor(){
        this.app = express()
        this.routes()
    }
    
    routes(){
        this.app.use(require('./routes.js'))
    }
}

module.exports = new App().app
