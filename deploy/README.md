# Despliegue — VPS Hostinger

Servidor: `72.60.113.10` (`srv1866460.hstgr.cloud`), Hostinger KVM 4.

| Host | App | Puerto |
|---|---|---|
| `oddstradingview.com` | landing (raíz del repo) | 3000 |
| `www.oddstradingview.com` | → redirige al apex | — |
| `app.oddstradingview.com` | dashboard (`dashboard/`) | 3001 |

Nginx hace de reverse proxy sobre los dos procesos, PM2 los mantiene vivos y los
reinicia al arrancar la máquina, y Certbot renueva los certificados solo.

## Puesta en marcha (una vez)

**1. Registrar la clave SSH** en hPanel → VPS → *Administrador de SSH* → *Añadir
clave*, o pegándola en el servidor:

```bash
mkdir -p ~/.ssh && echo "<clave-publica>" >> ~/.ssh/authorized_keys
chmod 700 ~/.ssh && chmod 600 ~/.ssh/authorized_keys
```

**2. Registros DNS** en hPanel → Dominios → DNS. Tres registros `A` al VPS:

| Tipo | Nombre | Valor | TTL |
|---|---|---|---|
| A | `@` | `72.60.113.10` | 3600 |
| A | `www` | `72.60.113.10` | 3600 |
| A | `app` | `72.60.113.10` | 3600 |

**3. Provisionar** — instala Node 22, PM2, Nginx, firewall, clona el repo,
compila las dos apps y las levanta:

```bash
ssh root@72.60.113.10
git clone --depth 1 https://github.com/nostratechsas/oddstrading.git /var/www/oddstrading
bash /var/www/oddstrading/deploy/setup-server.sh
```

En este punto el sitio ya responde por HTTP.

**4. HTTPS**, cuando el DNS haya propagado (el script lo comprueba antes de
pedirle nada a Let's Encrypt, para no gastar el límite de intentos):

```bash
bash /var/www/oddstrading/deploy/enable-tls.sh
```

## Actualizar

```bash
ssh root@72.60.113.10 'bash /var/www/oddstrading/deploy/deploy.sh'
```

Trae `origin/main`, reinstala dependencias, recompila y recarga PM2.

## Variables de entorno

Viven en `/var/www/oddstrading/.env.production`, **fuera del repo**. El script de
provisión las crea solo si no existen, así que re-ejecutarlo nunca pisa valores
reales.

| Variable | Estado |
|---|---|
| `NEXT_PUBLIC_SITE_URL` | `https://oddstradingview.com` |
| `CONTACT_ENDPOINT` | vacío — ver aviso |
| `CHECKOUT_ENDPOINT` | vacío — ver aviso |

> [!warning] Los leads no le llegan a nadie
> Con esas dos vacías, `/api/contact` y `/api/checkout` responden correctamente
> pero solo escriben en el log de PM2. Quien rellene el formulario creerá que su
> mensaje se envió. Léelos con `pm2 logs oddstrading-landing` hasta que apunten a
> un CRM o webhook real.

`NEXT_PUBLIC_*` se incrusta en el bundle **al compilar**, no al arrancar: si
cambias esa variable hay que volver a ejecutar `deploy.sh`, no basta con
reiniciar PM2.

## Diagnóstico

```bash
pm2 list                          # estado de los dos procesos
pm2 logs oddstrading-landing      # log de la landing (incluye los leads)
pm2 logs oddstrading-dashboard
nginx -t && systemctl reload nginx
certbot certificates              # caducidad de los certificados
curl -I https://oddstradingview.com
```

Los logs quedan en `/var/www/oddstrading/logs/`.
