<?php
require '../commons/db.php';
header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $name = trim($_POST['name'] ?? '');
    $usr_id = $_POST['usr_id'] ?? null;

    if ($name === '' || !$usr_id) {
        echo json_encode(['status' => 'error', 'message' => 'Datos incompletos.']);
        exit;
    }

    try {
        $q = "INSERT INTO task.category (usr_id, name) VALUES (:usr_id, :name)";
        $stmt = $db->prepare($q);
        $stmt->execute([
            'usr_id' => $usr_id,
            'name' => $name
        ]);
        echo json_encode(['status' => 'success', 'message' => 'Categoría registrada correctamente']);
    } catch (PDOException $e) {
        echo json_encode(['status' => 'error', 'message' => $e->getMessage()]);
    }
}
?>

