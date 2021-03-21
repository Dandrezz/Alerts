## Vamos a comenzar
Esta API Rest utiliza los servicios del API de Telegram para enviar alertas de eventos que se producen en distintas fuentes de métricas y logs.
<ul>
<li>Prometheus</li>
<li>LogStash</li>
</ul>
Para esto en necesario ingresar el puerto en donde se ejecutara el programa, las credenciales de un bot de Telegram y el ID de Usuario al que se enviara las alertas en un archivo <strong>.env</strong>.
  ```javascript
  PORT={PORT}
  BOT_TOKEN={TOKEN}
  BOT_CHATID={CHATID}
  ```
