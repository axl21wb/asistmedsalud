<?php

header("Content-Type: application/json; charset=UTF-8");

$servidor = "localhost";
$usuario = "root";
$password = "";
$base_datos = "asistmed";


if ($_SERVER["REQUEST_METHOD"] !== "POST") {

    echo json_encode([
        "encontrado" => false
    ]);

    exit;

}


$dni = $_POST["dni"] ?? "";

$dni = preg_replace("/[^0-9]/", "", $dni);


if ($dni === "") {

    echo json_encode([
        "encontrado" => false
    ]);

    exit;

}


$conexion = new mysqli(
    $servidor,
    $usuario,
    $password,
    $base_datos
);


if ($conexion->connect_error) {

    http_response_code(500);

    echo json_encode([
        "encontrado" => false,
        "error" => "Error de conexión"
    ]);

    exit;

}


$conexion->set_charset("utf8");


$sql = "
    SELECT
        a.nombre,
        a.apellido,
        os.nombre AS obra_social

    FROM afiliados a

    INNER JOIN obras_sociales os
        ON os.id = a.obra_social_id

    WHERE a.numero_documento = ?
      AND a.estado = 1
      AND os.estado = 1

    LIMIT 1
";


$stmt = $conexion->prepare($sql);


if (!$stmt) {

    http_response_code(500);

    echo json_encode([
        "encontrado" => false,
        "error" => "Error en la consulta"
    ]);

    $conexion->close();

    exit;

}


$stmt->bind_param("s", $dni);

$stmt->execute();


$resultado = $stmt->get_result();


if ($fila = $resultado->fetch_assoc()) {

    $nombreCompleto =
        $fila["apellido"] . " " . $fila["nombre"];

    echo json_encode([

        "encontrado" => true,

        "nombre" => $nombreCompleto,

        "obra_social" => $fila["obra_social"]

    ], JSON_UNESCAPED_UNICODE);

} else {

    echo json_encode([

        "encontrado" => false

    ], JSON_UNESCAPED_UNICODE);

}


$stmt->close();

$conexion->close();

?>