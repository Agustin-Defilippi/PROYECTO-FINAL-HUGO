//FUNCION PARA RENDERIZAR EL CONTENDEDOR DE MIS PEDIDOS("HACIENDO CLICK")
btnCargarPedidos = () =>{
    const containerButtons = document.getElementById("cargaProductos");
    const btnMisPedidos = document.getElementById("btn-misPedidos");
    btnMisPedidos.addEventListener("click", () =>{
        renderMisPedidos()
        containerButtons.innerHTML = "";
        containerButtons.className= "heigth-0"
    })
}
//FUNCION PARA RENDERIZAR Y CREAR EL CONTENEDOR DE "MIS PEDIDOS"
const renderMisPedidos = () =>{
    const contMisPedidos = document.getElementById("contMisPedidos");

    contMisPedidos.innerHTML= `
    <div  class="containerPrograma4" id="containerPrograma4">
      <div  class="containerForm4">
        <div  class="containerForm4">
          <h1>MIS PEDIDOS</h1>
          <div class="containerForm7">

            <div class="cont-input-cliente">

              <label class="mb-2"><b>Ingrese Nombre Cliente</b></label>
              <input type="text" id="clienteNombre" placeholder="nombre" class="input-class mb-3">

              <label class="mb-2"><b>Ingrese numero pedido</b></label>
              <input type="text" id="posicionPedido" placeholder="numero Pedido" class="input-class mb-3">

              <button id="btnPedidosGuardados" class="btn bg-danger text-light">Guardados</button>
              
            </div>

            

            <div id="contenedores"class="containerForm8 pdf-style" id="misPdf table table-striped">

            
            </div>
            <div id="productosGuardados">



            </div>

            <div id="verProductos">



            </div>

          </div>

          <div class="casillasTotalLista w-100 bg-dark text-light mb-3 fs-2">
            <div id="casillasTotalLista">
            </div>
            <div id="casillasTotalNeto">
            </div>
          </div>
         
          
        </div>
        
    
        <div class="btn-resetBase">
          <button id="btn-pdf"class="btn bg-danger text-light" type="button">Descargar PDF</button>
          <button id="btn-borrarPedidos"class="btn bg-dark text-warning" type="button">Resetear Pedidos</button>
        </div>
      </div>
    </div>
    <div class="btn-volver4 border border-ligth">
      <button id="btn-volverAtras4"class="btn bg-warning">Volver</button>
    </div>`
   volverAtrasMisPedidos();
   renderContenedores();
   btnBorrarPedidos() ;
}
//FUNCION PARA RENDERIZAR LA TABLA DE CLASIFICACIONES
const renderContenedores = () =>{
  const contenedores = document.getElementById("contenedores");
  
  const inputNombreCliente = document.getElementById("clienteNombre");

  inputNombreCliente.addEventListener("input", () =>{
    contenedores.innerHTML = `
  <table  id="misPedidosPdf"  class="table table-striped border border-dark">
    <thead>
      <tr>
        <th scope="col">#</th>
        <th scope="col">ID</th>
        <th scope="col">Producto</th>
        <th scope="col">Unidades</th>
        <th scope="col">Precio</th>
        <th scope="col">Precio S/IVA</th>
        <th scope="col">IVA</th>
        <th scope="col">Bonificacion</th>
        <th scope="col">SubTotal</th>
        <th scope="col">Total</th>
      </tr>
    </thead>
    <tbody id="misPedidos" class="w-100">
     
   
    </tbody>
    <div id="cont-btnReset" class="w-100"></div>
  </table>`
    renderizarPedido(); 
    verProductosGuardados(inputNombreCliente.value.toUpperCase())
  })
}
//FUNCION DE FILTRADO DE PEDIDOS POR CLIENTE Y FILTRADOS POR POSICION
const renderizarPedido = () => {
  const pedidos = datos;
  const inputNombreCliente = document.getElementById("clienteNombre");
  const inputPosicion = document.getElementById("posicionPedido");
  const misPedidos = document.getElementById("misPedidos");

  const arrayFiltradoCliente = pedidos.filter(item => item.nombreCliente === inputNombreCliente.value.trim().toUpperCase());

  misPedidos.innerHTML = '';

  arrayFiltradoCliente.forEach((item, i) => {
    let PrecioSinIVA =(item.precioProducto / 1.21).toFixed(2)
    const contenedorMisPedidos = document.createElement("tr");
    contenedorMisPedidos.innerHTML = `
      <td>${i}</td>
      <td>${item.id}</td>
      <td>${item.nombreProducto}</td>
      <td>${item.unidadesProducto}</td>
      <td>$${item.precioProducto} ARS</td>
      <td>$${PrecioSinIVA} ARS</td>
      <td>${(item.precioProducto - PrecioSinIVA).toFixed(2)}</td>
      <td>%${item.descuentoProducto}</td>
      <td>$${item.precioProducto * item.unidadesProducto} ARS</td>
      <td>$${calcularDescuentos(item.precioProducto,item.descuentoProducto)* item.unidadesProducto} ARS</td>
  
    `;
    misPedidos.appendChild(contenedorMisPedidos);
    
  });
  console.log(arrayFiltradoCliente);
  const btnPdf = document.getElementById("btn-pdf")

  btnPdf.addEventListener("click", () =>{
    botonGenerarPdf(arrayFiltradoCliente);
    setTimeout(() =>{
      volverAtrasCalcularProducto2("contMisPedidos");
    },2000)
    
  }) 


  inputPosicion.addEventListener("change", () => {
    const posicionSeleccionada = parseInt(inputPosicion.value, 10);

    if (isNaN(posicionSeleccionada)) {
      console.log("Ingrese un número válido de posición.");
      return;
    }
    const arrayFiltradoPorPosicion = arrayFiltradoCliente.filter((item, index) => index === posicionSeleccionada);

    misPedidos.innerHTML = '';

    arrayFiltradoPorPosicion.forEach((elemento,i) => {
      const contenedorPepe = document.createElement("tr");
      let PrecioSinIVA =(elemento.precioProducto / 1.21).toFixed(2)
      contenedorPepe.innerHTML = `
        
      <td>${i}</td>
      <td>${elemento.id}</td>
      <td>${elemento.nombreProducto}</td>
      <td>${elemento.unidadesProducto}</td>
      <td>$${elemento.precioProducto} ARS</td>
      <td>$${PrecioSinIVA} ARS</td>
      <td>${(elemento.precioProducto - PrecioSinIVA).toFixed(2)}</td>
      <td>%${elemento.descuentoProducto}</td>
      <td>$${elemento.precioProducto * elemento.unidadesProducto} ARS</td>
      <td>$${calcularDescuentos(elemento.precioProducto,elemento.descuentoProducto)* elemento.unidadesProducto} ARS</td>
  
      `
      misPedidos.appendChild(contenedorPepe);

      const buttonGuardar = document.createElement("button");
      buttonGuardar.className="btn bg-danger text-light";
      buttonGuardar.textContent="Guardar";
      buttonGuardar.id= `btnGuardar${posicionSeleccionada}`;

      misPedidos.appendChild(buttonGuardar);

      buttonGuardar.addEventListener("click",() =>{
        console.log(`exelente guarde ${elemento.nombreProducto}`);
        pedidosGuardados.push(elemento);
        console.log(pedidosGuardados);
        localStorage.setItem("guardarPedidos", JSON.stringify(pedidosGuardados));
      })
    });
  });
}
//FUNCION PARA ACTIVAR PROCESOS DE GENERACION DE PDF
const botonGenerarPdf = (x) =>{
  Toastify({

    text: "PDF DESCARGADO, ENCUENTRALO EN LA CARPETA DESCARGAS!",
    backgroundColor:"red",
    textColor:"black",
    duration: 3000, 
    gravity: "bottom", 
    position: "center",
    style: {
      color:"white",
    },
    
  }).showToast();

  generarPDF2(x);
  setTimeout(() => {
    volverAtrasCalcularProducto2();
  }, 3000);
}
//FUNCION PARA VER Y RENDERIZAR LOS PEDIDOS GUARDADOS
const verProductosGuardados = (elementoNombre) => {
  const btnVerPedidos = document.getElementById("btnPedidosGuardados");
  btnVerPedidos.addEventListener("click", () => {
    const contVerPedidos = document.getElementById("misPedidos");
    const pedidos = JSON.parse(localStorage.getItem('guardarPedidos'));
    const filtracionNombre = pedidos.filter(elemento => elemento.nombreCliente === elementoNombre);

    // Vaciamos el contenido actual de los pedidos
    contVerPedidos.innerHTML = '';

    filtracionNombre.forEach((elemento, i) => {
      let PrecioSinIVA = (elemento.precioProducto / 1.21).toFixed(2);
      const inyectarHtml = document.createElement("tr");

      inyectarHtml.innerHTML = `<td>${i}</td>
        <td>${elemento.id}</td>
        <td>${elemento.nombreProducto}</td>
        <td>${elemento.unidadesProducto}</td>
        <td>$${elemento.precioProducto} ARS</td>
        <td>$${PrecioSinIVA} ARS</td>
        <td>${(elemento.precioProducto - PrecioSinIVA).toFixed(2)}</td>
        <td>%${elemento.descuentoProducto}</td>
        <td>$${elemento.precioProducto * elemento.unidadesProducto} ARS</td>
        <td>$${calcularDescuentos(elemento.precioProducto, elemento.descuentoProducto) * elemento.unidadesProducto} ARS</td>`;

      inyectarHtml.classList.add("pedido-guardado"); // Agregamos una clase CSS a los pedidos guardados
      contVerPedidos.appendChild(inyectarHtml);
      
    });
    const btnPdf2 = document.getElementById("btn-pdf")

    btnPdf2.addEventListener("click", () =>{
      botonGenerarPdf(filtracionNombre);
      
      
    })
    const casillasTotalNeto = document.getElementById("casillasTotalNeto");
    const totalCasilla = document.getElementById("casillasTotalLista");
    totalCasilla.innerHTML= `Total Precios (lista) Mercaderia: $${calcularTotalPrecioLista(filtracionNombre)}`
    casillasTotalNeto.innerHTML=`Total Precios (neto) Mercaderia: $${calcularTotalPrecioNeto(filtracionNombre)}`
  });

  
  const contVerPedidos = document.getElementById("misPedidos");
  const contBotton = document.getElementById("cont-btnReset")

  const btnEliminarGuardados = document.createElement("button");
  btnEliminarGuardados.textContent = "Resetear";
  btnEliminarGuardados.className = "btn bg-dark text-light text-center mb-2"
  btnEliminarGuardados.id= `resetBtn`

  contBotton.appendChild(btnEliminarGuardados);
  contBotton.className ="diss"
  

  btnEliminarGuardados.addEventListener("click" , () =>{
    const totalCasilla = document.getElementById("casillasTotalLista");
    const casillasTotalNeto = document.getElementById("casillasTotalNeto");
    console.log("no se borran los pedidos guardados");
    localStorage.removeItem('guardarPedidos');
    pedidosGuardados.length = 0
    contVerPedidos.innerHTML="";
    totalCasilla.innerHTML ="";
    casillasTotalNeto.innerHTML = "";
  })
}
//FUNCION PARA CALCULAR LOS DESCUENTOS 
const calcularDescuentos = (precioProducto,porcentajeDescuento) =>{
  const descuento = (precioProducto * porcentajeDescuento) / 100;
  const precioConDescuento = precioProducto - descuento;
  return (precioConDescuento).toFixed(2);
}
//FUNCION GENERADORA DE PDF 
const generarPDF2 = (datos) => {
  let doc = new jsPDF();

  // Agregar información adicional
  doc.setFontSize(12);
  doc.setTextColor(0, 0, 0); // Cambiar color del texto a negro

  const margin = 15;
  let yPosition = margin;

  doc.text("Nombre: Hugo Defilippi / Teléfono: 3426107747 / Provincia: Santa Fe / Localidad: Santa Fe", margin, yPosition);
  yPosition += 20; // Aumentar la posición vertical

  // Obtener el nombre del cliente para el título
  const inputNombreCliente2 = document.getElementById("clienteNombre").value.toUpperCase();
  const dynamicTitle = `PEDIDO ${inputNombreCliente2}`;

  // Configurar el título en el PDF
  doc.setFontSize(25);
  doc.setTextColor(0, 0, 0);
  doc.setFillColor(255, 255, 255);
  const titleWidth = doc.getStringUnitWidth(dynamicTitle) * doc.internal.getFontSize() / doc.internal.scaleFactor;
  const titleX = (doc.internal.pageSize.width - titleWidth) / 2;

  doc.text(dynamicTitle, titleX, yPosition);

  // Aumentar la posición vertical después del título
  yPosition += 20;

  // Generar la tabla de pedidos
  const pdfData = datos.map(item => [
    item.nombreProducto,
    item.unidadesProducto,
    `$${item.precioProducto} ARS`,
    `$${(item.precioProducto / 1.21).toFixed(2)} ARS`,
    `$${(item.precioProducto * item.unidadesProducto)} ARS`,
    `$${calcularDescuentos(item.precioProducto, item.descuentoProducto) * item.unidadesProducto } ARS`,
  ]);

  if (pdfData.length > 0) {
    const table = doc.autoTable({
      startY: yPosition,
      head: [["PRODUCTO", "UNIDADES", "PRECIO", "PRECIO S/IVA","SUBTOTAL","TOTAL BONIFICADO"]],
      body: pdfData
    });

    // Calcular la posición vertical para los textos siguientes
    yPosition = table.lastAutoTable.finalY + 10; // 10 unidades de espacio después de la tabla

    // Agregar los resultados de las funciones
    const totalListaTexto = `Total Precios (lista) Mercaderia: $${calcularTotalPrecioLista(datos).toFixed(2)}`;
    doc.setTextColor(0, 0, 0); // Cambiar color del texto a negro
    doc.setFontSize(12); // Cambiar el tamaño del texto
    doc.text(totalListaTexto, margin, yPosition);

    yPosition += 10; // Aumentar la posición vertical

    const totalNetoTexto = `Total Precios (neto) Mercaderia: $${calcularTotalPrecioNeto(datos).toFixed(2)}`;
    doc.text(totalNetoTexto, margin, yPosition);

    doc.save(dynamicTitle);
  } else {
    console.log("No se encontraron datos válidos para generar el PDF.");
  }
};






//FUNCION QUE RESETEA EN GENERAL TODOS LOS PEDIDOS GUARDADOS
const btnBorrarPedidos = () =>{
  const btnBorrarPedidos = document.getElementById("btn-borrarPedidos");
  btnBorrarPedidos.addEventListener("click" , () =>{
    const contenedorPedidos= document.getElementById("misPedidos");
    const totalCasilla = document.getElementById("casillasTotalLista");
    const casillasTotalNeto = document.getElementById("casillasTotalNeto");
    localStorage.removeItem("misPedidos");
    localStorage.removeItem("guardarPedidos");
    datos.length = 0
    console.log(datos);
    contenedorPedidos.innerHTML="";
    totalCasilla.innerHTML ="";
    casillasTotalNeto.innerHTML = "";
  })
}
//FUNCION PARA CALCULAR TODOS LOS PRECIOS DE LISTA DE MIS PEDIDOS
const calcularTotalPrecioLista = (array) =>{
  const datosFinales = array;
 let total = datosFinales.reduce((acumulador,item) =>{
   return acumulador+= item.precioProducto * item.unidadesProducto
 },0)
 return total
}
//FUNCION PARA CALCULAR TODOS LOS PRECIOS NETOS DE MIS PEDIDOS
const calcularTotalPrecioNeto = (array) =>{
  const datosPrecios = array
  let salida =datosPrecios.reduce((acumulador,elemento) =>{
      return acumulador+= calcularDescuentos(elemento.precioProducto, elemento.descuentoProducto) * elemento.unidadesProducto
  },0)
  return salida
}
//FUNCION PARA VOLVER AL MENU PRINCIPAL
const volverAtrasMisPedidos= () =>{
  const btnVolver4 = document.getElementById("btn-volverAtras4");
  const containerPrograma2 = document.getElementById("contMisPedidos");
  const cargarOcalcular = document.getElementById("cargaProductos");
  btnVolver4.addEventListener("click", () =>{
      containerPrograma2.innerHTML="";
      cargarOcalcular.className="containerCargarOcalcular"
      renderContButtonsEleccion();
      btnBaseDatos();
      btnCargarProductos();
      btnCalcularProductos();
      btnCargarPedidos();
      btnListaPrecios();
      textInfinito();
  })
}