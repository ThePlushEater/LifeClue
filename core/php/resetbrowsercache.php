<?php
    header("Cache-Control: no-store, no-cache, must-revalidate, max-age=0");
    header("Cache-Control: post-check=0, pre-check=0", false);
    header("Pragma: no-cache");
    
    ob_start();
    session_start();
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
			      //login();
            break;
        case 'PUT':
            update();
            break;
        case 'DELETE':
            break;
    }
    
    function update() {
        $_SESSION['checkbox'] ="";
        $_SESSION['memo'] = "";
        
        echo $_SESSION['checkbox'];
        echo $_SESSION['memo'];
    }
?>