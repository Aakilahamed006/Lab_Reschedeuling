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
        $stmt->bindParam(":password", $this->password);

        return $stmt->execute();
    }

    public function verifyStudent($name, $password)
    {
        $query = "SELECT * FROM " . $this->table_name . " 
              WHERE LOWER(Student_Name) = LOWER(:name) 
              AND password = :password 
              LIMIT 1";

        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':name', $name);
        $stmt->bindParam(':password', $password);
        $stmt->execute();

        // If a matching row is found, return the student details
        if ($stmt->rowCount() > 0) {
            return $stmt->fetch(PDO::FETCH_ASSOC); // returns associative array
        }

        return null; // No match found
    }
}
