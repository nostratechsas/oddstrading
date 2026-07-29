# Logos de casas de apuestas

Deja aquí el archivo oficial de cada operador con el **slug** como nombre, tal
como está definido en `src/data/mocks/bookmakers.ts`:

```
bet365.svg
betano.svg
betplay.png
pinnacle.webp
```

Extensiones aceptadas, en orden de prioridad: `.svg`, `.png`, `.webp`, `.avif`.
Si hay dos archivos con el mismo slug, gana el de mayor prioridad.

`src/utils/assets/bookmaker-logos.ts` lee esta carpeta en el servidor al
arrancar, así que **no hay que registrar nada en código**: basta con soltar el
archivo y reiniciar el dev server. Mientras un logo no exista, su tarjeta se
dibuja con el color de marca del operador.

> Estos logos son marcas registradas de sus titulares. Coloca aquí únicamente
> archivos que tengas licencia o autorización para mostrar — normalmente los del
> kit de prensa o del programa de afiliados de cada operador.
