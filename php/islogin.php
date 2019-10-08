<?php
header("Content-Type:application/json");

require_once("./function.php");

 $uname=$_POST["uname"];
 $uphone=$_POST["uphone"];
 $upswd=$_POST["upswd"];
	$sql="insert into user(uname,uphone,upswd) values ('$uname','$uphone','$upswd')";
	$result = consql($sql);
	if($result==true)
	{
		echo "注册成功";
	}
	else
	{
		echo "注册失败";
	}
?>