<?php

use Phalcon\Mvc\Model;
use Phalcon\Mvc\Model\Resultset\Simple as Resultset;

class Seguridad extends \Phalcon\Mvc\Model
{
    /*
    @@ Menu del Sistema por Usuario
    */
    public static function LoginMenu($usuario)
    {
        $param   = array($usuario);
        $sql     = "SELECT * FROM seguridad.sp_login_menu(?)";
        $reporte = new Seguridad();
        $data    = $reporte->getReadConnection()->query($sql,$param)->fetch();
        return $data[0];
    }

    /*
    @@ Validar si la mesa puede ser atendida
    */
    public static function mesaReservada($data)
    {
      $obj     = new SQLHelpers();
      $param   = $data;
      $sql     =  $obj->executar('public','sp_mesa_esta_reservada',$param);
      return $sql;
    }
    public static function mesaReservar($data)
    {
      $obj     = new SQLHelpers();
      $param   = $data;
      $sql     =  $obj->executar('public','sp_reseva_mesa',$param);
      return $sql;
    }

}
