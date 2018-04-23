<?php

require 'vendor/phpmailer/phpmailer/PHPMailerAutoload.php';

$mail = new PHPMailer();

//Tell PHPMailer to use SMTP
$mail->isSMTP();

//Enable SMTP debugging
// 0 = off (for production use)
// 1 = client messages
// 2 = client and server messages
$mail->SMTPDebug = 2;

//Ask for HTML-friendly debug output
$mail->Debugoutput = 'html';

//Set the hostname of the mail server
$mail->Host = 'smtp.gmail.com';

// use
// $mail->Host = gethostbyname('smtp.gmail.com');
// if your network does not support SMTP over IPv6
//Set the SMTP port number - 587 for authenticated TLS, a.k.a. RFC4409 SMTP submission
$mail->Port = 587;

//Set the encryption system to use - ssl (deprecated) or tls

$mail->SMTPSecure = 'tls';

//Whether to use SMTP authentication
$mail->SMTPAuth = true;

//Username to use for SMTP authentication - use full email address for gmail
$mail->Username = "danielautryuva@gmail.com";
//Password to use for SMTP authentication
$mail->Password = "moneyball1";

//Set who the message is to be sent from
$mail->setFrom('danielautryuva@gmail.com', 'Potential Client');

//Set who the message is to be sent to
$mail->addAddress('dxautry@gmail.com', 'Daniel Autry');
$mail->Subject = 'Freelance Inquiry';

$mail->addAddress('da5eg@virginia.edu', 'Daniel Autry');
$mail->Subject = 'Freelance Inquiry';

if(isset($_POST['email'])) {
    print_r("in post");

    $name = check_input($_POST['name']);
    $email = check_input($_POST['email']);
    $phone = $_POST['phone'] == "" ? "" : check_input($_POST['phone']);
    $message = check_input($_POST['message']);

    $error_message = "";
    $email_exp = '/^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/';
    
    if(!preg_match($email_exp, $email)) {
        $error_message .= 'The Email Address you entered does not appear to be valid.<br />';
    }

    $string_exp = "/^[A-Za-z .'-]+$/";

    if(!preg_match($string_exp,$name)) {
        $error_message .= 'The Name you entered does not appear to be valid.<br />';
    }

    if ($phone != ""){
        if (preg_match("/\D/",$phone)){
            $error_message .= 'The Phone Number you entered does not appear to be valid.<br />';
        }
    }

    if(strlen($error_message) > 0) {
        die($error_message);
    }

    $email_message = "Form details below.\n\n";
    $email_message .= "Name: ". $name ."\n";
    $email_message .= "Email: " . $email ."\n";
    $email_message .= "Phone: ". $phone ."\n";
    $email_message .= "Message: ". $message ."\n";

    $mail->Body = $email_message;

    //send the message, check for errors
    if (!$mail->send()) {
        echo "Mailer Error: " . $mail->ErrorInfo;
    } else {
        echo "Message sent!";

    }

}

function check_input($data, $problem=''){
    $data = trim($data);
    $data = stripslashes($data);
    $data = htmlspecialchars($data);

    if ($problem && strlen($data) == 0){
        die($problem);
    }

    return $data;
}
?>
 
Email sent
 
 
 
<?php
 

 
?>