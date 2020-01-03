const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const app = express();
const port = 3000;
const account = require("../account.json");
const buildPath = path.join(__dirname, "..", "..", "build");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(buildPath));

app.post("/api", (req, res) => {
  const loginAccount = account[req.body.email];
  let st = 422;
  let toSend = { message: "email / password is incorrect" };
  let msg = "email / password is incorrect";

  if (loginAccount) {
    if (loginAccount.password === req.body.password) {
      if (loginAccount.deactivated) {
        st = 401;
        toSend = { message: "your account has deactivated" };
        msg = "your account has deactivated";
      } else {
        st = 200;
        toSend = loginAccount;
      }
    }
  }

  res.statusMessage = msg;
  res
    .status(st)
    .send(toSend)
    .end();
});

app.listen(port, () => {
  console.log("test server on port : ", port);
});
