<?php

function db_begin_transaction(PDO $pdo): void
{
  $pdo->beginTransaction();
}

function db_commit(PDO $pdo): void
{
  $pdo->commit();
}

function db_rollback(PDO $pdo): void
{
  if ($pdo->inTransaction()) {
    $pdo->rollBack();
  }
}