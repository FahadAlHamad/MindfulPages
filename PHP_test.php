<!DOCTYPE html>
<html lang='en-GB'>
<head>
<title>PHP07 A</title>
<script>
function updateContactInfo() {
    var select = document.getElementById("select");
    var selectedOption = select.options[select.selectedIndex];
    var contactInfo = document.getElementById("contactInfo");

    if (selectedOption.value === 'None') {
        contactInfo.innerHTML = ""; // Clear the message if 'None' is selected
    } else {
        contactInfo.innerHTML = "You can contact " + selectedOption.text + " via the e-mail address " + selectedOption.value;
    }
}
</script>
</head>
<body>
<h1>PHP and Databases</h1>
<?php
$db_hostname = "studdb.csc.liv.ac.uk";
$db_database = "psqashka";
$db_username = "psqashka";
$db_password = "<password>";
$db_charset = "utf8mb4";
$dsn = "mysql:host=$db_hostname;dbname=$db_database;charset=$db_charset";
$opt = array(
    PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
    PDO::ATTR_EMULATE_PREPARES => false
);
try {
    $pdo = new PDO($dsn,$db_username,$db_password,$opt);
    
    // Code for 3c here
if(isset($_POST['insert'])) { // Check if the 'Insert into DB' button is clicked
    // Check if all required fields are provided
    if(!empty($_POST['slot']) && !empty($_POST['name']) && !empty($_POST['email'])) {
        // Prepare the SQL statement with placeholders
        $stmt = $pdo->prepare("INSERT INTO meetings (slot, name, email) VALUES (?, ?, ?)");
        
        // Bind parameters to the placeholders and execute the statement
        $success = $stmt->execute(array($_POST['slot'], $_POST['name'], $_POST['email']));
        
        if($success) {
            echo "<p>Insertion successful!</p>";
        } else {
            // If insertion fails, show the error message
            echo "<p>Insertion failed: " . $stmt->errorInfo()[2] . "</p>";
        }
    } else {
        // If any of the required fields are missing, generate an error message
        echo "<p>Please provide all required information.</p>";
    }
}
// Code for 3d here
if(isset($_POST['delete'])) { // Check if the 'Delete from DB' button is clicked
    // Check if slot number is provided
    if(!empty($_POST['slot'])) {
        // Prepare the SQL statement with a placeholder for slot number
        $stmt = $pdo->prepare("DELETE FROM meetings WHERE slot = ?");
        
        // Bind the slot number to the placeholder and execute the statement
        $stmt->execute(array($_POST['slot']));
        
        // Check if any rows were affected
        if($stmt->rowCount() > 0) {
            echo "<p>Deletion successful!</p>";
        } else {
            // If no rows were affected, show failure message
            echo "<p>No matching entry found for deletion.</p>";
        }
    } else {
        // If slot number is not provided, generate an error message
        echo "<p>Please provide the slot number to delete.</p>";
    }
}
// Code for 4a here
if(isset($_POST['query'])) { // Check if the 'Query DB' button is clicked
    // Check if regular expression is provided
    if(!empty($_POST['name'])) {
        // Prepare the SQL statement with a placeholder for the regular expression
        $stmt = $pdo->prepare("SELECT * FROM meetings WHERE name REGEXP ?");
        
        // Bind the regular expression to the placeholder and execute the statement
        $stmt->execute(array($_POST['name']));
        
        // Display the results in an HTML table
        echo "<h2>Query Results</h2>";
        echo "<table border='1'>\n";
        echo "<tr><th>Slot</th><th>Name</th><th>Email</th></tr>\n"; // Table headers
        
        // Loop through the query result and populate the table rows
        while ($row = $stmt->fetch()) {
            echo "<tr>\n";
            echo "<td>", $row["slot"], "</td>\n";
            echo "<td>", $row["name"], "</td>\n";
            echo "<td>", $row["email"], "</td>\n";
            echo "</tr>\n";
        }
        echo "</table>\n";
    } else {
        // If regular expression is not provided, generate an error message
        echo "<p>Please provide a regular expression to query.</p>";
    }
}

    
    // Modified query to order entries by slot number
    $stmt = $pdo->query("SELECT * FROM meetings ORDER BY slot");
    
    echo "<h2>Data in meeting table (HTML table)</h2>\n";
    echo "<table border='1'>\n";
    echo "<tr><th>Slot</th><th>Name</th><th>Email</th></tr>\n"; // Table headers
    
    // Loop through the query result and populate the table rows
    while ($row = $stmt->fetch()) {
        echo "<tr>\n";
        echo "<td>", $row["slot"], "</td>\n";
        echo "<td>", $row["name"], "</td>\n";
        echo "<td>", $row["email"], "</td>\n";
        echo "</tr>\n";
    }
    
    echo "</table>\n";

    // Dropdown menu
    echo "<form name='form1' method='post'>\n";
    echo "<select id='select' name='select' onchange='updateContactInfo()'>\n";
    echo "<option value='None'>Select a name</option>\n";
    // Query to retrieve data from the meetings table
    $stmt = $pdo->query("SELECT * FROM meetings");
    // Loop through the query result to generate options for the drop-down menu
    while ($row = $stmt->fetch()) {
        $name = $row["name"];
        $email = $row["email"];
        echo "<option value='$email'>$name</option>\n";
    }
    echo "</select>\n";
    echo "</form>\n";

    // Placeholder for contact info
    echo "<p id='contactInfo'></p>";

echo "
<form name='form2' method='post'>
Slot: <input type='number' name='slot' min='1' max='100'><br>
Name: <input type='text' name='name' size='100'><br>
Email: <input type='text' name='email' size='100'><br>
<input type='submit' name='insert' value='Insert into DB'>
<input type='submit' name='delete' value='Delete from DB'>
<input type='submit' name='query' value='Query DB'>
</form>";

    $pdo = NULL;
} catch (PDOException $e) {
    exit("PDO Error: ".$e->getMessage()."<br>");
}
?>
</body>
</html>