<?php
require_once 'connection.php';
require_once 'medical_letter.php';
$db = (new Database())->connect();
$letter = new Medical_Letter($db);

// postMethod  http://localhost/Lab_Rescheduling/approveletter.php
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $input = json_decode(file_get_contents("php://input"), true);
    if (!isset($input['letter_id'])) {
        http_response_code(400);
        echo json_encode(array("message" => "Invalid input, letter_id is required."));
        exit;
    }

    $letter->letter_id = $input['letter_id'];
    $letter->approved = $input['Approved'];
    $stmt = $letter->ApproveLetter();

    if ($stmt) {
        http_response_code(200);
        echo json_encode(array("message" => "Letter approved successfully."));
    } else {
        http_response_code(404);
        echo json_encode(array("message" => "Letter not found or already approved."));
    }
} else {
    http_response_code(405);
    echo json_encode(array("message" => "Method not allowed."));
}
