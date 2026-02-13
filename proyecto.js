// ===============================
// Variables útiles
// Precio base de la cotización, en quetzales
// ===============================
var precio_base = 2000;

// ===============================
// Valores de los recargos por edad del asegurado
// ===============================
var edad_18 = 0.1;   // 10% si tiene entre 18 y 24 años
var edad_25 = 0.2;   // 20% si tiene entre 25 y 49 años
var edad_50 = 0.3;   // 30% si tiene 50 años o más

// ===============================
// Valores de los recargos por edad del cónyuge
// ===============================
var casado_18 = 0.1; // 10%
var casado_25 = 0.2; // 20%
var casado_50 = 0.3; // 30%

// ===============================
// Otros recargos
// ===============================
var hijos_recargo = 0.2;  // 20% por cada hijo
var recargo_propiedad = 0.35;  // 35% por cada propiedad
var recargo_ingresos = 0.05;   // 5% sobre el salario mensual

// ===============================
// Función principal de cotización
// ===============================
function iniciarCotizacion() {

  // Variables para acumular recargos
  var recargo = 0;
  var recargo_total = 0;
  
  // ===============================
  // Solicitud del nombre del asegurado
  // ===============================
  var nombre = prompt("Ingrese su nombre o escriba 'Salir'");
  if (nombre === null || nombre.toUpperCase() === "SALIR") {
    alert("Programa finalizado");
    return;
  }

  // ===============================
  // Solicitud y validación de la edad
  // ===============================
  var edad_numero = parseInt(prompt("¿Cuántos años tiene?"));
  if (isNaN(edad_numero) || edad_numero < 18) {
    alert("Edad inválida o menor de edad");
    return iniciarCotizacion();
  }

  // ===============================
  // Estado civil y edad del cónyuge
  // ===============================
  var casado = prompt("¿Está casado? (si/no)");
  var edad_conyuge_numero = 0;

  if (casado && casado.toUpperCase() === "SI") {
    edad_conyuge_numero = parseInt(prompt("Edad del cónyuge"));
  }

  // ===============================
  // Información sobre hijos
  // ===============================
  var hijos = prompt("¿Tiene hijos? (si/no)");
  var cantidad_hijos = 0;

  if (hijos && hijos.toUpperCase() === "SI") {
    cantidad_hijos = parseInt(prompt("¿Cuántos hijos tiene?")) || 0;
  }

  // ===============================
  // Cálculo del recargo por edad del asegurado
  // ===============================
  if (edad_numero <= 24) recargo_total += precio_base * edad_18;
  else if (edad_numero <= 49) recargo_total += precio_base * edad_25;
  else recargo_total += precio_base * edad_50;
    
  // ===============================
  // Cálculo del recargo por edad del cónyuge
  // ===============================
  if (casado && casado.toUpperCase() === "SI") {
    if (edad_conyuge_numero <= 24) recargo_total += precio_base * casado_18;
    else if (edad_conyuge_numero <= 49) recargo_total += precio_base * casado_25;
    else recargo_total += precio_base * casado_50;
  }
  
  // ===============================
  // Cálculo del recargo por cantidad de hijos
  // ===============================
  if (cantidad_hijos > 0) {
    recargo_total += precio_base * hijos_recargo * cantidad_hijos;
  }

  // ===============================
  // Cálculo del recargo por propiedades
  // ===============================
  var propiedades = parseInt(prompt("¿Cuántas propiedades tiene?")) || 0;
  recargo_total += precio_base * recargo_propiedad * propiedades;

  // ===============================
  // Cálculo del recargo por ingresos mensuales
  // ===============================
  var salario = parseFloat(prompt("Ingrese su salario mensual")) || 0;
  recargo_total += salario * recargo_ingresos;

  // ===============================
  // Cálculo del precio final
  // ===============================
  var precio_final = precio_base + recargo_total;
  
  // ===============================
  // Resultados finales
  // ===============================
  alert("Asegurado: " + nombre);
  alert("Recargo total: Q" + recargo_total.toFixed(2));
  alert("Precio final: Q" + precio_final.toFixed(2));

  // ===============================
  // Opción para repetir la cotización
  // ===============================
  if (confirm("¿Desea realizar otra cotización?")) {
    setTimeout(iniciarCotizacion, 100);
  } else {
    alert("Programa finalizado");
  }
}

// ===============================
// Inicio del programa
// ===============================
iniciarCotizacion();
