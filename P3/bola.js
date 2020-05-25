class Bola {
  constructor(ctx) {
    //-- Guardar el contexto de dibujo
    this.ctx = ctx;

    //-- Constante: Tamaño de la bola
    this.size = 5;

    //-- Constante: Posicion inicial de la bola en la raqueta izquierda
    this.x_ini_i = 100;
    this.y_ini_i = 200;

    //-- Constante: Posicion inicial de la bola en la raqueta derecha
    this.x_ini_d = 500;
    this.y_ini_d = 200;

    //-- Posicion generica de la bola
    this.x = 0;
    this.y = 0;

    //-- Velocidad inicial de la bola en la raqueta izquierda
    this.vx_ini_i = 6;
    this.vy_ini_i = 2;

    //-- Velocidad inicial de la bola en la raqueta derecha
    this.vx_ini_d = -6;
    this.vy_ini_d = 2;

    //-- Velocidad genérica de la bola
    //-- Inicialmente a cero
    this.vx = 0;
    this.vy = 0;

    //-- Inicializar
    this.init();
  }

  draw() {
    //----- Dibujar la Bola
    this.ctx.beginPath();
    this.ctx.fillStyle='white';

    //-- x,y, anchura, altura
    this.ctx.rect(this.x, this.y, this.size, this.size);
    this.ctx.fill();
  }

  init() {
    //-- Inicializa la bola: A su posicion inicial en la raqueta izquierda
    this.x = this.x_ini_i;
    this.y = this.y_ini_i;
    this.vx = 0;
    this.vy = 0;
  }

  initdcha() {
    //-- Inicializa la bola: A su posicion inicial en la raqueta derecha
    this.x = this.x_ini_d;
    this.y = this.y_ini_d;
    this.vx = 0;
    this.vy = 0;
  }

  update() {
    this.x += this.vx;
    this.y += this.vy;
  }
}
