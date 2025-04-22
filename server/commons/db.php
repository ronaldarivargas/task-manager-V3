<?php

$host = 'localhost';
$port = '5432';
$user = 'postgres';
$pass = '1234';
$db_name = 'task_tool';

try {
    $db = new PDO(
        "pgsql:host=$host;port=$port;dbname=$db_name",
        $user,
        $pass
    );
    $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    echo 'Error en la conexióne ' . $e->getMessage();
    exit();
}

/*require '../commons/db.php';
echo "¡Conexión exitosa!";
exit;*/


?>