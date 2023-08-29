//FUNCION CLICK BTN LISTAS DE PRECIOS (RENDERIZA MI CONTENEDOR A LISTAS DE PRECIOS)
const btnListaPrecios = () => {
  const btnListaPrecios1 = document.getElementById("btn-listaPrecios");
  const containerButtons = document.getElementById("cargaProductos");
  btnListaPrecios1.addEventListener("click", () => {
      console.log("btn - lista precios");
      renderListaPrecios();
      containerButtons.innerHTML = "";
      containerButtons.className = "heigth-0" 
  })
}
//FUNCION PARA RENDERIZAR EL CONTENEDOR DONDE VOY A MOSTRAR MIS LISTAS DE PRECIO
const renderListaPrecios = () =>{
  const contListaPrecios = document.getElementById("contListaPrecios");
  contListaPrecios.innerHTML= `
  <div  class="containerPrograma4" id="containerPrograma5">
    <div  class="containerForm4">
      <div id="misPedidosPdf" class="containerForm4">
        <h1>LISTA DE PRECIOS Y PROVEEDORES</h1>
        <div class="containerForm7">
          <div class="cont-input-cliente">
            <label class="mb-2"><b>Ingrese Nombre Proveedor</b></label>
            <input type="text" id="nombreProveedor" placeholder="nombre" class="input-class mb-3">

            <label class="mb-2"><b>Ingrese Categoria Producto</b></label>
            <input type="text" id="nombreCategoriaProducto" placeholder="nombre" class="input-class mb-3">
          </div>
          <div id="contenedoresListaPrecios"class="containerForm8 pdf-style" id="misPdf table table-striped">

          </div>
        </div>
      </div>
      <div class="contPdf">
        <button id="btn-pdf2"class="btn bg-danger text-light" type="button">Descargar PDF</button>
      </div>
    </div>
  </div>
  <div class="btn-volver4 border border-ligth">
    <button id="btn-volverAtras5"class="btn bg-warning">Volver</button>
  </div>`
  renderContenedoresListaPrecios();
  volverAtrasListaPrecios();
}
//FUNCION PARA RENDERIZAR LAS LISTAS DE PRECIO A TRAVES DE UN EVENTO INPUT(SACADO DE LOS VALORES DE LOS CAMPOS DE TEXTO)
const renderContenedoresListaPrecios = () =>{
  const contenedores = document.getElementById("contenedoresListaPrecios");
  inputProveedor(contenedores);
  inputCategoria(contenedores);
}
//FUNCION PARA RENDERIZAR LA TABLA DE PROVEDORES Y SUS PRODUCTOS CORRESPONDIENTES
const inputProveedor = (listas) =>{
  const inputNombreProveedor = document.getElementById("nombreProveedor");
  inputNombreProveedor.addEventListener("input", () =>{
    listas.innerHTML = `
      <table id="listasPrecios2" class="table table-striped border border-dark">
          <thead>
              <div id="listaProv">
              </div>
              <tr>
              <th scope="col">#</th>
              <th scope="col">id</th>
              <th scope="col">Producto</th>
              <th scope="col">Categoria</th>
              <th scope="col">Precio</th>
              <th scope="col">Precio S/IVA</th>
              <th scope="col">IVA</th>
              </tr>
          </thead>
          <tbody id="listasPrecios" class="w-100">
     
   
          </tbody>
          <form id="formAumento" class="my-2 border border-">
            <label class="mb-2 text-danger"><b>Modificar Precio listas%</b></label>
            <input type="text" id="aumentoPrecios" placeholder="% aumento" class="input-class mb-3">
            <button id="actualizarListas" type="button" class="btn bg-danger text-light">Actualizar</button>
          </form>
          <h3 id="busqueda">
          </h3>
      </table>`
      renderizarListasXproveedor();
  });
}
//FUNCION PARA RENDERIZAR LA TABLA DE CATEGORIAS Y SUS PRODUCTOS CORRESPONDIENTES
const inputCategoria = (listas) =>{
  const InputnombreCategoriaProductos = document.getElementById("nombreCategoriaProducto");
  InputnombreCategoriaProductos.addEventListener("input", () =>{
    listas.innerHTML = `
      <table id="listasPrecios2" class="table table-striped border border-dark">
          <thead>
              <div id="listaProv">
              </div>
              <tr>
              <th scope="col">#</th>
              <th scope="col">id</th>
              <th scope="col">Producto</th>
              <th scope="col">Categoria</th>
              <th scope="col">Precio</th>
              <th scope="col">Precio S/IVA</th>
              <th scope="col">IVA</th>
              </tr>
          </thead>
          <tbody id="listasPrecios" class="w-100">
     
   
          </tbody>
          <h3 id="busqueda2">
          </h3>
      </table>`
      renderizarListasXCategoria();
  });
}
//FUNCION ENCARGADA DE FILTRAR LOS PRODUCTOS POR PROVEEDOR RENDERIZA LOS RESULTADOS
const renderizarListasXproveedor = () => {
  const productosBaseDatos = JSON.parse(localStorage.getItem("baseDatos"));
  const listasPrecio = document.getElementById("listasPrecios");
  const busqueda1 = document.getElementById("busqueda");
  console.log(productosBaseDatos);

  const nombreProveedores = document.getElementById("nombreProveedor").value.toUpperCase().trim();

  const productosPorProveedor = productosBaseDatos.filter(element =>
    element.proveedor === nombreProveedores);

  console.log(productosPorProveedor);

  resultadoNoEcontrado(productosPorProveedor,busqueda1)

  productosPorProveedor.forEach((item, i) => {
    const contenedorListas = document.createElement("tr");

    let PrecioSinIVA2 = (item.precio / 1.21).toFixed(2);
    contenedorListas.innerHTML = `
      <td><img class="tamanoImgProductos" src=${item.imgProducto}></td>
      <td>${i}</td>
      <td>${item.nombre}</td>
      <td>${item.categoria}</td>
      <td>$${item.precio} ARS</td>
      <td>$${PrecioSinIVA2} ARS</td>
      <td>${(item.precio - PrecioSinIVA2).toFixed(2)}</td>`;

    listasPrecio.appendChild(contenedorListas);
  });

  const listaProv = document.getElementById("listaProv");
  const div = document.createElement("div");
  const h2 = document.createElement("div");
  div.className = "w-100 bg-danger";
  h2.textContent = `LISTA DE PRECIOS ${nombreProveedores}`;
  h2.className = "bg-dark text-light w-100";
  div.appendChild(h2);
  listaProv.appendChild(div);
  listaProv.className = "w-100";

  btnDescargarPdf(productosPorProveedor);


  const nuevoArrayActualizado = productosPorProveedor;
  
 
  

  

 

 console.log(nuevoArrayActualizado);
 envioFormulario(nuevoArrayActualizado,listasPrecio);
 
};

const envioFormulario = (array,contenedor) =>{
  const botonActualizar = document.getElementById("actualizarListas");
  botonActualizar.addEventListener("click", () => {
    const aumentoListas = document.getElementById("aumentoPrecios").value;

    const valorAumento = parseFloat(aumentoListas);

    console.log(valorAumento);
    aumentarPrecios(array,valorAumento);

    actualizarListas(array,contenedor)

  });
}


const actualizarListas = (array,cont) =>{
  cont.innerHTML="";
  array.forEach((listas,i) =>{
    let PrecioSinIVA2 = (listas.precio / 1.21).toFixed(2);
    const contenedorListasModificado = document.createElement("tr");
    contenedorListasModificado.innerHTML= `<td><img class="tamanoImgProductos" src=${listas.imgProducto}></td>
      <td>${i}</td>
      <td>${listas.nombre}</td>
      <td>${listas.categoria}</td>
      <td>$${listas.precio} ARS</td>
      <td>$${PrecioSinIVA2} ARS</td>
      <td>${(listas.precio - PrecioSinIVA2).toFixed(2)}</td>`
      cont.appendChild(contenedorListasModificado);
  })
  console.log(array);
  localStorage.setItem("baseDatos",JSON.stringify(array));
} 

//FUNCION PARA AUMENTAR LISTAS DE PRECIOS
const aumentarPrecios = (productos, porcentaje)=>{
  productos.forEach(product =>{
    product.precio = (product.precio * (1+porcentaje/100)).toFixed(2);
  })
}
//FUNCION ENCARGADA DE FILTRAR LOS PRODUCTOS POR CATEGORIA Y RENDERIZA LOS RESULTADOS
const renderizarListasXCategoria = () =>{
  const productosBaseDatos2 = JSON.parse(localStorage.getItem("baseDatos"));
  const listasPrecio2 = document.getElementById("listasPrecios");
  const busqueda2 = document.getElementById("busqueda2");
  console.log(productosBaseDatos2);

  const nombreCategoriaProductos = document.getElementById("nombreCategoriaProducto").value.toUpperCase().trim();

  const productosPorProveedor2 = productosBaseDatos2.filter(element =>
  element.categoria === nombreCategoriaProductos);

  console.log(productosPorProveedor2);

  resultadoNoEcontrado(productosPorProveedor2,busqueda2)

  productosPorProveedor2.forEach((item,i) => {
      const contenedorListas2 = document.createElement("tr");
      contenedorListas2.id="trListas"

      let PrecioSinIVA2 =(item.precio/ 1.21).toFixed(2)
      contenedorListas2.innerHTML=`
      <td><img class="tamanoImgProductos" src=${item.imgProducto}></td>
      <td>${i}</td>
      <td>${item.nombre}</td>
      <td>${item.categoria}</td>
      <td>$${item.precio} ARS</td>
      <td>$${PrecioSinIVA2} ARS</td>
      <td>${(item.precio- PrecioSinIVA2).toFixed(2)}</td>`

      listasPrecio2.appendChild(contenedorListas2);
  }); 
  const listaProv = document.getElementById("listaProv");
  const div = document.createElement("div");
  const h2 = document.createElement("div");
  div.className="w-100  bg-danger"
  h2.textContent= `LISTA DE PRECIOS ${nombreCategoriaProductos}`
  h2.className="bg-dark text-light w-100"
  div.appendChild(h2);
  listaProv.appendChild(div);
  listaProv.className = "w-100"
  console.log(productosPorProveedor2);

  btnDescargarPdf(productosPorProveedor2);
}
//FUNCION PARA GENERAR PDF POR PROVEEDORES O POR CATEGORIA DE PRODUCTOS
const generarPDF = (datos) => {
  let doc = new jsPDF();

  const nombreProveedor = document.getElementById("nombreProveedor").value.toUpperCase();

  const nombreCategoriaProductos = document.getElementById("nombreCategoriaProducto").value.toUpperCase();

  let titleCondicional = nombreProveedor === "" ? nombreCategoriaProductos : nombreProveedor

  const dynamicTitle = `LISTA DE PRECIOS ${titleCondicional}`;

  // Agregar información adicional
  doc.setFontSize(12);
  doc.setTextColor(0, 0, 0); // Cambiar color del texto a negro

  const margin = 10;
  let yPosition = margin;

  doc.text("Nombre: Hugo Defilippi / Teléfono: 3426107747 / Provincia: Santa Fe / Localidad: Santa Fe", margin, yPosition);
  yPosition += 15; // Aumentar la posición vertical

  // Generar la tabla
  const pdfData = datos.map(item => [
    item.nombre,
    item.categoria,
    `$${item.precio} ARS`,
    `$${(item.precio / 1.21).toFixed(2)} ARS`
  ]);

  if (pdfData.length > 0) {
    doc.setFontSize(25);
    doc.setTextColor(0, 0, 0); // Cambiar color del texto a negro
    doc.setFillColor(255, 255, 255); // Cambiar color de fondo a blanco

    const titleWidth = doc.getStringUnitWidth(dynamicTitle) * doc.internal.getFontSize() / doc.internal.scaleFactor;
    const titleX = (doc.internal.pageSize.width - titleWidth) / 2;

    doc.text(dynamicTitle, titleX, yPosition + 10);
    yPosition += 20; // Aumentar la posición vertical

    doc.autoTable({
      startY: yPosition,
      head: [["PRODUCTO", "CATEGORÍA", "PRECIO", "PRECIO S/IVA"]],
      body: pdfData
    });

    doc.save(dynamicTitle);
  } else {
    console.log("No se encontraron datos válidos para generar el PDF.");
  }
};
//FUNCION CLICK PARA DESCARGAR PDF
const btnDescargarPdf = (x) =>{
  const btnPdf2 = document.getElementById("btn-pdf2");
  btnPdf2.addEventListener("click", () => {
    console.log("si funciona");
    Toastify({
      text: "PDF DESCARGADO, ENCUENTRALO EN LA CARPETA DESCARGAS!",
      backgroundColor: "red",
      textColor: "black",
      duration: 3000,
      gravity: "bottom",
      position: "center",
      style: {
        color: "white",
      },
    }).showToast();

    setTimeout(() => {
      generarPDF(x);
    }, 3000);
  });
}

//FUNCION PARA VOLVER AL MENÚ PRINCIPAL
const volverAtrasListaPrecios= () =>{
  const btnVolver5 = document.getElementById("btn-volverAtras5");
  const containerPrograma3 = document.getElementById("contListaPrecios");
  const cargarOcalcular = document.getElementById("cargaProductos");
  btnVolver5.addEventListener("click", () =>{
      containerPrograma3.innerHTML="";
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

const resultadoNoEcontrado = (array,contenedor) =>{
  if (array.length === 0) {
    const parrafo = document.createElement("p");
    parrafo.textContent = "No se encontraron resultados!";
    parrafo.className = "text-center bg-dark text-danger w-100";
    contenedor.innerHTML = ""; // Limpia el contenido previo
    
    setInterval(() => {
      if (contenedor.contains(parrafo)) {
        contenedor.removeChild(parrafo); // Elimina el párrafo si ya está presente
      } else {
        contenedor.appendChild(parrafo); // Agrega el párrafo si no está presente
      }
    }, 1000); // Cambia el intervalo según tus preferencias (en milisegundos)
  }
}
