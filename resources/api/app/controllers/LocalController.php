<?php
use \Phalcon\Mvc\Controller as Controller;

class LocalController extends Controller
{
    public function initialize(){$this->view->disable(); }
 
    public function listarAction()
    {
         $request        = new Phalcon\Http\Request();
         $response       = new \Phalcon\Http\Response();
         if($request->isGet() ==true)
         {
             
             $format     = new FuncionesHelpers(); 
             $parametros = array();    
             $jsonData   = Local::listar($parametros);
           
             $response->setContentType('application/json', 'UTF-8');
             $response->setContent($jsonData);
             return $response;
         }
    }

    public function guardarAction(){
        $request        = new Phalcon\Http\Request();
        $response       = new \Phalcon\Http\Response();

         if($request->isPost()==true)
         {
           $idlocal      = $request->getPost('idlocal');
           $direccion     = $request->getPost('direccion');
           $telefono         = $request->getPost('telefono');
           $celular         = $request->getPost('celular');
           $descripcion         = $request->getPost('descripcion');
           $usuario        = $request->getPost('usuario');
           $clave         = $request->getPost('clave');
           $format       = new FuncionesHelpers();
           $data = array(
            $idlocal,    
            $direccion,  
            $telefono, 
            $celular, 
            $descripcion,
            $usuario,
            $clave
            );
           $jsonData = Local::actualizar($data);
           $idproducto = $jsonData[0]["error"]; 
           $response->setContentType('application/json', 'UTF-8');
           $response->setContent(json_encode($jsonData[0], JSON_NUMERIC_CHECK));
           return $response;

       }

    }

    public function anularLocalAction(){
        $request        = new Phalcon\Http\Request();
        $response       = new \Phalcon\Http\Response();

         if($request->isPost()==true)
         {
           $idclie        = $request->getPost('idclie');
           $format       = new FuncionesHelpers();
           $data = array(
              $format->esNumeroCero( $idclie)
            );
           $jsonData = Local::anular($data);
           $idproducto = $jsonData[0]["error"]; 
           $response->setContentType('application/json', 'UTF-8');
           $response->setContent(json_encode($jsonData[0], JSON_NUMERIC_CHECK));
           return $response;

       }

    }
   

   

}
