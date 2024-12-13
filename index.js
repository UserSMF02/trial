const express = require("express");
const cors = require("cors");
require('dotenv').config();
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const app = express();

app.use(express.json());
app.use(cors())

app.get("/", (req, res) => {
    res.send({ msg: "hello from backend, / route " });
});

app.post("/add", async (req, res) => {
    const { name, email } = req.body;
    try{
        if(name && email){
            const result = await prisma.user.create({
                data: {
                    name: name, 
                    email:email
                }
            })
            console.log('success', result);
            res.send({ msg: "success", data: result });
        } else {
            res.status(400).send({ msg: "data incomplete" });
        }
    } catch (error){
        res.status(400).send({ msg: "add error", err: error });
    }
});

app.get('/all', async (req, res) => {
    try{
        const result = await prisma.user.findMany();

        if (result.length > 0) {
            res.send({ msg: "success", data: result });
        } else {
            res.status(404).send({ msg: "no data" });
        }
    } catch (error) {
        res.status(404).send({ msg: "error in fetching data", err: error });
    }
})

app.listen(process.env.PORT , () => {
    console.log("running on port", process.env.PORT);
    console.log("----------------------");
})