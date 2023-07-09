import { useEffect, useState } from "react";
import { BsFillShieldLockFill, BsTelephoneFill } from "react-icons/bs";
import { CgSpinner } from "react-icons/cg";
import OtpInput from "otp-input-react";
import { auth } from "./firebase.config";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { toast, Toaster } from "react-hot-toast";
import PhoneInput from "react-phone-input-2";
import axios from "axios";
import "react-phone-input-2/lib/style.css";
import "./timeline_dynamics";


const App = () => {
  const [otp, setOtp] = useState("");
  const [ph, setPh] = useState("");
  const [loading, setLoading] = useState(false);
  const [showOTP, setShowOTP] = useState(false);
  const [user, setUser] = useState(null);
  const [status] = useState("");
  const [principalSubdivision, setPrincipalSubdivision] = useState("");
  const [city, setcity] = useState("");
  const [tweets, setTweets] = useState([]);
  const [loggedInMobileNumber, setLoggedInMobileNumber] = useState("");



  

  const findMyState = () => {
    const success = (position) => {
      console.log(position);
      const latitude=position.coords.latitude;
      const longitude=position.coords.longitude;

      const geoApiUrl=`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`

      fetch(geoApiUrl)
      .then(res => res.json())
      .then(data => {
        console.log(data);
        setcity(data.city);
        setPrincipalSubdivision(data.principalSubdivision);
        
      })
      .catch((error) => {
        console.log(error);
      });
    };

    const error = () => {
      toast.error("Unable to retrieve your location. Please click 'Allow' to continue.");
    };

    navigator.geolocation.getCurrentPosition(success, error);
  };
  useEffect(() => {
    findMyState();
  }, []);

  function onCaptchVerify() {
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(
        "recaptcha-container",
        {
          size: "invisible",
          callback: (response) => {
            onSignup();
          },
          "expired-callback": () => {},
        },
        auth
      );
    }
  }


  function onSignup() {
    setLoading(true);
    onCaptchVerify();

    const appVerifier = window.recaptchaVerifier;

    const formatPh = "+" + ph;

    signInWithPhoneNumber(auth, formatPh, appVerifier)
      .then((confirmationResult) => {
        window.confirmationResult = confirmationResult;
        setLoading(false);
        setShowOTP(true);
        toast.success("OTP sent successfully!");
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }

  function onOTPVerify() {
    setLoading(true);
    window.confirmationResult
      .confirm(otp)
      .then(async (res) => {
        console.log(res);
        setUser(res.user);
        setLoggedInMobileNumber(ph);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }
  
  useEffect(() => {
    // Load existing tweets from the CSV file
    axios
      .get("/tweets.csv")
      .then((response) => {
        const tweets = parseCsvData(response.data);
        setTweets(tweets);
      })
      .catch((error) => {
        console.log(error); // Log any error that occurs during fetching
      });
  
    // Parse CSV data and return an array of tweet objects
    function parseCsvData(csvData) {
      const lines = csvData.split("\n");
      const tweets = [];
  
      lines.forEach((line) => {
        const [user, ...contentArray] = line.split(",");
        const content = contentArray.join(",");
        if (user && content) {
          tweets.push({ user: user.trim(), tweet: content.trim() });
        }
      });
  
      return tweets;
    }
  }, []);
  
  
  
  
  

  function handlePostButton() {
    const tweetInput = document.getElementById("tweetInput");
    const tweet = tweetInput.value.trim();
    if (tweet !== "") {
      const tweetData = { user: "User", tweet: tweet };
      saveTweet(tweetData);
      tweetInput.value = "";
    }
  }

  function saveTweet(tweetData) {
    const newTweets = [...tweets, tweetData];
    setTweets(newTweets);
  }

  if (user) {
    return (
      <html>
        <head>
          <title>Twitter Timeline</title>
          <style>
            {`
              body {
                font-family: Arial, sans-serif;
                margin: 0;
                padding: 20px;
                background-color: #F5F8FA;
              }
  
              h1 {
                text-align: center;
                color: #1DA1F2;
                margin-bottom: 20px;
                font-weight: bold;
                font-size: 24px;
              }
  
              #overall {
                display: flex;
              }
  
              .container {
                max-width: 800px;
                margin: 0 auto;
              }
  
              .tweet-container {
                width: 33%;
                background-color: #FFF;
                box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
                padding: 20px;
                border-radius: 4px;
                margin: 0 auto;
                margin-bottom: 20px;
              }
  
              #timeline {
                width: 66%;
                background-color: #FFF;
                box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
                padding: 20px;
                border-radius: 4px;
                margin-top: 20px;
              }
  
              .tweet {
                background-color: #FFF;
                border: 1px solid #E1E8ED;
                padding: 15px;
                margin-bottom: 15px;
                border-radius: 4px;
                box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
              }
  
              .tweet-header {
                font-weight: bold;
                color: #1DA1F2;
                margin-bottom: 10px;
              }
  
              .tweet-content {
                color: #333;
              }
  
              .new-tweet {
                align-items: justify;
                margin-top: 20px;
              }
  
              #tweetInput {
                width: 100%;
                height: 100px;
                resize: none;
                padding: 10px;
                margin: 20px;
                border-radius: 4px;
                border: 1px solid #E1E8ED;
              }
  
              #postButton {
                width: 100%;
                background-color: #1DA1F2;
                color: #FFF;
                border: none;
                padding: 10px 15px;
                margin: 20px;
                border-radius: 4px;
                cursor: pointer;
              }
              .logged-in-mobile-number {
                position: fixed;
                top: 10px;
                right: 10px;
                padding: 5px 10px;
                background-color: #1DA1F2;
                color: #fff;
                font-size: 14px;
                border-radius: 4px;
              }
              #postButton:hover {
                background-color: darkblue;
              }
            `}
          </style>
        </head>
        <body>
        {user && (
        <div className="logged-in-mobile-number">
          Logged in as: {loggedInMobileNumber}
        </div>
      )}
        <div>
        <h1>Twitter Timeline</h1>
        <div id="overall">
        
          <div id="timeline">
          
            {tweets.map((tweet, index) => (
              <div className="tweet" key={index}>
                <div className="tweet-header">{tweet.user}</div>
                <div className="tweet-content">{tweet.tweet}</div>
              </div>
            ))}
          </div>

          <div className="new-tweet">
            <textarea id="tweetInput" placeholder="Write your tweet..."></textarea>
            <button id="postButton" onClick={handlePostButton}>Post</button>
          </div>
        </div>
      </div>

          

        </body>
      </html>
    );
  }


  return (
    <section className="bg-twitter-blue flex items-center justify-center h-screen">
      <div>
        <Toaster toastOptions={{ duration: 4000 }} />
        <div id="recaptcha-container"></div>
        {!showOTP ? (
          <>
            <h1 className="text-center leading-normal text-white font-medium text-3xl mb-6">
              Welcome to <br /> Twitter
            </h1>
            <div className="bg-white text-emerald-500 w-fit mx-auto p-4 rounded-full">
              
              <BsTelephoneFill size={30} />
            </div>
            <label
              htmlFor=""
              className="font-bold text-xl text-white text-center"
              style={{ marginTop: "10px" }}
              
              
            >
              Verify your phone number
            </label>
            <PhoneInput country={"in"} value={ph} onChange={setPh} />
            <button
              onClick={onSignup}
              className="bg-emerald-600 w-full flex gap-1 items-center justify-center py-2.5 text-white rounded"
              style={{ marginBottom: "10px" }}
            >
              {loading && (
                <CgSpinner size={20} className="mt-1 animate-spin" />
              )}
              <span>Send code via SMS</span>
            </button>
            <button
              onClick={findMyState}
              className="bg-emerald-600 w-full flex gap-1 items-center justify-center py-2.5 text-white rounded"
              style={{ marginBottom: "10px", marginTop: "10px" }}
            >
              {loading && (
                <CgSpinner size={20} className="mt-1 animate-spin" />
              )}
              <span>Find My State</span>
            </button>
          </>
        ) : (
          <>
            <div className="bg-white text-emerald-500 w-fit mx-auto p-4 rounded-full">
              <BsFillShieldLockFill size={30} />
            </div>
            <label
              htmlFor="otp"
              className="font-bold text-xl text-white text-center"
            >
              Enter your OTP
            </label>
            <OtpInput
              value={otp}
              onChange={setOtp}
              OTPLength={6}
              otpType="number"
              disabled={false}
              autoFocus
              className="opt-container"
              inputStyle={{ marginTop: "10px" }}
            ></OtpInput>
            <button
              onClick={onOTPVerify}
              className="bg-emerald-600 w-full flex gap-1 items-center justify-center py-2.5 text-white rounded"
              style={{ marginBottom: "10px" }}
            >
              {loading && (
                <CgSpinner size={20} className="mt-1 animate-spin" />
              )}
              <span>Verify OTP</span>
            </button>
          </>
        )}
        <div className="status">{status}</div>
        <div className="flex flex-col items-end">
          {principalSubdivision && city && (
            <div className="mt-4 text-center text-white font-medium">
              Hey there! Hope you're enjoying being at {city}, {principalSubdivision}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default App;