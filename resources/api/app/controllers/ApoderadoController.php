<?php
use \Phalcon\Mvc\Controller as Controller;

class ApoderadoController extends Controller
{
    public function initialize(){$this->view->disable(); }

    public function listarapoderadoAction()
    {
         $request        = new Phalcon\Http\Request();
         $response       = new \Phalcon\Http\Response();
         if($request->isPost() ==true)
         {

             if($request->getPost('dni')){
                $dni = $request->getPost('dni');
                $format       = new FuncionesHelpers();
                $parametros = array($format->esNumeroCero($dni));
                $jsonData = Apoderado::listarapoderado($parametros);
             }

             $response->setContentType('application/json', 'UTF-8');
             $response->setContent($jsonData);
             return $response;
         }
    }
    public function listarapoderadotodosAction()
    {
         $request        = new Phalcon\Http\Request();
         $response       = new \Phalcon\Http\Response();
         if($request->isGet() ==true)
         {

             if($request->get('datos')){
                $parametros = array($request->get('datos'));
                $jsonData = Apoderado::listartodos($parametros);
             }else{
               $parametros = array();
               $jsonData = Apoderado::listartodos($parametros);
             }

             $response->setContentType('application/json', 'UTF-8');
             $response->setContent($jsonData);
             return $response;
         }
    }
    public function guardarapoderadoAction()
    {
        $request        = new Phalcon\Http\Request();
        $response       = new \Phalcon\Http\Response();
        if($request->isPost() ==true)
        {
            $id = $request->getPost('idapoderado');
            $nombres = $request->getPost('nombresapoderado');
            $apellidos = $request->getPost('apellidosapoderado');
            $dni = $request->getPost('dniapoderado');
            $telefono = $request->getPost('telefonoapoderado');
            $correo = $request->getPost('correoapoderado');
            $hijos = $request->getPost('jsonhijos');

            if($id !=''){
                  $format       = new FuncionesHelpers();
                  $parametros = array(
                    $format->esNumeroCero($id),
                                $nombres,
                                $apellidos,
                                $dni,
                                $telefono,
                                $correo,
                                $hijos
                            );
            }else{
                  $parametros = array(
                    $request->getPost('idapo'),
                    $nombres = $request->getPost('nombres'),
                    $apellidos = $request->getPost('apellidos'),
                    $dni = $request->getPost('dni'),
                    $telefono = $request->getPost('telefono'),
                    $correo = $request->getPost('correo'),
                    $hijos = '[]'
                  );
                }
            $jsonData = Apoderado::guardarapoderado($parametros);
        }

        $response->setContentType('application/json', 'UTF-8');
        $response->setContent(json_encode($jsonData[0], JSON_NUMERIC_CHECK));
        return $response;
    }

    public function listarhijosAction()
    {
         $request        = new Phalcon\Http\Request();
         $response       = new \Phalcon\Http\Response();
         if($request->isGet() ==true)
         {

             $id        = $request->get('idapoderado');
             $format     = new FuncionesHelpers();
             $parametros = array($format->esNumeroCero($id));
             $jsonData   = Apoderado::listarhijos($parametros);


             $response->setContentType('application/json', 'UTF-8');
             $response->setContent($jsonData);
             return $response;
         }
    }

      public function buscarninoAction()
    {
         $request        = new Phalcon\Http\Request();
         $response       = new \Phalcon\Http\Response();
         if($request->isGet() ==true)
         {

             $nombresapellidos    = $request->get('nombresapellidos');
             if(strlen($nombresapellidos) == 0) $nombresapellidos='';
             $format     = new FuncionesHelpers();
             $parametros = array( $nombresapellidos );
             $jsonData   = Apoderado::buscarnino($parametros);

             $response->setContentType('application/json', 'UTF-8');
             $response->setContent($jsonData);
             return $response;
         }
    }
     public function buscarninomembresiaAction()
    {
         $request        = new Phalcon\Http\Request();
         $response       = new \Phalcon\Http\Response();
         if($request->isGet() ==true)
         {

             $nombresapellidos    = $request->get('nombresapellidos');
             if(strlen($nombresapellidos) == 0) $nombresapellidos='';
             $format     = new FuncionesHelpers();
             $parametros = array( $nombresapellidos );
             $jsonData   = Apoderado::buscarninomembresia($parametros);

             $response->setContentType('application/json', 'UTF-8');
             $response->setContent($jsonData);
             return $response;
         }
    }

     public function guardarahijoAction()
    {
        $request        = new Phalcon\Http\Request();
        $response       = new \Phalcon\Http\Response();
        if($request->isPost() ==true)
        {
            $id        = $request->getPost('id');
            $nombres   = $request->getPost('nombres');
            $apellidos = $request->getPost('apellidos');
            $edad      = $request->getPost('edad');
            $dni       = $request->getPost('dni');
            $idapoderado       = $request->getPost('idapoderado');
            $fechanacimiento   = $request->getPost('fechanaci');

            $fechadesde   = $request->getPost('membresiadesde');
            $fechahasta   = $request->getPost('membresiahasta');

            $format    = new FuncionesHelpers();
            $parametros= array($format->esNumeroCero($id),
                                $nombres,
                                $apellidos,
                                $format->esNumeroCero($edad),
                                $dni,
                                $idapoderado,
                                $fechanacimiento
                            );

            $jsonData = Apoderado::guardarhijo($parametros);
        }

        $response->setContentType('application/json', 'UTF-8');
        $response->setContent(json_encode($jsonData[0], JSON_NUMERIC_CHECK));
        return $response;
    }
     public function guardarahijo2Action()
    {
        $request        = new Phalcon\Http\Request();
        $response       = new \Phalcon\Http\Response();
        if($request->isPost() ==true)
        {
            $id        = $request->getPost('id');
            $nombres   = $request->getPost('nombres');
            $apellidos = $request->getPost('apellidos');
            $edad      = $request->getPost('edad');
            $dni       = $request->getPost('dni');
            $idapoderado       = $request->getPost('idapoderado');
            $fechanacimiento   = $request->getPost('fechanaci');
            $membresiadesde    = $request->getPost('membresiadesde');
            $membresiahasta    = $request->getPost('membresiahasta');
            $idmembre    = $request->getPost('idmembre');

            $format    = new FuncionesHelpers();

            if($membresiadesde!='' && $membresiahasta!=''){
              $parametros= array($format->esNumeroCero($id),
                                  $nombres,
                                  $apellidos,
                                  $format->esNumeroCero($edad),
                                  $dni,
                                  $idapoderado,
                                  $format->esCadenaNulo($fechanacimiento),
                                  $format->esCadenaNulo($membresiadesde),
                                  $format->esCadenaNulo($membresiahasta),
                                  $format->esNumeroCero($idmembre),
                              );
            }else{
              $parametros= array($format->esNumeroCero($id),
                                  $nombres,
                                  $apellidos,
                                  $format->esNumeroCero($edad),
                                  $dni,
                                  $idapoderado,
                                  $format->esCadenaNulo($fechanacimiento)
                              );
            }


            $jsonData = Apoderado::guardarhijomembresia($parametros);
        }

        $response->setContentType('application/json', 'UTF-8');
        $response->setContent(json_encode($jsonData[0], JSON_NUMERIC_CHECK));
        return $response;
    }
    public function eliminarhijoAction()
    {
        $request        = new Phalcon\Http\Request();
        $response       = new \Phalcon\Http\Response();
        if($request->isPost() ==true)
        {
            $id        = $request->getPost('id');

            $format    = new FuncionesHelpers();
            $parametros= array($format->esNumeroCero($id) );
            $jsonData = Apoderado::eliminarhijo($parametros);
        }

        $response->setContentType('application/json', 'UTF-8');
        $response->setContent(json_encode($jsonData[0], JSON_NUMERIC_CHECK));
        return $response;
    }

    public function ninostodosAction()
  {
       $request        = new Phalcon\Http\Request();
       $response       = new \Phalcon\Http\Response();
       if($request->isGet() ==true)
       {

           $format     = new FuncionesHelpers();
           $parametros = array();
           $jsonData   = Apoderado::ninostodos($parametros);

           $response->setContentType('application/json', 'UTF-8');
           $response->setContent(json_encode($jsonData,JSON_NUMERIC_CHECK));
           return $response;
       }
  }
  public function bajamembresiaAction()
  {
      $request        = new Phalcon\Http\Request();
      $response       = new \Phalcon\Http\Response();
      if($request->isPost() ==true)
      {
          $id        = $request->getPost('id');

          $format    = new FuncionesHelpers();
          $parametros= array($format->esNumeroCero($id) );
          $jsonData = Apoderado::bajaMembresia($parametros);
      }

      $response->setContentType('application/json', 'UTF-8');
      $response->setContent(json_encode($jsonData[0], JSON_NUMERIC_CHECK));
      return $response;
  }



}
