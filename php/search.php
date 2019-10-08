<?php
require_once('./function.php');
$sql = 'select * from search';
$result = consql($sql);
echo $result;
?>