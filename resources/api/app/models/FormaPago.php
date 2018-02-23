<?php

use Phalcon\Mvc\Model;
use Phalcon\Mvc\Model\Resultset\Simple as Resultset;

class FormaPago extends \Phalcon\Mvc\Model
{
    public static function listar()
    {
        $obj     = new SQLHelpers();
        $param   = array();
        $sql     =  $obj->executarJson('public','sp_forma_pago_listar',$param);
        return $sql;
    }
   

}
