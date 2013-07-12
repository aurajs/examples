<?php
session_start();

$iniFile = dirname(__FILE__) . '/config.ini';

if (getenv('GITHUB_CLIENT_ID') && getenv('GITHUB_CLIENT_SECRET')) {
  $config = array();
  $config['github_client_id']     = getenv('GITHUB_CLIENT_ID');
  $config['github_client_secret'] = getenv('GITHUB_CLIENT_SECRET');
} else if (file_exists($iniFile)) {
  $config = parse_ini_file($iniFile);
} else {
  die('Check the config.ini.example, you need a config.ini file like that to make it work...');
}

if (isset($_SESSION['github_access_token'])) {
  $config["github_access_token"] = $_SESSION['github_access_token'];
} else {
  $config["github_access_token"] = false;
}


