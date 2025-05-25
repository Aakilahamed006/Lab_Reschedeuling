<?php
require_once 'connection.php';
require_once 'student_details.php';

$db = (new Database())->connect();
$student = new Student($db);


// postMethod  http://localhost/Lab_Rescheduling/verify_student.php
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $input = json_decode(file_get_contents("php://input"), true);

    if (!is_array($input)) {
        http_response_code(400);
        echo json_encode(["message" => "Invalid JSON input"]);
        exit;
    }
    $student->name = $input['name'];
    $student->password = $input['password'];
    if ($student->verifyStudent($student->name, $student->password)) {
        http_response_code(200);
        echo json_encode(array("message" => "Student verified successfully."));
    } else {
        http_response_code(401);
        echo json_encode(array("message" => "Invalid student  credentials."));
    }
}
