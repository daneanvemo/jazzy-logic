<?php

	/*
	 *	Return JSON data with the sum of all 
	 *  post in the patterns
	 */

	$host = "gotechno-140669.mysql.binero.se";
	$user = "140669_ym65203";
	$pass = "lK#sd90mM1";
	$db = "140669-gotechno";

	mysql_connect($host,$user,$pass);
	mysql_select_db($db);

	$sql = mysql_query("select pat from `140669-gotechno`.`main_table` order by modified desc");
	
	$out = array_fill(0, 192, 0);

	while($row=mysql_fetch_assoc($sql)){
		$array = explode( ";", $row['pat'], -1);

		for($i = 0; $i <sizeof($array) ; $i++){
			$out[$array[$i]]++;
		}
		$output[]=$row;
	}

	// Output JSON
	
	$json = '[';
	for($i = 0; $i < sizeof($out); $i++){
		$json = $json.'{ "id":'.$i.', "pat": "'.$out[$i].'"},';  
	}

	$json = substr($json, 0, -1);
	$json = $json.']';

	echo $json;

	mysql_close();
?>

