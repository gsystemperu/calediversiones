<?php

 	class FuncionesHelpers 
 	{

 		public function esCadenaNulo($objeto) 
 		{
		    if (!empty($objeto)) {
		        $retorna = $objeto;
		        $retorna = "'" . str_replace("'", "''", $retorna) . "'";
		        $retorna = stripslashes($retorna);
		        return $retorna;
		    }
		    return "NULL";
		}

		public function esNumeroNulo($objeto) {
		    if (!empty($objeto) && trim($objeto) != "") {
		        return $objeto;
		    }
		    return "NULL";
		}

		public function esNumeroCero($objeto) {
		    if (!empty($objeto) && trim($objeto) != "") {
		        return $objeto;
		    }
		    return "0";
		}
		public function formarNumero($objeto){
			if (!empty($objeto) && trim($objeto) != "") {
		        return number_format($objeto, 2, '.', '');
		    }
		}
		public function cambiarSimbolo($obeto){
			if (!empty($objeto) && trim($objeto) != "") {
				$objeto = (string) $objeto;
		        return  str_replace(",", ".", $objeto); 
		    }
			
		}


 	}






