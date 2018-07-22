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
             $adelanto      = $request->getPost('adelantos');
             $total      = $request->getPost('total');
              $data = array(
                $id  ,
                $idclie ,
                $fecha   ,
                $descripcion  ,
                $desde    ,
                $hasta     ,
                $adelanto  ,
                $total
              );
             //print_r($data);die();
              $jsonData = Evento::actualizar($data);
              $response->setContentType('application/json', 'UTF-8');
              $response->setContent(json_encode($jsonData[0], JSON_NUMERIC_CHECK));
              return $response;
         }
    }
   

   

}
