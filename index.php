<?php
$title = "Art of tea";

require_once "repository/PromptRepository.php";
require_once "repository/TeaRepository.php";
require_once "model/Prompt.php";
require_once "model/Tea.php";
require "db.php";

$promptRepository = new PromptRepository($pdo);
$prompts = $promptRepository->get_all_prompts();

$teaRepository = new TeaRepository($pdo);
$teas = $teaRepository->get_all_teas();

$messages = [];

require "head.php";
require "header.php";
require "main.php";
require "footer.php";

?>
    