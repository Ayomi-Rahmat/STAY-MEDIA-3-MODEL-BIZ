<?php
require_once("../../bootstrap.php");
session_start();
date_default_timezone_set("Africa/Lagos");
header('Content-type:application/json');

$input = json_decode(
  file_get_contents('php://input'),
  true
);

$fullName = trim($input['fullName'] ?? '');
$email = trim($input['email'] ?? '');
$phoneNumber = trim($input['phone'] ?? '');
$password = $input['password'] ?? '';

if ($fullName === '' || $email === '' || $phoneNumber === '' || $password === '') {
  echo json_encode([
    'success' => false,
    "message" => "All fields are required."
  ]);
  exit;
}

// Validation
if ($fullName === '' || strlen($fullName) > 100) {
  echo json_encode([
    'success' => false,
    "message" => "Enter a valid full name."
  ]);
  exit;
}

if (!preg_match('/^\+?[0-9]{7,15}$/', $phoneNumber)) {
  echo json_encode([
    'success' => false,
    "message" => "Enter a valid phone number."
  ]);
  exit;
}

if (strlen($password) < 8) {
  echo json_encode([
    'success' => false,
    "message" => "Password must be at least 8 characters."
  ]);
  exit;
}

if (user_exists_by_email($pdo, $email)) {
  echo json_encode([
    'success' => false,
    'message' => 'Email is already registered.'
  ]);
  exit;
}

try {
  db_begin_transaction($pdo);
  // Create user
  $userId = create_user($pdo, $fullName, $email, $phoneNumber, $password);

  // Everything succeeded
  db_commit($pdo);
} catch (Throwable $e) {
  db_rollback($pdo);

  error_log(
    'Registration failed: ' . $e->getMessage()
  );
  echo json_encode([
    'success' => false,
    'message' => 'Unable to create your account.'
  ]);
  exit;
}

$emailSent = send_welcome_email(
  $email,
  $fullName
);

echo json_encode([
  'success' => true,
  'message' => 'Account created successfully.',
  'data' => [
    'user_id' => $userId
  ]
]);