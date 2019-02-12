<?php

$arrayJson = $_POST['array_Json'];
$idUsuario = $_POST['id_usuario'];


$servername = "localhost";
$username = "root";
$password = "";
$dbname = "db_json1";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);
// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$sql = "UPDATE avance SET avance_json='".$arrayJson."' WHERE id_usuario='".$idUsuario."'";

if ($conn->query($sql) === TRUE) {
    echo "Record updated successfully";
} else {
    echo "Error updating record: " . $conn->error;
}

$conn->close();
?> 