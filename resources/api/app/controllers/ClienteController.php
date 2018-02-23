<?php
use \Phalcon\Mvc\Controller as Controller;

class ClienteController extends Controller
{
    public function initialize(){$this->view->disable(); }
 
    public function listarAction()
    {
         $request        = new Phalcon\Http\Request();
         $response       = new \Phalcon\Http\Response();
         if($request->isGet() ==true)
         {
           
             if($request->get('nombre')){
                $parametros = array($request->get('nombre'));
                $jsonData = Cliente::listarpornombre($parametros);
             }else{
                $pagestart = $request->get('start');
                $pagelimit =  $request->get('limit');
                $format       = new FuncionesHelpers(); 
                $parametros = array(
                                $format->esNumeroCero($pagestart),
                                $format->esNumeroCero($pagelimit)  
                                );    
                $jsonData = Cliente::listar($parametros);
             }
              
             $response->setContentType('application/json', 'UTF-8');
             $response->setContent($jsonData);
             return $response;
         }
    }

    public function guardarclienteAction(){
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
           $jsonData = Cliente::actualizar($data);
           $idproducto = $jsonData[0]["error"]; 
           $response->setContentType('application/json', 'UTF-8');
           $response->setContent(json_encode($jsonData[0], JSON_NUMERIC_CHECK));
           return $response;

       }

    }

    public function anularclienteAction(){
        $request        = new Phalcon\Http\Request();
        $response       = new \Phalcon\Http\Response();

         if($request->isPost()==true)
         {
           $idclie        = $request->getPost('idclie');
           $format       = new FuncionesHelpers();
           $data = array(
              $format->esNumeroCero( $idclie)
            );
           $jsonData = Cliente::anular($data);
           $idproducto = $jsonData[0]["error"]; 
           $response->setContentType('application/json', 'UTF-8');
           $response->setContent(json_encode($jsonData[0], JSON_NUMERIC_CHECK));
           return $response;

       }

    }
   

   

}
