console.log("Ejecutando JS....")

//-- Obtener elementos del DOM
const canvas = document.getElementById('canvas');
const img = document.getElementById('imagesrc')
const ctx = canvas.getContext('2d');

//-- Acceso a los distintos deslizadores
const redslider = document.getElementById('rojo');
const greenslider = document.getElementById('verde');
const blueslider = document.getElementById('azul');

//-- Valor de los distintos deslizadores
const value_redslider = document.getElementById('range_value_red')
const value_greenslider = document.getElementById('range_value_green')
const value_blueslider = document.getElementById('range_value_blue')

//--Botones para hacer que el filtro se aplique en color o en escala de grises
const colors = document.getElementById('colores')
const grayscale = document.getElementById('grises')
const invertcolors = document.getElementById('invertircolores')

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


//-- Filtro de colores
colors.onclick = () => {
  colors.style.border = '3px solid orange';
  grayscale.style.border = '0px';
  invertcolors.style.border = '0px';

  ctx.drawImage(img, 0,0);

  //-- Funcion de retrollamada del deslizador 1 que es el rojo
  redslider.oninput = () => {
    //-- Mostrar el nuevo valor del deslizador rojo en pantalla
    value_redslider.innerHTML = redslider.value;

    ctx.drawImage(img, 0,0);

    //-- Obtener la imagen del canvas en pixeles
    let imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);

    //-- Obtener el array con todos los píxeles
    let data = imgData.data

    //-- Obtener el umbral de rojo del deslizador
    umbralrojo = redslider.value

    //-- Filtrar la imagen según el nuevo umbral de rojo
    for (let i = 0; i < data.length; i+=4) {
      if (data[i] > umbralrojo)
        data[i] = umbralrojo;
    }

    //-- Poner la imagen modificada en el canvas
    ctx.putImageData(imgData, 0, 0);
  }

  //-- Funcion de retrollamada del deslizador 2 que es el verde
  greenslider.oninput = () => {
    //-- Mostrar el nuevo valor del deslizador verde en pantalla
    value_greenslider.innerHTML = greenslider.value;

    ctx.drawImage(img, 0,0);

    let imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);

    let data = imgData.data

    //-- Obtener el umbral de verde del deslizador
    umbralverde = greenslider.value

    //-- Filtrar la imagen según el nuevo umbral de verde
    for (let i = 0; i < data.length; i+=4) {
      if (data[i+1] > umbralverde)
        data[i+1] = umbralverde;
    }

    ctx.putImageData(imgData, 0, 0);
  }

  //-- Funcion de retrollamada del deslizador 3 que es el azul
  blueslider.oninput = () => {
    //-- Mostrar el nuevo valor del deslizador azul en pantalla
    value_blueslider.innerHTML = blueslider.value;

    ctx.drawImage(img, 0,0);

    let imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);

    let data = imgData.data

    //-- Obtener el umbral de azul del deslizador
    umbralazul = blueslider.value

    //-- Filtrar la imagen según el nuevo umbral de azul
    for (let i = 0; i < data.length; i+=4) {
      if (data[i+2] > umbralazul)
        data[i+2] = umbralazul;
    }

    ctx.putImageData(imgData, 0, 0);
  }
}


//-- Filtro de escala de grises
grayscale.onclick = () => {
  colors.style.border = '0px';
  grayscale.style.border = '3px solid orange';
  invertcolors.style.border = '0px';

  ctx.drawImage(img, 0,0);

  let imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);

  let data = imgData.data

  //-- Tiene la funcion de obtener los valores RGB de cada pixel
  //-- para despues calcular el nivel de gris y lo asigna a ese pixel
  for (var i = 0; i < data.length; i+=4) {
    r = data[i];
    g = data[i+1];
    b = data[i+2];

  let brightness = (3 * r + 4 * g + b)/8
    data[i] = brightness;
    data[i+1] = brightness;
    data[i+2] = brightness;
  }

  ctx.putImageData(imgData, 0, 0);
}


//-- Filtro de inversión de colores.
//-- útil para obtener un positivo desde una imagen en negativo.
invertcolors.onclick = () => {
  colors.style.border = '0px';
  grayscale.style.border = '0px';
  invertcolors.style.border = '3px solid orange';

  ctx.drawImage(img, 0,0);

  let imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);

  let data = imgData.data

  for (var i = 0; i < data.length; i+=4) {
    r = data[i];
    g = data[i+1];
    b = data[i+2];

    data[i] = 255 - r;
    data[i+1] = 255 - g;
    data[i+2] = 255 - b;
  }

  ctx.putImageData(imgData, 0, 0);
}

console.log("Fin...");
