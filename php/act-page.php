<?php

require_once('./function.php');
$pageStart = $_POST['pageStart'];
$pageEnd = $_POST['pageEnd'];

$sql = 'select *from cotents limit'. ' '.$pageStart.','.$pageEnd;
$result = consql($sql);
echo $result;
?>