<?php

require_once("../bootstrap.php");

function user_exists_by_email(PDO $pdo, string $email): bool
{
  $stmt = $pdo->prepare("SELECT id FROM users WHERE email = ? LIMIT 1");
  $stmt->execute([$email]);
  return $stmt->fetch() !== false;
}
function user_exists_by_phone(PDO $pdo, string $phone): bool
{
  $stmt = $pdo->prepare("SELECT id FROM users WHERE phone = ? LIMIT 1");
  $stmt->execute([$phone]);
  return $stmt->fetch() !== false;
}

function create_user(PDO $pdo, string $name, string $phoneNumber, string $email, string $password): int
{
  $passwordHash = password_hash($password, PASSWORD_DEFAULT);
  $stmt = $pdo->prepare("INSERT INTO users (name, email, phone_number, password_hash) VALUES (?, ?, ?)");
  $stmt->execute([
    $name,
    $email,
    $phoneNumber,
    $passwordHash
  ]);
  return (int) $pdo->lastInsertId();
}