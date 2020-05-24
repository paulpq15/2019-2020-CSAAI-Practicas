console.log("Ejecutando JS....")

//-- Obtener elementos del DOM
const canvas = document.getElementById('canvas');
const img = document.getElementById('imagesrc')
const ctx = canvas.getContext('2d');

//-- Acceso a los distintos deslizadores
const deslizador1 = document.getElementById('rojo');
const deslizador2 = document.getElementById('verde');
const deslizador3 = document.getElementById('azul');

//-- Valor de los distintos deslizadores
const range_value_red = document.getElementById('range_value_red')
const range_value_green = document.getElementById('range_value_green')
const range_value_blue = document.getElementById('range_value_blue')

//--Botones para hacer que el filtro se aplique en color o en escala de grises
const gris = document.getElementById('grises')
const color = document.getElementById('color')

//-- Función de retrollamada de imagen cargada
//-- La imagen no se carga instantaneamente, sino que
//-- lleva un tiempo. Sólo podemos acceder a ella una vez
//-- que esté totalmente cargada
img.onload = function () {

  //-- Se establece como tamaño del canvas el mismo
  //-- que el de la imagen original
  canvas.width = img.width;
  canvas.height = img.height;

  //-- Situar la imagen original en el canvas
  //-- No se han hecho manipulaciones todavia
  ctx.drawImage(img, 0,0);

  console.log("Imagen lista...");
};

//-- Funcion del filtro de colores
function colorfilter() {
  //-- Mostrar los nuevos valores de los deslizadores en pantalla
  range_value_red.innerHTML = deslizador1.value;
  range_value_green.innerHTML = deslizador2.value;
  range_value_blue.innerHTML = deslizador3.value;

  //-- Situar la imagen original en el canvas
  //-- No se han hecho manipulaciones todavia
  ctx.drawImage(img, 0,0);

  //-- Obtener la imagen del canvas en pixeles
  let imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);

  //-- Obtener el array con todos los píxeles
  let data = imgData.data

  //-- Obtener los umbrales de colores de los deslizadores
  umbralrojo = deslizador1.value
  umbralverde = deslizador2.value
  umbralazul = deslizador3.value

  //-- Filtrar la imagen según los nuevos umbrales
  for (let i = 0; i < data.length; i+=4) {
    if (data[i] > umbralrojo)
      data[i] = umbralrojo;
    if (data[i+1] > umbralverde)
      data[i+1] = umbralverde;
    if (data[i+2] > umbralazul)
      data[i+2] = umbralazul;
  }

  //-- Poner la imagen modificada en el canvas
  ctx.putImageData(imgData, 0, 0);
}

//-- Funcion del filtro de grises
function grayfilter() {
  for (var i = 0; i < data.length; i+=4) {
    r = data[i];
    g = data[i+1];
    b = data[i+2];
    var brillo = (3 * r + 4 * g + b)/8
  }
  //-- Poner la imagen modificada en el canvas
  ctx.putImageData(imgData, 0, 0);
}

//-- Funcion de retrollamada del deslizador
deslizador.oninput = () => {


console.log("Fin...");
