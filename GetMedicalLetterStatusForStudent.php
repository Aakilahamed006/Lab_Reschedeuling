<?php
require_once 'connection.php';
require_once 'medical_letter.php';

header("Access-Control-Allow-Origin: *"); // Allow all origins (for development)
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

// Handle preflight request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

$db = (new Database())->connect();
$letter = new Medical_Letter($db);

// POST Method: http://localhost/Lab_Rescheduling/GetMedicalLetterStatusForStudent.php
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $input = json_decode(file_get_contents("php://input"), true);

    if (!isset($input["student_id"])) {
        http_response_code(400);
        echo json_encode(["message" => "Missing student_id."]);
        exit;
    }

    $letter->student_id = $input["student_id"];
    $letters = $letter->GetMedicalLetterStatusForStudent();

    if ($letters === false || empty($letters)) {
        http_response_code(404);
        echo json_encode(["message" => "No letters found."]);
        exit;
    }

    foreach ($letters as &$row) {
        if (isset($row['Letter_Image'])) {
            $row['Letter_Image'] = base64_encode($row['Letter_Image']);
        }
    }

    echo json_encode($letters);
}
