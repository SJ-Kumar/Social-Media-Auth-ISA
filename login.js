document.getElementById("loginForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent form submission
    
    const mobileNumber = document.getElementById("mobileNumber").value;
    const password = document.getElementById("password").value;
    
    // Send a POST request to the server for authentication
    fetch("/authenticate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ mobileNumber, password })
    })
    .then(response => response.json())
    .then(data => {
      if (data.success) {
        // Authentication successful, send OTP
        sendOTP(mobileNumber);
      } else {
        alert("Authentication failed. Please check your credentials.");
      }
    })
    .catch(error => {
      console.error("Error:", error);
    });
  });
  
  function sendOTP(mobileNumber) {
    // Send a POST request to the server to send the OTP
    fetch("/send-otp", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ mobileNumber })
    })
    .then(response => response.json())
    .then(data => {
      if (data.success) {
        // OTP sent successfully, prompt the user to enter OTP
        const enteredOTP = prompt("Enter the OTP sent to your mobile number:");
        
        // Validate OTP
        validateOTP(mobileNumber, enteredOTP);
      } else {
        alert("Failed to send OTP. Please try again later.");
      }
    })
    .catch(error => {
      console.error("Error:", error);
    });
  }
  
  function validateOTP(mobileNumber, enteredOTP) {
    // Send a POST request to the server to validate the OTP
    fetch("/validate-otp", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ mobileNumber, enteredOTP })
    })
    .then(response => response.json())
    .then(data => {
      if (data.success) {
        // OTP validation successful, redirect to the new page
        window.location.href = "/new-page";
      } else {
        alert("OTP validation failed. Please try again.");
      }
    })
    .catch(error => {
      console.error("Error:", error);
    });
  }
  