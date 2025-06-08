<?php
require_once 'connection.php';
require_once 'student_details.php';
header("Access-Control-Allow-Origin: *"); // Allow all origins (for development)
header("Access-Control-Allow-Methods: POST, GET, OPTIONS"); // Allow specific methods
header("Access-Control-Allow-Headers: Content-Type, Authorization");
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

    // Now verifyStudent returns details or null
    $verifiedStudent = $student->verifyStudent($student->name, $student->password);

    if ($verifiedStudent) {
        http_response_code(200);
        // You can return the student details here if needed
        echo json_encode([
            "message" => "Student verified successfully.",
            "student" => $verifiedStudent
        ]);
    } else {
        http_response_code(401);
        echo json_encode(["message" => "Invalid student credentials."]);
    }
}
