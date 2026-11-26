<?php

function user_exists_by_email(PDO $pdo, string $email): bool
{
  $stmt = $pdo->prepare("SELECT id FROM users WHERE email = ? LIMIT 1");
  $stmt->execute([$email]);
  return $stmt->fetch() !== false;
}

function create_user(PDO $pdo, string $name, string $email, string $phoneNumber, string $password): int
{
  $passwordHash = password_hash($password, PASSWORD_DEFAULT);
  $stmt = $pdo->prepare("INSERT INTO users (name, email, phone_number, password_hash) VALUES (?, ?, ?, ?)");
  $stmt->execute([
    $name,
    $email,
    $phoneNumber,
    $passwordHash
  ]);
  return (int) $pdo->lastInsertId();
}