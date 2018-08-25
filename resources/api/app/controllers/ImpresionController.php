<?php

use \Phalcon\Mvc\Controller as Controller;
class ImpresionController extends Controller
{

    public function initialize(){$this->view->disable(); }
    public function imprimirboletaAction($vidventa)
    {

      $request    = new Phalcon\Http\Request();
      $dataC = array(1);
      $dataV = array($vidventa);
      $DatosImpresora = Config::datosimpresora($dataC);
      
      $DetalleVenta   = Venta::detalleventaimpresion($dataV);
      $DatosCliente        = Venta::datoscliente($dataV);
      
      $DatosImpresora = $DatosImpresora[0];
      $DatosCliente = $DatosCliente[0];
      $pdf = new fpdf('P');
      $borde = 0;
      $pdf->SetMargins(0, 0 , 0);
      $pdf->AddPage();
      //$pdf->setXY(6, 5);
      $pdf->setFont("Arial", "B", 12);
      $pdf->Cell(85, 4,$DatosImpresora['_nombreimpresion'], $borde, 2, "C");
      $pdf->setFont("Arial", "", 7);
      $pdf->MultiCell(85, 3, $DatosImpresora["_direccion"], $borde, "C");
      $pdf->setFont("Arial", "", 7);
      $pdf->setX(6.5);
      $pdf->Cell(10, 4,"R.U.C : ", $borde, 0, "C");
      $pdf->setFont("Arial", "", 8);
      $pdf->Cell(65, 4, $DatosImpresora['_ruc'], $borde, 2, "L");
      $pdf->setX(8.5);
      $pdf->Cell(10,3.5,"Telefonos :",$borde,0,"C");
      $pdf->setX(6);
      $pdf->Cell(80,3.5,"310 5569 - 950 621 806 ",0,1,"C");
    $pdf->setX(7);
    $pdf->setFont("Arial","",7);
    $pdf->Cell(35, 3.5, "AUTORIZACION #MAQ. REG. : ", $borde, 0, "C");
    $pdf->setFont("Arial", "", 8);
    $pdf->Cell(65, 3.5, $DatosImpresora["_codigoimpresora"], $borde, 2, "L");
    $pdf->ln(1);
    $pdf->setX(6);
    $pdf->setFont("Arial", "", 7);
    $pdf->Cell(38,4, "DESCRIPCION", $borde, 0, "L");
    $pdf->Cell(7, 4, "CANT", $borde, 0, "L");
    $pdf->Cell(10,4, "P.UNI.", $borde, 0, "R");
    $pdf->Cell(10,4, "IMP.", $borde, 2, "R");
    $pdf->setX(6);
    $pdf->Cell(80, 1, "-------------------------------------------------------------------------------------------------", $borde, 2, "L");
    //$pdf->Ln(5);
    $totalventa = 0;
    foreach ($DetalleVenta as $row) {
        $pdf->setX(6);
        $pdf->setFont("Arial", "", 7);
        $pdf->MultiCell(65, 4, $row["_producto"], $borde, "L");
        $pdf->setX(36);
        $pdf->setFont("Arial", "", 10);
        $pdf->Cell(7, 5, $row["_cantidad"], $borde, 0, "R");
        $pdf->Cell(14, 5, number_format($row["_precio"], 2, ".", ","), $borde, 0, "R");
        $pdf->Cell(14, 5, number_format($row["_total"] , 2, ".", ","), $borde, 1, "R");
        $totalventa = $totalventa + $row["_total"];
    }

    $pdf->Ln(5);
      $pdf->setX(42);
      $pdf->setFont("Arial", "", 9);
      $pdf->Cell(15, 5, "SubTotal :", $borde, 0, "L");
      $pdf->setFont("Arial", "", 10);
      $pdf->Cell(14, 5, number_format($totalventa, 2, ".", ","), $borde, 2, "R");
      $pdf->setX(42);
      $pdf->setFont("Arial", "", 9);
      $pdf->Cell(15, 5, "IGV :", $borde, 0, "L");
      $pdf->setFont("Arial", "", 10);
      $pdf->Cell(14, 5, number_format(0, 2, ".", ","), $borde, 2, "R");
      $pdf->setX(42);
      $pdf->setFont("Arial", "", 9);
      $pdf->Cell(15, 5, "Total :", $borde, 0, "L");
      $pdf->setFont("Arial", "", 10);
      $pdf->Cell(14, 5, number_format($totalventa + 0, 2, ".", ","), $borde, 2, "R");
      $pdf->setX(6);
      $pdf->Cell(80, 5, "----------------------------------------------------------------------", $borde, 2, "L");
      $pdf->setFont("Arial", "", 9);
      $pdf->Cell(20, 5, "Cliente : ", $borde, 0, "L");
      $pdf->setFont("Arial", "", 10);
      $pdf->Cell(65, 5, $DatosCliente["_cliente"], $borde, 2, "L");
      $pdf->setX(6);
      $pdf->setFont("Arial", "B", 8);
      $pdf->MultiCell(80, 5, "GRACIAS POR SU VISITA VUELVA PRONTO !!.", 0, "C");
      $pdf->Ln(3);
      $pdf->output();
    }

    public function reportecajaAction(){
        $request  = new Phalcon\Http\Request();
        $desde    = $request->get('desde');
        $hasta    = $request->get('hasta');
        $idlocal  = $request->get('idlocal');
        $data   = array($desde,$hasta,$idlocal);
        $pdf = new fpdf('P');
        $pdf->SetDisplayMode('fullwidth');
        $pdf->SetXY(15,7);
        $pdf->Ln();
        //$pdf->SetTextColor(255,255,255);
        //$pdf->SetFillColor(0, 0, 255);
        $pdf->AddPage();
        $pdf->SetFont('courier','B',13);

        $pdf->Cell(0,5,'REPORTE DE VENTAS DIARIAS',0,1,'C');
        $pdf->Ln();
        $pdf->SetFont('courier','B',8);

        $pdf->Cell(10,7,'Nro.',1,0,'C');
        $pdf->Cell(50,7,'LOCAL',1,0,'C');
        $pdf->Cell(25,7,'FECHA HORA',1,0,'C');
        $pdf->Cell(70,7,'CLIENTE',1,0,'C');
        $pdf->Cell(15,7,'TOTAL',1,0,'C');
        $pdf->Cell(20,7,'ESTADO',1,0,'C');
        $pdf->Ln();
        $pdf->SetFont('courier','',8);
        $jsonData  = json_decode(Venta::listadopedidoscaja($data));
        $i = 1;
        $total = 0;
        $anulados = 0;
        $totanulados=0;
        foreach($jsonData->data as $mydata)
        {
          $pdf->SetFont('courier','',7);
          $pdf->Cell(10,5,$i++,1,0,'C');
          $pdf->Cell(50,5,$mydata->milocal,1,0,'L');
          $pdf->Cell(25,5,$mydata->fechaventa,1,0,'C');
          $pdf->Cell(70,5, utf8_decode( $mydata->cliente),1,0,'L');
          $pdf->Cell(15,5,number_format($mydata->totalventa, 2, '.', ' '),1,0,'R');
          $pdf->Cell(20,5,$mydata->estadopagostr,1,1,'C');
          $total +=  $mydata->totalventa;
          if($mydata->estadopagostr=='ANULADO')
           {
             $anulados +=1;
             $totanulados += $mydata->totalventa;
           }
        }
        $pdf->Ln();
        $pdf->SetFont('courier','B',8);
        $pdf->Cell(40,5,'Conteno Atenciones ',1,0,'L');
        $pdf->Cell(20,5,$i-1,1,1,'C');
        $pdf->Cell(40,5,'Anulados ',1,0,'L');
        $pdf->Cell(20,5,$anulados,1,1,'C');
        $pdf->Cell(40,5,'Pagados  ',1,0,'L');
        $pdf->Cell(20,5,($i-1)-$anulados,1,1,'C');
        $pdf->Cell(40,5,'Total Vendido ',1,0,'L');
        $pdf->Cell(20,5, number_format( $total - $totanulados, 2, '.', ' '),1,1,'C');
        $pdf->Cell(40,5,'Total Ganado',1,0,'L');
        $pdf->Cell(20,5,number_format( ($total - $totanulados), 2, '.', ' '),1,1,'C');
        $pdf->Ln(10);
        $pdf->Output();
    }
    public function exportarexcelAction()
    {
      $request     = new Phalcon\Http\Request();
      $response    = new \Phalcon\Http\Response();
      $objPHPExcel = new PHPExcel();
      $objPHPExcel = PHPExcel_IOFactory::load("./files/rptpc.xlsx");
      $objPHPExcel->setActiveSheetIndex(0);

      $desde    = $request->get('desde');
      $hasta    = $request->get('hasta');
      $idlocal  = $request->get('idlocal');
      $data     = array($desde,$hasta,$idlocal);

      $jsonData  = json_decode(Venta::listadopedidoscaja($data));

      $index = 4;
      $i     = 1;
      $total = 0;
      $totanulado = 0;
      foreach ($jsonData->data as $item) {
          $objPHPExcel->getActiveSheet()->setCellValue('A'.$index, $i++);
          $objPHPExcel->getActiveSheet()->setCellValue('B'.$index, $item->milocal);
          $objPHPExcel->getActiveSheet()->setCellValue('C'.$index, $item->fechaventa);
          $objPHPExcel->getActiveSheet()->setCellValue('D'.$index, utf8_decode( $item->cliente));
          $objPHPExcel->getActiveSheet()->setCellValue('E'.$index, $item->totalventa);
          $objPHPExcel->getActiveSheet()->setCellValue('F'.$index, $item->estadopagostr);
          $index++;
          if($item->estadopagostr!='ANULADO')
              $total = $total + $item->totalventa;
           if(trim($item->estadopagostr)=='ANULADO')
              $totanulado = $totanulado + $item->totalventa;
      }
      $objPHPExcel->getActiveSheet()->setCellValue('E'.$index, 'Total');
      $objPHPExcel->getActiveSheet()->setCellValue('F'.$index, ($total));

      // file name to output
      $fname = date("Ymd_his") . ".xlsx";
      // temp file name to save before output

      $temp_file = tempnam(sys_get_temp_dir(), 'phpexcel');
      //$temp_file = tempnam('/var/www/html/tmp', 'phpexcel');

      $objWriter = new PHPExcel_Writer_Excel2007($objPHPExcel);

      $objWriter->save($temp_file);

      $response->setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
      $response->setHeader('Content-Disposition', 'attachment;filename="' . $fname . '"');
      $response->setHeader('Cache-Control', 'max-age=0');
      $response->setHeader('Cache-Control', 'max-age=1');
      $response->setContent(file_get_contents($temp_file));
      unlink($temp_file);
      return $response;
    }

    public function exportarexcelpadreshijosAction()
    {
      $request     = new Phalcon\Http\Request();
      $response    = new \Phalcon\Http\Response();
      $objPHPExcel = new PHPExcel();
      $objPHPExcel = PHPExcel_IOFactory::load("./files/rptpapas.xlsx");
      $objPHPExcel->setActiveSheetIndex(0);
      $data        = array();
      $jsonData    = json_decode(Cliente::listadopadrehijos($data));

      $index = 4;
      $i     = 1;
      $total = 0;
      foreach ($jsonData->data as $item) {
          $objPHPExcel->getActiveSheet()->setCellValue('A'.$index, $i++);
          $objPHPExcel->getActiveSheet()->setCellValue('B'.$index,  $item->padre);
          $objPHPExcel->getActiveSheet()->setCellValue('C'.$index, $item->dni);
          $objPHPExcel->getActiveSheet()->setCellValue('D'.$index, $item->telefono);
          $objPHPExcel->getActiveSheet()->setCellValue('E'.$index, $item->correo);
          $objPHPExcel->getActiveSheet()->setCellValue('F'.$index, $item->nino);
          $objPHPExcel->getActiveSheet()->setCellValue('G'.$index, $item->fechanaci);
          if($item->edad_calculado=='')
              $objPHPExcel->getActiveSheet()->setCellValue('H'.$index, $item->edad);
          else
              $objPHPExcel->getActiveSheet()->setCellValue('H'.$index, $item->edad_calculado);

          $objPHPExcel->getActiveSheet()->setCellValue('I'.$index, $item->memdesde);
          $objPHPExcel->getActiveSheet()->setCellValue('J'.$index, $item->memhasta);
          $index++;

      }
      // file name to output
      $fname = date("Ymd_his") . ".xlsx";
      // temp file name to save before output

      $temp_file = tempnam(sys_get_temp_dir(), 'phpexcel');
      //$temp_file = tempnam('/var/www/html', 'phpexcel');

      $objWriter = new PHPExcel_Writer_Excel2007($objPHPExcel);

      $objWriter->save($temp_file);

      $response->setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
      $response->setHeader('Content-Disposition', 'attachment;filename="' . $fname . '"');
      $response->setHeader('Cache-Control', 'max-age=0');
      $response->setHeader('Cache-Control', 'max-age=1');
      $response->setContent(file_get_contents($temp_file));
      unlink($temp_file);
      return $response;
    }

    public function exportarexcelsolomembresiaAction()
    {
      $request     = new Phalcon\Http\Request();
      $response    = new \Phalcon\Http\Response();
      $objPHPExcel = new PHPExcel();
      $objPHPExcel = PHPExcel_IOFactory::load("./files/rptninosmembresia.xlsx");
      $objPHPExcel->setActiveSheetIndex(0);
      $data        = array();
      $jsonData    = json_decode(Apoderado::listaSoloNinosMembresia($data));
      //ECHO "AAAAA";die();
      $index = 4;
      $i     = 1;
      $total = 0;
      foreach ($jsonData->data as $item) {
          $objPHPExcel->getActiveSheet()->setCellValue('A'.$index, $i++);
          $objPHPExcel->getActiveSheet()->setCellValue('B'.$index, $item->padre);
          $objPHPExcel->getActiveSheet()->setCellValue('C'.$index, $item->telefono);
          $objPHPExcel->getActiveSheet()->setCellValue('D'.$index, $item->correo);
          $objPHPExcel->getActiveSheet()->setCellValue('E'.$index, $item->nino);
          $objPHPExcel->getActiveSheet()->setCellValue('F'.$index, $item->edad);
          $objPHPExcel->getActiveSheet()->setCellValue('G'.$index, $item->membresiadesde);
          $objPHPExcel->getActiveSheet()->setCellValue('H'.$index, $item->membresiahasta);
          $index++;

      }
      // file name to output
      $fname = date("Ymd_his") . ".xlsx";
      // temp file name to save before output

      $temp_file = tempnam(sys_get_temp_dir(), 'phpexcel');
      //$temp_file = tempnam('/var/www/html', 'phpexcel');

      $objWriter = new PHPExcel_Writer_Excel2007($objPHPExcel);

      $objWriter->save($temp_file);

      $response->setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
      $response->setHeader('Content-Disposition', 'attachment;filename="' . $fname . '"');
      $response->setHeader('Cache-Control', 'max-age=0');
      $response->setHeader('Cache-Control', 'max-age=1');
      $response->setContent(file_get_contents($temp_file));
      unlink($temp_file);
      return $response;
    }

    public function exportarexcelgastosAction()
    {
      $request     = new Phalcon\Http\Request();
      $response    = new \Phalcon\Http\Response();
      $objPHPExcel = new PHPExcel();
      $objPHPExcel = PHPExcel_IOFactory::load("./files/rptgastos.xlsx");
      $objPHPExcel->setActiveSheetIndex(0);
      $desde     = $request->get('desde');
      $hasta     = $request->get('hasta');
      $format    = new FuncionesHelpers();
      if($desde){
          $data      = array($desde,$hasta);
      }else{
          $data      = array();
      }
      $jsonData    = json_decode(Venta::listargasto($data));

      $index = 4;
      $i     = 1;
      $total = 0;
      foreach ($jsonData->data as $item) {
          $objPHPExcel->getActiveSheet()->setCellValue('A'.$index, $i++);
          $objPHPExcel->getActiveSheet()->setCellValue('B'.$index, $item->fecha);
          $objPHPExcel->getActiveSheet()->setCellValue('C'.$index, $item->descripcion);
          $objPHPExcel->getActiveSheet()->setCellValue('D'.$index, $item->montogasto);
          $index++;
      }
      // file name to output
      $fname = date("Ymd_his") . ".xlsx";
      // temp file name to save before output

      $temp_file = tempnam(sys_get_temp_dir(), 'phpexcel');
      //$temp_file = tempnam('/var/www/html', 'phpexcel');

      $objWriter = new PHPExcel_Writer_Excel2007($objPHPExcel);

      $objWriter->save($temp_file);

      $response->setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
      $response->setHeader('Content-Disposition', 'attachment;filename="' . $fname . '"');
      $response->setHeader('Cache-Control', 'max-age=0');
      $response->setHeader('Cache-Control', 'max-age=1');
      $response->setContent(file_get_contents($temp_file));
      unlink($temp_file);
      return $response;
    }
    public function enviarcorreoAction(){
        $mailer = new SimpleMail();
        $request     = new Phalcon\Http\Request();
        $response    = new \Phalcon\Http\Response();
        $id          =  $request->get("id");
        $dataEmpresa =  json_decode(Config::mostrar())->data[0];
        $dataPagos   =  json_decode(Evento::pagos(array($id)));
        $evento      =  json_decode(Evento::buscar(array($id)))->data[0];

        //print_r($evento);die();
        // ========== FPDF ==========  //
        $pdf = new fpdf('P','mm','A4');
        $wg = 100 ;//Ancho total
        $in = 5; //Interlineado
        $font = 'Arial';
        $tam = 10.5;
        $pagos = 0;
        foreach ($dataPagos->data as $item) {
            $pagos += $item->monto; 
        }
        $pdf->AddPage();
        $pdf->SetFont($font,'',$tam);
        $pdf->Ln(1);
        $pdf->Image('../../images/empresa.jpeg', 0, 0, 210,50);
        $pdf->setY(65);
        $pdf->SetFont($font,'B',20);
        $pdf->Cell(186,5,"CONTRATO ",0,0,'C');
        $pdf->SetFont($font,'',$tam);
        $pdf->Ln(10);
        $pdf->Cell(130,5,utf8_decode("Señor   " . $evento->cliente ),0,0,'J');
        $pdf->Cell(0,5,utf8_decode("identificado con el d.n.i. ". $evento->dni),0,1,'J');
        $pdf->Cell(40,5,utf8_decode("Y ". $dataEmpresa->nombreimpresion),0,0,'J');
        $pdf->Cell(45,5,utf8_decode(" con R.U.C.   " . $dataEmpresa->ruc),0,0,'J');
        $pdf->Cell(0,5,utf8_decode("Dirección   " . $dataEmpresa->direccion),0,1,'J');
        $pdf->Cell(0,5,utf8_decode("Acuerdan   celebrar    mediante   el    presente   contrato   de   servicio   conforme   a  las   siguientes   condiciones :"),0,1,'J');
        $pdf->MultiCell(0,5,utf8_decode("Local del evento : " . $evento->direccion),0,'L');
        $pdf->Cell(70,5,utf8_decode("Se realiza el dia  : " . $evento->fecha),0,0,'L');
        $pdf->Cell(50,5,utf8_decode("Hora de inicio  : " . $evento->horainicio),0,0,'L');
        $pdf->Cell(50,5,utf8_decode("Hora de termino : " . $evento->horatermino),0,1,'L');
        $pdf->Ln();
        $pdf->SetFont($font,'B',12);
        $pdf->Cell(0,5,utf8_decode("MONTO TOTAL S/. : ". number_format( $evento->total,2,'.',' ')),0,1,'L');
        $pdf->SetFont($font,'B',12);
        $pdf->Ln();
        $pdf->Cell(0,5,utf8_decode("ADELANTOS   S/. : ". number_format( $pagos,2,'.',' ')),0,1,'L');
        $pdf->Ln(5);
        $pdf->SetFont($font,'B',$tam);
        $pdf->Cell(40,$in,utf8_decode("CONDICIONES DEL SERVICIO"),0,1,'L');
        $pdf->Ln();
        $pdf->SetFont($font,'',$tam);
        $pdf->MultiCell(0,$in,utf8_decode("1.- 20 días antes se deberá adelantar el 50% del total del contrato el cual se cancelara al inicio del evento para la entrega del respectivo uso del local y entrega de la tarjeta virtual temática."),0,'J');
        $pdf->MultiCell(0,$in,utf8_decode("2.- Es obligatorio el uso de zapatitos de doctor para los adultos y medias para los niños."),0,'J');
        $pdf->MultiCell(0,$in,utf8_decode("3.- Contará con el apoyo de 2 Srtas. durante el desarrollo de su evento."),0,'J');
        $pdf->MultiCell(0,$in,utf8_decode("4.- Horario: 1 hora y media antes para realizar decoraciones de su evento el cual se desarrollara en 4 horas teniendo como horario sugerido de 3:30 pm a 9:00 pm."),0,'J');
        $pdf->MultiCell(0,$in,utf8_decode("5.- Pasado el tiempo establecido en el contrato el cliente pagara S/.100.00 por hora"),0,'J');
        $pdf->MultiCell(0,$in,utf8_decode("6.- Está prohibido el uso de pica pica"),0,'J');
        $pdf->MultiCell(0,$in,utf8_decode("7.- Esta prohibió el consumo de bebidas alcohólicas"),0,'J');
        $pdf->MultiCell(0,$in,utf8_decode("8.- Las bebidas deberán ser servidas en un vaso descartable con sorbete y tapita"),0,'J');
        $pdf->MultiCell(0,$in,utf8_decode("9.- La menaje ría, mesas y activos del local son entregados en excelente estado para su uso y si algunos de ellos se dañara durante el desarrollo del evento tendrá que ser cancelado en el momento para su reposición. "),0,'J');
        $pdf->MultiCell(0,$in,utf8_decode("10.- Durante desarrollo de su evento la administración no será responsable del cuidado de artículos personales (celulares, dinero, joyas, carteras entre otros)"),0,'J');
        $pdf->MultiCell(0,$in,utf8_decode("11.- De prescindir del contrato no se devolverá el dinero adelantado, se repondrá en servicios que prestamos por CALE DIVERSIONES"),0,'J');
        $pdf->ln();
        $fila = $pdf->getY();
        $pdf->setXY(30,$fila + 20);
        $pdf->MultiCell(60,5,'____________________________',0,'C');
        $pdf->setXY(120,$fila + 20);
        $pdf->MultiCell(60,5,'____________________________',0,'C');
        $pdf->Ln();
        $fila = $pdf->getY();
        $pdf->setXY(30,$fila );
        $pdf->MultiCell(60,5,'CLIENTE',0,'C');
        $pdf->setXY(120,$fila );
        $pdf->MultiCell(60,5,'CALE DIVERSIONES',0,'C');
        $pdf->Output('temp/contratoevento.pdf','F');
        $mailer = SimpleMail::make()
        ->setTo($evento->correo, $evento->cliente) // para 
        ->setFrom($dataEmpresa->correo, $dataEmpresa->nombreimpresion) // de
        ->setSubject('Contrato de Servicio Cale Diversiones')
        ->setMessage('Le adjunto información de requerimiento.')
        ->setWrap(100)
        ->addAttachment('temp/contratoevento.pdf')
        ->send();
        unlink('temp/contratoevento.pdf');
        $jsonData = array();
        $jsonData["error"] = $mailer;
        $response->setContentType('application/json', 'UTF-8');
        $response->setContent( json_encode($jsonData));
        return $response;
    }
    public function imprimircontratoAction(){
        
        $request     =  new Phalcon\Http\Request();
        $id          =  $request->get("id");
        $dataEmpresa =  json_decode(Config::mostrar())->data[0];
        $dataPagos   =  json_decode(Evento::pagos(array($id)));
        $evento      =  json_decode(Evento::buscar(array($id)))->data[0];
        // ========== FPDF ==========  //
        $pdf = new fpdf('P','mm','A4');
        $wg = 100 ;//Ancho total
        $in = 5; //Interlineado
        $font = 'Arial';
        $tam = 10.5;
        $pagos = 0;
        foreach ($dataPagos->data as $item) {
            $pagos += $item->monto; 
        }
        $pdf->AddPage();
        $pdf->SetFont($font,'',$tam);
        $pdf->Ln(1);
        $pdf->Image('../../images/empresa.jpeg', 0, 0, 210,50);
        $pdf->setY(65);
        $pdf->SetFont($font,'B',20);
        $pdf->Cell(186,5,"CONTRATO ",0,0,'C');
        $pdf->SetFont($font,'',$tam);
        $pdf->Ln(10);
        $pdf->Cell(130,5,utf8_decode("Señor   " . $evento->cliente ),0,0,'J');
        $pdf->Cell(0,5,utf8_decode("identificado con el d.n.i. ". $evento->dni),0,1,'J');
        $pdf->Cell(40,5,utf8_decode("Y ". $dataEmpresa->nombreimpresion),0,0,'J');
        $pdf->Cell(45,5,utf8_decode(" con R.U.C.   " . $dataEmpresa->ruc),0,0,'J');
        $pdf->Cell(0,5,utf8_decode("Dirección   " . $dataEmpresa->direccion),0,1,'J');
        $pdf->Cell(0,5,utf8_decode("Acuerdan   celebrar    mediante   el    presente   contrato   de   servicio   conforme   a  las   siguientes   condiciones :"),0,1,'J');
        $pdf->MultiCell(0,5,utf8_decode("Local del evento : " . $evento->direccion),0,'L');
        $pdf->Cell(70,5,utf8_decode("Se realiza el dia  : " . $evento->fecha),0,0,'L');
        $pdf->Cell(50,5,utf8_decode("Hora de inicio  : " . $evento->horainicio),0,0,'L');
        $pdf->Cell(50,5,utf8_decode("Hora de termino : " . $evento->horatermino),0,1,'L');
        $pdf->Ln();
        $pdf->SetFont($font,'B',12);
        $pdf->Cell(0,5,utf8_decode("MONTO TOTAL S/. : ". number_format( $evento->total,2,'.',' ')),0,1,'L');
        $pdf->SetFont($font,'B',12);
        $pdf->Ln();
        $pdf->Cell(0,5,utf8_decode("ADELANTOS   S/. : ". number_format( $pagos,2,'.',' ')),0,1,'L');
        $pdf->Ln(5);
        $pdf->SetFont($font,'B',$tam);
        $pdf->Cell(40,$in,utf8_decode("CONDICIONES DEL SERVICIO"),0,1,'L');
        $pdf->Ln();
        $pdf->SetFont($font,'',$tam);
        $pdf->MultiCell(0,$in,utf8_decode("1.- 20 días antes se deberá adelantar el 50% del total del contrato el cual se cancelara al inicio del evento para la entrega del respectivo uso del local y entrega de la tarjeta virtual temática."),0,'J');
        $pdf->MultiCell(0,$in,utf8_decode("2.- Es obligatorio el uso de zapatitos de doctor para los adultos y medias para los niños."),0,'J');
        $pdf->MultiCell(0,$in,utf8_decode("3.- Contará con el apoyo de 2 Srtas. durante el desarrollo de su evento."),0,'J');
        $pdf->MultiCell(0,$in,utf8_decode("4.- Horario: 1 hora y media antes para realizar decoraciones de su evento el cual se desarrollara en 4 horas teniendo como horario sugerido de 3:30 pm a 9:00 pm."),0,'J');
        $pdf->MultiCell(0,$in,utf8_decode("5.- Pasado el tiempo establecido en el contrato el cliente pagara S/.100.00 por hora"),0,'J');
        $pdf->MultiCell(0,$in,utf8_decode("6.- Está prohibido el uso de pica pica"),0,'J');
        $pdf->MultiCell(0,$in,utf8_decode("7.- Esta prohibió el consumo de bebidas alcohólicas"),0,'J');
        $pdf->MultiCell(0,$in,utf8_decode("8.- Las bebidas deberán ser servidas en un vaso descartable con sorbete y tapita"),0,'J');
        $pdf->MultiCell(0,$in,utf8_decode("9.- La menaje ría, mesas y activos del local son entregados en excelente estado para su uso y si algunos de ellos se dañara durante el desarrollo del evento tendrá que ser cancelado en el momento para su reposición. "),0,'J');
        $pdf->MultiCell(0,$in,utf8_decode("10.- Durante desarrollo de su evento la administración no será responsable del cuidado de artículos personales (celulares, dinero, joyas, carteras entre otros)"),0,'J');
        $pdf->MultiCell(0,$in,utf8_decode("11.- De prescindir del contrato no se devolverá el dinero adelantado, se repondrá en servicios que prestamos por CALE DIVERSIONES"),0,'J');
        $pdf->ln();
        $fila = $pdf->getY();
        $pdf->setXY(30,$fila + 20);
        $pdf->MultiCell(60,5,'____________________________',0,'C');
        $pdf->setXY(120,$fila + 20);
        $pdf->MultiCell(60,5,'____________________________',0,'C');
        $pdf->Ln();
        $fila = $pdf->getY();
        $pdf->setXY(30,$fila );
        $pdf->MultiCell(60,5,'CLIENTE',0,'C');
        $pdf->setXY(120,$fila );
        $pdf->MultiCell(60,5,'CALE DIVERSIONES',0,'C');
        $pdf->Output();
        }

}
