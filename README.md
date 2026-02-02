# Enfoques de Desarrollo de Aplicaciones Móviles Multiplataforma UNLP

## Instalación del proyecto

```bash
# Clonar el repositorio
git clone https://github.com/manuelguido/Enfoques-de-Desarrollo-de-Aplicaciones-Moviles-Multiplataforma-UNLP.git
cd Enfoques-de-Desarrollo-de-Aplicaciones-Moviles-Multiplataforma-UNLP

# Instalar dependencias
pnpm install

# Generar el proyecto nativo
pnpm run prebuild:clean
```

## Para generar un APK para android hay que seguir estos pasos:

```bash
pnpm run build:apk:all
```

El APK se genera en: `android/app/build/outputs/apk/release/app-release.apk`

---

## Probar en Dispositivo Android Físico

### Opción 1: Instalar APK directamente

1. Descargar [BooksApp.apk](https://github.com/manuelguido/Enfoques-de-Desarrollo-de-Aplicaciones-Moviles-Multiplataforma-UNLP/raw/2286d704c608cef751bcdd404aae891d25ce5035/BooksApp.apk).

2. Instalar en el dispositivo.

### Opción 2: Expo Go

1. Instalar [Expo Go](https://play.google.com/store/apps/details?id=host.exp.exponent) en el dispositivo.
2. Ejecutar `pnpm start`.
3. Escanear el código QR con la cámara.

---

## Configuración de entorno para Android:

Agregar al archivo de perfil (`~/.zshrc` o `~/.bashrc`):

```bash
export ANDROID_HOME=$HOME/Library/Android/sdk  # Mac con Android Studio
# o
export ANDROID_HOME=/opt/homebrew/share/android-commandlinetools  # Mac con Homebrew

export PATH=$PATH:$ANDROID_HOME/platform-tools
export PATH=$PATH:$ANDROID_HOME/emulator
```
