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
          <button id="btn-pdf2"class="btn bg-danger text-light" type="button">Descargar PDF</button>
        </div>
      </div>
    </div>
    <div class="btn-volver4 border border-ligth">
      <button id="btn-volverAtras5"class="btn bg-warning">Volver</button>
    </div>`
    
    
    renderContenedoresListaPrecios();
    botonDescargarPdf();
    volverAtrasListaPrecios();
}

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
    })
}

const renderContenedoresListaPrecios = () =>{
    const contenedores = document.getElementById("contenedoresListaPrecios");
    
    const inputNombreProveedor = document.getElementById("nombreProveedor");

    const InputnombreCategoriaProductos = document.getElementById("nombreCategoriaProducto");

    inputNombreProveedor.addEventListener("input", () =>{
      contenedores.innerHTML = `
        <table id="listasPrecios2" class="table table-striped border border-dark">
            <thead>
                <tr>
                <th scope="col">#</th>
                <th scope="col">Producto</th>
                <th scope="col">Categoria</th>
                <th scope="col">Precio</th>
                <th scope="col">Precio S/IVA</th>
                <th scope="col">IVA</th>
                </tr>
            </thead>
            <tbody id="listasPrecios" class="w-100">
       
     
            </tbody>
        </table>`
        renderizarListasXproveedor();
    });

    InputnombreCategoriaProductos.addEventListener("input", () =>{
        contenedores.innerHTML = `
          <table id="listasPrecios2" class="table table-striped border border-dark" id="listasProveedores">
              <thead>
                  <tr>
                  <th scope="col">#</th>
                  <th scope="col">Producto</th>
                  <th scope="col">Categoria</th>
                  <th scope="col">Precio</th>
                  <th scope="col">Precio S/IVA</th>
                  <th scope="col">IVA</th>
                  </tr>
              </thead>
              <tbody id="listasPrecios" class="w-100">
         
       
              </tbody>
          </table>`
          renderizarListasXCategoria();
    });
}

const renderizarListasXproveedor = () =>{
    const productosBaseDatos = JSON.parse(localStorage.getItem("baseDatos"));
    const listasPrecio = document.getElementById("listasPrecios");
    
    console.log(productosBaseDatos);

    const nombreProveedores = document.getElementById("nombreProveedor").value.toUpperCase().trim();

    const productosPorProveedor = productosBaseDatos.filter(element =>
    element.proveedor === nombreProveedores);

    console.log(productosPorProveedor);

    productosPorProveedor.forEach((item,i) => {
        const contenedorListas = document.createElement("tr");
        let PrecioSinIVA2 =(item.precio/ 1.21).toFixed(2)
        contenedorListas.innerHTML=`
        <td>${i}</td>
        <td>${item.nombre}</td>
        <td>${item.categoria}</td>
        <td>$${item.precio} ARS</td>
        <td>$${PrecioSinIVA2} ARS</td>
        <td>${(item.precio- PrecioSinIVA2).toFixed(2)}</td>`

        listasPrecio.appendChild(contenedorListas);
    });
    console.log(productosPorProveedor);
}

const renderizarListasXCategoria = () =>{
    const productosBaseDatos2 = JSON.parse(localStorage.getItem("baseDatos"));
    const listasPrecio2 = document.getElementById("listasPrecios");
    
    console.log(productosBaseDatos2);

    const nombreCategoriaProductos = document.getElementById("nombreCategoriaProducto").value.toUpperCase().trim();

    const productosPorProveedor2 = productosBaseDatos2.filter(element =>
    element.categoria === nombreCategoriaProductos);

    console.log(productosPorProveedor2);

    productosPorProveedor2.forEach((item,i) => {
        const contenedorListas2 = document.createElement("tr");
        contenedorListas2.id="trListas"

        let PrecioSinIVA2 =(item.precio/ 1.21).toFixed(2)
        contenedorListas2.innerHTML=`
        <td>${i}</td>
        <td>${item.nombre}</td>
        <td>${item.categoria}</td>
        <td>$${item.precio} ARS</td>
        <td>$${PrecioSinIVA2} ARS</td>
        <td>${(item.precio- PrecioSinIVA2).toFixed(2)}</td>`

        listasPrecio2.appendChild(contenedorListas2);
    });
    console.log(productosPorProveedor2);
}



const descargarPDF2 = (x) => {
    const element = document.getElementById(x); // Reemplaza "contenido" con el ID del contenedor que contiene los datos a convertir
    const nombreLista = document.getElementById("nombreProveedor").value.toUpperCase();

    const CategoriaProductos = document.getElementById("nombreCategoriaProducto").value.toUpperCase();

    if (nombreLista !== "") {

        const options = {
            margin: 20,
            filename: `LISTAS DE PRECIO ${nombreLista}.pdf`,
            image: { type: "jpeg", quality: 0.98 },
            html2canvas: { scale: 2,className:"pdf-style"},
            jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
            
        };
        html2pdf().from(element).set(options).save();
    }else{
        const options = {
            margin: 20,
            filename: `LISTAS DE ${CategoriaProductos}.pdf`,
            image: { type: "jpeg", quality: 0.98 },
            html2canvas: { scale: 2,className:"pdf-style"},
            jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
            
        };
        html2pdf().from(element).set(options).save();
    }
}; 

const botonDescargarPdf = () =>{
    const btnPdf2 = document.getElementById("btn-pdf2");

    btnPdf2.addEventListener("click", ()=>{
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
  
          setTimeout(() => {
            descargarPDF2("listasPrecios2"); 
        }, 3000);
    })
}