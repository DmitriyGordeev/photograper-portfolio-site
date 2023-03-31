<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><?php echo 'Ivan | Photographer portfolio' ?></title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400;700&display=swap" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css2?family=Oswald&display=swap" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css2?family=Overpass&display=swap" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css2?family=Overpass&family=Roboto+Flex:opsz,wght@8..144,200&display=swap" rel="stylesheet">
</head>

<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
  // collect value of input field
//   $email = $_POST['email'];
//   echo $email;
    echo "HELLO!";
}
?>

<body>
  <div id="app"></div>
  <script src="main.bundle.js"></script>
</body>
</html>