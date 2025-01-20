
<?php
 require_once 'PHPMailer/src/PHPMailer.php';
 require_once 'PHPMailer/src/PHPMailer.php';
 require_once 'PHPMailer/src/SMTP.php';
 require_once 'PHPMailer/src/PHPMailer.php';
 
 use PHPMailer\PHPMailer\PHPMailer;
 use PHPMailer\PHPMailer\Exception;

$jsonData = file_get_contents('php://input');
$dataArray = json_decode($jsonData, true);
    
if ($dataArray === null) {
        die("Error al decodificar el JSON");
}

$to = 'loepezjavier@gmail.com';  
$subject = 'Calculator';
$message = 'Data taken from calculator' . "\n";

foreach ($dataArray as $usuario) {
$message .= 'N.:' . $usuario['id'] . "\n";
$message .= 'Nombre: ' . $usuario['nombre'] . "\n";
$message .= 'Mail: ' . $usuario['mail'] . "\n";
$message .= 'Mensaje: ' . $usuario['mensaje'] . "\n";
}


$mail = new PHPMailer(true);
try {
           
$mail->isSMTP();                                            
$mail->Host       = 'smtp.gmail.com';                    
$mail->SMTPAuth   = true;                                   
$mail->Username   = 'loepezjavier@gmail.com';               
$mail->Password   = 'edwi lane pbif oowc';                       
$mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;       
$mail->Port       = 587;                                     

$mail->setFrom('javisolrac98@gmail.com', 'Carlo Javier');  
$mail->addAddress($to);                             

$mail->isHTML(true);                                
$mail->Subject = $subject;
$mail->Body = $message;
$mail->send();
echo 'Email sent successfully.';
} catch (Exception $e) {
echo "Error sending email: {$mail->ErrorInfo}";
}
    
