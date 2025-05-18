<?php
require __DIR__ . '/../vendor/autoload.php';

use cijic\phpMorphy\Morphy;

class LemmaService
{
    private $russianMorphology;
    private $particles_names = ['МЕЖД', 'ПРЕДЛ', 'СОЮЗ', 'ЧАСТ', 'ЧИСЛ'];

    public function __construct()
    {
        $this->russianMorphology = new Morphy('ru');
    }

    public function get_lemmas($text): array
    {
        $lemmasMap = [];
        $russianWords = $this->get_russian_words_array($text);
        $russianWords = array_filter($russianWords, fn($word) => mb_strlen($word, 'UTF-8') > 2);
        $this->add_lemma_to_map($lemmasMap, $russianWords, $this->russianMorphology);
        return $lemmasMap;
    }

    private function get_russian_words_array($text): array
    {
        $upperCaseText = mb_strtoupper($text, "UTF-8");
        $clearText = preg_replace('/[^А-ЯЁ\s]/u', ' ', $upperCaseText);
        $clearText = trim($clearText);
        $words = preg_split('/\s+/', $clearText, -1, PREG_SPLIT_NO_EMPTY);
        return $words;
    }

    private function has_particle_property($wordParticle): bool {
        foreach ($this->particles_names as $property) {
            if (str_contains(mb_strtoupper($wordParticle, "UTF-8"), $property)) {
                return true;
            }
        }

        return false;
    }

    private function any_word_praticle_belongs_to_particle($wordParticles): bool {
        foreach ($wordParticles as $particle) {
            if ($this->has_particle_property($particle)) {
                return true;
            }
        }

        return false;
    }

    private function add_lemma_to_map(&$map, $words, $morphlogy) {
        foreach($words as $word) {
            $wordParticles = $morphlogy->getPartOfSpeech($word);

            if ($this->any_word_praticle_belongs_to_particle($wordParticles)) {
                continue;
            }

            $wordBaseForms = $morphlogy->getBaseForm($word);

            if (empty($wordBaseForms)) {
                continue;
            }

            $baseForm = $wordBaseForms[0];

            if (array_key_exists($baseForm, $map)) {
                $map[$baseForm] += 1;
            } else {
                $map[$baseForm] = 1;
            }
        }
    }
}
