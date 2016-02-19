 <?PHP
$steamURL=$_REQUEST['userNumber'];
$steamKEY="D465752F2A76D0E08587BD27439E75C8";

$api = "http://api.steampowered.com/ISteamUser/GetFriendList/v0001/?key=".$steamKEY."&steamid=".$steamURL."&relationship=friend&language=en_UK&format=json";
$json = file_get_contents($api);
$schema= json_decode($json);
$schema2= $schema->friendslist->friends;
//$schema = json_decode($json);

//$schema2= $schema;
echo json_encode($schema2);
return ;

?>


