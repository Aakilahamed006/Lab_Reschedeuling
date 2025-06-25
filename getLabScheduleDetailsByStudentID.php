<?php
require_once 'connection.php';
require_once 'lab_Schedule.php';

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

$db = (new Database())->connect();
$labSchedule = new LabSchedule($db);

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $input = json_decode(file_get_contents("php://input"), true);

    if (!isset($input["StudentId"])) {
        http_response_code(400);
        echo json_encode(["message" => "StudentId is required."]);
        exit;
    }

    $labSchedule->StudentId = $input["StudentId"];
    $stmt = $labSchedule->getLabScheduleDetailsByStudentID();

    if ($stmt === false) {
        http_response_code(500);
        echo json_encode(["message" => "Query execution failed."]);
        exit;
    }

    $labSchedules = $stmt->fetchAll(PDO::FETCH_ASSOC);

    if (empty($labSchedules)) {
        http_response_code(404);
        echo json_encode(["message" => "No lab schedules found."]);
        exit;
    }

    echo json_encode($labSchedules);
}
