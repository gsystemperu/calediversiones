<?php

use Phalcon\Mvc\Model;
use Phalcon\Mvc\Model\Resultset\Simple as Resultset;

class Persona extends \Phalcon\Mvc\Model
{
    public static function Listar()
    {
        $obj     = new SQLHelpers();
        $param   = array();
        $sql     =  $obj->executarJson('public','sp_empleado_listar',$param);
        return $sql;
    }

}
