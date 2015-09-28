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
            );
        } else {
            $params = array(
                "id" => $_POST['id'],
            );
        }
        $sql = "UPDATE `gametable` SET `sts` = 0, `c0s` = 0, `c1s` = 0, `c2s` = 0, `c3s` = 0, `c4s` = 0, `c5s` = 0, `c6s` = 0, `c1t` = 0, `c1g` = 0, `c2t` = 0, `c2g` = 0, `c3t` = 0, `c3g` = 0, `c4t` = 0, `c4g` = 0, `c5t` = 0, `c5g` = 0, `c6t` = 0, `c6g` = 0, `cc` = 0, `sg` = '', `sc` = '', `aw` = '', `d1` = '', `d2` = '', `d3` = '', `d4` = '', `d5` = '', `d6` = '', `wn` = 0, `r1` = 0, `r2` = 0, `r3` = 0, `r4` = 0, `r5` = 0, `r6` = 0 WHERE (`id` = ".$params["id"].")";
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