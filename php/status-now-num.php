<?php

require_once('./function.php');
$sql = $sql = 'SELECT * FROM cotents where contentsStatus=1';
$result = consql($sql);
echo $result;

?>