<?
if( isset($_POST['type']) ) {
    $to       = "barvr54@gmail.com"; //Почта получателя
    $headers  = "Content-type: text/html; charset=utf-8 \r\n"; //Кодировка письма
    $headers .= "From: Отправитель <mail@barvr.ru>\r\n"; //Наименование и почта отправителя


    if ($_POST['type'] == "registration") {

        if ((isset($_POST['game-type']) && $_POST['game-type'] != "") && (isset($_POST['name']) && $_POST['name'] != "") && (isset($_POST['date']) && $_POST['date'] != "") && (isset($_POST['tel']) && $_POST['tel'] != "")) {

            $subject = 'Новое бронирование';
            $message = '
                <html>
                    <head>
                        <title>'.$subject.'</title>
                    </head>
                    <body>
                        <p>Вид игры: '.trim(urldecode(htmlspecialchars($_POST['game-type']))).'</p>
                        <p>Имя: '.trim(urldecode(htmlspecialchars($_POST['name']))).'</p>
                        <p>Дата: '.trim(urldecode(htmlspecialchars($_POST['date']))).'</p>
                        <p>Телефон: '.trim(urldecode(htmlspecialchars($_POST['tel']))).'</p>
                    </body>
                </html>';

            mail($to, $subject, $message, $headers);
        }

    } elseif ($_POST['type'] == "callme") {

        if ((isset($_POST['name']) && $_POST['name'] != "") && (isset($_POST['tel']) && $_POST['tel'] != "") && (isset($_POST['email']) && $_POST['email'] != "")) {


            $subject = 'Обратный звонок';
            $message = '
                <html>
                    <head>
                        <title>'.$subject.'</title>
                    </head>
                    <body>
                        <p>Имя: '.trim(urldecode(htmlspecialchars($_POST['name']))).'</p>
                        <p>Телефон: '.trim(urldecode(htmlspecialchars($_POST['tel']))).'</p>
                        <p>E-mail: '.trim(urldecode(htmlspecialchars($_POST['email']))).'</p>
                    </body>
                </html>';

            mail($to, $subject, $message, $headers);
        }

    }
}
?>