# Enfoques de Desarrollo de Aplicaciones Móviles Multiplataforma UNLP

## Instrucciones para probar el proyecto en un dispositivo físico

### Opción 1:

1. Instalar el archivo APK `BooksApp.apk` de este directorio en el dispositivo.

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

## Comando para hacer el build del APK.

```
adb install -r BooksApp.apk
```
