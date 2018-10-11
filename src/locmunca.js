import React, { Component } from 'react';
import PropTypes from 'prop-types'
class Locmunca extends Component {
 static propTypes = {
    select: PropTypes.array.isRequired
  
  }
  render() {
 	const {select} = this.props
 	
    return (



			<section className="main-container gray-bg">

				
				<div className="main">

					<div className="container">
						<div className="row">
							<div className="col-md-12">							
							
							<div className="isotope-container row grid-space-20">
								{select								
						        .map(lmvs =>
								<div key={lmvs.id} className={`${lmvs.judet} ${lmvs.luna} col-sm-4 isotope-item margin-bottom-clear`}>
				                  <div className="box-style-1 white-bg">
				                    <div className="overlay-container">
				                      <img src={lmvs.img} alt=""/>
				                      <a href="portfolio-item.html" className="overlay small">
				                        <i className="fa fa-plus"></i>
				                        <span>{lmvs.locDeMuncaVacant}</span>
				                      </a>
				                    </div>
				                    <h3><a href="portfolio-item.html">{lmvs.angajator}</a></h3>
				                    <p>{lmvs.locDeMuncaVacant}</p>
				                    <a href="portfolio-item.html" className="btn btn-default">Detalii</a>
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
    export default Locmunca;