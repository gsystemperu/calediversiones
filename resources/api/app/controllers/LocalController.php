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
           
             if($request->get('nombre')){
                //$parametros = array($request->get('nombre'));
                //$jsonData = Local::listarpornombre($parametros);
             }else{
                $pagestart = $request->get('start');
                $pagelimit =  $request->get('limit');
                $format       = new FuncionesHelpers(); 
                $parametros = array(
                                $format->esNumeroCero($pagestart),
                                $format->esNumeroCero($pagelimit)  
                                );    
                $jsonData = Local::listar($parametros);
             }
              
             $response->setContentType('application/json', 'UTF-8');
             $response->setContent($jsonData);
             return $response;
         }
    }

    public function guardarLocalAction(){
        $request        = new Phalcon\Http\Request();
        $response       = new \Phalcon\Http\Response();

         if($request->isPost()==true)
         {
           $idclie        = $request->getPost('idclie');
           $nombres        = $request->getPost('nombres');
           $dni        = $request->getPost('dni');

           $format       = new FuncionesHelpers();
           $data = array(
              $format->esNumeroCero( $idclie),
              $nombres  ,
              $format->esNumeroCero($dni)
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
