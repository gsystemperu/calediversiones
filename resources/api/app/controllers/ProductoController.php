<?php
use \Phalcon\Mvc\Controller as Controller;

class ProductoController extends Controller
{
    public function initialize(){$this->view->disable(); }

    public function categoriasAction(){
         $request        = new Phalcon\Http\Request();
         $response       = new \Phalcon\Http\Response();
         if($request->isGet() ==true)
         {
              $jsonData = Categoria::listar();
              $response->setContentType('application/json', 'UTF-8');
              $response->setContent($jsonData);
              return $response;
         }
    }
    public function subcategoriasAction(){
         $request        = new Phalcon\Http\Request();
         $response       = new \Phalcon\Http\Response();
         if($request->isGet() ==true)
         {
              $idcategoria          = $request->get('idcategoria');
              $idsubcategoria       = $request->get('idsubcategoria');
              $helper      = new FuncionesHelpers();
              $data = array(
                   $helper->esNumeroCero($idcategoria),
                   $helper->esNumeroCero($idsubcategoria)
              );
              $jsonData = SubCategoria::listar($data);
              $response->setContentType('application/json', 'UTF-8');
              $response->setContent($jsonData);
              return $response;
         }
    }

    public function listarAction(){
         $request        = new Phalcon\Http\Request();
         $response       = new \Phalcon\Http\Response();
         if($request->isGet() ==true)
         {
              $categoria = $request->get('idcategoria');
              $data      = array($categoria,0);
              if($categoria!='')
                $jsonData  = Producto::listarPorCategoria($data);
              else
                $jsonData  = Producto::listar();

              $response->setContentType('application/json', 'UTF-8');
              $response->setContent($jsonData);
              return $response;
         }
    }

     public function formapagoAction(){
         $request        = new Phalcon\Http\Request();
         $response       = new \Phalcon\Http\Response();
         if($request->isGet() ==true)
         {
              $jsonData = FormaPago::listar();
              $response->setContentType('application/json', 'UTF-8');
              $response->setContent($jsonData);
              return $response;
         }
    }

    public function guardarproductoAction(){
        $request        = new Phalcon\Http\Request();
        $response       = new \Phalcon\Http\Response();
        $subioImg       = 0 ;

        if ($request->hasFiles() == true )
        {
            $directorio = '../../images/productos/';
            if (!is_dir($directorio))
            {
              mkdir($directorio, 0755);
            }
           foreach ($request->getUploadedFiles() as $file)
           {
              if($file->getSize()){
                $subioImg = 1;
              }
           }
         }

         if($request->isPost()==true)
         {
           $idprod        = $request->getPost('idprod');
           $nombre        = $request->getPost('nombre');
           $idcate        = $request->getPost('idcate');
           $idsubcate     = $request->getPost('idsubcate');
           $preciocompra  = $request->getPost('preciocompra');
           $precioventa   = $request->getPost('precioventa');
           $stockactual   = $request->getPost('stock');
           $manejastock   = ($request->getPost('manejastock')=='on'?1:0);
           $minutos       = $request->getPost('minutos');
           $orden         = $request->getPost('orden');

           $format       = new FuncionesHelpers();
           $data = array(
              $format->esNumeroCero( $idprod),
              $nombre  ,
              $format->esNumeroCero($idcate),
              $format->esNumeroCero($idsubcate),
              $format->esNumeroCero($preciocompra),
              $format->esNumeroCero($precioventa),
              $format->esNumeroCero($manejastock),
              $format->esNumeroCero($stockactual),
              $subioImg,
              $minutos,$orden
            );
           $jsonData = Producto::actualizar($data);
           $idproducto = $jsonData[0]["error"];
           if($subioImg == 1){
                $directorio = '../../images/productos/';
                foreach ($request->getUploadedFiles() as $file)
                {

                   if($file->getSize())
                   {
                     if( file_exists($directorio.$idproducto.".jpg") )
                     {
                       unlink($directorio.$idproducto.".jpg");
                     }
                     $file->moveTo($directorio . $idproducto.".jpg");
                   }
                }
           }
           $response->setContentType('application/json', 'UTF-8');
           $response->setContent(json_encode($jsonData[0], JSON_NUMERIC_CHECK));
           return $response;




       }

    }


}