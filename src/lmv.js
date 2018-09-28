
import React, { Component } from 'react';

class Lmv extends Component {

 render() {
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
								</ul>
							</div>
							
							<div className="isotope-container row grid-space-20">
								<div className="col-sm-4 isotope-item gorj iulie margin-bottom-clear">
									<div className="box-style-1 white-bg">
										<div className="overlay-container">
											<img src="images/portfolio-1.jpg" alt=""/>
											<a href="portfolio-item.html" className="overlay small">
												<i className="fa fa-plus"></i>
												<span>Gorj</span>
												<span>Iulie 2018</span>
											</a>
										</div>
										<h3><a href="portfolio-item.html">Project Title</a></h3>
										<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
										<a href="portfolio-item.html" className="btn btn-default">Read More</a>
									</div>
								</div>
								<div className="col-sm-4 isotope-item dolj margin-bottom-clear">
									<div className="box-style-1 white-bg">
										<div className="overlay-container">
											<img src="images/portfolio-2.jpg" alt=""/>
											<a href="portfolio-item.html" className="overlay small">
												<i className="fa fa-plus"></i>
												<span>Dolj</span>
											</a>
										</div>
										<h3><a href="portfolio-item.html">Project Title</a></h3>
										<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
										<a href="portfolio-item.html" className="btn btn-default">Read More</a>
									</div>
								</div>
								<div className="col-sm-4 isotope-item gorj margin-bottom-clear">
									<div className="box-style-1 white-bg">
										<div className="overlay-container">
											<img src="images/portfolio-3.jpg" alt=""/>
											<a href="portfolio-item.html" className="overlay small">
												<i className="fa fa-plus"></i>
												<span>Gorj</span>
											</a>
										</div>
										<h3><a href="portfolio-item.html">Project Title</a></h3>
										<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
										<a href="portfolio-item.html" className="btn btn-default">Read More</a>
									</div>
								</div>
								<div className="col-sm-4 isotope-item site-building margin-bottom-clear">
									<div className="box-style-1 white-bg">
										<div className="overlay-container">
											<img src="images/portfolio-4.jpg" alt=""/>
											<a href="portfolio-item.html" className="overlay small">
												<i className="fa fa-plus"></i>
												<span>Site Building</span>
											</a>
										</div>
										<h3><a href="portfolio-item.html">Project Title</a></h3>
										<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
										<a href="portfolio-item.html" className="btn btn-default">Read More</a>
									</div>
								</div>
								<div className="col-sm-4 isotope-item dolj margin-bottom-clear">
									<div className="box-style-1 white-bg">
										<div className="overlay-container">
											<img src="images/portfolio-5.jpg" alt=""/>
											<a href="portfolio-item.html" className="overlay small">
												<i className="fa fa-plus"></i>
												<span>Dolj</span>
											</a>
										</div>
										<h3><a href="portfolio-item.html">Project Title</a></h3>
										<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
										<a href="portfolio-item.html" className="btn btn-default">Read More</a>
									</div>
								</div>
								<div className="col-sm-4 isotope-item gorj margin-bottom-clear">
									<div className="box-style-1 white-bg">
										<div className="overlay-container">
											<img src="images/portfolio-6.jpg" alt=""/>
											<a href="portfolio-item.html" className="overlay small">
												<i className="fa fa-plus"></i>
												<span>Gorj</span>
											</a>
										</div>
										<h3><a href="portfolio-item.html">Project Title</a></h3>
										<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
										<a href="portfolio-item.html" className="btn btn-default">Read More</a>
									</div>
								</div>
							</div>
							
								
							</div>
						</div>
					</div>
				</div>
			

			</section>
			
		)} 
}
    export default Lmv;