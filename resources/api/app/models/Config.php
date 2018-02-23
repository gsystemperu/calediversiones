<?php

use Phalcon\Mvc\Model;
use Phalcon\Mvc\Model\Resultset\Simple as Resultset;

class Config extends \Phalcon\Mvc\Model
{
    public static function datosimpresora($data)
    {

        $obj     = new SQLHelpers();
        $param   = $data;
        $sql     = $obj->executar('public','sp_configuracion',$param);
        return $sql;
    }

    public static function guardar($data)
    {
        $obj     = new SQLHelpers();
        $param   = $data;
        $sql     = $obj->executar('public','sp_configuracion_actualizar',$param);
        return $sql;
    }

    public static function mostrar()
    {
        $obj     = new SQLHelpers();
        $param   = array();
        $sql     = $obj->executarJSON('public','sp_config_mostrar',$param);
        return $sql;
    }

    

}
