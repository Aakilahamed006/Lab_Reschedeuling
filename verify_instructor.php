<?php
require_once 'connection.php';
require_once 'instructor.php';

header("Access-Control-Allow-Origin: *");

// Allow specific methods and headers
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

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

    // Now verifyInstructor returns details or null
    $verifiedInstructor = $instructor->verifyInstructor($instructor->name, $instructor->password);

    if ($verifiedInstructor) {
        http_response_code(200);
        // You can return the instructor details here if needed
        echo json_encode([
            "message" => "Instructor verified successfully.",
            "instructor" => $verifiedInstructor
        ]);
    } else {
        http_response_code(401);
        echo json_encode(["message" => "Invalid instructor credentials."]);
    }
}
