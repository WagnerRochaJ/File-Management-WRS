const routes = require('./routes/routes.js')
const express = require("express")
const Database = require('./config/db.js')
require('./config/config.js')

const app = express();


app.use(express.json())
app.use(routes)
app.listen(3000);

// async function syncronize(){
//     const Documents = require('./models/Documents.js')
//     const Users = require('./models/Users.js')
//     await Database.sync()
// };

//syncronize()