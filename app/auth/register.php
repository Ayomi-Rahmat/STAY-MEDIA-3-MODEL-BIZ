<?php
require_once("../bootstrap.php");
session_start();
date_default_timezone_set("Africa/Lagos");
header('Content-type:application/json');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
  echo json_encode(["msg" => "No action performed"]);
}