<?PHP
$steamURL=$_REQUEST['userName'];
$steamKEY="D465752F2A76D0E08587BD27439E75C8";
$url="http://api.steampowered.com/ISteamUser/ResolveVanityURL/v0001/?key=".$steamKEY."&vanityurl=".$steamURL;


$api = "http://api.steampowered.com/IEconItems_440/GetSchema/v0001/?key=D465752F2A76D0E08587BD27439E75C8&language=en_UK&format=json";

$json = file_get_contents($url);

$schema = json_decode($json);
$schema2 = $schema->response->steamid;
echo $schema2;
return ;

?>