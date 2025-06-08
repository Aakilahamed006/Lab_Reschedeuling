<?php
require_once 'connection.php';
require_once 'subject_coodinator.php';
header("Access-Control-Allow-Origin: *"); // Allow all origins (for development)
header("Access-Control-Allow-Methods: POST, GET, OPTIONS"); // Allow specific methods
header("Access-Control-Allow-Headers: Content-Type, Authorization");
$db = (new Database())->connect();
$coodinator = new Subject_Coodiator($db);


// postMethod  http://localhost/Lab_Rescheduling/verify_coodinator.php
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $input = json_decode(file_get_contents("php://input"), true);

    if (!is_array($input)) {
        http_response_code(400);
        echo json_encode(["message" => "Invalid JSON input"]);
        exit;
    }

    $coodinator->name = $input['name'];
    $coodinator->password = $input['password'];

    // Now verifyCoodinator returns details or null
    $verifiedCoordinator = $coodinator->verifyCoodinator($coodinator->name, $coodinator->password);

    if ($verifiedCoordinator) {
        http_response_code(200);
        // You can return the coordinator details here if needed
        echo json_encode([
            "message" => "Coordinator verified successfully.",
            "coordinator" => $verifiedCoordinator
        ]);
    } else {
        http_response_code(401);
        echo json_encode(["message" => "Invalid coordinator credentials."]);
    }
}
