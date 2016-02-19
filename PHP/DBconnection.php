<?php

$db = new mysqli('localhost','terrywal_terry','Henryw000', 'terrywal_website') or die(mysql_error());


if($db->connect_errno > 0){die('Unable to connect to database [' . $db->connect_error . ']');
}