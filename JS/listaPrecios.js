

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
        </table>`
        renderizarListasXproveedor();
    });

    InputnombreCategoriaProductos.addEventListener("input", () =>{
        contenedores.innerHTML = `
          <table id="listasPrecios2" class="table table-striped border border-dark" id="listasProveedores">
              <thead>
                  <div id="listaProv">
                  </div>
                  <tr>
                  <th scope="col">id</th>
                  <th scope="col">item#</th>
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

    productosPorProveedor.forEach((item,i) => {
        const contenedorListas = document.createElement("tr");
       
        let PrecioSinIVA2 =(item.precio/ 1.21).toFixed(2)
        contenedorListas.innerHTML=`
        <td><img class="tamanoImgProductos" src=${item.imgProducto}></td>
        <td>${i}</td>
        <td>${item.nombre}</td>
        <td>${item.categoria}</td>
        <td>$${item.precio} ARS</td>
        <td>$${PrecioSinIVA2} ARS</td>
        <td>${(item.precio- PrecioSinIVA2).toFixed(2)}</td>`

        listasPrecio.appendChild(contenedorListas);
    });
    const listaProv = document.getElementById("listaProv");
    const div = document.createElement("div");
    const h2 = document.createElement("div");
    div.className="w-100  bg-danger"
    h2.textContent= `LISTA DE PRECIOS ${nombreProveedores}`
    h2.className="bg-dark text-light w-100"
    div.appendChild(h2);
    listaProv.appendChild(div);
    listaProv.className = "w-100"

    const btnPdf2 = document.getElementById("btn-pdf2");

    btnPdf2.addEventListener("click", ()=>{
       /*  Toastify({

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
           
           
        }, 3000); */
        generarPDF(productosPorProveedor)
       
    })
   
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


}



/* const descargarPDF2 = (x) => {
    const element = document.getElementById(x); // Reemplaza "contenido" con el ID del contenedor que contiene los datos a convertir
    const nombreLista = document.getElementById("nombreProveedor").value.toUpperCase();
    const CategoriaProductos = document.getElementById("nombreCategoriaProducto").value.toUpperCase();

    const dynamicTitle = nombreLista !== "" ? `LISTAS DE PRECIO ${nombreLista}` : `LISTAS DE ${CategoriaProductos}`;

    // Agregar el título dinámico al contenido
    const titleElement = document.createElement("h1");
    titleElement.textContent = dynamicTitle;
    titleElement.className="bg-black text-danger fs-2"
    element.insertBefore(titleElement, element.firstChild);

    // Definir las opciones para la generación del PDF
    const options = {
        margin: 10,
        name:"hola",
        filename: `${dynamicTitle}.pdf`,
        image: { type: "jpeg", quality: 0.98 },
        html2canvas: { scale: 2, className: "pdf-style" },
        jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
    };

    // Generar el PDF con el contenido modificado
    html2pdf().from(element).set(options).save();

    // Restaurar el contenido eliminando el título después de generar el PDF
    element.removeChild(titleElement);
}; */


/* const pdfArchivo = () => {
    const maintable = document.getElementById("listasPrecios2");
  
    var doc = new jsPDF('p', 'pt', 'a4');
    var margin = 10;
    var scale = (doc.internal.pageSize.width - margin * 2) / (document.body.clientWidth * 0.65); 


    var scale_mobile = (doc.internal.pageSize.width - margin * 2) / document.body.getBoundingClientRect();
  
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
      
      doc.html(maintable, {
        x: margin,
        y: margin,
        html2canvas: {
          scale: scale_mobile,
          style: {
            'font-size': '2em',
            
          }
        },
        callback: function (doc) {
            doc.setFontSize(50);  
          doc.setTextColor(0, 0, 0);
          doc.setFontSize(16);
          doc.setFont('helvetica', 'bold');
          doc.output('dataurlnewwindow', { filename: 'pdf.pdf' });
        }
      });
    } else {
 
      doc.html(maintable, {
        x: margin,
        y: margin,
        html2canvas: {
          scale: scale,
          style: {
            'font-size': '2em',
            "color": "red"
            
          }
        },
        callback: function (doc) {
            doc.setFontSize(50);
          doc.setTextColor(0, 0, 0);
          doc.setFontSize(16);
          doc.setFont('helvetica', 'bold');
          doc.output('dataurlnewwindow', { filename: 'HOLA.pdf' });
        }
      });
    }
  } */
  


const generarPDF = (datos) => {
    let doc = new jsPDF();

    const nombreProveedor = document.getElementById("nombreProveedor").value.toUpperCase();
    const dynamicTitle = `LISTA DE PRECIOS ${nombreProveedor}`;

    doc.setFontSize(16);
    doc.text(dynamicTitle, 60, 8, { align: "center" });

    const pdfData = datos.map(item => [
        item.nombre,
        item.categoria,
        `$${item.precio} ARS`,
        `$${(item.precio / 1.21).toFixed(2)} ARS`
    ]);

    if (pdfData.length > 0) {
        doc.autoTable({
            head: [["PRODUCTO", "CATEGORÍA", "PRECIO","PRECIO S/IVA"]],
            body: pdfData
        });

        doc.save(dynamicTitle);
    } else {
        console.log("No se encontraron datos válidos para generar el PDF.");
    }
}



