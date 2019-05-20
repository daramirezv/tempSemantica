import React, { Component } from "react";
import '../App.css';

class ArticuloTabla extends Component {

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
                    <td>{elemento[2]}</td>
                    <td>{elemento[3]}</td>
                    <td>{elemento[4]}</td>
                    <td>{elemento[5]}</td>
                    <td>{elemento[6]}</td>
                    <td>{elemento[7]}</td>
                    <td>{elemento[8]}</td>
                    <td>{elemento[9]}</td>
                    <td>{elemento[10]}</td>
                    <td>{elemento[11]}</td>
                </tr>
            );
        });
    }

    render() {
        return (
            <div className="container-fluid">
                <h3 className="infoInicial">Articulos Encontrados</h3>
                <button type="button" ref={this.myRef} onClick={this.ocultarTabla} className="btn btn-primary botonTabla">Ocultar Tabla</button>
                {this.state.mostrar ?
                    <table className="table">
                        <thead className="thead-dark">
                            <tr>
                                <th scope="col">Resource</th>
                                <th scope="col">Title</th>
                                <th scope="col">Volume</th>
                                <th scope="col">Url</th>
                                <th scope="col">Year</th>
                                <th scope="col">Author</th>
                                <th scope="col">City</th>
                                <th scope="col">Country</th>
                                <th scope="col">Conference</th>
                                <th scope="col">Topic</th>
                                <th scope="col">Publisher</th>
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
export default ArticuloTabla;