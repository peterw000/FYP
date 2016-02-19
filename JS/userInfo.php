<?PHP
$steamURL=$_REQUEST['userNumber'];
$steamKEY="D465752F2A76D0E08587BD27439E75C8";

$api = "http://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=".$steamKEY."&steamids=".$steamURL."&language=en_UK&format=json";

$json = file_get_contents($api);

$schema = json_decode($json);
$schema2= $schema->response->players[0];
echo json_encode($schema2);
return ;

?>

 