<?php
    header("Cache-Control: no-store, no-cache, must-revalidate, max-age=0");
    header("Cache-Control: post-check=0, pre-check=0", false);
    header("Pragma: no-cache");
    
    require('database.php');	
    function getConnection() {
        $db = new database;
        $dbhost = $db->host;
        $dbport = $db->port;
        $dbuser = $db->username;
        $dbpass = $db->password; 
        $dbname = $db->db_name;
        $dbh = new PDO("mysql:host=$dbhost;port=$dbport;dbname=$dbname", $dbuser, $dbpass);
        $dbh->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        return $dbh;
    }

    switch($_SERVER['REQUEST_METHOD']){
        case 'POST':
            update();
            break;
        case 'GET':
            read();
            break;
        case 'PUT':
            //update();
            break;
        case 'DELETE':
            //delete();
            break;
    }
    
    function read() {
        $sql = "SELECT * FROM `gametable` WHERE (`id` = :id)";
        $data = json_decode(file_get_contents('php://input'));
        $params = null;
        if ($data != null) {
            $params = array(
                "id" => $data->{'id'},
            );
        } else {
            $params = array(
                "id" => $_GET['id'],
            );
        }
        
        try {
            $pdo = getConnection();
            $stmt = $pdo->prepare($sql);
            $stmt->execute($params);
            $result = $stmt->fetchAll(PDO::FETCH_OBJ);
            $pdo = null;
            echo json_encode($result);
        } catch(PDOException $e) {
            echo '{"error":{"text":'. $e->getMessage() .'}}';
        }
    }
    
    function update() {
        $data = json_decode(file_get_contents('php://input'));
        $params = null;
        if ($data != null) {
            $params = array(
                "id" => $data->{'id'},
                "character" => $data->{'character'},
                "location" => $data->{'location'},
            );
        } else {
            $params = array(
                "id" => $_POST['id'],
                "character" => $_POST['character'],
                "location" => $_POST['location'],
            );
        }
        
        $sql = "SELECT * FROM `gametable` WHERE (`id` = ".$params["id"].")";
        try {
            $pdo = getConnection();
            $stmt = $pdo->prepare($sql);
            $stmt->execute();
            $result = $stmt->fetch();
            if ($result["cc"] == 0) {
                if ($result["r".$params["character"].""] == $params["location"]) {
                    echo 2;
                } else {
                    $sql = "UPDATE `gametable` SET `cc` = ".$params["character"].", `r".$params["character"]."` = '".$params["location"]."' WHERE (`id` = ".$params["id"].")";
                    $pdo = getConnection();
                    $stmt = $pdo->prepare($sql);
                    $stmt->execute();
                    $count = $stmt->rowCount();
                    echo 1;
                }
            } else if($result["cc"] == $params["character"]) {
                echo 1;
            }
        } catch(PDOException $e) {
            echo '{"error":{"text":'. $e->getMessage() .'}}';
        }
    }
?>