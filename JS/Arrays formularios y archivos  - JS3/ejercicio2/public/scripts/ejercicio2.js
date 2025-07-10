document.addEventListener("DOMContentLoaded", () => {
  // Muestra mensajes informativos debajo del botón
  const mostrarMensaje = (texto, tipo = "warning") => {
    const div = document.getElementById("mensaje");
    div.textContent = texto;
    div.className = `mt-2 text-${tipo}`;
  };

  window.leerArchivo = function () {
    const archivo = document.getElementById("archivoTxt").files[0];
    if (!archivo) {
      mostrarMensaje("Seleccioná un archivo válido", "danger");
      return;
    }

    const lector = new FileReader();
    lector.onload = function (e) {
      const contenido = e.target.result;

      const lineas = contenido.split(/\r?\n/).map(l => l.trim()).filter(l => l !== "");
      const numeros = lineas.map(Number).filter(n => !isNaN(n));

      if (numeros.length === 0) {
        mostrarMensaje("El archivo no contiene números válidos", "danger");
        return;
      }

      const validos = numeros.filter(n => {
        const s = n.toString();
        return s[0] === s[s.length - 1];
      });

      const porcentaje = ((validos.length / numeros.length) * 100).toFixed(2);
      const ordenados = [...validos].sort((a, b) => a - b);

      const resultado = document.getElementById("resultadoFiltrado");
      resultado.innerHTML = `
        <h5>Resultados:</h5>
        <p><strong>Útiles:</strong> ${validos.length}</p>
        <p><strong>Inútiles:</strong> ${numeros.length - validos.length}</p>
        <p><strong>Porcentaje útiles:</strong> ${porcentaje}%</p>
        <p><strong>Números útiles (ordenados):</strong></p>
        <ul class="list-group mb-3">
          ${ordenados.map(n => `<li class="list-group-item bg-success text-white">${n}</li>`).join("")}
        </ul>
      `;

      // Prepara archivo descargable con los útiles
      const nuevoContenido = ordenados.join("\n");
      const blob = new Blob([nuevoContenido], { type: "text/plain" });
      const url = URL.createObjectURL(blob);

      const enlace = document.getElementById("descargarFiltrado");
      enlace.href = url;
      enlace.download = "filtrado.txt";
      enlace.style.display = "inline-block";

      mostrarMensaje("Archivo procesado correctamente", "success");
    };

    lector.readAsText(archivo);
  };
});
