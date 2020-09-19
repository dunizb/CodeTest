const express = require("express");
const multer = require("multer");
const zlib = require("zlib");
const cors = require("cors");
let fs = require("fs");
let path = require("path");

const app = express();
app.use(cors());

const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
}); // note you can pass `multer` options here

app.post("/compress", upload.single("file"), async (req, res) => {
  console.log(1);
  try {
    const destination = `compressed/${req.file.originalname}.gz`;
    let fileBuffer = req.file.buffer;
    await zlib.gzip(fileBuffer, (err, response) => {
      if (err) {
        console.log(err);
      }
      fs.writeFile(path.join(__dirname, destination), response, (err, data) => {
        if (err) {
          console.log(err);
        }
        res.download(path.join(__dirname, destination));
      });
    });
  } catch (err) {
    console.log(err);
    res.json(err);
  }
});

app.listen(3000, () => {
  console.log("启动成功");
  console.log("http://localhost:3000");
});
