<?php
require_once 'connection.php';
require_once 'student_details.php';
$db = (new Database())->connect();
$student = new Student($db);

header("Access-Control-Allow-Origin: *");

// Allow specific methods and headers
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

// POSTMethhod   http://localhost/Lab_Rescheduling/studentindex.php
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $input = json_decode(file_get_contents("php://input"), true);
    $student->date = $input['date'];
    $stmt = $student->getStudentsDetails();
    $students = $stmt->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode($students);
}



