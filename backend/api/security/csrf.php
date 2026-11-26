<?php

session_start();

require_once("../../bootstrap.php");

header('Content-Type: application/json');

echo json_encode([
  'success' => true,
  'csrf_token' => generate_csrf_token()
]);