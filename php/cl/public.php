<?php
    header("Access-Control-Allow-Origin:*");
	
	header("content-type:text/html;charset=utf-8");
	
	function connection(){
		
		$con = mysqli_connect("http://10.36.141.238:8888/phpmyadmin/index.php","root","","studentSYS");
	
		mysqli_query($con,"set names utf8");
		
		return $con;
	}
?>