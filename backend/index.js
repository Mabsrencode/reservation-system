const express = require("express");

const app = express();

app.use(express.json());
const dbConfig = require("./db");
const servicesRoute = require("./routes/services.route");
const usersRoute = require("./routes/users.route");
const port = process.env.PORT || 4000;
app.use((req, res, next) => {
  console.log(req.path, req.body);
  next();
});
app.use("/api", servicesRoute);
app.use("/api/users", usersRoute);

app.listen(port, () => console.log(`Starting server on port ${port}`));
