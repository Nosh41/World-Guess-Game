var hombre = new Array("___\n", "   |\n", "   O\n", "  /", "|", "\\\n", "  /", " \\\n", "___")
    var palabra
    var libreriaPalabras = new Array("b a t m a n", "s u p e r m a n", "s a n d m a n", "x m e n", "w a l k i n g d e a d", "m a t r i x", "c r i s i s", "s p i d e r m a n", "c a p t a i n a m e r i c a", "g o s t i n t h e s h e l l", "w a t c h m e n", "d a r e d e v i l", "h u l k ", "s n o o p y", "t h o r", "t h o r", "e l e k t r a", "f a n t a s t i c f o u r", "f l a s h", "t h e s i m p s o n", "f e a k a n g e l s", "t h e b o y s", "m i r a c l e m a n", "m a d m a n", "v i s i o n", "u l t i m a t e s", "d o o m p a t r o l", "w o n d e r f u l w o m a n", "s p a w n" )
    var partes = 0
    var colNueva = 0
    var jugando
    
    
    function getWord() {
       //obtiene la palabra para jugar de forma pseudoaleatoria
       var indice = Math.round ( Math.random() * 27 )
       var cadena = new String( libreriaPalabras[indice] )
       palabra = cadena.split(" ")
    }
    
    
    function Dibujahombre(visor, partes) {
       //dibuja el hombre ahorcado
       //partes indica el numero de partes a dibujar
       var dibujo = ""
       if (partes < 10)
          for(var x = 0; x < partes; x++) {
             dibujo += hombre[x]
          }
       visor.displayhombre.value = dibujo
    }
    
    
    function DibujaLetra(visor, letra) {
       //dibuja una letra de la palabra
       //posicion indica donde debe dibujar la letra
       var flag = false 
       //indica si se encontro la letra 
       //obtiene cadena actual
       var cadena = new String(visor.displayPalabra.value)
       //la separa en sus espacios
       var letrasCadena = cadena.split(" ")
       cadena = "" 
       for (var x = 0; x < palabra.length; x++) {
          if (palabra[x] == letra) {
             cadena += letra + " "
             flag = true
          } else
             cadena += letrasCadena[x] + " "
       }
       visor.displayPalabra.value = cadena
       return flag
    }
    
    
    function NuevaLetra(visor, letra) {
       //añade letra lista de letras
       visor.displayLetras.value += letra + " "
       //comprueba si ha de pasar a la siguiente fila
       if(colNueva == 3) {
          visor.displayLetras.value += "\n"
          colNueva = 0
       } else
          colNueva++
    }
    
    
    function Juega(visor, letra) {
       //comprueba si esta jugando
       if (jugando) {
          //ciclo de jugada
          //1. añade letra a la lista
          NuevaLetra(visor, letra)
          //2. dibuja la letra y comprueba si acierto
          var acierto = DibujaLetra(visor, letra)
          //3. si no acierto, dibuja hombre
          if (!acierto)
             Dibujahombre(visor, ++partes)
          //4. comprueba si fin
          if (partes == 9)
             FinJuego(false)
          else if (CompruebaPalabra(visor))
             FinJuego(true)
          } else {
             alert('Press New Game to start\nagain.')
       }
    }
    
    function IniciaJuego(visor) {
       //inicializa visor y variables globales
       jugando = true
       partes = 0
       colNueva = 0
       getWord()
       Dibujahombre(visor, partes)
       visor.displayPalabra.value = ""
       for (var x = 0; x < palabra.length; x++)
          visor.displayPalabra.value += "_ "
       visor.displayLetras.value = ""
    }
    
    function CompruebaPalabra(visor) {
       //comprueba si se completo toda la palabra
       var fin = true
       //obtiene cadena actual
       var cadena = new String(visor.displayPalabra.value)
       //la separa en sus espacios
       var letrasCadena = cadena.split(" ")
       for(var x = 0; x < letrasCadena.length; x++)
          if (letrasCadena[x] == "_")
             fin = false
       return fin
    }
    
    
    function FinJuego(resultado) {
       //indica que si se ha perdido o ganado
       var solucion = ""
       jugando = false 
       if (resultado) {
          document.visor.ganadas.value++
          alert("You got it !")
       } else {
         document.visor.perdidas.value++
         //construye la palabra solucion
         for (var x = 0; x < palabra.length; x++)
            solucion += palabra[x]
         alert("You are dead !\n Correct word is: " + solucion)
       }
    }