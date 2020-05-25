console.log("Ejecutando JS...");

//-- Obtener el objeto canvas
const canvas = document.getElementById("canvas");

//-- Sus dimensiones las hemos fijado en el fichero
//-- HTML. Las imprimimos en la consola
console.log(`canvas: Anchura: ${canvas.width}, Altura: ${canvas.height}`);

//-- Obtener el contexto para pintar en el canvas
const ctx = canvas.getContext("2d");

//-- Obtener Sonidos
const sonido_raqueta = new Audio("Raqueta.mp3");
const sonido_rebote = new Audio("Rebote.mp3");
const sonido_gol = new Audio("Gol.mp3");

//-- Estados del juego
const ESTADO = {
  INIT: 0,
  SAQUEIZQ: 1,
  JUGANDO: 2,
  SAQUEDCHO: 3,
}

//-- Variables de ESTADO
//-- Arrancamos desde el estado inicial
let estado = ESTADO.INIT;

//-- Declaramos los puntajes
var marcador_derecha = 0;
var marcador_izquierda = 0;

//-- Pintar todos los objetos en el canvas
function draw() {
  //----- Dibujar la Bola
  //-- Solo en el estado de jugando
  if (estado == ESTADO.JUGANDO) {
    bola.draw();
  }

  //-- Dibujar la raquetas
  raqI.draw();
  raqD.draw();

  //--------- Dibujar la red
  ctx.beginPath();

  //-- Estilo de la linea: discontinua
  //-- Trazos de 10 pixeles, y 10 de separacion
  ctx.setLineDash([10, 10]);
  ctx.strokeStyle = 'white';
  ctx.lineWidth = 2;
  //-- Punto superior de la linea. Su coordenada x está en la mitad
  //-- del canvas
  ctx.moveTo(canvas.width/2, 0);

  //-- Dibujar hasta el punto inferior
  ctx.lineTo(canvas.width/2, canvas.height);
  ctx.stroke();

  //------ Dibujar el tanteo
  ctx.font = "25px Arial";
  ctx.fillStyle = "white";
  ctx.fillText(marcador_izquierda, 200, 80);
  ctx.fillText(marcador_derecha, 340, 80);

  //-- Dibujar el texto de sacar
  if (estado == ESTADO.SAQUEIZQ || estado == ESTADO.SAQUEDCHO) {
    ctx.font = "30px Arial";
    ctx.fillStyle = "yellow";
    ctx.fillText("Saca!", 30, 350);
  }

  //-- Dibujar el texto de comenzar
  if (estado == ESTADO.INIT) {
    ctx.font = "30px Arial";
    ctx.fillStyle = "green";
    ctx.fillText("Pulsa Start!", 30, 350);
  }
}

//---- Bucle principal de la animación
function animacion() {

  //-- Actualizar la raqueta con la velocidad actual
  raqI.update();
  raqD.update();


 //-- Comprobar si la bola ha alcanzado el límite derecho o izquierdo
 //-- Si es así, se cambia de signo la velocidad, para
 // que "rebote" y vaya en el sentido opuesto

 if (bola.x >= canvas.width) {
   estado = ESTADO.SAQUEDCHO;
   bola.initdcha();
   marcador_izquierda ++
   console.log("Tanto para la Raqueta Izquierda!!!")
   sonido_gol.currentTime = 0;
   sonido_gol.play();

 } else if (bola.x <= 0) {
   estado = ESTADO.SAQUEIZQ;
   bola.init();
   marcador_derecha ++;
   console.log("Tanto para la Raqueta Derecha!!!")
   sonido_gol.currentTime = 0;
   sonido_gol.play();

 } else if (bola.y >= canvas.height) {
   //-- Hay colisión. Cambiar el signo de la bola
   bola.vy = bola.vy * -1
   //-- Reproducir sonido
   sonido_rebote.currentTime = 0;
   sonido_rebote.play();

 } else if (bola.y <= 0) {
   //-- Hay colisión. Cambiar el signo de la bola
   bola.vy = bola.vy * -1
   //-- Reproducir sonido
   sonido_rebote.currentTime = 0;
   sonido_rebote.play();
 }

 //-- Comprobar si hay colisión con la raqueta izquierda
 if (bola.x >= raqI.x && bola.x <=(raqI.x + raqI.width) &&
     bola.y >= raqI.y && bola.y <=(raqI.y + raqI.height)) {
   bola.vx = bola.vx * -1;

   //-- Reproducir sonido
   sonido_raqueta.currentTime = 0;
   sonido_raqueta.play();
 }

 //-- Comprobar si hay colisión con la raqueta derecha
 if (bola.x >= raqD.x && bola.x <=(raqD.x + raqD.width) &&
     bola.y >= raqD.y && bola.y <=(raqD.y + raqD.height)) {
   bola.vx = bola.vx * -1;

   //-- Reproducir sonido
   sonido_raqueta.currentTime = 0;
   sonido_raqueta.play();
 }

 //-- Actualizar coordenada x de la bola, en funcion de
 //-- su velocidad
 bola.update()

  //-- Borrar la pantalla
  ctx.clearRect(0,0, canvas.width, canvas.height);

  //-- Dibujar el nuevo frame
  draw();

  //-- Vuelve a animarlo
  window.requestAnimationFrame(animacion);
}

//-- Inicializa la bola: Llevarla a su posicion inicial
const bola = new Bola(ctx);

//-- Crear las raquetas
const raqI = new Raqueta(ctx);
const raqD = new Raqueta(ctx);

//-- Cambiar las coordenadas de la raqueta derecha
raqD.x_ini = 540;
raqD.y_ini = 300;
raqD.init();

//-- Arrancar la animación
animacion();

//-- Retrollamada de las teclas
window.onkeydown = (e) => {


  //-- En el estado inicial no se
  //-- hace caso de las teclas
  if (estado == ESTADO.INIT)
    return;

  switch (e.key) {
    case "a":
      raqI.v = raqI.v_ini;
      break;
    case "q":
      raqI.v = raqI.v_ini * -1;
      break;
    case "p":
      raqD.v = raqD.v_ini * -1;
      break;
    case "l":
      raqD.v = raqD.v_ini;
      break;
    case " ":

      //-- El saque solo funciona en el estado de SAQUE
      if (estado == ESTADO.SAQUEIZQ) {
        //-- Reproducir sonido
        sonido_raqueta.currentTime = 0;
        sonido_raqueta.play();

        //-- Llevar bola a su posicion incicial
        bola.init();

        //-- Darle velocidad
        bola.vx = bola.vx_ini;
        bola.vy = bola.vy_ini;

        //-- Cambiar al estado de jugando!
        estado = ESTADO.JUGANDO;

        return false;
      }

      if (estado == ESTADO.SAQUEDCHO) {
        //-- Reproducir sonido
        sonido_raqueta.currentTime = 0;
        sonido_raqueta.play();

        //-- Llevar bola a su posicion incicial
        bola.initdcha();

        //-- Darle velocidad
        bola.vx = bola.vx_ini_d;
        bola.vy = bola.vy_ini_d;

        //-- Cambiar al estado de jugando!
        estado = ESTADO.JUGANDO;

        return false;
      }
    default:
  }
}

//-- Retrollamada de la liberacion de teclas
window.onkeyup = (e) => {
  if (e.key == "a" || e.key == "q"){
    //-- Quitar velocidad de la raqueta izquierda
    raqI.v = 0;
  }

  if (e.key == "p" || e.key == "l") {
    //-- Quitar velocidad de la raqueta derecha
    raqD.v = 0;
  }
}

//-- Botón de arranque
const start = document.getElementById("start");

start.onclick = () => {
  estado = ESTADO.SAQUE;
  console.log("SAQUE!");
  canvas.focus();
}

//-- Boton de stop
const stop = document.getElementById("stop");

stop.onclick = () => {
  //-- Volver al estado inicial
  estado = ESTADO.INIT;
  bola.init();
  marcador_izquierda = 0;
  marcador_derecha = 0;
  start.disabled = false;
}
