<?php
require_once 'connection.php';
require_once 'practicaldetails.php';

header("Access-Control-Allow-Origin: *"); // Allow all origins (for development)
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

// Handle preflight request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

$db = (new Database())->connect();
$labdetail = new Practical($db);

// POST Method: http://localhost/Lab_Rescheduling/FilterPracticalDetailsByDate.php
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $input = json_decode(file_get_contents("php://input"), true);

    if (!isset($input["date"])) {
        http_response_code(400);
        echo json_encode(["message" => "Missing date."]);
        exit;
    }

    $labdetail->Date = $input["date"];
    $labdetails = $labdetail->FilterPracticalDetailsByDate(); // fixed variable

    if ($labdetails === false || empty($labdetails)) {
        http_response_code(404);
        echo json_encode(["message" => "No practical details found."]);
        exit;
    }

    $letters = $labdetails->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode($letters);
}
