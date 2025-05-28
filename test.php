<?php

require_once "model/Tea.php";
require_once 'services/SearchService.php';
require 'db.php';

$searchService = new SearchService($pdo);
$index = false;

if ($index) {
    $searchService->index_tea();
    $searchService->index_articles();
}