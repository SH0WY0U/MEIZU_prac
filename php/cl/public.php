<?php
	
	header("content-type:text/html;charset=utf-8");
	
	function connection(){
		
		$con = mysqli_connect("localhost","root","","studentSYS");
	
		mysqli_query($con,"set names utf8");
		
		return $con;
	}
?>