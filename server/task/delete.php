<?php
require_once("../commons/db.php");

$data = json_decode(file_get_contents("php://input"));

if (!isset($data->id)) {
    echo json_encode(['status' => 'error', 'message' => 'ID de tarea no proporcionado']);
    exit;
}

try {
    $stmt = $db->prepare("DELETE FROM task.task WHERE id = :id");
    $stmt->execute(['id' => $data->id]);
    echo json_encode(['status' => 'success', 'message' => 'Tarea eliminada']);
} catch (PDOException $e) {
    echo json_encode(['status' => 'error', 'message' => $e->getMessage()]);
}
?>
