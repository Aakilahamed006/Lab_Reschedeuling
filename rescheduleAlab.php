<?php
require_once 'connection.php';
require_once 'reschedule_labs.php';

// Allow CORS (especially important for React frontend)
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

$db = (new Database())->connect();
$reschedule = new LabReschedule($db);

// POST method expected
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $input = json_decode(file_get_contents("php://input"), true);

    if (!is_array($input)) {
        http_response_code(400);
        echo json_encode(["message" => "Invalid JSON input"]);
        exit;
    }

    // Validate required fields
    if (!isset($input['StudentId'], $input['PracticalId'], $input['RescheduleDate'])) {
        http_response_code(400);
        echo json_encode(["message" => "Missing required fields"]);
        exit;
    }

    $reschedule->StudentId = $input['StudentId'];
    $reschedule->PracticalId = $input['PracticalId'];
    $reschedule->RescheduleDate = $input['RescheduleDate'];

    if ($reschedule->rescheduleLab()) {
        http_response_code(201);
        echo json_encode(["message" => "Lab rescheduled successfully."]);
    } else {
        http_response_code(503);
        echo json_encode(["message" => "Unable to reschedule the lab."]);
    }
} else {
    http_response_code(405);
    echo json_encode(["message" => "Method not allowed."]);
}
