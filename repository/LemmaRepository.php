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
        $query = "INSERT INTO `lemmas` (`lemma`, `frequency`, `tea_id`) VALUES (?, ?, ?)";
        $stmt = $this->pdo->prepare($query);
        return $stmt->execute([$lemma->lemma, $lemma->frequency, $lemma->teaId]);
    }

    public function get_all_lemmas(): array
    {
        $stmt = $this->pdo->query("SELECT * FROM `lemmas`");
        $lemmas = [];

        while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
            $lemmas[] = new Lemma(
                (int)$row['id'],
                $row['lemma'],
                $row['frequency'],
                $row['tea_id']
            );
        }

        return $lemmas;
    }

    public function get_lemmas_by_lemma(string $lemma): array {
        $query = "SELECT * FROM `lemmas` WHERE `lemma` = ?";
        $stmt = $this->pdo->prepare($query);
        $stmt->execute([$lemma]);
        $lemmas = [];

        while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
            $lemmas[] = new Lemma(
                (int)$row['id'],
                $row['lemma'],
                $row['frequency'],
                $row['tea_id']
            );
        }

        return $lemmas;
    }
}
