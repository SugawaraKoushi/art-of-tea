<?php

require_once "model/Tea.php";
require_once 'services/SearchService.php';
require 'db.php';

$query = 'чай улун';

$searchService = new SearchService($pdo);
$teas = $searchService->search($query);

print_r($teas);