<?php
	
	include("public.php");
	
	$uname = $_POST["uname"];
	$upwd = $_POST["upwd"];
	
	$con = connection();
	
	$sql = "insert into user (uname,upwd) values ('$uname','$upwd')";
	
	$row = mysqli_query($con,$sql);
	
	if($row){
		echo "<script>alert('注册成功');location.href = '../../html/cl/login.html'</script>";
	}else{
		echo "<script>alert('注册失败');location.href = '../../html/cl/register.html'</script>";
	}
?>