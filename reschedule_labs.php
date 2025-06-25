<?php
require_once 'connection.php';
$db = (new Database())->connect();

class LabReschedule
{
    private $conn;
    private $table_name = "reschedule_labs";

    public $StudentId;
    public $StudentName;
    public $StudentEmail;
    public $PracticalId;
    public $RescheduleDate;
    


    public function __construct($db)
    {
        $this->conn = $db;
    }


   public function rescheduleLab()
{
    // Validate date format first
    $date = DateTime::createFromFormat('Y-m-d', $this->RescheduleDate);
    if (!$date || $date->format('Y-m-d') !== $this->RescheduleDate) {
        error_log("Invalid date format: " . $this->RescheduleDate);
        return false;
    }

    $query = "INSERT INTO " . $this->table_name . " (Practical_ID, Student_ID, RescheduleDate) 
              VALUES (:PracticalId, :StudentId, :RescheduleDate)";

    $stmt = $this->conn->prepare($query);

    $stmt->bindValue(":StudentId", $this->StudentId);
    $stmt->bindValue(":PracticalId", $this->PracticalId);
    $stmt->bindValue(":RescheduleDate", $this->RescheduleDate);

    try {
        return $stmt->execute();
    } catch (PDOException $e) {
        error_log("Insert failed: " . $e->getMessage());
        return false;
    }
}

}
