<?php

function addMinutes($minutes)
{
  return date('Y-m-d H:i:s', time() + ($minutes * 60));
}
function randomToken($num = 6)
{
  $alphabet = "0123456789";
  $passw = array(); //remember to declare $pass as an array
  $alphaLength = strlen($alphabet) - 1; //put the length -1 in cache
  for ($i = 0; $i < $num; $i++) {
    $n = rand(0, $alphaLength);
    $passw[] = $alphabet[$n];
  }
  return implode($passw); //turn the array into a string
}
function randomTokenExtended($num = 8)
{
  $alphabet = "abcdefghijklmnopqrstuwxyzABCDEFGHIJKLMNOPQRSTUWXYZ0123456789";
  $passw = array(); //remember to declare $pass as an array
  $alphaLength = strlen($alphabet) - 1; //put the length -1 in cache
  for ($i = 0; $i < $num; $i++) {
    $n = rand(0, $alphaLength);
    $passw[] = $alphabet[$n];
  }
  return implode($passw); //turn the array into a string
}