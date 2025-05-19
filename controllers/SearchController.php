<?php
require_once __DIR__ . '/../services/SearchService.php';
require_once __DIR__ . '/../db.php';

class SearchController
{
    private $searchService;

    public function __construct(PDO $pdo)
    {
        $this->searchService = new SearchService($pdo);
    }

    public function search()
    {
        try {
            $input = json_decode(file_get_contents('php://input'), true);
            $query = $input['query'] ?? '';

            if (empty($query)) {
                echo json_encode(['success' => false, 'error' => 'Пустой запрос']);
                return;
            }

            $results = $this->searchService->search($query);

            echo json_encode([
                'success' => true,
                'data' => $results
            ]);
        } catch (Exception $e) {
            echo json_encode([
                'success' => false,
                'error' => $e->getMessage()
            ]);
        }
    }
}

// Маршрутизация
if (isset($_GET['action']) && $_GET['action'] === 'search') {
    try {
        $controller = new SearchController($pdo);
        $controller->search();
    } catch (Exception $e) {
        http_response_code(500);
        echo json_encode([
            'success' => false,
            'error' => 'Ошибка инициализации контроллера: ' . $e->getMessage()
        ]);
    }
}
