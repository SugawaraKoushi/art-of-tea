<?php

require_once __DIR__ . '/LemmaService.php';
require_once __DIR__ . '/../repository/LemmaRepository.php';
require_once __DIR__ . '/../repository/TeaRepository.php';
require_once __DIR__ . '/../repository/ArticleRepository.php';
require_once __DIR__ . '/../model/Lemma.php';
require_once __DIR__ . '/../model/Tea.php';
require_once __DIR__ . '/../model/Article.php';

class SearchService
{
    private LemmaService $lemmaService;
    private LemmaRepository $lemmaRepository;
    private TeaRepository $teaRepository;
    private ArticleRepository $articleRepository;

    public function __construct(PDO $pdo)
    {
        $this->lemmaRepository = new LemmaRepository($pdo);
        $this->teaRepository = new TeaRepository($pdo);
        $this->articleRepository = new ArticleRepository($pdo);
        $this->lemmaService = new LemmaService();
    }

    public function index_tea(): void
    {
        $teas = $this->teaRepository->get_all_teas();

        foreach ($teas as $tea) {
            $lemmas = $this->lemmaService->get_lemmas($tea->description);

            foreach ($lemmas as $key => $value) {
                $lemma = new Lemma(0, $key, $value, $tea->id, 1);
                $this->lemmaRepository->add_lemma($lemma);
            }
        }
    }

    public function index_articles(): void
    {
        $articles = $this->articleRepository->get_all_articles();

        foreach ($articles as $article) {
            $lemmas = $this->lemmaService->get_lemmas($article->text);

            foreach ($lemmas as $key => $value) {
                $lemma = new Lemma(0, $key, $value, $article->id, 2);
                $this->lemmaRepository->add_lemma($lemma);
            }
        }
    }

    public function get_words_count(string $query): int
    {
        $words = $this->lemmaService->get_russian_words_array($query);
        return count($words);
    }

    public function search_tea(string $query): array
    {
        $userLemmas = $this->lemmaService->get_lemmas($query);
        $teas = [];

        foreach ($userLemmas as $key => $value) {
            $lemmas = $this->lemmaRepository->get_lemmas_by_lemma_and_type($key, 1);
            $currentTeaIds = array_column($lemmas, 'entityId');

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
                $lemmas = $this->lemmaRepository->get_lemmas_by_lemma_and_type($key, 1);
                $lemmas = array_filter($lemmas, fn($lemma) => $lemma->entityId == $tea);

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

    public function search_article(string $query): ?Article
    {
        $userLemmas = $this->lemmaService->get_lemmas($query);
        $articles = [];

        foreach ($userLemmas as $key => $value) {
            $lemmas = $this->lemmaRepository->get_lemmas_by_lemma_and_type($key, 2);
            $currentArticleIds = array_column($lemmas, 'entityId');

            if (empty($articles)) {
                $articles = $currentArticleIds;
            } else {
                $articles = array_intersect($articles, $currentArticleIds);
            }
        }

        $relevantArticles = [];

        foreach ($articles as $article) {
            $relevantValue = 0;

            foreach ($userLemmas as $key => $value) {
                $lemmas = $this->lemmaRepository->get_lemmas_by_lemma_and_type($key, 2);
                $lemmas = array_filter($lemmas, fn($lemma) => $lemma->entityId == $article);

                foreach ($lemmas as $lemma) {
                    $relevantValue += $lemma->frequency;
                }
            }

            $relevantArticles[$article] = $relevantValue;
        }

        uasort($relevantArticles, function ($a, $b) {
            return $a <=> $b;
        });

        $article = $this->articleRepository->get_article_by_id(array_values($relevantArticles)[0]);

        return $article;
    }
}
