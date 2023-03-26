<?php
    if ($_SERVER["REQUEST_METHOD"] == "POST") {
        ini_set("SMTP", "");
        ini_set("sendmail_from", "");

        # TODO: fill this
        $message = "";
        $headers = "From: website.ru";
        mail("email@physics.msu.ru", "Testing", $message, $headers);
    }
?>