<?php

class Lemma
{
    public int $id;
    public string $lemma;
    public int $frequency;
    public int $teaId;

    public function __construct(int $id, string $lemma, int $frequency, int $teaId)
    {
        $this->id = $id;
        $this->lemma = $lemma;
        $this->frequency = $frequency;
        $this->teaId = $teaId;
    }
}

// Пользователь вводит запрос
// Получаем леммы из запроса
// Сортируем все леммы в порядке убывания частоты повторения
// Получаем товары по релевантности:
    // Ищем все товары, в которых присутствуют все леммы
// Сортируем товары по убываюнию релевантности
// Выводим пользователю товары
