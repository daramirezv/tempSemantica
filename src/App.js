import React, { Component } from "react";
import './App.css';
import pos from 'pos';
import ArticuloTabla from "./TablasFrases/ArticuloTabla";
import AutorTabla from "./TablasFrases/AutorTabla";
import ConferenceTabla from "./TablasFrases/ConferenceTabla";
import InstitucionTabla from "./TablasFrases/InstitucionTabla";
import PublisherTabla from "./TablasFrases/PublisherTabla";
import CiudadTabla from "./TablasFrases/CiudadTabla";
import JournalTabla from "./TablasFrases/JournalTabla";
import PaisTabla from "./TablasFrases/PaisTabla";
import TopicTabla from "./TablasFrases/TopicTabla";

//https://www.npmjs.com/package/pos

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      mostrar: false, mensaje: "",
      estadoArticulos: [], estadoAutor: [],
      estadoCiudad: [], estadoConferencia: [],
      estadoInstitucion: [], estadoJournal: [],
      estadoPais: [], estadoPublisher: [], estadoTopic: []
    }

    this.inputOracion = React.createRef();
    this.buscarOracion = this.buscarOracion.bind(this);
    this.metodoArticulo = this.metodoArticulo.bind(this);
    this.metodoAutores = this.metodoAutores.bind(this);
    this.metodoCiudades = this.metodoCiudades.bind(this);
    this.metodoConferencias = this.metodoConferencias.bind(this);
    this.metodoInstituciones = this.metodoInstituciones.bind(this);
    this.metodoJournals = this.metodoJournals.bind(this);
    this.metodoPaises = this.metodoPaises.bind(this);
    this.metodoPublishers = this.metodoPublishers.bind(this);
    this.metodoTopicos = this.metodoTopicos.bind(this);

  }

  metodoArticulo(palabra) {
    //ARTICULO
    //FALTA PREFIJO
    var consultaArticulo = "SELECT DISTINCT ?resource ?title ?volume ?url ?number ?year ?authors ?city ?country ?conference ?topic ?publisher where {\n";
    consultaArticulo += "?resource rdf:type PRE:Article .\n"
    consultaArticulo += "FILTER contains(?resource,\"" + palabra + "\")\n";
    consultaArticulo += "OPTIONAL { ?resource PRE:author ?title }\n";
    consultaArticulo += "OPTIONAL { ?resource PRE:volume ?volume }\n";
    consultaArticulo += "OPTIONAL { ?resource PRE:url ?url }\n";
    consultaArticulo += "OPTIONAL { ?resource PRE:number ?number }\n";
    consultaArticulo += "OPTIONAL { ?resource PRE:year ?year }\n";
    consultaArticulo += "OPTIONAL { ?resource PRE:writtenBy ?authors }\n";
    consultaArticulo += "OPTIONAL { ?resource PRE:publishedInCity ?city }\n";
    consultaArticulo += "OPTIONAL { ?resource PRE:publishedInCountry ?country }\n";
    consultaArticulo += "OPTIONAL { ?resource PRE:presentedIn ?conference }\n";
    consultaArticulo += "OPTIONAL { ?resource PRE:hasTopic ?topic }\n";
    consultaArticulo += "OPTIONAL { ?resource PRE:publishedBy ?publisher }\n";

    return [];
  }

  metodoAutores(palabra) {
    //AUTOR
    //FALTA PREFIJO no esta wrote
    var consultaAutor = "SELECT DISTINCT ?resource ?coautor ?nombre where {\n";
    consultaAutor += "?resource rdf:type PRE:Author .\n"
    consultaAutor += "FILTER contains(?resource,\"" + palabra + "\")\n";
    consultaAutor += "OPTIONAL { ?resource PRE:fullName ?nombre }\n";
    consultaAutor += "OPTIONAL { ?resource PRE:coauthorWith ?coautor }\n";

    return [];
  }

  metodoCiudades(palabra) {
    //CIUDAD
    //FALTA PREFIJO
    var consultaCiudad = "SELECT DISTINCT ?resource ?pais ?nombre where {\n";
    consultaCiudad += "?resource rdf:type PRE:City .\n"
    consultaCiudad += "FILTER contains(?resource,\"" + palabra + "\")\n";
    consultaCiudad += "OPTIONAL { ?resource PRE:cityName ?nombre }\n";
    consultaCiudad += "OPTIONAL { ?resource PRE:locatedIn ?pais }\n";

    return [];
  }

  metodoConferencias(palabra) {
    //CONFERENCE
    //FALTA PREFIJO no esta presentedIn
    var consultaConference = "SELECT DISTINCT ?resource ?nombre where {\n";
    consultaConference += "?resource rdf:type PRE:Conference .\n"
    consultaConference += "FILTER contains(?resource,\"" + palabra + "\")\n";
    consultaConference += "OPTIONAL { ?resource PRE:conferenceName ?nombre }\n";

    return [];
  }

  metodoInstituciones(palabra) {
    //INSTITUCION
    //FALTA PREFIJO no esta publishedAnArticle
    var consultaInstitucion = "SELECT DISTINCT ?resource ?nombre where {\n";
    consultaInstitucion += "?resource rdf:type PRE:Institution .\n"
    consultaInstitucion += "FILTER contains(?resource,\"" + palabra + "\")\n";
    consultaInstitucion += "OPTIONAL { ?resource PRE:publisherName ?nombre }\n";

    return [];
  }

  metodoJournals(palabra) {
    //JOURNAL
    //FALTA PREFIJO no esta publishedAnArticle
    var consultaJournal = "SELECT DISTINCT ?resource ?nombre where {\n";
    consultaJournal += "?resource rdf:type PRE:Journal .\n"
    consultaJournal += "FILTER contains(?resource,\"" + palabra + "\")\n";
    consultaJournal += "OPTIONAL { ?resource PRE:publisherName ?nombre }\n";

    return [];
  }

  metodoPaises(palabra) {
    //PAIS
    //FALTA PREFIJO y no existe hasCity
    var consultaPais = "SELECT DISTINCT ?resource ?nombre where {\n";
    consultaPais += "?resource rdf:type PRE:Country .\n"
    consultaPais += "FILTER contains(?resource,\"" + palabra + "\")\n";
    consultaPais += "OPTIONAL { ?resource PRE:countryName ?nombre }\n";

    return [];
  }

  metodoPublishers(palabra) {
    //PUBLISHER GENERAL
    //FALTA PREFIJO no esta publishedAnArticle
    var consultaPublisher = "SELECT DISTINCT ?resource ?nombre where {\n";
    consultaPublisher += "?resource rdf:type PRE:Publisher .\n"
    consultaPublisher += "FILTER contains(?resource,\"" + palabra + "\")\n";
    consultaPublisher += "OPTIONAL { ?resource PRE:publisherName ?nombre }\n";

    return [];
  }

  metodoTopicos(palabra) {
    //TOPIC
    //FALTA PREFIJO no esta istopicof
    var consultaTopic = "SELECT DISTINCT ?resource where {\n";
    consultaTopic += "?resource rdf:type PRE:Topic .\n"
    consultaTopic += "FILTER contains(?resource,\"" + palabra + "\")\n";

    return [];
  }


  buscarOracion() {

    const node = this.inputOracion.current;

    if (node.value !== "" && node.value !== this.state.mensaje) {
      var words = new pos.Lexer().lex(node.value);
      var tagger = new pos.Tagger();
      var taggedWords = tagger.tag(words);

      console.log(taggedWords);

      var respuestaArticulos = [];
      var respuestaAutores = [];
      var respuestaCiudades = [];
      var respuestaConferencias = [];
      var respuestaInstituciones = [];
      var respuestaJournals = [];
      var respuestaPaises = [];
      var respuestaPublishers = [];
      var respuestaTopicos = [];

      taggedWords.map((objeto) => {

        //NN NNP NNPS NNS VB VBD VBG VBN VBP VBZ RB RBR RBS JJ JJR JJS 
        if (objeto[1] === "NN" || objeto[1] === "NNP" || objeto[1] === "NNPS" || objeto[1] === "NNS") {
          var arregloArticulos = this.metodoArticulo(objeto[0]);
          arregloArticulos.map((x) => { respuestaArticulos.push(x) })

          var arregloAutores = this.metodoAutores(objeto[0]);
          arregloAutores.map((x) => { respuestaAutores.push(x) })

          var arregloCiudades = this.metodoCiudades(objeto[0]);
          arregloCiudades.map((x) => { respuestaCiudades.push(x) })

          var arregloConferencias = this.metodoConferencias(objeto[0]);
          arregloConferencias.map((x) => { respuestaConferencias.push(x) })

          var arregloInstituciones = this.metodoInstituciones(objeto[0]);
          arregloInstituciones.map((x) => { respuestaInstituciones.push(x) })

          var arregloJournals = this.metodoJournals(objeto[0]);
          arregloJournals.map((x) => { respuestaJournals.push(x) })

          var arregloPaises = this.metodoPaises(objeto[0]);
          arregloPaises.map((x) => { respuestaPaises.push(x) })

          var arregloPublishers = this.metodoPublishers(objeto[0]);
          arregloPublishers.map((x) => { respuestaPublishers.push(x) })

          var arregloTopicos = this.metodoTopicos(objeto[0]);
          arregloTopicos.map((x) => { respuestaTopicos.push(x) })
        }
      });
      this.setState({
        mensaje: node.value, mostrar: true,
        estadoArticulos: respuestaArticulos, estadoAutor: respuestaAutores,
        estadoCiudad: respuestaCiudades, estadoConferencia: respuestaConferencias,
        estadoInstitucion: respuestaInstituciones, estadoJournal: respuestaJournals,
        estadoPais: respuestaPaises, estadoPublisher: respuestaPublishers, estadoTopic: respuestaTopicos
      });
    }
  }

  render() {
    return (
      <div>
        <div className="container-fluid" id="buscadorFrase">
          <div className="input-group">
            <div className="input-group-prepend">
              <span className="input-group-text" id="inputGroup-sizing-lg">Buscador por frase</span>
            </div>
            <input type="text" ref={this.inputOracion} className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-lg" />
            <div className="input-group-append">
              <button className="btn btn-primary" onClick={this.buscarOracion} type="button" id="button-addon2">Buscar</button>
            </div>
          </div>
        </div>

        {this.state.mostrar ?

          <div>
            <div className="row">
              <div className="col-sm">
                <ArticuloTabla elementos={this.state.estadoArticulos} />
              </div>
            </div>

            <div className="row">
              <div className="col-sm">
                <AutorTabla elementos={this.state.estadoAutor} />
              </div>
            </div>

            <div className="row">
              <div className="col-sm">
                <CiudadTabla elementos={this.state.estadoCiudad} />
              </div>
            </div>

            <div className="row">
              <div className="col-sm">
                <ConferenceTabla elementos={this.state.estadoConferencia} />
              </div>
            </div>

            <div className="row">
              <div className="col-sm">
                <InstitucionTabla elementos={this.state.estadoInstitucion} />
              </div>
            </div>

            <div className="row">
              <div className="col-sm">
                <JournalTabla elementos={this.state.estadoJournal} />
              </div>
            </div>

            <div className="row">
              <div className="col-sm">
                <PaisTabla elementos={this.state.estadoPais} />
              </div>
            </div>

            <div className="row">
              <div className="col-sm">
                <PublisherTabla elementos={this.state.estadoPublisher} />
              </div>
            </div>

            <div className="row">
              <div className="col-sm">
                <TopicTabla elementos={this.state.estadoTopic} />
              </div>
            </div>
          </div>

          : ''}
      </div>
    );
  }
}
export default App;