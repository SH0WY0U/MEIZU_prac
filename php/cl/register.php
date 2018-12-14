<?php
    header("Access-Control-Allow-Origin:*");
	
	include("public.php");
	
	$uname = $_POST["uname"];
	$upwd = $_POST["upwd"];
	
	$con = connection();
	
	$sql = "insert into user (uname,upwd) values ('$uname','$upwd')";
	
	$row = mysqli_query($con,$sql);
	
	if($row){
		echo "<script>location.href = 'http://localhost:7777/html/cl/login.html'</script>";//'登陆测试环节直接跳转登陆'
	}else{
		echo "<script>location.href = 'http://localhost:7777/html/cl/login.html'</script>";//'登陆测试环节直接跳转登陆'
	}
?>