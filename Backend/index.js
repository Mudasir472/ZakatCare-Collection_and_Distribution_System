const express = require("express");
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const { connectdb } = require("./config/MongoDB")

require('dotenv').config();

// Routers 
const userRouter = require("./routes/user.router")
const commRouter = require("./routes/community.router")
const reviewComunity = require("./routes/communityReview.router")
const contact = require("./routes/contact.router")
const donations = require("./routes/donations.router")
const reciever = require("./routes/reciever.router")

// Middleware setup
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors({
    origin: ["http://localhost:5173", "https://zakat-care.vercel.app"],
    methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE", "OPTIONS"],

    // optionsSuccessStatus: 204,
    credentials: true,
}));
app.use(express.json());
app.use(cookieParser());

// Mongo connection
connectdb(process.env.MONGO_URI);


// Routes
app.get("/", (req, res) => {
    res.send("i am at root")
})
// app.use("/", listingRouter)
app.use("/", userRouter)
app.use("/", commRouter)
app.use("/", reviewComunity)
app.use("/", contact)
app.use("/", donations)
app.use("/", reciever)

app.use((err, req, res, next) => {
    // console.log("------ERROR------");
    let { status = 500, message, success } = err;
    res.status(status).json({ message, success })
});

const port = process.env.PORT
app.listen(port, () => {
    console.log(`server listening at port ${port}`);
});