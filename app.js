require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const handlebars = require("express-handlebars");
const passport = require("./config/passport");
const sessionsRouter = require("./routes/sessions");
require("dotenv").config();
const productRoutes = require("./routes/products.router");
const cartRoutes = require("./routes/carts.router");
const errorHandler = require("./middlewares/errorHandler");
const usersRouter = require("./routes/users");
const viewsRouter = require("./routes/views.router");
const session = require("express-session");
const panelRouter = require("./routes/panel.router");

const app = express();
const PORT = 8080;
app.engine("handlebars", handlebars.engine());
app.set("view engine", "handlebars");
app.set("views", __dirname + "/views");
app.use(
  session({
    secret: "Secreto123",
    resave: false,
    saveUninitialized: false,
  })
);
app.use(express.json());
app.use(passport.initialize());
app.use(passport.session());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/sessions", sessionsRouter);
app.use("/panel", panelRouter);
app.use("/api/users", usersRouter);
app.use("/api/products", productRoutes);
app.use("/api/carts", cartRoutes);
app.use(errorHandler);
app.use("/", viewsRouter);
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
