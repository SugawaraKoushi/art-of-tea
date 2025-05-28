<?php
$host = getenv('DB_HOST') ?: 'localhost';;
$db = getenv('DB_NAME') ?: 'art_of_tea';
$username = getenv('DB_USER') ?: 'root';
$password = getenv('DB_PASSWORD') ?: '';
$charset = 'utf8';

// Опции подключения
$options = [
    PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION, // Ошибки выбрасываются в виде исключений
    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,       // По умолчанию использовать ассоциативный массив для выборок
    PDO::ATTR_EMULATE_PREPARES   => false,                  // Отключить эмуляцию подготовленных запросов
];

// Создание объекта PDO для подключения к базе данных
try {
    $dsn = "mysql:host=$host;dbname=$db;charset=$charset";
    $pdo = new PDO($dsn, $username, $password, $options);
} catch (PDOException $e) {
    // Если подключение не удалось, вывести сообщение об ошибке
    throw new PDOException($e->getMessage(), (int)$e->getCode());
}
?>