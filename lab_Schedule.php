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

    public function createSubject()
    {
        $query = "INSERT INTO " . $this->table_name . " (Subject_Name, Subject_Coodinator_Id, Instructor_Id) VALUES (:name, :coodinator_id, :instructor_id)";

        $stmt = $this->conn->prepare($query);

        //Bind
        $stmt->bindParam(":name", $this->name);
        $stmt->bindParam(":coodinator_id", $this->coodinator_id);
        $stmt->bindParam(":instructor_id", $this->instructor_id);

        return $stmt->execute();
    }
}
