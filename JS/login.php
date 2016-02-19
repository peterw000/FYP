<?php
header("Content-type: application/json");


$db = new mysqli('localhost','terrywal_terry','Henryw000', 'terrywal_website') or die(mysql_error());

if($db->connect_errno > 0){die('Unable to connect to database [' . $db->connect_error . ']');
}
else{
		$Username = $_REQUEST['Username'];
		$Password = $_REQUEST['Password'];

		$result = $db->query("SELECT Username,Password FROM FYP_Login where Username='".$Username."' AND Password='".$Password."'");


		$totalrow = $result->num_rows;
		if($_REQUEST['logout']==0){
		if($totalrow >0){
			$result = $db->query("UPDATE FYP_Login SET Login=1 where Username='".$Username."' AND Password='".$Password."'");

			echo 1;

		}else{echo 0;};
		}

		if($_REQUEST['logout']==1){
			$result = $db->query("UPDATE FYP_Login SET Login=0 where Username='".$Username."' AND Password='".$Password."'");

		}
	}

	
	

$db->close(); 
?>