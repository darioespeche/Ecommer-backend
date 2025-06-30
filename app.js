const express = require("express");
const mongoose = require("mongoose");
const passport = require("./config/passport");
const sessionsRouter = require("./routes/sessions");
require("dotenv").config();

const app = express();
const PORT = 8080;

app.use(express.json());
app.use(passport.initialize());

app.use("/api/sessions", sessionsRouter);

// Conexión MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Conectado a MongoDB");
    app.listen(PORT, () =>
      console.log(`Servidor escuchando en http://localhost:${PORT}`)
    );
  })
  .catch((err) => console.error("Error de conexión a MongoDB:", err));
