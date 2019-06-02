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
      novosDados: {},
      loading: false
    }
  }

  componentWillMount(){
    debugger
    const id = window.location.pathname
    if(id === "/"){
      return
    }
    axios.get(`https://enc-it.herokuapp.com/api/encurtador/get${id}`).then(res => {
    debugger
      window.location.href = res.data.urlOriginal
    })
    .catch(erro => console.log('Erro --> ', erro))
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
    this.setState({
      loading: true
    })
    debugger
    axios.post('https://enc-it.herokuapp.com/api/encurtador', this.state.novoPost).then(res => {
      this.setState({
        novosDados: {
          urlOriginal: res.data.urlOriginal,
          urlEncurtada: res.data.urlEncurtada
        },
        loading: false
      })
    })
    .catch(erro => console.log('Erro --> ', erro))
  }


  render(){
    const dados = this.state.novosDados
    const loading = this.state.loading
    return (
      <div className="App">
        {loading && <section className="loading">
          <div class="sk-folding-cube">
            <div class="sk-cube1 sk-cube"></div>
            <div class="sk-cube2 sk-cube"></div>
            <div class="sk-cube4 sk-cube"></div>
            <div class="sk-cube3 sk-cube"></div>
          </div>
          <h5>Estamos empacotando sua URL...</h5>
        </section>}
        <Header/>
        <section className="form">
          <h1>Encurtador de URL</h1>
          <div className="input-wrapper">
            <input type="text" name="urlOriginal" onInput={this.handleSearch} placeholder="Cole ou digite sua URL aqui..."/>
            <Button onClick={this.criaNovaUrl} color="success">Encurtar!</Button>
          </div>
          {dados.urlEncurtada &&
            <Alert color="success">
            <p>{ `Aqui está sua URL encurtada: `}<a href={`https://${dados.urlEncurtada}`}><strong>{dados.urlEncurtada}</strong></a></p>
          </Alert>}
        </section>
        <footer>
          <h5>&copy; Antonio Carlos 2019 - Todos os direitos reservados</h5>
        </footer>
      </div>
    );
  }
}

export default App;
