<?php
require_once 'connection.php';
$db = (new Database())->connect();

class LabSchedule
{
    private $conn;
    private $table_name = "lab_schedule";

    public $PracticalId;
    public $StudentId;
    public $StudentName;
    public $Date;
    public $LabName;
    public $Lablocation;
    public $StudentIds = []; // Array to hold multiple student IDs

    public function __construct($db)
    {
        $this->conn = $db;
    }

    public function getLabScheduleDetailsByStudentID()
    {
          $query = "
    SELECT 
       *
    FROM 
        {$this->table_name} Ls
    left JOIN 
        practical_details pd ON pd.Practical_Id = Ls.Practical_Id
    left JOIN 
        lab_details Ld ON Ld.Lab_Id = pd.Lab_Id

    WHERE 
        Ls.Student_Id = :Student_Id
       
    LIMIT 0, 25
";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(":Student_Id", $this->StudentId);
        $stmt->execute();
        return $stmt;
    }

 public function createLabSchedule()
{
    // Build the insert query
    $query = "INSERT INTO ".$this->table_name. "(Practical_Id, Student_Id, Date) VALUES (:practical_id, :student_id, :date)";
    $stmt = $this->conn->prepare($query);

    // Loop through each student ID and insert
    foreach ($this->StudentIds as $studentId) {
        $stmt->bindParam(':practical_id', $this->PracticalId);
        $stmt->bindParam(':student_id', $studentId);
        $stmt->bindParam(':date', $this->Date);
        $stmt->execute();
    }

    return true;
}


}
