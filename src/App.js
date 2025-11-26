import React, { useState, useEffect, useRef } from 'react';
import { ChevronDown, ArrowRight, Star, Zap, Eye, X, MessageCircle, BookOpen, Music, CheckCircle, XCircle, HelpCircle, Quote } from 'lucide-react';

// --- ESTILOS ---
const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Archivo+Black&family=Inter:wght@400;500;700;900&family=Merriweather:ital,wght@0,400;0,700;1,400&family=Permanent+Marker&display=swap');

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
            { type: "quote", content: "Oh los protestantes odian a los católicos,\ny los católicos odian a los protestantes,\ny los hindúes odian a los musulmanes\ny todos odian a los judíos.", icon: <Music className="w-6 h-6 inline mr-2" /> },
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
                "Economía: Riqueza y poder.",
                "Pueblo Elegido: Arrogancia.",
                "Chivo Expiatorio: Culpa conveniente.",
                "Deicidio: Mataron a Jesús.",
                "Forasteros: Son diferentes.",
                "Teoría Racial: Raza inferior."
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
            { type: "heading", content: "¿Dinero y Poder?" },
            { type: "body", content: "¿Acaso la riqueza y el poder de los judíos es la causa del antisemitismo?" },
            { type: "body", content: "La Teoría Económica del antisemitismo postula que la riqueza y el poder de los judíos provoca la envidia de otros grupos, lo que desemboca en un gran resentimiento." },
            { type: "body", content: "Esta teoría ha aparecido durante la historia con diferentes disfraces. Una de las formas en las que se hizo popular fue a través de Los Protocolos de los Ancianos de Sión, las actas de \"encuentros secretos\" ficticios en los que los líderes judíos conspiraron para gobernar el mundo. Los Protocolos es un libro salvajemente antisemita creado por la policía secreta rusa." },
            { type: "body", content: "Este relato ficticio proveyó una excelente excusa para campañas de persecución en contra de los judíos, e influyó a las masas para que creyeran el mito de que los judíos controlan los gobiernos. Es el segundo libro más publicado de la historia." },
            { type: "intro", content: "¿Acaso la gente de hoy en día cree todavía que los judíos tienen alguna misteriosa ventaja financiera?" },
            
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
            { type: "heading", content: "Aplicando el test de litmus" },
            { type: "body", content: "¿Explica esta actitud el antisemitismo? ¿Es la Teoría económica una causa o una excusa del antisemitismo?" },
            { type: "body", content: "Primero, mira las actitudes universales hacia los ricos. No vemos ninguna persecución histórica sostenida en contra de los no judíos ricos. Entonces, si los repudiadores deciden señalar a los ricos judíos e ignorar a los no judíos, la economía no puede ser considerada la causa del odio." },
            { type: "body", content: "Segundo, si quitamos el elemento de la riqueza y el poder de los judíos, ¿desaparece el antisemitismo?" },
            { type: "body", content: "Los judíos que vivieron en los shtetels de Polonia y Rusia entre los siglos 17 y 20 eran pobres y no tenían ninguna clase de poder, careciendo por completo de toda forma de influencia. Sin embargo eran odiados. A menudo fueron perseguidos y sometidos a tormentos indescriptibles. En muchas ocasiones aldeas enteras eran saqueadas y los habitantes judíos masacrados a sangre fría. En estas circunstancias el antisemitismo no distinguió entre fuertes y débiles, entre poderosos y no poderosos." },
            { type: "body", content: "Cuando los Nazis liquidaron el Gueto de Varsovia no había ningún negocio judío que destruir. En realidad, las condiciones de pobreza allí eran espantosas." },
            { type: "highlight", content: "Los judíos pobres siempre han sido odiados a la par de los judíos ricos." },
            { type: "body", content: "Por lo tanto, el dinero no puede ser la causa del antisemitismo." },
            { type: "heading", content: "El Plan Fugu" },
            { type: "body", content: "¿Y qué hay del poder? ¿Puede el poder ser la causa del antisemitismo? Si alguien rico y poderoso viene a pedirte un favor, ¿lo perseguirías? ¡No!, lo ayudarías." },
            { type: "body", content: "Hubo una nación que trató a los judíos como si fueran ricos y poderosos. Los japoneses." },
            
            { type: "story", title: "El Plan Fugu", content: [
                "En 1919 Japón peleó junto a los antisemitas Rusos Blancos en contra de los comunistas. En ese entonces los Rusos Blancos le presentaron a los japoneses el libro Los Protocolos de los Ancianos de Sión.",
                "Los japoneses estudiaron el libro y, de acuerdo a todas las opiniones, creyeron inocentemente en su propaganda. Su reacción fue inmediata y contundente – formularon un plan para alentar los asentamientos e inversión judía en Manchuria. ¡Los japoneses decidieron que estos ricos y poderosos judíos eran precisamente la clase de gente con la que querían hacer negocios!",
                "Los japoneses llamaron a su plan para el asentamiento judío \"El Plan Fugu\". El \"fugu\" es un pez altamente venenoso. Después de que los órganos que contienen toxinas son cuidadosamente removidos, es utilizado como un plato de comida en Japón, y es considerado un exquisito manjar. Sin embargo, si no es preparado con cuidado, su veneno puede ser mortal.",
                "Los japoneses consideraron a los judíos una nación con un potencial altamente valioso pero, al igual que con el \"fugu\", para poder aprovechar el potencial tenían que ser extremadamente cuidadosos."
            ]},

            { type: "body", content: "Si los antisemitas realmente creen que los judíos dirigen el mundo, ¿por qué no se relacionan con los judíos como lo hicieron los japoneses? El hecho de que los judíos son por lo general tratados como marginados prueba que la gente no cree que los judíos sean tan ricos o poderosos como afirman. En otras palabras, los antisemitas no toman su propia propaganda con seriedad." },
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
        title: "Pueblo Elegido & Chivo Expiatorio",
        subtitle: "PARTE 3",
        color: "bg-pop-magenta",
        icon: <MessageCircle className="w-12 h-12" />,
        text: [
            { type: "heading", content: "La teoría del pueblo elegido" },
            { type: "body", content: "La idea de que el pueblo judío es el \"pueblo elegido\" es innegablemente popular. En un estudio de la Universidad de California, la afirmación más creída (59%) era que \"los judíos se consideran a sí mismos el pueblo elegido de Dios\"." },
            { type: "body", content: "Chequeemos ahora si esta creencia es una causa legítima del antisemitismo. Si el \"ser elegido\" es de hecho la causa, entonces el odio en contra de los judíos debería desaparecer si los judíos dejaran de afirmar que son los elegidos." },
            
            { type: "story", title: "El experimento alemán", content: [
                "A finales del siglo 19, los judíos que vivían en Alemania y Austria rechazaron colectivamente el hecho de \"haber sido elegidos\" y se asimilaron en la nación en la que se encontraban.",
                "De hecho, ellos creían que los no judíos entre los que vivían eran realmente el pueblo elegido. \"¡Berlín es nuestro Jerusalem!\", proclamaban con fuerza.",
                "La sociedad gentil era el entorno social de su elección, y Alemania su amada madre patria."
            ]},

            { type: "big-question", content: "¿DESAPARECIÓ EL ODIO?" },
            { type: "body", content: "Todos conocemos la trágica respuesta a esta pregunta. Los judíos en Alemania y Austria sufrieron la proliferación de antisemitismo más empedernida de toda la historia. Precisamente cuando los judíos rechazaron el hecho de \"haber sido elegidos\" es que sufrieron las formas más violentas de antisemitismo." },
            { type: "note", content: "Claramente, la Teoría del Pueblo Elegido no pasa el Test de Litmus." },
            { type: "body", content: "Además, casi toda nación sobre la tierra ha, en alguna ocasión, afirmado ser la elegida. Los chinos (\"centro del universo\"), Japón (\"fuente del sol\"), EEUU (Destino Manifiesto). Estas naciones no son odiadas por haber afirmado superioridad. Afirmar que uno es elegido no causa odio." },
            { type: "heading", content: "La teoría del chivo expiatorio" },
            { type: "body", content: "La Teoría del Chivo Expiatorio es citada con frecuencia. Su razonamiento es: Hitler necesitaba desviar la atención de los problemas de su nación al atribuírselos a una víctima inocente. Él eligió al azar, seleccionó a los judíos como su chivo expiatorio." },
            { type: "body", content: "La Teoría del Chivo Expiatorio eleva una vieja pregunta: ¿Qué vino primero, el huevo o la gallina? En otras palabras, ¿un grupo comienza a ser odiado como consecuencia de ser señalado como un chivo expiatorio, o es seleccionado como chivo expiatorio porque es odiado?" },
            { type: "highlight", content: "Prerrequisito: El odio debe existir antes." },
            { type: "body", content: "El primer prerrequisito para un posible chivo expiatorio es que los ciudadanos del país estén dispuestos a odiar desde el principio." },
            
            { type: "story", title: "Imaginando a Hitler y los enanos", content: [
                "Imagina lo que hubiese pasado si Adolf Hitler se hubiera parado frente a una de esas inmensas multitudes en el Coliseo Nacional de Núremberg y hubiera dicho:",
                "\"Mis amigos alemanes, ¡hay un grupo entre nosotros que es la escoria de la humanidad! ¡Están dominando al pueblo alemán y están destruyendo nuestra madre patria!\"",
                "\"Si Alemania quiere recuperar su apreciado estatus, este pueblo debe ser perseguido y, finalmente, eliminado. ¿Cuál es este pueblo?\"",
                "\"¡Son los enanos que están entre nosotros!\"",
                "Como no hay un odio preexistente hacia los enanos, las personas con pecas o los ciclistas, los gobiernos no tratan de utilizarlos como chivos expiatorios."
            ]},

            { type: "body", content: "Los judíos son elegidos consistentemente como chivo expiatorio porque es muy fácil incentivar el odio en su contra. Por lo tanto, la Teoría del Chivo Expiatorio no es la causa del antisemitismo. En cambio, el antisemitismo es lo que convierte a los judíos en un conveniente chivo expiatorio." },
            { type: "heading", content: "Deicidio: Asesinos de Jesús" },
            { type: "body", content: "¿Es esta la causa real del odio? Si es así, ¿por qué no estaban los cristianos enojados con los judíos hace 2.000 años, en el momento en que los judíos supuestamente mataron a Jesús?" },
            { type: "body", content: "El antisemitismo cristiano no comenzó hasta mucho después de la muerte de Jesús. No fue hasta varios siglos después que los padres de la Iglesia decidieron que los judíos debían ser perseguidos. La persecución intensa no comenzó sino hasta las Cruzadas, ¡más de 1.000 años después!" },
            { type: "body", content: "Más aún, el tiempo tiene la cualidad de sanar todas las heridas. Si los cristianos odiaran a los judíos porque mataron a Jesús, esa furia debería haber llegado al clímax inmediatamente después de su muerte, y debería haberse desvanecido durante los dos milenios." },
            { type: "body", content: "Además, de acuerdo al Nuevo Testamento, los romanos fueron quienes mataron a Jesús." },
            { type: "quote", content: "Si el asesinato de Jesús es la causa del odio cristiano, ¿por qué fueron sólo los cómplices judíos los categóricamente perseguidos? ¡Los cristianos deberían odiar a los romanos al menos tanto como odian a los judíos!" },
            { type: "stamp", content: "ES UNA EXCUSA" }
        ],
        quiz: [
            {
                question: "Cuando los judíos alemanes dejaron de llamarse 'Pueblo Elegido' y se asimilaron, ¿qué sucedió?",
                options: [
                    "El antisemitismo desapareció inmediatamente.",
                    "Fueron aceptados completamente en la sociedad.",
                    "Sufrieron la forma más violenta de antisemitismo."
                ],
                correct: 2
            }
        ]
    },
    {
        id: 4,
        title: "Forasteros y Raza",
        subtitle: "PARTE 4",
        color: "bg-pop-lime",
        icon: <X className="w-12 h-12" />,
        text: [
            { type: "heading", content: "La teoría de los forasteros" },
            { type: "body", content: "Quizás los judíos son odiados simplemente porque son diferentes. Tradicionalmente, los judíos se caracterizaban por vestimenta, leyes y en ocasiones hasta lenguaje diferentes. Los sociólogos se refieren a este fenómeno como \"el desagrado por lo diferente\"." },
            { type: "body", content: "Pero, ¿qué pasa cuando los judíos abandonan sus diferencias culturales y se convierten en genuinos \"pares\"? Si la Teoría del Forastero es correcta, entonces la solución al antisemitismo debería ser la asimilación." },
            
            { type: "story", title: "La desilusión de la asimilación", content: [
                "En el siglo 18 llegó a Europa el Iluminismo. En diciembre de 1789, durante una discusión en la Asamblea Nacional Francesa, el Conde Stanislas de Clermont-Tonnere declaró: \"Para los judíos como individuos, todo. Para los judíos como nación, nada\".",
                "Los judíos de Europa saltaron ante la oportunidad. Abandonaron sus antiguas vestimentas, se afeitaron sus barbas y asistieron a las universidades. En resumen, se hicieron más franceses que los franceses mismos.",
                "Napoleón fue rápido para capitalizar esta \"evolución\". Pero sólo se desilusionaron. El caso Dreyfuss, en el que falsas acusaciones de traición fueron presentadas en contra de un oficial francés judío, fue ideado para demostrar que los judíos nunca podrían ser ciudadanos leales.",
                "Poco después, el nazismo en Alemania les dio un fuerte mensaje: Los odiamos, no porque son diferentes, ¡sino porque están tratando de ser como nosotros!"
            ]},

            { type: "body", content: "Mientras los judíos permanecieron como forasteros, la Teoría del Forastero tuvo algo de lógica. A partir de que los judíos intentaron asimilarse, la Teoría del Forastero quedó hecha pedazos – porque nunca había sido la causa real del odio." },
            { type: "heading", content: "La teoría racial" },
            { type: "body", content: "Esto dio lugar a una nueva excusa: la inferioridad de la raza judía. Puedes abandonar las limitaciones externas de tu vida, afeitarte la barba, quitarte la kipá y hasta cambiar tu religión. Pero nunca podrás cambiar tu raza." },
            { type: "body", content: "El problema inevitable que tiene esta teoría es que se auto-contradice: los judíos no son una raza. Cualquiera puede convertirse en judío – y miembros de toda raza, credo y color del mundo lo han hecho." },
            { type: "highlight", content: "No hay ninguna característica racial distintiva común." },
            { type: "body", content: "Incluso la idea de la \"nariz judía\" es un mito. El antisemitismo no puede ser explicado como racismo por la muy simple razón de que los judíos son una nación, no una raza." },
            { type: "heading", content: "Odio único" },
            { type: "body", content: "De todas las formas discriminatorias de odio, el antisemitismo es único en cuatro aspectos:" },
            { type: "list", items: [
                "1. Antigüedad: Excepcionalmente largo.",
                "2. Universalismo: En todo el mundo.",
                "3. Intensidad: Intentos de genocidio.",
                "4. Confusión: Muy poco consenso."
            ]},
            { type: "body", content: "Sorprendentemente, ¡hay muy poco consenso sobre lo que el antisemitismo odia en particular! Si le pides a un antisemita que declare sus razones, esas razones son a menudo contradictorias." },
            { type: "note", content: "Los judíos son odiados por ser una raza perezosa e inferior – pero también por dominar la economía. Los judíos son odiados por mantener tercamente su estado de separación y, cuando se asimilan, por ser una amenaza a la pureza racial. Por ser pacifistas y belicistas. Capitalistas y comunistas." },
            { type: "stamp", content: "DEMASIADAS RAZONES = NINGUNA RAZÓN" },
            { type: "body", content: "Las \"Seis Razones\" no aguantan el escrutinio – ¡son excusas! El problema es que cada una de las explicaciones se enfoca en asuntos externos al judío, no tienen nada que ver con su esencia. Entonces, ¿cuál es “La Razón”?" }
        ],
        quiz: [
            {
                question: "¿Por qué la asimilación no funcionó para detener el antisemitismo?",
                options: [
                    "Porque los judíos no se asimilaron lo suficiente.",
                    "Porque perdieron su identidad cultural.",
                    "Porque el nazismo los odiaba precisamente por tratar de ser 'como ellos'."
                ],
                correct: 2
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
            { type: "heading", content: "Quitando el elemento judío" },
            { type: "body", content: "Casi sin excepción, las razones del antisemitismo ofrecidas por los diferentes eruditos no tienen nada que ver con el hecho de que los judíos son judíos. Estas razones \"de-judaízan\" efectivamente al antisemitismo." },
            { type: "body", content: "En su libro \"¿Por Qué los Judíos?\" Dennis Prager cita un ejemplo deslumbrante en contra de la idea de que no hay nada judío en el antisemitismo." },
            
            { type: "story", title: "Ana Frank: Diario vs Teatro", content: [
                "El 11 de abril de 1944, Ana Frank escribió en su diario:",
                "\"¿Quién nos hizo a los judíos diferentes de los otros pueblos? ¿Quién ha permitido que suframos tan terriblemente hasta ahora? Es Dios Quien nos ha hecho lo que somos, pero también es Dios Quien nos levantará de nuevo. Quién sabe – incluso puede ser nuestra religión, de la cual el mundo y todos los pueblos aprenden el bien, y por esa sola razón ahora sufrimos.\"",
                "Ana Frank identificó el antisemitismo como un odio del judaísmo. Sorprendentemente, cuando la historia de Ana Frank fue reconstruida por Lillian Hellman en una obra de teatro, sus palabras fueron cambiadas por completo. \"¿Por qué son odiados los judíos?\" pregunta Ana. \"Bueno, un día es un grupo, y al día siguiente otro…\"."
            ]},

            { type: "heading", content: "El honesto enfoque de Hitler" },
            { type: "body", content: "Un individuo que no utilizó las muchas y encubiertas explicaciones ofrecidas por los eruditos fue Adolf Hitler. Hitler reconoció abiertamente la singularidad de los judíos. Para él, los judíos no eran meros chivos expiatorios; la nación judía era su enemigo mortal." },
            { type: "body", content: "Hitler declaró: \"La batalla por la dominación del mundo será luchada entre nosotros – entre los alemanes y los judíos. Todo lo demás es fachada e ilusión\"." },
            { type: "highlight", content: "¿Por qué Hitler apuntó a los judíos?" },
            { type: "body", content: "Eliminar a los judíos era la clave para la utopía de Hitler. La ambición que lo movilizaba era liberar al mundo de las ataduras de la consciencia y de la moral, alejar al mundo del monoteísmo." },
            { type: "note", content: "La \"Juventud Hitleriana\" cantaba: \"No necesitamos la bondad cristiana. Nuestro líder es nuestro salvador. El Papa y el rabino se deben ir. Seremos paganos otra vez\"." },
            { type: "body", content: "La imagen de Hitler del mundo perfecto era un regreso a un estado de existencia salvaje, en donde \"el poder tiene la razón\". El único obstáculo serio en el camino de Hitler eran los judíos. Hitler sabía que los judíos eran los que llevaban el mensaje de un único Dios – de que todos los hombres son creados por igual, del amor por el prójimo." },
            { type: "quote", content: "La Providencia ha ordenado que yo sea el libertador más grande de la humanidad. Estoy liberando al hombre de... las sucias y degradantes auto-mortificaciones de una falsa visión conocida como conciencia y moralidad." },
            { type: "body", content: "El único objetivo real de Hitler eran los judíos, porque ellos eran todo lo que se interponía entre él y el éxito. Mientras los judíos sobrevivieran, Hitler no podría triunfar. Los arraigados conceptos judíos de Dios y moralidad habían tomado el control del mundo." },
            { type: "body", content: "Hitler dijo: \"Los Diez mandamientos han perdido su vitalidad. La conciencia es una invención judía, es un defecto, al igual que la circuncisión\"." },
            { type: "body", content: "Más aún, Hitler sabía que la amenaza judía estaba en cada judío. Dijo: \"Incluso si un pequeño niño judío sobrevive sin ninguna educación judía, sin sinagoga y sin escuela hebrea, [el judaísmo] está en su alma\"." },
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
            { type: "heading", content: "La perspectiva judía" },
            { type: "body", content: "Mucho antes de la aparición mundial de cualquier manifestación práctica de antisemitismo, la Torá hizo saber que el antisemitismo jugaría un rol integral en la historia judía." },
            { type: "body", content: "El Talmud cita el origen del antisemitismo utilizando un juego de palabras: La Torá fue recibida en el Monte Sinaí. La pronunciación hebrea de \"Sinaí\" es casi idéntica a la de \"siná\" (odio)." },
            { type: "big-question", content: "SINAÍ ≈ SINÁ (ODIO)" },
            { type: "body", content: "\"¿Por qué la Torá fue entregada en un monte llamado Sinaí?\", pregunta el Talmud. \"Porque la gran siná – el tremendo odio hacia el judío – emana del Sinaí\"." },
            { type: "body", content: "En Sinaí se les dijo a los judíos que hay un Dios, y que Él hace demandas morales. Consecuentemente, en Sinaí la nación judía se convirtió en el objeto de odio para aquellos cuya motivación principal es liberar a la humanidad de las cadenas de la consciencia y la moralidad." },
            { type: "highlight", content: "Luz para las Naciones" },
            { type: "body", content: "En Sinaí la nación judía fue designada para ser \"una luz entre las naciones\". Hay quienes aceptan esa luz, pero también están los que quieren que el mundo sea un lugar de oscuridad espiritual. Estos heraldos de oscuridad son los que atacan a los judíos por ser los traedores de luz." },
            { type: "heading", content: "La razón real" },
            { type: "body", content: "¿Por qué la gente odia este mensaje? Muchísima gente simplemente no puede luchar con la carga de \"ser buenas personas\". Atrapados en este callejón sin salida, arrojan su frustración contra los judíos, quienes personifican la consciencia colectiva." },
            { type: "quote", content: "Sigmund Freud identificó esta tendencia y explicó: \"Los judíos no son tan odiados porque mataron a Jesús, sino porque lo generaron\"." },
            { type: "body", content: "En un cierto nivel consciente, la gente reconoce que el mensaje de los judíos es verdadero. Quienes no desean aceptar la verdad han encontrado que la única forma de librarse de ella es destruyendo a los mensajeros – porque el mensaje en sí mismo es demasiado potente para ser anulado." },
            { type: "heading", content: "Una luz para las naciones" },
            { type: "body", content: "El profundo mensaje que los judíos traen a la humanidad ha sido aceptado tan globalmente que la gente tiende a darlo por sentado. Sin embargo, las ideas originadas en Sinaí literalmente han cambiado al mundo." },
            { type: "list", items: [
                "Derechos humanos básicos",
                "Cuidado del enfermo y anciano",
                "Asistencia al pobre",
                "Igualdad ante la ley",
                "La paz como ideal"
            ]},
            { type: "body", content: "En síntesis, los conceptos judíos han civilizado al mundo. John Adams, el segundo presidente de Estados Unidos, escribió: \"Insisto en que los hebreos han hecho más para civilizar al hombre que cualquier otra nación\"." },
            { type: "heading", content: "La causa es la solución" },
            { type: "body", content: "El pueblo judío ha sobrevivido porque entendieron el significado de ser judío." },
            { type: "highlight", content: "Antisemitismo + Ignorancia = Asimilación" },
            { type: "body", content: "Si entendiéramos por qué los judíos son tan odiados, podríamos entender qué son los judíos. La solución al antisemitismo es exactamente lo mismo que la causa: así como los valores y las creencias judías causan el antisemitismo, asimismo, los valores y las creencias judías finalmente lo eliminarán." },
            { type: "body", content: "Sólo cuando los judíos actúen como judíos – cuando el mensaje de ética y moralidad de la Torá sea conocido en todo el mundo – podremos tener la esperanza de vivir en un mundo donde el mal sea erradicado." },
            { type: "stamp", content: "¿POR QUÉ SER JUDÍO?" },
            { type: "body", content: "La respuesta a esta pregunta es crítica. Cuando los judíos deben vivir en una sociedad antisemita, deben tener un fuerte sentido íntimo de por qué ser judío es significativo. ¿Cuál es la mejor forma de obtener esta percepción positiva? La respuesta es obvia: con educación judía." }
        ],
        quiz: [
            {
                question: "Según el Talmud, ¿por qué la Torá fue entregada en el Monte Sinaí?",
                options: [
                    "Porque era el monte más alto.",
                    "Porque estaba cerca de Egipto.",
                    "Por el juego de palabras con 'Siná' (odio)."
                ],
                correct: 2
            }
        ]
    }
];

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
                <p className="font-body text-2xl">Has desbloqueado la siguiente sección.</p>
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
                        <p className="font-bold font-body text-2xl mb-4">{q.question}</p>
                        <div className="space-y-3">
                            {q.options.map((opt, optIndex) => (
                                <button
                                    key={optIndex}
                                    onClick={() => handleSelect(i, optIndex)}
                                    className={`w-full text-left p-4 border-2 transition-all font-medium text-xl ${
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
                <div className="mt-6 flex items-center gap-2 text-red-600 font-bold animate-pulse">
                    <XCircle />
                    Respuesta incorrecta. Intenta de nuevo.
                </div>
            )}

            <button 
                onClick={checkAnswers}
                className="mt-8 w-full bg-black text-white font-heading uppercase py-4 hover:bg-gray-800 transition-colors text-xl"
            >
                Verificar Respuesta
            </button>
        </div>
    );
};

// --- RENDERIZADO DE TEXTO DINÁMICO ---
const DynamicText = ({ item, index }) => {
    const rotation = index % 2 === 0 ? 'rotate-1' : '-rotate-1';
    const margin = index % 3 === 0 ? 'ml-0' : (index % 3 === 1 ? 'ml-2 md:ml-12' : 'ml-1 md:ml-6');

    switch (item.type) {
        case 'heading':
            return (
                <div className="py-12 clear-both">
                    <h3 className={`font-heading text-3xl md:text-5xl uppercase transform ${rotation} decoration-clone bg-black text-white inline-block px-4 py-2 shadow-lg`}>
                        {item.content}
                    </h3>
                </div>
            );
        case 'big-question':
            return (
                <div className="text-center py-24 px-4 clear-both relative z-10">
                    <h2 className="font-heading text-4xl md:text-7xl text-transparent text-stroke-black spangler-shadow bg-white inline-block px-8 py-6 transform -rotate-3 hover:scale-105 transition-transform">
                        {item.content}
                    </h2>
                </div>
            );
        case 'quote':
            return (
                <div className="py-12 clear-both">
                    <div className="pl-6 border-l-8 border-black bg-white p-8 spangler-shadow transform rotate-1 hover:-rotate-1 transition-transform">
                        <p className="font-serif text-2xl md:text-3xl italic leading-relaxed text-gray-800">
                            {item.icon && item.icon} "{item.content}"
                        </p>
                    </div>
                </div>
            );
        case 'highlight':
            return (
                <div className="py-12 text-center clear-both relative z-10">
                    <p className="font-heading text-2xl md:text-4xl leading-tight inline-block bg-yellow-300 px-6 py-4 decoration-clone shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] border-3 border-black transform rotate-2">
                        {item.content}
                    </p>
                </div>
            );
        case 'note':
            return (
                <div className="py-10 clear-both">
                    <div className="flex items-start gap-4 bg-gray-100 p-6 border-2 border-black border-dashed rounded-xl transform -rotate-1 hover:rotate-0 transition-transform">
                        <div className="min-w-[30px] mt-1 text-3xl">👉</div>
                        <p className="font-marker text-2xl text-gray-800 leading-relaxed">{item.content}</p>
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
                        <div className="font-serif text-xl md:text-2xl leading-relaxed text-gray-900 space-y-4">
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
                            <li key={i} className="bg-black text-white p-4 font-bold font-heading uppercase text-center spangler-shadow transform hover:-translate-y-1 transition-transform flex items-center justify-center text-center text-xl">
                                {li}
                            </li>
                        ))}
                    </ul>
                </div>
            );
        case 'stamp':
            return (
                <div className="py-20 text-center clear-both">
                    <div className="inline-block border-8 border-red-600 p-8 rounded-lg transform -rotate-12 mask-image text-red-600 font-heading text-3xl md:text-5xl uppercase opacity-90 mix-blend-multiply">
                        {item.content}
                    </div>
                </div>
            );
        case 'intro':
            return (
                <div className="mb-12 mt-4 clear-both">
                    <p className="text-3xl md:text-5xl font-bold font-body leading-tight border-l-8 border-black pl-6 py-2">
                        {item.content}
                    </p>
                </div>
            );
        default:
            return (
                <div className={`mb-10 ${margin} clear-both`}>
                    <p className="text-2xl font-medium font-body leading-loose text-gray-900 max-w-prose">
                        {item.content}
                    </p>
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
            
            <div className="absolute top-10 left-5 opacity-20 transform -rotate-12 pointer-events-none hidden md:block">{data.icon}</div>
            <div className="absolute bottom-20 right-5 opacity-20 transform rotate-45 pointer-events-none hidden md:block">{data.icon}</div>

            <div className={`max-w-4xl w-full relative z-10 reveal-section`}>
                <div className="mb-16 md:mb-20 text-center">
                    <div className="inline-block bg-black text-white px-4 py-1 font-heading text-sm mb-2 transform -rotate-2">
                        SECCIÓN {data.id}
                    </div>
                    <h2 className={`font-heading text-4xl md:text-7xl uppercase leading-[0.9] spangler-shadow p-6 md:p-8 ${data.color} transform rotate-1 break-words hyphens-auto`}>
                        {data.title}
                    </h2>
                </div>

                <div className="bg-white border-4 border-black p-6 md:p-16 shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] relative">
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-32 md:w-48 h-10 bg-gray-200/80 rotate-1 border border-gray-300 shadow-sm"></div>

                    <div className="space-y-2">
                        {data.text.map((item, i) => (
                            <DynamicText key={i} item={item} index={i} />
                        ))}
                    </div>

                    {data.quiz && !nextSectionUnlocked && !quizPassed && (
                        <Quiz questions={data.quiz} onComplete={() => setQuizPassed(true)} />
                    )}

                    {data.quiz && quizPassed && !nextSectionUnlocked && (
                         <div className="my-12 p-8 border-4 border-black bg-green-100 text-center animate-bounce">
                            <CheckCircle className="w-16 h-16 mx-auto mb-4 text-green-600" />
                            <h3 className="font-heading text-3xl">¡Correcto!</h3>
                            <p className="font-body text-2xl">Has desbloqueado la siguiente sección.</p>
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

                    {!onUnlock && (
                        <div className="mt-24 text-center p-8 border-t-4 border-black bg-gray-50">
                            <p className="font-heading text-xl mb-4">¡Tu viaje apenas comienza!</p>
                            <p className="font-body text-lg mb-6">Sigue descubriendo la profundidad de la sabiduría judía.</p>
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
            <div className="absolute top-10 right-10 w-32 h-32 bg-pop-cyan rounded-full border-4 border-black mix-blend-multiply animate-pulse hidden md:block"></div>
            <div className="absolute bottom-10 left-10 w-48 h-48 bg-pop-magenta transform rotate-45 border-4 border-black mix-blend-multiply opacity-80 hidden md:block"></div>
            
            <div className="relative z-10 text-center max-w-6xl w-full">
                
                <div className="mb-6 flex justify-center">
                    <div className="bg-white border-4 border-black px-6 py-2 font-marker text-lg md:text-xl transform -rotate-3 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                        SEMINARIO INTERACTIVO
                    </div>
                </div>

                <h1 className="font-heading text-[12vw] md:text-[130px] leading-[0.85] mb-8 text-white drop-shadow-[4px_4px_0_rgba(0,0,0,1)] md:drop-shadow-[8px_8px_0_rgba(0,0,0,1)] text-stroke-black tracking-tighter">
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