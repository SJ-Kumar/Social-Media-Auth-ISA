const express = require("express");
const bodyParser = require("body-parser");
const app = express();

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(__dirname));
app.get("/new-page", (req, res) => {
    res.sendFile(__dirname + "/new-page.html");
  });

// Dummy user data
const users = [
  { mobileNumber: "1234567890", password: "password123" },
  { mobileNumber: "9499905475", password: "jayanth" },
  // Add more users as needed
];

const otps={};

// Authenticate user
app.post("/authenticate", (req, res) => {
  const { mobileNumber, password } = req.body;
  
  const user = users.find(u => u.mobileNumber === mobileNumber && u.password === password);
  
  if (user) {
    res.json({ success: true });
  } else {
    res.json({ success: false });
  }
});


// Send OTP
app.post("/send-otp", (req, res) => {
    const { mobileNumber } = req.body;
    const otp = Math.floor(100000 + Math.random() * 900000); // Generate a random 6-digit OTP
  
    // Store the OTP for validation
    otps[mobileNumber] = otp;
  
    // Here, you can implement the logic to send the OTP to the provided mobile number.
    // You can use SMS gateways or any other method to send the OTP.
    // For this example, we assume the OTP sending is successful.
    console.log(`OTP sent to ${mobileNumber}: ${otp}`);
  
    res.json({ success: true });
  });
  
// Validate OTP
app.post("/validate-otp", (req, res) => {
  const mobileNumber = req.body.mobileNumber;
  const otp = req.body.otp;

  console.log("Entered OTP:", otp);
  console.log("Stored OTP:", otps[mobileNumber]);

  if (otps[mobileNumber] && otps[mobileNumber] == otp) {
    console.log("OTP validation successful");
    res.json({ success: true });
  } else {
    console.log("OTP validation failed");
    res.json({ success: false });
  }
});


// Start the server
app.listen(3000, () => {
  console.log("Server started on port 3000");
});
