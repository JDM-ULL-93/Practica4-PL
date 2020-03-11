# Practica 4 - Procesadores de Lenguaje

Antes de nada, recordar inicializar nuestro raiz del proyecto con:

```bash
npm init
```
Esto nos creará un package.json y un package-lock,json que se ira añadiendo a medida que vayamos instalando dependencias.

He aprendido a usar mocha. Mocha es na herramienta para automatización de ejecución de baterias de test para NodeJS. Para empezar, deberemos instalarlo con el siguiente codigo:

```bash
​​npm​​ ​​install​​ ​​--save-dev​​ ​​--save-exact mocha@2.4.5
```

Posteriormente, para usarlo y que nos ejecute la bateria de pruebas (por defecto busca en el directorio test/ todo script que termine por .js). Hay que seguir 2 sencillos pasos, modificar y añadir lo siguiente en "package.json":

```json
 "scripts": {
    "test": "mocha --watch --reporter min &",
```

Ahora explicaremos las opciones:
1)"--watch" sirve para que se cree un proceso que estará atento a cualquier modificación de cualquier fichero .js al que pueda acceder desde raiz, para, en caso de producirse un cambio, mandar a ejecutar la bateria de pruebas en test/
2)"--report min" sirve para reducir al minimo la cantidad de información que muestra, mostrando solo el resultado final de la ejecución de cada bateria de pruebas
3)"&" Es un operador del propio bash que hace que el proceso se ejecute como un demonio, permitiendo que nuestra termnal no se bloquee y podamos seguir trabajando. Tambien podemos quitarlo y seguir trabajando desde otro terminal.

Y para ejecutar lo anterior:

```bash
npm  run test
```
Su ejecución muestra algo tal que así:

[ejecucion_mocha](img/mocha_ejecucion.PNG)


Lo siguiente ha sido aprender a usar chai. Chai es una herramienta/libreria para NodeJS usado para la creación de test siguiendo un paradigma BDD(Behaviour-Driver Development) que es muy semejante al TDD(Test Driven Development) donde primero realizamos los test(expectativas que nuestras clases futuras ejecutaran con exito)y despues realizamos el propio codigo que pasará esos tests. Para empezar a esta libreria, como siempre, lo primero, será traernos la libreria a nuestro proyecto con el siguiente comando:


```bash
npm install --save-dev​​ ​​--save-exact chai@3.5.0
```

Vamos a explicar las opciones:
1)"--save-dev" .  Guarda en 'devDependencies'
2)"--save-exact" . Descarga e instala la versión especificada despues del '@'


Su uso es bastante sencillo, tanto, que crear una expectativa es como definir en lenguaje natural las propiedades y funcionalidades que deberá cumplir nuestra futura clase, tal cual podemos ver en "test/parse-rdf-test.js":

```js
it('should parse RDF content', () => {
        const book = parseRDF(rdf);
        expect(book).to.be.an('object');
        expect(book).to.have.a.property('id',132);
        expect(book).to.have.a.property('title','The Art of War');
        expect(book).to.have.a.property('authors')
            .that.is.an('array').with.lengthOf(2)
            .and.contains('Sunzi, active 6th century B.C.')
            .and.contains('Giles, Lionel');
        expect(book).to.have.a.property('subjects')
            .that.is.an('array').with.lengthOf(2)
            .and.contains('Military art and science -- Early works to 1800')
            .and.contains('War -- Early works to 1800');
    });
```

Lo siguiente ha sido aprender a usar Cheerio, una API que permite seleccionar nodos de documentos HTML o XML usando selectores de CSS o Jquery. Nuevamente, antes de usarlo, tenemos que instalarlo:

```bash
​​npm​​ ​​install​​ ​​--save​​ ​​--save-exact​​ ​​cheerio@0.22.0
```

Su uso es bastante sencillo:

Cargamos la libreria:
```js
const​ cheerio = require(​'cheerio'​);
```

Cargamos el arbol de nodos del documento:
```js
const​ $ = cheerio.load(rdf);
```

Ahora, suponiendo el siguiente extracto de un fichero xml:

```xml
  <pgterms:agent rdf:about="2009/agents/5101">
        <pgterms:name>Giles, Lionel</pgterms:name>
        <pgterms:deathdate rdf:datatype="http://www.w3.org/2001/XMLSchema#integer">1958</pgterms:deathdate>
        <pgterms:birthdate rdf:datatype="http://www.w3.org/2001/XMLSchema#integer">1875</pgterms:birthdate>
        <pgterms:webpage rdf:resource="http://en.wikipedia.org/wiki/Lionel_Giles"/>
    </pgterms:agent>
```

Si, por ejemplo, queremos seleccionar este nodo (es decir, '1958'):
```xml
<pgterms:deathdate rdf:datatype="http://www.w3.org/2001/XMLSchema#integer">1958</pgterms:deathdate>
```
Deberiamos seleccionarlo de esta forma (esta es una forma posible, pero hay muchas más):
```js
$('pgterms\\:agent').find("pgterms\\:deathdate").toArray()[0].text()
```
Es importante recalcar que, en CSS, "<nodo>:hover|focus|..." por lo tanto, si tenemos un nodo que se llama, como en el ejemplo, "pgterms:deathdate", tenemos que escapar ':' y eso lo hacemos con '\', pero, dado que en otro lenguaje, js esta vez, ese es otro elemento reservado, tambien tenemos que volver a escaparlo, y de ahi "\\:" 