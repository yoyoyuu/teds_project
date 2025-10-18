# TEDS Project

## Comandos

### npm 

Instala las dependencias del proyecto con el siguiente comando:

```sh
npm install
```

Los siguientes comandos son scripts definidos en el archivo `package.json` del proyecto. Puedes ejecutarlos usando `npm run <comando>`.

Inicia el servidor de desarrollo local:

```sh
npm run dev
```

Construye el sitio para producción:

```sh
npm run build
```

Previsualiza la construcción localmente:

```sh
npm run preview
```

Ejecuta comandos de la CLI de Astro:

```sh
npm run astro ...
```

Donde `...` es el comando que deseas ejecutar, por ejemplo, `astro add` o `astro check`.

Obtén ayuda sobre la CLI de Astro:

```sh
npm run astro -- --help
```

### git

Obtén ayuda sobre los comandos de Git:

```sh
git help
```

![Git Staging Areas](https://i.sstatic.net/qPcFI.png)

Añade un archivo o carpeta específica al área de preparación (staging area):

```sh
git add <ruta>
```

Donde `<ruta>` es la ruta al archivo o carpeta que deseas agregar, por ejemplo, `./README.md`, `./src/components/`, `./public/image.png`, etc.

También puedes agregar todos los archivos modificados con:

```sh
git add .
```

Remover un archivo del área de preparación, puedes usar:

```sh
git reset <ruta>
```

O si quieres remover todos los archivos del área de preparación:

```sh
git reset
```

Para confirmar todos los cambios en el área de preparación con un mensaje descriptivo, utiliza:

```sh
git commit -m "Mensaje del commit"
```

Para deshacer el último commit pero mantener los cambios en el área de preparación, usa:

```sh
git reset --soft HEAD~1
```

Para deshacer el último commit y eliminar los cambios del área de preparación, utiliza:

```sh
git reset --hard HEAD~1
```

Para deshacer todos los cambios en el área de trabajo y el área de preparación desde el último commit, usa:

```sh
git reset --hard
```

Revisa el estado de los archivos en el repositorio:

```sh
git status
```

También puedes usar el siguiente comando para un resumen más conciso:

```sh
git status -s
```

Para mostrar el historial de commits:

```sh
git log
```

Para ver un historial de commits más compacto:

```sh
git log --oneline
```

Para ver todas las ramas en el repositorio local:

```sh
git branch
```

Para crear una nueva rama:

```sh
git branch <nombre-rama>
```

Para cambiar a una rama específica:

```sh
git checkout <nombre-rama>
```

Para crear y cambiar a una nueva rama en un solo comando:

```sh
git checkout -b <nombre-rama>
```

Para fusionar una rama específica en la rama actual:

```sh
git merge <nombre-rama>
```

Para eliminar una rama específica:

```sh
git branch -d <nombre-rama>
```

Para enviar tus commits al repositorio remoto:

```sh
git push
```

Para enviar tus commits de una rama que no se rastrea aún en el repositorio remoto:

```sh
git push -u origin <nombre-rama>
```

Para obtener los últimos cambios del repositorio remoto y fusionarlos con tu rama actual:

```sh
git pull
```

## Lista de archivos y carpetas

- `.astro/` - Carpeta generada automáticamente que contiene archivos de configuración y caché de Astro.
- `.vscode/` - Carpeta de configuración para Visual Studio Code.
  - `.vscode/extensions.json` - Archivo que lista las extensiones recomendadas para el proyecto.
  - `.vscode/launch.json` - Archivo de configuración para lanzar y depurar el proyecto en VS Code.
- `db/` - Carpeta que contiene archivos relacionados con la base de datos.
  - `db/config.ts` - Archivo de configuración de la base de datos.
  - `db/seed.ts` - Archivo para poblar la base de datos con datos iniciales.
- `node_modules/` - Carpeta que contiene las dependencias instaladas del proyecto.
- `public/` - Carpeta que contiene archivos estáticos accesibles públicamente.
- `src/` - Carpeta que contiene el código fuente del proyecto.
  - `src/components/` - Carpeta para componentes reutilizables.
    - `src/components/core/` - Carpeta para componentes centrales del proyecto.
  - `src/layouts/` - Carpeta para diseños de página.
  - `src/pages/` - Carpeta para las páginas del sitio web.
  - `src/styles/` - Carpeta para archivos de estilos CSS.
- `.gitignore` - Archivo que especifica qué archivos y carpetas deben ser ignorados por Git.
- `.prettierignore` - Archivo que especifica qué archivos y carpetas deben ser ignorados por Prettier.
- `.prettierrc` - Archivo de configuración para Prettier, el formateador de código.
- `astro.config.mjs` - Archivo de configuración principal de Astro.
- `package-lock.json` - Archivo que registra las versiones exactas de las dependencias instaladas.
- `package.json` - Archivo que contiene metadatos del proyecto y scripts de npm.
- `README.md` - Archivo de documentación del proyecto (este archivo).
- `tsconfig.json` - Archivo de configuración para TypeScript.

## Dependencias

### Principales

- `@astrojs/db` - Integración de base de datos para Astro.
- `@astrojs/react` - Integración de React para Astro.
- `@astrojs/vercel` - Adaptador para desplegar en Vercel.
- `@tailwindcss/vite` - Plugin de Tailwind CSS para Vite.
- `@types/react` - Tipos TypeScript para React.
- `@types/react-dom` - Tipos TypeScript para React DOM.
- `astro` - Framework de construcción de sitios web estáticos.
- `react` - Biblioteca para construir interfaces de usuario.
- `react-dom` - Biblioteca para manipular el DOM con React.
- `tailwindcss` - Framework de CSS utilitario.

### Desarrollo

- `prettier` - Formateador de código.
- `prettier-plugin-astro` - Plugin de Prettier para formatear archivos Astro.
- `prettier-plugin-tailwindcss` - Plugin de Prettier para ordenar clases de Tailwind CSS.

## Recursos

- [Documentación de Astro](https://docs.astro.build)
  - **Enrutamiento y navegación**:
    - [Páginas](https://docs.astro.build/en/basics/astro-pages/)
    - [Enrutamiento](https://docs.astro.build/en/guides/routing/)
  - **Construcción de interfaz de usuario**:
    - [Componentes](https://docs.astro.build/en/basics/astro-components/)
    - [Diseños](https://docs.astro.build/en/basics/layouts/)
  - **Renderización desde el lado del servidor**:
    - [Renderización por demanda (SSR)](https://docs.astro.build/en/guides/on-demand-rendering/)
- [Documentación de Tailwind CSS](https://tailwindcss.com/docs)
  - **Conceptos fundamentales**:
    - [Estilizar con clases de utilidad](https://tailwindcss.com/docs/styling-with-utility-classes)
    - [Flotado, enfoque y otros estados](https://tailwindcss.com/docs/hover-focus-and-other-states)
    - [Diseño responsivo](https://tailwindcss.com/docs/responsive-design)
