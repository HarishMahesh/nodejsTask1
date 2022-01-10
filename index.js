const express = require("express");
const fs = require("fs");

const app = express();

app.get("/create", (req, res) => {
  let date = new Date();
  let timeStamp = date.toLocaleString();
  let curdate = date.getDate();
  let month = +date.getMonth() + 1;
  let year = date.getFullYear();
  let time = date.getHours() + "" + date.getMinutes();

  let newDate = year + "" + month + curdate;
  let fileName = newDate + "-" + time;

  fs.writeFile(`output/${fileName}.txt`, timeStamp, (err) => {
    if (err) throw err;
  });

  res.send("file created successfully");
});

app.get("/get-files", (req, res) => {
  let arr = [];
  fs.readdir("./output", (err, files) => {
    files.forEach((file) => arr.push(file));

    res.send({ message: "list of files created", files: arr });
  });
});

app.listen(3000, () => console.log("server is up"));
