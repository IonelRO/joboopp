
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link  } from 'react-router-dom';
class Lmv extends Component {
 static propTypes = {
    locuri: PropTypes.array.isRequired,
    onLocClick: PropTypes.func.isRequired
 }
   
 render() {
 	const {locuri} = this.props
 	 const { onLocClick } = this.props
    return (

			<section className="main-container gray-bg">

				
				<div className="main">

					<div className="container">
						<div className="row">
							<div className="col-md-12">
								<h1 className="text-center title">Ultimele locuri de munca adaugate</h1>
								<div className="separator"></div>
								
							<div className="filters margin-bottom-clear">
								<ul className="nav nav-pills">
									<li className="active"><a href="" data-filter="*">Toate</a></li>
									<li><a href="" data-filter=".gorj">Gorj</a></li>
									<li><a href="" data-filter=".dolj">Dolj</a></li>
									<li><a href="" data-filter=".iulie">Iulie 2018</a></li>
									<li><a href="" data-filter=".august">August 2018</a></li>
								</ul>

							</div>
							
							<div className="isotope-container row grid-space-20">
								{locuri
						        .filter(function(lmvs, index) {
						          return lmvs.judet !== "";
						        })
						        .map(lmvs =>
								<div key={lmvs.id} className={`${lmvs.judet} ${lmvs.luna} col-sm-4 isotope-item margin-bottom-clear`}>
				                  <div className="box-style-1 white-bg">
				                    <div className="overlay-container">
				                      <img src={lmvs.img} alt=""/>
				                      <a href="/locvacant" className="overlay small">
				                        <i className="fa fa-plus"></i>
				                        <span>{lmvs.locDeMuncaVacant}</span>
				                      </a>
				                    </div>
				                    <h3><a href="/locvacant">{lmvs.angajator}</a></h3>
				                    <p>{lmvs.locDeMuncaVacant}</p>
				                    
				                     <button onClick={() => onLocClick(lmvs)} className="btn btn-default">
                						<Link to={`/locvacant/${lmvs.id}`} style={{color: 'white'}}>Detalii</Link>	
              						</button>			                   
				                  </div>
				                </div>
       						 	)} 
								</div>
			
							</div>
						</div>
					</div>
				</div>
			

			</section>
			
		)} 
}
    export default Lmv;