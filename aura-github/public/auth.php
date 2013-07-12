<?php
require_once('../config.php');

if (isset($_GET['code'])) {
  $params = array( 'http' => array(
    'method' => 'POST',
    'header' => 'Accept: application/json'
  ));
  $url = 'https://github.com/login/oauth/access_token?';
  $url .= "client_id=".$config['github_client_id'];
  $url .= "&client_secret=".$config['github_client_secret'];
  $url .= "&code=".$_GET['code'];
  $ctx = stream_context_create($params);
  $fp = @fopen($url, 'rb', false, $ctx);
  if ($fp) {
    $response = @stream_get_contents($fp);
    if ($response === false) {
      print_r($params, true);
      die("Problem reading data from $url, $php_errormsg");
    } else {
      $response = json_decode($response);
      $_SESSION['github_access_token'] = $response->access_token;
    }
  } else {
    print_r($params, true);
    die("Problem with $url : $php_errormsg");
  }
} else if (isset($_GET['logout'])) {
  $_SESSION['github_access_token'] = null;
}

header("Location: /");
