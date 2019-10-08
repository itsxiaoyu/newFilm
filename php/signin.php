<?php
require_once("./init.php");
@$uphone=$_REQUEST["uphone"];
@$upswd=$_REQUEST["upswd"];
if($uphone!=null&&$upswd!=null){
	$sql="select * from user where uphone='$uphone' and upswd='$upswd'";
	$result=mysqli_query($conn,$sql);
	$row=mysqli_fetch_row($result);
	// echo $sql;
	if($row!=null){
		session_start();
		$_SESSION["uphone"]=$row[0];
		echo "true";
	}else
		echo "false";
}
?>