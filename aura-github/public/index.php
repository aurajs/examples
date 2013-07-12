<?php
  require_once(dirname(dirname(__FILE__)) . '/config.php');
  $filename = __DIR__.preg_replace('#(\?.*)$#', '', $_SERVER['REQUEST_URI']);
  if (php_sapi_name() === 'cli-server' && is_file($filename)) {
      return false;
  } else {
    $uri = explode("?", $_SERVER['REQUEST_URI'], 2);
    $view = explode("/", $uri[0]);
    if (isset($view[2])) {
      $viewParam  = $view[2];
    }
    $viewName   = $view[1];
    $viewFile   = $viewName . '.php';

    if (!file_exists(dirname(__FILE__) . '/views/' . $viewFile)) {
      $viewFile = 'orgs.php';
    }
    include_once('views/layout.php');
  }
