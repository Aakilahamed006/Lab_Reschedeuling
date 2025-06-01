<?php
require_once 'connection.php';
require_once 'subject.php';
$db = (new Database())->connect();
$subject = new Subject($db);

// getMethhod   http://localhost/Lab_Rescheduling/subjectindex.php
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $stmt = $subject->getSubjectDetails();
    $subjects = $stmt->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode($subjects);
}

// postMethod  http://localhost/Lab_Rescheduling/subjectindex.php
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $input = json_decode(file_get_contents("php://input"), true);

    if (!is_array($input)) {
        http_response_code(400);
        echo json_encode(["message" => "Invalid JSON input"]);
        exit;
    }
    $subject->name = $input['name'];
    $subject->coodinator_id = $input['coodinator_id'];
    $subject->instructor_id = $input['instructor_id'];
    if ($subject->createSubject()) {
        http_response_code(201);
        echo json_encode(array("message" => "subject added successfully."));
    } else {
        http_response_code(503);
        echo json_encode(array("message" => "Unable to add the subject account."));
    }
}
