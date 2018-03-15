<?php
use \Phalcon\Mvc\Controller as Controller;

class VentaController extends Controller
{
    public function initialize(){$this->view->disable(); }

    public function listarAction(){
         $request        = new Phalcon\Http\Request();
         $response       = new \Phalcon\Http\Response();
         if($request->isGet() ==true)
         {
              $jsonData = Producto::listar();
              $response->setContentType('application/json', 'UTF-8');
              $response->setContent($jsonData);
              return $response;
         }
    }

     public function guardarAction(){
         $request        = new Phalcon\Http\Request();
         $response       = new \Phalcon\Http\Response();
         if($request->isPost() ==true)
         {
              $idven        = $request->getPost('idven');
              $idper        = $request->getPost('idper');
              $idlocal      = $request->getPost('idlocal');
              $idemp        = $request->getPost('idemp');
              $recibido     = $request->getPost('dinerorecibido');
              $devuelto     = $request->getPost('dinerodevuelto');
              $jsondetalle  = $request->getPost('jsondetalle');
              $numerorecibo = $request->getPost('numerorecibo');
              $metodopago   = $request->getPost('metodopago');
              $numeromesa   = $request->getPost('numeromesa');
              $fechaventa   = $request->getPost('fechaventa');
              $format       = new FuncionesHelpers();
              $data = array(
               $format->esNumeroCero( $idven),
               $format->esNumeroCero( $idper ) ,
               $format->esNumeroCero( $idlocal),
               $format->esNumeroCero( $idemp  ),
               $format->esNumeroCero($recibido),
               $format->esNumeroCero($devuelto),
                $metodopago,
                $numerorecibo,
                $jsondetalle ,
                $numeromesa,$fechaventa);
              //  print_r($data);die();
              $jsonData = Venta::guardar($data);
              $response->setContentType('application/json', 'UTF-8');
              $response->setContent(json_encode($jsonData[0], JSON_NUMERIC_CHECK));
              return $response;

         }
    }
    public function estadomesaAction(){
         $request        = new Phalcon\Http\Request();
         $response       = new \Phalcon\Http\Response();
         if($request->isPost() ==true)
         {
              $idmesa    = $request->getPost('idmesa');
              $idemp     = $request->getPost('idemp');
              $data      = array($idmesa,$idemp);
              $jsonData  = Seguridad::mesaReservada($data);
              $paso      = $jsonData[0]["error"];
              if($paso == 2 ){
                 /* agregar la mesa a reserva */
                 $jsonDatax = Seguridad::mesaReservar($data);
              }
              $response->setContentType('application/json', 'UTF-8');
              $response->setContent(json_encode($jsonData[0], JSON_NUMERIC_CHECK));
              return $response;
         }
    }
    public function reservarmesaAction(){
         $request        = new Phalcon\Http\Request();
         $response       = new \Phalcon\Http\Response();
         if($request->isPost() ==true)
         {
              $idmesa    = $request->getPost('idmesa');
              $idemp     = $request->getPost('idemp');
              $data      = array($idmesa,$idemp);
              $jsonData = Seguridad::mesaReservar($data);
              $response->setContentType('application/json', 'UTF-8');
              $response->setContent(json_encode($jsonData[0], JSON_NUMERIC_CHECK));
              return $response;
         }
    }

    public function listarcajaAction()
    {
         $request        = new Phalcon\Http\Request();
         $response       = new \Phalcon\Http\Response();
         if($request->isGet() == true)
         {
              $desde     = $request->get('desde');
              $hasta     = $request->get('hasta');
              $idlocal   = $request->get('idlocal');
              $format    = new FuncionesHelpers();
              $data      = array($desde,$hasta,$idlocal);

              $jsonData  = Venta::listadopedidoscaja($data);
              $response->setContentType('application/json', 'UTF-8');
              $response->setContent($jsonData);
              return $response;
         }
    }

    public function detallepedidoAction()
    {
         $request        = new Phalcon\Http\Request();
         $response       = new \Phalcon\Http\Response();
         if($request->isGet() == true)
         {
              $idven     = $request->get('idven');
              $format    = new FuncionesHelpers();
              $data      = array($idven);
              $jsonData  = Venta::detallePedido($data);
              $response->setContentType('application/json', 'UTF-8');
              $response->setContent($jsonData);
              return $response;
         }
    }

      public function controlninosAction()
    {
         $request        = new Phalcon\Http\Request();
         $response       = new \Phalcon\Http\Response();
         if($request->isGet() == true)
         {
              $format    = new FuncionesHelpers();
              $idlocal   = $request->get('idlocal');
              $data      = array($idlocal);
              $jsonData  = Venta::controlninos($data);
              $response->setContentType('application/json', 'UTF-8');
              $response->setContent($jsonData);
              return $response;
         }
    }

   public function anularventaAction(){
         $request        = new Phalcon\Http\Request();
         $response       = new \Phalcon\Http\Response();
         if($request->isPost() ==true)
         {
              $idven    = $request->getPost('id');
              $data     = array($idven);
              $jsonData = Venta::anularventa($data);
              $response->setContentType('application/json', 'UTF-8');
              $response->setContent(json_encode($jsonData[0], JSON_NUMERIC_CHECK));
              return $response;
         }
    }
    public function totalventacajaAction(){
          $request        = new Phalcon\Http\Request();
          $response       = new \Phalcon\Http\Response();
          if($request->isPost() ==true)
          {
              $desde     = $request->get('desde');
              $hasta     = $request->get('hasta');
              $idlocal   = $request->get('idlocal');
              $format    = new FuncionesHelpers();
              $data      = array($desde,$hasta,$idlocal);
               $jsonData = Venta::totalventacaja($data);
               $response->setContentType('application/json', 'UTF-8');
               $response->setContent(json_encode($jsonData[0], JSON_NUMERIC_CHECK));
               return $response;
          }
     }

     public function actualizargastoAction(){
           $request        = new Phalcon\Http\Request();
           $response       = new \Phalcon\Http\Response();
           if($request->isPost() ==true)
           {
               $idgasto         = $request->getPost('idgasto');
               $fecha           = $request->getPost('fecha');
               $descripcion     = $request->getPost('descripcion');
               $montogasto      = $request->getPost('montogasto');


                $format   = new FuncionesHelpers();
                $data     = array($idgasto,$fecha,$descripcion,$montogasto);
                $jsonData = Venta::actualizargasto($data);
                $response->setContentType('application/json', 'UTF-8');
                $response->setContent(json_encode($jsonData[0], JSON_NUMERIC_CHECK));
                return $response;
           }
      }

          public function listargastosAction()
          {
               $request        = new Phalcon\Http\Request();
               $response       = new \Phalcon\Http\Response();
               if($request->isGet() == true)
               {
                    $desde     = $request->get('desde');
                    $hasta     = $request->get('hasta');
                    $format    = new FuncionesHelpers();

                    if($desde){
                        $data      = array($desde,$hasta);
                    }else{
                        $data      = array();
                    }
                    $jsonData  = Venta::listargasto($data);
                    $response->setContentType('application/json', 'UTF-8');
                    $response->setContent($jsonData);
                    return $response;
               }
          }
          public function eliminargastoAction(){
                $request        = new Phalcon\Http\Request();
                $response       = new \Phalcon\Http\Response();
                if($request->isPost() ==true)
                {
                     $idgasto  = $request->getPost('idgasto');
                     $format   = new FuncionesHelpers();
                     $data     = array($idgasto);
                     $jsonData = Venta::eliminargasto($data);
                     $response->setContentType('application/json', 'UTF-8');
                     $response->setContent(json_encode($jsonData[0], JSON_NUMERIC_CHECK));
                     return $response;
                }
           }


}
