<?php
require_once 'connection.php';
require_once 'medical_letter.php';
$db = (new Database())->connect();
$letter = new Medical_Letter($db);

// postMethod  http://localhost/Lab_Rescheduling/getcheckedbyinstructor.php
if ($_SERVER['REQUEST_METHOD'] === 'GET') {

    $stmt = $letter->getCheckedByInstructor();
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
