import React, { useState, useEffect, useRef } from 'react';
import { ChevronDown, ArrowRight, Star, Zap, Eye, X, MessageCircle, BookOpen, Music, CheckCircle, XCircle, HelpCircle, Quote } from 'lucide-react';

// --- ESTILOS ---
const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Archivo+Black&family=Inter:wght@400;500;700;900&family=Merriweather:ital,wght@0,400;0,700;1,400&family=Permanent+Marker&display=swap');

  /* Estilos globales básicos */
  body {
    overflow-x: hidden;
    background-color: #f0f0f0;
  }

  .font-heading {
    font-family: 'Archivo Black', sans-serif;
    text-transform: uppercase;
    letter-spacing: -0.05em;
  }

  .font-body {
    font-family: 'Inter', sans-serif;
  }
  
  .font-serif {
    font-family: 'Merriweather', serif;
  }

  .font-marker {
    font-family: 'Permanent Marker', cursive;
  }

  /* Paleta Tyler Spangler */
  .bg-pop-yellow { background-color: #FFEB3B; }
  .bg-pop-cyan { background-color: #00E5FF; }
  .bg-pop-magenta { background-color: #FF4081; }
  .bg-pop-lime { background-color: #C6FF00; }
  .bg-pop-orange { background-color: #FF6D00; }

  .spangler-shadow {
    box-shadow: 6px 6px 0px 0px #000000;
    border: 3px solid #000000;
  }
  
  @media (min-width: 768px) {
    .spangler-shadow {
        box-shadow: 8px 8px 0px 0px #000000;
    }
  }

  .text-stroke-black {
    -webkit-text-stroke: 1px black;
    color: transparent;
  }

  .reveal-section {
    animation: slideUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
    opacity: 0;
    transform: translateY(30px);
  }

  @keyframes slideUp {
    to { opacity: 1; transform: translateY(0); }
  }
`;

// --- DATOS DEL CONTENIDO ---
const contentData = [
    {
        id: 1,
        title: "¿Por qué los judíos?",
        subtitle: "PARTE 1",
        color: "bg-pop-yellow",
        icon: <Eye className="w-12 h-12" />,
        text: [
            { type: "intro", content: "Entendiendo la raíz del odio más antiguo del mundo." },
            { type: "body", content: "Pareciera que el prejuicio es un ingrediente estándar en la vida. En su canción titulada \"Semana Nacional de Hermandad\", Tom Lehrer canta:" },
            { type: "quote", content: "Oh los protestantes odian a los católicos,\ny los católicos odian a los protestantes,\ny los hindúes odian a los musulmanes\ny todos odian a los judíos.", icon: <Music className="w-8 h-8 inline mr-2" /> },
            { type: "body", content: "En esta canción, Lehrer expresa la obvia verdad de que el odio por los judíos es singularmente común. Los Cruzados, la Inquisición Española, los libelos de sangre, los pogromos, las innumerables expulsiones y el asesinato sistemático de 6 millones." },
            { type: "big-question", content: "LA PREGUNTA ES: ¿POR QUÉ?" },
            { type: "body", content: "¿Qué hay detrás de este odio milenario? ¿Por qué la corriente oculta de antisemitismo se ha inflado y ha explotado en contra de los judíos en todos lados, una y otra vez, a lo largo de toda la historia?" },
            { type: "highlight", content: "En este seminario, examinaremos la raíz del odio más antiguo del mundo." },
            { type: "heading", content: "Causas Vs. Excusas" },
            { type: "body", content: "Cuando estudiamos cualquier teoría es importante distinguir entre una \"causa\" y una \"excusa\". La diferencia no es difícil de reconocer:" },
            { type: "body", content: "Cuando una cosa causa otra, si quitamos la causa el efecto debería desaparecer. Si, por el contrario, una cosa es una excusa para otra, entonces incluso si quitamos la excusa el efecto seguirá estando." },
            
            { type: "story", title: "El ejemplo del reloj", content: [
                "Por ejemplo, un niño que siempre llega tarde a la escuela puede argumentar: \"Pero no tengo reloj. ¿Cómo esperas que llegue a la hora si no tengo reloj?\".",
                "Si sus padres le compran un reloj y él todavía llega tarde a la escuela, entonces queda claro que la falta de un reloj era sólo una excusa para su tardanza, no la causa."
            ]},

            { type: "body", content: "Respecto al antisemitismo, si logramos identificar su razón, al eliminarla debería acabarse el odio por los judíos. Sin embargo, si la eliminamos y el odio permanece, entonces sabremos que lo que pensamos que era una causa era en realidad una excusa." },
            { type: "heading", content: "Las seis razones comunes" },
            { type: "body", content: "Mantén en mente esta distinción mientras exploramos las seis razones más frecuentemente ofrecidas para el antisemitismo. A medida que tratemos cada una de estas explicaciones trataremos también de discernir si son la causa del odio o meramente una excusa." },
            { type: "body", content: "Los historiadores y sociólogos han sugerido muchas teorías para explicar el antisemitismo. Nosotros las trataremos una a una y discutiremos su validez." },
            { type: "list", items: [
                "Economía: Los judíos son odiados porque poseen demasiada riqueza y poder.",
                "Pueblo Elegido: Los judíos son odiados porque afirman con arrogancia que son el pueblo elegido.",
                "Chivo Expiatorio: CLos judíos son un grupo conveniente para señalar y culpar por todos los problemas.",
                "Deicidio: Los judíos son odiados porque mataron a Jesús.",
                "Forasteros: Los judíos son odiados porque son diferentes al resto de la sociedad.",
                "Teoría Racial: los judíos son odiados porque son una raza inferior."
            ]},
            { type: "highlight", content: "Examinemos estas seis razones frecuentemente dadas y determinemos si son verdaderamente causas o excusas." }
        ],
        quiz: [
            {
                question: "¿Cuál es la diferencia clave entre una causa y una excusa según el texto?",
                options: [
                    "Las causas son siempre económicas, las excusas son sociales.",
                    "Las excusas son mentiras, las causas son verdades a medias.",
                    "Si quitas la causa, el efecto desaparece. Si quitas la excusa, el efecto persiste."
                ],
                correct: 2
            }
        ]
    },
    {
        id: 2,
        title: "La Teoría Económica",
        subtitle: "PARTE 2",
        color: "bg-pop-cyan",
        icon: <Star className="w-12 h-12" />,
        text: [
            { type: "heading", content: "La teoría económica" },
            { type: "body", content: "La Teoría Económica del antisemitismo postula que la riqueza y el poder de los judíos provoca la envidia de otros grupos, lo que desemboca en un gran resentimiento." },
            { type: "body", content: "Esta teoría ha aparecido durante la historia con diferentes disfraces. Una de las formas en las que se hizo popular fue a través de Los Protocolos de los Ancianos de Sión, las actas de \"encuentros secretos\" ficticios en los que los líderes judíos conspiraron para gobernar el mundo. Los Protocolos es un libro salvajemente antisemita creado por la policía secreta rusa." },
            { type: "body", content: "Este relato ficticio proveyó una excelente excusa para campañas de persecución en contra de los judíos, e influyó a las masas para que creyeran el mito de que los judíos controlan los gobiernos. Es el segundo libro más publicado de la historia." },
            { type: "intro", content: "¿Acaso la gente de hoy en día cree todavía que los judíos tienen alguna misteriosa ventaja financiera y organizacional por sobre el resto de la humanidad?" },
            
            { type: "story", title: "Antiguo secreto chino (Historia Real)", content: [
                "Un físico judío que trabajaba para la Corporación Exxon pasó muchos meses trabajando en un proyecto en coordinación con un científico chino de primer nivel mundial. Los dos hombres desarrollaron una buena relación laboral y se hicieron amigos.",
                "Un día, el científico chino le comentó al judío: \"Sabes, desde que nos conocimos que te quiero hacer una pregunta: ¿Por qué te convertiste en físico? ¿Por qué no te ocupaste en negocios?\".",
                "\"¿Qué clase de pregunta es esa?\" replicó el científico judío. \"¡Me convertí en físico porque quería ser un físico!\".",
                "\"¿Pero acaso no eres judío?\", insistió el chino.",
                "\"¿Y qué diferencia hace?\".",
                "\"Bueno\", explicó el científico chino con paciencia, \"si yo me metiese en negocios habría innumerables riesgos, ¡pero para ti es 100% seguro!\".",
                "\"Discúlpame, pero no te entiendo\", dijo el judío. \"¿Qué tipo de negocio es 100% seguro?\".",
                "\"Para ti, ¡cualquier negocio! Vamos…\" dijo con un guiño de ojos, \"todos sabemos que ustedes tienen a la 'Organización' protegiéndolos\".",
                "\"¿Ah? ¿De qué organización estás hablando?\".",
                "\"Vamos… todos saben que los hombres judíos cuando se casan reciben dinero de la Organización. Así es como los judíos se meten en los negocios. No hay ningún riesgo porque si el negocio falla la Organización absorbe la deuda y le da al judío más dinero para que comience. ¡Esto sigue así hasta que el hombre crea un negocio que prospera!\""
            ]},
            
            { type: "body", content: "Obviamente, no existe ninguna organización internacional de este tipo. Sin embargo, la suposición de este científico de primer nivel mundial demuestra que el mito del acceso judío a ilimitada riqueza está vivo y coleando todavía hoy." },
            { type: "heading", content: "Aplicando el test de litmus (Criterio de rechazo)" },
            { type: "body", content: "¿Explica esta actitud el antisemitismo? ¿Es la Teoría económica una causa o una excusa del antisemitismo?" },
            { type: "body", content: "Primero, mira las actitudes universales hacia los ricos. No vemos ninguna persecución histórica sostenida en contra de los no judíos ricos. Entonces, si los repudiadores deciden señalar a los ricos judíos e ignorar a los no judíos, la economía no puede ser considerada la causa del odio." },
            { type: "body", content: "Segundo, si quitamos el elemento de la riqueza y el poder de los judíos, ¿desaparece el antisemitismo?" },
            { type: "body", content: "Los judíos que vivieron en los shtetels de Polonia y Rusia entre los siglos 17 y 20 eran pobres y no tenían ninguna clase de poder, careciendo por completo de toda forma de influencia. Sin embargo eran odiados. A menudo fueron perseguidos y sometidos a tormentos indescriptibles. En muchas ocasiones aldeas enteras eran saqueadas y los habitantes judíos masacrados a sangre fría. En estas circunstancias el antisemitismo no distinguió entre fuertes y débiles, entre poderosos y no poderosos." },
            { type: "body", content: "De la misma forma, los antisemitas en la edad media iniciaron incontables pogromos en contra de los judíos (sin primero investigar ni sus cuentas bancarias ni sus carteras de inversiones)." },
            { type: "body", content: "Cuando los Nazis liquidaron el Gueto de Varsovia no había ningún negocio judío que destruir. En realidad, las condiciones de pobreza allí eran espantosas. Los judíos en el gueto no podrían haber sido considerados 'ricos' por ningún estándar del mundo, y aún así los Nazis pensaron que debían ser eliminados." },
            { type: "highlight", content: "Los judíos pobres siempre han sido odiados a la par de los judíos ricos." },
            { type: "body", content: "Cuando un judío logra éxito financiero puede llegar a hacer que el antisemitismo latente salga a la superficie, pero su éxito claramente no es lo que hizo que la otra persona sea antisemita. Por lo tanto, el dinero no puede ser la causa del antisemitismo." },
            { type: "body", content: "¿Y qué hay del poder? ¿Puede el poder ser la causa del antisemitismo? Si alguien rico y poderoso viene a pedirte un favor, ¿lo perseguirías? No, lo ayudarías. Que esa persona te deba un favor es una excelente póliza de seguros. Un claro ejemplo son los países árabes productores de petróleo que, a pesar de que sus estándares van en contra de los valores de oriente, son ampliamente consentidos." },
            { type: "body", content: "Hubo una nación que trató a los judíos como si fueran ricos y poderosos. Los japoneses nunca han estado muy expuestos a los judíos, y siempre supieron poco sobre ellos." },
            
            { type: "story", title: "El Plan Fugu", content: [
                "En 1919 Japón peleó junto a los antisemitas Rusos Blancos en contra de los comunistas. En ese entonces los Rusos Blancos le presentaron a los japoneses el libro Los Protocolos de los Ancianos de Sión.",
                "Los japoneses estudiaron el libro y, de acuerdo a todas las opiniones, creyeron inocentemente en su propaganda. Su reacción fue inmediata y contundente – formularon un plan para alentar los asentamientos e inversión judía en Manchuria. ¡Los japoneses decidieron que estos ricos y poderosos judíos eran precisamente la clase de gente con la que querían hacer negocios!",
                "Los japoneses llamaron a su plan para el asentamiento judío \"El Plan Fugu\". El \"fugu\" es un pez altamente venenoso. Después de que los órganos que contienen toxinas son cuidadosamente removidos, es utilizado como un plato de comida en Japón, y es considerado un exquisito manjar. Sin embargo, si no es preparado con cuidado, su veneno puede ser mortal.",
                "Los japoneses consideraron a los judíos una nación con un potencial altamente valioso pero, al igual que con el \"fugu\", para poder aprovechar el potencial tenían que ser extremadamente cuidadosos. De no ser así, pensaban los japoneses, el plan se les volvería en su contra y los judíos aniquilarían Japón con su asombroso poder.",
                "Durante la Segunda Guerra Mundial los japoneses fueron aliados de los Nazis, sin embargo permitieron que miles de refugiados europeos –incluyendo toda la Yeshivá de Mir – entraran a Shangai y Kobe durante la guerra. Recibieron a los judíos, pero porque creían que los judíos tenían acceso a enormes recursos de dinero y poder que podían beneficiar a Japón en gran manera (todo esto está detallado en el libro The Fugu Plan, por Marvin Tokayer).",
            ]},

            { type: "body", content: "Si los antisemitas realmente creen que los judíos dirigen el mundo, ¿por qué no se relacionan con los judíos como lo hicieron los japoneses? El hecho de que los judíos son por lo general tratados como marginados prueba que la gente no cree que los judíos sean tan ricos o poderosos como afirman. En otras palabras, los antisemitas no toman su propia propaganda con seriedad." },
            
            { type: "heading", content: "¿Qué pasó con el poder judío?" },
            { type: "body", content: "Si hay algo de cierto en la idea de que los judíos controlan los gobiernos, ¿por qué no pudieron esos poderosos judíos convencer a ningún país para que aceptaran a los refugiados que estaban tratando de escapar del infierno durante el Holocausto? Si \"la judería del mundo\" fuese tan poderosa y tuviera tanta influencia política, con seguridad al menos un gobierno habría accedido a aceptarlos como refugiados y les habría permitido permanecer hasta el final de la guerra…" },
            { type: "note", content: "La película El Viaje de los Malditos demuestra dramáticamente cómo un gobierno metió su cabeza en la arena mientras la matanza al por mayor de judíos continuó desenfrenadamente. De esta manera, la afirmación de que los judíos controlan los gobiernos suena dolorosamente absurda." },
            
            { type: "heading", content: "Los judíos como prestamistas" },
            { type: "body", content: "Del mismo modo, mucha gente dice que el antisemitismo fue causado por el hecho de que los judíos fueron prestamistas en muchas sociedades y supuestamente \"exprimieron\" a sus compatriotas no judíos." },
            { type: "body", content: "En realidad, la verdad es lo opuesto. Los judíos fueron forzados a convertirse en prestamistas precisamente por las severas limitaciones de empleo que las tendencias antisemitas les impusieron. Las leyes antisemitas hicieron imposible que los judíos fueran propietarios de tierra, que asistieran a universidades o que ingresaran a otra ocupación normal. El dinero era el único bien con el que tenían permitido tratar, por lo que, al no tener otra opción, se convirtieron en prestamistas." },
            { type: "body", content: "Entonces, vemos que los judíos no fueron odiados por ser prestamistas, sino que fueron prestamistas porque eran odiados." },
            
            { type: "highlight", content: "Judíos poderosos o judíos débiles, judíos ricos o judíos pobres, todos han sido odiados por igual." },
            { type: "body", content: "Obviamente, la razón económica para el antisemitismo es, en realidad, una excusa." },
            
            { type: "stamp", content: "ES UNA EXCUSA" }
        ],
        quiz: [
            {
                question: "¿Qué demuestra el ejemplo de los judíos pobres en Polonia y Rusia?",
                options: [
                    "Que el antisemitismo solo ataca a los ricos.",
                    "Que la pobreza protegía a los judíos del odio.",
                    "Que el dinero no es la causa, ya que los judíos pobres también fueron odiados."
                ],
                correct: 2
            }
        ]
    },
    {
        id: 3,
        title: "Pueblo Elegido, Chivo Expiatorio y Deicidio",
        subtitle: "PARTE 3",
        color: "bg-pop-magenta",
        icon: <MessageCircle className="w-12 h-12" />,
        text: [
            { type: "heading", content: "La teoría del pueblo elegido" },
            { type: "body", content: "La idea de que el pueblo judío es el 'pueblo elegido' es innegablemente popular. Hace muchos años, la Universidad de California condujo un estudio de antisemitismo. Se le presentaron a los norteamericanos no judíos 18 declaraciones no favorables sobre los judíos, y se les preguntó si creían en alguna de ellas. Por lejos, la afirmación más creída entre los entrevistados (59%) era que 'los judíos se consideran a sí mismos el pueblo elegido de Dios'." },
            { type: "body", content: "Chequeemos ahora si esta creencia es una causa legítima del antisemitismo – o si es meramente otra excusa. Si el 'ser elegido' es de hecho la causa del antisemitismo, entonces el odio en contra de los judíos debería desaparecer si los judíos dejaran de afirmar que son los elegidos." },
            
            { type: "story", title: "El experimento alemán", content: [
                "A finales del siglo 19, los judíos que vivían en Alemania y Austria rechazaron colectivamente el hecho de \"haber sido elegidos\" y se asimilaron en la nación en la que se encontraban.",
                "De hecho, ellos creían que los no judíos entre los que vivían eran realmente el pueblo elegido. \"¡Berlín es nuestro Jerusalem!\", proclamaban con fuerza.",
                "La sociedad gentil era el entorno social de su elección, y Alemania su amada madre patria."
            ]},

            { type: "big-question", content: "¿DESAPARECIÓ EL ANTISEMITISMO?" },
            { type: "body", content: "Todos conocemos la trágica respuesta a esta pregunta. Los judíos en Alemania y Austria sufrieron la proliferación de antisemitismo más empedernida de toda la historia. Precisamente cuando los judíos rechazaron el hecho de \"haber sido elegidos\" es que sufrieron las formas más violentas de antisemitismo." },
            { type: "note", content: "Claramente, la Teoría del Pueblo Elegido no pasa el Test de Litmus." },
            { type: "heading", content: "Otros pueblos 'elegidos'" },
            { type: "body", content: "Otra prueba a la Teoría del Pueblo Elegido es ver cómo responde la humanidad ante otros pueblos que afirman ser los 'elegidos'. Si la afirmación de que los judíos son los elegidos genera antisemitismo, entonces todos los grupos que hacen afirmaciones similares deberían convertirse en objetivos de persecución y odio." },
            { type: "body", content: "El cristianismo y el islam representan otros dos importantes grupos religiosos que afirman haber sido elegidos. La teología cristiana acepta que Dios le dio la Biblia a los judíos y que convirtió a los judíos en sus mensajeros especiales. Sin embargo, la creencia cristiana dice que, a partir de que los judíos rechazaron a Jesús, los cristianos se convirtieron en el nuevo pueblo elegido de Dios." },
            { type: "body", content: "De igual forma, los musulmanes creen que la Biblia es la palabra de Dios. Sin embargo, la teología musulmana afirma que cuando Mahoma apareció en escena, Dios convirtió a los musulmanes en Su pueblo elegido." },
            { type: "body", content: "Si los cristianos y los musulmanes afirman que son los elegidos, ¿por qué este hecho no ha generado, en toda la historia, odio en su contra?" },
            { type: "body", content: "En realidad, casi toda nación sobre la tierra ha, en alguna ocasión, afirmado ser la elegida. Los norteamericanos afirmaron el Destino Manifiesto – que sus acciones eran guiadas Divinamente – cuando anexaron Texas y Alaska en contra de los deseos de los habitantes de esas áreas. Los chinos eligieron nombrar China a su país porque la palabra significa 'centro del universo'. El nombre Japón significa 'fuente del sol'. Para los indios americanos por ejemplo, existe una misma palabra que significa tanto 'ser humano' como 'indio', implicando que todo no indio pertenece a alguna subespecie." },
            { type: "body", content: "Estas naciones no son odiadas por haber afirmado superioridad. Afirmar que uno es elegido no causa odio; si lo hiciera entonces habría muchas otras naciones que serían objeto de un odio intenso y universal que, en realidad, esta reservado exclusivamente para los judíos." },


            { type: "heading", content: "La teoría del chivo expiatorio" },
            { type: "body", content: "La Teoría del Chivo Expiatorio es citada con frecuencia como una causa del antisemitismo. Algunos historiadores la utilizan para explicar el surgimiento del antisemitismo alemán a finales de la década del 30." },
            { type: "body", content: "Su razonamiento es el siguiente: Hitler, al igual que muchos dictadores totalitarios que le precedieron, necesitaba desviar la atención de los problemas de su nación al atribuírselos a una víctima inocente. Él eligió al azar, seleccionó a los judíos como su chivo expiatorio y lanzó una masiva campaña difamatoria para separarlos del grupo principal de la sociedad alemana. Tuvo éxito en sus esfuerzos y, como resultado, la gran mayoría de los alemanes terminó odiando a los judíos." },

            { type: "body", content: "La Teoría del Chivo Expiatorio eleva una vieja pregunta: ¿Qué vino primero, el huevo o la gallina? En otras palabras, ¿un grupo comienza a ser odiado como consecuencia de ser señalado como un chivo expiatorio, o es seleccionado como chivo expiatorio porque es odiado?" },
            { type: "highlight", content: "Prerrequisito: El odio debe existir antes." },
            { type: "body", content: "El primer prerrequisito para un posible chivo expiatorio es que los ciudadanos del país estén dispuestos a odiar desde el principio. Si intentáramos desviar la atención de nuestros problemas culpando a un grupo que aún no es odiado por la sociedad, el pueblo no lo aceptará. Una buena parte de la población exigirá ver evidencia sobre la culpa del grupo y no nos dejarán salirnos con la nuestra." },
            
            { type: "story", title: "Imaginando a Hitler y los enanos", content: [
                "Imagina lo que hubiese pasado si Adolf Hitler se hubiera parado frente a una de esas inmensas multitudes en el Coliseo Nacional de Núremberg y hubiera dicho:",
                "\"Mis amigos alemanes, ¡hay un grupo entre nosotros que es la escoria de la humanidad! ¡Están dominando al pueblo alemán y están destruyendo nuestra madre patria!\"",
                "\"Si Alemania quiere recuperar su apreciado estatus, este pueblo debe ser perseguido y, finalmente, eliminado. ¿Cuál es este pueblo?\"",
                "\"¡Son los enanos que están entre nosotros!\"",
                "Como no hay un odio preexistente hacia los enanos, las personas con pecas o los ciclistas, los gobiernos no tratan de utilizarlos como chivos expiatorios."
            ]},

            { type: "body", content: "Los judíos son elegidos consistentemente como chivo expiatorio porque es muy fácil incentivar el odio en su contra. Los judíos son el pueblo que todos están más que felices de perseguir." },
            { type: "body", content: "Por lo tanto, la Teoría del Chivo Expiatorio no es la causa del antisemitismo. En cambio, el antisemitismo es lo que convierte a los judíos en un conveniente chivo expiatorio." },
            { type: "body", content: "La Teoría del Chivo Expiatorio es simplemente un barómetro indicativo del nivel de odio que ya existe hacia los judíos en una determinada sociedad. Revela cuánto antisemitismo ya existe, esperando ser despertado." },
            { type: "body", content: "El Chivo Expiatorio es obviamente una excusa, no una razón." },




            { type: "heading", content: "Deicidio: La teoría de los asesinos de Jesús" },
            { type: "body", content: "Los cristianos han afirmado por mucho tiempo que los judíos asesinaron a Jesús y que por eso los odian. ¿Es esta la causa real del odio? Si es así, ¿por qué no estaban los cristianos enojados con los judíos hace 2.000 años, en el momento en que los judíos supuestamente mataron a Jesús?" },
            { type: "body", content: "El antisemitismo cristiano no comenzó hasta mucho después de la muerte de Jesús. No fue hasta varios siglos después que los padres de la Iglesia decidieron que los judíos debían ser perseguidos como grupo porque 'mataron a Jesús'. Bernard Blumenkranz, autor de Judíos y Cristianos en el Mundo Occidental documenta que la intensa y constante persecución cristiana de los judíos no comenzó sino hasta el advenimiento de las Cruzadas, ¡más de 1.000 años después de la muerte de Jesús!" },
            { type: "body", content: "Más aún, una vez que comenzó el odio cristiano hacia los judíos, empeoró con el paso del tiempo. Por lógica, el tiempo debería haber calmado los sentimientos ásperos; todos podemos atestiguar que la ira disminuye gradualmente con el tiempo. El tiempo tiene la cualidad de sanar todas las heridas." },
            { type: "body", content: "Por ejemplo, en 1866, inmediatamente después de la Guerra Civil en Estados Unidos, un norteño hubiese sentido mucha tensión si hubiese visitado el Sur. Hoy en día, una visita al Sur de Estados Unidos no genera ninguna emoción de ese tipo. ¿Has escuchado alguna vez que un residente de Nueva York tenga miedo de vacacionar en Florida?" },
            { type: "body", content: "Cuanto más lejos está un evento, menos furia uno siente, ¡siempre y cuando el evento sea la causa real de la furia!" },
            { type: "body", content: "Por lo tanto, si los cristianos odiaran a los judíos porque mataron a Jesús, esa furia debería haber llegado al clímax inmediatamente después de su muerte, y debería haberse desvanecido durante los dos milenios que transcurrieron a partir del evento. La historia indica un patrón exactamente opuesto, no hay registros de incidentes de antisemitismo inmediatamente después de la muerte de Jesús, pero hay miles de incidentes de este tipo muchos siglos después. Vemos de aquí que la muerte de Jesús no es la causa del antisemitismo cristiano." },
            { type: "heading", content: "¿Quién mató a Jesús?" },
            { type: "body", content: "Además, de acuerdo al Nuevo Testamento, los romanos fueron quienes mataron a Jesús. Mientras que los judíos son mencionados como cómplices, los Evangelios de Mateo, Juan y Marcos declaran específicamente que los romanos mataron a Jesús." },
            { type: "body", content: "Si el asesinato de Jesús es la causa del odio cristiano, ¿por qué fueron sólo los cómplices judíos los categóricamente perseguidos? ¡Los cristianos deberían odiar a los romanos al menos tanto como odian a los judíos!" },


            { type: "quote", content: "Obviamente, la muerte de Jesús es sólo una excusa, no la razón del antisemitismo." },
            { type: "stamp", content: "ES UNA EXCUSA" }
        ],
        quiz: [
            {
                question: "Cuando los judíos alemanes dejaron de llamarse 'Pueblo Elegido' y se asimilaron, ¿qué sucedió?",
                options: [
                    "El antisemitismo desapareció inmediatamente.",
                    "Sufrieron la forma más violenta de antisemitismo.",
                    "Fueron aceptados completamente en la sociedad."
                ],
                correct: 1
            }
        ]
    },
    {
        id: 4,
        title: "Judíos forasteros y la Teoría racial",
        subtitle: "PARTE 4",
        color: "bg-pop-lime",
        icon: <X className="w-12 h-12" />,
        text: [
            { type: "heading", content: "La teoría de los judíos como forasteros" },
            { type: "body", content: "Quizás los judíos son odiados simplemente porque son diferentes. Tradicionalmente, los judíos se caracterizaban por vestimenta, leyes y en ocasiones hasta lenguaje diferentes. Este tipo de discriminación es lo que los chinos vivieron en los comienzos de Estados Unidos y lo que los franceses vivieron en Inglaterra. Los sociólogos se refieren a este fenómeno como 'el desagrado por lo diferente'." },
            { type: "body", content: "Esta teoría suena como una causa sensata para el antisemitismo: los judíos han sido odiados porque son diferentes. A través de toda la historia los judíos no se han mezclado; sus sistemas ético, cultural y social fueron diferentes a los de sus vecinos. Y aún más explícitamente, el mayor sueño de los judíos siempre fue su retorno a Sión. Eran ciudadanos obedientes de la ley que contribuían a la nación que los hospedaba y hasta iban al campo de batalla para defenderla, pero sus corazones siempre apuntaban en dirección a la Tierra Prometida. Es innegablemente cierto que durante toda la historia los judíos fueron el paradigma de los 'forasteros'." },
            { type: "body", content: "¿Pero qué pasa cuando los judíos abandonan sus diferencias culturales y se convierten en genuinos 'pares'? Si la Teoría del Forastero es correcta, entonces la solución al antisemitismo debería ser la asimilación. El antisemitismo debería disminuir en proporción a la capacidad de los judíos de integrarse a las sociedades que los albergan. Pero, ¿es esto lo que ocurre?" },
            
            { type: "story", title: "La desilusión de la asimilación", content: [
                "En el siglo 18 llegó a Europa el Iluminismo, dando derechos igualitarios a toda la gente más allá de la religión. En diciembre de 1789, durante una discusión en la Asamblea Nacional Francesa en la que los judíos franceses recibieron derechos igualitarios, el Conde Stanislas de Clermont-Tonnere declaró: \"Para los judíos como individuos, todo. Para los judíos como nación, nada\".",
                "Los judíos de Europa saltaron ante la oportunidad de lograr igualdad, esperando finalmente deshacerse del fenómeno del 'desagrado por lo diferente'. Abandonaron sus antiguas vestimentas, se afeitaron sus barbas y asistieron a las universidades y a los teatros. Adoptaron el lenguaje, la cultura y los estilos de sus vecinos no judíos, y se casaron con ellos. Eliminaron de sus plegarias toda mención del retorno a Sión. En resumen, se hicieron más franceses que los franceses mismos.",
                "Napoleón fue rápido para capitalizar esta 'evolución' de los judíos adaptándose a la cultura francesa. En 1807 convocó una corte no diplomada para presionar a los judíos para que abandonaran todo compromiso que aún hayan tenido con una nación judía independiente, forzando a los judíos a declarar su lealtad exclusiva a Francia.",
                "La aceptación judía de esta actitud se esparció. En Alemania, los judíos reformistas declararon: 'Berlín es nuestro Jerusalem, Alemania es nuestra tierra patria'. Habiendo soportado siglos de odio, los judíos de Europa anticiparon una cálida bienvenida por parte de sus vecinos gentiles.",
                "Pero sólo se desilusionaron. El caso Dreyfuss, en el que falsas acusaciones de traición fueron presentadas en contra de un oficial francés judío, fue ideado para demostrar que los judíos nunca podrían ser ciudadanos leales a los países que los albergaban.",
                "Poco después, la subida al poder de Hitler sacudió nuevamente la sensación de seguridad que tenían los judíos gracias a su enfoque de asimilación. El nazismo les dio a los judíos un fuerte mensaje: Los odiamos, no porque son diferentes, ¡sino porque están tratando de ser como nosotros! No podemos permitir que infecten a la raza aria con sus genes inferiores."
            ]},

            { type: "body", content: "Mientras los judíos permanecieron como forasteros, la Teoría del Forastero tuvo algo de lógica. A partir de que los judíos intentaron asimilarse, la Teoría del Forastero quedó hecha pedazos – porque nunca había sido la causa real del odio." },
            { type: "heading", content: "La teoría racial" },
            { type: "body", content: "Esto dio lugar a una nueva excusa: la inferioridad de la raza judía. Puedes abandonar las limitaciones externas de tu vida, afeitarte la barba, quitarte la kipá y hasta cambiar tu religión. Pero nunca podrás cambiar tu raza." },
            { type: "body", content: "El problema inevitable que tiene esta teoría es que se auto-contradice: los judíos no son una raza. Cualquiera puede convertirse en judío – y miembros de toda raza, credo y color del mundo lo han hecho en algún momento u otro." },
            { type: "highlight", content: "No hay ninguna característica racial distintiva común dentro de los judíos." },
            { type: "body", content: "Incluso la idea de la 'nariz judía' es un mito. Los antisemitas no odian sólo a los judíos que tienen características físicas distintivamente 'judías', los odian a todos. Odian a los judíos de Europa del Este, a los israelíes, a los rusos y a los yemenitas; odian a los rubios de ojos celestes al igual que a los de piel oscura, o mediterráneos. Odian a todos." },
            { type: "body", content: "El antisemitismo no puede ser explicado como racismo por la muy simple razón de que los judíos son una nación, no una raza." },
 
            { type: "heading", content: "Odio único" },
            { type: "body", content: "Hemos analizado las seis explicaciones más comunes para el fenómeno del antisemitismo. Ninguna de estas razones comunes es su raíz principal. Bajo escrutinio, todas probaron ser meras excusas. Debemos mirar de nuevo a este odio para encontrar una verdadera causa. De todas las formas discriminatorias de odio, el antisemitismo es único en cuatro aspectos:" },
            { type: "list", items: [
                "1. Antigüedad: Excepcionalmente largo.",]},
            { type: "body", content: "El antisemitismo ha existido por un período de tiempo excepcionalmente largo. Uno de los libros más autoritativos sobre antisemitismo, La Angustia de los Judíos: Una Historia de Antisemitismo, escrito por el cura católico Edward Flannery, escribe: 'Un historiador de antisemitismo mira hacia atrás, hacia los milenios de horrores que ha registrado, y emerge una conclusión inescapable: el antisemitismo es diferente por su antigüedad y consistencia'." },
    
            { type: "list", items: [
                "2. Universalismo: En todo el mundo.",]},
                { type: "body", content: "El antisemitismo se encuentra en todo el mundo. A través de la historia, los judíos han sido odiados en todas las regiones en que han vivido. Sin importar en dónde se asienten, sin importar quién es su hospedador, el antisemitismo eventualmente asoma su horrible cabeza. Entre los años 250 EC y 1948 (un período de 1.700 años) los judíos de Europa experimentaron un promedio de una expulsión cada 21 años. Los judíos fueron expulsados de Inglaterra, Francia, Austria, Alemania, Lituania, España, Portugal, Bohemia, Moravia y 71 países más." },

            { type: "list", items: [
                "3. Intensidad: Intentos de genocidio.",]},
                { type: "body", content: "El odio en contra de los judíos es ventilado de un modo particularmente violento. Un grupo que es odiado generalmente se convierte en el objeto de bromas étnicas, y es sujeto a discriminación. Por otro lado, los judíos son sujeto de intentos de genocidio. Los pogromos de Chmelnicki, el Holocausto y las amenazas nucleares de Irán son intentos de exterminar a un pueblo que representa sólo una pequeña minoría de la población mundial." },

            { type: "list", items: [
                "4. Confusión: Muy poco consenso."]},
            ]},
            { type: "body", content: "Sorprendentemente, ¡hay muy poco consenso sobre lo que el antisemitismo odia en particular! Cuando un grupo odia a otro, ese odio puede ser analizado hasta llegar a unas cuantas razones simples y bien definidas. En Bosnia la gente es perseguida por razones territoriales y religiosas. En Irlanda es la independencia nacional y la religión. Los negros son odiados por razones raciales. Pero nadie ha ofrecido aún ni una razón aceptada universalmente para explicar por qué la gente odia a los judíos." },
            { type: "body", content: "Si le pides a un antisemita que declare sus razones, esas razones son a menudo contradictorias. Piensa en esta paradoja:" },

            { type: "note", content: "Los judíos son odiados por ser una raza perezosa e inferior, pero también por dominar la economía y apropiarse del mundo." },
            { type: "note", content: "Los judíos son odiados por mantener tercamente su estado de separación y, cuando se asimilan, por ser una amenaza a la pureza racial por medio de los matrimonios mixtos." },
            { type: "note", content: "Los judíos son vistos como pacifistas y como belicistas; como capitalistas y como comunistas revolucionarios; como posesores de una mentalidad de Pueblo Elegido y de un complejo de inferioridad." },
            { type: "stamp", content: "DEMASIADAS RAZONES = NINGUNA RAZÓN" },
            { type: "body", content: "Las 'Seis Razones' no aguantan el escrutinio – ¡son excusas!" }
            { type: "body", content: "El odio por los judíos durante los últimos 2.000 años ha sido continuo, universal y vicioso, pero las explicaciones para este odio cambian constantemente. Este hecho, por sí solo, nos alerta sobre la necesidad de investigar lo que yace en la base de esas explicaciones." }
            { type: "body", content: "Imagínate en una entrevista laboral. El entrevistador te dice de frente que no puedes ser considerado para el trabajo porque te faltan habilidades en informática. Te inscribes en un curso de computación, y en un mes has obtenido las habilidades necesarias." }
            { type: "body", content: "Vuelves a la compañía y el entrevistador te dice que no te puede contratar porque te falta entrenamiento en finanzas y administración. Estudias diligentemente, y en un corto tiempo has dominado la disciplina." }
            { type: "body", content: "Cuando vuelves a la compañía por tercera vez, te dicen que la razón real por la que no te pueden contratar es tu corte de pelo; simplemente no refleja la imagen que la compañía desea representar en público." }
            { type: "body", content: "Este fiasco te envía un mensaje muy claro: Las razones que la compañía te ha estado dando todo el tiempo son sólo excusas. El entrevistador sólo utilizó excusas para cubrir alguna razón más profunda por la que se rehúsa a contratarte." }
            { type: "body", content: "Esta situación es muy similar a las explicaciones comunes para el antisemitismo: Aún cuando las razones ya no son aplicables, el antisemitismo sigue existiendo." }
            { type: "body", content: "Esto no significa que deberíamos descontar estas razones por completo. A pesar de que sean excusas y no la fuente del odio, influencian a las masas para odiar a los judíos. Pueden exacerbar el odio, pero ciertamente no lo explican." }
            { type: "body", content: "El problema es que cada una de las explicaciones se enfoca en asuntos externos al judío, no tienen nada que ver con su esencia." }
        ],
        quiz: [
            {
                question: "¿Por qué la asimilación no funcionó para detener el antisemitismo?",
                options: [
                    "Porque el nazismo los odiaba precisamente por tratar de ser 'como ellos'.", // Correcta movida al principio (índice 0)
                    "Porque los judíos no se asimilaron lo suficiente.",
                    "Porque perdieron su identidad cultural."
                ],
                correct: 0
            }
        ]
    },
    {
        id: 5,
        title: "Hitler y los Nazis",
        subtitle: "PARTE 5",
        color: "bg-pop-orange",
        icon: <Zap className="w-12 h-12" />,
        text: [
            { type: "intro", content: "La mejor manera de entender lo que los antisemitas realmente odian es examinar su propia retórica." },
            { type: "heading", content: "Quitando el elemento judío del antisemitismo" },
            { type: "body", content: "Casi sin excepción, las razones del antisemitismo ofrecidas por los diferentes eruditos no tienen nada que ver con el hecho de que los judíos son judíos (por ejemplo, los judíos son ricos o son diferentes)." },
            { type: "body", content: "Estas razones 'de-judaízan' efectivamente al antisemitismo, equiparándolo con cualquier otro tipo de odio común. De acuerdo a esta actitud, el Holocausto – el intento más sistemático de exterminar a un pueblo en la historia de la humanidad – no tuvo nada que ver con razones 'judías'. Los judíos simplemente estuvieron en el lugar equivocado en el momento equivocado."},
            { type: "body", content: "En su libro \"¿Por Qué los Judíos?\" Dennis Prager cita un ejemplo deslumbrante en contra de la idea de que no hay nada judío en el antisemitismo." },
            
            { type: "story", title: "Ana Frank escribió...", content: [
                "El 11 de abril de 1944, demostrando una misteriosa sabiduría que superaba por mucho su edad, Ana Frank escribió en su diario:",
                "\"¿Quién nos hizo a los judíos diferentes de los otros pueblos? ¿Quién ha permitido que suframos tan terriblemente hasta ahora? Es Dios Quien nos ha hecho lo que somos, pero también es Dios Quien nos levantará de nuevo. Quién sabe – incluso puede ser nuestra religión, de la cual el mundo y todos los pueblos aprenden el bien, y por esa sola razón ahora sufrimos. Nunca podremos ser sólo holandeses, o ingleses, o representantes de ningún otro país. Siempre seguiremos siendo judíos.",
                "Ana Frank aclaró el punto de que los judíos tienen algo especialmente valioso para darle al mundo, y eso es precisamente lo que el mundo ha resentido al perseguir a los judíos. Ana Frank identificó el antisemitismo como un odio del judaísmo, un odio completamente diferente a la intolerancia o el racismo que otros pueblos sufren.."
            ]},
            { type: "body", content: "Sorprendentemente, cuando la historia de Ana Frank fue reconstruida por Lillian Hellman en una obra de teatro, sus palabras fueron cambiadas por completo. '¿Por qué son odiados los judíos?' pregunta Ana. 'Bueno, un día es un grupo, y al día siguiente otro…'" },
            { type: "body", content: "En el teatro se le hizo creer a las audiencias que los judíos han sido odiados de la misma manera en que otros pueblos han sido odiados. En otras palabras, no hay nada judío en el antisemitismo.            " },
            { type: "body", content: "¿Pero qué dicen los antisemitas mismos sobre este tema?" },

            { type: "heading", content: "El honesto enfoque de Hitler" },
            { type: "body", content: "Los eruditos han hecho consistentes intentos para probar que no hay nada especialmente judío que engendre antisemitismo. Veamos si los comentarios de los famosos 'aborrecedores de judíos' revelan lo que encuentran tan criticable." },
            { type: "body", content: "Un individuo que no utilizó las muchas y encubiertas explicaciones ofrecidas por los eruditos fue Adolf Hitler, el hombre responsable del azote de antisemitismo más devastador en la historia de la humanidad." },
            { type: "body", content: "Hitler reconoció abiertamente la singularidad de los judíos como pueblo. Hitler se dio cuenta que los judíos nunca pudieron integrarse al resto de la humanidad con éxito y se propuso el objetivo de que nunca lo hicieran." },
            { type: "body", content: "La forma de antisemitismo de Hitler no fue un medio para un fin, fue un fin en sí mismo. Las Leyes de Núremberg, establecidas en 1935, alienaron y desmantelaron con efectividad a la comunidad judía de Alemania – pero para Hitler, esto no fue suficiente." },
            { type: "body", content: "A finales de la década del 30 Alemania fue reconstruida y su moral recuperada, pero los ojos de Hitler permanecieron puestos sobre los judíos. Siete años después de que las Leyes de Núremberg habían herido y mutilado a los judíos en cuerpo y alma, se lanzó la Solución Final en la conferencia de Wansee." },
            { type: "body", content: "En la conferencia de 1942, Hitler vio a los judíos como algo mucho más amenazante que meros chivos expiatorios; la nación judía era su enemigo mortal, por lo que su absoluta destrucción se convirtió en su objetivo." },
            { type: "body", content: "Hitler veía al Nacional Socialismo como un nuevo orden mundial, una forma de recrear a la humanidad. ¿Cómo ocurriría esta renovación de la humanidad?" },
           
            { type: "body", content: "Hitler declaró: \"La batalla por la dominación del mundo será luchada entre nosotros – entre los alemanes y los judíos. Todo lo demás es fachada e ilusión. Detrás de Inglaterra está Israel, y así también detrás de Francia y detrás de Estados Unidos. A pesar de que hayamos sacado a los judíos de Alemania, continúan siendo nuestro enemigo mundial.\"." },
            { type: "highlight", content: "¿Por qué Hitler apuntó a los judíos?" },
            { type: "body", content: "Eliminar a los judíos era la clave para la utopía de Hitler. La ambición que lo movilizaba era liberar al mundo de las ataduras de la consciencia y de la moral, alejar al mundo del monoteísmo. Creó su propia religión a partir de una filosofía basada en permitir todos los deseos más básicos del hombre." },
            { type: "note", content: "La \"Juventud Hitleriana\" cantaba: \"No necesitamos la bondad cristiana. Nuestro líder es nuestro salvador. El Papa y el rabino se deben ir. Seremos paganos otra vez\"." },
            { type: "body", content: "La imagen de Hitler del mundo perfecto era un regreso a un estado de existencia salvaje, en donde 'el poder tiene la razón'. Hitler dijo: 'En un orden natural, las “clases” son personas que se superponen a otras en estratos, en lugar de vivir como vecinos. A este orden volveremos tan pronto como las repercusiones del liberalismo hayan sido removidas'." },
            { type: "body", content: "El único obstáculo serio en el camino de Hitler eran los judíos. Hitler sabía que los judíos eran los que llevaban el mensaje de un único Dios – de que todos los hombres son creados por igual, del amor por el prójimo, de ayudar al pobre y al débil." },

            { type: "story", title: "La visión de hitler del mundo", content: [
                "Hitler odiaba el mensaje de los judíos porque era diametralmente opuesto a su visión de lo que debía ser el mundo. Él dijo:",
                "'Se refieren a mí como un bárbaro ignorante. Sí, somos bárbaros. Queremos ser bárbaros, es un título honorable para nosotros. Nosotros rejuveneceremos al mundo. Este mundo se acerca a su fin'",
                "Hitler le dijo a su gente: La Providencia ha ordenado que yo sea el libertador más grande de la humanidad. Estoy liberando al hombre de las limitaciones de una inteligencia que ha asumido el poder, de las sucias y degradantes auto-mortificaciones de una falsa visión conocida como conciencia y moralidad, y de las demandas de una libertad e independencia personal que sólo unos pocos pueden soportar'."
            ]},
            { type: "heading", content: "En el alma de todo judío" },
            { type: "body", content: "El único objetivo real de Hitler eran los judíos, porque ellos eran todo lo que se interponía entre él y el éxito. Mientas los judíos sobrevivieran, Hitler no podría triunfar. Los arraigados conceptos judíos de Dios y moralidad habían tomado el control del mundo, y Hitler sabía que sólo una ideología podría prevalecer, la suya o la de los judíos. El mundo no toleraría ambas." },
            { type: "body", content: "Hitler dijo: \"Los Diez mandamientos han perdido su vitalidad. La conciencia es una invención judía, es un defecto, al igual que la circuncisión\"." },
            { type: "body", content: "Más aún, Hitler sabía que la amenaza judía estaba en cada judío. Dijo: \"Si tan solo un país, por la razón que sea, tolera en él a una familia judía, esa familia se convertirá en el centro de un nuevo alzamiento. Incluso si un pequeño niño judío sobrevive sin ninguna educación judía, sin sinagoga y sin escuela hebrea, [el judaísmo] está en su alma.\"." },
            { type: "body", content: "El espíritu judío, explicó Hitler, es el producto de la persona judía. Destruir sus lugares sagrados y nada más no sería suficiente. En las palabras de Hitler: \"Incluso si nunca hubiese existido una sinagoga, una escuela judía o el Antiguo Testamento, el espíritu judío todavía existiría y ejercería su influencia. Ha estado allí desde el principio, y no hay ningún judío – ni uno solo – que no lo personifique.\"." },

            { type: "body", content: "El odio de Hitler no nació a partir del entendimiento de lo que es el pueblo judío, sino que creció a partir de sus reacciones ante ese entendimiento. Irónicamente, Hitler tuvo un entendimiento más claro de lo que es el pueblo judío que muchos judíos hoy en día." }
        ],
        quiz: [
            {
                question: "¿Qué elemento consideraba Hitler que los judíos introdujeron al mundo y él quería eliminar?",
                options: [
                    "El sistema bancario.",
                    "El arte moderno.",
                    "La conciencia y la moralidad."
                ],
                correct: 2
            }
        ]
    },
    {
        id: 6,
        title: "Un Verdadero Entendimiento",
        subtitle: "PARTE 6",
        color: "bg-white",
        icon: <Star className="w-12 h-12 text-yellow-500" />,
        text: [
            { type: "heading", content: "La perspectiva judía del antisemitismo" },
            { type: "body", content: "Hitler introdujo a la humanidad una tendencia única de antisemitismo. Para el mundo en general este tipo de antisemitismo pareció nuevo, pero para los judíos no tenía nada de revolucionario." },
            { type: "body", content: "Mucho antes de la aparición mundial de cualquier manifestación práctica de antisemitismo, la Torá hizo saber que el antisemitismo jugaría un rol integral en la historia judía. De hecho, nos dijeron que seríamos odiados exactamente por las razones que Hitler describió tan desvergonzadamente." },
            { type: "body", content: "El Talmud (Tratado de Shabat 89) cita el origen del antisemitismo utilizando un juego de palabras: La Torá – el origen del sistema judío de leyes, valores y estándares morales – fue recibida en el Monte Sinaí. La pronunciación hebrea de \"Sinaí\" es casi idéntica a la de \"siná\" (odio)." },
            { type: "big-question", content: "SINAÍ ≈ SINÁ (ODIO)" },
            { type: "body", content: "\"¿Por qué la Torá fue entregada en un monte llamado Sinaí?\", pregunta el Talmud. \"Porque la gran siná – el tremendo odio hacia el judío – emana del Sinaí\"." },
            { type: "body", content: "En Sinaí se les dijo a los judíos que hay un Dios, y que Él hace demandas morales. Consecuentemente, en Sinaí la nación judía se convirtió en el objeto de odio para aquellos cuya motivación principal es liberar a la humanidad de las cadenas de la consciencia y la moralidad." },
            { type: "body", content: "En Sinaí la nación judía fue designada para ser \"una luz entre las naciones\". Hay quienes aceptan esa luz, pero también están los que quieren que el mundo sea un lugar de oscuridad espiritual. Estos heraldos de oscuridad son los que atacan a los judíos por ser los traedores de luz." },
            { type: "story", title: "El llamado a Sinaí", content: [
                "Hermann Rauschning fue el consejero personal de Hitler, pero abandonó el nazismo e intentó alertar al mundo del alcance y el peligro de la amenaza Nazi. Él escribió:",
                "Es en contra del propio problema irresoluto del ser humano que el tonto y el perverso se sublevan y se suman al antisemitismo. Sin embargo el judaísmo, junto con el helenismo y el cristianismo, son un componente intransferible de nuestra civilización occidental cristiana – el eterno 'llamado a Sinaí' en contra del cual la humanidad se rebela una y otra vez (The Beast From The Abyss, por Hermann Rauschning)."
            ]},
            { type: "body", content: "Este 'llamado a Sinaí', el mensaje encomendado y sostenido por los judíos, transforma finalmente al mundo. Sin embargo, es este mismo mensaje lo que provoca la furia de quienes darían hasta sus últimas fuerzas por resistírsele." },

            { type: "heading", content: "La razón real del odio a los judíos" },
            { type: "body", content: "¿Por qué la gente odia este mensaje, el eterno 'llamado a Sinaí', y odia tanto a quienes lo transmiten? Muchísima gente simplemente no puede luchar con la carga de 'ser buenas personas'. Sin embargo, cuando actúan mal, no pueden enfrentar los sentimientos de culpa resultantes. Por más que lo intenten, nunca se pueden liberar de los estándares de moral absoluta dictados por la Torá. Atrapados en este callejón sin salida, arrojan su pila de frustraciones en contra de los judíos, a quienes perciben como los que personifican la consciencia colectiva humana." },
            { type: "quote", content: "Sigmund Freud identificó esta tendencia y explicó: \"Los judíos no son tan odiados porque mataron a Jesús, sino porque lo generaron\"." },
            { type: "body", content: "Hace miles de años, antes de que la Torá fuera entregada, la gente construía su vida alrededor de filosofías que se basaban en su entendimiento propio del bien y del mal. Luego, cuando los judíos entraron en la escena teológica, les mostraron a los pueblos todos los errores que habían cometido:" },
            { type: "body", content: "Los ídolos paganos son absurdos – sólo hay un solo Dios para toda la humanidad, que es invisible, infinito y perfecto. El infanticidio y el sacrificio humano son inaceptables. Todo ser humano nace con derechos específicos. Nadie puede vivir como le plazca, ya que todos deben subordinar su voluntad a una Autoridad más elevada." },
            { type: "body", content: "En un cierto nivel consciente, la gente reconoce que el mensaje de los judíos es verdadero. Quienes no desean aceptar la verdad han encontrado que la única forma de librarse de ella es destruyendo a los mensajeros – porque el mensaje en sí mismo es demasiado potente para ser anulado." },
            { type: "body", content: "Esto es lo molesto de los judíos, y para algunas personas, es el por qué se los debe destruir totalmente. Si el judaísmo fuera tan solo una ideología más, la gente podría reírse de ella y continuar su camino. Pero en lo profundo de su alma, todo ser humano reconoce las verdades esenciales de la moralidad – simplemente no pueden ser pasadas por alto." },
            { type: "body", content: "Toda afirmación individual de superioridad sólo le molesta a la gente en la medida en que crean que es verdad. Si alguien que es indiscutiblemente feo se encuentra con alguien de apariencia agradable en una fiesta y le dice 'Me veo mejor que tú', ¿cuál sería la respuesta del otro? Lo más probable es que se encoja de hombros y lo ignore, porque el comentario no le molesta en lo más mínimo." },
            { type: "body", content: "Por otro lado, si el chico más apuesto de la clase se le acerca y hace el mismo comentario, despertará su enojo. La razón es que uno no se resiente por la gente que dice que es superior, sino por la gente que es superior." },
            { type: "body", content: "Es por esto que el odio de los cristianos a los judíos fue particularmente intenso. Ellos se vieron amenazados por el mensaje judío mucho más que las otras religiones. Los judíos dijeron que Jesús no era Dios. Esta declaración asume que el cristianismo es una falsedad; los Padres de la Iglesia entendieron que si los judíos tenían razón, y seguían siendo judíos, el cristianismo quedaría en la ruina." },
            { type: "body", content: "Allí yace la gran amenaza del judaísmo al cristianismo. La negación de Jesús por parte de otros grupos es un gran descontento para los cristianos, pero la de los judíos es intolerable. ¡Jesús vino de los judíos! El mismo grupo que lo generó, el pueblo que tuvo el mayor conocimiento y autoridad sobre esos temas, esos que representaron la última palabra en religión – fueron los primeros en rechazar a Jesús." },
            { type: "body", content: "La amenaza judía al cristianismo no tiene que ver con haber “matado” a Jesús. El origen del temor cristiano es mucho más profundo: la existencia del judaísmo invalida el dogma esencial de la teología cristiana." },
            { type: "body", content: "¿Cuál es el mensaje que el pueblo judío está trayendo al mundo y tantos encuentran tan amenazante?" },




            { type: "heading", content: "Los judíos: Una luz para las naciones"},
            { type: "body", content: "El profundo mensaje que los judíos traen a la humanidad ha sido aceptado tan globalmente que la gente tiende a darlo por sentado. Sin embargo, las ideas originadas en Sinaí literalmente han cambiado al mundo." },
            { type: "body", content: "Poca gente se pone a pensar en el origen de los fundamentos morales básicos de la sociedad occidental. Conceptos como los derechos humanos básicos, la noción de que el enfermo y el anciano deben ser cuidados – no matados y abandonados – y la idea de una sociedad que asiste al pobre y al marginado, todos parecen “venir naturalmente” hoy en día.." },

            { type: "body", content: "En síntesis, los conceptos judíos han civilizado al mundo. Cualquier estudiante serio de historia que se concientizó un poco sobre cómo eran los estándares del mundo antes de la aparición de los judíos puede reconocer con facilidad el enorme impacto que ha tenido el judaísmo." },
           
            { type: "heading", content: "¿Cómo ven los historiadores no-judíos a los judíos?" },           
            { type: "body", content: "Quienes entienden las tendencias filosóficas del mundo previas al advenimiento de la influencia judía pueden identificar con claridad que fueron los judíos quienes hicieron que el mundo abandonara el paganismo y adoptara estándares de justicia y moral." },
            { type: "body", content: "John Adams, el segundo presidente de Estados Unidos, le escribió a un amigo:" },
            { type: "quote", content: "Insisto en que los hebreos han hecho más para civilizar al hombre que cualquier otra nación… son la nación más gloriosa que haya habitado esta tierra… Le han dado la religión a tres cuartos del globo y han influenciado en los asuntos de la raza humana más, y más felizmente, que cualquier otra nación, antigua o moderna (Carta de John Adams a Francis Adrian Vanderkemp, 1808, Sociedad Histórica de Pensilvania)." },

            { type: "body", content: "El estudioso e historiador cristiano Paul Johnson escribió en su bestseller, La Historia de los Judíos:" },
            { type: "quote", content: "Una forma de resumir 4.000 años de historia judía es preguntarnos a nosotros mismos: ¿Qué hubiera pasado con la raza humana si Abraham no hubiese sido un hombre de gran sagacidad, o si se hubiera quedado en Ur guardando sus elevadas nociones para sí y no hubiese aparecido ningún pueblo judío específico? Sin lugar a dudas, el mundo sin los judíos sería un lugar radicalmente diferente. Todos los grandes descubrimientos conceptuales del intelecto parecen obvios e ineludibles una vez que han sido revelados, pero formularlos por primera vez requiere un intelecto especial. Los judíos tuvieron este regalo. A ellos les debemos las ideas de igualdad ante la ley, tanto divina como humana; de la santidad de la vida y la dignidad de la persona; de la consciencia individual y la redención personal; de la consciencia colectiva y la responsabilidad social; de la paz como un ideal abstracto y el amor como el fundamento de la justicia; y muchos otros asuntos que constituyen el mobiliario moral básico de la mente humana." },

            { type: "body", content: "En Ancient and Medieval History (Historia Antigua y Medieval), Hayes y Moon escriben:" },
            { type: "quote", content: "Sólo si sabes algo sobre los sacrificios humanos, los depravados rituales del templo, las degradantes supersticiones y costumbres que fueron practicadas… puedes darte cuenta cuánto el mundo moderno le debe a los profetas hebreos, cuyo monoteísmo y enseñanzas morales se metieron en el cristianismo y el islamismo…" },

            { type: "body", content: "T. R. Glover resaltó esta misma idea en su libro, El Mundo Antiguo:            " },
            { type: "quote", content: "La humanidad - occidental y oriental, cristianos y musulmanes - aceptaron la creencia judía de que hay un solo Dios. Hoy en día el politeísmo es tan difícil de entender que es impensable." },
            { type: "body", content: "La moral y los ideales judíos han ganado una aceptación casi universal. Y con eso, han generado una violenta resistencia al mensaje judío." },
           
            { type: "heading", content: "Entendiendo qué es ser judío"},
            { type: "body", content: "El pueblo judío puede tolerar casi cualquier persecución. Durante toda la historia, el judaísmo ha sobrevivido incontables incidentes abominables de discriminación y persecución. ¿Cuál es el secreto de su persistente fortaleza?" },
            { type: "body", content: "El filósofo Friedrich Nietzsche dijo una vez: 'Quien tiene un por qué vivir, es capaz de soportar cualquier cómo'. Es decir, si una persona entiende el profundo significado de la experiencia, podrá tolerar cualquier circunstancia de la vida." },
            { type: "body", content: "A través de los milenios, el pueblo judío sufrió enormes cantidades de odio – conduciendo finalmente al genocidio. Y a pesar de todo, el pueblo judío se ha mantenido judío. ¿Por qué? Porque entendieron que valía la pena. Entendieron el significado de ser judío y estaban dispuestos a pagar el precio." },
            { type: "body", content: "Si los judíos no hubieran visto ningún significado a su dolor no hubiesen querido mantener su identidad judía. Es por eso que la asimilación está tan difundida hoy en día – muchos judíos no ven por qué deberían 'perderse' la vida y marginarse." },

            { type: "highlight", content: "En otras palabras, antisemitismo + ignorancia = asimilación." },

            { type: "body", content: "Si entendiéramos por qué los judíos son tan odiados, podríamos entender qué son los judíos y, más importante aún, lo que los judíos pueden ser. Se ha hecho un enérgico esfuerzo para remover el elemento judío del antisemitismo y, como consecuencia, se ha ignorado el mensaje crítico que el antisemitismo enseña sobre la singularidad y el especial valor de un judío. Esto es por sí mismo una razón apremiante para que los judíos aprendan sobre antisemitismo y sobre lo que significa ser judío." },
            { type: "body", content: "Aunque no vivamos en la Alemania nazi donde mataban judíos; vivimos en un mundo que es sutilmente antisemita. Ya sean las condenas de la ONU; el favoritismo mediático en contra de Israel o la violencia contra los judíos en Europa, el odio a los judíos está ahí. Sutil, pero persistente." },

            { type: "story", title: "La metáfora del pelirrojo", content: [
                "Los judíos conocen muy bien la carga de ser judíos. Sin la belleza y el entendimiento de los beneficios del judaísmo, van a decir, 'Deshagámonos de esto. ¿Quién lo necesita? Quiero librarme de ser judío'.",
                "Imagina que tienes una hija, y que finalmente llega el día en que comienza el primer grado – unirse al mundo exterior y a la sociedad por primera vez. Al igual que todos los padres jóvenes, estás nervioso. La mandas a la escuela preguntándote: ¿Será aceptada? ¿Encajará? ¿Será sociable y tendrá amigos? etc.",
                "Al regresar a casa ese día, estás ansioso por escuchar sobre el primer día de tu hija. Pero ves que está deprimida. Preguntas '¿Qué pasó?' Responde, 'Durante el recreo todos los chicos se rieron de mí. Miraban mi cabello rojo y me dijeron Cabeza de Zanahoria. ¡Fue terrible!'.                .",
                "Estás devastado. Todo el futuro de tu hija, su autoestima, está en peligro. ¿Qué puedes hacer al respecto?",
                "La solución más fácil a este problema es teñir su cabello. ¡Listo! No más cabello rojo, ahora es castaño. ¡El problema está solucionado!.",
                "¿Cuál es la solución más difícil? Redefinir la situación. Decirle: 'No importa lo que digan sobre tener cabello rojo, no es malo. ¡Es precioso! ¡Es maravilloso! Es único. Tiene estilo y personalidad. Es extravagante'. Lo redefines. Y ella no tiene más problemas. Porque su problema no era realmente un problema, sino que era un prejuicio de los demás.",
                "En realidad, ¿Qué es lo peor que le puedes hacer a esta niña? Teñir su pelo. ¿Por qué? Porque estás confirmando sus miedos. Le estás diciendo: 'Ellos tienen razón. En verdad el pelo rojo es malo. Deshagámonos de él'."
            ]},
            { type: "body", content: "Esta es nuestra situación. Por un lado, ser judío es como haber nacido pelirrojo. No es popular. Hay personas que nos degradarán por eso." },
            { type: "body", content: "A menos que cada judío tenga un gran entendimiento de la importancia de ser judío, por definición, no le va a gustar ser judío. No se va a gustar a sí mismo." },
            { type: "body", content: "¿Cuál es la mejor forma de obtener esta percepción alternativa de lo que es ser judío? Hemos llegado a la comprensión del antisemitismo y su causa." },


            { type: "heading", content: "Los judíos: Una luz para las naciones"},
            { type: "body", content: "La solución al antisemitismo es exactamente lo mismo que la causa: así como los valores y las creencias judías causan el antisemitismo, asimismo, los valores y las creencias judías finalmente lo eliminarán." },
            { type: "body", content: "El mensaje que los judíos cargan es la receta para conquistar el mal. Cuanto más efectivamente los judíos transmitan su especial mensaje, más cerca estarán de hacer que un holocausto – ya sea en contra de los judíos o de cualquier otro grupo – sea imposible." },
            { type: "body", content: "Sólo cuando los judíos actúen como judíos – cuando el mensaje de ética y moralidad de la Torá sea conocido en todo el mundo – podremos tener la esperanza de vivir en un mundo donde el mal sea erradicado." },
            { type: "body", content: "Aquí yace la exquisita ironía de la historia judía. A pesar de que los judíos no presentaron ninguna amenaza militar, política o económica; y que nunca fueron más que una pequeña fracción de la población mundial, siempre fueron un poder principal ante los ojos de la humanidad. ¿Por qué? Por el mensaje que llevan – la Torá." },
            { type: "body", content: "Las ideas judías influencian el mundo, pero el mundo no podrá absorber el mensaje apropiadamente a menos que los mensajeros – los judíos – lo sepan y lo enseñen." },

            { type: "highlight", content: "En lugar de '¿Por qué los judíos?', la pregunta es: '¿Por qué ser judío?'." },

            { type: "body", content: "La respuesta a esta pregunta es crítica para ti, para el pueblo judío, y finalmente, para el mundo. Cuando los judíos deben vivir en una sociedad antisemita, dentro del contexto de un pasado lleno de antisemitismo, deben tener un fuerte sentido íntimo de por qué ser judío es significativo y valedero; y de por qué vale la pena el esfuerzo." },
            { type: "body", content: "¿Cuál es la mejor forma de obtener una percepción positiva y optimista sobre ser judío?" },









           
           
           
            { type: "stamp", content: "La respuesta es obvia: con educación judía." },
        ],
        quiz: [
            {
                question: "Según el Talmud, ¿por qué la Torá fue entregada en el Monte Sinaí?",
                options: [
                    "Porque era el monte más alto.",
                    "Porque estaba cerca de Egipto.",
                    "Por el juego de palabras con 'Siná' (odio), indicando que allí comenzó la responsabilidad moral que genera el odio."
                ],
                correct: 2
            }
        ]
    }
];

// --- PROGRESS BAR COMPONENT ---
const ProgressBar = ({ progress }) => (
    <div className="fixed top-0 left-0 w-full h-3 bg-gray-200 z-50 shadow-md">
        <div 
            className="h-full bg-pop-magenta transition-all duration-500 ease-out"
            style={{ width: `${progress}%` }}
        />
    </div>
);

// --- COMPONENTE DE QUIZ ---
const Quiz = ({ questions, onComplete }) => {
    const [answers, setAnswers] = useState({});
    const [completed, setCompleted] = useState(false);
    const [error, setError] = useState(false);

    const handleSelect = (qIndex, optIndex) => {
        setAnswers(prev => ({ ...prev, [qIndex]: optIndex }));
        setError(false);
    };

    const checkAnswers = () => {
        const allCorrect = questions.every((q, i) => answers[i] === q.correct);
        if (allCorrect) {
            setCompleted(true);
            onComplete();
        } else {
            setError(true);
        }
    };

    if (completed) {
        return (
            <div className="my-12 p-8 border-4 border-black bg-green-100 text-center animate-bounce">
                <CheckCircle className="w-16 h-16 mx-auto mb-4 text-green-600" />
                <h3 className="font-heading text-3xl">¡Correcto!</h3>
                <p className="font-body text-[22px] md:text-[26px]">Has desbloqueado la siguiente sección.</p>
            </div>
        );
    }

    return (
        <div className="my-16 p-6 md:p-10 bg-white border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
            <h3 className="font-heading text-3xl mb-6 flex items-center gap-2">
                <HelpCircle className="w-8 h-8" />
                Pregunta de Repaso
            </h3>
            
            <div className="space-y-8">
                {questions.map((q, i) => (
                    <div key={i}>
                        <p className="font-bold font-body text-[24px] mb-4">{q.question}</p>
                        <div className="space-y-3">
                            {q.options.map((opt, optIndex) => (
                                <button
                                    key={optIndex}
                                    onClick={() => handleSelect(i, optIndex)}
                                    className={`w-full text-left p-4 border-2 transition-all font-medium text-[20px] ${
                                        answers[i] === optIndex 
                                        ? 'bg-black text-white border-black' 
                                        : 'bg-gray-50 hover:bg-gray-200 border-gray-300'
                                    }`}
                                >
                                    {opt}
                                </button>
                            ))}
                        </div>
                    </div>
                ))}
            </div>

            {error && (
                <div className="mt-6 flex items-center gap-2 text-red-600 font-bold animate-pulse text-[20px]">
                    <XCircle />
                    Respuesta incorrecta. Intenta de nuevo.
                </div>
            )}

            <button 
                onClick={checkAnswers}
                className="mt-8 w-full bg-black text-white font-heading uppercase py-4 hover:bg-gray-800 transition-colors text-2xl tracking-widest"
            >
                Verificar Respuesta
            </button>
        </div>
    );
};

// --- RENDERIZADO DE TEXTO DINÁMICO ---
const DynamicText = ({ item, index }) => {
    const rotation = index % 2 === 0 ? 'rotate-1' : '-rotate-1';
    // Aumento de márgenes para mobile first y desktop
    const margin = index % 3 === 0 ? 'ml-0' : (index % 3 === 1 ? 'ml-2 md:ml-12' : 'ml-1 md:ml-6');

    switch (item.type) {
        case 'heading':
            return (
                <div className="py-12 clear-both">
                    <h3 className={`font-heading text-[28px] md:text-[42px] uppercase transform ${rotation} decoration-clone bg-black text-white inline-block px-4 py-2 shadow-lg`}>
                        {item.content}
                    </h3>
                </div>
            );
        case 'big-question':
            return (
                <div className="text-center py-24 px-4 clear-both relative z-10">
                    <h2 className="font-heading text-[40px] md:text-[80px] text-transparent text-stroke-black spangler-shadow bg-white inline-block px-8 py-6 transform -rotate-3 hover:scale-105 transition-transform">
                        {item.content}
                    </h2>
                </div>
            );
        case 'quote':
            return (
                <div className="py-12 clear-both">
                    <div className="pl-6 border-l-8 border-black bg-white p-8 spangler-shadow transform rotate-1 hover:-rotate-1 transition-transform">
                        <p className="font-serif text-[24px] md:text-[30px] italic leading-relaxed text-gray-800">
                            {item.icon && item.icon} "{item.content}"
                        </p>
                    </div>
                </div>
            );
        case 'highlight':
            return (
                <div className="py-12 text-center clear-both relative z-10">
                    <p className="font-heading text-[26px] md:text-[40px] leading-tight inline-block bg-yellow-300 px-6 py-4 decoration-clone shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] border-3 border-black transform rotate-2">
                        {item.content}
                    </p>
                </div>
            );
        case 'note':
            return (
                <div className="py-10 clear-both">
                    <div className="flex items-start gap-4 bg-gray-100 p-6 border-2 border-black border-dashed rounded-xl transform -rotate-1 hover:rotate-0 transition-transform">
                        <div className="min-w-[30px] mt-1 text-3xl">👉</div>
                        <p className="font-marker text-[22px] md:text-[26px] text-gray-800 leading-relaxed">{item.content}</p>
                    </div>
                </div>
            );
        case 'story':
            return (
                <div className="py-16 clear-both">
                    <div className="bg-white border-4 border-black p-6 md:p-8 spangler-shadow transform rotate-1 relative">
                        <div className="bg-black text-white px-4 py-1 font-heading text-lg uppercase inline-block mb-4 transform -rotate-1">
                            {item.title}
                        </div>
                        <div className="font-serif text-[22px] md:text-[26px] leading-relaxed text-gray-900 space-y-4">
                            {item.content.map((paragraph, i) => (
                                <p key={i}>{paragraph}</p>
                            ))}
                        </div>
                    </div>
                </div>
            );
        case 'list':
            return (
                <div className="py-10 clear-both">
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {item.items.map((li, i) => (
                            <li key={i} className="bg-black text-white p-4 font-bold font-heading uppercase text-center spangler-shadow transform hover:-translate-y-1 transition-transform flex items-center justify-center text-center text-[20px] md:text-[24px]">
                                {li}
                            </li>
                        ))}
                    </ul>
                </div>
            );
        case 'stamp':
            return (
                <div className="py-20 text-center clear-both">
                    <div className="inline-block border-8 border-red-600 p-8 rounded-lg transform -rotate-12 mask-image text-red-600 font-heading text-[32px] md:text-[50px] uppercase opacity-90 mix-blend-multiply">
                        {item.content}
                    </div>
                </div>
            );
        case 'intro':
            return (
                <div className="mb-12 mt-4 clear-both">
                    <p className="text-[28px] md:text-[40px] font-bold font-body leading-tight border-l-8 border-black pl-6 py-2">
                        {item.content}
                    </p>
                </div>
            );
        default:
            // USANDO H3 PARA FORZAR LEGIBILIDAD VISUAL
            return (
                <div className={`mb-10 ${margin} clear-both`}>
                    <h3 className="text-[24px] md:text-[32px] font-medium font-body leading-loose text-gray-900 max-w-prose">
                        {item.content}
                    </h3>
                </div>
            );
    }
};

// --- SECCIONES ---

const Section = ({ data, isLocked, onUnlock, sectionRef, nextSectionUnlocked }) => {
    const [quizPassed, setQuizPassed] = useState(false);

    if (isLocked) return null;

    const handleContinue = () => {
        if (onUnlock) onUnlock();
    };

    return (
        <div ref={sectionRef} className="w-full min-h-screen flex flex-col items-center py-12 md:py-24 px-4 relative">
            
            {/* Floating Icons Background */}
            <div className="absolute top-10 left-5 opacity-20 transform -rotate-12 pointer-events-none hidden md:block">{data.icon}</div>
            <div className="absolute bottom-20 right-5 opacity-20 transform rotate-45 pointer-events-none hidden md:block">{data.icon}</div>

            <div className={`max-w-4xl w-full relative z-10 reveal-section`}>
                
                {/* Card Header */}
                <div className="mb-16 md:mb-20 text-center">
                    <div className="inline-block bg-black text-white px-4 py-1 font-heading text-sm mb-2 transform -rotate-2">
                        SECCIÓN {data.id}
                    </div>
                    <h2 className={`font-heading text-4xl md:text-7xl uppercase leading-[0.9] spangler-shadow p-6 md:p-8 ${data.color} transform rotate-1 break-words hyphens-auto`}>
                        {data.title}
                    </h2>
                </div>

                {/* Dynamic Content */}
                <div className="bg-white border-4 border-black p-6 md:p-16 shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] relative">
                    {/* Decorative Tape */}
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-32 md:w-48 h-10 bg-gray-200/80 rotate-1 border border-gray-300 shadow-sm"></div>

                    <div className="space-y-2">
                        {data.text.map((item, i) => (
                            <DynamicText key={i} item={item} index={i} />
                        ))}
                    </div>

                    {/* Quiz & Botón */}
                    {data.quiz && !nextSectionUnlocked && !quizPassed && (
                        <Quiz questions={data.quiz} onComplete={() => setQuizPassed(true)} />
                    )}

                    {/* Si ya pasó el quiz o la siguiente sección ya estaba desbloqueada, mostrar el mensaje de éxito O el botón */}
                    {data.quiz && quizPassed && !nextSectionUnlocked && (
                         <div className="my-12 p-8 border-4 border-black bg-green-100 text-center animate-bounce">
                            <CheckCircle className="w-16 h-16 mx-auto mb-4 text-green-600" />
                            <h3 className="font-heading text-3xl">¡Correcto!</h3>
                            <p className="font-body text-[22px] md:text-[26px]">Has desbloqueado la siguiente sección.</p>
                        </div>
                    )}

                    {onUnlock && (quizPassed || nextSectionUnlocked) && (
                        <div className="mt-24 text-center">
                            <button 
                                onClick={handleContinue}
                                className="group relative inline-block w-full md:w-auto"
                            >
                                <div className="absolute top-0 left-0 w-full h-full bg-black translate-x-2 translate-y-2 hidden md:block"></div>
                                <div className={`relative border-4 border-black ${data.color} px-8 py-5 flex justify-center items-center gap-3 font-heading text-xl md:text-2xl uppercase tracking-wider group-hover:-translate-y-1 group-active:translate-y-1 transition-all cursor-pointer`}>
                                    CONTINUAR
                                    <ArrowRight className="w-8 h-8" />
                                </div>
                            </button>
                        </div>
                    )}

                    {!onUnlock && quizPassed && (
                        <div className="mt-24 text-center p-8 border-t-4 border-black bg-gray-50">
                            <p className="font-heading text-[24px] md:text-[30px] mb-4">¡Tu viaje apenas comienza!</p>
                            <p className="font-body text-[22px] md:text-[26px] mb-6">Sigue descubriendo la profundidad de la sabiduría judía.</p>
                            <a href="https://aishlatino.com" target="_blank" rel="noreferrer" className="group relative inline-block w-full md:w-auto">
                                <div className="relative border-2 border-black bg-pop-yellow px-8 py-4 font-heading text-xl hover:bg-black hover:text-white transition-colors uppercase tracking-widest">
                                    Ir a AishLatino.com
                                </div>
                            </a>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

const Hero = ({ onStart }) => {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-pop-yellow relative overflow-hidden p-4 md:p-6 border-b-8 border-black">
            {/* Collage Elements */}
            <div className="absolute top-10 right-10 w-32 h-32 bg-pop-cyan rounded-full border-4 border-black mix-blend-multiply animate-pulse hidden md:block"></div>
            <div className="absolute bottom-10 left-10 w-48 h-48 bg-pop-magenta transform rotate-45 border-4 border-black mix-blend-multiply opacity-80 hidden md:block"></div>
            
            <div className="relative z-10 text-center max-w-6xl w-full">
                
                <div className="mb-6 flex justify-center">
                    <div className="bg-white border-4 border-black px-6 py-2 font-marker text-lg md:text-xl transform -rotate-3 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                        SEMINARIO INTERACTIVO
                    </div>
                </div>

                {/* TITULO SOLIDO CON SOMBRA NEGRA (Sin text-stroke) */}
                <h1 className="font-heading text-[12vw] md:text-[130px] leading-[0.85] mb-8 text-white drop-shadow-[4px_4px_0_rgba(0,0,0,1)] md:drop-shadow-[8px_8px_0_rgba(0,0,0,1)] tracking-tighter">
                    EL ODIO<br/>MÁS ANTIGUO<br/>DEL MUNDO
                </h1>

                <div className="bg-black text-white inline-block px-6 py-3 transform rotate-2 mb-12">
                    <h2 className="font-heading text-lg md:text-2xl uppercase tracking-widest">
                        ¿Por qué los judíos?
                    </h2>
                </div>

                <div>
                    <button 
                        onClick={onStart}
                        className="group relative inline-block w-full md:w-auto px-4"
                    >
                        <div className="absolute inset-0 bg-white border-4 border-black translate-x-2 translate-y-2 md:translate-x-3 md:translate-y-3"></div>
                        <div className="relative border-4 border-black bg-pop-magenta px-8 md:px-12 py-5 md:py-6 font-heading text-2xl md:text-4xl text-white uppercase tracking-widest group-hover:-translate-y-1 md:group-hover:-translate-y-2 transition-transform flex justify-center items-center gap-4">
                            COMENZAR
                            <ArrowRight className="w-8 h-8 md:w-10 md:h-10" />
                        </div>
                    </button>
                </div>
            </div>
            
            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
                <ChevronDown className="w-10 h-10 md:w-12 md:h-12" />
            </div>
        </div>
    );
};

const App = () => {
    const [unlockedLevel, setUnlockedLevel] = useState(0); 
    const sectionRefs = useRef([]);

    const progress = (unlockedLevel / contentData.length) * 100;

    const handleNavigation = (targetLevel) => {
        if (targetLevel > unlockedLevel) {
            setUnlockedLevel(targetLevel);
        } else {
            scrollToLevel(targetLevel);
        }
    };

    const scrollToLevel = (level) => {
        if (sectionRefs.current[level]) {
            setTimeout(() => {
                const element = sectionRefs.current[level];
                const yOffset = -20;
                const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
                window.scrollTo({ top: y, behavior: 'smooth' });
            }, 150);
        }
    };

    useEffect(() => {
        scrollToLevel(unlockedLevel);
    }, [unlockedLevel]);

    return (
        <div className="font-body text-gray-900 selection:bg-pop-magenta selection:text-white">
            <style>{styles}</style>
            <ProgressBar progress={progress} />

            <Hero onStart={() => handleNavigation(1)} />

            <div className="flex flex-col w-full">
                {contentData.map((data, index) => {
                    const level = data.id;
                    const isNextUnlocked = unlockedLevel > level;
                    
                    return (
                        <Section 
                            key={data.id}
                            data={data}
                            isLocked={level > unlockedLevel}
                            nextSectionUnlocked={isNextUnlocked}
                            onUnlock={index < contentData.length - 1 ? () => handleNavigation(level + 1) : null}
                            sectionRef={el => sectionRefs.current[level] = el}
                        />
                    );
                })}
            </div>
        </div>
    );
};

export default App;