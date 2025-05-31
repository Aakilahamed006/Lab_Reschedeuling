<?php
require_once 'connection.php';
require_once 'instructor.php';
$db = (new Database())->connect();
$instructor = new Instructor($db);

// getMethhod   http://localhost/Lab_Rescheduling/instructorindex.php
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $stmt = $instructor->getInstructorsDetails();
    $instructors = $stmt->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode($instructors);
}

// postMethod  http://localhost/Lab_Rescheduling/instructorindex.php
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $input = json_decode(file_get_contents("php://input"), true);

    if (!is_array($input)) {
        http_response_code(400);
        echo json_encode(["message" => "Invalid JSON input"]);
        exit;
    }
    $instructor->name = $input['name'];
    $instructor->email = $input['email'];
    $instructor->password = $input['password'];
    if ($instructor->createInstructor()) {
        http_response_code(201);
        echo json_encode(array("message" => "account created successfully."));
    } else {
        http_response_code(503);
        echo json_encode(array("message" => "Unable to create an account."));
    }
}
