<?php
use \Phalcon\Mvc\Controller as Controller;

class ConfiguracionController extends Controller
{
    public function initialize(){$this->view->disable(); }

    public function guardarAction()
    {
         $request        = new Phalcon\Http\Request();
         $response       = new \Phalcon\Http\Response();
         if($request->isPost() ==true)
         {
             if($request->getPost('nombreimpresion')){

                $nombre = $request->getPost('nombreimpresion');
                $codigo = $request->getPost('codigoimpresora');
                $serie = $request->getPost('serieimpresora');
                $direccion = $request->getPost('direccion');
                $ruc = $request->getPost('ruc');
                $clave = $request->getPost('claveadmin');

                $format       = new FuncionesHelpers();
                $parametros = array($nombre,$codigo,$serie,$direccion,$ruc,$clave);
                $jsonData = Config::guardar($parametros);
             }
             $response->setContentType('application/json', 'UTF-8');
             $response->setContent(json_encode($jsonData[0], JSON_NUMERIC_CHECK));
             return $response;
         }
    }

    public function mostrarconfigAction(){
        $request        = new Phalcon\Http\Request();
        $response       = new \Phalcon\Http\Response();
            if($request->isGet() ==true)
            {
               $jsonData = Config::mostrar();
            }
           $response->setContentType('application/json', 'UTF-8');
           $response->setContent($jsonData);
           return $response;
    }
    public function validarclaveadminAction(){
        $request        = new Phalcon\Http\Request();
        $response       = new \Phalcon\Http\Response();
            if($request->isPost() ==true)
            {
               $c = $request->getPost('c');
               $jsonData = Config::validarAdminClave(array($c));
            }
           $response->setContentType('application/json', 'UTF-8');
           $response->setContent($jsonData);
           return $response;
    }
    public function accesoalsistemaAction(){
        $request        = new Phalcon\Http\Request();
        $response       = new \Phalcon\Http\Response();
            if($request->isPost() ==true)
            {
               $u = $request->getPost('u');
               $c = $request->getPost('c');
               $l = $request->getPost('l');

               $jsonData = Config::accesoAlSistema(array($u,$c,$l));
            }
           $response->setContentType('application/json', 'UTF-8');
           $response->setContent($jsonData);
           return $response;
    }
    public function actualizarclaveeliminarAction()
    {
         $request        = new Phalcon\Http\Request();
         $response       = new \Phalcon\Http\Response();
         if($request->isPost() ==true)
         {

            $c = $request->getPost('claveadmin');
            $a = array($c);
            $jsonData = Config::actualizarClaveEliminar($a);
            $response->setContentType('application/json', 'UTF-8');
            $response->setContent(json_encode($jsonData[0], JSON_NUMERIC_CHECK));
            return $response;
         }
    }
    public function actualizarclavesuperadminAction()
    {
         $request        = new Phalcon\Http\Request();
         $response       = new \Phalcon\Http\Response();
         if($request->isPost() ==true)
         {

            $c = $request->getPost('claveadmin');
            $a = array($c);
            $jsonData = Config::actualizarClaveSuperAdmin($a);
            $response->setContentType('application/json', 'UTF-8');
            $response->setContent(json_encode($jsonData[0], JSON_NUMERIC_CHECK));
            return $response;
         }
    }




}
