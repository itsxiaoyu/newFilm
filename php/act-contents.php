<?php
require_once('./function.php');
$sql = 'select * from  cotents Limit 0,12';
$result = consql($sql);
echo $result;
?>