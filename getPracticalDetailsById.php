<?php
require_once 'connection.php';
require_once 'practicaldetails.php';

header("Access-Control-Allow-Origin: *");

// Allow specific methods and headers
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

$db = (new Database())->connect();
$practicaldetails = new Practical ($db);

// PostMethod  http://localhost/Lab_Rescheduling/getPracticalDetailsById.php
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $input = json_decode(file_get_contents("php://input"), true);

    $practicaldetails->Practical_Id= $input["Practical_Id"];
    $stmt= $practicaldetails->getPracticalDetailsById();
    $practicaldetail= $stmt->fetchAll(PDO::FETCH_ASSOC);

     if (empty($input["Practical_Id"])) {
        http_response_code(400);
        echo json_encode(["message" => "Missing or empty Practical_Id."]);
        exit;
    }

  
    if (empty($practicaldetail)) {
        http_response_code(404);
        echo json_encode(array("message" => "No letters found."));
        exit;
    }
    http_response_code(200);
    echo json_encode($practicaldetail);
}
