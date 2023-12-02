"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var createError = require("http-errors");
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const dotenv_1 = __importDefault(require("dotenv"));
const auth_1 = __importDefault(require("./routes/auth"));
const notes_1 = __importDefault(require("./routes/notes"));
const users_1 = __importDefault(require("./routes/users"));
var path = require("path");
/*
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
*/
const app = (0, express_1.default)();
// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use((0, cors_1.default)());
app.use((0, morgan_1.default)("dev"));
app.use(express_1.default.json()); //this parses the body
app.use(express_1.default.urlencoded({ extended: false }));
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.static(path.join(__dirname, "public")));
app.use("api/v1/auth", auth_1.default); // Authentication routes
app.use("api/v1/notes", notes_1.default); // Notes routes
app.use("/api/v1users", users_1.default); // Users routes
app.get("/", () => {
    console.log(`The application is running`);
});
// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});
dotenv_1.default.config(); // configure dotenv file
// error handler
/*
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});
*/
exports.default = app;
