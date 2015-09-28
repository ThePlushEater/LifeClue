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
        $sql = "SELECT * FROM `gametable` WHERE (`id` = :id AND :newcharacter = 1)";
        $data = json_decode(file_get_contents('php://input'));
        $params = null;
        if ($data != null) {
            $params = array(
                "id" => $data->{'id'},
                "newcharacter" => $data->{'newcharacter'},
            );
        } else {
            $params = array(
                "id" => $_POST['id'],
                "newcharacter" => $_POST['newcharacter'],
            );
        }
        try {
            $pdo = getConnection();
            $stmt = $pdo->prepare($sql);
            $stmt->execute($params);
            //$result = $stmt->fetchAll(PDO::FETCH_OBJ);
            $count = $stmt->rowCount();
            if ($count == 0) {
              if ($data != null) {
                  $params = array(
                      "id" => $data->{'id'},
                      "prevcharacter" => $data->{'prevcharacter'},
                      "newcharacter" => $data->{'newcharacter'},
                  );
              } else {
                  $params = array(
                      "id" => $_POST['id'],
                      "prevcharacter" => $_POST['prevcharacter'],
                      "newcharacter" => $_POST['newcharacter'],
                  );
              }
              $sql = "UPDATE `gametable` SET `".$params["prevcharacter"]."` = 0, `".$params["newcharacter"]."` = 1 WHERE (`id` = ".$params["id"].")";
              $stmt = $pdo->prepare($sql);
              $stmt->execute($params);
              //$result = $stmt->fetchAll(PDO::FETCH_OBJ);
              $count = $stmt->rowCount();
              echo $count;
            } else {
              echo $count;
            }
        } catch(PDOException $e) {
            echo '{"error":{"text":'. $e->getMessage() .'}}';
        }
    }
?>