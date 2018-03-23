<?php
/**
 * Services are globally registered in this file
 *
 * @var \Phalcon\Config $config
 */

use Phalcon\Di\FactoryDefault;
use Phalcon\Mvc\View;
use Phalcon\Mvc\Url as UrlResolver;
use Phalcon\Mvc\View\Engine\Volt as VoltEngine;
use Phalcon\Mvc\Model\Metadata\Memory as MetaDataAdapter;
use Phalcon\Session\Adapter\Files as SessionAdapter;
use Phalcon\Flash\Direct as Flash;
use Phalcon\Mvc\Router as Router;

/**
 * The FactoryDefault Dependency Injector automatically register the right services providing a full stack framework
 */
$di = new FactoryDefault();

/**
 * The URL component is used to generate all kind of urls in the application
 */
$di->setShared('url', function () use ($config) {
    $url = new UrlResolver();
    $url->setBaseUri($config->application->baseUri);

    return $url;
});

/**
 * Setting up the view component
 */
$di->setShared('view', function () use ($config) {

    $view = new View();

    $view->setViewsDir($config->application->viewsDir);

    $view->registerEngines(array(
        '.volt' => function ($view, $di) use ($config) {

            $volt = new VoltEngine($view, $di);

            $volt->setOptions(array(
                'compiledPath' => $config->application->cacheDir,
                'compiledSeparator' => '_'
            ));

            return $volt;
        },
        '.phtml' => 'Phalcon\Mvc\View\Engine\Php'
    ));

    return $view;
});

/**
 * Database connection is created based in the parameters defined in the configuration file
 */
$di->setShared('db', function () use ($config) {
    $dbConfig = $config->database->toArray();
    $adapter = $dbConfig['adapter'];
    unset($dbConfig['adapter']);

    $class = 'Phalcon\Db\Adapter\Pdo\\' . $adapter;

    return new $class($dbConfig);
});

/**
 * If the configuration specify the use of metadata adapter use it or use memory otherwise
 */
$di->setShared('modelsMetadata', function () {
    return new MetaDataAdapter();
});

/**
 * Register the session flash service with the Twitter Bootstrap classes
 */
$di->set('flash', function () {
    return new Flash(array(
        'error'   => 'alert alert-danger',
        'success' => 'alert alert-success',
        'notice'  => 'alert alert-info',
        'warning' => 'alert alert-warning'
    ));
});

/**
 * Start the session the first time some component request the session service
 */
$di->setShared('session', function () {
    $session = new SessionAdapter();
    $session->start();
    return $session;
});

/************************************************************
@@ Rutas
*************************************************************/
$di->set('router',function() {

    $router = new Router();
    /*
    | @@ Controlador Seguridad
    */
    $router->add('/usuario_menu', array('controller'=>'seguridad','action'=>'usuariomenu'));

    /*
    | @@ Controlador Mantenimiento
    */
    $router->add('/categoria_lista'     , array('controller'=>'producto','action'=>'categorias'));
    $router->add('/subcategoria_lista'  , array('controller'=>'producto','action'=>'subcategorias'));
    $router->add('/formapago_lista'     , array('controller'=>'producto','action'=>'formapago'));
    // @Lista solo servicios
    $router->add('/producto_lista'      , array('controller'=>'producto','action'=>'listar')); 
    $router->add('/personal_lista'      , array('controller'=>'persona','action'=>'listar'));
    $router->add('/producto_eliminar'      , array('controller'=>'producto','action'=>'eliminarproducto'));
    

    /*
    |  @@ Controlador de Procedos
    */
    $router->add('/venta_guardar'         , array('controller'=>'venta','action'=>'guardar'));
    $router->add('/producto_guardar'      , array('controller'=>'producto','action'=>'guardarproducto'));
    $router->add('/control_ninos'         , array('controller'=>'venta','action'=>'controlninos'));
    $router->add('/venta_anular'         , array('controller'=>'venta','action'=>'anularventa'));
    $router->add('/gasto_guardar'         , array('controller'=>'venta','action'=>'actualizargasto'));
    $router->add('/gastos_listar'         , array('controller'=>'venta','action'=>'listargastos'));
    $router->add('/gastos_eliminar'       , array('controller'=>'venta','action'=>'eliminargasto'));
    $router->add('/gastos_exportar'       , array('controller'=>'impresion','action'=>'exportarexcelgastos'));


    //$router->add('/venta_anular'         , array('controller'=>'venta','action'=>'anularventa'));


    /*
    |  @@ Controlador de Listados
    */
    $router->add('/pedidos_listado'         , array('controller'=>'venta','action'=>'listarcaja'));
    $router->add('/pedido_detalle'         , array('controller'=>'venta','action'=>'detallepedido'));
    $router->add('/ventas_sumatoria'         , array('controller'=>'venta','action'=>'totalventacaja'));

    /*
    |  @@ Controlador de Clientes
    */
    $router->add('/cliente_listado'         , array('controller'=>'cliente','action'=>'listar'));
    $router->add('/cliente_guardar'         , array('controller'=>'cliente','action'=>'guardarcliente'));
    $router->add('/cliente_eliminar'         , array('controller'=>'cliente','action'=>'anularcliente'));

    /*
    |  @@ Controlador Seguridad
    */
    $router->add('/mesa_validar_atension'  , array('controller'=>'venta','action'=>'estadomesa'));
    $router->add('/mesa_registrar_reserva' , array('controller'=>'venta','action'=>'reservarmesa'));

    /*
    |  @@ Controlador de Impresiones
    */
    $router->add('/imprimirtkbol'      , array('controller'=>'impresion','action'=>'imprimirboleta'));
    $router->add('/imprimirventasdiarias'      , array('controller'=>'impresion','action'=>'reportecaja'));
    $router->add('/exportarventasdiarias'      , array('controller'=>'impresion','action'=>'exportarexcel'));
    $router->add('/exportarpadreshijos'      , array('controller'=>'impresion','action'=>'exportarexcelpadreshijos'));
    $router->add('/exportarmembresias'      , array('controller'=>'impresion','action'=>'exportarexcelsolomembresia'));

    /*
    |  @@ Controlador de Locales
    */
    $router->add('/locales_listado'         , array('controller'=>'local','action'=>'listar'));
    $router->add('/local_actualizar'         , array('controller'=>'local','action'=>'guardar'));

    /*
    |  @@ Controlador de Apoderados
    */
    $router->add('/apoderado_listado'         , array('controller'=>'apoderado','action'=>'listarapoderado'));
    $router->add('/apoderado_guardar'         , array('controller'=>'apoderado','action'=>'guardarapoderado'));
  //  $router->add('/hijos:listar'         , array('controller'=>'apoderado','action'=>'listarhijos'));
    $router->add('/ninos_buscar'         , array('controller'=>'apoderado','action'=>'buscarnino'));
    $router->add('/ninos_buscar_membresia'         , array('controller'=>'apoderado','action'=>'buscarninomembresia'));
    $router->add('/nino_guardar'         , array('controller'=>'apoderado','action'=>'guardarahijo'));
    $router->add('/nino_guardar2'         , array('controller'=>'apoderado','action'=>'guardarahijo2'));
    $router->add('/nino_eliminar'         , array('controller'=>'apoderado','action'=>'eliminarhijo'));
    $router->add('/ninos_todos'         , array('controller'=>'apoderado','action'=>'ninostodos'));
    $router->add('/apoderado_todos'         , array('controller'=>'apoderado','action'=>'listarapoderadotodos'));
    $router->add('/membresia_baja'         , array('controller'=>'apoderado','action'=>'bajamembresia'));

    /*
    |  @@ Controlador de Configuraciones
    */
    $router->add('/config_guardar'         , array('controller'=>'configuracion','action'=>'guardar'));
    $router->add('/mostrar_config'         , array('controller'=>'configuracion','action'=>'mostrarconfig'));
    $router->add('/valid_admin'         , array('controller'=>'configuracion','action'=>'validarclaveadmin'));
    


    return $router;
});
