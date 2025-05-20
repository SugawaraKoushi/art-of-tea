<?php
class Tea {
    public int $id;
    public string $name;
    public ?string $description;
    public ?string $emoji;
    public float $price;

    public function __construct(int $id, string $name, ?string $description, ?string $emoji, float $price) {
        $this->id = $id;
        $this->name = $name;
        $this->description = $description;
        $this->emoji = $emoji;
        $this->price = $price;
    }
}