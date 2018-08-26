<?php
use \Phalcon\Mvc\Controller as Controller;

class EventoController extends Controller
{
    public function initialize(){$this->view->disable(); }
 
    public function listarAction()
    {
         $request        = new Phalcon\Http\Request();
         $response       = new \Phalcon\Http\Response();
         if($request->isGet() ==true)
         {
             $fecha         = $request->get('fecha');

              $jsonData = Evento::listado(array($fecha));
              $response->setContentType('application/json', 'UTF-8');
              $response->setContent($jsonData);
              return $response;
         }
    }
    public function guardarAction()
    {
         $request        = new Phalcon\Http\Request();
         $response       = new \Phalcon\Http\Response();
         if($request->isPost() ==true)
         {

             $id         = $request->getPost('id');
             $idclie     = $request->getPost('idclie');
             $fecha      = $request->getPost('fecha');
             $descripcion      = $request->getPost('nomevento');
             $desde     = $request->getPost('horainicio');
             $hasta      = $request->getPost('horatermino');
             $total      = $request->getPost('total');
             $idlocal        = $request->getPost('idlocal');
             $jsondata       = $request->getPost('jsondata');
             $idlocalreg     = $request->getPost('idlocalreg');
             
              $data = array(
                $id  ,
                $idclie ,
                $fecha   ,
                $descripcion  ,
                $desde    ,
                $hasta     ,
                $total,
                $idlocal,
                $jsondata,
                $idlocalreg
              );
              $jsonData = Evento::actualizar($data);
              $response->setContentType('application/json', 'UTF-8');
              $response->setContent(json_encode($jsonData[0], JSON_NUMERIC_CHECK));
              return $response;
         }
    }
    public function eliminarAction()
    {
         $request        = new Phalcon\Http\Request();
         $response       = new \Phalcon\Http\Response();
         if($request->isPost() ==true)
         {
              $id   = $request->getPost('id');
              $data = array($id);
              $jsonData = Evento::eliminar($data);
              $response->setContentType('application/json', 'UTF-8');
              $response->setContent(json_encode($jsonData[0], JSON_NUMERIC_CHECK));
              return $response;
         }
    }
    public function buscarpagosAction()
    {
         $request        = new Phalcon\Http\Request();
         $response       = new \Phalcon\Http\Response();
         if($request->isPost() ==true)
         {
              $id         = $request->getPost('id');
              $jsonData = Evento::pagos(array($id));
              $response->setContentType('application/json', 'UTF-8');
              $response->setContent($jsonData);
              return $response;
         }
    }
    public function anularpagoAction()
    {
         $request        = new Phalcon\Http\Request();
         $response       = new \Phalcon\Http\Response();
         if($request->isPost() ==true)
         {
              $id   = $request->getPost('idventa');
              $data = array($id);
              $jsonData = Evento::anularPago($data);
              $response->setContentType('application/json', 'UTF-8');
              $response->setContent(json_encode($jsonData[0], JSON_NUMERIC_CHECK));
              return $response;
         }
    }
   

   

}
