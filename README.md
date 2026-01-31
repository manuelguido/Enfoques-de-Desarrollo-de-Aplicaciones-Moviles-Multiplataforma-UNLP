# Enfoques de Desarrollo de Aplicaciones Móviles Multiplataforma UNLP

## Instrucciones para probar el proyecto en un dispositivo físico

### Opción 1:

1. Instalar el archivo APK [BooksApp.apk](https://github.com/manuelguido/Enfoques-de-Desarrollo-de-Aplicaciones-Moviles-Multiplataforma-UNLP/raw/2286d704c608cef751bcdd404aae891d25ce5035/BooksApp.apk) de este directorio en el dispositivo.

### Opción 2:

1. Abrir un terminal y clonar este repositorio:

```
git clone https://github.com/manuelguido/Enfoques-de-Desarrollo-de-Aplicaciones-Moviles-Multiplataforma-UNLP.git
```

2. Ir al directorio del proyecto e instalar las dependencias:

```
cd Enfoques-de-Desarrollo-de-Aplicaciones-Moviles-Multiplataforma-UNLP
```

```
npm install
```

3. Correr el proyecto

```
npm start
```

4. Instalar la [Aplicación Expo Go](https://play.google.com/store/search?q=Expo&c=apps&hl=es_AR).

5. Correr `npm start` desde el terminal y escanear el código QR generado con la aplicación de la cámara del dispositivo.

## Para generar un APK para android hay que seguir estos pasos (los puntos 1 y 2 solo hay que correrlos la primera vez que se instala el proyexcto, y cada vez que se instala un paquete nuevo, sino solo es necesario el punto 3):

1. Instalar dependencias:

```
npm install
```

2. Generar el prebuild:

```
npx expo prebuild
```

3. Crear el APK:

```
npm run build:apk
```

- Nota, el archivo APK generado se encuentra en:

```
android/app/build/outputs/apk/release/app-release.apk
```

## Configuración de entorno para Android:

Para poder ejecutar la app en un emulador o dispositivo Android desde Expo CLI (usando `npm start` y luego la letra `a`), se debe tener configuradas las siguientes variables de entorno en el archivo de perfil(`~/.zshrc`, `~/.bashrc`):

```
export ANDROID_HOME=/ruta/a/tu/sdk/android
export PATH=$PATH:$ANDROID_HOME/platform-tools
```

- En Mac con Homebrew, la ruta suele ser `/opt/homebrew/share/android-commandlinetools`.
- En Linux suele ser `/usr/local/share/android-sdk`.
