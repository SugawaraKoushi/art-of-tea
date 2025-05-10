<?php
class PromptRepository
{
    private PDO $pdo;

    public function __construct(PDO $pdo)
    {
        $this->pdo = $pdo;
    }

    public function get_all_prompts(): array
    {
        $stmt = $this->pdo->query("SELECT * FROM `prompt`");
        $prompts = [];

        while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
            $prompts[] = new Prompt(
                (int)$row['id'],
                $row['text'],
            );
        }

        return $prompts;
    }
}
