import app from "./express";
import config from "../config/config";
import mongoose from "mongoose";

mongoose.Promise = global.Promise;
mongoose.connect(config.mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
});
mongoose.connection.on('error', () => {
    throw new Error(`Unable to connect to MongoDB via ${config.mongoUri}`);
});

app.listen(config.port, (err) => {
    if (err) {
        console.log(err);
    }
    console.info(`Server connected at ${config.port}`);
});