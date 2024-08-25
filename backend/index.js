const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();
const express = require("express");

const app = express();
const port = process.env.PORT;

app.use(cors());
app.use(express.json());

app.get("/", async (req, res) => {
  res.send("hello");
});

app.post("/bfhl", async (req, res) => {
  try {
    const {
      full_name = "Vishwanatha S K V R Kurella",
      dob = "08/12/2003",
      college_email = "vishwanatha.skvrkurella2021@vitstudent.ac.in",
      college_roll = "21BPS1008",
      data = [],
    } = req.body;

    const numbers = [];
    const alphabets = [];
    let highestLowercase = "";

    data.forEach((item) => {
      if (!isNaN(item)) {
        numbers.push(item);
      } else if (typeof item === "string" && item.length === 1) {
        alphabets.push(item);
        if (item === item.toLowerCase() && item >= "a" && item <= "z") {
          if (highestLowercase === "" || item > highestLowercase) {
            highestLowercase = item;
          }
        }
      }
    });

    const user_id = `${full_name.toLowerCase().replace(/\s/g, "_")}_${dob}`;

    res.json({
      is_success: true,
      user_id: user_id,
      email: college_email,
      roll_number: college_roll,
      numbers: numbers,
      alphabets: alphabets,
      highest_lowercase_alphabet: highestLowercase ? [highestLowercase] : [],
    });
  } catch (error) {
    res.status(500).json({ is_success: false, message: error.message });
  }
});

app.get("/bfhl", async (req, res) => {
  res.status(200).json({ operation_code: 1 });
});

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
