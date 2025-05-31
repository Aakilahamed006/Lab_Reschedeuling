
    <?php
    require_once 'connection.php';
    require_once 'medical_letter.php';
    $db = (new Database())->connect();
    $letter = new Medical_Letter($db);

    // getMethhod   http://localhost/Lab_Rescheduling/medical_letterindex.php

    if ($_SERVER['REQUEST_METHOD'] === 'GET') {
        $stmt = $letter->getMedicalLetterDetails();
        $letters = $stmt->fetchAll(PDO::FETCH_ASSOC);
        echo json_encode($letters);
    }



    // postMethod  http://localhost/Lab_Rescheduling/medical_letterindex.php

    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        $input = json_decode(file_get_contents("php://input"), true);

        if (!empty($input['letter_image'])) {
            $base64Image = $input['letter_image'];

            // Decode base64 string
            $imageData = base64_decode($base64Image);
        }


        $letter->student_id = $input['student_id'];
        $letter->letter_id = $input['letter_id'];
        $letter->letter_image = $imageData;
        $letter->practical_id = $input['practical_id'];
        $letter->approved = $input['approved'];
        $letter->checked = $input['checked'];
        $letter->checked_by_coordinator = $input['checked_by_coordinator'];

        if ($letter->createMedicalLetter()) {
            http_response_code(201);
            echo json_encode(array("message" => "Medical letter created successfully."));
        } else {
            http_response_code(503);
            echo json_encode(array("message" => "Unable to create medical letter."));
        }
    }
