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
        if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
            http_response_code(405);
            echo json_encode(['error' => 'Доступен только метод POST']);
            return;
        }

        // Получим JSON-данные из тела запроса
        $input = json_decode(file_get_contents('php://input'), true);
        $query = $input['query'] ?? null;

        // Или через formData
        $query = $_POST['query'] ?? null;

        if (empty($query)) {
            http_response_code(400); // Bad Request
            echo json_encode(['error' => 'Query parameter is required']);
            return;
        }

        try {
            // Вызываем SearchService для обработки запроса
            $results = $this->searchService->search($query);

            // Возвращаем успешный JSON-ответ
            header('Content-Type: application/json');
            echo json_encode([
                'success' => true,
                'data' => $results,
            ]);
        } catch (Exception $e) {
            http_response_code(500); // Internal Server Error
            echo json_encode(['error' => 'Server error: ' . $e->getMessage()]);
        }
    }
}
