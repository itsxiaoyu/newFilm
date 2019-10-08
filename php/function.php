<?php
header('content-type:text/html;charset=utf-8');
require_once('./config.php');
function 
consql($sql) {
  $db = new MySQLi(DB_HOST,DB_USER,DB_PASS,DB_NAME);
  !mysqli_connect_error() or die('连接失败');
  @mysqli_set_charset($db,'utf8');
  $result = $db->query($sql);
  $sql = ltrim($sql,' ');
  $str = substr($sql,0,6);
  if(strtolower($str) === 'select') {
    $rows = array();
    while($row = mysqli_fetch_assoc($result)){
        $rows[] = $row;
    }
      $data = json_encode($rows,JSON_UNESCAPED_UNICODE);
      return  $data;
  } else {
    return $result;
  }
  mysql_close($db);
}
?>