<?php
require_once 'connection.php';
$db = (new Database())->connect();

class Lab
{
    private $conn;
    private $table_name = "lab_details";

    public $id;
    public $name;
    public $location;



    public function __construct($db)
    {
        $this->conn = $db;
    }

    public function getLabDetails()
    {
        $query = "SELECT * FROM " . $this->table_name;
        $stmt = $this->conn->prepare($query);
        $stmt->execute();
        return $stmt;
    }

    public function createLab()
    {
        $query = "INSERT INTO " . $this->table_name . " (Lab_Name, Location) VALUES (:name, :location)";

        $stmt = $this->conn->prepare($query);

        //Bind
        $stmt->bindParam(":name", $this->name);
        $stmt->bindParam(":location", $this->location);

        return $stmt->execute();
    }
}
