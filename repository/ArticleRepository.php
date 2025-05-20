<?php
class ArticleRepository
{
    private PDO $pdo;

    public function __construct(PDO $pdo)
    {
        $this->pdo = $pdo;
    }

    public function get_all_articles(): array
    {
        $stmt = $this->pdo->query("SELECT * FROM `article`");
        $articles = [];

        while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
            $articles[] = new Article(
                $row['id'],
                $row['text']
            );
        }

        return $articles;
    }

    public function get_article_by_id(int $id): ?Article
    {
        $stmt = $this->pdo->prepare("SELECT * FROM `article` WHERE `id` = ?");
        $stmt->execute([$id]);
        $row = $stmt->fetch(PDO::FETCH_ASSOC);

        if (!$row) {
            return null;
        }

        return new Article(
            $row['id'],
            $row['text']
        );
    }
}
