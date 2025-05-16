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
        $sql = "INSERT INTO `lemmas` (`lemma`, `frequency`, `tea_id`) VALUES (:lemma, :frequency, :tea_id)";
        $stmt = $this->pdo->prepare($sql);

        $stmt->bindParam(':lemma', $lemma->lemma, PDO::PARAM_STR);
        $stmt->bindParam(':frequency', $lemma->frequency, PDO::PARAM_INT);
        $stmt->bindParam(':tea_id', $lemma->teaId, PDO::PARAM_INT);

        return $stmt->execute();
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
}
