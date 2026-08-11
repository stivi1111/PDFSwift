/** Textos en español de las 24 páginas. Ver en.js para el criterio. */
module.exports = {
  lingua: 'Español',
  etichette: {
    passi: 'Cómo se hace',
    faq: 'Preguntas frecuentes',
    altri: 'Las 24 herramientas PDF',
    apri: 'Abrir la herramienta',
    browserBadge: 'Funciona en tu navegador: el archivo no sale de tu dispositivo',
    serverBadge: 'Procesado en nuestro servidor y borrado justo después',
  },

  strumenti: {
    'pdf-to-word': {
      titolo: 'PDF a Word — Gratis, sin registro',
      descrizione: 'Convierte un PDF en un documento Word editable. Conserva títulos, tablas e imágenes. Gratis, hasta 100 MB.',
      h1: 'Convertir PDF a Word',
      intro: 'Devuelve un PDF a un archivo <strong>.docx</strong> editable, reconstruyendo párrafos, tablas, títulos e imágenes en lugar de pegar cada página como una fotografía. Los encabezados, pies de página y la numeración se detectan y se trasladan al encabezado de Word en vez de acabar en mitad del texto.',
      passi: [
        'Arrastra el PDF que quieres editar, o haz clic para elegirlo.',
        'Espera la conversión: un documento de 10 páginas tarda unos segundos, un libro de 200 páginas alrededor de un minuto.',
        'Descarga el .docx y ábrelo con Word, Google Docs, LibreOffice o Pages.',
      ],
      faq: [
        { d: '¿Se mantiene la maquetación?', r: 'Texto, tablas, títulos, listas e imágenes se conservan. Los gráficos vectoriales complejos se convierten en imágenes, porque en Word no serían editables de todos modos.' },
        { d: '¿Funciona con un PDF escaneado?', r: 'No. Si el PDF es una fotografía de las páginas sin capa de texto no hay nada que extraer y el Word solo contendrá las imágenes. No hacemos reconocimiento de caracteres.' },
        { d: '¿Qué tamaño puede tener el archivo?', r: 'Hasta 100 MB y hasta 400 páginas. Para libros más largos, divide primero el PDF y convierte las partes.' },
      ],
    },

    'word-to-pdf': {
      titolo: 'Word a PDF — Gratis y fiel al original',
      descrizione: 'Convierte .docx o .doc en un PDF limpio que se ve igual en todas partes. Gratis, sin registro, hasta 100 MB.',
      h1: 'Convertir Word a PDF',
      intro: 'Convierte un documento de Word en un PDF que se ve idéntico en cualquier dispositivo, que es precisamente el motivo de enviar un PDF en lugar de un .docx. Saltos de página, tipografías, tablas e imágenes se quedan donde los pusiste.',
      passi: [
        'Sube tu archivo .docx o .doc.',
        'El documento lo compone LibreOffice, el programa que lee los archivos de Word con más fidelidad fuera de Microsoft Office.',
        'Descarga el PDF.',
      ],
      faq: [
        { d: '¿Se respetan mis tipografías?', r: 'Las tipografías comunes están instaladas en nuestro servidor y se representan exactamente. Una muy inusual puede sustituirse, y eso puede desplazar algo la maquetación: si es crítico, incrústala en el .docx o usa fuentes estándar.' },
        { d: '¿El índice sigue siendo pulsable?', r: 'Sí, los enlaces internos y los marcadores sobreviven a la conversión.' },
        { d: '¿Puedo convertir un archivo .doc antiguo?', r: 'Sí, aceptamos tanto el .docx moderno como el formato .doc heredado.' },
      ],
    },

    'pdf-to-excel': {
      titolo: 'PDF a Excel — Extrae tablas a .xlsx gratis',
      descrizione: 'Saca las tablas de un PDF a una hoja de Excel real con celdas funcionales. Gratis, sin registro.',
      h1: 'Convertir PDF a Excel',
      intro: 'Localiza las tablas dentro de un PDF y las reconstruye como celdas reales de hoja de cálculo, con las que puedes ordenar y calcular: no una imagen de una tabla. Cada tabla encontrada se convierte en una hoja del .xlsx.',
      passi: [
        'Sube el PDF que contiene las tablas.',
        'Se prueban dos métodos: uno rápido que lee la alineación del texto y otro más lento que sigue los bordes dibujados. Se queda el resultado más limpio.',
        'Descarga el .xlsx y ábrelo con Excel, Numbers o Hojas de cálculo de Google.',
      ],
      faq: [
        { d: '¿Y si dice que no encontró ninguna tabla?', r: 'Ocurre cuando la página no tiene una tabla que nuestro detector reconozca, normalmente una tabla sin líneas y con espaciado irregular. Falla diciéndolo, en vez de entregarte un archivo destrozado.' },
        { d: '¿Sobreviven las celdas combinadas?', r: 'Normalmente sí en tablas con bordes dibujados. Las tablas sin bordes y con celdas combinadas son el caso más difícil y pueden salir aplanadas.' },
        { d: '¿Lee una tabla escaneada?', r: 'No. Un escaneo no tiene texto que extraer, solo píxeles.' },
      ],
    },

    'excel-to-pdf': {
      titolo: 'Excel a PDF — Gratis, mantiene el formato',
      descrizione: 'Convierte .xlsx, .xls o .csv en un PDF limpio con tu formato intacto. Gratis y sin registro.',
      h1: 'Convertir Excel a PDF',
      intro: 'Imprime tu hoja de cálculo a PDF tal como saldría de Excel, conservando formatos numéricos, colores, bordes y anchos de columna. Útil cuando tienes que enviar cifras que nadie debería poder modificar por accidente.',
      passi: [
        'Sube el archivo .xlsx, .xls o .csv.',
        'Cada hoja se maqueta y se pagina.',
        'Descarga el PDF.',
      ],
      faq: [
        { d: '¿Se incluyen todas las hojas?', r: 'Sí, cada hoja del libro se representa en orden.' },
        { d: '¿Pasan las fórmulas?', r: 'Pasan los resultados. Un PDF no tiene el concepto de fórmula, así que lo que ves es el valor calculado.' },
        { d: '¿Puedo convertir un CSV simple?', r: 'Sí, un CSV se maqueta como una tabla sencilla.' },
      ],
    },

    'pdf-to-powerpoint': {
      titolo: 'PDF a PowerPoint — Convierte a .pptx gratis',
      descrizione: 'Convierte las páginas de un PDF en diapositivas de PowerPoint editables. Gratis, hasta 100 MB.',
      h1: 'Convertir PDF a PowerPoint',
      intro: 'Convierte cada página de un PDF en una diapositiva de una presentación .pptx, manteniendo el texto como cuadros de texto reales en lugar de aplanarlo en una imagen, así que lo escrito sigue siendo editable.',
      passi: [
        'Sube el PDF: funciona mejor con una presentación exportada a PDF.',
        'Cada página se convierte en una diapositiva.',
        'Descarga el .pptx y ábrelo con PowerPoint, Keynote o Presentaciones de Google.',
      ],
      faq: [
        { d: '¿Puedo editar el texto después?', r: 'Sí. El texto va en cuadros editables, no incrustado en una fotografía.' },
        { d: '¿Vuelven las animaciones?', r: 'No. Un PDF no registra animaciones ni transiciones: esa información se perdió al exportar la presentación.' },
        { d: '¿Y si mi PDF no es una presentación?', r: 'Funciona igual, pero una página A4 vertical convertida en diapositiva horizontal quedará rara. Esta herramienta está pensada para presentaciones.' },
      ],
    },

    'powerpoint-to-pdf': {
      titolo: 'PowerPoint a PDF — Conversor .pptx gratis',
      descrizione: 'Convierte una presentación de PowerPoint en un PDF que cualquiera puede abrir. Gratis, hasta 100 MB.',
      h1: 'Convertir PowerPoint a PDF',
      intro: 'Convierte una presentación en un PDF que se abre igual en cualquier dispositivo, sin tipografías que falten y sin riesgo de que alguien edite tus diapositivas.',
      passi: [
        'Sube tu archivo .pptx o .ppt.',
        'Cada diapositiva se convierte en una página del PDF.',
        'Descarga el PDF.',
      ],
      faq: [
        { d: '¿Se incluyen las notas del orador?', r: 'No, solo las diapositivas.' },
        { d: '¿Qué pasa con los vídeos de la presentación?', r: 'Un PDF no puede reproducir vídeo, así que en su lugar queda un fotograma fijo.' },
        { d: '¿Se mantienen las proporciones?', r: 'Sí, una presentación 16:9 produce páginas PDF 16:9.' },
      ],
    },

    'pdf-to-html': {
      titolo: 'PDF a HTML — Gratis, conserva la maquetación',
      descrizione: 'Convierte un PDF en una página web idéntica al original, tipografías y maquetación incluidas. Gratis.',
      h1: 'Convertir PDF a HTML',
      intro: 'Produce un único archivo HTML que reproduce el PDF página a página en un navegador, incrustando las tipografías y las imágenes para que el resultado se vea bien sin archivos adicionales al lado.',
      passi: [
        'Sube el PDF.',
        'Las páginas se convierten a HTML con las tipografías incrustadas.',
        'Descarga el archivo .html y ábrelo con cualquier navegador.',
      ],
      faq: [
        { d: '¿El HTML es lo bastante limpio para editarlo a mano?', r: 'No realmente. La conversión prioriza parecerse al PDF, así que el texto se posiciona al milímetro en vez de escribirse como párrafos simples. Está hecho para verse y publicarse, no para editarse a mano.' },
        { d: '¿Por qué el archivo es tan grande?', r: 'Las tipografías y las imágenes van empaquetadas dentro, para que la página funcione sola sin depender de nada externo.' },
        { d: '¿Puedo ponerlo en una web?', r: 'Sí, es un archivo autónomo que puedes subir donde quieras.' },
      ],
    },

    'html-to-pdf': {
      titolo: 'HTML a PDF — Convierte páginas web gratis',
      descrizione: 'Convierte un archivo HTML en un PDF compuesto por un motor de navegador real. Gratis, sin registro.',
      h1: 'Convertir HTML a PDF',
      intro: 'Compone tu HTML con Chromium, el motor que hay detrás de Chrome, así que el PDF sale como se ve la página en un navegador: hojas de estilo, maquetación y todo lo demás.',
      passi: [
        'Sube tu archivo .html o .txt.',
        'La página se compone y se pagina en A4.',
        'Descarga el PDF.',
      ],
      faq: [
        { d: '¿Aplica mi CSS?', r: 'Sí, los estilos dentro del archivo se aplican. Los cargados desde una dirección externa no se descargan.' },
        { d: '¿Se ejecuta el JavaScript?', r: 'Los scripts dentro del archivo se ejecutan antes de capturar la página, así que el contenido generado al cargar aparece.' },
        { d: '¿Puedo convertir una web por su dirección?', r: 'Con esta herramienta no: guarda antes la página como archivo HTML y súbela.' },
      ],
    },

    'markdown-to-pdf': {
      titolo: 'Markdown a PDF — Conversor .md gratis',
      descrizione: 'Convierte Markdown en un PDF bien compuesto, con títulos, bloques de código y tablas. Gratis.',
      h1: 'Convertir Markdown a PDF',
      intro: 'Toma un archivo Markdown y lo compone como un documento de verdad: títulos en una jerarquía correcta, bloques de código en monoespaciada, tablas con bordes, enlaces que siguen siendo pulsables.',
      passi: [
        'Sube tu archivo .md, .markdown o .txt.',
        'El Markdown se convierte en un documento con estilo y se compone en PDF.',
        'Descarga el PDF.',
      ],
      faq: [
        { d: '¿Qué variante de Markdown se admite?', r: 'Markdown estándar más las extensiones habituales: tablas, bloques de código delimitados, listas de tareas y tachado.' },
        { d: '¿Funcionan las imágenes?', r: 'Las imágenes indicadas con una dirección web se incluyen. Las que apuntan a archivos de tu ordenador no se pueden obtener.' },
        { d: '¿Se colorea el código?', r: 'Los bloques de código usan una tipografía monoespaciada sobre fondo tintado; no se aplica coloreado por lenguaje.' },
      ],
    },

    'compress-pdf': {
      titolo: 'Comprimir PDF — Reduce el tamaño gratis',
      descrizione: 'Reduce un PDF con tres niveles de calidad, de ligero a máximo. Medido: hasta un 40% menos. Gratis.',
      h1: 'Comprimir un PDF',
      intro: 'Reduce el tamaño de un PDF recodificando las imágenes que contiene, con tres niveles para que elijas tú el compromiso en lugar de aceptar lo que decida el programa.',
      passi: [
        'Sube el PDF que quieres aligerar.',
        'Elige el nivel: <strong>Ligera</strong> mantiene la calidad de impresión, <strong>Media</strong> es la opción sensata, <strong>Máxima</strong> da el archivo más pequeño para pantalla y correo.',
        'Descarga el PDF comprimido.',
      ],
      faq: [
        { d: '¿Cuánto se reduce?', r: 'Medido en un documento real de 5 MB: alrededor de un 19% menos con Ligera, un 34% con Media y un 40% con Máxima. Un PDF hecho casi solo de texto tiene poco que comprimir; uno lleno de fotografías, muchísimo.' },
        { d: '¿El texto se ve borroso?', r: 'No. El texto y los dibujos vectoriales siguen nítidos en todos los niveles: solo se recodifican las imágenes.' },
        { d: '¿Qué nivel elijo?', r: 'Media para casi todo. Ligera si el documento va a imprenta. Máxima solo si tiene que caber en el límite de un adjunto.' },
      ],
    },

    'protect-pdf': {
      titolo: 'Proteger PDF con contraseña — AES-256 gratis',
      descrizione: 'Bloquea un PDF con contraseña y cifrado AES-256 real. Gratis, el archivo se borra justo después.',
      h1: 'Proteger un PDF con contraseña',
      intro: 'Cifra el PDF con <strong>AES-256</strong>, el mismo estándar que se usa para documentos clasificados, así que sin la contraseña el archivo no se abre en absoluto. Es cifrado de verdad, no una marca que cualquier lector pueda ignorar.',
      passi: [
        'Sube el PDF que quieres bloquear.',
        'Escribe la contraseña que hará falta para abrirlo.',
        'Descarga el archivo protegido y comparte la contraseña por separado del documento.',
      ],
      faq: [
        { d: '¿Es cifrado real?', r: 'Sí, AES-256. Muchas herramientas que trabajan en el navegador solo ponen una marca de "no imprimir" que cualquier lector puede ignorar. Aquí el archivo se vuelve a cifrar, así que el contenido es ilegible sin la contraseña.' },
        { d: '¿Y si olvido la contraseña?', r: 'Nadie puede recuperarla, nosotros incluidos. Ese es el sentido del cifrado. Guárdala en un sitio seguro.' },
        { d: '¿Se puede quitar después?', r: 'Sí, con nuestra herramienta Desbloquear PDF, pero solo si conoces la contraseña.' },
      ],
    },

    'unlock-pdf': {
      titolo: 'Desbloquear PDF — Quita contraseña y restricciones',
      descrizione: 'Quita la contraseña de un PDF tuyo para poder imprimirlo, copiarlo y editarlo. Gratis, sin registro.',
      h1: 'Desbloquear un PDF',
      intro: 'Quita la contraseña y las restricciones de impresión, copia y edición de un PDF, devolviendo un archivo normal que puedes usar libremente. Necesitas conocer la contraseña actual.',
      passi: [
        'Sube el PDF protegido.',
        'Introduce su contraseña actual.',
        'Descarga el archivo desbloqueado.',
      ],
      faq: [
        { d: '¿Abre un PDF cuya contraseña no conozco?', r: 'No, y no está pensado para eso. Quita la protección de documentos que ya tienes derecho a abrir.' },
        { d: '¿Quita también los límites de impresión y copia?', r: 'Sí. Una vez retirado el cifrado se van con él las marcas de permisos.' },
        { d: '¿Cambia el contenido?', r: 'No. Solo se retira la capa de protección; páginas, texto e imágenes quedan intactos.' },
      ],
    },

    'grayscale-pdf': {
      titolo: 'PDF a escala de grises — Blanco y negro gratis',
      descrizione: 'Convierte un PDF en color a escala de grises para ahorrar tinta. El texto sigue nítido. Gratis.',
      h1: 'Convertir un PDF a escala de grises',
      intro: 'Convierte todos los colores del documento en tonos de gris, lo que reduce el gasto de tinta de color al imprimir y hace más uniformes los documentos con aspecto escaneado. El texto sigue siendo texto y sigue nítido.',
      passi: [
        'Sube el PDF en color.',
        'Los colores se convierten a gris mientras el texto y las formas vectoriales se conservan tal cual.',
        'Descarga el PDF en escala de grises.',
      ],
      faq: [
        { d: '¿Convierte las páginas en imágenes?', r: 'No. Es un atajo habitual en otras herramientas y deja el texto borroso e inseleccionable. Aquí el texto sigue siendo texto real.' },
        { d: '¿Puedo recuperar los colores?', r: 'Desde el archivo en gris no: la información de color ya no está. Conserva tu original.' },
        { d: '¿Hace el archivo más pequeño?', r: 'A menudo un poco, porque el gris ocupa menos que el color, pero es un efecto secundario, no el objetivo.' },
      ],
    },

    'pdf-to-markdown': {
      titolo: 'PDF a Markdown — .md gratis para IA y Notion',
      descrizione: 'Convierte un PDF en Markdown limpio para ChatGPT, Claude, Obsidian o Notion. Funciona en tu navegador.',
      h1: 'Convertir PDF a Markdown',
      intro: 'Extrae el texto de un PDF como Markdown limpio, que es el formato que mejor leen los modelos de lenguaje y las aplicaciones de notas. Esta herramienta funciona enteramente dentro de tu navegador: el documento no sale de tu ordenador.',
      passi: [
        'Arrastra el PDF.',
        'El texto se extrae y se estructura con títulos y párrafos de Markdown.',
        'Descarga el archivo .md y pégalo donde lo necesites.',
      ],
      faq: [
        { d: '¿Por qué Markdown para las herramientas de IA?', r: 'Lleva consigo la estructura — títulos, listas, énfasis — en texto plano, así el modelo lee la forma del documento en lugar de un muro de palabras indiferenciadas.' },
        { d: '¿Se sube mi archivo a algún sitio?', r: 'No. Esta herramienta funciona en tu navegador. No se envía nada a ninguna parte.' },
        { d: '¿Conserva las imágenes?', r: 'No, solo el texto. El Markdown por sí solo no puede llevar imágenes incrustadas.' },
      ],
    },

    'merge-pdf': {
      titolo: 'Unir PDF — Gratis, en tu propio navegador',
      descrizione: 'Une varios PDF en uno, en el orden que elijas. Funciona en el navegador, los archivos no se suben.',
      h1: 'Unir archivos PDF',
      intro: 'Une varios PDF en un solo documento, en el orden en que los añades. Funciona enteramente en tu navegador, así que tus archivos no se suben a ninguna parte: algo que importa bastante cuando son contratos o informes médicos.',
      passi: [
        'Selecciona o arrastra todos los PDF que quieras unir.',
        'Se unen en el orden en que aparecen en la lista.',
        'Descarga el PDF combinado.',
      ],
      faq: [
        { d: '¿Se suben mis archivos a un servidor?', r: 'No. La unión ocurre dentro de tu navegador y los archivos se quedan en tu dispositivo.' },
        { d: '¿Cuántos puedo unir a la vez?', r: 'Todos los que tu dispositivo pueda mantener en memoria. Unas decenas de documentos normales no son problema.' },
        { d: '¿Sobreviven marcadores y enlaces?', r: 'El contenido de las páginas y los enlaces internos de cada documento se conservan.' },
      ],
    },

    'split-pdf': {
      titolo: 'Dividir PDF — Extrae páginas gratis en el navegador',
      descrizione: 'Saca páginas o intervalos de un PDF a un archivo nuevo. En el navegador, no se sube nada.',
      h1: 'Dividir un PDF',
      intro: 'Toma las páginas que indiques y las pone en un PDF nuevo, dejando el original intacto. Útil para sacar un capítulo de un libro o una sola factura de un lote. Funciona en tu navegador.',
      passi: [
        'Arrastra el PDF.',
        'Escribe las páginas que quieres, por ejemplo <strong>1-3, 7, 12-15</strong>.',
        'Descarga el nuevo PDF solo con esas páginas.',
      ],
      faq: [
        { d: '¿Cómo se escribe el intervalo de páginas?', r: 'Intervalos con guion y páginas sueltas separadas por comas: 1-3, 7, 12-15.' },
        { d: '¿Se sube mi documento?', r: 'No, la división ocurre en tu navegador.' },
        { d: '¿Puedo dividirlo en muchos archivos de una vez?', r: 'Esta herramienta produce un archivo por ejecución. Vuelve a lanzarla con otro intervalo para cada parte que necesites.' },
      ],
    },

    'pdf-to-jpg': {
      titolo: 'PDF a JPG — Convierte páginas en imágenes gratis',
      descrizione: 'Convierte cada página de un PDF en una imagen de alta resolución, dentro de un ZIP. En el navegador.',
      h1: 'Convertir PDF a JPG',
      intro: 'Convierte cada página del PDF en una imagen de alta resolución y las empaqueta en un ZIP. Práctico para diapositivas, publicaciones en redes o allí donde una imagen es más cómoda que un documento. Funciona en el navegador.',
      passi: [
        'Arrastra el PDF.',
        'Cada página se dibuja en alta resolución.',
        'Descarga el ZIP con una imagen por página.',
      ],
      faq: [
        { d: '¿Qué resolución obtengo?', r: 'Las páginas se dibujan a aproximadamente el doble de su tamaño nominal, lo bastante nítido para pantalla y para la mayoría de impresiones.' },
        { d: '¿Por qué un ZIP?', r: 'Un PDF de cien páginas supondría cien descargas separadas. Un solo archivo es más cómodo.' },
        { d: '¿Se suben mis páginas?', r: 'No, el dibujado ocurre en tu navegador.' },
      ],
    },

    'jpg-to-pdf': {
      titolo: 'JPG a PDF — Imágenes a PDF gratis en el navegador',
      descrizione: 'Convierte fotos o escaneos en un solo PDF ordenado, una imagen por página. En el navegador.',
      h1: 'Convertir imágenes a PDF',
      intro: 'Pone tus fotos o escaneos en un solo PDF, una imagen por página, en el orden en que las añades. El motivo más habitual es convertir fotos de un documento hechas con el móvil en algo que se pueda enviar de verdad. Funciona en el navegador.',
      passi: [
        'Selecciona todas las imágenes que quieras, en el orden que quieras.',
        'Cada imagen se convierte en una página ajustada a ella.',
        'Descarga el PDF.',
      ],
      faq: [
        { d: '¿Qué formatos de imagen funcionan?', r: 'JPG, PNG y los demás formatos que tu navegador sepa mostrar.' },
        { d: '¿Puedo cambiar el orden?', r: 'Las páginas siguen el orden en que los archivos aparecen en la lista, así que selecciónalos en el orden que quieras.' },
        { d: '¿Se suben mis fotos?', r: 'No. Todo ocurre en tu dispositivo.' },
      ],
    },

    'rotate-pdf': {
      titolo: 'Rotar PDF — Corrige la orientación gratis',
      descrizione: 'Gira las páginas de un PDF 90, 180 o 270 grados y guarda el resultado de forma permanente.',
      h1: 'Rotar las páginas de un PDF',
      intro: 'Gira las páginas de un PDF y escribe la nueva orientación dentro del archivo, así se abre derecho en todas partes — al contrario que rotarlo en el visor, que suele olvidarlo en cuanto cierras.',
      passi: [
        'Arrastra el PDF que está torcido.',
        'Elige cuánto girarlo: 90, 180 o 270 grados.',
        'Descarga el PDF corregido.',
      ],
      faq: [
        { d: '¿La rotación es permanente?', r: 'Sí, se escribe en el propio archivo, no solo en cómo lo muestra un visor.' },
        { d: '¿Puedo rotar solo algunas páginas?', r: 'Esta herramienta gira todas las páginas lo mismo. Para orientaciones mixtas, divide antes el documento.' },
        { d: '¿Empeora la calidad?', r: 'No. La rotación cambia un atributo de la página: no se recodifica nada.' },
      ],
    },

    'delete-pdf-pages': {
      titolo: 'Eliminar páginas de un PDF — Gratis en línea',
      descrizione: 'Quita las páginas que no quieres de un PDF y descarga el resto. En el navegador, no se sube nada.',
      h1: 'Eliminar páginas de un PDF',
      intro: 'Quita las páginas que indiques y te devuelve el resto como un PDF nuevo. La página en blanco al final de un escaneo, la portada que no quieres, las páginas que son de otro. Funciona en el navegador.',
      passi: [
        'Arrastra el PDF.',
        'Escribe las páginas a quitar, por ejemplo <strong>1, 4, 9</strong>.',
        'Descarga el PDF sin ellas.',
      ],
      faq: [
        { d: '¿Cómo indico las páginas?', r: 'Números de página separados por comas: 1, 4, 9.' },
        { d: '¿Se modifica el original?', r: 'No. Obtienes un archivo nuevo; el de tu dispositivo queda intacto.' },
        { d: '¿Se sube algo?', r: 'No, esto funciona enteramente en tu navegador.' },
      ],
    },

    'add-page-numbers': {
      titolo: 'Numerar páginas de un PDF — Gratis en línea',
      descrizione: 'Añade números de página a un PDF que no los tiene. En el navegador, no se sube nada.',
      h1: 'Añadir números de página a un PDF',
      intro: 'Estampa un número en cada página de un documento que llegó sin ellos, algo que importa en cuanto alguien tiene que referirse a la "página 12" en una reunión o en un escrito judicial.',
      passi: [
        'Arrastra el PDF.',
        'Los números se colocan de forma uniforme en cada página.',
        'Descarga el PDF numerado.',
      ],
      faq: [
        { d: '¿Dónde van los números?', r: 'En el pie de página, en una posición que se mantiene lejos de los márgenes de la mayoría de documentos.' },
        { d: '¿Puedo empezar por un número distinto de 1?', r: 'La numeración empieza en la primera página del archivo. Para desplazarla, divide el documento y numera la parte que necesites.' },
        { d: '¿Se sube algo?', r: 'No, la numeración ocurre en tu navegador.' },
      ],
    },

    'watermark-pdf': {
      titolo: 'Marca de agua en PDF — Sello gratis en línea',
      descrizione: 'Estampa un texto como BORRADOR o CONFIDENCIAL en todas las páginas. En el navegador.',
      h1: 'Añadir una marca de agua a un PDF',
      intro: 'Extiende tu propio texto por cada página — <strong>BORRADOR</strong>, <strong>CONFIDENCIAL</strong>, el nombre de un cliente — para que una copia que se escape esté claramente marcada. Funciona en el navegador.',
      passi: [
        'Arrastra el PDF.',
        'Escribe el texto que quieres estampar en las páginas.',
        'Descarga el PDF con la marca de agua.',
      ],
      faq: [
        { d: '¿Tapa el texto de debajo?', r: 'No, la marca se dibuja de forma tenue para que el documento siga siendo legible.' },
        { d: '¿Se puede quitar la marca de agua?', r: 'Pasa a formar parte del contenido de la página, así que no se puede desactivar en un lector. Es un disuasorio, no un cifrado: para eso usa Proteger PDF.' },
        { d: '¿Se sube mi documento?', r: 'No, se queda en tu dispositivo.' },
      ],
    },

    'extract-images-from-pdf': {
      titolo: 'Extraer imágenes de un PDF — Gratis, calidad original',
      descrizione: 'Saca cada fotografía incrustada en un PDF con su calidad original, en un ZIP. En el navegador.',
      h1: 'Extraer las imágenes de un PDF',
      intro: 'Saca las fotografías incrustadas en un PDF con su resolución original: las imágenes de verdad, no capturas de las páginas. Todo se empaqueta en un ZIP.',
      passi: [
        'Arrastra el PDF.',
        'Las imágenes incrustadas se localizan y se extraen con toda su calidad.',
        'Descarga el ZIP.',
      ],
      faq: [
        { d: '¿En qué se diferencia de "PDF a JPG"?', r: '"PDF a JPG" fotografía cada página tal como se ve. Esto saca los archivos de imagen originales que se colocaron en el documento, con la resolución con la que se guardaron.' },
        { d: '¿Y si no sale nada?', r: 'Entonces el documento no tiene imágenes incrustadas: un PDF hecho solo de texto y dibujos vectoriales no tiene ninguna que extraer.' },
        { d: '¿Se sube algo?', r: 'No, todo ocurre en tu navegador.' },
      ],
    },

    'pdf-to-text': {
      titolo: 'PDF a texto — Extrae a .txt gratis',
      descrizione: 'Saca todo el texto legible de un PDF a un archivo .txt. En el navegador, no se sube nada.',
      h1: 'Extraer el texto de un PDF',
      intro: 'Saca todo el texto legible de un PDF a un archivo <strong>.txt</strong> simple, sin formato de por medio. Útil para buscar, citar o pasar un documento a otro programa.',
      passi: [
        'Arrastra el PDF.',
        'El texto de cada página se extrae en orden de lectura.',
        'Descarga el archivo .txt.',
      ],
      faq: [
        { d: '¿Sobrevive el formato?', r: 'No, y es intencionado: texto plano significa sin tipografías, sin columnas, sin tablas. Si quieres el formato, usa "PDF a Word".' },
        { d: '¿Lee un documento escaneado?', r: 'No. Un escaneo es una fotografía del texto, y sin reconocimiento de caracteres no hay nada que extraer. No lo hacemos.' },
        { d: '¿Se sube mi documento?', r: 'No, la extracción ocurre en tu navegador.' },
      ],
    },
  },
};
