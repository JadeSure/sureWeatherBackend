require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const PORT = process.env.cd || 3000

const connectionDB = require('./utils/dbConnection')

const routers = require('./routers')


app.use(express.json())
app.use(cors())
app.use('/api', routers)
connectionDB()

app.listen(PORT, () => {
    console.log(`server running in ${PORT}`);
})
