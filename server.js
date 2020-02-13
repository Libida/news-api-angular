const express = require("express");
const fs = require("fs");
const passport = require("passport");
const flash = require("connect-flash");
const chalk = require("chalk"); //coloring
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const session = require("express-session");
const methodOverride = require("method-override");
const successColor = chalk.bold.cyan;
const errorColor = chalk.bold.red;
const colors = {successColor, errorColor};
const app = express();
// const webpack = require("webpack");
// const webpackDevMiddleware = require("webpack-dev-middleware");
// const webpackConfig = require("./webpack.config");
// const compiler = webpack(webpackConfig);
const config = require("./config/properties")(app);
const expressPort = config.PORT;

require("./config/db")(app, config, colors);

require("./config/passport")(passport);

// app.use(webpackDevMiddleware(compiler, {
//   publicPath: webpackConfig.output.publicPath,
// }));

app.use(cookieParser()); // read cookies (needed for auth)
app.use(bodyParser()); // get information from html forms
app.set("views", "./client/app/");
app.set("view engine", "html");
// app.get('*', function(req, res) {
//   res.sendfile('./dist/index.html')
// });

// app.use(function(req, res) {
//   res.sendFile('./dist/index.html');
// });


// required for passport
app.use(session({ secret: "masha" })); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session

// Static files middleware
app.use(express.static("./dist"));

app.use(methodOverride("_method"));

require("./config/routes")(app, passport);

// Serve the files
app.listen(expressPort, (req, res) => {
  console.log(`News API app listening on port ${expressPort}!\n`);
});

