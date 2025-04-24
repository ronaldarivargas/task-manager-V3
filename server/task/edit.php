<?php
require_once("../commons/db.php");

$data = json_decode(file_get_contents("php://input"));

if (!isset($data->id)) {
    echo json_encode(['status' => 'error', 'message' => 'Falta el ID de la tarea']);
    exit;
}

try {
    $stmt = $db->prepare("UPDATE task.task SET title = :title, description = :description, completed = :completed WHERE id = :id");
    $stmt->execute([
        'title' => $data->title,
        'description' => $data->description,
        'completed' => $data->completed ? true : false,
        'id' => $data->id
    ]);
    echo json_encode(['status' => 'success', 'message' => 'Tarea actualizada']);
} catch (PDOException $e) {
    echo json_encode(['status' => 'error', 'message' => $e->getMessage()]);
}
?>
