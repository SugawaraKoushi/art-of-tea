<?php

require_once 'services/LemmaService.php';
require_once "repository/LemmaRepository.php";
require_once "repository/TeaRepository.php";
require_once "model/Lemma.php";
require_once "model/Tea.php";
require "db.php";

$teaRepository = new TeaRepository($pdo);
$teas = $teaRepository->get_all_teas();

$lemmaService = new LemmaService();
$lemmaRepository = new LemmaRepository($pdo);

$index = false;

if ($index) {
    foreach ($teas as $tea) {
        $lemmas = $lemmaService->get_lemmas($tea->description);

        foreach ($lemmas as $key => $value) {
            $lemma = new Lemma(0, $key, $value, $tea->id);
            $lemmaRepository->add_lemma($lemma);
        }
    }
}
