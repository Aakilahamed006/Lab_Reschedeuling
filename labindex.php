<?php
require_once 'connection.php';
require_once 'labdetails.php';
$db = (new Database())->connect();
$lab = new Lab($db);

// getMethhod   http://localhost/Lab_Rescheduling/labindex.php
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $stmt = $lab->getLabDetails();
    $labs = $stmt->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode($labs);
}

// postMethod  http://localhost/Lab_Rescheduling/labindex.php
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $input = json_decode(file_get_contents("php://input"), true);

    if (!is_array($input)) {
        http_response_code(400);
        echo json_encode(["message" => "Invalid JSON input"]);
        exit;
    }

    $lab->name = $input['name'];
    $lab->location = $input['location'];
    if ($lab->createLab()) {
        http_response_code(201);
        echo json_encode(array("message" => "Lab added successfully."));
    } else {
        http_response_code(503);
        echo json_encode(array("message" => "Unable to add the lab."));
    }
}
