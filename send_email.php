<?php
    if ($_SERVER["REQUEST_METHOD"] == "POST") {
        ini_set("SMTP", "smtp.f0732619.xsph.ru");
        ini_set("sendmail_from", "f0732619@f0732619.xsph.ru");

        $message = "The mail message was sent with the following mail setting:\r\nSMTP = smtp.f0732619.xsph.ru\r\nsmtp_port = 25\r\nsendmail_from = f0732619@f0732619.xsph.ru";

        $headers = "From: f0732619@f0732619.xsph.ru";

        mail("gordeev.dmitriy@physics.msu.ru", "Testing", $message, $headers);
        echo "Check your email now....&lt;BR/>";
    }
?>