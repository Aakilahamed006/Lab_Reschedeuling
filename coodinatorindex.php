<?php
require_once 'connection.php';
require_once 'subject_coodinator.php';
$db = (new Database())->connect();
$coodinator = new Subject_Coodiator($db);

// getMethhod   http://localhost/Lab_Rescheduling/coodinatorindex.php
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $stmt = $coodinator->getCoodinatorsDetails();
    $coodinators = $stmt->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode($coodinators);
}

// postMethod  http://localhost/Lab_Rescheduling/coodinatorindex.php
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $input = json_decode(file_get_contents("php://input"), true);

    if (!is_array($input)) {
        http_response_code(400);
        echo json_encode(["message" => "Invalid JSON input"]);
        exit;
    }
    $coodinator->name = $input['name'];
    $coodinator->email = $input['email'];
    $coodinator->password = $input['password'];
    if ($coodinator->createSubjectCoodinator()) {
        http_response_code(201);
        echo json_encode(array("message" => "account created successfully."));
    } else {
        http_response_code(503);
        echo json_encode(array("message" => "Unable to create an account."));
    }
}
