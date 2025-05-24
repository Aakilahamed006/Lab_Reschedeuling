<?php
require_once 'connection.php';
$db = (new Database())->connect();

class Student
{
    private $conn;
    private $table_name = "student_detail";

    public $id;
    public $name;
    public $email;
    public $password;


    public function __construct($db)
    {
        $this->conn = $db;
    }

    public function getStudentsDetails()
    {
        $query = "SELECT * FROM " . $this->table_name;
        $stmt = $this->conn->prepare($query);
        $stmt->execute();
        return $stmt;
    }

    public function createStudent()
    {
        $query = "INSERT INTO " . $this->table_name . " (Student_Name, Student_Email, password) VALUES (:name, :email, :password)";

        $stmt = $this->conn->prepare($query);

        //Bind
        $stmt->bindParam(":name", $this->name);
        $stmt->bindParam(":email", $this->email);
        $stmt->bindParam(":password", $this->name);

        return $stmt->execute();
    }
}
