<?php

require_once ('function.php');
$pageStart = $_POST['pageStart'];
$pageEnd = $_POST['pageEnd'];

$sql = 'SELECT * FROM cotents where contentsStatus=3 limit '.$pageStart.','.$pageEnd; 
$result = consql($sql);
echo $result;

?>