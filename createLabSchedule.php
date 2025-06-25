<?php
require_once 'connection.php';
require_once 'lab_Schedule.php';

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
// http://localhost/Lab_Rescheduling/createLabSchedule.php
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

$db = (new Database())->connect();
$lab_schedule = new LabSchedule($db);

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $input = json_decode(file_get_contents("php://input"), true);

    if (empty($input["PracticalId"])) {
        http_response_code(400);
        echo json_encode(["message" => "Missing or empty PracticalId."]);
        exit;
    }

    if (empty($input["StudentIds"])) {
        http_response_code(400);
        echo json_encode(["message" => "Missing StudentIds."]);
        exit;
    }

    if (!is_array($input["StudentIds"])) {
        // Try to convert from string like "{2 3 4}"
        $input["StudentIds"] = array_map(
            'intval',
            preg_split('/[\s{},]+/', $input["StudentIds"], -1, PREG_SPLIT_NO_EMPTY)
        );
    }

    if (empty($input["Date"])) {
        http_response_code(400);
        echo json_encode(["message" => "Missing or empty Date."]);
        exit;
    }

    $lab_schedule->PracticalId = $input["PracticalId"];
    $lab_schedule->StudentIds = $input["StudentIds"];
    $lab_schedule->Date = $input["Date"];

    try {
        $success = $lab_schedule->createLabSchedule();
        if ($success) {
            http_response_code(201);
            echo json_encode(["message" => "Lab schedule created successfully."]);
        } else {
            http_response_code(500);
            echo json_encode(["message" => "Failed to create lab schedule."]);
        }
    } catch (Exception $e) {
        http_response_code(500);
        echo json_encode(["message" => "Server error: " . $e->getMessage()]);
    }
}


