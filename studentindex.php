<?php
require_once 'connection.php';
require_once 'student_details.php';
$db = (new Database())->connect();
$student = new Student($db);

header("Access-Control-Allow-Origin: *");

// Allow specific methods and headers
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

// getMethhod   http://localhost/Lab_Rescheduling/studentindex.php
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $stmt = $student->getStudentsDetails();
    $students = $stmt->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode($students);
}
// postMethod  http://localhost/Lab_Rescheduling/studentindex.php
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $input = json_decode(file_get_contents("php://input"), true);

    if (!is_array($input)) {
        http_response_code(400);
        echo json_encode(["message" => "Invalid JSON input"]);
        exit;
    }
    $student->name = $input['name'];
    $student->email = $input['email'];
    $student->password = $input['password'];
    if ($student->createStudent()) {
        http_response_code(201);
        echo json_encode(array("message" => "Student created successfully."));
    } else {
        http_response_code(503);
        echo json_encode(array("message" => "Unable to create student."));
    }
}
