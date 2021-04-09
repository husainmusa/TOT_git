  public function demoMailSent($to_email,$sub,$msg)
    {
        //$to_email,$sub,$msg
       
        $to_email='monika@clickgoweb.com';
        $sub='Fitness App Test';
        $msg = 'hello welocome to the Fitness App';
        
        $to_email= $to_email;
        $sub= $sub;
        $msg = $msg;
        
        $url = "http://web-brats.com/fitness_send_mail.php";
        $fields = array(
            'to_email' => urlencode($to_email),
            'subject' => urlencode($sub),
            'msg' => urlencode($msg)
        );

        // URL-ify the data for the POST
        $fields_string = "";
        foreach ($fields as $key => $value) {
            $fields_string .= $key . '=' . $value . '&';
        }

        rtrim($fields_string, '&');

        // Open connection
        $ch = curl_init(); 
        curl_setopt($ch, CURLOPT_URL, $url.'?'.$fields_string); 
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_ENCODING, 'UTF-8'); 
        // Execute post
        $result = curl_exec($ch);
        print_r($result);
    }
