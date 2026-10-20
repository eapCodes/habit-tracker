<?php
require "db.php";
header("Content-Type: application/json");

// WRITE path: add a habit
if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $data = json_decode(file_get_contents("php://input"), true);
    $name = trim($data["name"] ?? "");
    $weight = (int)($data["weight"] ?? 0);

    if ($name === "" || strlen($name) > 60 || $weight < 1 || $weight > 5) {
        http_response_code(400);
        echo json_encode(["error" => "Invalid name or weight"]);
        exit;
    }

    $stmt = $pdo->prepare("INSERT INTO habits (name, weight) VALUES (?, ?)");
    $stmt->execute([$name, $weight]);

    echo json_encode(["id" => (int)$pdo->lastInsertId(), "name" => $name, "weight" => $weight]);
    exit;
}

// READ path: list habits
$rows = $pdo->query("SELECT id, name, weight FROM habits WHERE is_active = 1 ORDER BY id")
            ->fetchAll(PDO::FETCH_ASSOC);
echo json_encode($rows);