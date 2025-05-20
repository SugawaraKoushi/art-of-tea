<?php

class Lemma
{
    public int $id;
    public string $lemma;
    public int $frequency;
    public int $entityId;
    public int $entityType;

    public function __construct(int $id, string $lemma, int $frequency, int $entityId, int $entityType)
    {
        $this->id = $id;
        $this->lemma = $lemma;
        $this->frequency = $frequency;
        $this->entityId = $entityId;
        $this->entityType = $entityType;
    }
}