<?php
class SearchController {
    private $searchService;

    public function __construct() {
        $this->searchService = new SearchService();
    }

    public function searchTea() {
        header('Content-Type: application/json');
        $input = json_decode(file_get_contents('php://input'), true);
        $query = $input['query'] ?? '';
        $results = $this->searchService->search_tea($query);
        echo json_encode($results);
        exit;
    }
}