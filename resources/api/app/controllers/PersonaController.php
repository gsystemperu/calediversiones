<?php
use \Phalcon\Mvc\Controller as Controller;

class PersonaController extends Controller
{
    public function initialize(){$this->view->disable(); }
 
    public function listarAction()
    {
         $request        = new Phalcon\Http\Request();
         $response       = new \Phalcon\Http\Response();
         if($request->isGet() ==true)
         {
              $jsonData = Persona::Listar();
              $response->setContentType('application/json', 'UTF-8');
              $response->setContent($jsonData);
              return $response;
         }
    }
   

   

}
