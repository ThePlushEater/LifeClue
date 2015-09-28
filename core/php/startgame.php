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
            //read();
            break;
        case 'PUT':
            //update();
            break;
        case 'DELETE':
            //delete();
            break;
    }
    
    function update() {
        
        $data = json_decode(file_get_contents('php://input'));
        $params = null;
        if ($data != null) {
            $params = array(
                "id" => $data->{'id'},
                "sts" => $data->{'sts'},
                "aw" => $data->{'aw'},
                "d1" => $data->{'d1'},
                "d2" => $data->{'d2'},
                "d3" => $data->{'d3'},
                "d4" => $data->{'d4'},
                "d5" => $data->{'d5'},
                "d6" => $data->{'d6'},
            );
        } else {
            $params = array(
                "id" => $_POST['id'],
                "sts" => $_POST['sts'],
                "aw" => $_POST['aw'],
                "d1" => $_POST['d1'],
                "d2" => $_POST['d2'],
                "d3" => $_POST['d3'],
                "d4" => $_POST['d4'],
                "d5" => $_POST['d5'],
                "d6" => $_POST['d6'],
            );
        }
        
        $sql = "UPDATE `gametable` SET `sts` = ".$params["sts"].", `aw` = '".$params["aw"]."', `d1` = '".$params["d1"]."', `d2` = '".$params["d2"]."', `d3` = '".$params["d3"]."', `d4` = '".$params["d4"]."', `d5` = '".$params["d5"]."', `d6` = '".$params["d6"]."' WHERE (`id` = ".$params["id"].")";
        try {
            $pdo = getConnection();
            $stmt = $pdo->prepare($sql);
            $stmt->execute();
            $count = $stmt->rowCount();
            echo 1;
        } catch(PDOException $e) {
            echo '{"error":{"text":'. $e->getMessage() .'}}';
        }
    }
?>