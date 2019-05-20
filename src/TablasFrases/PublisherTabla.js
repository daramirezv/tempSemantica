import React, { Component } from "react";
import '../App.css';

class PublisherTabla extends Component {

    constructor(props) {
        super(props);
        this.state = { mostrar: true }
        this.generarTabla = this.generarTabla.bind(this);
        this.ocultarTabla = this.ocultarTabla.bind(this);
        this.myRef = React.createRef();
    }

    ocultarTabla() {
        if (this.state.mostrar) {
            const node = this.myRef.current;
            node.innerHTML = "Ver tabla";
            this.setState({ mostrar: false });
        }
        else {
            const node = this.myRef.current;
            node.innerHTML = "Ocultar tabla";
            this.setState({ mostrar: true });
        }
    }

    generarTabla() {
        let articulos = this.props.elementos;

        return articulos.map((elemento) => {
            return (
                <tr key={elemento[0]}>
                    <td>{elemento[0]}</td>
                    <td>{elemento[1]}</td>
                </tr>
            );
        });
    }

    render() {
        return (
            <div className="container-fluid">
                <h3 className="infoInicial">Publicadores Encontrados</h3>
                <button type="button" ref={this.myRef} onClick={this.ocultarTabla} className="btn btn-primary botonTabla">Ocultar Tabla</button>
                {this.state.mostrar ?
                    <table className="table">
                        <thead className="thead-dark">
                            <tr>
                                <th scope="col">Resource</th>
                                <th scope="col">Nombre</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.generarTabla()}
                        </tbody>
                    </table> : ''}
            </div>
        );
    }
}
export default PublisherTabla;