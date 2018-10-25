import React from "react";
import PropTypes from 'prop-types';
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
  
   static propTypes = {
    locuri: PropTypes.array.isRequired,
    onLocClick: PropTypes.func.isRequired
 }
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
  selectLvms = (lmvs) => {
    this.setState((state) => ({
      super: state.super.filter((c) => c.id === lmvs.id),
      locselectat: state.super.filter((c) => c.id === lmvs.id)
    }))
    
    }
  render() {

    let { location } = this.props;
    let isModal = !!(
      location.state &&
      location.state.modal &&
      this.previousLocation !== location);
   
    

    const { onLocClick } = this.props;

     // not initial render

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
  { id: 0, title: "Dark Orchid", color: "DarkOrchid" },
  { id: 1, title: "Lime Green", color: "LimeGreen" },
  { id: 2, title: "Tomato", color: "Tomato" },
  { id: 3, title: "Seven Ate Nine", color: "#789" },
  { id: 4, title: "Crimson", color: "Crimson" }
];
const locuri = [
    {id:'1', judet: 'gorj', luna: 'iulie', img: 'images/tehnoinstal.jpg', angajator: 'SC TEHNOINSTAL SRL',
     adresa: 'Str.1 Decembrie 1918,Tg-Jiu,Gor', locDeMuncaVacant: 'MECANIC UTILAJ',
     conditiiDeOcupare: 'LICEU', nrLocuri: '1', telefon:  '0786409053', email: 'scopi@apsg.eu'
      },
      {id:'2', judet: 'gorj', luna: 'iulie', img: 'images/angajari.jpg', angajator: 'SC GIMICRISPAU GRUP SRL',
      adresa: 'Tg-Jiu,Gorj', locDeMuncaVacant: 'LUCRATOR GESTIONAR',
      conditiiDeOcupare: 'LICEU', nrLocuri: '1', telefon:  '0744561096', email: 'scopi@apsg.eu'
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
    <div>
      <Link to="/gallery">Visit the Gallery</Link>
      <h2>Featured Images</h2>
      <div className="isotope-container row grid-space-20">
                {locuri                    
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
                            
                             <button className="btn btn-default">
                            <Link to={`/locvacant/${lmvs.id}`} style={{color: 'white'}}>Detalii</Link>  
                          </button>                        
                          </div>
                        </div>
                    )} 
                </div>
      <ul>
        <li>
          <Link to="/img/2">Tomato</Link>
        </li>
        <li>
          <Link to="/img/4">Crimson</Link>
        </li>
      </ul>
    </div>
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
    <div>
      <h1>{image.title}</h1>
      <Image color={image.color} />
    </div>
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