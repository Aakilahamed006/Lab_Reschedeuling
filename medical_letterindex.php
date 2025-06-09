
    <?php
    require_once 'connection.php';
    require_once 'medical_letter.php';
    $db = (new Database())->connect();
    $letter = new Medical_Letter($db);

    header("Access-Control-Allow-Origin: *");

    // Allow specific methods and headers
    header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
    header("Access-Control-Allow-Headers: Content-Type");

    // getMethhod   http://localhost/Lab_Rescheduling/medical_letterindex.php

    if ($_SERVER['REQUEST_METHOD'] === 'GET') {
        $stmt = $letter->getMedicalLetterDetails();
        $letters = $stmt->fetchAll(PDO::FETCH_ASSOC);
        echo json_encode($letters);
    }



    // postMethod  http://localhost/Lab_Rescheduling/medical_letterindex.php

    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        // 1. Get form values from $_POST
        $letter->student_id = $_POST['student_id'];
        $letter->practical_id = $_POST['practical_id'];
        $letter->letter_id = $_POST['letter_id'] ?? null;
        $letter->approved = $_POST['approved'] ?? 0;
        $letter->checked = $_POST['checked'] ?? 0;
        $letter->checked_by_coordinator = $_POST['checked_by_coordinator'] ?? 0;

        // 2. Handle uploaded image from $_FILES
        if (isset($_FILES['letter_image']) && $_FILES['letter_image']['error'] === UPLOAD_ERR_OK) {
            $tmpName = $_FILES['letter_image']['tmp_name'];
            $imageData = file_get_contents($tmpName);
            $letter->letter_image = $imageData;
        } else {
            http_response_code(400);
            echo json_encode(["message" => "Invalid or missing letter image."]);
            exit;
        }

        // 3. Save to database
        if ($letter->createMedicalLetter()) {
            http_response_code(201);
            echo json_encode(["success" => true, "message" => "Medical letter created successfully."]);
        } else {
            http_response_code(503);
            echo json_encode(["success" => false, "message" => "Unable to create medical letter."]);
        }
    }
