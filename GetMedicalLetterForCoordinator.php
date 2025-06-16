<?php
require_once 'connection.php';
require_once 'medical_letter.php';
header("Access-Control-Allow-Origin: *");

// Allow specific methods and headers
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
$db = (new Database())->connect();
$letter = new Medical_Letter($db);

// GET Method: http://localhost/Lab_Rescheduling/GetMedicalLetterForCoordinator.php
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $input = json_decode(file_get_contents("php://input"), true);

    if (!isset($input["subject_coordinator_id"])) {
        http_response_code(400);
        echo json_encode(["message" => "Missing subject_coordinator_id."]);
        exit;
    }

    $letter->subject_coordinator_id = $input["subject_coordinator_id"];

    // This should return data directly if the method is written that way
    $letters = $letter->GetMedicalLetterForCoordinator();

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
