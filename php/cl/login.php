<?php
	include("public.php");
	
	//获取前端发送过来的数据
	$uname = $_POST["uname"];
	$upwd = $_POST["upwd"];
	
	//与数据库交互
	$con = connection();
	
	$sql = "select * from user where uname = '$uname'";
	
	$res = mysqli_query($con,$sql);
	
	$row = mysqli_fetch_array($res);
	
	if($row){
		if($row["upwd"] == $upwd){
			echo "<script>alert('登录成功');location.href = 'index111.html?usename=$uname'</script>";
		}else{
			echo "<script>alert('密码有误，请重新登录');location.href = '/html/cl/login.html'</script>";
		}
	}else{
		echo "<script>alert('用户名有误，请重新登录');location.href = '/html/cl/login.html'</script>";
	}
	
?>