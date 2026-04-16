let carrito = [];
let total = 0;

const tallas = ['S','M','L','XL','XXL'];

function crearProductos(){
  let cont = document.getElementById('productos');

  for(let i=1;i<=55;i++){
    let card = document.createElement('div');
    card.className = 'card';

    let opciones = tallas.map(t=>`<option value="${t}">${t}</option>`).join('');

    card.innerHTML = `
      <img src="https://via.placeholder.com/300">
      <h3>Producto ${i}</h3>
      <p>$450</p>
      <select id="talla${i}">${opciones}</select>
      <input type="number" id="cant${i}" value="1" min="1">
      <button onclick="agregar('Producto ${i}',450,'talla${i}','cant${i}')">Agregar</button>
    `;

    cont.appendChild(card);
  }
}

function obtenerConteoTallas(){
  let conteo = {S:0,M:0,L:0,XL:0,XXL:0};
  carrito.forEach(p=>{
    conteo[p.talla] += p.cantidad;
  });
  return conteo;
}

function esPaqueteExacto(conteo){
  return (
    conteo.S === 2 &&
    conteo.M === 3 &&
    conteo.L === 3 &&
    conteo.XL === 2 &&
    conteo.XXL === 2
  );
}

function recalcularTodo(){
  let conteo = obtenerConteoTallas();
  let esPaquete = esPaqueteExacto(conteo);
  total = 0;

  carrito.forEach(p=>{
    let precioFinal = 450;

    if(esPaquete){
      precioFinal = 400;
    } else if(p.cantidad >= 5){
      precioFinal = 430;
    }

    p.precioFinal = precioFinal;
    p.subtotal = precioFinal * p.cantidad;
    total += p.subtotal;
  });

  document.getElementById('mensajePaquete').textContent = esPaquete ? '✔ Paquete completo detectado' : '';
}

function agregar(producto, precio, tallaId, cantId){
  let talla = document.getElementById(tallaId).value;
  let cantidad = parseInt(document.getElementById(cantId).value);

  carrito.push({producto, talla, cantidad, precioFinal:precio, subtotal:0});

  recalcularTodo();
  render();
}

function render(){
  let lista = document.getElementById('lista');
  lista.innerHTML = '';

  carrito.forEach((p,index)=>{
    let div = document.createElement('div');
    div.className = 'item';
    div.innerHTML = `${p.producto} (${p.talla}) x${p.cantidad} - $${p.subtotal} <span class="remove" onclick="eliminar(${index})">❌</span>`;
    lista.appendChild(div);
  });

  document.getElementById('total').textContent = total;
}

function eliminar(index){
  carrito.splice(index,1);
  recalcularTodo();
  render();
}

function enviarWhatsApp(){
  let mensaje = 'Hola, quiero pedir:%0A';
  carrito.forEach(p=>{
    mensaje += `- ${p.producto} (${p.talla}) x${p.cantidad} = $${p.subtotal}%0A`;
  });
  mensaje += `Total: $${total}`;

  window.open('https://wa.me/521XXXXXXXXXX?text=' + mensaje);
}

function irInstagram(){
  window.open('https://instagram.com/TUUSUARIO');
}

crearProductos();
