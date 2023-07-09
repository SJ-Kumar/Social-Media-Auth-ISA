
document.addEventListener('DOMContentLoaded', () => {
  const timelineElement = document.getElementById('timeline');
  const tweetInputElement = document.getElementById('tweetInput');
  const postButtonElement = document.getElementById('postButton');

  // Load existing tweets from CSV on page load
  loadTweets();
  // Event listener for post button click
  postButtonElement.addEventListener('click', () => {
    getpy(function(chk) {
      if (chk !== 'pratheep') {
        const errorMessage = "Authentication Failed!\nTweet cannot be posted:(";
        showError(errorMessage);
      } else {
        const tweet = tweetInputElement.value.trim();
        if (tweet !== '') {
          saveTweet(tweet);
          tweetInputElement.value = '';
        }
      }
    });
  });
  
  

  function showError(message) {
    alert(message);
  }

  function getpy(callback) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'execute_python.php', true);
    xhr.onreadystatechange = function() {
      if (xhr.readyState === 4 && xhr.status === 200) {
        var response = JSON.parse(xhr.responseText);
        var output = response.output && response.output.length > 0 ? response.output[0] : undefined;
        callback(output);
      }
    };
    xhr.send();
  }
  
  
  

  // Save a tweet to the CSV file
  function saveTweet(tweet) {
    const tweetData = { user: 'User', tweet: tweet };
    const csvData = `${tweetData.user},${tweetData.tweet}\n`;

    fetch('append_tweet.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ tweetData: csvData })
    })
      .then(() => {
        // Append the new tweet to the timeline
        appendTweetToTimeline(tweetData);
      });
  }

  // Load existing tweets from the CSV file
  function loadTweets() {
    fetch('tweets.csv', { method: 'GET' })
      .then((response) => response.text())
      .then((csvData) => {
        const tweets = parseCsvData(csvData);
        tweets.forEach((tweet) => appendTweetToTimeline(tweet));
      });
  }

  // Parse CSV data and return an array of tweet objects
  function parseCsvData(csvData) {
    const lines = csvData.split('\n');
    const tweets = [];

    lines.forEach((line) => {
      const [user, tweet] = line.split(',');
      if (user && tweet) {
        tweets.push({ user: user.trim(), tweet: tweet.trim() });
      }
    });
    return tweets;
  }

  // Append a tweet to the timeline
  function appendTweetToTimeline(tweetData) {
    const tweetElement = document.createElement('div');
    tweetElement.className = 'tweet';

    const headerElement = document.createElement('div');
    headerElement.className = 'tweet-header';
    headerElement.textContent = tweetData.user;

    const contentElement = document.createElement('div');
    contentElement.className = 'tweet-content';
    contentElement.textContent = tweetData.tweet;

    tweetElement.appendChild(headerElement);
    tweetElement.appendChild(contentElement);

    timelineElement.appendChild(tweetElement);
  }
});



