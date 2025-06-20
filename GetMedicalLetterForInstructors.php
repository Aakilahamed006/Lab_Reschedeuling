<?php
require_once 'connection.php';
require_once 'medical_letter.php';
header("Access-Control-Allow-Origin: *"); // Allow all origins (for development)
header("Access-Control-Allow-Methods: POST, GET, OPTIONS"); // Allow specific methods
header("Access-Control-Allow-Headers: Content-Type, Authorization");
$db = (new Database())->connect();
$letter = new Medical_Letter($db);


// postMethod  http://localhost/Lab_Rescheduling/GetMedicalLetterForInstructors.php
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $input = json_decode(file_get_contents("php://input"), true);

    if (!is_array($input)) {
        http_response_code(400);
        echo json_encode(["message" => "Invalid JSON input"]);
        exit;
    }

    $letter->instructor_id= $input['instructor_id'];

   $letters = $letter->GetMedicalLetterForInstructors();

       if ($letters === false || empty($letters)) {
        http_response_code(404);
        echo json_encode(["message" => "No letters found."]);
        exit;
    }

    foreach ($letters as &$row) {
        if (isset($row['Letter_Image'])) {
            $row['Letter_Image'] = base64_encode($row['Letter_Image']);
        }
    }

    echo json_encode($letters);
}
