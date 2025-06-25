<?php
require_once 'connection.php';
require_once 'medical_letter.php';
$db = (new Database())->connect();
$letter = new Medical_Letter($db);

header("Access-Control-Allow-Origin: *"); // Allow all origins
header("Access-Control-Allow-Methods: POST, GET, OPTIONS"); // Allow specific methods
header("Access-Control-Allow-Headers: Content-Type, Authorization");

// 🔧 Handle CORS preflight request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

// 📨 Handle POST request
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    require_once 'connection.php';
    require_once 'medical_letter.php';
    $db = (new Database())->connect();
    $letter = new Medical_Letter($db);

    $input = json_decode(file_get_contents("php://input"), true);
    if (!isset($input['letter_id'])) {
        http_response_code(400);
        echo json_encode(array("message" => "Invalid input, letter_id is required."));
        exit;
    }

    $letter->letter_id = $input['letter_id'];
    $stmt = $letter->CheckLetter();

    if ($stmt) {
        http_response_code(200);
        echo json_encode(array("message" => "Letter checked by Instructor successfully."));
    } else {
        http_response_code(404);
        echo json_encode(array("message" => "Letter not found or already approved."));
    }
} else {
    http_response_code(405);
    echo json_encode(array("message" => "Method not allowed."));
}

