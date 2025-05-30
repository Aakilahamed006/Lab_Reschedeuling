<?php
require_once 'connection.php';
require_once 'medical_letter.php';
$db = (new Database())->connect();
$letter = new Medical_Letter($db);

// PostMethod  http://localhost/Lab_Rescheduling/getmedicallettersbyid.php
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $input = json_decode(file_get_contents("php://input"), true);

    $letter->letter_id = $input["letter_id"];
    $stmt = $letter->getMedicalLetterDetailsByLetterId();
    $letters = $stmt->fetchAll(PDO::FETCH_ASSOC);
    if (empty($letters)) {
        http_response_code(404);
        echo json_encode(array("message" => "No letters found."));
        exit;
    }

    foreach ($letters as &$row) {
        if (isset($row['Letter_Image'])) {
            $row['Letter_Image'] = base64_encode($row['Letter_Image']);
        }
    }

    echo json_encode($letters);
}
