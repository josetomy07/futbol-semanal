<?php

namespace App\Http\Controllers;

use Exception;
use Illuminate\Http\Request;
use SimpleXMLElement;
use SoapClient;
use SoapFault;

class CuitSoapController extends Controller
{
    public function index()
    {
        define("WSDL", "./wsaa.wsdl");     # The WSDL corresponding to WSAA
        define("CERT", "./ghf.crt");       # The X.509 certificate in PEM format
        define("PRIVATEKEY", "./ghf.key"); # The private key correspoding to CERT (PEM)
        define("PASSPHRASE", "xxxxx"); # The passphrase (if any) to sign
        define("URL", "https://wsaahomo.afip.gov.ar/ws/services/LoginCms");
        #define ("URL", "https://wsaa.afip.gov.ar/ws/services/LoginCms");
        function CreateTRA($SERVICE)
        {
            $TRA = new SimpleXMLElement(
                '<?xml version="1.0" encoding="UTF-8"?>' .
                    '<loginTicketRequest version="1.0">' .
                    '</loginTicketRequest>'
            );
            $TRA->addChild('header');
            $TRA->header->addChild('uniqueId', date('U'));
            $TRA->header->addChild('generationTime', date('c', date('U') - 60));
            $TRA->header->addChild('expirationTime', date('c', date('U') + 60));
            $TRA->addChild('service', $SERVICE);
            $TRA->asXML('TRA.xml');
        }
        #==============================================================================
        # This functions makes the PKCS#7 signature using TRA as input file, CERT and
        # PRIVATEKEY to sign. Generates an intermediate file and finally trims the
        # MIME heading leaving the final CMS required by WSAA.
        function SignTRA()
        {
            $STATUS = openssl_pkcs7_sign(
                "TRA.xml",
                "TRA.tmp",
                "file://" . CERT,
                array("file://" . PRIVATEKEY, PASSPHRASE),
                array(),
                !PKCS7_DETACHED
            );
            if (!$STATUS) {
                throw new Exception("ERROR generating PKCS#7 signature\n", 1);
            }
            $inf = fopen("TRA.tmp", "r");
            $i = 0;
            $CMS = "";
            while (!feof($inf)) {
                $buffer = fgets($inf);
                if ($i++ >= 4) {
                    $CMS .= $buffer;
                }
            }
            fclose($inf);
            #  unlink("TRA.xml");
            unlink("TRA.tmp");
            return $CMS;
        }
        #==============================================================================
        function CallWSAA($CMS)
        {
            $client = new SoapClient(WSDL, array(
                'soap_version'   => SOAP_1_2,
                'location'       => URL,
                'trace'          => 1,
                'exceptions'     => 0
            ));
            $results = $client->loginCms(array('in0' => $CMS));
            file_put_contents("request-loginCms.xml", $client->__getLastRequest());
            file_put_contents("response-loginCms.xml", $client->__getLastResponse());
            if (is_soap_fault($results)) {
                if ($results->faultcode == 'ns1:coe.alreadyAuthenticated') {
                    // Define the path to the XML file in the public folder
                    $xmlFilePath = __DIR__ . '/../../../public/TA.xml';
                    if (file_exists($xmlFilePath)) {
                        // Load the XML file
                        $xml = simplexml_load_file($xmlFilePath);

                        // Check if loading was successful
                        if ($xml === false) {
                            throw new Exception("Failed to load XML file.", 1);
                        } else {
                            // Access the 'token', 'sign', and 'expirationTime'
                            $token = (string) $xml->credentials->token;
                            $sign = (string) $xml->credentials->sign;
                            $expirationTime = (string) $xml->header->expirationTime;

                            // Create a request instance that mimics a real HTTP request
                            $request = Request::create('/store', 'POST', [
                                'token' => $token,
                                'sign' => $sign,
                                'expiration' => $expirationTime,
                            ]);

                            // Instantiate the target controller or use dependency injection
                            $soapController = new SoapTokenController();

                            // Call the store method on the controller
                            $soapController->store($request);

                            // You can handle the response if needed
                            throw new Exception("Already authenticated, but loaded XML data successfully", 1);
                        }
                    } else {
                        throw new Exception("XML file does not exist.", 1);
                    }
                }
                throw new Exception("SOAP Fault: " . $results->faultcode . "\n" . $results->faultstring . "\n", 1);
            }
            return $results->loginCmsReturn;
        }
        #==============================================================================
        $errorLogController = new ErrorLogsController();

        ini_set("soap.wsdl_cache_enabled", "0");
        if (!file_exists(CERT)) {
            $error = "Failed to open " . CERT . "\n";
            $request = Request::create('/store', 'POST', [
                "error" => $error
            ]);
            // Instantiate the target controller or use dependency injection
            $errorLogController = new ErrorLogsController();

            // Call the store method on the controller
            $errorLogController->store($request);
            return response($error, 500);
        }
        if (!file_exists(PRIVATEKEY)) {
            $error = "Failed to open " . PRIVATEKEY . "\n";
            $request = Request::create('/store', 'POST', [
                "error" => $error
            ]);
            // Instantiate the target controller or use dependency injection
            $errorLogController = new ErrorLogsController();

            // Call the store method on the controller
            $errorLogController->store($request);
            return response($error, 500);
        }
        if (!file_exists(WSDL)) {
            $error = "Failed to open " . WSDL . "\n";
            $request = Request::create('/store', 'POST', [
                "error" => $error
            ]);
            // Instantiate the target controller or use dependency injection
            $errorLogController = new ErrorLogsController();

            // Call the store method on the controller
            $errorLogController->store($request);
            return response($error, 500);
        }
        try {
            CreateTRA('ws_sr_constancia_inscripcion');
            $CMS = SignTRA();
            $TA = CallWSAA($CMS);
            $xml = simplexml_load_string($TA);
        } catch (\Throwable $th) {
            $error = $th->getMessage();
            $request = Request::create('/store', 'POST', [
                "error" => $error
            ]);
            // Instantiate the target controller or use dependency injection
            $errorLogController = new ErrorLogsController();

            // Call the store method on the controller
            $errorLogController->store($request);
            return response($error, 500);
        }

        // Check if XML was parsed successfully
        if ($xml === false) {
            $error = "Error: Unable to parse XML";
            $request = Request::create('/store', 'POST', [
                "error" => $error
            ]);
            // Instantiate the target controller or use dependency injection
            $errorLogController = new ErrorLogsController();

            // Call the store method on the controller
            $errorLogController->store($request);
            return response($error, 500);
        }
        if (!file_put_contents("TA.xml", $TA)) {
            $error = "Was not able to create TA.xml";
            $request = Request::create('/store', 'POST', [
                "error" => $error
            ]);
            // Instantiate the target controller or use dependency injection
            $errorLogController = new ErrorLogsController();

            // Call the store method on the controller
            $errorLogController->store($request);
            return response($error, 500);
        }

        // Access the token and sign elements
        $token = (string) $xml->credentials->token;
        $sign = (string) $xml->credentials->sign;
        $expirationTime = (string) $xml->header->expirationTime;

        $request = Request::create('/store', 'POST', [
            'token' => $token,
            'sign' => $sign,
            'expiration' => $expirationTime,
        ]);

        // Instantiate the target controller or use dependency injection
        $soapController = new SoapTokenController();

        // Call the store method on the controller
        $soapController->store($request);
        return response("Success", 200);
    }

    public function getCuit($cuit)
    {
        ini_set('display_errors', 1);
        ini_set('display_startup_errors', 1);
        error_reporting(E_ALL);
        $soapController = new SoapTokenController();
        $data = $soapController->getToken();

        $token = $data[0]->token;
        $sign = $data[0]->sign;
        $expiration = $data[0]->expiration;

        try {
            $client = new SoapClient(__DIR__ . '/../../../public/personaServiceA5.wsdl', array(
                'soap_version'   => SOAP_1_1,
                'location'       => 'https://awshomo.afip.gov.ar/sr-padron/webservices/personaServiceA5',
                'trace'          => true,
                'exceptions'     => true
            ));

            $params = [
                "token" => $token,
                "sign" =>  $sign,
                "cuitRepresentada" => "20410701082",
                "idPersona" => $cuit
            ];

            $response = $client->getPersona($params);

            // Handle the response
            if (isset($response->personaReturn)) {
                // Access the persona data from the response
                if (isset($response->personaReturn->errorConstancia)) {
                    $persona = [
                        "nombre" => $response->personaReturn->errorConstancia->nombre,
                        "apellido" => $response->personaReturn->errorConstancia->apellido,
                        "error" => $response->personaReturn->errorConstancia->error,
                        "idPersona" => $response->personaReturn->errorConstancia->idPersona,
                    ];
                    $jsonResponse = json_encode($persona, JSON_PRETTY_PRINT);

                    return response($jsonResponse, 200);
                }
            } else {
                echo "No persona data returned.";
            }

            if (is_soap_fault($response)) {
                $error = "SOAP Fault: " . $response->faultcode . "\n" . $response->faultstring . "\n";
                $request = Request::create('/store', 'POST', [
                    "error" => $error
                ]);
                // Instantiate the target controller or use dependency injection
                $errorLogController = new ErrorLogsController();

                // Call the store method on the controller
                $errorLogController->store($request);
                return response($error, 500);
            }
        } catch (SoapFault $e) {
            // print_r($e);
            // echo "Request :\n" . htmlspecialchars($client->__getLastRequest()) . "\n";
            // echo "Response:\n" . htmlspecialchars($client->__getLastResponse()) . "\n";
            // echo "Error: " . $e->getMessage();
            $error = "SOAP Error: " . $e->getMessage();
            $request = Request::create('/store', 'POST', [
                "error" => $error
            ]);
            // Instantiate the target controller or use dependency injection
            $errorLogController = new ErrorLogsController();

            // Call the store method on the controller
            $errorLogController->store($request);
            return response($error, 500);
        }
    }
}
