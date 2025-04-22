<?php

echo "Contenido que viajó por GET";
echo "<br><br>";
var_dump($_GET);
echo "<br><br>";
echo "Contenido que viajó por POST";
echo "<br><br>";
var_dump($_POST);



session_start();
require '../commons/db.php';

header('Content-Type: application/json');

if (!isset($_SESSION['user_id'])) {
    echo json_encode(['error' => 'No hay sesión activa']);
    exit;
}

try {
    $stmt = $db->prepare("SELECT id, name FROM task.category WHERE usr_id = :usr_id ORDER BY name");
    $stmt->execute(['usr_id' => $_SESSION['user_id']]);
    echo json_encode($stmt->fetchAll(PDO::FETCH_ASSOC));
} catch (PDOException $e) {
    echo json_encode(['error' => $e->getMessage()]);
}
?>
