import express from "express";
import bodyParser from "body-parser";
import axios from "axios";
import { dirname } from "path";
import { fileURLToPath } from "url";
const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", async (req, res) => {
  try {
    const response = await axios.get("https://bored-api.appbrewery.com/random");
    const result = response.data;
    res.render(__dirname + "/views/index.ejs", { data: result });
  } catch (error) {
    console.error("Failed to make request:", error.message);
    res.render(__dirname + "/views/index.ejs", {
      error: error.message,
    });
  }
});

app.post("/", async (req, res) => {

  var type = req.body["type"];
  var participants = req.body["participants"];

  try {
    const response = await axios.get(`https://bored-api.appbrewery.com/filter?type=${type}&participants=${participants}`);
    const result = response.data;
    console.log(result);
    var random = Math.floor(Math.random() * result.length);
    res.render(__dirname + "/views/index.ejs", { data: result[random] });
  } catch (error) {
    console.error("Failed to make request:", error.message);
    res.render(__dirname + "/views/index.ejs", {
      error: "No activities that match your criteria",
    });
  }

});

app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});
