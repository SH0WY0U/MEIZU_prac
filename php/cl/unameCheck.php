<?php
	include("public.php");
	
	//获取前端发送过来的数据
	$uname = $_GET["uname"];
	
	//与数据库交互
	$con = connection();
	
	$sql = "select * from user where uname = '$uname'";
	
	$res = mysqli_query($con,$sql);
	
	$row = mysqli_fetch_array($res);
	
	if($row){
		echo "ok";
	}else{
		echo "no";
	}
	
	
	
?>