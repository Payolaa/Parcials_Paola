// Colores disponibles para el juego
var buttonColours = ["red", "blue", "green", "yellow"];

// Patrón que genera el juego y el que selecciona el usuario
var gamePattern = [];
var userClickedPattern = [];

// Control de inicio y nivel del juego
var started = false;
var level = 0;

// Detecta cuando se presiona una tecla para iniciar el juego
$(document).keypress(function() {
  if (!started) {
    $("#level-title").text("Level " + level); // Muestra el nivel actual
    nextSequence(); // Inicia la primera secuencia
    started = true; // Marca que el juego ha comenzado
  }
});

// Detecta los clics en los botones de color
$(".btn").click(function() {
  var userChosenColour = $(this).attr("id"); // Obtiene el color seleccionado por el usuario
  userClickedPattern.push(userChosenColour); // Agrega el color al patrón del usuario

  playSound(userChosenColour); // Reproduce el sonido correspondiente al color
  animatePress(userChosenColour); // Añade animación al botón presionado

  checkAnswer(userClickedPattern.length - 1); // Verifica si el patrón es correcto
});

// Verifica si la respuesta del usuario es correcta
function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    // Si el usuario ha terminado de ingresar la secuencia correcta
    if (userClickedPattern.length === gamePattern.length) {
      // Genera la siguiente secuencia después de un pequeño retraso
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  } else {
    // Si el usuario se equivoca
    playSound("wrong");
    $("body").addClass("game-over"); // Muestra la clase de "game-over"
    $("#level-title").text("Game Over, Press Any Key to Restart"); // Mensaje de fin de juego

    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);

    startOver(); // Reinicia el juego
  }
}

// Genera la siguiente secuencia del juego
function nextSequence() {
  userClickedPattern = []; // Reinicia el patrón del usuario para la nueva secuencia
  level++; // Aumenta el nivel
  $("#level-title").text("Level " + level); // Muestra el nuevo nivel

  var randomNumber = Math.floor(Math.random() * 4); // Genera un número aleatorio
  var randomChosenColour = buttonColours[randomNumber]; // Elige un color aleatorio
  gamePattern.push(randomChosenColour); // Lo agrega al patrón del juego

  // Añade un efecto de parpadeo al botón
  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour); // Reproduce el sonido correspondiente
}

// Añade animación a los botones cuando se presionan
function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

// Reproduce sonidos según el color
function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

// Reinicia el juego en caso de que el usuario pierda
function startOver() {
  level = 0; // Reinicia el nivel
  gamePattern = []; // Limpia el patrón del juego
  started = false; // Marca que el juego no ha comenzado
}