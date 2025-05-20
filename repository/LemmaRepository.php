<?php
class LemmaRepository
{
    private PDO $pdo;

    public function __construct(PDO $pdo)
    {
        $this->pdo = $pdo;
    }

    public function add_lemma(Lemma $lemma): bool
    {
        $query = "INSERT INTO `lemmas` (`lemma`, `frequency`, `entity_id`, `entity_type`) VALUES (?, ?, ?, ?)";
        $stmt = $this->pdo->prepare($query);
        return $stmt->execute([$lemma->lemma, $lemma->frequency, $lemma->entityId, $lemma->entityType]);
    }

    public function get_all_lemmas(): array
    {
        $stmt = $this->pdo->query("SELECT * FROM `lemmas`");
        $lemmas = [];

        while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
            $lemmas[] = new Lemma(
                $row['id'],
                $row['lemma'],
                $row['frequency'],
                $row['entity_id'],
                $row['entity_type']
            );
        }

        return $lemmas;
    }

    public function get_lemmas_by_lemma_and_type(string $lemma, int $type): array
    {
        $query = "SELECT * FROM `lemmas` WHERE `lemma` = ? AND `entity_type` = ?";
        $stmt = $this->pdo->prepare($query);
        $stmt->execute([$lemma, $type]);
        $lemmas = [];

        while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
            $lemmas[] = new Lemma(
                $row['id'],
                $row['lemma'],
                $row['frequency'],
                $row['entity_id'],
                $row['entity_type']
            );
        }

        return $lemmas;
    }
}
