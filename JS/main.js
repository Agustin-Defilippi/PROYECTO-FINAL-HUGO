const usuario = document.getElementById("usuario");
const contPadre = document.getElementById("containerPadre");

permitirIngreso();


const datos = JSON.parse(localStorage.getItem('misPedidos')) || []
let stockProductos = JSON.parse(localStorage.getItem('baseDatos')) || [];
const pedidosGuardados = JSON.parse(localStorage.getItem('guardarPedidos')) ||[] ;

let comprobantePedido =1 
console.log(comprobantePedido + "alfin");

/* const renderFormulario = () =>{
    const botonAgregarCampo1 = document.getElementById('btn-pedido');
    botonAgregarCampo1.addEventListener("click", () =>{
        crearElementosPedidos()
    })
} */


// Función para CARGAR el formulario de stock
/* const renderFormStock1 = () => {

    const nomb = document.getElementById("nombreDestinatario").value
    if(nomb !== "" && isNaN(nomb)){
        crearElementosPedidos();
    }else{
        console.log("ingresa un nombre de cliente si o si");
    }
 
};
 */
// Funcion eventica para renderizar el formulario infinito
/*  const agregarCampoOnClick1 = () => {
    const botonAgregarCampo1 = document.getElementById('btn-pedido');
    
    botonAgregarCampo1.addEventListener('click',
     renderFormStock1
   );
} */