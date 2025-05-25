<?php
require_once 'connection.php';
require_once 'instructor.php';

$db = (new Database())->connect();
$instructor = new Instructor($db);


// postMethod  http://localhost/Lab_Rescheduling/verify_instructor.php
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $input = json_decode(file_get_contents("php://input"), true);

    if (!is_array($input)) {
        http_response_code(400);
        echo json_encode(["message" => "Invalid JSON input"]);
        exit;
    }
    $instructor->name = $input['name'];
    $instructor->password = $input['password'];
    if ($instructor->verifyInstructor($instructor->name, $instructor->password)) {
        http_response_code(200);
        echo json_encode(array("message" => "Student verified successfully."));
    } else {
        http_response_code(401);
        echo json_encode(array("message" => "Invalid student  credentials."));
    }
}
