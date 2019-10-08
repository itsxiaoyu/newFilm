<?php
require_once('./config.php');
/*
整个项目的“初始化”页面：
其中包含着其它多个页面所共用的变量和语句
*/
header("Access-Control-Allow-Origin:*");
#创建到MySQL服务器的连接
$conn = mysqli_connect(DB_HOST, DB_USER,DB_PASS,DB_NAME,3306);
#设置WEB服务器连接MySQL服务器所用的字符集
mysqli_query( $conn, "SET  NAMES  UTF8");
?>