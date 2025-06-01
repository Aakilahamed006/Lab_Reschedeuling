<?php
require_once 'connection.php';
require_once 'practicaldetails.php';
$db = (new Database())->connect();
$practical = new Practical($db);

// getMethhod   http://localhost/Lab_Rescheduling/practicalindex.php
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $stmt = $practical->getPracticalDetails();
    $practicals = $stmt->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode($practicals);
}

// postMethod  http://localhost/Lab_Rescheduling/practicalindex.php
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $input = json_decode(file_get_contents("php://input"), true);

    if (!is_array($input)) {
        http_response_code(400);
        echo json_encode(["message" => "Invalid JSON input"]);
        exit;
    }
    $practical->Practical_Name = $input['name'];
    $practical->Lab_Id = $input['lab_id'];
    $practical->Subject_Id = $input['subject_id'];
    if ($practical->createPractical()) {
        http_response_code(201);
        echo json_encode(array("message" => "Practical added successfully."));
    } else {
        http_response_code(503);
        echo json_encode(array("message" => "Unable to add the practical."));
    }
}
