<?php

function generate_csrf_token(): string
{
  if (empty($_SESSION['csrf_token'])) {
    $_SESSION['csrf_token'] = bin2hex(random_bytes(32));
  }
  return $_SESSION['csrf_token'];
}

function validate_csrf_token(): void
{
  $token = $_SERVER['HTTP_X_CSRF_TOKEN'] ?? '';

  if (
    empty($_SESSION['csrf_token']) ||
    empty($token) ||
    !hash_equals($_SESSION['csrf_token'], $token)
  ) {
    http_response_code(403);

    echo json_encode([
      'success' => false,
      'message' => 'Invalid CSRF token.'
    ]);

    exit;
  }
}