<?php

require_once "model/Tea.php";
require_once 'services/SearchService.php';
require 'db.php';

$query = 'чай улун';

$searchService = new SearchService($pdo);

$index = false;

if ($index) {
    $searchService->index_tea();
    $searchService->index_articles();
}

print_r($teas);