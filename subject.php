<?php
require_once 'connection.php';
$db = (new Database())->connect();

class Subject
{
    private $conn;
    private $table_name = "subject_details";

    public $id;
    public $name;
    public $coodinator_id;
    public $instructor_id;


    public function __construct($db)
    {
        $this->conn = $db;
    }

    public function getSubjectDetails()
    {
        $query = "SELECT * FROM " . $this->table_name;
        $stmt = $this->conn->prepare($query);
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
