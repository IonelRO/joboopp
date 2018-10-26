import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

// This example shows how to render two different screens
// (or the same screen in a different context) at the same url,
// depending on how you got there.
//
// Click the colors and see them full screen, then "visit the
// gallery" and click on the colors. Note the URL and the component
// are the same as before but now we see them inside a modal
// on top of the old screen.

class ModalSwitch extends React.Component {
  // We can pass a location to <Switch/> that will tell it to
  // ignore the router's current location and use the location
  // prop instead.
  //
  // We can also use "location state" to tell the app the user
  // wants to go to `/img/2` in a modal, rather than as the
  // main page, keeping the gallery visible behind it.
  //
  // Normally, `/img/2` wouldn't match the gallery at `/`.
  // So, to get both screens to render, we can save the old
  // location and pass it to Switch, so it will think the location
  // is still `/` even though its `/img/2`.
  previousLocation = this.props.location;

  componentWillUpdate(nextProps) {
    let { location } = this.props;

    // set previousLocation if props.location is not modal
    if (
      nextProps.history.action !== "POP" &&
      (!location.state || !location.state.modal)
    ) {
      this.previousLocation = this.props.location;
    }
  }

  render() {
    let { location } = this.props;

    let isModal = !!(
      location.state &&
      location.state.modal &&
      this.previousLocation !== location
    ); // not initial render

    return (
      <div>
        <Switch location={isModal ? this.previousLocation : location}>
          <Route exact path="/" component={Home} />
          <Route path="/gallery" component={Gallery} />
          <Route path="/img/:id" component={ImageView} />
        </Switch>
        {isModal ? <Route path="/img/:id" component={Modal} /> : null}
      </div>
    );
  }
}

const IMAGES = [
  {id:'1', judet: 'gorj', luna: 'iulie', img: 'images/tehnoinstal.jpg', angajator: 'SC TEHNOINSTAL SRL',
     adresa: 'Str.1 Decembrie 1918,Tg-Jiu,Gor', locDeMuncaVacant: 'MECANIC UTILAJ',
     conditiiDeOcupare: 'LICEU', nrLocuri: '1', telefon:  '0786409053', email: 'scopi@apsg.eu'
      },
      {id:'2', judet: 'gorj', luna: 'iulie', img: 'images/angajari.jpg', angajator: 'SC GIMICRISPAU GRUP SRL',
      adresa: 'Tg-Jiu,Gorj', locDeMuncaVacant: 'LUCRATOR GESTIONAR',
      conditiiDeOcupare: 'LICEU', nrLocuri: '1', telefon:  '0744561096', email: 'scopi@apsg.eu'
      },
      {id:'3', judet: 'gorj', luna: 'iulie', img: 'images/angajari.jpg', angajator: 'RADU S 81 SRL',
      adresa: 'Str Gen.Magheru,Tg-Jiu,jud.Gorj', locDeMuncaVacant: 'LUCRATOR GESTIONAR',
      conditiiDeOcupare: 'LICEU', nrLocuri: '1', telefon:  '0765451836', email: 'scopi@apsg.eu'
      },
      {id:'4', judet: 'gorj', luna: 'iulie', img: 'images/succes.jpg', angajator: 'SC SUCCES NIC COM SRL',
      adresa: 'Voluntari,str.Bucegi nr.1,Ilfov,loc munca Tg-Jiu', locDeMuncaVacant: 'OSPATAR',
      conditiiDeOcupare: 'LICEU', nrLocuri: '10', telefon:  '0752181000', email: 'scopi@apsg.eu'
      },
      {id:'5', judet: 'gorj', luna: 'iulie', img: 'images/succes.jpg', angajator: 'SC SUCCES NIC COM SRL',
      adresa: 'Voluntari,str.Bucegi nr.1,Ilfov,loc munca Tg-Jiu', locDeMuncaVacant: 'LUCRATOR COMRCIAL',
      conditiiDeOcupare: 'LICEU', nrLocuri: '10', telefon:  '0752181000', email: 'scopi@apsg.eu'
      }
];

function Thumbnail({ color }) {
  return (
    <div
      style={{
        width: 50,
        height: 50,
        background: color
      }}
    />
  );
}

function Image({ color }) {
  return (
    <div
      style={{
        width: "100%",
        height: 400,
        background: color
      }}
    />
  );
}

function Home() {
  return (
    <section className="gray-bg">

        
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
                  <li><a href="" data-filter=".septembrie">Septembrie 2018</a></li>
                </ul>

              </div>
              
              <div className="isotope-container row grid-space-20">
                {IMAGES
                    .filter(function(lmvs, index) {
                      return lmvs.judet !== "";
                    })
                    .map(lmvs =>
                <div key={lmvs.id} className={`${lmvs.judet} ${lmvs.luna} col-sm-4 isotope-item margin-bottom-clear`}>
                          <div className="box-style-1 white-bg">
                            <div className="overlay-container">
                              <img src={lmvs.img} alt=""/>
                              <a href={`/img/${lmvs.id}`} className="overlay small">
                                <i className="fa fa-plus"></i>
                                <span>{lmvs.locDeMuncaVacant}</span>
                              </a>
                            </div>
                            <h3><a href={`/img/${lmvs.id}`}>{lmvs.angajator}</a></h3>
                            <p>{lmvs.locDeMuncaVacant}</p>
                            
                             <button  className="btn btn-default">
                            <Link to={`/img/${lmvs.id}`} style={{color: 'white'}}>Detalii</Link>  
                          </button>                        
                          </div>
                        </div>
                    )} 
                </div>
      
              </div>
            </div>
          </div>    </div>      

      </section>
  );
}

function Gallery() {
  return (
    <div>
      {IMAGES.map(i => (
        <Link
          key={i.id}
          to={{
            pathname: `/img/${i.id}`,
            // this is the trick!
            state: { modal: true }
          }}
        >
          <Thumbnail color={i.color} />
          <p>{i.title}</p>
        </Link>
      ))}
    </div>
  );
}

function ImageView({ match }) {
  let image = IMAGES[parseInt(match.params.id, 10)];

  if (!image) return <div>Image not found</div>;

  return (
   <section className="gray-bg">
   <div className="main">
      <h1>{image.locDeMuncaVacant}</h1>

    </div>
  </section>
  );
}

function Modal({ match, history }) {
  let image = IMAGES[parseInt(match.params.id, 10)];

  if (!image) return null;

  let back = e => {
    e.stopPropagation();
    history.goBack();
  };

  return (
    <div
      onClick={back}
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        background: "rgba(0, 0, 0, 0.15)"
      }}
    >
      <div
        className="modal"
        style={{
          position: "absolute",
          background: "#fff",
          top: 25,
          left: "10%",
          right: "10%",
          padding: 15,
          border: "2px solid #444"
        }}
      >
        <h1>{image.title}</h1>
        <Image color={image.color} />
        <button type="button" onClick={back}>
          Close
        </button>
      </div>
    </div>
  );
}

function ModalGallery() {
  return (
    <Router>
      <Route component={ModalSwitch} />
    </Router>
  );
}

export default ModalGallery;