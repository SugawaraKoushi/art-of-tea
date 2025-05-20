<?php

require_once __DIR__ . '/LemmaService.php';
require_once __DIR__ . '/../repository/LemmaRepository.php';
require_once __DIR__ . '/../repository/TeaRepository.php';
require_once __DIR__ . '/../model/Lemma.php';
require_once __DIR__ . '/../model/Tea.php';

class SearchService
{
    private LemmaService $lemmaService;
    private LemmaRepository $lemmaRepository;
    private TeaRepository $teaRepository;

    public function __construct(PDO $pdo)
    {
        $this->lemmaRepository = new LemmaRepository($pdo);
        $this->teaRepository = new TeaRepository($pdo);
        $this->lemmaService = new LemmaService();
    }

    public function index_tea(): void
    {
        $teas = $this->teaRepository->get_all_teas();

        foreach ($teas as $tea) {
            $lemmas = $this->lemmaService->get_lemmas($tea->description);

            foreach ($lemmas as $key => $value) {
                $lemma = new Lemma(0, $key, $value, $tea->id);
                $this->lemmaRepository->add_lemma($lemma);
            }
        }
    }

    public function get_words_count(string $query) : int {
        $lemmas = $this->lemmaService->get_lemmas($query);
        return count($lemmas);
    }

    public function search_tea(string $query): array
    {
        $userLemmas = $this->lemmaService->get_lemmas($query);
        $teas = [];

        foreach ($userLemmas as $key => $value) {
            $lemmas = $this->lemmaRepository->get_lemmas_by_lemma($key);
            $currentTeaIds = array_column($lemmas, 'teaId');

            if (empty($teas)) {
                $teas = $currentTeaIds;
            } else {
                $teas = array_intersect($teas, $currentTeaIds);
            }
        }

        $relevantTeas = [];

        foreach ($teas as $tea) {
            $relevantValue = 0;

            foreach ($userLemmas as $key => $value) {
                $lemmas = $this->lemmaRepository->get_lemmas_by_lemma($key);
                $lemmas = array_filter($lemmas, fn($lemma) => $lemma->teaId == $tea);

                foreach ($lemmas as $lemma) {
                    $relevantValue += $lemma->frequency;
                }
            }

            $relevantTeas[$tea] = $relevantValue;
        }

        uasort($relevantTeas, function ($a, $b) {
            return $a <=> $b;
        });

        $teas = [];

        foreach ($relevantTeas as $key => $value) {
            $teas[] = $this->teaRepository->get_tea_by_id($key);
        }

        return $teas;
    }
}

?>