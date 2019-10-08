<?php

require_once('./function.php');
$sql = $sql = 'SELECT * FROM cotents where contentsStatus=1 limit 0,12';
$result = consql($sql);
echo $result;

?>