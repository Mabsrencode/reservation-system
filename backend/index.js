const express = require("express");

const app = express();
// app.use(express.json);
const dbConfig = require("./db");
const servicesRoute = require("./routes/services.route");
const port = process.env.PORT || 4000;

app.use("/api", servicesRoute);

app.listen(port, () => console.log(`Starting server on port ${port}`));
