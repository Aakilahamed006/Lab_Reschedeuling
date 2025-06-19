<?php
require_once 'connection.php';
$db = (new Database())->connect();

class Practical
{
    private $conn;
    private $table_name = "practical_details";

    public $Practical_Id;
    public $Practical_Name;
    public $Lab_Id;
    public $Subject_Id;

    public function __construct($db)
    {
        $this->conn = $db;
    }

    public function getPracticalDetails()
    {
        $query = "SELECT * FROM " . $this->table_name;
        $stmt = $this->conn->prepare($query);
        $stmt->execute();
        return $stmt;
    }

    public function createPractical()
    {
        $query = "INSERT INTO " . $this->table_name . " (Practical_Name, Lab_Id) VALUES (:name, :lab_id, :subject_id)";

        $stmt = $this->conn->prepare($query);

        //Bind
        $stmt->bindParam(":name", $this->Practical_Name);
        $stmt->bindParam(":lab_id", $this->Lab_Id);
        $stmt->bindParam(":subject_id", $this->Subject_Id);

        return $stmt->execute();
    }

    public function getPracticalDetailsById()
    {
        $query = "SELECT * FROM " . $this->table_name. " WHERE Practical_Id = :Practical_Id";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(":Practical_Id", $this->Practical_Id);
        $stmt->execute();
        return $stmt;
    }
}
