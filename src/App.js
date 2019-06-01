import React, { Component } from 'react';
import './App.css';
import { Button } from 'reactstrap'
import Header from './components/header/header';
import axios from 'axios'
import { Alert } from 'reactstrap'


class App extends Component{
  constructor(props){
    super(props)
    this.state = {
      novoPost: {},
      novosDados: {}
    }
  }

  componentWillMount(){
    const id = window.location.pathname
    if(id !== "/"){
      axios.get(`https://enc-it.herokuapp.com/api/encurtador/get${id}`).then(res => {
        window.location.replace(res.data.urlOriginal)
      })
      .catch(erro => console.log('Erro --> ', erro))
    }
  }

  handleSearch = (e) => {
    const value = e.target.value
    this.setState({
      novoPost: {
        urlOriginal: value,
        apelidoCustom: ''
      }
    })
  }

  criaNovaUrl = () => {
    axios.post('https://enc-it.herokuapp.com/api/encurtador', this.state.novoPost).then(res => {
      this.setState({
        novosDados: {
          urlOriginal: res.data.urlOriginal,
          urlEncurtada: res.data.urlEncurtada
        }
      })
    })
    .catch(erro => console.log('Erro --> ', erro))
  }


  render(){
    const dados = this.state.novosDados
    return (
      <div className="App">
        <Header/>
        <section className="form">
          <h1>Encurtador de URL</h1>
          <input type="text" name="urlOriginal" onInput={this.handleSearch} placeholder="Digite ou cole sua URL aqui..."/>
          <Button onClick={this.criaNovaUrl} color="success">Encurtar!</Button>
          {dados.urlEncurtada && <Alert color="success">
            { `Parabéns, aqui está sua URL encurtada: `}<a href={`https://${dados.urlEncurtada}`}>{dados.urlEncurtada}</a>
          </Alert>}
        </section>
      </div>
    );
  }
}

export default App;
