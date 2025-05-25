<?php
require_once 'connection.php';
require_once 'subject_coodinator.php';

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
    if ($coodinator->verifyCoodinator($coodinator->name, $coodinator->password)) {
        http_response_code(200);
        echo json_encode(array("message" => "Student verified successfully."));
    } else {
        http_response_code(401);
        echo json_encode(array("message" => "Invalid student  credentials."));
    }
}
