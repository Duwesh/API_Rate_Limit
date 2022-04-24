require("dotenv").config();
const express = require("express");
const app = express();

const PORT = process.env.PORT || 3000;

let timer = 0;
let count = 0;

function millisecondsToTime(milli) {
  var min = Math.floor((milli / (60 * 1000)) % 60);
  return min;
}

app.get("/", function async(req, res) {
  if (count < 10 && count >= 1) {
    count = count + 1;
    return res.send({
      message: `you have limited request, request remaining for a minutes is ${
        10 - count + 1
      }`,
    });
  } else if (count === 10) {
    let ctimer = new Date();
    if (millisecondsToTime(ctimer) - millisecondsToTime(timer) >= 1) {
      count = 1;
      timer = ctimer;
    }
    return res.send({
      message: "You have sent too many requests. Please wait a while then try again",
    });
  } else {
    let ctimer = new Date();
    timer = ctimer;
    count = 1;
    return res.send({
      message: `you are have limited request, request remaining for a minutes is ${
        10 - count + 1
      }`,
    });
  }
});

//Listening the server on the port
app.listen(PORT, function (err) {
  try {
    console.log(`Server listening on PORT ${PORT}`);
  } catch (err) {
    console.log(err.message);
  }
});
