
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
    public $subject_coordinator_id; // Assuming this is needed for GetMedicalLetterForCoordinator
    public $instructor_id; // Assuming this is needed for GetMedicalLetterForInstructors


    public function __construct($db)
    {
        $this->conn = $db;
    }

    //done
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
    //done
    public function getCheckedByApproval()
    {
        $query = "SELECT * FROM " . $this->table_name . " WHERE   Approved = 1";
        $stmt = $this->conn->prepare($query);
        $stmt->execute();
        return $stmt;
    }
    //done
    public function getCheckedByInstructor()
    {
        $query = "SELECT * FROM " . $this->table_name . " WHERE   Checked = 1";
        $stmt = $this->conn->prepare($query);
        $stmt->execute();
        return $stmt; // Return the PDOStatement object so you can fetch data
        // If a matching row is found, return true

    }
    //done
    public function getCheckedByCoordinator()
    {
        $query = "SELECT * FROM " . $this->table_name . " WHERE checked_by_coordinator = 1";
        $stmt = $this->conn->prepare($query);
        $stmt->execute();
        return $stmt; // Return the PDOStatement object so you can fetch data
    }
    //done
    public function getMedicalLetterDetails()
    {
        $query = "SELECT * FROM " . $this->table_name;
        $stmt = $this->conn->prepare($query);
        $stmt->execute();
        return $stmt;
    }
    //done
    public function getMedicalLetterDetailsById()
    {
        $query = "SELECT * FROM " . $this->table_name . " WHERE Student_Id = :Student_Id";
        $stmt = $this->conn->prepare($query);
        $stmt->bindValue(":Student_Id", $this->student_id);
        $stmt->execute();
        return $stmt;
    }


    //done
    public function getMedicalLetterDetailsByLetterId()
    {
        $query = "SELECT * FROM " . $this->table_name . " WHERE Letter_Id = :Letter_Id";
        $stmt = $this->conn->prepare($query);
        $stmt->bindValue(":Letter_Id", $this->letter_id);
        $stmt->execute();
        return $stmt;
    }

    //done
    public function ApproveLetter()
    {
        try {
            if ($this->approved == 1) {
                $query = "UPDATE " . $this->table_name . " SET Approved = 1 WHERE Letter_Id = :Letter_Id";
                $stmt = $this->conn->prepare($query);
                $stmt->bindParam(":Letter_Id", $this->letter_id);

                return $stmt->execute();
            } else {
                $query = "UPDATE " . $this->table_name . " SET Approved = 0 WHERE Letter_Id = :Letter_Id";
                $stmt = $this->conn->prepare($query);
                $stmt->bindParam(":Letter_Id", $this->letter_id);
                return $stmt->execute();
            }
        } catch (PDOException $e) {
            error_log("Update failed: " . $e->getMessage());
            return false;
        }
    }

    //done
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
    //done
  public function CheckByCoordinator()
{
    $query = "UPDATE " . $this->table_name . " SET checked_by_coordinator = 1 WHERE Letter_Id = :Letter_Id";
    $stmt = $this->conn->prepare($query);
    $stmt->bindValue(":Letter_Id", $this->letter_id);

    try {
        $success = $stmt->execute();
        if ($success && $stmt->rowCount() > 0) {
            return true;  // At least one row updated
        } else {
            return false; // No rows updated
        }
    } catch (PDOException $e) {
        error_log("Update failed: " . $e->getMessage());
        return false;
    }
}


    public function GetMedicalLetterForCoordinator()
    {
        $query = "SELECT ml.* 
              FROM {$this->table_name} ml 
              JOIN practical_details pd ON ml.Practical_Id = pd.Practical_Id 
              JOIN subject_details s ON pd.Subject_Id = s.Subject_Id 
              WHERE s.Subject_Coodinator_Id = :subject_coordinator_id
              LIMIT 0, 25;";

        $stmt = $this->conn->prepare($query);

        // Bind the actual coordinator ID (assumes it's stored in $this->subject_coordinator_id)
        $stmt->bindValue(":subject_coordinator_id", $this->subject_coordinator_id, PDO::PARAM_INT);

        try {
            $stmt->execute();
            return $stmt->fetchAll(PDO::FETCH_ASSOC); // return results as associative array
        } catch (PDOException $e) {
            error_log("Query failed: " . $e->getMessage());
            return false;
        }
    }


    public function GetMedicalLetterForInstructors(){
     $query = "
    SELECT 
       *
    FROM 
        {$this->table_name} ml
    JOIN 
        practical_details pd ON pd.Practical_Id = ml.Practical_Id
    JOIN 
        subject_details s ON s.Subject_Id = pd.Subject_Id
    JOIN 
        student_detail sd ON sd.Student_Id = ml.Student_Id
    JOIN
        instructor_details id on id.Instructor_Id=s.Instructor_Id
    WHERE 
        s.Instructor_Id = :instructor_id
        AND ml.Approved = TRUE
    LIMIT 0, 25
";

        $stmt = $this->conn->prepare($query);

        // Bind the actual coordinator ID (assumes it's stored in $this->subject_coordinator_id)
        $stmt->bindValue(":instructor_id", $this-> instructor_id, PDO::PARAM_INT);

        try {
            $stmt->execute();
            return $stmt->fetchAll(PDO::FETCH_ASSOC); // return results as associative array
        } catch (PDOException $e) {
            error_log("Query failed: " . $e->getMessage());
            return false;
        }

    }

public function GetMedicalLetterForInstructorsButChecked(){
     $query = "
    SELECT 
       *
    FROM 
        {$this->table_name} ml
    JOIN 
        practical_details pd ON pd.Practical_Id = ml.Practical_Id
    JOIN 
        subject_details s ON s.Subject_Id = pd.Subject_Id
    JOIN 
        student_detail sd ON sd.Student_Id = ml.Student_Id
    JOIN
        instructor_details id on id.Instructor_Id=s.Instructor_Id
    WHERE 
        s.Instructor_Id = :instructor_id
        AND ml.Approved = TRUE
        AND (ml.Checked=false or ml.Checked is null)
    LIMIT 0, 25
";

        $stmt = $this->conn->prepare($query);

        $stmt->bindValue(":instructor_id", $this-> instructor_id, PDO::PARAM_INT);

        try {
            $stmt->execute();
            return $stmt->fetchAll(PDO::FETCH_ASSOC); // return results as associative array
        } catch (PDOException $e) {
            error_log("Query failed: " . $e->getMessage());
            return false;
        }

    }

    public function GetMedicalLetterSummary(){
     $query = "
    SELECT 
       *
    FROM 
        {$this->table_name} ml
    left JOIN 
        practical_details pd ON pd.Practical_Id = ml.Practical_Id
    left JOIN 
        subject_details s ON s.Subject_Id = pd.Subject_Id
    left JOIN 
        student_detail sd ON sd.Student_Id = ml.Student_Id
    left JOIN
        instructor_details id on id.Instructor_Id=s.Instructor_Id
    left JOIN
        subject_codinator_details scd ON scd.Coodinator_Id = s.Subject_Coodinator_Id
    left Join
        reschedule_labs rl ON rl.practical_ID = pd.Practical_Id
    WHERE 
        scd.Coodinator_Id = :coordinator_id
       
    LIMIT 0, 25
";

        $stmt = $this->conn->prepare($query);

        // Bind the actual coordinator ID (assumes it's stored in $this->subject_coordinator_id)
        $stmt->bindValue(":coordinator_id", $this->subject_coordinator_id, PDO::PARAM_INT);

        try {
            $stmt->execute();
            return $stmt->fetchAll(PDO::FETCH_ASSOC); // return results as associative array
        } catch (PDOException $e) {
            error_log("Query failed: " . $e->getMessage());
            return false;
        }

    }

    public function GetMedicalLetterStatusForStudent(){
     $query = "
    SELECT 
       *
    FROM 
        {$this->table_name} ml
    left JOIN 
        practical_details pd ON pd.Practical_Id = ml.Practical_Id
    left JOIN 
        subject_details s ON s.Subject_Id = pd.Subject_Id
    left JOIN 
        student_detail sd ON sd.Student_Id = ml.Student_Id
    left JOIN
        instructor_details id on id.Instructor_Id=s.Instructor_Id
    left JOIN
        subject_codinator_details scd ON scd.Coodinator_Id = s.Subject_Coodinator_Id
    left Join
        reschedule_labs rl ON rl.practical_ID = pd.Practical_Id
    WHERE 
        ml.Student_Id = :student_id
       
    LIMIT 0, 25
";

        $stmt = $this->conn->prepare($query);

        // Bind the actual student ID (assumes it's stored in $this->student_id)
        $stmt->bindValue(":student_id", $this->student_id, PDO::PARAM_INT);

        try {
            $stmt->execute();
            return $stmt->fetchAll(PDO::FETCH_ASSOC); // return results as associative array
        } catch (PDOException $e) {
            error_log("Query failed: " . $e->getMessage());
            return false;
        }

    }


}
