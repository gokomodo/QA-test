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
  const random = Math.floor(Math.random() * 7) + 1;
  let st = 500;
  let toSend = {};
  let msg = "";

  if (random === 4) {
    toSend = { message: "something error" };
    msg = "something error";
  } else if (loginAccount) {
    if (loginAccount.password === req.body.password) {
      if (loginAccount.deactivated) {
        st = 400;
        toSend = { message: "your account has deactivated" };
        msg = "your account has deactivated";
      } else {
        st = 200;
        toSend = loginAccount;
      }
    } else {
      st = 400;
      toSend = { message: "email / password is incorrect" };
      msg = "email / password is incorrect";
    }
  } else {
    toSend = { message: "something error" };
    msg = "something error";
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
