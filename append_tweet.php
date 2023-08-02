<?php
  // Get the tweet data from the request body
  $requestData = json_decode(file_get_contents('php://input'), true);
  $tweetData = $requestData['tweetData'];

  // Append the tweet data to the CSV file
  file_put_contents('tweets.csv', $tweetData, FILE_APPEND);
?>




