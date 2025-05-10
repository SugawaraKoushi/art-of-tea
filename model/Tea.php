<?php
class Tea {
    public int $id;
    public string $name;
    public ?string $description;
    public float $price;

    public function __construct(int $id, string $name, ?string $description, float $price) {
        $this->id = $id;
        $this->name = $name;
        $this->description = $description;
        $this->price = $price;
    }
}