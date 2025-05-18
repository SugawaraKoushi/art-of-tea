<?php

require_once 'services/LemmaService.php';
require_once "repository/LemmaRepository.php";
require_once "repository/TeaRepository.php";
require_once "model/Lemma.php";
require_once "model/Tea.php";
require "db.php";


$index = false;
$lemmaService = new LemmaService();
$lemmaRepository = new LemmaRepository($pdo);

if ($index) {
    $teaRepository = new TeaRepository($pdo);
    $teas = $teaRepository->get_all_teas();

    foreach ($teas as $tea) {
        $lemmas = $lemmaService->get_lemmas($tea->description);

        foreach ($lemmas as $key => $value) {
            $lemma = new Lemma(0, $key, $value, $tea->id);
            $lemmaRepository->add_lemma($lemma);
        }
    }
}

$text = 'чай улун';
$userLemmas = $lemmaService->get_lemmas($text);
$foundLemmas = [];
$teas = [];

foreach ($userLemmas as $key => $value) {
    $lemmas = $lemmaRepository->get_lemmas_by_lemma($key);
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

    foreach($userLemmas as $key => $value) {
        $lemmas = $lemmaRepository->get_lemmas_by_lemma($key);
        $lemmas = array_filter($lemmas, fn($lemma) => $lemma->teaId == $tea);
        
        foreach($lemmas as $lemma) {
            $relevantValue += $lemma->frequency;
        }
    }

    $relevantTeas[$tea] = $relevantValue;
}

uasort($relevantTeas, function($a, $b) {
    return $a <=> $b;
});

print_r($relevantTeas);