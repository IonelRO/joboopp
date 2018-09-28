import React, { Component } from 'react';
import Header from './header.js'


import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { items: [] };
    this.state = { super: [
    {id:'1', judet: 'gorj', luna: 'iulie', img: 'images/portfolio-1.jpg', angajator: 'SC TEHNOINSTAL SRL',
     adresa: 'Str.1 Decembrie 1918,Tg-Jiu,Gor', locDeMuncaVacant: 'MECANIC UTILAJ',
     conditiiDeOcupare: 'LICEU', nrLocuri: '1', telefon:  '0786409053', email: 'scopi@apsg.eu'
      },
      {id:'2', judet: 'gorj', luna: 'iulie', img: 'images/portfolio-1.jpg', angajator: 'RADU S 81 SRL',
      adresa: 'Str Gen.Magheru,Tg-Jiu,jud.Gorj', locDeMuncaVacant: 'LUCRATOR GESTIONAR',
      conditiiDeOcupare: 'LICEU', nrLocuri: '1', telefon:  '0765451836', email: 'scopi@apsg.eu'
      },
    ] };
  }

 
  render() {
    return (
      <div className="App">
        <Header/>
        
         {this.state.super.map(lmv =>
       
         <div key={lmv.id} className="col-sm-4 isotope-item {lmv.judet} {lmv.luna} iulie margin-bottom-clear">
                  <div className="box-style-1 white-bg">
                    <div className="overlay-container">
                      <img src="{lmv.img}" alt=""/>
                      <a href="portfolio-item.html" className="overlay small">
                        <i className="fa fa-plus"></i>
                        <span>{lmv.locDeMuncaVacant}</span>
                      </a>
                    </div>
                    <h3><a href="portfolio-item.html">{lmv.angajator}</a></h3>
                    <p>{lmv.locDeMuncaVacant}</p>
                    <a href="portfolio-item.html" className="btn btn-default">Read More</a>
                  </div>
                </div>
        )} 
      </div>
    );
  }
}

export default App;
