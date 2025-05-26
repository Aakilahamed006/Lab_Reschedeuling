<?php
require_once 'connection.php';
$db = (new Database())->connect();

class Medical_Letter
{
    private $conn;
    private $table_name = "medical_letter";

    public $student_id;
    public $letter_id;
    public $letter_image;
    public $practical_id;
    public $approved;
    public $checked;
    public $checked_by_coordinator;


    public function __construct($db)
    {
        $this->conn = $db;
    }


    public function createMedicalLetter()
    {
        $query = "INSERT INTO " . $this->table_name . " 
             (Student_Id, Letter_Id, Letter_Image, Practical_Id, Approved, Checked, checked_by_coordinator) 
             VALUES (:Student_Id, :Letter_Id, :Letter_Image, :Practical_Id, :Approved, :Checked, :checked_by_coordinator)";

        $stmt = $this->conn->prepare($query);

        // Bind parameters using bindValue
        $stmt->bindValue(":Student_Id", $this->student_id);
        $stmt->bindValue(":Letter_Id", $this->letter_id);
        $stmt->bindValue(":Letter_Image", $this->letter_image);
        $stmt->bindValue(":Practical_Id", $this->practical_id);
        $stmt->bindValue(":Approved", $this->approved);
        $stmt->bindValue(":Checked", $this->checked);
        $stmt->bindValue(":checked_by_coordinator", $this->checked_by_coordinator);

        try {
            return $stmt->execute();
        } catch (PDOException $e) {
            error_log("Insert failed: " . $e->getMessage());
            return false;
        }
    }

    public function checkedByApproval()
    {
        $query = "SELECT * FROM " . $this->table_name . " WHERE   Approved = 1";
        $stmt = $this->conn->prepare($query);
        $stmt->execute();

        // If a matching row is found, return true
        if ($stmt->rowCount() > 0) {
            return true;
        }

        return false;
    }

    public function checkedByInstructor()
    {
        $query = "SELECT * FROM " . $this->table_name . " WHERE   Checked = 1";
        $stmt = $this->conn->prepare($query);
        $stmt->execute();

        // If a matching row is found, return true
        if ($stmt->rowCount() > 0) {
            return true;
        }

        return false;
    }

    public function checkedByCoodinator()
    {
        $query = "SELECT * FROM " . $this->table_name . " WHERE checked_by_coordinator = 1";
        $stmt = $this->conn->prepare($query);
        $stmt->execute();

        // If a matching row is found, return true
        if ($stmt->rowCount() > 0) {
            return true;
        }

        return false;
    }

    public function getMedicalLetterDetails()
    {
        $query = "SELECT * FROM " . $this->table_name;
        $stmt = $this->conn->prepare($query);
        $stmt->execute();
        return $stmt;
    }
    public function getMedicalLetterDetailsById()
    {
        $query = "SELECT * FROM " . $this->table_name . " WHERE Student_Id = :Student_Id";
        $stmt = $this->conn->prepare($query);
        $stmt->bindValue(":student_id", $this->student_id);
        $stmt->execute();
        return $stmt;
    }

    public function getMedicalLetterDetailsByLetterId()
    {
        $query = "SELECT * FROM " . $this->table_name . " WHERE Letter_Id = :Letter_Id";
        $stmt = $this->conn->prepare($query);
        $stmt->bindValue(":letter_id", $this->letter_id);
        $stmt->execute();
        return $stmt;
    }

    public function ApproveLetter()
    {
        try {
            if ($this->approved == 1) {
                $query = "UPDATE " . $this->table_name . " SET Approved = 1 WHERE Letter_Id = :Letter_Id";
                $stmt = $this->conn->prepare($query);
                $stmt->bindParam(":Letter_Id", $this->letter_id);

                return $stmt->execute();
            } else {
                // If not approved, skip update or handle accordingly
                return false;
            }
        } catch (PDOException $e) {
            error_log("Update failed: " . $e->getMessage());
            return false;
        }
    }


    public function CheckLetter()
    {
        $query = "UPDATE " . $this->table_name . " SET Checked = 1 WHERE Letter_Id = :Letter_Id";
        $stmt = $this->conn->prepare($query);
        $stmt->bindValue(":Letter_Id", $this->letter_id);

        try {
            return $stmt->execute();
        } catch (PDOException $e) {
            error_log("Update failed: " . $e->getMessage());
            return false;
        }
    }

    public function CheckByCoordinator()
    {
        $query = "UPDATE " . $this->table_name . " SET checked_by_coordinator = 1 WHERE Letter_Id = :Letter_Id";
        $stmt = $this->conn->prepare($query);
        $stmt->bindValue(":Letter_Id", $this->letter_id);

        try {
            return $stmt->execute();
        } catch (PDOException $e) {
            error_log("Update failed: " . $e->getMessage());
            return false;
        }
    }
}
