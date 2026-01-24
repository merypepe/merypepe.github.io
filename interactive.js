// script.js

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("form-rsvp");
  const respuesta = document.getElementById("respuesta-form");

  // Manejo de envío del formulario
  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const formData = new FormData(form);

    fetch(
      "https://script.google.com/macros/s/AKfycbykLOu5VBHkMo_77wwMC0BLDPLTRgvgBy_772hom4fXe6watsMvn29ZQzmFGeTSJAdJ/exec",
      {
        method: "POST",
        mode: "no-cors",
        body: JSON.stringify(Object.fromEntries(formData)),
        headers: { "Content-Type": "application/json" },
      }
    )
      .then(() => {
        respuesta.textContent = "¡Gracias por confirmar!";
        respuesta.style.color = "green";
        form.reset();
      })
      .catch(() => {
        respuesta.textContent = "Error al enviar. Intenta de nuevo.";
        respuesta.style.color = "red";
      });
  });
});
