<?php

//echo json_encode($words[$word]);*

$file = file('words.txt');

//Number of words in the file.
$size = sizeof($file);

$index = rand(0, $size - 1);

$word = $file[$index];

//Remove new line character
$word = trim(preg_replace('/\s+/', '', $word));

echo json_encode($word);
