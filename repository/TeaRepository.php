<?php
class TeaRepository
{
    private PDO $pdo;

    public function __construct(PDO $pdo)
    {
        $this->pdo = $pdo;
    }

    public function get_all_teas(): array
    {
        $stmt = $this->pdo->query("SELECT * FROM `tea`");
        $teas = [];

        while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
            $teas[] = new Tea(
                $row['id'],
                $row['name'],
                $row['description'],
                $row['emoji'],
                (float)$row['price']
            );
        }

        return $teas;
    }

    public function get_tea_by_id(int $id): ?Tea
    {
        $stmt = $this->pdo->prepare("SELECT * FROM `tea` WHERE `id` = ?");
        $stmt->execute([$id]);
        $row = $stmt->fetch(PDO::FETCH_ASSOC);

        if (!$row) {
            return null;
        }

        return new Tea(
            $row['id'],
            $row['name'],
            $row['description'],
            $row['emoji'],
            (float)$row['price']
        );
    }
}
