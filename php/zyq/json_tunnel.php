<?php
    header("Access-Control-Allow-Origin:*");
    header("content-type:text/html;charset=UTF-8");
    $json=file_get_contents("../../json/zyq/list.json");
    echo $json
?>