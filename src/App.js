import React from "react";
import { render } from "react-dom";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import {
    Stitch,
    RemoteMongoClient,
    AnonymousCredential
} from "mongodb-stitch-browser-sdk";


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
  	const client = Stitch.initializeDefaultAppClient('talentati-rtvdi');

	const db = client.getServiceClient(RemoteMongoClient.factory, 'mongodb-atlas').db('Talent');

	client.auth.loginWithCredential(new AnonymousCredential()).then(user =>
	  db.collection('Talentati').updateOne({owner_id: client.auth.user.id}, {$set:{number:42}}, {upsert:true})
	).then(() =>
	  db.collection('Talentati').find({owner_id: client.auth.user.id}, { limit: 100}).asArray()
	).then(docs => {
	    console.log("Found docs", docs)
	    console.log("[MongoDB Stitch] Connected to Stitch")
	}).catch(err => {
	    console.error(err)
	});


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
          <Route path="/lmvs/:id" component={ImageView} />
        </Switch>
      </div>
    );
  }
}

const locuri = [
      {id:'0', judet: 'gorj', luna: 'septembrie', img: 'images/angajari.jpg', angajator: 'Rodali Cargo Sri',
      adresa: 'Str. Principala nr. 545, Giubega, Dolj', locDeMuncaVacant: 'Operator Statii Betoane',
      conditiiDeOcupare: 'LICEU', nrLocuri: '1', telefon:  '0730033777', email: 'scopi@apsg.eu'
      },
      {id:'1', judet: 'gorj', luna: 'iulie', img: 'images/tehnoinstal.jpg', angajator: 'SC TEHNOINSTAL SRL',
     adresa: 'Str.1 Decembrie 1918,Tg-Jiu,Gorj', locDeMuncaVacant: 'MECANIC UTILAJ',
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
      },
      {id:'6', judet: 'gorj', luna: 'iulie', img: 'images/succes.jpg', angajator: 'SC SUCCES NIC COM SRL',
      adresa: 'Voluntari,str.Bucegi nr.1,Ilfov,loc munca Tg-Jiu', locDeMuncaVacant: 'BUCATAR',
      conditiiDeOcupare: 'LICEU', nrLocuri: '5', telefon:  '0752181000', email: 'scopi@apsg.eu'
      },
      {id:'7', judet: 'gorj', luna: 'iulie', img: 'images/proarhivali.jpg', angajator: 'PROARHIVALII 1831',
      adresa: 'Strada ECATERINA TEODOROIU 92, Loc. TÂRGU JIU, Jud. GORJ', locDeMuncaVacant: 'ARHIVIST',
      conditiiDeOcupare: 'Studii superioare', nrLocuri: '1', telefon:  '0745807315', email: 'scopi@apsg.eu'
      },
      {id:'8', judet: 'gorj', luna: 'iulie', img: 'images/angajari.jpg', angajator: 'ELENFARM SRL',
      adresa: 'STR. 22 DECEMBRIE 1989 Loc. TÂRGU JIU, Jud. GORJ', locDeMuncaVacant: 'ASISTENT FARMACIST',
      conditiiDeOcupare: 'POST-LICEAL', nrLocuri: '1', telefon:  '0353413740', email: 'scopi@apsg.eu'
      },
      {id:'9', judet: 'gorj', luna: 'iulie', img: 'images/angajari.jpg', angajator: 'SC AER RECE SRL',
      adresa: 'Strada Constantin Brâncuşi 3, Loc. TÂRGU JIU, Jud. GORJ', locDeMuncaVacant: 'ELECTRICIAN DE ÎNTRETINERE ÎN CONSTRUCTII',
      conditiiDeOcupare: 'LICEU', nrLocuri: '1', telefon:  '0722323251', email: 'scopi@apsg.eu'
      },
      {id:'10', judet: 'gorj', luna: 'iulie', img: 'images/angajari.jpg', angajator: 'SC ADINICUS CONSTRUCT SRL',
      adresa: 'Satul CLOSANI 71, Loc. PADEŞ, Jud. GORJ', locDeMuncaVacant: 'VANZATOR',
      conditiiDeOcupare: 'LICEU', nrLocuri: '1', telefon:  '0784562990', email: 'scopi@apsg.eu'
      },
      {id:'11', judet: 'gorj', luna: 'iulie', img: 'images/angajari.jpg', angajator: 'SC VILARODA MOB SRL',
      adresa: 'Strada Hidrocentralei 45, Loc. TÂRGU JIU, Jud. GORJ', locDeMuncaVacant: 'TÂMPLAR UNIVERSAL',
      conditiiDeOcupare: 'GIMNAZIAL', nrLocuri: '1', telefon:  '0763272297', email: 'scopi@apsg.eu'
      },
      {id:'12', judet: 'gorj', luna: 'iulie', img: 'images/angajari.jpg', angajator: 'SC DMM INOX VISION SRL',
      adresa: 'Satul CORNESTI 210, Loc. BĂLEŞTI, Jud. GORJ', locDeMuncaVacant: 'SUDOR CU ARC ELECTRIC CU ELECTROD FUZIBIL ÎN MEDIU DE GAZ PROTECTOR',
      conditiiDeOcupare: 'LICEU', nrLocuri: '1', telefon:  '0765847970', email: 'scopi@apsg.eu'
      },
      {id:'13', judet: 'gorj', luna: 'iulie', img: 'images/angajari.jpg', angajator: 'SERES PROD COM SRL',
      adresa: 'Strada Castru Vîrtop 2,Loc. BUMBEŞTI-JIU, Jud. GORJ', locDeMuncaVacant: 'SUDOR',
      conditiiDeOcupare: 'LICEU', nrLocuri: '1', telefon:  '0744500292', email: 'scopi@apsg.eu'
      },
      {id:'14', judet: 'gorj', luna: 'iulie', img: 'images/angajari.jpg', angajator: 'SC IE TYS CARPET SRL',
      adresa: 'Strada Tismana 30, Loc. TISMANA, Jud. GORJ', locDeMuncaVacant: 'TESATOR',
      conditiiDeOcupare: 'GIMNAZIAL', nrLocuri: '1', telefon:  '0727460515', email: 'scopi@apsg.eu'
      },
      {id:'15', judet: 'gorj', luna: 'iulie', img: 'images/angajari.jpg', angajator: 'SC SUDURA MECANICA MONTAJ SRL PUNCT DE LUCRU TG-JIU',
      adresa: 'Bulevardul Ecaterina Teodoroiu 354, Loc. TÂRGU JIU, Jud. GORJ', locDeMuncaVacant: 'SUDOR',
      conditiiDeOcupare: 'LICEU', nrLocuri: '1', telefon:  '0248208822', email: 'scopi@apsg.eu'
      },
      {id:'16', judet: 'gorj', luna: 'iulie', img: 'images/angajari.jpg', angajator: 'M.A.R.S.A.T SA',
      adresa: 'STR. TERMOCENTRALEI 22, Loc. TÂRGU JIU, Jud. GORJ', locDeMuncaVacant: 'SUDOR',
      conditiiDeOcupare: 'LICEU', nrLocuri: '3', telefon:  '0253210047', email: 'scopi@apsg.eu'
      },
      {id:'17', judet: 'gorj', luna: 'iulie', img: 'images/angajari.jpg', angajator: 'CONSPROIECT M SRL',
      adresa: 'Strada Ion Pillat 18,Loc. BOTOŞANI, Jud. BOTOŞANI,loc de munca Tg-Jiu', locDeMuncaVacant: 'ZUGRAV',
      conditiiDeOcupare: 'LICEU', nrLocuri: '3', telefon:  '0231515158', email: 'scopi@apsg.eu'
      },
      {id:'18', judet: 'gorj', luna: 'iulie', img: 'images/angajari.jpg', angajator: 'SC TEHNOINSTAL SRL',
      adresa: 'Str.1 Decembrie 1918,Tg-Jiu,jud.Gorj', locDeMuncaVacant: 'OPERATOR INTRODUCERE VALIDARE SI PRELUCRARE DATE',
      conditiiDeOcupare: 'LICEU', nrLocuri: '1', telefon:  '0253206067', email: 'scopi@apsg.eu'
      },
      {id:'19', judet: 'gorj', luna: 'iulie', img: 'images/angajari.jpg', angajator: 'SC PERDANION SRL',
      adresa: 'Str.Pandurilor Nr.1,Bl.B7,Et.4,Sc.2,Ap.20,Tg-Carbunesti,Jud.Gorj', locDeMuncaVacant: 'LUCRATOR GESTIONAR',
      conditiiDeOcupare: 'LICEU', nrLocuri: '1', telefon:  '0786701095', email: 'scopi@apsg.eu'
      },
      {id:'20', judet: 'gorj', luna: 'iulie', img: 'images/angajari.jpg', angajator: 'SC IZALBICON 2013',
      adresa: 'Str.Padurea Mamului Nr.5,Tg-Carbunesti,jud.Gorj', locDeMuncaVacant: 'LUCRATOR GESTIONAR',
      conditiiDeOcupare: 'LICEU', nrLocuri: '1', telefon:  '0786701095', email: 'scopi@apsg.eu'
      },
      {id:'21', judet: 'gorj', luna: 'iulie', img: 'images/angajari.jpg', angajator: 'SC PERDANION SRL',
      adresa: 'Str.Pandurilor Nr.1,Bl.B7,Et.4,Sc.2,Ap.20,Tg-Carbunesti,Jud.Gorj', locDeMuncaVacant: 'CASIER',
      conditiiDeOcupare: 'LICEU', nrLocuri: '1', telefon:  '0786701095', email: 'scopi@apsg.eu'
      },
      {id:'22', judet: 'gorj', luna: 'iulie', img: 'images/angajari.jpg', angajator: 'SC GRATI&ISA SRL',
      adresa: 'Rovinari,Gorj', locDeMuncaVacant: 'MANIPULANT MARFURI',
      conditiiDeOcupare: 'LICEU', nrLocuri: '1', telefon:  '0786409053', email: 'scopi@apsg.eu'
      },
      {id:'23', judet: 'dolj', luna: 'iulie', img: 'images/angajari.jpg', angajator: 'SC Expoget SRL',
      adresa: 'Str. Plaiului nr. 13,Carcea, Dolj', locDeMuncaVacant: 'Operatori PC vanzari',
      conditiiDeOcupare: 'Studii medii', nrLocuri: '1', telefon:  '0720014774', email: 'scopi@apsg.eu'
      },
      {id:'24', judet: 'dolj', luna: 'iulie', img: 'images/angajari.jpg', angajator: 'SC Rofito SRL',
      adresa: 'Str.Dumbravitei nr. 5, Craiova,Dolj', locDeMuncaVacant: 'Operatori PC vanzari',
      conditiiDeOcupare: 'Studii: STUDII MEDII, Experienta:experienta minim 6 luni', nrLocuri: '1', telefon:  '0728854488', email: 'scopi@apsg.eu'
      },
      {id:'25', judet: 'dolj', luna: 'iulie', img: 'images/angajari.jpg', angajator: 'SC RURIS lmpex SRL',
      adresa: 'Str. Calea Severinului nr. 10, Craiova, Dolj', locDeMuncaVacant: 'Mecanic',
      conditiiDeOcupare: 'Studii: STUDII MEDII, Experienta:experienta, minim 12 luni', nrLocuri: '1', telefon:  '0736203567', email: 'scopi@apsg.eu'
      },
      {id:'26', judet: 'gorj', luna: 'august', img: 'images/angajari.jpg', angajator: 'VILOMAR COMPREST SRL',
      adresa: 'COMPLEX COMERCIAL PIAŢA CENTRALĂ , Loc. TÂRGU JIU, Jud. GORJ', locDeMuncaVacant: 'AJUTOR BUCATAR',
      conditiiDeOcupare: 'LICEU', nrLocuri: '1', telefon:  '0253218042', email: 'scopi@apsg.eu'
      },
      {id:'27', judet: 'gorj', luna: 'august', img: 'images/angajari.jpg', angajator: 'PENSIUNEA LUMINITA TRAVEL',
      adresa: 'Satul RUGI 48, Loc. TURCINEŞTI, Jud. GORJ', locDeMuncaVacant: 'AJUTOR BUCATAR',
      conditiiDeOcupare: 'LICEU', nrLocuri: '1', telefon:  '0765275015', email: 'scopi@apsg.eu'
      },
      {id:'28', judet: 'gorj', luna: 'august', img: 'images/angajari.jpg', angajator: 'VEL PITAR SA',
      adresa: 'Strada Emil Racoviţă 3-5 SECTORUL 4, BUCUREŞTI,LOC MUNCA TG-JIU', locDeMuncaVacant: 'BRUTAR',
      conditiiDeOcupare: 'LICEU', nrLocuri: '1', telefon:  '0253213420', email: 'scopi@apsg.eu'
      },
      {id:'29', judet: 'gorj', luna: 'august', img: 'images/angajari.jpg', angajator: 'NIEDEN SRL',
      adresa: 'STR. AGRICULTURII , Bl. 1, Sc. 2, Et. 2, Ap. 11,  Loc. TÂRGU JIU, Jud. GORJ', locDeMuncaVacant: 'VANZATOR',
      conditiiDeOcupare: 'GIMNAZIAL', nrLocuri: '1', telefon:  '0727809300', email: 'scopi@apsg.eu'
      },
      {id:'30', judet: 'gorj', luna: 'august', img: 'images/smb.jpg', angajator: 'SC SMB SRL',
      adresa: 'Strada Siretului 13, Bl. -, Sc. -, Et. 1, Ap. -, Cod postal 210190, Loc. TÂRGU JIU, Jud. GORJ', locDeMuncaVacant: 'OPERATOR CALCULATOR ELECTRONIC SI RETELE',
      conditiiDeOcupare: 'LICEU', nrLocuri: '2', telefon:  '0752229951', email: 'scopi@apsg.eu'
      },
      {id:'31', judet: 'gorj', luna: 'august', img: 'images/angajari.jpg', angajator: 'TORSAN TOURS SRL',
      adresa: 'Strada UNIRII-SIRET , Bl. 9, Loc. TÂRGU JIU, Jud. GORJ', locDeMuncaVacant: 'OPERATOR MASE PLASTICE',
      conditiiDeOcupare: 'LICEU', nrLocuri: '2', telefon:  '0722547800', email: 'scopi@apsg.eu'
      },
      {id:'32', judet: 'gorj', luna: 'august', img: 'images/angajari.jpg', angajator: 'AVICARVIL SRL',
      adresa: 'COM. FRANCESTI 11, Loc. FRÂNCEŞTI, Jud. VÂLCEA LOC MUNCA TG-JIU', locDeMuncaVacant: 'GESTIONAR DEPOZIT',
      conditiiDeOcupare: 'LICEU', nrLocuri: '15', telefon:  '0725725015, 0735789588', email: 'scopi@apsg.eu'
      },
      {id:'33', judet: 'gorj', luna: 'august', img: 'images/angajari.jpg', angajator: 'SC AVIROM PLUS SRL',
      adresa: 'COM. FRANCESTI 11, Loc. FRÂNCEŞTI, Jud. VÂLCEA LOC MUNCA TG-JIU', locDeMuncaVacant: 'MUNCITOR NECALIFICAT IN AGRICULTURA',
      conditiiDeOcupare: 'GIMNAZIU', nrLocuri: '50', telefon:  '0725352442', email: 'scopi@apsg.eu'
      },
      {id:'34', judet: 'gorj', luna: 'august', img: 'images/angajari.jpg', angajator: 'RZW TRADE 11',
      adresa: 'Strada GĂRII 620, Loc. TISMANA, Jud. GORJ,LOC MUNCA IN SILVICULTURA', locDeMuncaVacant: 'MUNCITOR NECALIFICAT IN SILVICULTURA',
      conditiiDeOcupare: 'GIMNAZIU', nrLocuri: '3', telefon:  '0757295918', email: 'scopi@apsg.eu'
      },
      {id:'35', judet: 'gorj', luna: 'august', img: 'images/angajari.jpg', angajator: 'ILVI EXIM SRL',
      adresa: 'COMPLEX COMERCIAL PARTER  Loc. BUMBEŞTI-JIU, Jud. GORJ', locDeMuncaVacant: 'PATISER',
      conditiiDeOcupare: 'LICEU', nrLocuri: '1', telefon:  '0723153235', email: 'scopi@apsg.eu'
      },
      {id:'36', judet: 'gorj', luna: 'august', img: 'images/angajari.jpg', angajator: 'PANAN TOUR SRL',
      adresa: 'STR. SIRETULUI , Bl. 17, Sc. 1, Et. 5, Ap. 18, Loc. TÂRGU JIU, Jud. GORJ', locDeMuncaVacant: 'PIZZAR',
      conditiiDeOcupare: 'LICEU', nrLocuri: '1', telefon:  '0722281990', email: 'scopi@apsg.eu'
      },
      {id:'37', judet: 'gorj', luna: 'august', img: 'images/angajari.jpg', angajator: 'ROEXIM COM SRL',
      adresa: 'STR. 14 OCTOMBRIE Loc. TÂRGU JIU, Jud. GORJ', locDeMuncaVacant: 'REVIZOR GESTIUNE',
      conditiiDeOcupare: 'Studii superioare', nrLocuri: '1', telefon:  '0253237740', email: 'scopi@apsg.eu'
      },
      {id:'38', judet: 'gorj', luna: 'august', img: 'images/angajari.jpg', angajator: 'MOVEOS SRL',
      adresa: 'Strada Lunga 160, Bl. BIROU 2, Loc. BRAŞOV, Jud. BRAŞOV,LOC MUNCA ROVINARI', locDeMuncaVacant: 'SEF FORMATIE ÎN INDUSTRIA DE MASINI SI ECHIPAMENTE',
      conditiiDeOcupare: 'LICEU', nrLocuri: '1', telefon:  '0722281990', email: 'scopi@apsg.eu'
      },
      {id:'39', judet: 'gorj', luna: 'august', img: 'images/angajari.jpg', angajator: 'ROMADICOM SRL',
      adresa: 'Strada 1 Decembrie 1918 41, Loc. TÂRGU JIU, Jud. GORJ', locDeMuncaVacant: 'SPALATOR VEHICULE',
      conditiiDeOcupare: 'Scoala profesionala', nrLocuri: '1', telefon:  '0763629896', email: 'scopi@apsg.eu'
      },
      {id:'40', judet: 'gorj', luna: 'august', img: 'images/angajari.jpg', angajator: 'KONCORD TRANS SRL',
      adresa: 'Aleea Macului 5,  Loc. TÂRGU JIU, Jud. GORJ', locDeMuncaVacant: 'TAMPLAR UNIVERSAL',
      conditiiDeOcupare: 'Scoala profesionala', nrLocuri: '5', telefon:  '0253215935', email: 'scopi@apsg.eu'
      },
      {id:'41', judet: 'gorj', luna: 'august', img: 'images/angajari.jpg', angajator: 'TREFO SRL',
      adresa: 'Strada ENERGETICIANULUI 1,Loc. ROVINARI, Jud. GORJ', locDeMuncaVacant: 'SOFER AUTOCAMION/MASINA DE MARE TONAJ',
      conditiiDeOcupare: 'LICEU', nrLocuri: '1', telefon:  '0253372015', email: 'scopi@apsg.eu'
      },
      {id:'42', judet: 'gorj', luna: 'august', img: 'images/angajari.jpg', angajator: 'IRINA SERV SRL',
      adresa: 'Sat TURCINESTI Nr.368', locDeMuncaVacant: 'LUCRATOR PENSIUNE TURISTICA',
      conditiiDeOcupare: 'LICEU', nrLocuri: '1', telefon:  '0721239539', email: 'scopi@apsg.eu'
      },
      {id:'43', judet: 'gorj', luna: 'august', img: 'images/angajari.jpg', angajator: 'EURODACOS SRL',
      adresa: 'STR. TERMOCENTRALEI  Loc. TÂRGU JIU, Jud. GORJ', locDeMuncaVacant: 'SOFER AUTOCAMION/MASINA DE MARE TONAJ',
      conditiiDeOcupare: 'LICEU', nrLocuri: '1', telefon:  '0728556545', email: 'scopi@apsg.eu'
      },
      {id:'44', judet: 'gorj', luna: 'august', img: 'images/angajari.jpg', angajator: 'HEVATEX COM SRL',
      adresa: 'STR. SLT. GHEORGHE BARBOI , Bl. 2, Sc. 2, Et. P, Loc. TÂRGU JIU, Jud. GORJ', locDeMuncaVacant: 'ZIDAR ROSAR-TENCUITOR',
      conditiiDeOcupare: 'GIMNAZIU', nrLocuri: '5', telefon:  '0253371897', email: 'scopi@apsg.eu'
      },
      {id:'45', judet: 'gorj', luna: 'august', img: 'images/angajari.jpg', angajator: 'VANESSA TRANS SRL',
      adresa: 'COM. BĂLEŞTI 202, Loc. BĂLEŞTI, Jud. GORJ', locDeMuncaVacant: 'SOFER DE AUTOTURISME SI CAMIONETE',
      conditiiDeOcupare: 'LICEU', nrLocuri: '2', telefon:  '0761299579', email: 'scopi@apsg.eu'
      },
      {id:'46', judet: 'gorj', luna: 'august', img: 'images/angajari.jpg', angajator: 'GTPD SRL',
      adresa: 'STR. 23 AUGUST 170, Loc. TÂRGU JIU, Jud. GORJ', locDeMuncaVacant: 'AGENT COMERCIAL',
      conditiiDeOcupare: 'LICEU', nrLocuri: '1', telefon:  '0253227920', email: 'scopi@apsg.eu'
      },
      {id:'47', judet: 'gorj', luna: 'august', img: 'images/angajari.jpg', angajator: 'PAMOHA VITENDO',
      adresa: 'Str.1 DECEMBRIE 1918,Nr.57,Bl.7,Sc.1,Ap.4,TG-JIU,Jud.GORJ', locDeMuncaVacant: 'OPERATOR INTRODUCERE SI VALIDARE DATE',
      conditiiDeOcupare: 'LICEU', nrLocuri: '1', telefon:  '0786409052', email: 'scopi@apsg.eu'
      },
      {id:'48', judet: 'gorj', luna: 'august', img: 'images/angajari.jpg', angajator: 'SC AMBASADOR ELITE SRL',
      adresa: 'Str.SIRETULUI ,TG-JIU,Nr.15,Jud GORJ', locDeMuncaVacant: 'OSPATAR',
      conditiiDeOcupare: 'LICEU', nrLocuri: '2', telefon:  '0744261629', email: 'scopi@apsg.eu'
      },
      {id:'49', judet: 'gorj', luna: 'august', img: 'images/angajari.jpg', angajator: 'SC AMBASADOR ELITE SRL',
      adresa: 'Str.SIRETULUI ,TG-JIU,Nr.15,Jud GORJ', locDeMuncaVacant: 'BARMAN',
      conditiiDeOcupare: 'LICEU', nrLocuri: '2', telefon:  '0744261629', email: 'scopi@apsg.eu'
      },
      {id:'50', judet: 'gorj', luna: 'august', img: 'images/angajari.jpg', angajator: 'IRINA SERV SRL',
      adresa: 'Sat TURCINESTI Nr.368', locDeMuncaVacant: 'CAMERISTA',
      conditiiDeOcupare: 'LICEU', nrLocuri: '1', telefon:  '0721239539', email: 'scopi@apsg.eu'
      },
      {id:'51', judet: 'gorj', luna: 'august', img: 'images/angajari.jpg', angajator: 'VEL PITAR SA',
      adresa: 'Strada Emil Racoviţă 3-5 SECTORUL 4, BUCUREŞTI,LOC MUNCA TG-JIU', locDeMuncaVacant: 'AMBALATOR MANUAL',
      conditiiDeOcupare: 'LICEU', nrLocuri: '1', telefon:  '0253213420', email: 'scopi@apsg.eu'
      },
      {id:'52', judet: 'gorj', luna: 'august', img: 'images/angajari.jpg', angajator: 'PROVET PHARM SRL',
      adresa: 'STR. 23 AUGUST 170, Loc. TÂRGU JIU, Jud. GORJ', locDeMuncaVacant: 'MEDIC VETERINAR',
      conditiiDeOcupare: 'Studii superioare', nrLocuri: '1', telefon:  '0727058134', email: 'scopi@apsg.eu'
      },
      {id:'53', judet: 'gorj', luna: 'august', img: 'images/angajari.jpg', angajator: 'EUPHORIC TRIP&TRAVEL',
      adresa: 'CALEA BUCURESTI,TG-JIU, NR.64G, CAM 3', locDeMuncaVacant: 'AGENT SERVICII CLIENTI',
      conditiiDeOcupare: 'Studii medii', nrLocuri: '1', telefon:  '0353414211', email: 'scopi@apsg.eu'
      },
      {id:'54', judet: 'dolj', luna: 'august', img: 'images/angajari.jpg', angajator: 'Truck Service &Parts Srl',
      adresa: 'Str. Drum Industriilor 70-72 Craiova, Dolj', locDeMuncaVacant: 'Mecanic Auto',
      conditiiDeOcupare: 'LICEU', nrLocuri: '1', telefon:  '0723666919', email: 'scopi@apsg.eu'
      },
      {id:'55', judet: 'dorj', luna: 'august', img: 'images/angajari.jpg', angajator: 'SC Rigconstruct SRL',
      adresa: 'Str. Luceafarului 3 Craiova, Dolj', locDeMuncaVacant: 'ZIDAR',
      conditiiDeOcupare: 'Studii medii', nrLocuri: '2', telefon:  '0744605364', email: 'scopi@apsg.eu'
      },
      {id:'56', judet: 'dolj', luna: 'august', img: 'images/angajari.jpg', angajator: 'SC Mira Construct Srl',
      adresa: 'Str. Madona Dudu 41 Craiova, Dolj', locDeMuncaVacant: 'Mecanic Utilaje Terestiere',
      conditiiDeOcupare: 'LICEU', nrLocuri: '1', telefon:  '0730033778', email: 'scopi@apsg.eu'
      },
      {id:'57', judet: 'dolj', luna: 'august', img: 'images/angajari.jpg', angajator: 'Rodali Cargo Srl',
      adresa: 'Str. Principala nr. 545, Giubega, Dolj', locDeMuncaVacant: 'Sofer',
      conditiiDeOcupare: 'LICEU', nrLocuri: '10', telefon:  '0730033777', email: 'scopi@apsg.eu'
      },
      {id:'58', judet: 'dolj', luna: 'august', img: 'images/angajari.jpg', angajator: 'SC Rigconstruct SRL',
      adresa: 'Str. Luceafarului 3 Craiova, Dolj', locDeMuncaVacant: 'FINISOR',
      conditiiDeOcupare: 'Studii medii', nrLocuri: '2', telefon:  '0744605364', email: 'scopi@apsg.eu'
      },
      {id:'59', judet: 'gorj', luna: 'septembrie', img: 'images/angajari.jpg', angajator: 'SC GEROTA SRL TG-JIU',
      adresa: 'Str.TERMOCENTRALEI nr.2', locDeMuncaVacant: 'ELECTRICIAN',
      conditiiDeOcupare: 'LICEU', nrLocuri: '3', telefon:  '0722883162', email: 'scopi@apsg.eu'
      },
      {id:'60', judet: 'gorj', luna: 'septembrie', img: 'images/angajari.jpg', angajator: 'SC GEROTA SRL TG-JIU',
      adresa: 'Str.TERMOCENTRALEI nr.2', locDeMuncaVacant: 'Inginer Electromecanic',
      conditiiDeOcupare: 'Superioare', nrLocuri: '2', telefon:  '0722883162', email: 'scopi@apsg.eu'
      },
      {id:'61', judet: 'gorj', luna: 'septembrie', img: 'images/angajari.jpg', angajator: 'SC LUXORISE SRL',
      adresa: 'Drumul SĂBĂRENI  24-26  Bucureşti  sect 6,loc munca TG-JIU', locDeMuncaVacant: 'OPERATOR CALL CENTER MAGAZIN ONLINE',
      conditiiDeOcupare: 'LICEU', nrLocuri: '1', telefon:  '0756380570', email: 'scopi@apsg.eu'
      },
      {id:'62', judet: 'gorj', luna: 'septembrie', img: 'images/angajari.jpg', angajator: 'TMG GUARD SRL',
      adresa: 'Bd.REPUBLICII nr.26,TG-JIU', locDeMuncaVacant: 'AGENT SECURITATE',
      conditiiDeOcupare: 'LICEU', nrLocuri: '5', telefon:  '0253238227', email: 'scopi@apsg.eu'
      },
      {id:'63', judet: 'gorj', luna: 'septembrie', img: 'images/angajari.jpg', angajator: 'GREENWOD SRL',
      adresa: 'Zona Hotel Gorj 2, Bl. 11, Ap 19, Loc. TÂRGU JIU, Jud. GORJ,Loc de munca TG-JIU', locDeMuncaVacant: 'AGENT VANZARI',
      conditiiDeOcupare: 'Studii medii', nrLocuri: '2', telefon:  '765429590', email: 'greenwood1977@yahoo.com'
      },
      {id:'64', judet: 'gorj', luna: 'septembrie', img: 'images/angajari.jpg', angajator: 'VEL PITAR SA',
      adresa: 'Strada Emil Racoviţă 3-5, Loc. SECTORUL 4, Jud. BUCUREŞTI,Loc munca TG-JIU', locDeMuncaVacant: 'BRUTAR',
      conditiiDeOcupare: 'Studii medii', nrLocuri: '2', telefon:  '0253213420', email: 'scopi@apsg.eu'
      },
      {id:'65', judet: 'dolj', luna: 'septembrie', img: 'images/angajari.jpg', angajator: 'BormaCom Srl',
      adresa: 'Str. Calea Unirii 21 Craiova, Dolj', locDeMuncaVacant: 'Bucatar',
      conditiiDeOcupare: 'LICEU', nrLocuri: '3', telefon:  '0749059036', email: 'scopi@apsg.eu'
      },
      {id:'66', judet: 'gorj', luna: 'septembrie', img: 'images/angajari.jpg', angajator: 'SC MADRAPAN 2015 SRL',
      adresa: 'Bumbesti –Jiu, jud.Gorj', locDeMuncaVacant: 'LUCRATOR COMERCIAL',
      conditiiDeOcupare: 'LICEU', nrLocuri: '1', telefon:  '0769349100', email: 'scopi@apsg.eu'
      },
      {id:'67', judet: 'gorj', luna: 'septembrie', img: 'images/angajari.jpg', angajator: 'SC NELUCORA IMPEX SRL',
      adresa: 'Stanesti-Gorj, Loc munca in Tg-Jiu', locDeMuncaVacant: 'LUCRATOR COMERCIAL',
      conditiiDeOcupare: 'Studii medii', nrLocuri: '1', telefon:  '0767298969', email: 'scopi@apsg.eu'
      },
      {id:'68', judet: 'gorj', luna: 'septembrie', img: 'images/angajari.jpg', angajator: 'SAPTE SPICE SA',
      adresa: 'Strada Timis 22, Cod postal 240630, Loc. RÂMNICU VÂLCEA, Jud. VÂLCEA', locDeMuncaVacant: 'AMBALATOR MANUAL',
      conditiiDeOcupare: 'LICEU', nrLocuri: '1', telefon:  '0253213420', email: 'scopi@apsg.eu'
      },
       {id:'69', judet: 'gorj', luna: 'septembrie', img: 'images/angajari.jpg', angajator: 'SC PROTECŢIA SRL',
      adresa: 'Strada Str. VASILE ALECSANDRI 40, Loc. TÂRGU JIU, Jud. GORJ', locDeMuncaVacant: 'AGENT DE SECURITATE',
      conditiiDeOcupare: 'LICEU', nrLocuri: '1', telefon:  '0253222743', email: 'scopi@apsg.eu'
      },
       {id:'70', judet: 'gorj', luna: 'septembrie', img: 'images/angajari.jpg', angajator: 'SC Pregter SRL',
      adresa: 'Str. Drum lndustriilor 70 Craiova, Dolj', locDeMuncaVacant: 'Mecanic Utilaje Terestiere',
      conditiiDeOcupare: 'LICEU', nrLocuri: '1', telefon:  '02514128412, 0722666915', email: 'scopi@apsg.eu'
      },
       {id:'71', judet: 'gorj', luna: 'septembrie', img: 'images/angajari.jpg', angajator: 'SC MAPOVICOM SRL',
      adresa: 'Str.1Decembrie 1918,nr.72A', locDeMuncaVacant: 'LUCRATOR COMERCIAL',
      conditiiDeOcupare: 'LICEU', nrLocuri: '1', telefon:  '0784214901', email: 'scopi@apsg.eu'
      },
      {id:'72', judet: 'gorj', luna: 'septembrie', img: 'images/angajari.jpg', angajator: 'SC MAPOVICOM SRL',
      adresa: 'Str.1Decembrie 1918,nr.72A', locDeMuncaVacant: 'COFETAR',
      conditiiDeOcupare: 'LICEU', nrLocuri: '1', telefon:  '0784214901', email: 'scopi@apsg.eu'
      },
      {id:'73', judet: 'gorj', luna: 'septembrie', img: 'images/angajari.jpg', angajator: 'SC MAPOVICOM SRL',
      adresa: 'Str.1Decembrie 1918,nr.72A', locDeMuncaVacant: 'PATISER',
      conditiiDeOcupare: 'LICEU', nrLocuri: '1', telefon:  '0784214901', email: 'scopi@apsg.eu'
      },
      {id:'74', judet: 'gorj', luna: 'septembrie', img: 'images/angajari.jpg', angajator: 'SC MAPOVICOM SRL',
      adresa: 'Str.1Decembrie 1918,nr.72A', locDeMuncaVacant: 'BRUTAR',
      conditiiDeOcupare: 'LICEU', nrLocuri: '1', telefon:  '0784214901', email: 'scopi@apsg.eu'
      },
      {id:'75', judet: 'gorj', luna: 'septembrie', img: 'images/angajari.jpg', angajator: 'IRINASERV SRL',
      adresa: 'Sat TURCINESTI,COM Turcinesti,Nr 368', locDeMuncaVacant: 'INGRIJITOR CLADIRI',
      conditiiDeOcupare: 'LICEU', nrLocuri: '1', telefon:  '0721239539', email: 'scopi@apsg.eu'
      },
      {id:'76', judet: 'gorj', luna: 'septembrie', img: 'images/angajari.jpg', angajator: 'ASLAN SRL',
      adresa: 'Strada Griviţei , TÂRGU JIU, Jud. GORJ', locDeMuncaVacant: 'BRUTAR',
      conditiiDeOcupare: 'LICEU', nrLocuri: '6', telefon:  '0744699297', email: 'scopi@apsg.eu'
      },
      {id:'77', judet: 'gorj', luna: 'septembrie', img: 'images/angajari.jpg', angajator: 'KALMIA SRL',
      adresa: 'Strada Barajelor 1, Cod postal 210107, Loc. TÂRGU JIU, Jud. GORJ', locDeMuncaVacant: 'CONFECTIONER-ASAMBLOR ARTICOLE DIN TEXTILE',
      conditiiDeOcupare: 'LICEU', nrLocuri: '10', telefon:  '0762242632', email: 'scopi@apsg.eu'
      },
      {id:'78', judet: 'gorj', luna: 'septembrie', img: 'images/angajari.jpg', angajator: 'VILOMAR COMPREST SRL',
      adresa: 'COMPLEX COMERCIAL PIAŢA CENTRALĂ , Loc. TÂRGU JIU, Jud. GORJ', locDeMuncaVacant: 'FEMEIE DE SERVICIU',
      conditiiDeOcupare: 'GIMNAZIAL', nrLocuri: '1', telefon:  '0722376218 sau 0734977855', email: 'scopi@apsg.eu'
      },
      {id:'79', judet: 'gorj', luna: 'septembrie', img: 'images/angajari.jpg', angajator: 'SC MAPOVICOM SRL',
      adresa: 'Str.1Decembrie 1918,nr.72A', locDeMuncaVacant: 'PIZZAR',
      conditiiDeOcupare: 'LICEU', nrLocuri: '1', telefon:  '0784214901', email: 'scopi@apsg.eu'
      },
      {id:'80', judet: 'gorj', luna: 'octombrie', img: 'images/angajari.jpg', angajator: 'DMA QUALITY FOOD SRL',
      adresa: 'Str. George Coşbuc 25A, BAIA MARE, Jud. MARAMUREŞ loc munca Tg-Jiu', locDeMuncaVacant: 'PIZZAR',
      conditiiDeOcupare: 'Calificare in domeniu,aspect fizic placut,experienta', nrLocuri: '3', telefon:  '076132147', email: 'recrutare@dmagroup.ro'
      },
      {id:'81', judet: 'gorj', luna: 'octombrie', img: 'images/angajari.jpg', angajator: 'HANS OBERDING SRL',
      adresa: 'Aleea Izvor 3, Loc. TÂRGU JIU, Jud. GORJ', locDeMuncaVacant: 'LACATUS MECANIC',
      conditiiDeOcupare: 'Calificare in domeniu,experienta minim 1 an', nrLocuri: '1', telefon:  '0253218264', email: 'office@hansoberding.ro'
      },
      {id:'82', judet: 'gorj', luna: 'octombrie', img: 'images/angajari.jpg', angajator: 'VOTICOM SRL',
      adresa: 'Str. Alexandru Ioan Ghica 2A, Loc. BUMBEŞTI-JIU, Jud. GORJ', locDeMuncaVacant: 'LUCRATOR GESTIONAR',
      conditiiDeOcupare: 'LICEU', nrLocuri: '1', telefon:  '0785111471', email: 'scopi@apsg.eu'
      },
      {id:'83', judet: 'gorj', luna: 'octombrie', img: 'images/angajari.jpg', angajator: 'KONCORD TRANS SRL',
      adresa: 'Aleea Macului 5, Loc. TÂRGU JIU, Jud. GORJ', locDeMuncaVacant: 'MUNCITOR NECALIFICAT LA AMBALAREA PRODUSELOR SOLIDE SI SEMISOLIDE',
      conditiiDeOcupare: 'Fara experienta in domeniu,spirit de echipa,disponibilitate munca grea.', nrLocuri: '5', telefon:  '0253215935', email: 'scopi@apsg.eu'
      },
      {id:'84', judet: 'dolj', luna: 'octombrie', img: 'images/angajari.jpg', angajator: 'SC Novara T Impex SRL',
      adresa: 'Str. Primaverii 35 Craiova.', locDeMuncaVacant: 'Instalator Apa, Canal',
      conditiiDeOcupare: 'Calificare în domeniu', nrLocuri: '1', telefon:  '0251594025', email: 'novamarketing@yahoo.com'
      },
      {id:'85', judet: 'dolj', luna: 'octombrie', img: 'images/angajari.jpg', angajator: 'S.C. Stimir Com Srl',
      adresa: 'Calea Bucuresti , Bl. P4, Sc. 1, Ap. 6, Loc. Craiova, Jud. Dolj', locDeMuncaVacant: 'Ajutor Ospatar',
      conditiiDeOcupare: 'Calificare în domeniu', nrLocuri: '2', telefon:  '0765955081', email: 'predoi_giorgi@yanoo.com'
      },
      {id:'86', judet: 'dolj', luna: 'octombrie', img: 'images/angajari.jpg', angajator: 'S.C. Upipsa Srl',
      adresa: 'Str. Izvor 22, Loc. Mischii, Jud. Dolj', locDeMuncaVacant: 'Frezor Universal',
      conditiiDeOcupare: 'Calificare în domeniu', nrLocuri: '2', telefon:  '0251436770', email: 'scopi@apsg.eu'
      },
      {id:'87', judet: 'dolj', luna: 'octombrie', img: 'images/angajari.jpg', angajator: 'Grup Feroviar Roman SA',
      adresa: 'Calea Victoriei 114, Loc. Sectorul 1, Jud. Bucuresti', locDeMuncaVacant: 'Sef Manevra',
      conditiiDeOcupare: 'Calificare în domeniu', nrLocuri: '1', telefon:  '0736880947', email: 'scopi@apsg.eu'
      },
      {id:'88', judet: 'dolj', luna: 'octombrie', img: 'images/angajari.jpg', angajator: 'S.R.L. Grafi Print Srl',
      adresa: 'Cringului 7a, Loc. Craiova', locDeMuncaVacant: 'Legator Manual (in Poligrafie Si Ateliere Speciale)',
      conditiiDeOcupare: 'Calificare în domeniu', nrLocuri: '1', telefon:  '0351170327', email: 'grafiprintsrl@gmail.com'
      },
      {id:'89', judet: 'dolj', luna: 'octombrie', img: 'images/angajari.jpg', angajator: 'S.C. Stoenescu Prestcom SR.L.',
      adresa: 'Progresului , Bl. 36, Sc. 4, Ap. 44, Loc. Uricani, Hunedoara', locDeMuncaVacant: 'Lacatus Mecanic',
      conditiiDeOcupare: 'Calificare în domeniu', nrLocuri: '2', telefon:  '0727546891', email: 'scopi@apsg.eu'
      },
      {id:'90', judet: 'dolj', luna: 'octombrie', img: 'images/angajari.jpg', angajator: 'SC Novara T Impex SR',
      adresa: 'Str. Primaverii 35 Craiova.', locDeMuncaVacant: 'Instalator Apa, Canal',
      conditiiDeOcupare: 'Calificare în domeniu', nrLocuri: '1', telefon:  '0251594025', email: 'novamarketing@yahoo.com'
      },

 {id:'91', judet: 'hunedoara', luna: 'ianuarie', img: 'images/angajari.jpg', angajator: 'SC SCENART THEATRE', adresa: 'Str. Avram Iancu, Bl. H3, C.P. 330025, Loc. DEVA', locDeMuncaVacant: 'ACTOR', conditiiDeOcupare: 'Fără Experiență', nrLocuri: '1', telefon: '', email:'' },
{id:'92', judet: 'hunedoara', luna: 'ianuarie', img: 'images/angajari.jpg', angajator: 'DAVIDE SCARPE', adresa: 'Satul CRISTUR 30, Loc. DEVA,tel. 0733186207', locDeMuncaVacant: 'ADMINISTRATOR SOCIETATE COMERCIALA', conditiiDeOcupare: 'Fără Experiență', nrLocuri: '1', telefon: '', email:'' },
{id:'93', judet: 'hunedoara', luna: 'ianuarie', img: 'images/angajari.jpg', angajator: 'PRIORITAR IMPEX SRL', adresa: 'Str. BRADULUI (PUNCT TERMIC NR. 2), Loc. CĂLAN', locDeMuncaVacant: 'AGENT COMERCIAL', conditiiDeOcupare: 'Experiență Medie', nrLocuri: '4', telefon: '', email:'' },
{id:'94', judet: 'hunedoara', luna: 'ianuarie', img: 'images/angajari.jpg', angajator: 'SC ROM LEATHER SOFAS SRL', adresa: 'Satul Soimus 409, Loc. DEVA,tel. 0254237411', locDeMuncaVacant: 'AGENT CONTRACTARI SI ACHIZITII (Broker Marfa)', conditiiDeOcupare: 'Începător', nrLocuri: '1', telefon: '', email:'' },
{id:'95', judet: 'hunedoara', luna: 'ianuarie', img: 'images/angajari.jpg', angajator: 'ASOCIATIA MERIT', adresa: 'Bulevardul 22 Decembrie 37A, Bl. CLADIREA CEPROMIN, Ap. 221, Loc. DEVA,tel. 0254218111', locDeMuncaVacant: 'AGENT CURATENIE CLADIRI, MIJLOACE DE TRANSPORT', conditiiDeOcupare: 'Fără Experiență', nrLocuri: '2', telefon: '', email:'' },
{id:'96', judet: 'hunedoara', luna: 'ianuarie', img: 'images/angajari.jpg', angajator: 'EUROPA GUARD SRL', adresa: 'Str. Crisanei 16, C.P. 550012, Loc. SIBIU, Jud. SIBIU, 0269215052', locDeMuncaVacant: 'AGENT DE SECURITATE', conditiiDeOcupare: 'Fără Experiență', nrLocuri: '1', telefon: '', email:'' },
{id:'97', judet: 'hunedoara', luna: 'ianuarie', img: 'images/angajari.jpg', angajator: 'GEDI SECURITY', adresa: 'Str. Horea 212, C.P. 330139, Loc. DEVA', locDeMuncaVacant: 'AGENT DE SECURITATE', conditiiDeOcupare: 'Fără Experiență', nrLocuri: '1', telefon: '', email:'' },
{id:'98', judet: 'hunedoara', luna: 'ianuarie', img: 'images/angajari.jpg', angajator: 'G.B. PRODCOM IMPEX SRL', adresa: 'Str. I.L.CARAGIALE 2020, Loc. DEVA,tel. 0744525225', locDeMuncaVacant: 'AGENT DE SECURITATE INCINTA (MAGAZIN, HOTEL, ÎNTREPRINDERE ETC.)', conditiiDeOcupare: 'Experiență Medie', nrLocuri: '1', telefon: '', email:'' },
{id:'99', judet: 'hunedoara', luna: 'ianuarie', img: 'images/angajari.jpg', angajator: 'GEDI SECURITY', adresa: 'Str. Horea 212, C.P. 330139, Loc. DEVA', locDeMuncaVacant: 'AGENT DE SECURITATE INTERVENȚIE', conditiiDeOcupare: 'Fără Experiență', nrLocuri: '2', telefon: '', email:'' },
{id:'100', judet: 'hunedoara', luna: 'ianuarie', img: 'images/angajari.jpg', angajator: 'SC ANA CORNEL SRL', adresa: 'Str. BARIERA AMARU 1, C.P. 810438, Loc. MIZIL, Jud. PRAHOVA,tel. 0244250966', locDeMuncaVacant: 'AGENT DE VÂNZARI', conditiiDeOcupare: 'Fără Experiență', nrLocuri: '1', telefon: '', email:'' },
{id:'101', judet: 'hunedoara', luna: 'ianuarie', img: 'images/angajari.jpg', angajator: 'UNICARM SRL', adresa: 'Str. PRINCIPALA 314, Loc. VETIŞ, Jud. SATU MARE, 0752200932', locDeMuncaVacant: 'AGENT DE VÂNZARI', conditiiDeOcupare: 'Fără Experiență', nrLocuri: '1', telefon: '', email:'' },
{id:'102', judet: 'hunedoara', luna: 'ianuarie', img: 'images/angajari.jpg', angajator: '"SOCOM UNIREA" SOC COOPERAT', adresa: 'Str. NICOLAE BALCESCU 1, Loc. PETROŞANI,tel. 0254543543', locDeMuncaVacant: 'AJUTOR BUCATAR', conditiiDeOcupare: 'Începător', nrLocuri: '1', telefon: '', email:'' },
{id:'103', judet: 'hunedoara', luna: 'ianuarie', img: 'images/angajari.jpg', angajator: 'COMPLEX HOTELIER GERMISARA', adresa: 'Str. GERMISARA 1B, Loc. GEOAGIU,tel. 0734010560', locDeMuncaVacant: 'AJUTOR OSPATAR', conditiiDeOcupare: 'Fără Experiență', nrLocuri: '1', telefon: '', email:'' },
{id:'104', judet: 'hunedoara', luna: 'ianuarie', img: 'images/angajari.jpg', angajator: 'STAR TOUR SRL', adresa: 'Str. ARCHIA 92, Loc. DEVA', locDeMuncaVacant: 'AJUTOR OSPATAR', conditiiDeOcupare: 'Fără Experiență', nrLocuri: '1', telefon: '', email:'' },
{id:'105', judet: 'hunedoara', luna: 'ianuarie', img: 'images/angajari.jpg', angajator: 'EURO FOOD &DISTRIBUTION', adresa: 'Piaţa Libertatii 4, C.P. 331130, Loc. HUNEDOARA,tel. 0748190699', locDeMuncaVacant: 'AMBALATOR MANUAL', conditiiDeOcupare: 'Fără Experiență', nrLocuri: '25', telefon: '', email:'' },
{id:'106', judet: 'hunedoara', luna: 'ianuarie', img: 'images/angajari.jpg', angajator: 'INVEST CRETU CORPORATION SRL', adresa: 'Str. Principală 70, C.P. 336100, Loc. URICANI,tel. 07325815069', locDeMuncaVacant: 'AMBALATOR MANUAL', conditiiDeOcupare: 'Experiență Medie', nrLocuri: '1', telefon: '', email:'' },
{id:'107', judet: 'hunedoara', luna: 'ianuarie', img: 'images/angajari.jpg', angajator: 'TITAN`99 SRL', adresa: 'Str. Mărăşeşti 1, C.P. 335900, Loc. SIMERIA', locDeMuncaVacant: 'AMBALATOR MANUAL', conditiiDeOcupare: 'Începător', nrLocuri: '1', telefon: '', email:'' },
{id:'108', judet: 'hunedoara', luna: 'ianuarie', img: 'images/angajari.jpg', angajator: 'LOBY PLAST SRL', adresa: 'Str. Horia 6, Loc. SIMERIA,tel. 0723553063', locDeMuncaVacant: 'ASAMBLATOR-MONTATOR PROFILE ALUMINIU SI GEAM TERMOPAN', conditiiDeOcupare: 'Fără Experiență', nrLocuri: '2', telefon: '', email:'' },
{id:'109', judet: 'hunedoara', luna: 'ianuarie', img: 'images/angajari.jpg', angajator: 'ANA FARM SRL', adresa: 'STR. MARASTI, Bl. 24, Sc. D, Et. P, Ap. 40, Loc. DEVA, 0254214888', locDeMuncaVacant: 'ASISTENT FARMACIST', conditiiDeOcupare: 'Experiență Medie', nrLocuri: '1', telefon: '', email:'' },
{id:'110', judet: 'hunedoara', luna: 'ianuarie', img: 'images/angajari.jpg', angajator: 'ROSU VALENTINA FLORINA INTREPRINDERE INDIVIDUALA', adresa: 'Str. PRINCIPALA 166A, Loc. SIBIŞEL', locDeMuncaVacant: 'ASISTENT MANAGER', conditiiDeOcupare: 'Fără Experiență', nrLocuri: '1', telefon: '', email:'' },
{id:'111', judet: 'hunedoara', luna: 'ianuarie', img: 'images/angajari.jpg', angajator: 'D.G.A.S.P.C. HUNEDOARA', adresa: 'BLD. IULIU MANIU 18, Loc. DEVA,tel. 254233341', locDeMuncaVacant: 'ASISTENT MATERNAL', conditiiDeOcupare: 'Fără Experiență', nrLocuri: '1', telefon: '', email:'' },
{id:'112', judet: 'hunedoara', luna: 'ianuarie', img: 'images/angajari.jpg', angajator: 'CABINET MEDICAL INDIVIDUAL PIT', adresa: 'STR. MIHAI EMINESCU 99, Loc. DEVA', locDeMuncaVacant: 'ASISTENT MEDICAL GENERALIST', conditiiDeOcupare: 'Fără Experiență', nrLocuri: '1', telefon: '', email:'' },
{id:'113', judet: 'hunedoara', luna: 'ianuarie', img: 'images/angajari.jpg', angajator: 'CABINET MEDICAL INDIVIDUAL PIT', adresa: 'STR. MIHAI EMINESCU 99, Loc. DEVA', locDeMuncaVacant: 'ASISTENT MEDICAL GENERALIST', conditiiDeOcupare: 'Fără Experiență', nrLocuri: '1', telefon: '', email:'' },
{id:'114', judet: 'hunedoara', luna: 'ianuarie', img: 'images/angajari.jpg', angajator: 'CLINICMED TIF SRL', adresa: 'Str. Gheorghe Bariţiu 8, Loc. DEVA', locDeMuncaVacant: 'ASISTENT MEDICAL GENERALIST', conditiiDeOcupare: 'Începător', nrLocuri: '1', telefon: '', email:'' },
{id:'115', judet: 'hunedoara', luna: 'ianuarie', img: 'images/angajari.jpg', angajator: 'SPITALUL JUDETEAN DE URGENTA D', adresa: 'Str. 1 Decembrie 58, Loc. DEVA,tel. 0254/215051', locDeMuncaVacant: 'ASISTENT MEDICAL GENERALIST', conditiiDeOcupare: 'Fără Experiență', nrLocuri: '1', telefon: '', email:'' },
{id:'116', judet: 'hunedoara', luna: 'ianuarie', img: 'images/angajari.jpg', angajator: 'COMUNA BOSOROD', adresa: 'BOSOROD 7373, Loc. BOŞOROD,tel. 254733050', locDeMuncaVacant: 'ASISTENT PERS AL PERSOANEI CU HANDICAP GRAV', conditiiDeOcupare: 'Începător', nrLocuri: '1', telefon: '', email:'' },
{id:'117', judet: 'hunedoara', luna: 'ianuarie', img: 'images/angajari.jpg', angajator: 'PRIMARIA COMUNEI BAIA DE CRIS', adresa: 'Str. Tribunului 4, Loc. BAIA DE CRIŞ,tel. 0254682119', locDeMuncaVacant: 'ASISTENT PERS AL PERSOANEI CU HANDICAP GRAV', conditiiDeOcupare: 'Fără Experiență', nrLocuri: '1', telefon: '', email:'' },
{id:'118', judet: 'hunedoara', luna: 'ianuarie', img: 'images/angajari.jpg', angajator: 'PRIMARIA ORASTIOARA DE SUS', adresa: 'Satul ORASTIOARA DE SUS 133, Loc. ORĂŞTIOARA DE SUS', locDeMuncaVacant: 'ASISTENT PERS AL PERSOANEI CU HANDICAP GRAV', conditiiDeOcupare: 'Fără Experiență', nrLocuri: '1', telefon: '', email:'' },
{id:'119', judet: 'hunedoara', luna: 'ianuarie', img: 'images/angajari.jpg', angajator: 'BL PRIMO PROD SRL', adresa: 'Str. 1 DECEMBRIE 1918 12, Loc. HUNEDOARA,tel. 0765339099', locDeMuncaVacant: 'BARMAN', conditiiDeOcupare: 'Fără Experiență', nrLocuri: '1', telefon: '', email:'' },
{id:'120', judet: 'hunedoara', luna: 'ianuarie', img: 'images/angajari.jpg', angajator: 'IMPO MIHAI SRL', adresa: 'P-ta. LIBERTATII, Bl. 5A, Sc. F, Ap. 53, Loc. CĂLAN, 0254730430', locDeMuncaVacant: 'BARMAN', conditiiDeOcupare: 'Începător', nrLocuri: '2', telefon: '', email:'' },
{id:'121', judet: 'hunedoara', luna: 'ianuarie', img: 'images/angajari.jpg', angajator: 'MAGNUM XLC SRL', adresa: 'Str. PROGRESULUI 14, Loc. SIMERIA,tel. 0744644229', locDeMuncaVacant: 'BARMAN', conditiiDeOcupare: 'Fără Experiență', nrLocuri: '1', telefon: '', email:'' },
{id:'122', judet: 'hunedoara', luna: 'ianuarie', img: 'images/angajari.jpg', angajator: 'RUSTICANA MIXT S.R.L.', adresa: 'BOS 114, Loc. HUNEDOARA,tel. 0722512818', locDeMuncaVacant: 'BARMAN', conditiiDeOcupare: 'Fără Experiență', nrLocuri: '2', telefon: '', email:'' },
{id:'123', judet: 'hunedoara', luna: 'ianuarie', img: 'images/angajari.jpg', angajator: 'MACON SRL', adresa: 'STR. SANTUHALM 1, Loc. DEVA,tel. 0254213930', locDeMuncaVacant: 'BETONIST', conditiiDeOcupare: 'Fără Experiență', nrLocuri: '5', telefon: '', email:'' },
{id:'124', judet: 'hunedoara', luna: 'ianuarie', img: 'images/angajari.jpg', angajator: 'BRUTARIA B&B SRL', adresa: 'STR. BRADULUI, Bl. 2, Sc. B, Ap. 24, Loc. CĂLAN,tel. 0766748833', locDeMuncaVacant: 'BRUTAR', conditiiDeOcupare: 'Experiență Medie', nrLocuri: '2', telefon: '', email:'' },
{id:'125', judet: 'hunedoara', luna: 'ianuarie', img: 'images/angajari.jpg', angajator: 'FLORIDAN PANICOM SRL', adresa: 'Str. 8 Martie 2, Ap. 2, C.P. 335800, Loc. PETRILA,tel. 0254550160', locDeMuncaVacant: 'BRUTAR', conditiiDeOcupare: 'Fără Experiență', nrLocuri: '1', telefon: '', email:'' },
{id:'126', judet: 'hunedoara', luna: 'ianuarie', img: 'images/angajari.jpg', angajator: 'NUMERO UNO TEXPORT SRL', adresa: 'Str. Tudor Vladimirescu 2, C.P. 335800, Loc. PETRILA', locDeMuncaVacant: 'BRUTAR', conditiiDeOcupare: 'Începător', nrLocuri: '1', telefon: '', email:'' },
{id:'127', judet: 'hunedoara', luna: 'ianuarie', img: 'images/angajari.jpg', angajator: 'S.C. TREPCA LUMI PAN SRL', adresa: 'Str. Republicii, Bl. 5,parter, C.P. 335200, Loc. BRAD, 0773880061', locDeMuncaVacant: 'BRUTAR', conditiiDeOcupare: 'Fără Experiență', nrLocuri: '1', telefon: '', email:'' },
{id:'128', judet: 'hunedoara', luna: 'ianuarie', img: 'images/angajari.jpg', angajator: 'BONIMET SRL', adresa: 'Str. B-dul IULIU MANIU 6, Loc. DEVA,tel. 0254218440', locDeMuncaVacant: 'BUCATAR', conditiiDeOcupare: 'Fără Experiență', nrLocuri: '2', telefon: '', email:'' },
{id:'129', judet: 'hunedoara', luna: 'ianuarie', img: 'images/angajari.jpg', angajator: 'GRUP EUROPAN PROD SRL', adresa: 'Str. VANATORULUI 9, Loc. HUNEDOARA,tel. 0766525877', locDeMuncaVacant: 'BUCATAR', conditiiDeOcupare: 'Fără Experiență', nrLocuri: '1', telefon: '', email:'' },
{id:'130', judet: 'hunedoara', luna: 'ianuarie', img: 'images/angajari.jpg', angajator: 'RESEDINTA PENTRU SENIORI', adresa: 'Str. Rotarilor 141, C.P. 331116, Loc. HUNEDOARA, 0773762509', locDeMuncaVacant: 'BUCATAR', conditiiDeOcupare: 'Fără Experiență', nrLocuri: '2', telefon: '', email:'' },
{id:'131', judet: 'hunedoara', luna: 'ianuarie', img: 'images/angajari.jpg', angajator: 'RRR BELLAGINA PREST SRL', adresa: 'Str. Barbu Lautaru 24, C.P. 330141, Loc. DEVA', locDeMuncaVacant: 'BUCATAR', conditiiDeOcupare: 'Începător', nrLocuri: '1', telefon: '', email:'' },
{id:'132', judet: 'hunedoara', luna: 'ianuarie', img: 'images/angajari.jpg', angajator: 'MICROCOMPUTER SERVICE SA', adresa: 'STR. PARULUI 8A-8C, Loc. CRAIOVA, Jud. DOLJ,tel. 0751159300', locDeMuncaVacant: 'CABANIER', conditiiDeOcupare: 'Fără Experiență', nrLocuri: '2', telefon: '', email:'' },
{id:'133', judet: 'hunedoara', luna: 'ianuarie', img: 'images/angajari.jpg', angajator: 'M&F MASTER CAFFE SRL', adresa: 'Str. Libertatii 4, C.P. 331128, Loc. HUNEDOARA,tel. 0768103419', locDeMuncaVacant: 'CAMERISTA HOTEL', conditiiDeOcupare: 'Fără Experiență', nrLocuri: '1', telefon: '', email:'' },
{id:'134', judet: 'hunedoara', luna: 'ianuarie', img: 'images/angajari.jpg', angajator: 'PROFI ROM FOOD SRL', adresa: 'Calea Sever Bocu 31, Bl. A1, Loc. TIMIŞOARA, tel. 0372568838', locDeMuncaVacant: 'CASIER', conditiiDeOcupare: 'Fără Experiență', nrLocuri: '5', telefon: '', email:'' },
{id:'135', judet: 'hunedoara', luna: 'ianuarie', img: 'images/angajari.jpg', angajator: 'LOGICOM CONSULTING S.R.L.', adresa: 'AVRAM IANCU 14, Bl. 1, Et. 2, Ap. 5, Loc. HUNEDOARA,tel. 0766634728', locDeMuncaVacant: 'COAFOR', conditiiDeOcupare: 'Fără Experiență', nrLocuri: '2', telefon: '', email:'' },
{id:'136', judet: 'hunedoara', luna: 'ianuarie', img: 'images/angajari.jpg', angajator: 'RUMATI SERVTCOM SRL', adresa: 'Str. RACASTIE 49, Loc. HUNEDOARA,tel. 0742354079', locDeMuncaVacant: 'COAFOR', conditiiDeOcupare: 'Începător', nrLocuri: '1', telefon: '', email:'' },
{id:'137', judet: 'hunedoara', luna: 'ianuarie', img: 'images/angajari.jpg', angajator: 'BASDEEARIS TRAN SRL', adresa: 'Bulevardul Traian 2, C.P. 331050, Loc. HUNEDOARA', locDeMuncaVacant: 'CONDUCATOR ACTIVITATE DE TRANSPORT RUTIER', conditiiDeOcupare: 'Începător', nrLocuri: '1', telefon: '', email:'' },
{id:'138', judet: 'hunedoara', luna: 'ianuarie', img: 'images/angajari.jpg', angajator: 'SC NEW PACK IDEEA SRL', adresa: 'Str. Plopilor 48, Loc. BAIA DE CRIŞ,tel. 0720811005', locDeMuncaVacant: 'CONFECTIONER-ASAMBLOR ARTICOLE DIN CARTON', conditiiDeOcupare: 'Fără Experiență', nrLocuri: '2', telefon: '', email:'' },
{id:'139', judet: 'hunedoara', luna: 'ianuarie', img: 'images/angajari.jpg', angajator: 'DEGO SYSTEM S.R.L.', adresa: 'Str. ALEXANDRU VLAHUŢĂ 8, C.P. 400285, Loc. SIMERIA', locDeMuncaVacant: 'CONFECTIONER-ASAMBLOR ARTICOLE DIN TEXTILE', conditiiDeOcupare: 'Fără Experiență', nrLocuri: '4', telefon: '', email:'' },
{id:'140', judet: 'hunedoara', luna: 'ianuarie', img: 'images/angajari.jpg', angajator: 'DONNA CONFFEZIONI SRL', adresa: 'Str. Calea ZARANDULUI 5, Loc. DEVA,tel. 0759011561', locDeMuncaVacant: 'CONFECTIONER-ASAMBLOR ARTICOLE DIN TEXTILE', conditiiDeOcupare: 'Fără Experiență', nrLocuri: '10', telefon: '', email:'' },
{id:'141', judet: 'hunedoara', luna: 'ianuarie', img: 'images/angajari.jpg', angajator: 'INTERMEDIA CALL 2005 SRL', adresa: 'STR. C-TIN BURSAN 14, Loc. HUNEDOARA,tel. 0723170931', locDeMuncaVacant: 'CONFECTIONER-ASAMBLOR ARTICOLE DIN TEXTILE', conditiiDeOcupare: 'Experimentat', nrLocuri: '2', telefon: '', email:'' },
{id:'142', judet: 'hunedoara', luna: 'ianuarie', img: 'images/angajari.jpg', angajator: 'D.G.A.S.P.C. HUNEDOARA', adresa: 'BLD. IULIU MANIU 18, Loc. DEVA,tel. 254233341', locDeMuncaVacant: 'CONSILIER/EXPERT/INSPECTOR/REFERENT/ECONOMIST ÎN EC GENERALA', conditiiDeOcupare: 'Fără Experiență', nrLocuri: '1', telefon: '', email:'' },
{id:'143', judet: 'hunedoara', luna: 'ianuarie', img: 'images/angajari.jpg', angajator: 'ZUBERECOMEXIM SRL', adresa: 'P-ta. ELIBERARII 5, Loc. HUNEDOARA,tel. 0722307727', locDeMuncaVacant: 'CONSILIER/EXPERT/INSPECTOR/REFERENT/ECONOMIST ÎN EC GENERALA', conditiiDeOcupare: 'Fără Experiență', nrLocuri: '1', telefon: '', email:'' },
{id:'144', judet: 'hunedoara', luna: 'ianuarie', img: 'images/angajari.jpg', angajator: 'SARMISMOB SA', adresa: 'Str. DR. VICTOR SUIAGA 2, Loc. DEVA,tel. 0737034621', locDeMuncaVacant: 'CONSILIER/EXPERT/INSPECTOR/REFERENT/ECONOMIST ÎN GEST ECONOMICA', conditiiDeOcupare: 'Fără Experiență', nrLocuri: '1', telefon: '', email:'' },
{id:'145', judet: 'hunedoara', luna: 'ianuarie', img: 'images/angajari.jpg', angajator: 'SPITALUL JUDETEAN DE URGENTA D', adresa: 'Str. 1 Decembrie 58, Loc. DEVA,tel. 0254/215051', locDeMuncaVacant: 'CONSILIER/EXPERT/INSPECTOR/REFERENT/ECONOMIST ÎN MANAGEMENT', conditiiDeOcupare: 'Fără Experiență', nrLocuri: '1', telefon: '', email:'' },
{id:'146', judet: 'hunedoara', luna: 'ianuarie', img: 'images/angajari.jpg', angajator: 'CENTRUL DE AFACERI MASTER', adresa: 'STR. IMPARATUL TRAIAN 42, Loc. DEVA,tel. 218111', locDeMuncaVacant: 'CONSULTANT ÎN MANAGEMENT', conditiiDeOcupare: 'Experimentat', nrLocuri: '3', telefon: '', email:'' },
{id:'147', judet: 'hunedoara', luna: 'ianuarie', img: 'images/angajari.jpg', angajator: 'EDOROM METAL SRL', adresa: 'STR. CALEA ROMANILOR 28, Loc. GEOAGIU,tel. 0254248450', locDeMuncaVacant: 'CONTABIL', conditiiDeOcupare: 'Fără Experiență', nrLocuri: '2', telefon: '', email:'' },
{id:'148', judet: 'hunedoara', luna: 'ianuarie', img: 'images/angajari.jpg', angajator: 'RUMATI SERVTCOM SRL', adresa: 'Str. RACASTIE 49, Loc. HUNEDOARA,tel. 0742354079', locDeMuncaVacant: 'CONTABIL', conditiiDeOcupare: 'Experiență Medie', nrLocuri: '1', telefon: '', email:'' },
{id:'149', judet: 'hunedoara', luna: 'ianuarie', img: 'images/angajari.jpg', angajator: 'SANEX COM SRL', adresa: 'Str. M.KOGALNICEANU, Bl. 14, Et. P, Loc. DEVA,tel. 0254215858', locDeMuncaVacant: 'CONTABIL', conditiiDeOcupare: 'Fără Experiență', nrLocuri: '1', telefon: '', email:'' },
{id:'150', judet: 'hunedoara', luna: 'ianuarie', img: 'images/angajari.jpg', angajator: 'TIN LAVIR SERV SRL', adresa: 'Str. LUNCA 8, Loc. BRAD,tel. 0254229401', locDeMuncaVacant: 'CONTABIL', conditiiDeOcupare: 'Experiență Medie', nrLocuri: '1', telefon: '', email:'' },
{id:'151', judet: 'hunedoara', luna: 'ianuarie', img: 'images/angajari.jpg', angajator: 'ASSA ABLOY ENTRANCE SYSTEMS PRODUCTION ROMANIA S.R.L.', adresa: 'Str. Peştişul Mare 363, C.P. 331008, Loc. HUNEDOARA,tel. 0354808380', locDeMuncaVacant: 'CONTROLOR CALITATE', conditiiDeOcupare: 'Fără Experiență', nrLocuri: '1', telefon: '', email:'' },
{id:'152', judet: 'hunedoara', luna: 'ianuarie', img: 'images/angajari.jpg', angajator: 'INTERMEDIA CALL 2005 SRL', adresa: 'STR. C-TIN BURSAN 14, Loc. HUNEDOARA,tel. 0723170931', locDeMuncaVacant: 'CONTROLOR CALITATE', conditiiDeOcupare: 'Experimentat', nrLocuri: '1', telefon: '', email:'' },
{id:'153', judet: 'hunedoara', luna: 'ianuarie', img: 'images/angajari.jpg', angajator: 'SC ROM LEATHER SOFAS SRL', adresa: 'Satul Soimus 409, Loc. DEVA,tel. 0254237411', locDeMuncaVacant: 'CONTROLOR CALITATE', conditiiDeOcupare: 'Fără Experiență', nrLocuri: '2', telefon: '', email:'' },
{id:'154', judet: 'hunedoara', luna: 'ianuarie', img: 'images/angajari.jpg', angajator: 'RUMATI SERVTCOM SRL', adresa: 'Str. RACASTIE 49, Loc. HUNEDOARA,tel. 0742354079', locDeMuncaVacant: 'CONTROLOR TRAFIC', conditiiDeOcupare: 'Începător', nrLocuri: '1', telefon: '', email:'' },
{id:'155', judet: 'hunedoara', luna: 'ianuarie', img: 'images/angajari.jpg', angajator: 'LOGICOM CONSULTING S.R.L.', adresa: 'AVRAM IANCU 14, Bl. 1, Et. 2, Ap. 5, Loc. HUNEDOARA,tel. 0766634728', locDeMuncaVacant: 'COSMETICIAN', conditiiDeOcupare: 'Fără Experiență', nrLocuri: '2', telefon: '', email:'' },
{id:'156', judet: 'hunedoara', luna: 'ianuarie', img: 'images/angajari.jpg', angajator: 'ASSA ABLOY ENTRANCE SYSTEMS PRODUCTION ROMANIA S.R.L.', adresa: 'Str. Peştişul Mare 363, C.P. 331008, Loc. HUNEDOARA,tel. 0354808380', locDeMuncaVacant: 'CURATITOR-SABLATOR', conditiiDeOcupare: 'Fără Experiență', nrLocuri: '1', telefon: '', email:'' },
{id:'157', judet: 'hunedoara', luna: 'ianuarie', img: 'images/angajari.jpg', angajator: 'ROSTYLE ALEX SRL', adresa: 'Str. ABATORULUI 3, Loc. BRAD,tel. 0254612768', locDeMuncaVacant: 'CUSATOR PIESE DIN PIELE SI ÎNLOCUITORI', conditiiDeOcupare: 'Fără Experiență', nrLocuri: '10', telefon: '', email:'' },
{id:'158', judet: 'hunedoara', luna: 'ianuarie', img: 'images/angajari.jpg', angajator: 'CENTRU DE REMORCI TOP S.R.L.', adresa: 'SANTUHALM 30B, Et. Parter, Loc. DEVA', locDeMuncaVacant: 'DIRECTOR COMERCIAL', conditiiDeOcupare: 'Fără Experiență', nrLocuri: '1', telefon: '', email:'' },
{id:'159', judet: 'hunedoara', luna: 'ianuarie', img: 'images/angajari.jpg', angajator: 'SC BIO NATURA PLANT SRL', adresa: 'Str. Uliţa Mare, Loc. DEVA,tel. 0725276767', locDeMuncaVacant: 'DIRECTOR COMERCIAL', conditiiDeOcupare: 'Fără Experiență', nrLocuri: '1', telefon: '', email:'' },
{id:'160', judet: 'hunedoara', luna: 'ianuarie', img: 'images/angajari.jpg', angajator: 'D&D KIDS', adresa: 'Piaţa Unirii 20, Bl. 20, Et. P, C.P. 335900, Loc. SIMERIA', locDeMuncaVacant: 'DIRECTOR SOCIETATE COMERCIALA', conditiiDeOcupare: 'Experiență Medie', nrLocuri: '1', telefon: '', email:'' },
{id:'161', judet: 'hunedoara', luna: 'ianuarie', img: 'images/angajari.jpg', angajator: 'GEDI SECURITY', adresa: 'Str. Horea 212, C.P. 330139, Loc. DEVA', locDeMuncaVacant: 'DISPECER CENTRU DE ALARMA', conditiiDeOcupare: 'Fără Experiență', nrLocuri: '1', telefon: '', email:'' },
{id:'162', judet: 'hunedoara', luna: 'ianuarie', img: 'images/angajari.jpg', angajator: 'ADINA MEGATRUST S.R.L.', adresa: 'TRANDAFIRILOR 1, Bl. 14, Sc. B, Ap. 23, Loc. HUNEDOARA,tel. 0773926749', locDeMuncaVacant: 'DULGHER (EXCLUSIV RESTAURATOR)', conditiiDeOcupare: 'Fără Experiență', nrLocuri: '1', telefon: '', email:'' },
{id:'163', judet: 'hunedoara', luna: 'ianuarie', img: 'images/angajari.jpg', angajator: 'ALIM COM MH SRL', adresa: 'B-dul MIHAI VITEAZU 43, Loc. HUNEDOARA,tel. 0354881118', locDeMuncaVacant: 'ELECTRICIAN DE ÎNTRETINERE SI REPARATII', conditiiDeOcupare: 'Fără Experiență', nrLocuri: '2', telefon: '', email:'' },
{id:'164', judet: 'hunedoara', luna: 'ianuarie', img: 'images/angajari.jpg', angajator: 'DOR PLURICOMPREST SRL', adresa: 'B-dul DECEBAL-COMPLEX COMERCIAL CENTRAL, Et. 1, Loc. DEVA,tel. 0254230630', locDeMuncaVacant: 'ELECTRICIAN DE ÎNTRETINERE SI REPARATII', conditiiDeOcupare: 'Fără Experiență', nrLocuri: '1', telefon: '', email:'' },
{id:'165', judet: 'hunedoara', luna: 'ianuarie', img: 'images/angajari.jpg', angajator: 'IMPERIAL PG SRL', adresa: 'Str. DACIA 2, Loc. PETROŞANI,tel. 0721424444', locDeMuncaVacant: 'ELECTRICIAN DE ÎNTRETINERE SI REPARATII', conditiiDeOcupare: 'Fără Experiență', nrLocuri: '1', telefon: '', email:'' },
{id:'166', judet: 'hunedoara', luna: 'ianuarie', img: 'images/angajari.jpg', angajator: 'MIRA MON PRESTCOM SRL', adresa: 'Bulevardul Mihai Viteazu 46, C.P. 331039, Loc. HUNEDOARA,tel. 0354881118', locDeMuncaVacant: 'ELECTRICIAN DE ÎNTRETINERE SI REPARATII', conditiiDeOcupare: 'Fără Experiență', nrLocuri: '3', telefon: '', email:'' },
{id:'167', judet: 'hunedoara', luna: 'ianuarie', img: 'images/angajari.jpg', angajator: 'OPF AIR SYSTEMS CO S.R.L.', adresa: 'Str. PIATA IANCU DE HUNEDOARA 1B, Loc. HUNEDOARA,tel. 0726370555', locDeMuncaVacant: 'ELECTRICIAN DE ÎNTRETINERE SI REPARATII', conditiiDeOcupare: 'Fără Experiență', nrLocuri: '1', telefon: '', email:'' },
{id:'168', judet: 'hunedoara', luna: 'ianuarie', img: 'images/angajari.jpg', angajator: 'SARMISMOB SA', adresa: 'Str. DR. VICTOR SUIAGA 2, Loc. DEVA,tel. 0737034621', locDeMuncaVacant: 'ELECTRICIAN DE ÎNTRETINERE SI REPARATII', conditiiDeOcupare: 'Fără Experiență', nrLocuri: '1', telefon: '', email:'' },
{id:'169', judet: 'hunedoara', luna: 'ianuarie', img: 'images/angajari.jpg', angajator: 'ADEC ELECTRO S.R.L.', adresa: 'MURESULUI 88, Bl. C43, Sc. A, Et. 2, Ap. 10, Loc. HUNEDOARA,tel. 0745587381', locDeMuncaVacant: 'ELECTRICIAN ÎN CONSTRUCTII', conditiiDeOcupare: 'Începător', nrLocuri: '1', telefon: '', email:'' },
{id:'170', judet: 'hunedoara', luna: 'ianuarie', img: 'images/angajari.jpg', angajator: 'TIN LAVIR CLIMATIZARE SRL', adresa: 'Str. GENERAL VASILE MILEA, Bl. B5, Sc. 1, Et. P, Ap. 3, Loc. BRAD,tel. 0744636434', locDeMuncaVacant: 'ELECTRICIAN ÎN CONSTRUCTII', conditiiDeOcupare: 'Fără Experiență', nrLocuri: '1', telefon: '', email:'' },
{id:'171', judet: 'hunedoara', luna: 'ianuarie', img: 'images/angajari.jpg', angajator: 'ALIM COM MH SRL', adresa: 'B-dul MIHAI VITEAZU 43, Loc. HUNEDOARA,tel. 0354881118', locDeMuncaVacant: 'ELECTROMECANIC', conditiiDeOcupare: 'Fără Experiență', nrLocuri: '1', telefon: '', email:'' },
{id:'172', judet: 'hunedoara', luna: 'ianuarie', img: 'images/angajari.jpg', angajator: 'MIRA MON PRESTCOM SRL', adresa: 'Bulevardul Mihai Viteazu 46, C.P. 331039, Loc. HUNEDOARA,tel. 0354881118', locDeMuncaVacant: 'EXCAVATORIST PENTRU EXCAVATOARE CU ROTOR DE MARE CAPACITATE', conditiiDeOcupare: 'Fără Experiență', nrLocuri: '2', telefon: '', email:'' },
{id:'173', judet: 'hunedoara', luna: 'ianuarie', img: 'images/angajari.jpg', angajator: 'ASOCIATIA MERIT', adresa: 'Bulevardul 22 Decembrie 37A, Bl. CLADIREA CEPROMIN, Ap. 221, Loc. DEVA,tel. 0254218111', locDeMuncaVacant: 'FEMEIE DE SERVICIU', conditiiDeOcupare: 'Fără Experiență', nrLocuri: '2', telefon: '', email:'' },
{id:'174', judet: 'hunedoara', luna: 'ianuarie', img: 'images/angajari.jpg', angajator: 'ORASUL CALAN', adresa: 'Str. GĂRII 1, Loc. CĂLAN', locDeMuncaVacant: 'FEMEIE DE SERVICIU', conditiiDeOcupare: 'Începător', nrLocuri: '1', telefon: '', email:'' },
{id:'175', judet: 'hunedoara', luna: 'ianuarie', img: 'images/angajari.jpg', angajator: 'RESEDINTA PENTRU SENIORI', adresa: 'Str. Rotarilor 141, C.P. 331116, Loc. HUNEDOARA,tel. 0773762509', locDeMuncaVacant: 'FEMEIE DE SERVICIU', conditiiDeOcupare: 'Fără Experiență', nrLocuri: '2', telefon: '', email:'' },
{id:'176', judet: 'hunedoara', luna: 'ianuarie', img: 'images/angajari.jpg', angajator: 'SARMISMOB SA', adresa: 'Str. DR. VICTOR SUIAGA 2, Loc. DEVA,tel. 0737034621', locDeMuncaVacant: 'FEMEIE DE SERVICIU', conditiiDeOcupare: 'Fără Experiență', nrLocuri: '1', telefon: '', email:'' },
{id:'177', judet: 'hunedoara', luna: 'ianuarie', img: 'images/angajari.jpg', angajator: 'DONNA CONFFEZIONI SRL', adresa: 'Str. Calea ZARANDULUI 5, Loc. DEVA,tel. 0759011561', locDeMuncaVacant: 'FINISOR TEXTILE (VOPSITOR, IMPRIMEUR)', conditiiDeOcupare: 'Fără Experiență', nrLocuri: '3', telefon: '', email:'' },
{id:'178', judet: 'hunedoara', luna: 'ianuarie', img: 'images/angajari.jpg', angajator: 'IMPERIAL PG SRL', adresa: 'Str. DACIA 2, Loc. PETROŞANI,tel. 0721424444', locDeMuncaVacant: 'FREZOR UNIVERSAL', conditiiDeOcupare: 'Începător', nrLocuri: '1', telefon: '', email:'' },
{id:'179', judet: 'hunedoara', luna: 'ianuarie', img: 'images/angajari.jpg', angajator: 'RUMATI SERVTCOM SRL', adresa: 'Str. RACASTIE 49, Loc. HUNEDOARA,tel. 0742354079', locDeMuncaVacant: 'FRIZER', conditiiDeOcupare: 'Fără Experiență', nrLocuri: '2', telefon: '', email:'' },
{id:'180', judet: 'hunedoara', luna: 'ianuarie', img: 'images/angajari.jpg', angajator: 'ASKANIA PRODISTRIB SRL', adresa: 'STR. PROGRESULUI, Bl. D, Sc. 3, Ap. 21, Loc. DEVA,tel. 0736395556', locDeMuncaVacant: 'FUNCTIONAR ADMINISTRATIV', conditiiDeOcupare: 'Fără Experiență', nrLocuri: '1', telefon: '', email:'' },
{id:'181', judet: 'hunedoara', luna: 'ianuarie', img: 'images/angajari.jpg', angajator: 'CASA CONFORT SRL', adresa: 'Str. GHEORGHE DOJA 2323, Loc. ORĂŞTIE,tel. 0741020039', locDeMuncaVacant: 'FUNCTIONAR ADMINISTRATIV', conditiiDeOcupare: 'Fără Experiență', nrLocuri: '1', telefon: '', email:'' },
{id:'182', judet: 'hunedoara', luna: 'ianuarie', img: 'images/angajari.jpg', angajator: 'LOTUS TRANS EXPO TEHNICA', adresa: 'Str. Eroilor, Bl. 38, Sc. A, Et. 3, Ap. 7, C.P. 335700, Loc. ORĂŞTIE', locDeMuncaVacant: 'FUNCTIONAR ADMINISTRATIV', conditiiDeOcupare: 'Fără Experiență', nrLocuri: '1', telefon: '', email:'' },
{id:'183', judet: 'hunedoara', luna: 'ianuarie', img: 'images/angajari.jpg', angajator: 'SARMISMOB SA', adresa: 'Str. DR. VICTOR SUIAGA 2, Loc. DEVA,tel. 0737034621', locDeMuncaVacant: 'GESTIONAR DEPOZIT', conditiiDeOcupare: 'Fără Experiență', nrLocuri: '1', telefon: '', email:'' },
{id:'184', judet: 'hunedoara', luna: 'ianuarie', img: 'images/angajari.jpg', angajator: 'NILEX LOGISTIC SRL', adresa: 'Str. Amurgului 47, Ap. 3, C.P. 300278, Loc. TIMIŞOARA, Jud. TIMIŞ', locDeMuncaVacant: 'ÎNCARCATOR-DESCARCATOR', conditiiDeOcupare: 'Fără Experiență', nrLocuri: '1', telefon: '', email:'' },
{id:'185', judet: 'hunedoara', luna: 'ianuarie', img: 'images/angajari.jpg', angajator: 'APA PROD SA', adresa: 'CALEA ZARANDULUI 43, Loc. DEVA,tel. 0254222345', locDeMuncaVacant: 'ÎNCASATOR SI CITITOR CONTOARE DE ENERGIE ELECTRICA, GAZE, APA', conditiiDeOcupare: 'Începător', nrLocuri: '1', telefon: '', email:'' },
{id:'186', judet: 'hunedoara', luna: 'ianuarie', img: 'images/angajari.jpg', angajator: 'APA PROD SA', adresa: 'CALEA ZARANDULUI 43, Loc. DEVA,tel. 0254222345', locDeMuncaVacant: 'INGINER ÎN INDUSTRIA ALIMENTARA', conditiiDeOcupare: 'Începător', nrLocuri: '2', telefon: '', email:'' },
{id:'187', judet: 'hunedoara', luna: 'ianuarie', img: 'images/angajari.jpg', angajator: 'INSTALATII GEVIS SRL', adresa: 'Str. ARDEALULUI 1, Loc. DEVA,tel. 0254225049', locDeMuncaVacant: 'INGINER INSTALATII PENTRU CONSTRUCTII', conditiiDeOcupare: 'Fără Experiență', nrLocuri: '1', telefon: '', email:'' },
{id:'188', judet: 'hunedoara', luna: 'ianuarie', img: 'images/angajari.jpg', angajator: 'ALIM COM MH SRL', adresa: 'B-dul MIHAI VITEAZU 43, Loc. HUNEDOARA,tel. 0354881118', locDeMuncaVacant: 'INGINER MECANIC', conditiiDeOcupare: 'Fără Experiență', nrLocuri: '2', telefon: '', email:'' },
{id:'189', judet: 'hunedoara', luna: 'ianuarie', img: 'images/angajari.jpg', angajator: 'CEPROMIN SA', adresa: 'Str. 22 DECEMBRIE 37A, Loc. DEVA,tel. 0254214892', locDeMuncaVacant: 'INGINER MECANIC', conditiiDeOcupare: 'Experiență Medie', nrLocuri: '1', telefon: '', email:'' },
{id:'190', judet: 'hunedoara', luna: 'ianuarie', img: 'images/angajari.jpg', angajator: 'GASTROTUR BALNEO', adresa: 'Str. Germisara 65A, Loc. GEOAGIU-BĂI,tel. 0740044871', locDeMuncaVacant: 'ÎNGRIJITOR CLADIRI', conditiiDeOcupare: 'Fără Experiență', nrLocuri: '1', telefon: '', email:'' },
{id:'191', judet: 'hunedoara', luna: 'ianuarie', img: 'images/angajari.jpg', angajator: 'RESTAURANT CARO SRL', adresa: 'B-DUL LIBERTATII, Bl. L2, Ap. 14, Loc. DEVA,tel. 0254218630', locDeMuncaVacant: 'ÎNSOTITOR', conditiiDeOcupare: 'Fără Experiență', nrLocuri: '2', telefon: '', email:'' },
{id:'192', judet: 'hunedoara', luna: 'ianuarie', img: 'images/angajari.jpg', angajator: 'PRIORITAR IMPEX SRL', adresa: 'Str. BRADULUI (PUNCT TERMIC NR. 2), Loc. CĂLAN', locDeMuncaVacant: 'INSPECTOR DOCUMENTE SECRETE', conditiiDeOcupare: 'Experiență Medie', nrLocuri: '4', telefon: '', email:'' },
{id:'193', judet: 'hunedoara', luna: 'ianuarie', img: 'images/angajari.jpg', angajator: 'SARMISMOB SA', adresa: 'Str. DR. VICTOR SUIAGA 2, Loc. DEVA,tel. 0737034621', locDeMuncaVacant: 'INSPECTOR ÎN DOMENIUL SECURITATII SI SANATATII ÎN MUNCA', conditiiDeOcupare: 'Fără Experiență', nrLocuri: '1', telefon: '', email:'' },
{id:'194', judet: 'hunedoara', luna: 'ianuarie', img: 'images/angajari.jpg', angajator: 'ALIM COM MH SRL', adresa: 'B-dul MIHAI VITEAZU 43, Loc. HUNEDOARA,tel. 0354881118', locDeMuncaVacant: 'INSTALATOR ÎNCALZIRE CENTRALA SI GAZE', conditiiDeOcupare: 'Fără Experiență', nrLocuri: '5', telefon: '', email:'' },
{id:'195', judet: 'hunedoara', luna: 'ianuarie', img: 'images/angajari.jpg', angajator: 'MIRA MON PRESTCOM SRL', adresa: 'Bdul Mihai Viteazu 46, C.P. 331039, Loc. HUNEDOARA,tel. 0354881118', locDeMuncaVacant: 'INSTALATOR ÎNCALZIRE CENTRALA SI GAZE', conditiiDeOcupare: 'Fără Experiență', nrLocuri: '3', telefon: '', email:'' },
{id:'196', judet: 'hunedoara', luna: 'ianuarie', img: 'images/angajari.jpg', angajator: 'OLY MAN INSTAL SRL-D', adresa: 'Str. Ion Luca Caragiale, Bl. 2, Sc. C, Et. 3, Ap. 16, C.P. 335900, Loc. SIMERIA,tel. 0737664532', locDeMuncaVacant: 'INSTALATOR INSTALATII TEHNICO-SANITARE SI GAZE', conditiiDeOcupare: 'Începător', nrLocuri: '1', telefon: '', email:'' },
{id:'197', judet: 'hunedoara', luna: 'ianuarie', img: 'images/angajari.jpg', angajator: 'RECOM SID SA', adresa: 'Str. P-ta IANCU DE HUNEDOARA 1, Loc. HUNEDOARA,tel. 0254207022', locDeMuncaVacant: 'LACATUS CONSTRUCTII METALICE SI NAVALE', conditiiDeOcupare: 'Fără Experiență', nrLocuri: '5', telefon: '', email:'' },
{id:'198', judet: 'hunedoara', luna: 'ianuarie', img: 'images/angajari.jpg', angajator: 'ASSA ABLOY ENTRANCE SYSTEMS PRODUCTION ROMANIA S.R.L.', adresa: 'Str. Peştişul Mare 363, C.P. 331008, Loc. HUNEDOARA,tel. 0354808380', locDeMuncaVacant: 'LACATUS MECANIC', conditiiDeOcupare: 'Fără Experiență', nrLocuri: '10', telefon: '', email:'' },
{id:'199', judet: 'hunedoara', luna: 'ianuarie', img: 'images/angajari.jpg', angajator: 'ENERGOGRUP INSTALAŢII MONTAJ', adresa: 'Str. UNIRII 130, Loc. ORĂŞTIE', locDeMuncaVacant: 'LACATUS MECANIC', conditiiDeOcupare: 'Fără Experiență', nrLocuri: '1', telefon: '', email:'' },
{id:'200', judet: 'hunedoara', luna: 'ianuarie', img: 'images/angajari.jpg', angajator: 'SARMISMOB SA', adresa: 'Str. DR. VICTOR SUIAGA 2, Loc. DEVA,tel. 0737034621', locDeMuncaVacant: 'LACATUS MECANIC', conditiiDeOcupare: 'Fără Experiență', nrLocuri: '1', telefon: '', email:'' },
{id:'201', judet: 'hunedoara', luna: 'ianuarie', img: 'images/angajari.jpg', angajator: 'SC DEVA STEEL CORPORATION SRL', adresa: 'Piaţa IANCU DE HUNEDOARA 1, Loc. HUNEDOARA,tel. 0723819493', locDeMuncaVacant: 'LACATUS MECANIC', conditiiDeOcupare: 'Începător', nrLocuri: '5', telefon: '', email:'' },
{id:'202', judet: 'hunedoara', luna: 'ianuarie', img: 'images/angajari.jpg', angajator: 'UZINA MECANICA ORASTIE SA', adresa: 'Str. NICOLAE TITULESCU 60, Loc. ORĂŞTIE', locDeMuncaVacant: 'LACATUS MECANIC', conditiiDeOcupare: 'Fără Experiență', nrLocuri: '2', telefon: '', email:'' },
{id:'203', judet: 'hunedoara', luna: 'ianuarie', img: 'images/angajari.jpg', angajator: 'RECOM SID SA', adresa: 'Str. P-ta IANCU DE HUNEDOARA 1, Loc. HUNEDOARA,tel. 0254207022', locDeMuncaVacant: 'LACATUS MECANIC DE ÎNTRETINERE SI REPARATII UNIVERSALE', conditiiDeOcupare: 'Fără Experiență', nrLocuri: '5', telefon: '', email:'' },
{id:'204', judet: 'hunedoara', luna: 'ianuarie', img: 'images/angajari.jpg', angajator: 'MAVE STIL SRL', adresa: 'STR. MINERULUI, Bl. E, Sc. C, Et. P, Ap. 50, Loc. DEVA,tel. 0254222863', locDeMuncaVacant: 'LACATUS-MONTATOR', conditiiDeOcupare: 'Fără Experiență', nrLocuri: '1', telefon: '', email:'' },
{id:'205', judet: 'hunedoara', luna: 'ianuarie', img: 'images/angajari.jpg', angajator: 'TERACO PROD SRL', adresa: 'Bulevardul Libertatii 6, Ap. 33, C.P. 331032, Loc. HUNEDOARA,tel. 0723382241', locDeMuncaVacant: 'LEGATOR DE SARCINA', conditiiDeOcupare: 'Fără Experiență', nrLocuri: '4', telefon: '', email:'' },
{id:'206', judet: 'hunedoara', luna: 'ianuarie', img: 'images/angajari.jpg', angajator: 'ALBATROS EXPRESS S.R.L.', adresa: 'VICTORIEI 5, Loc. HUNEDOARA,tel. 0254711220', locDeMuncaVacant: 'LUCRATOR BUCATARIE (SPALATOR VASE MARI)', conditiiDeOcupare: 'Fără Experiență', nrLocuri: '1', telefon: '', email:'' },
{id:'207', judet: 'hunedoara', luna: 'ianuarie', img: 'images/angajari.jpg', angajator: 'BONIMET SRL', adresa: 'Str. B-dul IULIU MANIU 6, Loc. DEVA,tel. 0254218440', locDeMuncaVacant: 'LUCRATOR BUCATARIE (SPALATOR VASE MARI)', conditiiDeOcupare: 'Fără Experiență', nrLocuri: '2', telefon: '', email:'' },
{id:'208', judet: 'hunedoara', luna: 'ianuarie', img: 'images/angajari.jpg', angajator: 'IVA XSOUND SRL', adresa: 'STR. ANTON PANN 7676, Loc. PETROŞANI,tel. 0744574440', locDeMuncaVacant: 'LUCRATOR BUCATARIE (SPALATOR VASE MARI)', conditiiDeOcupare: 'Fără Experiență', nrLocuri: '1', telefon: '', email:'' },
{id:'209', judet: 'hunedoara', luna: 'ianuarie', img: 'images/angajari.jpg', angajator: 'M&F MASTER CAFFE SRL', adresa: 'Str. Libertatii 4, C.P. 331128, Loc. HUNEDOARA,tel. 0768103419', locDeMuncaVacant: 'LUCRATOR BUCATARIE (SPALATOR VASE MARI)', conditiiDeOcupare: 'Fără Experiență', nrLocuri: '2', telefon: '', email:'' },
{id:'210', judet: 'hunedoara', luna: 'ianuarie', img: 'images/angajari.jpg', angajator: 'STAR TOUR SRL', adresa: 'Str. ARCHIA 92, Loc. DEVA', locDeMuncaVacant: 'LUCRATOR BUCATARIE (SPALATOR VASE MARI)', conditiiDeOcupare: 'Fără Experiență', nrLocuri: '1', telefon: '', email:'' },
{id:'211', judet: 'hunedoara', luna: 'ianuarie', img: 'images/angajari.jpg', angajator: 'ANTICA BRUTARIE', adresa: 'Str. NICOLAE BALCESCU 9A, C.P. 335700, Loc. ORĂŞTIE,tel. 0749978724', locDeMuncaVacant: 'LUCRATOR COMERCIAL', conditiiDeOcupare: 'Fără Experiență', nrLocuri: '1', telefon: '', email:'' },
{id:'212', judet: 'hunedoara', luna: 'ianuarie', img: 'images/angajari.jpg', angajator: 'BARIL FORTE SRL', adresa: 'STR. AUGUSTIN BENA 7979, Loc. SEBEŞ, Jud. ALBA,tel. 0258732057', locDeMuncaVacant: 'LUCRATOR COMERCIAL', conditiiDeOcupare: 'Începător', nrLocuri: '1', telefon: '', email:'' },
{id:'213', judet: 'hunedoara', luna: 'ianuarie', img: 'images/angajari.jpg', angajator: 'BIA MINIMARKET JUNIOR', adresa: 'Bdul Dacia, Bl. 11, Ap. PARTER, C.P. 330106, Loc. DEVA,tel. 0724099101', locDeMuncaVacant: 'LUCRATOR COMERCIAL', conditiiDeOcupare: 'Fără Experiență', nrLocuri: '1', telefon: '', email:'' },
{id:'214', judet: 'hunedoara', luna: 'ianuarie', img: 'images/angajari.jpg', angajator: 'NAIRDA VIO PAN S.R.L.-D.', adresa: 'Str. Gen. Vasile Milea, Bl. D2, Et. PARTER, Loc. BRAD', locDeMuncaVacant: 'LUCRATOR COMERCIAL', conditiiDeOcupare: 'Fără Experiență', nrLocuri: '1', telefon: '', email:'' },
{id:'215', judet: 'hunedoara', luna: 'ianuarie', img: 'images/angajari.jpg', angajator: 'NOBLESSE FLOWERS & EVENTS S.R.L.-D.', adresa: 'Str. PANSELUŢELOR, Bl. 27, Sc. 3,PARTER, Ap. 30, Loc. DEVA', locDeMuncaVacant: 'LUCRATOR COMERCIAL', conditiiDeOcupare: 'Fără Experiență', nrLocuri: '1', telefon: '', email:'' },
{id:'216', judet: 'hunedoara', luna: 'ianuarie', img: 'images/angajari.jpg', angajator: 'OUTLET DIVISION S.R.L.', adresa: 'AVIATORILOR, Bl. 28, Sc. 1, Et. 3, Ap. 14, Loc. PETROŞANI', locDeMuncaVacant: 'LUCRATOR COMERCIAL', conditiiDeOcupare: 'Fără Experiență', nrLocuri: '1', telefon: '', email:'' },
{id:'217', judet: 'hunedoara', luna: 'ianuarie', img: 'images/angajari.jpg', angajator: 'SENZITIV SRL', adresa: 'Str. STADIONULUI 14, Ap. 2, Loc. PETRILA,tel. 0722464455', locDeMuncaVacant: 'LUCRATOR COMERCIAL', conditiiDeOcupare: 'Fără Experiență', nrLocuri: '2', telefon: '', email:'' },
{id:'218', judet: 'hunedoara', luna: 'ianuarie', img: 'images/angajari.jpg', angajator: 'VLADYX WORLD', adresa: 'Str. Ulpia 25, Ap. 7, C.P. 330013, Loc. DEVA,tel. 0744505284', locDeMuncaVacant: 'LUCRATOR COMERCIAL', conditiiDeOcupare: 'Începător', nrLocuri: '1', telefon: '', email:'' },
{id:'219', judet: 'hunedoara', luna: 'ianuarie', img: 'images/angajari.jpg', angajator: 'BRAI-CATA SRL', adresa: 'Str. VIRTUŢII 48, Loc. SECTORUL 6, Jud. BUCUREŞTI,tel. 0239606008', locDeMuncaVacant: 'LUCRATOR OPERATIV PENTRU AUTOCOMPACTOARE', conditiiDeOcupare: 'Fără Experiență', nrLocuri: '10', telefon: '', email:'' },
{id:'220', judet: 'hunedoara', luna: 'ianuarie', img: 'images/angajari.jpg', angajator: 'VULTURUL IMPEX SRL', adresa: 'Str. STERMINOS 134, Loc. URICANI', locDeMuncaVacant: 'LUCRATOR PENSIUNE TURISTICA', conditiiDeOcupare: 'Fără Experiență', nrLocuri: '4', telefon: '', email:'' },
{id:'221', judet: 'hunedoara', luna: 'ianuarie', img: 'images/angajari.jpg', angajator: 'CADELPLAST GROUP SRL', adresa: 'Str. Carpati 51-55, C.P. 331032, Loc. HUNEDOARA,tel. 0254716518', locDeMuncaVacant: 'LUCRATOR SORTATOR DESEURI RECICLABILE', conditiiDeOcupare: 'Fără Experiență', nrLocuri: '2', telefon: '', email:'' },
{id:'222', judet: 'hunedoara', luna: 'ianuarie', img: 'images/angajari.jpg', angajator: 'CASTECO INVEST SRL', adresa: 'Str. MURESULUI 18, Loc. DEVA,tel. 0254/231888', locDeMuncaVacant: 'LUCRATOR SORTATOR DESEURI RECICLABILE', conditiiDeOcupare: 'Fără Experiență', nrLocuri: '2', telefon: '', email:'' },
{id:'223', judet: 'hunedoara', luna: 'ianuarie', img: 'images/angajari.jpg', angajator: 'MACON SRL', adresa: 'STR. SANTUHALM 1, Loc. DEVA,tel. 0254213930', locDeMuncaVacant: 'MACARAGIU', conditiiDeOcupare: 'Fără Experiență', nrLocuri: '3', telefon: '', email:'' },
{id:'224', judet: 'hunedoara', luna: 'ianuarie', img: 'images/angajari.jpg', angajator: 'INTERMEDIA CALL 2005 SRL', adresa: 'STR. C-TIN BURSAN 14, Loc. HUNEDOARA,tel. 0723170931', locDeMuncaVacant: 'MAGAZINER', conditiiDeOcupare: 'Experimentat', nrLocuri: '1', telefon: '', email:'' },
{id:'225', judet: 'hunedoara', luna: 'ianuarie', img: 'images/angajari.jpg', angajator: 'RESITEX GROUP S.R.L.', adresa: 'B-dul IULIU MANIU, Bl. 6, Sc. 1, Ap. 8, Loc. DEVA,tel. 0354414150', locDeMuncaVacant: 'MAGAZINER', conditiiDeOcupare: 'Fără Experiență', nrLocuri: '1', telefon: '', email:'' },
{id:'226', judet: 'hunedoara', luna: 'ianuarie', img: 'images/angajari.jpg', angajator: 'DONNA CONFFEZIONI SRL', adresa: 'Str. Calea ZARANDULUI 5, Loc. DEVA,tel. 0759011561', locDeMuncaVacant: 'MAISTRU ÎN INDUSTRIILE TEXTILA, PIELARIE', conditiiDeOcupare: 'Fără Experiență', nrLocuri: '1', telefon: '', email:'' },
{id:'227', judet: 'hunedoara', luna: 'ianuarie', img: 'images/angajari.jpg', angajator: 'INTERMEDIA CALL 2005 SRL', adresa: 'STR. C-TIN BURSAN 14, Loc. HUNEDOARA,tel. 0723170931', locDeMuncaVacant: 'MAISTRU ÎN INDUSTRIILE TEXTILA, PIELARIE', conditiiDeOcupare: 'Fără Experiență', nrLocuri: '1', telefon: '', email:'' },
{id:'228', judet: 'hunedoara', luna: 'ianuarie', img: 'images/angajari.jpg', angajator: 'DIACOSTAMPET SRL', adresa: 'LIVEZENI 33, Et. PARTER, Ap. 3, Loc. PETROŞANI,tel. 0354100678', locDeMuncaVacant: 'MAISTRU NORMATOR', conditiiDeOcupare: 'Fără Experiență', nrLocuri: '3', telefon: '', email:'' },
{id:'229', judet: 'hunedoara', luna: 'ianuarie', img: 'images/angajari.jpg', angajator: 'LOGICOM CONSULTING S.R.L.', adresa: 'AVRAM IANCU 14, Bl. 1, Et. 2, Ap. 5, Loc. HUNEDOARA,tel. 0766634728', locDeMuncaVacant: 'MANICHIURIST', conditiiDeOcupare: 'Începător', nrLocuri: '2', telefon: '', email:'' },
{id:'230', judet: 'hunedoara', luna: 'ianuarie', img: 'images/angajari.jpg', angajator: 'CART MET PLAST SRL', adresa: 'Str. LUNCII 11, Loc. ORĂŞTIE,tel. 0254247470', locDeMuncaVacant: 'MANIPULANT MARFURI', conditiiDeOcupare: 'Fără Experiență', nrLocuri: '1', telefon: '', email:'' },
{id:'231', judet: 'hunedoara', luna: 'ianuarie', img: 'images/angajari.jpg', angajator: 'CEMENTARTE SRL', adresa: 'Str. RISCA, Loc. BAIA DE CRIŞ,tel. 0254682684', locDeMuncaVacant: 'MANIPULANT MARFURI', conditiiDeOcupare: 'Fără Experiență', nrLocuri: '3', telefon: '', email:'' },
{id:'232', judet: 'hunedoara', luna: 'ianuarie', img: 'images/angajari.jpg', angajator: 'DURAKRON CONVERT SRL', adresa: 'Bulevardul Dacia 9, Bl. A1-2, Ap. 16, C.P. 331013, Loc. HUNEDOARA,tel. 0766773746', locDeMuncaVacant: 'MANIPULANT MARFURI', conditiiDeOcupare: 'Fără Experiență', nrLocuri: '2', telefon: '', email:'' },
{id:'233', judet: 'hunedoara', luna: 'ianuarie', img: 'images/angajari.jpg', angajator: 'EUROSPORT DHS SA', adresa: 'Str. SÂNTUHALM 35A, Loc. DEVA,tel. 0254/210001', locDeMuncaVacant: 'MANIPULANT MARFURI', conditiiDeOcupare: 'Fără Experiență', nrLocuri: '10', telefon: '', email:'' },
{id:'234', judet: 'hunedoara', luna: 'ianuarie', img: 'images/angajari.jpg', angajator: 'GILEX PROD SRL', adresa: 'Localitate BERIU, tel. 0254246070', locDeMuncaVacant: 'MANIPULANT MARFURI', conditiiDeOcupare: 'Fără Experiență', nrLocuri: '1', telefon: '', email:'' },
{id:'235', judet: 'hunedoara', luna: 'ianuarie', img: 'images/angajari.jpg', angajator: 'HYDROSYSTEMS SRL', adresa: 'Str. Livezeni 100, C.P. 332071, Loc. PETROŞANI,tel. 0723636381', locDeMuncaVacant: 'MANIPULANT MARFURI', conditiiDeOcupare: 'Fără Experiență', nrLocuri: '1', telefon: '', email:'' },
{id:'236', judet: 'hunedoara', luna: 'ianuarie', img: 'images/angajari.jpg', angajator: 'INSTANT INTERNATIONAL SRL', adresa: 'Str. A.IANCU, Bl. 7, Et. P, Loc. SIMERIA,tel. 0254263216', locDeMuncaVacant: 'MANIPULANT MARFURI', conditiiDeOcupare: 'Fără Experiență', nrLocuri: '1', telefon: '', email:'' },
{id:'237', judet: 'hunedoara', luna: 'ianuarie', img: 'images/angajari.jpg', angajator: 'POLIROMITA SRL', adresa: 'Str. DOROBANTI 32A, Loc. DEVA', locDeMuncaVacant: 'MANIPULANT MARFURI', conditiiDeOcupare: 'Fără Experiență', nrLocuri: '1', telefon: '', email:'' },
{id:'238', judet: 'hunedoara', luna: 'ianuarie', img: 'images/angajari.jpg', angajator: 'REC CARTOPLAST SRL', adresa: 'Satul Ohaba Streiului 1B, Loc. CĂLAN,tel. 0748116980', locDeMuncaVacant: 'MANIPULANT MARFURI', conditiiDeOcupare: 'Începător', nrLocuri: '2', telefon: '', email:'' },
{id:'239', judet: 'hunedoara', luna: 'ianuarie', img: 'images/angajari.jpg', angajator: 'RO XI WOOD SYSTEMS SRL', adresa: 'Str. UNIRII 130, Loc. ORĂŞTIE,tel. 0254244117', locDeMuncaVacant: 'MANIPULANT MARFURI', conditiiDeOcupare: 'Fără Experiență', nrLocuri: '1', telefon: '', email:'' },
{id:'240', judet: 'hunedoara', luna: 'ianuarie', img: 'images/angajari.jpg', angajator: 'YUSEN LOGISTICS (ROMANIA) SRL', adresa: 'Str. Italia 1-7, C.P. 077040, Loc. CHIAJNA, Jud. ILFOV,tel. 0312292722', locDeMuncaVacant: 'MANIPULANT MARFURI', conditiiDeOcupare: 'Fără Experiență', nrLocuri: '7', telefon: '', email:'' },
{id:'241', judet: 'hunedoara', luna: 'ianuarie', img: 'images/angajari.jpg', angajator: 'M3 CONDESIGN SRL-D', adresa: 'Str. Petofi Şandor 15, Loc. HUNEDOARA,tel. 0744218929', locDeMuncaVacant: 'MASINIST LA MASINI CALE MECANIZARE USOARA SI GREA', conditiiDeOcupare: 'Avansat', nrLocuri: '1', telefon: '', email:'' },
{id:'242', judet: 'hunedoara', luna: 'ianuarie', img: 'images/angajari.jpg', angajator: 'INSTALATII GEVIS SRL', adresa: 'Str. ARDEALULUI 1, Loc. DEVA,tel. 0254225049', locDeMuncaVacant: 'MASINIST LA MASINI PT TERASAMENTE (IFRONIST)', conditiiDeOcupare: 'Fără Experiență', nrLocuri: '1', telefon: '', email:'' },
{id:'243', judet: 'hunedoara', luna: 'ianuarie', img: 'images/angajari.jpg', angajator: 'MACON SRL', adresa: 'STR. SANTUHALM 1, Loc. DEVA,tel. 0254213930', locDeMuncaVacant: 'MASINIST PENTRU PREFABRICATE DIN BETON SI BETON ARMAT', conditiiDeOcupare: 'Fără Experiență', nrLocuri: '4', telefon: '', email:'' },
{id:'244', judet: 'hunedoara', luna: 'ianuarie', img: 'images/angajari.jpg', angajator: 'EXPLOMIN SRL', adresa: 'Str. ARDEALULUI 1, Loc. DEVA', locDeMuncaVacant: 'MASINIST PENTRU UTILAJE SPECIFICE LA EXTRACTIE SI EXECUTIA TUNELURILOR', conditiiDeOcupare: 'Fără Experiență', nrLocuri: '2', telefon: '', email:'' },
{id:'245', judet: 'hunedoara', luna: 'ianuarie', img: 'images/angajari.jpg', angajator: 'FORCE PROD SERV SRL', adresa: 'STR. COROESTI 1818, Loc. VULCAN', locDeMuncaVacant: 'MECANIC AUTO', conditiiDeOcupare: 'Începător', nrLocuri: '1', telefon: '', email:'' },
{id:'246', judet: 'hunedoara', luna: 'ianuarie', img: 'images/angajari.jpg', angajator: 'MCA INVEST INDUSTRIAL SRL', adresa: 'STR. IMPARATUL TRAIAN 34, Loc. DEVA,tel. 0721508378', locDeMuncaVacant: 'MECANIC AUTO', conditiiDeOcupare: 'Fără Experiență', nrLocuri: '5', telefon: '', email:'' },
{id:'247', judet: 'hunedoara', luna: 'ianuarie', img: 'images/angajari.jpg', angajator: 'INTERMEDIA CALL 2005 SRL', adresa: 'STR. C-TIN BURSAN 14, Loc. HUNEDOARA,tel. 0723170931', locDeMuncaVacant: 'MECANIC ÎNTRETINERE SI REPARATII MASINI DE CUSUT INDUSTRIALE', conditiiDeOcupare: 'Fără Experiență', nrLocuri: '1', telefon: '', email:'' },
{id:'248', judet: 'hunedoara', luna: 'ianuarie', img: 'images/angajari.jpg', angajator: 'ALIM COM MH SRL', adresa: 'B-dul MIHAI VITEAZU 43, Loc. HUNEDOARA,tel. 0354881118', locDeMuncaVacant: 'MECANIC UTILAJ', conditiiDeOcupare: 'Fără Experiență', nrLocuri: '2', telefon: '', email:'' },
{id:'249', judet: 'hunedoara', luna: 'ianuarie', img: 'images/angajari.jpg', angajator: 'DRUPO SRL', adresa: 'STR. FURNALISTULUI 14, Loc. CĂLAN,tel. 0254734214', locDeMuncaVacant: 'MECANIC UTILAJ', conditiiDeOcupare: 'Începător', nrLocuri: '1', telefon: '', email:'' },
{id:'250', judet: 'hunedoara', luna: 'ianuarie', img: 'images/angajari.jpg', angajator: 'TRAVIADIS S.R.L.', adresa: 'DEPOZITELOR 55, Loc. SIMERIA', locDeMuncaVacant: 'MECANIC UTILAJ', conditiiDeOcupare: 'Experiență Medie', nrLocuri: '1', telefon: '', email:'' },
{id:'251', judet: 'hunedoara', luna: 'ianuarie', img: 'images/angajari.jpg', angajator: 'VOL SPRINT TRUCK SRL', adresa: 'STR. ION CREANGA, Bl. 36, Sc. D, Ap. 44, Loc. DEVA,tel. 0758836584', locDeMuncaVacant: 'MECANIC UTILAJ', conditiiDeOcupare: 'Fără Experiență', nrLocuri: '1', telefon: '', email:'' },
{id:'252', judet: 'hunedoara', luna: 'ianuarie', img: 'images/angajari.jpg', angajator: 'TIN LAVIR CLIMATIZARE SRL', adresa: 'Str. GENERAL VASILE MILEA, Bl. B5, Sc. 1, Et. P, Ap. 3, Loc. BRAD,tel. 0744636434', locDeMuncaVacant: 'MONTATOR APARATE AER CONDITIONAT', conditiiDeOcupare: 'Fără Experiență', nrLocuri: '1', telefon: '', email:'' },
{id:'253', judet: 'hunedoara', luna: 'ianuarie', img: 'images/angajari.jpg', angajator: 'COLBER CORPORATION SRL', adresa: 'SAT PESTISUL MARE DJ 687,INCINTA 4, Bl. HALA 1, Loc. HUNEDOARA,tel. 0354808280', locDeMuncaVacant: 'MONTATOR SUBANSAMBLE', conditiiDeOcupare: 'Fără Experiență', nrLocuri: '10', telefon: '', email:'' },
{id:'254', judet: 'hunedoara', luna: 'ianuarie', img: 'images/angajari.jpg', angajator: 'DAR DRAXLMAIER AUTOMOTIVE', adresa: 'Bdul Traian 19, C.P. 331023, Loc. HUNEDOARA,tel. 0354403725', locDeMuncaVacant: 'MONTATOR SUBANSAMBLE', conditiiDeOcupare: 'Fără Experiență', nrLocuri: '40', telefon: '', email:'' },
{id:'255', judet: 'hunedoara', luna: 'ianuarie', img: 'images/angajari.jpg', angajator: 'OPF AIR SYSTEMS CO S.R.L.', adresa: 'Str. PIATA IANCU DE HUNEDOARA 1B, Loc. HUNEDOARA,tel. 0726370555', locDeMuncaVacant: 'MONTATOR SUBANSAMBLE', conditiiDeOcupare: 'Fără Experiență', nrLocuri: '2', telefon: '', email:'' },
{id:'256', judet: 'hunedoara', luna: 'ianuarie', img: 'images/angajari.jpg', angajator: 'SOF PRODUCTION STANIJA SRL', adresa: 'Str. PRINCIPALA 167B, Loc. STĂNIJA,tel. 0254611549', locDeMuncaVacant: 'MONTOR ARTICOLE DIN PIELE', conditiiDeOcupare: 'Începător', nrLocuri: '10', telefon: '', email:'' },
{id:'257', judet: 'hunedoara', luna: 'ianuarie', img: 'images/angajari.jpg', angajator: 'FABISEB CRISANA SRL', adresa: 'Satul COSTESTI 143A, Loc. COSTEŞTI,tel. 0254246807', locDeMuncaVacant: 'MOTORIST LA MOTOAGREGATE SI MASINI ÎN SILVICULTURA', conditiiDeOcupare: 'Fără Experiență', nrLocuri: '1', telefon: '', email:'' },
{id:'258', judet: 'hunedoara', luna: 'ianuarie', img: 'images/angajari.jpg', angajator: 'CHIMSPORT S.A.', adresa: 'Str. Codrului 24, C.P. 335700, Loc. ORĂŞTIE', locDeMuncaVacant: 'MUNC NEC ÎN INDUSTRIA CONFECTIILOR', conditiiDeOcupare: 'Fără Experiență', nrLocuri: '1', telefon: '', email:'' },
{id:'259', judet: 'hunedoara', luna: 'ianuarie', img: 'images/angajari.jpg', angajator: 'ROSTYLE ALEX SRL', adresa: 'Str. ABATORULUI 3, Loc. BRAD,tel. 0254612768', locDeMuncaVacant: 'MUNC NEC ÎN INDUSTRIA CONFECTIILOR', conditiiDeOcupare: 'Fără Experiență', nrLocuri: '5', telefon: '', email:'' },
{id:'260', judet: 'hunedoara', luna: 'ianuarie', img: 'images/angajari.jpg', angajator: 'SC ROM LEATHER SOFAS SRL', adresa: 'Satul Soimus 409, Loc. DEVA,tel. 0254237411', locDeMuncaVacant: 'MUNC NEC ÎN INDUSTRIA CONFECTIILOR', conditiiDeOcupare: 'Fără Experiență', nrLocuri: '4', telefon: '', email:'' },
{id:'261', judet: 'hunedoara', luna: 'ianuarie', img: 'images/angajari.jpg', angajator: 'EXPLOMIN SRL', adresa: 'Str. ARDEALULUI 1, Loc. DEVA', locDeMuncaVacant: 'MUNC NEC ÎN MINE SI CARIERE', conditiiDeOcupare: 'Fără Experiență', nrLocuri: '2', telefon: '', email:'' },
{id:'262', judet: 'hunedoara', luna: 'ianuarie', img: 'images/angajari.jpg', angajator: 'PROACTIV SRL', adresa: 'Str. Aleea LALELELOR, Bl. EXP., Sc. 3, Ap. 43, Loc. DEVA', locDeMuncaVacant: 'MUNC NEC ÎN MINE SI CARIERE', conditiiDeOcupare: 'Fără Experiență', nrLocuri: '2', telefon: '', email:'' },
{id:'263', judet: 'hunedoara', luna: 'ianuarie', img: 'images/angajari.jpg', angajator: 'PA & ST EXPORT SRL', adresa: 'MURESUL, Bl. 16, Sc. K, Ap. 26, Loc. ORĂŞTIE,tel. 0741087028', locDeMuncaVacant: 'MUNC NEC ÎN SILVICULTURA', conditiiDeOcupare: 'Fără Experiență', nrLocuri: '1', telefon: '', email:'' },
{id:'264', judet: 'hunedoara', luna: 'ianuarie', img: 'images/angajari.jpg', angajator: 'SC SAMCARLIS', adresa: 'Str. Independentei 11, C.P. 335300, Loc. CĂLAN', locDeMuncaVacant: 'MUNC NEC LA AMBALAREA PRODUSELOR SOLIDE SI SEMISOLIDE', conditiiDeOcupare: 'Începător', nrLocuri: '1', telefon: '', email:'' },
{id:'265', judet: 'hunedoara', luna: 'ianuarie', img: 'images/angajari.jpg', angajator: 'EUROLIU GROUP SRL', adresa: 'Localitate SÂNTUHALM, tel. 0733078906', locDeMuncaVacant: 'MUNC NEC LA AMBALAREA PRODUSELOR SUB FORMA DE PRAF SI GRANULE', conditiiDeOcupare: 'Fără Experiență', nrLocuri: '1', telefon: '', email:'' },
{id:'266', judet: 'hunedoara', luna: 'ianuarie', img: 'images/angajari.jpg', angajator: 'ADIGE MANUFACTURING SRL', adresa: 'Str. AVRAM IANCU 54, C.P. 335200, Loc. BRAD,tel. 0254610002', locDeMuncaVacant: 'MUNC NEC LA ASAMBLAREA, MONTAREA PIESELOR', conditiiDeOcupare: 'Fără Experiență', nrLocuri: '1', telefon: '', email:'' },
{id:'267', judet: 'hunedoara', luna: 'ianuarie', img: 'images/angajari.jpg', angajator: 'ART WOOD COMPANY SRL', adresa: 'Str. AUREL VLAICU 227A, Loc. AUREL VLAICU,tel. 0254245550', locDeMuncaVacant: 'MUNC NEC LA ASAMBLAREA, MONTAREA PIESELOR', conditiiDeOcupare: 'Fără Experiență', nrLocuri: '1', telefon: '', email:'' },
{id:'268', judet: 'hunedoara', luna: 'ianuarie', img: 'images/angajari.jpg', angajator: 'ASSA ABLOY ENTRANCE SYSTEMS PRODUCTION ROMANIA S.R.L.', adresa: 'Str. Peştişul Mare 363, C.P. 331008, Loc. HUNEDOARA,tel. 0354808380', locDeMuncaVacant: 'MUNC NEC LA ASAMBLAREA, MONTAREA PIESELOR', conditiiDeOcupare: 'Fără Experiență', nrLocuri: '3', telefon: '', email:'' },
{id:'269', judet: 'hunedoara', luna: 'ianuarie', img: 'images/angajari.jpg', angajator: 'CERURIM S.R.L.', adresa: 'Str. SÂNTUHALM 35A, Loc. DEVA,tel. 0746161652', locDeMuncaVacant: 'MUNC NEC LA ASAMBLAREA, MONTAREA PIESELOR', conditiiDeOcupare: 'Fără Experiență', nrLocuri: '1', telefon: '', email:'' },
{id:'270', judet: 'hunedoara', luna: 'ianuarie', img: 'images/angajari.jpg', angajator: 'CHIMSPORT S.A.', adresa: 'Str. Codrului 24, C.P. 335700, Loc. ORĂŞTIE', locDeMuncaVacant: 'MUNC NEC LA ASAMBLAREA, MONTAREA PIESELOR', conditiiDeOcupare: 'Fără Experiență', nrLocuri: '1', telefon: '', email:'' },
{id:'271', judet: 'hunedoara', luna: 'ianuarie', img: 'images/angajari.jpg', angajator: 'COURTAGE COMBO SRL', adresa: 'STR. AUREL VLAICU 44, Loc. DEVA,tel. 0254263221', locDeMuncaVacant: 'MUNC NEC LA ASAMBLAREA, MONTAREA PIESELOR', conditiiDeOcupare: 'Începător', nrLocuri: '1', telefon: '', email:'' },
{id:'272', judet: 'hunedoara', luna: 'ianuarie', img: 'images/angajari.jpg', angajator: 'EUROSPORT DHS SA', adresa: 'Str. SÂNTUHALM 35A, Loc. DEVA,tel. 0254/210001', locDeMuncaVacant: 'MUNC NEC LA ASAMBLAREA, MONTAREA PIESELOR', conditiiDeOcupare: 'Fără Experiență', nrLocuri: '50', telefon: '', email:'' },
{id:'273', judet: 'hunedoara', luna: 'ianuarie', img: 'images/angajari.jpg', angajator: 'GALLI TECHNIC INTERNATIONAL', adresa: 'Str. Orizontului 1, C.P. 330181, Loc. DEVA,tel. 0737233590', locDeMuncaVacant: 'MUNC NEC LA ASAMBLAREA, MONTAREA PIESELOR', conditiiDeOcupare: 'Fără Experiență', nrLocuri: '2', telefon: '', email:'' },
{id:'274', judet: 'hunedoara', luna: 'ianuarie', img: 'images/angajari.jpg', angajator: 'ITALROM LEATHER SRL', adresa: 'Satul MINTIA 202F, Loc. VEŢEL,tel. 0254/236620', locDeMuncaVacant: 'MUNC NEC LA ASAMBLAREA, MONTAREA PIESELOR', conditiiDeOcupare: 'Fără Experiență', nrLocuri: '1', telefon: '', email:'' },
{id:'275', judet: 'hunedoara', luna: 'ianuarie', img: 'images/angajari.jpg', angajator: 'PHILIPS ORĂŞTIE S.R.L.', adresa: 'Str. LUNCII 18, Loc. ORĂŞTIE,tel. 0254206280', locDeMuncaVacant: 'MUNC NEC LA ASAMBLAREA, MONTAREA PIESELOR', conditiiDeOcupare: 'Începător', nrLocuri: '10', telefon: '', email:'' },
{id:'276', judet: 'hunedoara', luna: 'ianuarie', img: 'images/angajari.jpg', angajator: 'SARMISMOB SA', adresa: 'Str. DR. VICTOR SUIAGA 2, Loc. DEVA,tel. 0737034621', locDeMuncaVacant: 'MUNC NEC LA ASAMBLAREA, MONTAREA PIESELOR', conditiiDeOcupare: 'Fără Experiență', nrLocuri: '13', telefon: '', email:'' },
{id:'277', judet: 'hunedoara', luna: 'ianuarie', img: 'images/angajari.jpg', angajator: 'SC DEVA STEEL CORPORATION SRL', adresa: 'Piaţa IANCU DE HUNEDOARA 1, Loc. HUNEDOARA,tel. 0723819493', locDeMuncaVacant: 'MUNC NEC LA ASAMBLAREA, MONTAREA PIESELOR', conditiiDeOcupare: 'Fără Experiență', nrLocuri: '4', telefon: '', email:'' },
{id:'278', judet: 'hunedoara', luna: 'ianuarie', img: 'images/angajari.jpg', angajator: 'TOTAL MOBILA PRODCOM SRL', adresa: 'Str. STEFAN CEL MARE 6, Loc. PETROŞANI,tel. 0723636381', locDeMuncaVacant: 'MUNC NEC LA ASAMBLAREA, MONTAREA PIESELOR', conditiiDeOcupare: 'Fără Experiență', nrLocuri: '2', telefon: '', email:'' },
{id:'279', judet: 'hunedoara', luna: 'ianuarie', img: 'images/angajari.jpg', angajator: 'FIA ELECTROINVEST SRL', adresa: 'Str. MURESULUI, Bl. 23, Sc. B, Ap. 23, Loc. ORĂŞTIE,tel. 0254244078', locDeMuncaVacant: 'MUNC NEC LA DEMOLAREA CLADIRILOR, CAPTUSELI ZIDARIE, PLACI MOZAIC, FAIANTA, GRESIE, PARCHET', conditiiDeOcupare: 'Fără Experiență', nrLocuri: '1', telefon: '', email:'' },
{id:'280', judet: 'hunedoara', luna: 'ianuarie', img: 'images/angajari.jpg', angajator: 'HERMAD INOVATIV CONSTRUCT', adresa: 'Str. Aurel Vlaicu 142, Loc. DEVA,tel. 0762684258', locDeMuncaVacant: 'MUNC NEC LA DEMOLAREA CLADIRILOR, CAPTUSELI ZIDARIE, PLACI MOZAIC, FAIANTA, GRESIE, PARCHET', conditiiDeOcupare: 'Fără Experiență', nrLocuri: '1', telefon: '', email:'' },
{id:'281', judet: 'hunedoara', luna: 'ianuarie', img: 'images/angajari.jpg', angajator: 'VALE PROFESSIONAL CONSTRUCT', adresa: 'Str. VAIDEI, Loc. ORĂŞTIE', locDeMuncaVacant: 'MUNC NEC LA DEMOLAREA CLADIRILOR, CAPTUSELI ZIDARIE, PLACI MOZAIC, FAIANTA, GRESIE, PARCHET', conditiiDeOcupare: 'Fără Experiență', nrLocuri: '2', telefon: '', email:'' },
{id:'282', judet: 'hunedoara', luna: 'ianuarie', img: 'images/angajari.jpg', angajator: 'PROACTIV SRL', adresa: 'Str. Aleea LALELELOR, Bl. EXP., Sc. 3, Ap. 43, Loc. DEVA', locDeMuncaVacant: 'MUNC NEC LA ÎNTRETINEREA DE DRUMURI, SOSELE, PODURI, BARAJE', conditiiDeOcupare: 'Fără Experiență', nrLocuri: '1', telefon: '', email:'' },
{id:'283', judet: 'hunedoara', luna: 'ianuarie', img: 'images/angajari.jpg', angajator: 'ADINA MEGATRUST S.R.L.', adresa: 'TRANDAFIRILOR 1, Bl. 14, Sc. B, Ap. 23, Loc. HUNEDOARA,tel. 0773926749', locDeMuncaVacant: 'MUNC NEC LA SPARGERE, TAIEREA MAT DE CONSTR', conditiiDeOcupare: 'Fără Experiență', nrLocuri: '5', telefon: '', email:'' },
{id:'284', judet: 'hunedoara', luna: 'ianuarie', img: 'images/angajari.jpg', angajator: 'ALIM COM MH SRL', adresa: 'B-dul MIHAI VITEAZU 43, Loc. HUNEDOARA,tel. 0354881118', locDeMuncaVacant: 'MUNC NEC LA SPARGERE, TAIEREA MAT DE CONSTR', conditiiDeOcupare: 'Fără Experiență', nrLocuri: '6', telefon: '', email:'' },
{id:'285', judet: 'hunedoara', luna: 'ianuarie', img: 'images/angajari.jpg', angajator: 'MIRA MON PRESTCOM SRL', adresa: 'Bdul Mihai Viteazu 46, C.P. 331039, Loc. HUNEDOARA,tel. 0354881118', locDeMuncaVacant: 'MUNC NEC LA SPARGERE, TAIEREA MAT DE CONSTR', conditiiDeOcupare: 'Fără Experiență', nrLocuri: '5', telefon: '', email:'' },
{id:'286', judet: 'hunedoara', luna: 'ianuarie', img: 'images/angajari.jpg', angajator: 'PREMIER STONE', adresa: 'Str. Ştefan cel Mare 7, C.P. 335900, Loc. SIMERIA,tel. 074475127', locDeMuncaVacant: 'MUNC NEC LA SPARGERE, TAIEREA MAT DE CONSTR', conditiiDeOcupare: 'Fără Experiență', nrLocuri: '1', telefon: '', email:'' },
{id:'287', judet: 'hunedoara', luna: 'ianuarie', img: 'images/angajari.jpg', angajator: 'CART MET PLAST SRL', adresa: 'Str. LUNCII 11, Loc. ORĂŞTIE,tel. 0254247470', locDeMuncaVacant: 'MUNCITOR SPALARE SI CURATARE CISTERNE', conditiiDeOcupare: 'Fără Experiență', nrLocuri: '1', telefon: '', email:'' },
{id:'288', judet: 'hunedoara', luna: 'ianuarie', img: 'images/angajari.jpg', angajator: 'LUK WEB SERVICES S.R.L.', adresa: 'NICOLAE BALCESCU, Bl. E, Sc. 2, Ap. 15, Loc. DEVA,tel. 0742225250', locDeMuncaVacant: 'OPERATOR CALCULATOR ELECTRONIC SI RETELE', conditiiDeOcupare: 'Fără Experiență', nrLocuri: '2', telefon: '', email:'' },
{id:'289', judet: 'hunedoara', luna: 'ianuarie', img: 'images/angajari.jpg', angajator: 'RESITEX GROUP S.R.L.', adresa: 'B-dul IULIU MANIU, Bl. 6, Sc. 1, Ap. 8, Loc. DEVA,tel. 0354414150', locDeMuncaVacant: 'OPERATOR CONF. INDUSTRIAL ÎMBRACAMINTE DIN TESATURI, TRICOTAJE, MATERIALE SINTETICE', conditiiDeOcupare: 'Fără Experiență', nrLocuri: '5', telefon: '', email:'' },
{id:'290', judet: 'hunedoara', luna: 'ianuarie', img: 'images/angajari.jpg', angajator: 'APA PROD SA', adresa: 'CALEA ZARANDULUI 43, Loc. DEVA,tel. 0254222345', locDeMuncaVacant: 'OPERATOR INSTALATII APA SI CANALIZARE', conditiiDeOcupare: 'Fără Experiență', nrLocuri: '1', telefon: '', email:'' },
{id:'291', judet: 'hunedoara', luna: 'ianuarie', img: 'images/angajari.jpg', angajator: 'SARMISMOB SA', adresa: 'Str. DR. VICTOR SUIAGA 2, Loc. DEVA,tel. 0737034621', locDeMuncaVacant: 'OPERATOR LA MASINI-UNELTE CU COMANDA NUMER', conditiiDeOcupare: 'Fără Experiență', nrLocuri: '3', telefon: '', email:'' },
{id:'292', judet: 'hunedoara', luna: 'ianuarie', img: 'images/angajari.jpg', angajator: 'SC PERNAT ROMANIA SRL', adresa: 'Str. Codrului 30, C.P. 335700, Loc. ORĂŞTIE,tel. 0254206327', locDeMuncaVacant: 'OPERATOR LA MASINI-UNELTE CU COMANDA NUMER', conditiiDeOcupare: 'Fără Experiență', nrLocuri: '1', telefon: '', email:'' },
{id:'293', judet: 'hunedoara', luna: 'ianuarie', img: 'images/angajari.jpg', angajator: 'EDOROM METAL SRL', adresa: 'STR. CALEA ROMANILOR 28, Loc. GEOAGIU,tel. 0254248450', locDeMuncaVacant: 'OPERATOR LA MASINI-UNELTE SEMIAUTOMATE SI AUTOMATE', conditiiDeOcupare: 'Fără Experiență', nrLocuri: '2', telefon: '', email:'' },
{id:'294', judet: 'hunedoara', luna: 'ianuarie', img: 'images/angajari.jpg', angajator: 'OPF AIR SYSTEMS CO S.R.L.', adresa: 'Str. PIATA IANCU DE HUNEDOARA 1B, Loc. HUNEDOARA,tel. 0726370555', locDeMuncaVacant: 'OPERATOR LA MASINI-UNELTE SEMIAUTOMATE SI AUTOMATE', conditiiDeOcupare: 'Fără Experiență', nrLocuri: '2', telefon: '', email:'' },
{id:'295', judet: 'hunedoara', luna: 'ianuarie', img: 'images/angajari.jpg', angajator: 'ASSA ABLOY ENTRANCE SYSTEMS PRODUCTION ROMANIA S.R.L.', adresa: 'Str. Peştişul Mare 363, C.P. 331008, Loc. HUNEDOARA,tel. 0354808380', locDeMuncaVacant: 'OPERATOR LA ROBOTI INDUSTRIALI', conditiiDeOcupare: 'Fără Experiență', nrLocuri: '2', telefon: '', email:'' },
{id:'296', judet: 'hunedoara', luna: 'ianuarie', img: 'images/angajari.jpg', angajator: 'DAR DRAXLMAIER AUTOMOTIVE', adresa: 'Bdul Traian 19, C.P. 331023, Loc. HUNEDOARA,tel. 0354403725', locDeMuncaVacant: 'OPERATOR LA ROBOTI INDUSTRIALI', conditiiDeOcupare: 'Fără Experiență', nrLocuri: '30', telefon: '', email:'' },
{id:'297', judet: 'hunedoara', luna: 'ianuarie', img: 'images/angajari.jpg', angajator: 'FILPLAST SRL', adresa: 'STR. NICOLAE TITULESCU 60, C.P. 335700, Loc. ORĂŞTIE,tel. 0254243109', locDeMuncaVacant: 'OPERATOR MASE PLASTICE', conditiiDeOcupare: 'Fără Experiență', nrLocuri: '1', telefon: '', email:'' },
{id:'298', judet: 'hunedoara', luna: 'ianuarie', img: 'images/angajari.jpg', angajator: 'CASTECO INVEST SRL', adresa: 'Str. MURESULUI 18, Loc. DEVA,tel. 0254/231888', locDeMuncaVacant: 'OPERATOR TAIERE', conditiiDeOcupare: 'Experiență Medie', nrLocuri: '1', telefon: '', email:'' },
{id:'299', judet: 'hunedoara', luna: 'ianuarie', img: 'images/angajari.jpg', angajator: 'PARADIS TOUR STRAJA S.R.L.', adresa: 'Str. STRAJA, Loc. LUPENI,tel. 0724887293', locDeMuncaVacant: 'OSPATAR (CHELNER)', conditiiDeOcupare: 'Fără Experiență', nrLocuri: '1', telefon: '', email:'' },
{id:'300', judet: 'hunedoara', luna: 'ianuarie', img: 'images/angajari.jpg', angajator: 'PREST ALIM SID SRL', adresa: 'Str. MIHAI VITEAZU 10, Loc. HUNEDOARA,tel. 0254716222', locDeMuncaVacant: 'OSPATAR (CHELNER)', conditiiDeOcupare: 'Fără Experiență', nrLocuri: '1', telefon: '', email:'' },
{id:'301', judet: 'hunedoara', luna: 'ianuarie', img: 'images/angajari.jpg', angajator: 'SAVA EXIM SRL', adresa: 'Str. 22 DECEMBRIE 265265, Loc. DEVA,tel. 0254226903', locDeMuncaVacant: 'OSPATAR (CHELNER)', conditiiDeOcupare: 'Fără Experiență', nrLocuri: '1', telefon: '', email:'' },
{id:'302', judet: 'hunedoara', luna: 'ianuarie', img: 'images/angajari.jpg', angajator: 'XILAI SRL', adresa: 'SANTUHALM 35A, Loc. DEVA', locDeMuncaVacant: 'OSPATAR (CHELNER)', conditiiDeOcupare: 'Fără Experiență', nrLocuri: '2', telefon: '', email:'' },
{id:'303', judet: 'hunedoara', luna: 'ianuarie', img: 'images/angajari.jpg', angajator: 'ANTICA BRUTARIE', adresa: 'Str. NICOLAE BALCESCU 9A, C.P. 335700, Loc. ORĂŞTIE,tel. 0749978724', locDeMuncaVacant: 'PATISER', conditiiDeOcupare: 'Fără Experiență', nrLocuri: '2', telefon: '', email:'' },
{id:'304', judet: 'hunedoara', luna: 'ianuarie', img: 'images/angajari.jpg', angajator: 'PAPY DOLCE S.R.L.', adresa: '1848 34, Bl. 34, Sc. A, Ap. 3, Loc. HUNEDOARA,tel. 0727740890', locDeMuncaVacant: 'PATISER', conditiiDeOcupare: 'Fără Experiență', nrLocuri: '2', telefon: '', email:'' },
{id:'305', judet: 'hunedoara', luna: 'ianuarie', img: 'images/angajari.jpg', angajator: 'LOGICOM CONSULTING S.R.L.', adresa: 'AVRAM IANCU 14, Bl. 1, Et. 2, Ap. 5, Loc. HUNEDOARA,tel. 0766634728', locDeMuncaVacant: 'PEDICHIURIST', conditiiDeOcupare: 'Fără Experiență', nrLocuri: '2', telefon: '', email:'' },
{id:'306', judet: 'hunedoara', luna: 'ianuarie', img: 'images/angajari.jpg', angajator: 'PROVIZII DE IARNA SRL', adresa: 'Str. Grădiştei 2, Loc. PETRILA,tel. 0726876508', locDeMuncaVacant: 'PREPARATOR CONSERVE, LEGUME SI FRUCTE', conditiiDeOcupare: 'Fără Experiență', nrLocuri: '1', telefon: '', email:'' },
{id:'307', judet: 'hunedoara', luna: 'ianuarie', img: 'images/angajari.jpg', angajator: 'PROFI ROM FOOD SRL', adresa: 'Calea Sever Bocu 31, Bl. A1, Loc. TIMIŞOARA, tel. 0372568838', locDeMuncaVacant: 'PRIMITOR-DISTRIBUITOR MATERIALE SI SCULE', conditiiDeOcupare: 'Fără Experiență', nrLocuri: '1', telefon: '', email:'' },
{id:'308', judet: 'hunedoara', luna: 'ianuarie', img: 'images/angajari.jpg', angajator: 'BIROU EXEC.JUDEC.RADUCANU CECI', adresa: 'STR. 1 DECEMBRIE 1918 100, Loc. PETROŞANI,tel. 254540617', locDeMuncaVacant: 'PROGRAMATOR AJUTOR', conditiiDeOcupare: 'Începător', nrLocuri: '1', telefon: '', email:'' },
{id:'309', judet: 'hunedoara', luna: 'ianuarie', img: 'images/angajari.jpg', angajator: 'BIROU EXEC.JUDEC.RADUCANU CECI', adresa: 'STR. 1 DECEMBRIE 1918 100, Loc. PETROŞANI,tel. 254540617', locDeMuncaVacant: 'PROGRAMATOR DE SISTEM INFORMATIC', conditiiDeOcupare: 'Fără Experiență', nrLocuri: '1', telefon: '', email:'' },
{id:'310', judet: 'hunedoara', luna: 'ianuarie', img: 'images/angajari.jpg', angajator: 'AYANA TURISM S.R.L.', adresa: 'Str. Lunca 117, C.P. 332059, Loc. PETROŞANI', locDeMuncaVacant: 'RECEPTIONER DE HOTEL', conditiiDeOcupare: 'Fără Experiență', nrLocuri: '1', telefon: '', email:'' },
{id:'311', judet: 'hunedoara', luna: 'ianuarie', img: 'images/angajari.jpg', angajator: 'PREST ALIM SID SRL', adresa: 'Str. MIHAI VITEAZU 10, Loc. HUNEDOARA,tel. 0254716222', locDeMuncaVacant: 'RECEPTIONER DE HOTEL', conditiiDeOcupare: 'Fără Experiență', nrLocuri: '2', telefon: '', email:'' },
{id:'312', judet: 'hunedoara', luna: 'ianuarie', img: 'images/angajari.jpg', angajator: 'STAR TOUR SRL', adresa: 'Str. ARCHIA 92, Loc. DEVA', locDeMuncaVacant: 'RECEPTIONER DE HOTEL', conditiiDeOcupare: 'Fără Experiență', nrLocuri: '1', telefon: '', email:'' },
{id:'313', judet: 'hunedoara', luna: 'ianuarie', img: 'images/angajari.jpg', angajator: 'XILAI SRL', adresa: 'SANTUHALM 35A, Loc. DEVA', locDeMuncaVacant: 'RECEPTIONER DE HOTEL', conditiiDeOcupare: 'Fără Experiență', nrLocuri: '2', telefon: '', email:'' },
{id:'314', judet: 'hunedoara', luna: 'ianuarie', img: 'images/angajari.jpg', angajator: 'GALLI TECHNIC INTERNATIONAL', adresa: 'Str. Orizontului 1, C.P. 330181, Loc. DEVA,tel. 0737233590', locDeMuncaVacant: 'RECTIFICATOR UNIVERSAL', conditiiDeOcupare: 'Fără Experiență', nrLocuri: '4', telefon: '', email:'' },
{id:'315', judet: 'hunedoara', luna: 'ianuarie', img: 'images/angajari.jpg', angajator: 'SPITALUL JUD DE URGENTA DEVA', adresa: 'Str. 1 Decembrie 58, Loc. DEVA,tel. 0254/215051', locDeMuncaVacant: 'REFERENT DE SPEC ÎN ADMINISTRATIA PUBLICA', conditiiDeOcupare: 'Fără Experiență', nrLocuri: '1', telefon: '', email:'' },
{id:'316', judet: 'hunedoara', luna: 'ianuarie', img: 'images/angajari.jpg', angajator: 'SARMISMOB SA', adresa: 'Str. DR. VICTOR SUIAGA 2, Loc. DEVA,tel. 0737034621', locDeMuncaVacant: 'REFERENT DE SPECIALITATE INGINER INDUSTRIALIZAREA LEMNULUI', conditiiDeOcupare: 'Fără Experiență', nrLocuri: '1', telefon: '', email:'' },
{id:'317', judet: 'hunedoara', luna: 'ianuarie', img: 'images/angajari.jpg', angajator: 'INSTALATII GEVIS SRL', adresa: 'Str. ARDEALULUI 1, Loc. DEVA,tel. 0254225049', locDeMuncaVacant: 'SAPATOR MANUAL', conditiiDeOcupare: 'Fără Experiență', nrLocuri: '1', telefon: '', email:'' },
{id:'318', judet: 'hunedoara', luna: 'ianuarie', img: 'images/angajari.jpg', angajator: 'DAR DRAXLMAIER AUTOMOTIVE', adresa: 'Bdul Traian 19, C.P. 331023, Loc. HUNEDOARA,tel. 0354403725', locDeMuncaVacant: 'SCULER-MATRITER', conditiiDeOcupare: 'Fără Experiență', nrLocuri: '2', telefon: '', email:'' },
{id:'319', judet: 'hunedoara', luna: 'ianuarie', img: 'images/angajari.jpg', angajator: 'ALIM COM MH SRL', adresa: 'B-dul MIHAI VITEAZU 43, Loc. HUNEDOARA,tel. 0354881118', locDeMuncaVacant: 'SECRETARA', conditiiDeOcupare: 'Fără Experiență', nrLocuri: '1', telefon: '', email:'' },
{id:'320', judet: 'hunedoara', luna: 'ianuarie', img: 'images/angajari.jpg', angajator: 'CENTRUL DE AFACERI MASTER', adresa: 'STR. IMPARATUL TRAIAN 42, Loc. DEVA,tel. 218111', locDeMuncaVacant: 'SECRETARA', conditiiDeOcupare: 'Avansat', nrLocuri: '1', telefon: '', email:'' },
{id:'321', judet: 'hunedoara', luna: 'ianuarie', img: 'images/angajari.jpg', angajator: 'ASSA ABLOY ENTRANCE SYSTEMS PRODUCTION ROMANIA S.R.L.', adresa: 'Str. Peştişul Mare 363, C.P. 331008, Loc. HUNEDOARA,tel. 0354808380', locDeMuncaVacant: 'SEF DEPOZIT', conditiiDeOcupare: 'Fără Experiență', nrLocuri: '1', telefon: '', email:'' },
{id:'322', judet: 'hunedoara', luna: 'ianuarie', img: 'images/angajari.jpg', angajator: 'DAVIDE SCARPE', adresa: 'Satul CRISTUR 30, Loc. DEVA,tel. 0733186207', locDeMuncaVacant: 'SEF SERVICIU MARKETING', conditiiDeOcupare: 'Începător', nrLocuri: '1', telefon: '', email:'' },
{id:'323', judet: 'hunedoara', luna: 'ianuarie', img: 'images/angajari.jpg', angajator: 'SARMISMOB SA', adresa: 'Str. DR. VICTOR SUIAGA 2, Loc. DEVA,tel. 0737034621', locDeMuncaVacant: 'SERVANT POMPIER', conditiiDeOcupare: 'Fără Experiență', nrLocuri: '1', telefon: '', email:'' },
{id:'324', judet: 'hunedoara', luna: 'ianuarie', img: 'images/angajari.jpg', angajator: 'SOC DHS LOGISTICS JT SRL', adresa: 'Str. SÂNTUHALM 35, Ap. A, Loc. DEVA,tel. 0728285894', locDeMuncaVacant: 'SOFER AUTOBUZ', conditiiDeOcupare: 'Experiență Medie', nrLocuri: '1', telefon: '', email:'' },
{id:'325', judet: 'hunedoara', luna: 'ianuarie', img: 'images/angajari.jpg', angajator: 'ALOSCO SRL', adresa: 'Str. PARC INDUSTRIAL -D.J. 687/2 2, Loc. HUNEDOARA,tel. 0723521004', locDeMuncaVacant: 'SOFER AUTOCAMION/MASINA DE MARE TONAJ', conditiiDeOcupare: 'Fără Experiență', nrLocuri: '2', telefon: '', email:'' },
{id:'326', judet: 'hunedoara', luna: 'ianuarie', img: 'images/angajari.jpg', angajator: 'BRAI-CATA SRL', adresa: 'Str. VIRTUŢII 48, SECTORUL 6, BUCUREŞTI,tel. 0239606008', locDeMuncaVacant: 'SOFER AUTOCAMION/MASINA DE MARE TONAJ', conditiiDeOcupare: 'Fără Experiență', nrLocuri: '10', telefon: '', email:'' },
{id:'327', judet: 'hunedoara', luna: 'ianuarie', img: 'images/angajari.jpg', angajator: 'BUMBI TAXI SRL', adresa: 'Str. Hunedoarei 75, C.P. 335500, Loc. HAŢEG', locDeMuncaVacant: 'SOFER AUTOCAMION/MASINA DE MARE TONAJ', conditiiDeOcupare: 'Experiență Medie', nrLocuri: '1', telefon: '', email:'' },
{id:'328', judet: 'hunedoara', luna: 'ianuarie', img: 'images/angajari.jpg', angajator: 'MCA INVEST INDUSTRIAL SRL', adresa: 'STR. IMPARATUL TRAIAN 34, Loc. DEVA,tel. 0721508378', locDeMuncaVacant: 'SOFER AUTOCAMION/MASINA DE MARE TONAJ', conditiiDeOcupare: 'Fără Experiență', nrLocuri: '20', telefon: '', email:'' },
{id:'329', judet: 'hunedoara', luna: 'ianuarie', img: 'images/angajari.jpg', angajator: 'MEM SPEED SRL', adresa: 'B-dul NICOLAE BALCESCU, Bl. 44A, Sc. B, Et. 2, Ap. 33, Loc. DEVA,tel. 0721981240', locDeMuncaVacant: 'SOFER AUTOCAMION/MASINA DE MARE TONAJ', conditiiDeOcupare: 'Fără Experiență', nrLocuri: '1', telefon: '', email:'' },
{id:'330', judet: 'hunedoara', luna: 'ianuarie', img: 'images/angajari.jpg', angajator: 'POELZLEITNER GMBH SRL', adresa: '22 DECEMBRIE 37A, Et. 3, Ap. CAM.312/1B, Loc. DEVA', locDeMuncaVacant: 'SOFER AUTOCAMION/MASINA DE MARE TONAJ', conditiiDeOcupare: 'Începător', nrLocuri: '1', telefon: '', email:'' },
{id:'331', judet: 'hunedoara', luna: 'ianuarie', img: 'images/angajari.jpg', angajator: 'RUMATI SERVTCOM SRL', adresa: 'Str. RACASTIE 49, Loc. HUNEDOARA,tel. 0742354079', locDeMuncaVacant: 'SOFER AUTOCAMION/MASINA DE MARE TONAJ', conditiiDeOcupare: 'Începător', nrLocuri: '2', telefon: '', email:'' },
{id:'332', judet: 'hunedoara', luna: 'ianuarie', img: 'images/angajari.jpg', angajator: 'TELECERNA SRL', adresa: 'STR. GEORGE ENESCU, Bl. 2, Sc. C, Ap. 22, Loc. DEVA,tel. 0254234448', locDeMuncaVacant: 'SOFER AUTOCAMION/MASINA DE MARE TONAJ', conditiiDeOcupare: 'Începător', nrLocuri: '1', telefon: '', email:'' },
{id:'333', judet: 'hunedoara', luna: 'ianuarie', img: 'images/angajari.jpg', angajator: 'ALIM COM MH SRL', adresa: 'B-dul MIHAI VITEAZU 43, Loc. HUNEDOARA,tel. 0354881118', locDeMuncaVacant: 'SOFER DE AUTOTURISME SI CAMIONETE', conditiiDeOcupare: 'Fără Experiență', nrLocuri: '3', telefon: '', email:'' },
{id:'334', judet: 'hunedoara', luna: 'ianuarie', img: 'images/angajari.jpg', angajator: 'CHIRILA BUSINESS', adresa: 'Str. Tudor Vladimirescu 39, Loc. ORĂŞTIE,tel. 0728996546', locDeMuncaVacant: 'SOFER DE AUTOTURISME SI CAMIONETE', conditiiDeOcupare: 'Fără Experiență', nrLocuri: '1', telefon: '', email:'' },
{id:'335', judet: 'hunedoara', luna: 'ianuarie', img: 'images/angajari.jpg', angajator: 'DURAKRON CONVERT SRL', adresa: 'Bulevardul Dacia 9, Bl. A1-2, Ap. 16, C.P. 331013, Loc. HUNEDOARA,tel. 0766773746', locDeMuncaVacant: 'SOFER DE AUTOTURISME SI CAMIONETE', conditiiDeOcupare: 'Fără Experiență', nrLocuri: '2', telefon: '', email:'' },
{id:'336', judet: 'hunedoara', luna: 'ianuarie', img: 'images/angajari.jpg', angajator: 'PRIORITAR IMPEX SRL', adresa: 'Str. BRADULUI (PUNCT TERMIC NR. 2), Loc. CĂLAN', locDeMuncaVacant: 'SOFER DE AUTOTURISME SI CAMIONETE', conditiiDeOcupare: 'Experiență Medie', nrLocuri: '2', telefon: '', email:'' },
{id:'337', judet: 'hunedoara', luna: 'ianuarie', img: 'images/angajari.jpg', angajator: 'RAVLOFAR', adresa: 'Str. Căprioara 8A, Loc. VULCAN,tel. 0766322518', locDeMuncaVacant: 'SOFER DE AUTOTURISME SI CAMIONETE', conditiiDeOcupare: 'Fără Experiență', nrLocuri: '1', telefon: '', email:'' },
{id:'338', judet: 'hunedoara', luna: 'ianuarie', img: 'images/angajari.jpg', angajator: 'SARMISMOB SA', adresa: 'Str. DR. VICTOR SUIAGA 2, Loc. DEVA,tel. 0737034621', locDeMuncaVacant: 'SOFER DE AUTOTURISME SI CAMIONETE', conditiiDeOcupare: 'Fără Experiență', nrLocuri: '1', telefon: '', email:'' },
{id:'339', judet: 'hunedoara', luna: 'ianuarie', img: 'images/angajari.jpg', angajator: 'STALONE COM SRL', adresa: 'Str. HORIA 14, Loc. PETRILA,tel. 093367635', locDeMuncaVacant: 'SOFER DE AUTOTURISME SI CAMIONETE', conditiiDeOcupare: 'Fără Experiență', nrLocuri: '2', telefon: '', email:'' },
{id:'340', judet: 'hunedoara', luna: 'ianuarie', img: 'images/angajari.jpg', angajator: 'BONIMET SRL', adresa: 'Str. B-dul IULIU MANIU 6, Loc. DEVA,tel. 0254218440', locDeMuncaVacant: 'SOMELIER', conditiiDeOcupare: 'Fără Experiență', nrLocuri: '2', telefon: '', email:'' },
{id:'341', judet: 'hunedoara', luna: 'ianuarie', img: 'images/angajari.jpg', angajator: 'NIKSAR AUTO CONSTRUCT SRL VALCELE BUNE', adresa: 'Satul VICELELE BUNE 126, Loc. BRETEA ROMÂNĂ', locDeMuncaVacant: 'SPALATOR VEHICULE', conditiiDeOcupare: 'Începător', nrLocuri: '1', telefon: '', email:'' },
{id:'342', judet: 'hunedoara', luna: 'ianuarie', img: 'images/angajari.jpg', angajator: 'RAPID EXPRES SRL', adresa: 'Str. LIBERTATII, Bl. A, Sc. C, Et. 1, Ap. 48, Loc. DEVA', locDeMuncaVacant: 'SPECIALIST MARKETING', conditiiDeOcupare: 'Fără Experiență', nrLocuri: '1', telefon: '', email:'' },
{id:'343', judet: 'hunedoara', luna: 'ianuarie', img: 'images/angajari.jpg', angajator: 'CENTRUL DE AFACERI MASTER', adresa: 'STR. IMPARATUL TRAIAN 42, Loc. DEVA,tel. 218111', locDeMuncaVacant: 'SPECIALIST PLAN PROGRES', conditiiDeOcupare: 'Avansat', nrLocuri: '1', telefon: '', email:'' },
{id:'344', judet: 'hunedoara', luna: 'ianuarie', img: 'images/angajari.jpg', angajator: 'SARMISMOB SA', adresa: 'Str. DR. VICTOR SUIAGA 2, Loc. DEVA,tel. 0737034621', locDeMuncaVacant: 'STIVUITORIST', conditiiDeOcupare: 'Fără Experiență', nrLocuri: '2', telefon: '', email:'' },
{id:'345', judet: 'hunedoara', luna: 'ianuarie', img: 'images/angajari.jpg', angajator: 'ALIM COM MH SRL', adresa: 'B-dul MIHAI VITEAZU 43, Loc. HUNEDOARA,tel. 0354881118', locDeMuncaVacant: 'STRUNGAR UNIVERSAL', conditiiDeOcupare: 'Fără Experiență', nrLocuri: '1', telefon: '', email:'' },
{id:'346', judet: 'hunedoara', luna: 'ianuarie', img: 'images/angajari.jpg', angajator: 'IMPERIAL PG SRL', adresa: 'Str. DACIA 2, Loc. PETROŞANI,tel. 0721424444', locDeMuncaVacant: 'STRUNGAR UNIVERSAL', conditiiDeOcupare: 'Începător', nrLocuri: '1', telefon: '', email:'' },
{id:'347', judet: 'hunedoara', luna: 'ianuarie', img: 'images/angajari.jpg', angajator: 'MACON SRL', adresa: 'STR. SANTUHALM 1, Loc. DEVA,tel. 0254213930', locDeMuncaVacant: 'STRUNGAR UNIVERSAL', conditiiDeOcupare: 'Fără Experiență', nrLocuri: '1', telefon: '', email:'' },
{id:'348', judet: 'hunedoara', luna: 'ianuarie', img: 'images/angajari.jpg', angajator: 'REPARATII SIDERURGICE SA', adresa: 'Str. FURNALISTULUI 17G, Loc. CĂLAN', locDeMuncaVacant: 'STRUNGAR UNIVERSAL', conditiiDeOcupare: 'Experiență Medie', nrLocuri: '1', telefon: '', email:'' },
{id:'349', judet: 'hunedoara', luna: 'ianuarie', img: 'images/angajari.jpg', angajator: 'ALIM COM MH SRL', adresa: 'B-dul MIHAI VITEAZU 43, Loc. HUNEDOARA,tel. 0354881118', locDeMuncaVacant: 'SUDOR', conditiiDeOcupare: 'Fără Experiență', nrLocuri: '3', telefon: '', email:'' },
{id:'350', judet: 'hunedoara', luna: 'ianuarie', img: 'images/angajari.jpg', angajator: 'ASSA ABLOY ENTRANCE SYSTEMS PRODUCTION ROMANIA S.R.L.', adresa: 'Str. Peştişul Mare 363, C.P. 331008, Loc. HUNEDOARA,tel. 0354808380', locDeMuncaVacant: 'SUDOR', conditiiDeOcupare: 'Fără Experiență', nrLocuri: '10', telefon: '', email:'' },
{id:'351', judet: 'hunedoara', luna: 'ianuarie', img: 'images/angajari.jpg', angajator: 'IMPERIAL PG SRL', adresa: 'Str. DACIA 2, Loc. PETROŞANI,tel. 0721424444', locDeMuncaVacant: 'SUDOR', conditiiDeOcupare: 'Fără Experiență', nrLocuri: '1', telefon: '', email:'' },
{id:'352', judet: 'hunedoara', luna: 'ianuarie', img: 'images/angajari.jpg', angajator: 'MACON SRL', adresa: 'STR. SANTUHALM 1, Loc. DEVA,tel. 0254213930', locDeMuncaVacant: 'SUDOR', conditiiDeOcupare: 'Începător', nrLocuri: '1', telefon: '', email:'' },
{id:'353', judet: 'hunedoara', luna: 'ianuarie', img: 'images/angajari.jpg', angajator: 'MIRA MON PRESTCOM SRL', adresa: 'Bulevardul Mihai Viteazu 46, C.P. 331039, Loc. HUNEDOARA,tel. 0354881118', locDeMuncaVacant: 'SUDOR', conditiiDeOcupare: 'Fără Experiență', nrLocuri: '3', telefon: '', email:'' },
{id:'354', judet: 'hunedoara', luna: 'ianuarie', img: 'images/angajari.jpg', angajator: 'RECOM SID SA', adresa: 'Str. P-ta IANCU DE HUNEDOARA 1, Loc. HUNEDOARA,tel. 0254207022', locDeMuncaVacant: 'SUDOR', conditiiDeOcupare: 'Fără Experiență', nrLocuri: '5', telefon: '', email:'' },
{id:'355', judet: 'hunedoara', luna: 'ianuarie', img: 'images/angajari.jpg', angajator: 'REVA S.A.', adresa: 'Str. Sos. NATIONALA 138, Loc. SIMERIA,tel. 0254260402', locDeMuncaVacant: 'SUDOR', conditiiDeOcupare: 'Începător', nrLocuri: '1', telefon: '', email:'' },
{id:'356', judet: 'hunedoara', luna: 'ianuarie', img: 'images/angajari.jpg', angajator: 'SC DEVA STEEL CORPORATION SRL', adresa: 'Piaţa IANCU DE HUNEDOARA 1, Loc. HUNEDOARA,tel. 0723819493', locDeMuncaVacant: 'SUDOR', conditiiDeOcupare: 'Începător', nrLocuri: '5', telefon: '', email:'' },
{id:'357', judet: 'hunedoara', luna: 'ianuarie', img: 'images/angajari.jpg', angajator: 'SWISS TRADE SRL', adresa: 'Str. B-dul 1848 5, Loc. HUNEDOARA,tel. 0722103015', locDeMuncaVacant: 'SUDOR MANUAL CU ARC ELECTRIC', conditiiDeOcupare: 'Fără Experiență', nrLocuri: '1', telefon: '', email:'' },
{id:'358', judet: 'hunedoara', luna: 'ianuarie', img: 'images/angajari.jpg', angajator: 'IMPERIAL PG SRL', adresa: 'Str. DACIA 2, Loc. PETROŞANI,tel. 0721424444', locDeMuncaVacant: 'TAIETOR LA FERASTRAU PANGLICA', conditiiDeOcupare: 'Fără Experiență', nrLocuri: '1', telefon: '', email:'' },
{id:'359', judet: 'hunedoara', luna: 'ianuarie', img: 'images/angajari.jpg', angajator: 'DEAL MOBBIN SRL', adresa: 'Str. MIHAIL KOGALNICEANU 13, Loc. ORĂŞTIE,tel. 0254243398', locDeMuncaVacant: 'TÂMPLAR UNIVERSAL', conditiiDeOcupare: 'Fără Experiență', nrLocuri: '1', telefon: '', email:'' },
{id:'360', judet: 'hunedoara', luna: 'ianuarie', img: 'images/angajari.jpg', angajator: 'ITALROM LEATHER SRL', adresa: 'Satul MINTIA 202F, Loc. VEŢEL,tel. 0254/236620', locDeMuncaVacant: 'TÂMPLAR UNIVERSAL', conditiiDeOcupare: 'Fără Experiență', nrLocuri: '1', telefon: '', email:'' },
{id:'361', judet: 'hunedoara', luna: 'ianuarie', img: 'images/angajari.jpg', angajator: 'LIGNUM PROD SRL', adresa: 'B-DUL 22 DECEMBRIE, Bl. 4, Sc. B, Et. 2, Ap. 33, Loc. DEVA,tel. 0254242553', locDeMuncaVacant: 'TÂMPLAR UNIVERSAL', conditiiDeOcupare: 'Fără Experiență', nrLocuri: '1', telefon: '', email:'' },
{id:'362', judet: 'hunedoara', luna: 'ianuarie', img: 'images/angajari.jpg', angajator: 'SARMISMOB SA', adresa: 'Str. DR. VICTOR SUIAGA 2, Loc. DEVA,tel. 0737034621', locDeMuncaVacant: 'TÂMPLAR UNIVERSAL', conditiiDeOcupare: 'Fără Experiență', nrLocuri: '6', telefon: '', email:'' },
{id:'363', judet: 'hunedoara', luna: 'ianuarie', img: 'images/angajari.jpg', angajator: 'TOTAL MOBILA PRODCOM SRL', adresa: 'Str. STEFAN CEL MARE 6, Loc. PETROŞANI,tel. 0723636381', locDeMuncaVacant: 'TÂMPLAR UNIVERSAL', conditiiDeOcupare: 'Fără Experiență', nrLocuri: '2', telefon: '', email:'' },
{id:'364', judet: 'hunedoara', luna: 'ianuarie', img: 'images/angajari.jpg', angajator: 'COMPUTERLINE SRL', adresa: 'Str. 1 MAI 1, Loc. HUNEDOARA,tel. 0723368189', locDeMuncaVacant: 'TEHNICIAN ECHIPAMENTE DE CALCUL SI RETELE', conditiiDeOcupare: 'Fără Experiență', nrLocuri: '1', telefon: '', email:'' },
{id:'365', judet: 'hunedoara', luna: 'ianuarie', img: 'images/angajari.jpg', angajator: 'UNITECH COMPUTER SRL', adresa: 'Str. N. IORGA 24, Loc. DEVA,tel. 0254212626', locDeMuncaVacant: 'TEHNICIAN ECHIPAMENTE DE CALCUL SI RETELE', conditiiDeOcupare: 'Fără Experiență', nrLocuri: '4', telefon: '', email:'' },
{id:'366', judet: 'hunedoara', luna: 'ianuarie', img: 'images/angajari.jpg', angajator: 'INTERMEDIA CALL 2005 SRL', adresa: 'STR. C-TIN BURSAN 14, Loc. HUNEDOARA,tel. 0723170931', locDeMuncaVacant: 'TEHNICIAN ÎN INDUSTRIA TEXTILA', conditiiDeOcupare: 'Fără Experiență', nrLocuri: '1', telefon: '', email:'' },
{id:'367', judet: 'hunedoara', luna: 'ianuarie', img: 'images/angajari.jpg', angajator: 'SENZITIV SRL', adresa: 'Str. STADIONULUI 14, Ap. 2, Loc. PETRILA,tel. 0722464455', locDeMuncaVacant: 'USCATOR-DESHIDRATOR LEGUME, FRUCTE', conditiiDeOcupare: 'Fără Experiență', nrLocuri: '1', telefon: '', email:'' },
{id:'368', judet: 'hunedoara', luna: 'ianuarie', img: 'images/angajari.jpg', angajator: 'ALIMAR & ANASTASIA SRL', adresa: 'Str. Traian 10, C.P. 336200, Loc. VULCAN,tel. 0762438923', locDeMuncaVacant: 'VÂNZATOR', conditiiDeOcupare: 'Fără Experiență', nrLocuri: '1', telefon: '', email:'' },
{id:'369', judet: 'hunedoara', luna: 'ianuarie', img: 'images/angajari.jpg', angajator: 'ANDALEX TOTAL S.R.L.', adresa: 'PATRIEI, Bl. D1, Sc. 1, Et. 3, Ap. 37, Loc. DEVA', locDeMuncaVacant: 'VÂNZATOR', conditiiDeOcupare: 'Începător', nrLocuri: '1', telefon: '', email:'' },
{id:'370', judet: 'hunedoara', luna: 'ianuarie', img: 'images/angajari.jpg', angajator: 'CAFE BAR FARCASIU LUCIANO SRL', adresa: 'Str. PRINCIPALA 21, C.P. 335300, Loc. CĂLAN', locDeMuncaVacant: 'VÂNZATOR', conditiiDeOcupare: 'Începător', nrLocuri: '1', telefon: '', email:'' },
{id:'371', judet: 'hunedoara', luna: 'ianuarie', img: 'images/angajari.jpg', angajator: 'CDMS LOGOS SRL', adresa: 'Str. MIHAI VITEAZUL 36, Bl. 82, Sc. C, Ap. 22, Loc. VULCAN,tel. 0254571175', locDeMuncaVacant: 'VÂNZATOR', conditiiDeOcupare: 'Fără Experiență', nrLocuri: '1', telefon: '', email:'' },
{id:'372', judet: 'hunedoara', luna: 'ianuarie', img: 'images/angajari.jpg', angajator: 'DEDEMAN SRL', adresa: 'Calea ION ZAVOI 2-4, SECTORUL 1, BUCUREŞTI,tel. 0234525525', locDeMuncaVacant: 'VÂNZATOR', conditiiDeOcupare: 'Începător', nrLocuri: '1', telefon: '', email:'' },
{id:'373', judet: 'hunedoara', luna: 'ianuarie', img: 'images/angajari.jpg', angajator: 'FIRST CLASS SRL', adresa: 'Str. LUNCII 4A, Loc. ORĂŞTIE', locDeMuncaVacant: 'VÂNZATOR', conditiiDeOcupare: 'Fără Experiență', nrLocuri: '1', telefon: '', email:'' },
{id:'374', judet: 'hunedoara', luna: 'ianuarie', img: 'images/angajari.jpg', angajator: 'MIHAELA PRESTIMPEX SRL', adresa: 'B-DUL DACIA 39, Bl. 47B, Et. PARTER, Ap. ELEGANCE, Loc. HUNEDOARA,tel. 0724524175', locDeMuncaVacant: 'VÂNZATOR', conditiiDeOcupare: 'Fără Experiență', nrLocuri: '1', telefon: '', email:'' },
{id:'375', judet: 'hunedoara', luna: 'ianuarie', img: 'images/angajari.jpg', angajator: 'PAPY DOLCE S.R.L.', adresa: '1848 34, Bl. 34, Sc. A, Ap. 3, Loc. HUNEDOARA,tel. 0727740890', locDeMuncaVacant: 'VÂNZATOR', conditiiDeOcupare: 'Fără Experiență', nrLocuri: '2', telefon: '', email:'' },
{id:'376', judet: 'hunedoara', luna: 'ianuarie', img: 'images/angajari.jpg', angajator: 'PREST TODOSIN SRL', adresa: 'Str. CIMPULUI 99, Loc. CĂLAN,tel. 0721215442', locDeMuncaVacant: 'VÂNZATOR', conditiiDeOcupare: 'Experiență Medie', nrLocuri: '2', telefon: '', email:'' },
{id:'377', judet: 'hunedoara', luna: 'ianuarie', img: 'images/angajari.jpg', angajator: 'PROFI ROM FOOD SRL', adresa: 'Calea Sever Bocu 31, Bl. A1, Loc. TIMIŞOARA, tel. 0372568838', locDeMuncaVacant: 'VÂNZATOR', conditiiDeOcupare: 'Fără Experiență', nrLocuri: '4', telefon: '', email:'' },
{id:'378', judet: 'hunedoara', luna: 'ianuarie', img: 'images/angajari.jpg', angajator: 'RUMATI SERVTCOM SRL', adresa: 'Str. RACASTIE 49, Loc. HUNEDOARA,tel. 0742354079', locDeMuncaVacant: 'VÂNZATOR', conditiiDeOcupare: 'Fără Experiență', nrLocuri: '2', telefon: '', email:'' },
{id:'379', judet: 'hunedoara', luna: 'ianuarie', img: 'images/angajari.jpg', angajator: 'SC LUCKY MIRAJ PLUS SRL', adresa: 'Str. NICOLAE BĂLCESCU, Bl. 3, Ap. 21,  DEVA,tel. 0747047700', locDeMuncaVacant: 'VÂNZATOR', conditiiDeOcupare: 'Fără Experiență', nrLocuri: '1', telefon: '', email:'' },
{id:'380', judet: 'hunedoara', luna: 'ianuarie', img: 'images/angajari.jpg', angajator: 'SC R&F ROMARIA STIL SRL ORASTIE', adresa: 'Str. Pricazului, Bl. 40, C.P. 335700, Loc. ORĂŞTIE', locDeMuncaVacant: 'VÂNZATOR', conditiiDeOcupare: 'Fără Experiență', nrLocuri: '1', telefon: '', email:'' },
{id:'381', judet: 'hunedoara', luna: 'ianuarie', img: 'images/angajari.jpg', angajator: 'SC SEMINEE HORNURI SOBE', adresa: 'Satul BANITA 239, Loc. BĂNIŢA', locDeMuncaVacant: 'VÂNZATOR', conditiiDeOcupare: 'Fără Experiență', nrLocuri: '1', telefon: '', email:'' },
{id:'382', judet: 'hunedoara', luna: 'ianuarie', img: 'images/angajari.jpg', angajator: 'ASSA ABLOY ENTRANCE SYSTEMS PRODUCTION ROMANIA S.R.L.', adresa: 'Str. Peştişul Mare 363, C.P. 331008, Loc. HUNEDOARA,tel. 0354808380', locDeMuncaVacant: 'VOPSITOR INDUSTRIAL', conditiiDeOcupare: 'Fără Experiență', nrLocuri: '2', telefon: '', email:'' },
{id:'383', judet: 'hunedoara', luna: 'ianuarie', img: 'images/angajari.jpg', angajator: 'RECOM SID SA', adresa: 'Str. P-ta IANCU DE HUNEDOARA 1, Loc. HUNEDOARA,tel. 0254207022', locDeMuncaVacant: 'VOPSITOR INDUSTRIAL', conditiiDeOcupare: 'Fără Experiență', nrLocuri: '1', telefon: '', email:'' },
{id:'384', judet: 'hunedoara', luna: 'ianuarie', img: 'images/angajari.jpg', angajator: 'ADINA MEGATRUST S.R.L.', adresa: 'TRANDAFIRILOR 1, Bl. 14, Sc. B, Ap. 23, Loc. HUNEDOARA,tel. 0773926749', locDeMuncaVacant: 'ZIDAR ROSAR-TENCUITOR', conditiiDeOcupare: 'Fără Experiență', nrLocuri: '5', telefon: '', email:'' },
{id:'385', judet: 'hunedoara', luna: 'ianuarie', img: 'images/angajari.jpg', angajator: 'ALIM COM MH SRL', adresa: 'B-dul MIHAI VITEAZU 43, Loc. HUNEDOARA,tel. 0354881118', locDeMuncaVacant: 'ZIDAR ROSAR-TENCUITOR', conditiiDeOcupare: 'Fără Experiență', nrLocuri: '2', telefon: '', email:'' },
{id:'386', judet: 'hunedoara', luna: 'ianuarie', img: 'images/angajari.jpg', angajator: 'MIRA MON PRESTCOM SRL', adresa: 'Bulevardul Mihai Viteazu 46, C.P. 331039, Loc. HUNEDOARA,tel. 0354881118', locDeMuncaVacant: 'ZIDAR ROSAR-TENCUITOR', conditiiDeOcupare: 'Fără Experiență', nrLocuri: '2', telefon: '', email:'' },
{id:'387', judet: 'hunedoara', luna: 'ianuarie', img: 'images/angajari.jpg', angajator: 'TERACO PROD SRL', adresa: 'Bulevardul Libertatii 6, Ap. 33, C.P. 331032, Loc. HUNEDOARA,tel. 0723382241', locDeMuncaVacant: 'ZIDAR ROSAR-TENCUITOR', conditiiDeOcupare: 'Fără Experiență', nrLocuri: '2', telefon: '', email:'' },
{id:'388', judet: 'hunedoara', luna: 'decembrie', img: 'images/angajari.jpg', angajator: 'SC SCENART THEATRE', adresa: 'Str. Avram Iancu, Bl. H3, C.P. 330025, Loc. DEVA, tel.', locDeMuncaVacant: 'ACTOR', conditiiDeOcupare: 'Fără Experiență', nrLocuri: '1', telefon: '', email:'' },
{id:'389', judet: 'hunedoara', luna: 'decembrie', img: 'images/angajari.jpg', angajator: 'D.G.A.S.P.C. HUNEDOARA', adresa: 'BLD. IULIU MANIU 18, Loc. DEVA, tel. 0254233341', locDeMuncaVacant: 'ADMINISTRATOR', conditiiDeOcupare: 'Fără Experiență', nrLocuri: '1', telefon: '', email:'' },
{id:'390', judet: 'hunedoara', luna: 'decembrie', img: 'images/angajari.jpg', angajator: 'ASOCIATIA PROPRIETARILOR DE LOCUINTE', adresa: 'PTA. 1 DECEMBRIE 1918 10, Bl. 15, Sc. A, Ap. 7, Loc. HUNEDOARA, tel. 0749378623', locDeMuncaVacant: 'ADMINISTRATOR', conditiiDeOcupare: 'Începător', nrLocuri: '1', telefon: '', email:'' },
{id:'391', judet: 'hunedoara', luna: 'decembrie', img: 'images/angajari.jpg', angajator: 'PRIORITAR IMPEX SRL', adresa: 'Str. BRADULUI (PT NR. 2), Loc. CĂLAN, tel.', locDeMuncaVacant: 'AGENT COMERCIAL', conditiiDeOcupare: 'Experiență Medie', nrLocuri: '4', telefon: '', email:'' },
{id:'392', judet: 'hunedoara', luna: 'decembrie', img: 'images/angajari.jpg', angajator: 'SC DILSTOP SRL', adresa: 'Str. 22 Decembrie 39, C.P. 335300, Loc. CĂLAN, tel.', locDeMuncaVacant: 'AGENT COMERCIAL', conditiiDeOcupare: 'Fără Experiență', nrLocuri: '1', telefon: '', email:'' },
{id:'393', judet: 'hunedoara', luna: 'decembrie', img: 'images/angajari.jpg', angajator: 'SC ROM LEATHER SOFAS SRL', adresa: 'Satul Soimus 409, Loc. DEVA, tel. 0254237411', locDeMuncaVacant: 'AGENT CONTRACTARI SI ACHIZITII (BROKER MARFURI)', conditiiDeOcupare: 'Începător', nrLocuri: '1', telefon: '', email:'' },
{id:'394', judet: 'hunedoara', luna: 'decembrie', img: 'images/angajari.jpg', angajator: 'ASOCIATIA MERIT', adresa: 'Bdul 22 Decembrie 37A, Bl. CLADIREA CEPROMIN, Ap. 221, Loc. DEVA, tel. 0254218111', locDeMuncaVacant: 'AGENT CURATENIE CLADIRI SI MIJLOACE DE TRANSPORT', conditiiDeOcupare: 'Fără Experiență', nrLocuri: '2', telefon: '', email:'' },
{id:'395', judet: 'hunedoara', luna: 'decembrie', img: 'images/angajari.jpg', angajator: 'GEDI SECURITY', adresa: 'Str. Horea 212, C.P. 330139, Loc. DEVA, tel.', locDeMuncaVacant: 'AGENT DE SECURITATE', conditiiDeOcupare: 'Fără Experiență', nrLocuri: '1', telefon: '', email:'' },
{id:'396', judet: 'hunedoara', luna: 'decembrie', img: 'images/angajari.jpg', angajator: 'GEDI SECURITY', adresa: 'Str. Horea 212, C.P. 330139, Loc. DEVA, tel.', locDeMuncaVacant: 'AGENT DE SECURITATE INTERVENȚIE', conditiiDeOcupare: 'Fără Experiență', nrLocuri: '2', telefon: '', email:'' },
{id:'397', judet: 'hunedoara', luna: 'decembrie', img: 'images/angajari.jpg', angajator: 'COMPLEX HOTELIER GERMISARA', adresa: 'Str. GERMISARA 1B, Loc. GEOAGIU, tel. 0734010560', locDeMuncaVacant: 'AJUTOR OSPATAR', conditiiDeOcupare: 'Fără Experiență', nrLocuri: '1', telefon: '', email:'' },
{id:'398', judet: 'hunedoara', luna: 'decembrie', img: 'images/angajari.jpg', angajator: 'EURO FOOD &DISTRIBUTION', adresa: 'Piaţa Libertatii 4, C.P. 331130, Loc. HUNEDOARA, tel. 0748190699', locDeMuncaVacant: 'AMBALATOR MANUAL', conditiiDeOcupare: 'Fără Experiență', nrLocuri: '25', telefon: '', email:'' },
{id:'399', judet: 'hunedoara', luna: 'decembrie', img: 'images/angajari.jpg', angajator: 'LUDOTECA NEVERLAND SRL-D', adresa: 'Str. Preot Nistor Socaciu 7, C.P. 335900, Loc. SIMERIA', locDeMuncaVacant: 'ANIMATOR SOCIOEDUCATIV', conditiiDeOcupare: 'Fără Experiență', nrLocuri: '1', telefon: '', email:'' },
{id:'400', judet: 'hunedoara', luna: 'decembrie', img: 'images/angajari.jpg', angajator: 'LOBY PLAST SRL', adresa: 'Str. Horia 6, Loc. SIMERIA, tel. 0723553063', locDeMuncaVacant: 'ASAMBLATOR-MONTATOR PROFILE ALUMINIU SI GEAM TERMOPAN', conditiiDeOcupare: 'Fără Experiență', nrLocuri: '2', telefon: '', email:'' },
{id:'401', judet: 'hunedoara', luna: 'decembrie', img: 'images/angajari.jpg', angajator: 'D.G.A.S.P.C. HUNEDOARA', adresa: 'BLD. IULIU MANIU 18, Loc. DEVA, tel. 0254233341', locDeMuncaVacant: 'ASISTENT MATERNAL', conditiiDeOcupare: 'Fără Experiență', nrLocuri: '1', telefon: '', email:'' },
{id:'402', judet: 'hunedoara', luna: 'decembrie', img: 'images/angajari.jpg', angajator: 'D.G.A.S.P.C. HUNEDOARA', adresa: 'BLD. IULIU MANIU 18, Loc. DEVA, tel. 0254233341', locDeMuncaVacant: 'ASISTENT MATERNAL', conditiiDeOcupare: 'Fără Experiență', nrLocuri: '1', telefon: '', email:'' },
{id:'403', judet: 'hunedoara', luna: 'decembrie', img: 'images/angajari.jpg', angajator: 'IMPO MIHAI SRL', adresa: 'P-ta. LIBERTATII, Bl. 5A, Sc. F, Et. 1, Ap. 53, Loc. CĂLAN, tel. 0254730430', locDeMuncaVacant: 'BARMAN', conditiiDeOcupare: 'Începător', nrLocuri: '2', telefon: '', email:'' },
{id:'404', judet: 'hunedoara', luna: 'decembrie', img: 'images/angajari.jpg', angajator: 'RUSTICANA MIXT S.R.L.', adresa: 'BOS 114, Loc. HUNEDOARA, tel. 0722512818', locDeMuncaVacant: 'BARMAN', conditiiDeOcupare: 'Fără Experiență', nrLocuri: '2', telefon: '', email:'' },
{id:'405', judet: 'hunedoara', luna: 'decembrie', img: 'images/angajari.jpg', angajator: 'SC EIBY ROCKA SRL D', adresa: 'Str. Libertăţii 16, C.P. 335300, Loc. CĂLAN, tel.', locDeMuncaVacant: 'BETONIST', conditiiDeOcupare: 'Începător', nrLocuri: '1', telefon: '', email:'' },
{id:'406', judet: 'hunedoara', luna: 'decembrie', img: 'images/angajari.jpg', angajator: 'MACON SRL', adresa: 'STR. SANTUHALM 1, Loc. DEVA, tel. 0254213930', locDeMuncaVacant: 'BETONIST', conditiiDeOcupare: 'Fără Experiență', nrLocuri: '5', telefon: '', email:'' },
{id:'407', judet: 'hunedoara', luna: 'decembrie', img: 'images/angajari.jpg', angajator: 'RESEDINTA PENTRU SENIORI', adresa: 'Str. Rotarilor 141, C.P. 331116, Loc. HUNEDOARA, tel. 0773762509', locDeMuncaVacant: 'BUCATAR', conditiiDeOcupare: 'Fără Experiență', nrLocuri: '2', telefon: '', email:'' },
{id:'408', judet: 'hunedoara', luna: 'decembrie', img: 'images/angajari.jpg', angajator: 'PARADIS TOUR STRAJA S.R.L.', adresa: 'Str. STRAJA, Loc. LUPENI, tel. 0724887293', locDeMuncaVacant: 'BUCATAR', conditiiDeOcupare: 'Fără Experiență', nrLocuri: '3', telefon: '', email:'' },
{id:'409', judet: 'hunedoara', luna: 'decembrie', img: 'images/angajari.jpg', angajator: 'SC PAULORE FOOD SRL', adresa: 'Str. Closca, C.P. 332013, Loc. PETROŞANI, tel.', locDeMuncaVacant: 'BUCATAR', conditiiDeOcupare: 'Fără Experiență', nrLocuri: '1', telefon: '', email:'' },
{id:'410', judet: 'hunedoara', luna: 'decembrie', img: 'images/angajari.jpg', angajator: 'M&F MASTER CAFFE SRL', adresa: 'Str. Libertatii 4, C.P. 331128, Loc. HUNEDOARA, tel. 0768103419', locDeMuncaVacant: 'CAMERISTA HOTEL', conditiiDeOcupare: 'Fără Experiență', nrLocuri: '1', telefon: '', email:'' },
{id:'411', judet: 'hunedoara', luna: 'decembrie', img: 'images/angajari.jpg', angajator: 'RUMATI SERVTCOM SRL', adresa: 'Str. RACASTIE 49, Loc. HUNEDOARA, tel. 0742354079', locDeMuncaVacant: 'COAFOR', conditiiDeOcupare: 'Începător', nrLocuri: '1', telefon: '', email:'' },
{id:'412', judet: 'hunedoara', luna: 'decembrie', img: 'images/angajari.jpg', angajator: 'BASDEEARIS TRAN SRL', adresa: 'Bdul Traian 2, C.P. 331050, Loc. HUNEDOARA, tel.', locDeMuncaVacant: 'CONDUCATOR ACTIVITATE DE TRANSPORT RUTIER', conditiiDeOcupare: 'Începător', nrLocuri: '1', telefon: '', email:'' },
{id:'413', judet: 'hunedoara', luna: 'decembrie', img: 'images/angajari.jpg', angajator: 'NEW FASHION GROUP SRL', adresa: 'Str. TARGULUI 29, Loc. ORĂŞTIE, tel. 0254246204', locDeMuncaVacant: 'CONFECTIONER ARTICOLE DIN PIELE SI ÎNLOCUITORI', conditiiDeOcupare: 'Fără Experiență', nrLocuri: '1', telefon: '', email:'' },
{id:'414', judet: 'hunedoara', luna: 'decembrie', img: 'images/angajari.jpg', angajator: 'INTERMEDIA CALL 2005 SRL', adresa: 'STR. CONSTANTIN BURSAN 14, Loc. HUNEDOARA, tel. 0723170931', locDeMuncaVacant: 'CONFECTIONER-ASAMBLOR ART. DIN TEXTILE', conditiiDeOcupare: 'Experimentat', nrLocuri: '2', telefon: '', email:'' },
{id:'415', judet: 'hunedoara', luna: 'decembrie', img: 'images/angajari.jpg', angajator: 'SUCCES CONF RO SRL', adresa: 'Str. CARPATI 49, Loc. HUNEDOARA, tel. 0354405380', locDeMuncaVacant: 'CONFECTIONER-ASAMBLOR ARTICOLE DIN TEXTILE', conditiiDeOcupare: 'Fără Experiență', nrLocuri: '2', telefon: '', email:'' },
{id:'416', judet: 'hunedoara', luna: 'decembrie', img: 'images/angajari.jpg', angajator: 'BIROU INDIVIDUAL NOTARIAL', adresa: 'STR. REPUBLICII, Bl. 8, Loc. BRAD, tel. 0254612600', locDeMuncaVacant: 'CONSILIER JURIDIC', conditiiDeOcupare: 'Fără Experiență', nrLocuri: '1', telefon: '', email:'' },
{id:'417', judet: 'hunedoara', luna: 'decembrie', img: 'images/angajari.jpg', angajator: 'SCM MITRANOVICI&MITRANOVICI', adresa: 'STR. MARASTI, Bl. 2, Sc. B, Et. P, Ap. 12, Loc. DEVA, tel.', locDeMuncaVacant: 'CONSILIER JURIDIC', conditiiDeOcupare: 'Fără Experiență', nrLocuri: '1', telefon: '', email:'' },
{id:'418', judet: 'hunedoara', luna: 'decembrie', img: 'images/angajari.jpg', angajator: 'D.G.A.S.P.C. HUNEDOARA', adresa: 'BLD. IULIU MANIU 18, Loc. DEVA, tel. 0254233341', locDeMuncaVacant: 'CONSILIER/EXPERT/INSPECTOR/REFERENT/ECONOMIST ÎN ECONOMIE GENERALA', conditiiDeOcupare: 'Fără Experiență', nrLocuri: '1', telefon: '', email:'' },
{id:'419', judet: 'hunedoara', luna: 'decembrie', img: 'images/angajari.jpg', angajator: 'REG NAŢA PĂDURILOR ROMSILVA RA BUCUREŞTI SUCURSALA DIRECŢIA SILVICĂ HUNEDOARA', adresa: 'MIHAI VITEAZU 10, Loc. DEVA, tel. 0254205100', locDeMuncaVacant: 'CONSILIER/EXPERT/INSPECTOR/REFERENT/ECONOMIST ÎN ECONOMIE GENERALA', conditiiDeOcupare: 'Fără Experiență', nrLocuri: '1', telefon: '', email:'' },
{id:'420', judet: 'hunedoara', luna: 'decembrie', img: 'images/angajari.jpg', angajator: 'SARMISMOB SA', adresa: 'Str. DR. VICTOR SUIAGA 2, Loc. DEVA, tel. 0737034621', locDeMuncaVacant: 'CONSILIER/EXPERT/INSPECTOR/REFERENT/ECONOMIST ÎN GESTIUNEA ECONOMICA', conditiiDeOcupare: 'Fără Experiență', nrLocuri: '1', telefon: '', email:'' },
{id:'421', judet: 'hunedoara', luna: 'decembrie', img: 'images/angajari.jpg', angajator: 'CENTRUL DE AFACERI MASTER', adresa: 'STR. IMPARATUL TRAIAN 42, Loc. DEVA, tel. 0254218111', locDeMuncaVacant: 'CONSULTANT ÎN MANAGEMENT', conditiiDeOcupare: 'Experimentat', nrLocuri: '3', telefon: '', email:'' },
{id:'422', judet: 'hunedoara', luna: 'decembrie', img: 'images/angajari.jpg', angajator: 'SANEX COM SRL', adresa: 'Str. M.KOGALNICEANU, Bl. 14, Et. P, Loc. DEVA, tel. 0254215858', locDeMuncaVacant: 'CONTABIL', conditiiDeOcupare: 'Fără Experiență', nrLocuri: '1', telefon: '', email:'' },
{id:'423', judet: 'hunedoara', luna: 'decembrie', img: 'images/angajari.jpg', angajator: 'EDOROM METAL SRL', adresa: 'STR. CALEA ROMANILOR 28, Loc. GEOAGIU, tel. 0254248450', locDeMuncaVacant: 'CONTABIL', conditiiDeOcupare: 'Fără Experiență', nrLocuri: '2', telefon: '', email:'' },
{id:'424', judet: 'hunedoara', luna: 'decembrie', img: 'images/angajari.jpg', angajator: 'RUMATI SERVTCOM SRL', adresa: 'Str. RACASTIE 49, Loc. HUNEDOARA, tel. 0742354079', locDeMuncaVacant: 'CONTABIL', conditiiDeOcupare: 'Experiență Medie', nrLocuri: '1', telefon: '', email:'' },
{id:'425', judet: 'hunedoara', luna: 'decembrie', img: 'images/angajari.jpg', angajator: 'SC ROM LEATHER SOFAS SRL', adresa: 'Satul Soimus 409, Loc. DEVA, tel. 0254237411', locDeMuncaVacant: 'CONTROLOR CALITATE', conditiiDeOcupare: 'Fără Experiență', nrLocuri: '2', telefon: '', email:'' },
{id:'426', judet: 'hunedoara', luna: 'decembrie', img: 'images/angajari.jpg', angajator: 'INTERMEDIA CALL 2005 SRL', adresa: 'STR. CONSTANTIN BURSAN 14, Loc. HUNEDOARA, tel. 0723170931', locDeMuncaVacant: 'CONTROLOR CALITATE', conditiiDeOcupare: 'Experimentat', nrLocuri: '1', telefon: '', email:'' },
{id:'427', judet: 'hunedoara', luna: 'decembrie', img: 'images/angajari.jpg', angajator: 'RUMATI SERVTCOM SRL', adresa: 'Str. RACASTIE 49, Loc. HUNEDOARA, tel. 0742354079', locDeMuncaVacant: 'CONTROLOR TRAFIC', conditiiDeOcupare: 'Începător', nrLocuri: '1', telefon: '', email:'' },
{id:'428', judet: 'hunedoara', luna: 'decembrie', img: 'images/angajari.jpg', angajator: 'NEW FASHION GROUP SRL', adresa: 'Str. TARGULUI 29, Loc. ORĂŞTIE, tel. 0254246204', locDeMuncaVacant: 'CROITOR CONFECTII INDUSTRIALE DIN BLANA', conditiiDeOcupare: 'Fără Experiență', nrLocuri: '1', telefon: '', email:'' },
{id:'429', judet: 'hunedoara', luna: 'decembrie', img: 'images/angajari.jpg', angajator: 'ASSA ABLOY ENTRANCE SYSTEMS PRODUCTION ROMANIA S.R.L.', adresa: 'Str. Peştişul Mare 363, C.P. 331008, Loc. HUNEDOARA, tel. 0354808380', locDeMuncaVacant: 'CURATITOR-SABLATOR', conditiiDeOcupare: 'Fără Experiență', nrLocuri: '1', telefon: '', email:'' },
{id:'430', judet: 'hunedoara', luna: 'decembrie', img: 'images/angajari.jpg', angajator: 'ROSTYLE ALEX SRL', adresa: 'Str. ABATORULUI 3, Loc. BRAD, tel. 0254612768', locDeMuncaVacant: 'CUSATOR PIESE DIN PIELE SI ÎNLOCUITORI', conditiiDeOcupare: 'Fără Experiență', nrLocuri: '10', telefon: '', email:'' },
{id:'431', judet: 'hunedoara', luna: 'decembrie', img: 'images/angajari.jpg', angajator: 'NEW FASHION GROUP SRL', adresa: 'Str. TARGULUI 29, Loc. ORĂŞTIE, tel. 0254246204', locDeMuncaVacant: 'CUSATOR PIESE DIN PIELE SI ÎNLOCUITORI', conditiiDeOcupare: 'Fără Experiență', nrLocuri: '3', telefon: '', email:'' },
{id:'432', judet: 'hunedoara', luna: 'decembrie', img: 'images/angajari.jpg', angajator: 'BARIO 86 SRL', adresa: 'STR. INDEPENDENTEI 8, Ap. 16, Loc. HAŢEG, tel. 0763646155', locDeMuncaVacant: 'DIRECTOR SOCIETATE COMERCIALA', conditiiDeOcupare: 'Experiență Medie', nrLocuri: '1', telefon: '', email:'' },
{id:'433', judet: 'hunedoara', luna: 'decembrie', img: 'images/angajari.jpg', angajator: 'GEDI SECURITY', adresa: 'Str. Horea 212, C.P. 330139, Loc. DEVA, tel.', locDeMuncaVacant: 'DISPECER CENTRU DE ALARMA', conditiiDeOcupare: 'Fără Experiență', nrLocuri: '1', telefon: '', email:'' },
{id:'434', judet: 'hunedoara', luna: 'decembrie', img: 'images/angajari.jpg', angajator: 'MIHAI GROUP CONSTRUCT SRL', adresa: 'Str. Libertăţii 17, Ap. 13, C.P. 335100, Loc. ANINOASA, tel. 0736828105', locDeMuncaVacant: 'DULGHER (EXCLUSIV RESTAURATOR)', conditiiDeOcupare: 'Avansat', nrLocuri: '2', telefon: '', email:'' },
{id:'435', judet: 'hunedoara', luna: 'decembrie', img: 'images/angajari.jpg', angajator: 'PETRA PAM S.R.L.', adresa: 'BRAII, Bl. 7, Sc. 2, Et. 1, Ap. 25, Loc. LUPENI, tel.', locDeMuncaVacant: 'DULGHER (EXCLUSIV RESTAURATOR)', conditiiDeOcupare: 'Fără Experiență', nrLocuri: '2', telefon: '', email:'' },
{id:'436', judet: 'hunedoara', luna: 'decembrie', img: 'images/angajari.jpg', angajator: 'DOR PLURICOMPREST SRL', adresa: 'B-dul DECEBAL-COMPLEX COMERCIAL CENTRAL, Et. 1, Loc. DEVA, tel. 0254230630', locDeMuncaVacant: 'ELECTRICIAN DE ÎNTRETINERE SI REPARATII', conditiiDeOcupare: 'Fără Experiență', nrLocuri: '1', telefon: '', email:'' },
{id:'437', judet: 'hunedoara', luna: 'decembrie', img: 'images/angajari.jpg', angajator: 'ALIM COM MH SRL', adresa: 'B-dul MIHAI VITEAZU 43, Loc. HUNEDOARA, tel. 0354881118', locDeMuncaVacant: 'ELECTRICIAN DE ÎNTRETINERE SI REPARATII', conditiiDeOcupare: 'Fără Experiență', nrLocuri: '2', telefon: '', email:'' },
{id:'438', judet: 'hunedoara', luna: 'decembrie', img: 'images/angajari.jpg', angajator: 'MIRA MON PRESTCOM SRL', adresa: 'Bdul Mihai Viteazu 46, C.P. 331039, Loc. HUNEDOARA, tel. 0354881118', locDeMuncaVacant: 'ELECTRICIAN DE ÎNTRETINERE SI REPARATII', conditiiDeOcupare: 'Fără Experiență', nrLocuri: '3', telefon: '', email:'' },
{id:'439', judet: 'hunedoara', luna: 'decembrie', img: 'images/angajari.jpg', angajator: 'IMPERIAL PG SRL', adresa: 'Str. DACIA 2, Loc. PETROŞANI, tel.', locDeMuncaVacant: 'ELECTRICIAN DE ÎNTRETINERE SI REPARATII', conditiiDeOcupare: 'Fără Experiență', nrLocuri: '1', telefon: '', email:'' },
{id:'440', judet: 'hunedoara', luna: 'decembrie', img: 'images/angajari.jpg', angajator: 'ADEC ELECTRO S.R.L.', adresa: 'MURESULUI 88, Bl. C43, Sc. A, Et. 2, Ap. 10, Loc. HUNEDOARA, tel. 0745587381', locDeMuncaVacant: 'ELECTRICIAN ÎN CONSTRUCTII', conditiiDeOcupare: 'Începător', nrLocuri: '1', telefon: '', email:'' },
{id:'441', judet: 'hunedoara', luna: 'decembrie', img: 'images/angajari.jpg', angajator: 'ALIM COM MH SRL', adresa: 'B-dul MIHAI VITEAZU 43, Loc. HUNEDOARA, tel. 0354881118', locDeMuncaVacant: 'ELECTROMECANIC', conditiiDeOcupare: 'Fără Experiență', nrLocuri: '1', telefon: '', email:'' },
{id:'442', judet: 'hunedoara', luna: 'decembrie', img: 'images/angajari.jpg', angajator: 'MIRA MON PRESTCOM SRL', adresa: 'Bdul Mihai Viteazu 46, C.P. 331039, Loc. HUNEDOARA, tel. 0354881118', locDeMuncaVacant: 'EXCAVATORIST PENTRU EXCAVATOARE CU ROTOR DE MARE CAPACITATE', conditiiDeOcupare: 'Fără Experiență', nrLocuri: '2', telefon: '', email:'' },
{id:'443', judet: 'hunedoara', luna: 'decembrie', img: 'images/angajari.jpg', angajator: 'ASOCIATIA MERIT', adresa: 'Bdul 22 Decembrie 37A, Bl. CLADIREA CEPROMIN, Ap. 221, Loc. DEVA, tel. 0254218111', locDeMuncaVacant: 'FEMEIE DE SERVICIU', conditiiDeOcupare: 'Fără Experiență', nrLocuri: '2', telefon: '', email:'' },
{id:'444', judet: 'hunedoara', luna: 'decembrie', img: 'images/angajari.jpg', angajator: 'RESEDINTA PENTRU SENIORI', adresa: 'Str. Rotarilor 141, C.P. 331116, Loc. HUNEDOARA, tel. 0773762509', locDeMuncaVacant: 'FEMEIE DE SERVICIU', conditiiDeOcupare: 'Fără Experiență', nrLocuri: '2', telefon: '', email:'' },
{id:'445', judet: 'hunedoara', luna: 'decembrie', img: 'images/angajari.jpg', angajator: 'BADEA PUIU ADRIAN PFA', adresa: 'Satul RIUL ALB 101, Loc. SĂLAŞU DE SUS, tel.', locDeMuncaVacant: 'FEMEIE DE SERVICIU', conditiiDeOcupare: 'Fără Experiență', nrLocuri: '2', telefon: '', email:'' },
{id:'446', judet: 'hunedoara', luna: 'decembrie', img: 'images/angajari.jpg', angajator: 'MIHAI GROUP CONSTRUCT SRL', adresa: 'Str. Libertăţii 17, Ap. 13, C.P. 335100, Loc. ANINOASA, tel. 0736828105', locDeMuncaVacant: 'FIERAR BETONIST', conditiiDeOcupare: 'Avansat', nrLocuri: '3', telefon: '', email:'' },
{id:'447', judet: 'hunedoara', luna: 'decembrie', img: 'images/angajari.jpg', angajator: 'IMPERIAL PG SRL', adresa: 'Str. DACIA 2, Loc. PETROŞANI, tel.', locDeMuncaVacant: 'FREZOR UNIVERSAL', conditiiDeOcupare: 'Începător', nrLocuri: '1', telefon: '', email:'' },
{id:'448', judet: 'hunedoara', luna: 'decembrie', img: 'images/angajari.jpg', angajator: 'RUMATI SERVTCOM SRL', adresa: 'Str. RACASTIE 49, Loc. HUNEDOARA, tel. 0742354079', locDeMuncaVacant: 'FRIZER', conditiiDeOcupare: 'Fără Experiență', nrLocuri: '2', telefon: '', email:'' },
{id:'449', judet: 'hunedoara', luna: 'decembrie', img: 'images/angajari.jpg', angajator: 'SARMISMOB SA', adresa: 'Str. DR. VICTOR SUIAGA 2, Loc. DEVA, tel. 0737034621', locDeMuncaVacant: 'GESTIONAR DEPOZIT', conditiiDeOcupare: 'Fără Experiență', nrLocuri: '1', telefon: '', email:'' },
{id:'450', judet: 'hunedoara', luna: 'decembrie', img: 'images/angajari.jpg', angajator: 'HIGH TOPO TERRA SRL', adresa: 'Localitate BĂNIŢA, tel. 0723636381', locDeMuncaVacant: 'INGINER GEODEZ', conditiiDeOcupare: 'Începător', nrLocuri: '1', telefon: '', email:'' },
{id:'451', judet: 'hunedoara', luna: 'decembrie', img: 'images/angajari.jpg', angajator: 'INSTALATII GEVIS SRL', adresa: 'Str. ARDEALULUI 1, Loc. DEVA, tel. 0254225049', locDeMuncaVacant: 'INGINER INSTALATII PENTRU CONSTRUCTII', conditiiDeOcupare: 'Fără Experiență', nrLocuri: '1', telefon: '', email:'' },
{id:'452', judet: 'hunedoara', luna: 'decembrie', img: 'images/angajari.jpg', angajator: 'ALIM COM MH SRL', adresa: 'B-dul MIHAI VITEAZU 43, Loc. HUNEDOARA, tel. 0354881118', locDeMuncaVacant: 'INGINER MECANIC', conditiiDeOcupare: 'Fără Experiență', nrLocuri: '2', telefon: '', email:'' },
{id:'453', judet: 'hunedoara', luna: 'decembrie', img: 'images/angajari.jpg', angajator: 'RESTAURANT CARO SRL', adresa: 'B-DUL LIBERTATII, Bl. L2, Ap. 14, Loc. DEVA, tel. 0254218630', locDeMuncaVacant: 'ÎNSOTITOR', conditiiDeOcupare: 'Fără Experiență', nrLocuri: '1', telefon: '', email:'' },
{id:'454', judet: 'hunedoara', luna: 'decembrie', img: 'images/angajari.jpg', angajator: 'PRIORITAR IMPEX SRL', adresa: 'Str. BRADULUI (PUNCT TERMIC NR. 2), Loc. CĂLAN, tel.', locDeMuncaVacant: 'INSPECTOR DOCUMENTE SECRETE', conditiiDeOcupare: 'Experiență Medie', nrLocuri: '4', telefon: '', email:'' },
{id:'455', judet: 'hunedoara', luna: 'decembrie', img: 'images/angajari.jpg', angajator: 'SARMISMOB SA', adresa: 'Str. DR. VICTOR SUIAGA 2, Loc. DEVA, tel. 0737034621', locDeMuncaVacant: 'INSPECTOR ÎN DOMENIUL SECURITATII SI SANATATII ÎN MUNCA', conditiiDeOcupare: 'Fără Experiență', nrLocuri: '1', telefon: '', email:'' },
{id:'456', judet: 'hunedoara', luna: 'decembrie', img: 'images/angajari.jpg', angajator: 'ALIM COM MH SRL', adresa: 'B-dul MIHAI VITEAZU 43, Loc. HUNEDOARA, tel. 0354881118', locDeMuncaVacant: 'INSTALATOR ÎNCALZIRE CENTRALA SI GAZE', conditiiDeOcupare: 'Fără Experiență', nrLocuri: '5', telefon: '', email:'' },
{id:'457', judet: 'hunedoara', luna: 'decembrie', img: 'images/angajari.jpg', angajator: 'MIRA MON PRESTCOM SRL', adresa: 'Bdul Mihai Viteazu 46, C.P. 331039, Loc. HUNEDOARA, tel. 0354881118', locDeMuncaVacant: 'INSTALATOR ÎNCALZIRE CENTRALA SI GAZE', conditiiDeOcupare: 'Fără Experiență', nrLocuri: '3', telefon: '', email:'' },
{id:'458', judet: 'hunedoara', luna: 'decembrie', img: 'images/angajari.jpg', angajator: 'APA PROD SA', adresa: 'CALEA ZARANDULUI 43, Loc. DEVA, tel. 0254222345', locDeMuncaVacant: 'LABORANT CHIMIST', conditiiDeOcupare: 'Începător', nrLocuri: '1', telefon: '', email:'' },
{id:'459', judet: 'hunedoara', luna: 'decembrie', img: 'images/angajari.jpg', angajator: 'SC DEVA STEEL CORPORATION', adresa: 'Piaţa IANCU DE HUNEDOARA 1, Loc. HUNEDOARA, tel. 0723819493', locDeMuncaVacant: 'LACATUS MECANIC', conditiiDeOcupare: 'Începător', nrLocuri: '5', telefon: '', email:'' },
{id:'460', judet: 'hunedoara', luna: 'decembrie', img: 'images/angajari.jpg', angajator: 'ASSA ABLOY ENTRANCE SYSTEMS PRODUCTION ROMANIA S.R.L.', adresa: 'Str. Peştişul Mare 363, C.P. 331008, Loc. HUNEDOARA, tel. 0354808380', locDeMuncaVacant: 'LACATUS MECANIC', conditiiDeOcupare: 'Fără Experiență', nrLocuri: '10', telefon: '', email:'' },
{id:'461', judet: 'hunedoara', luna: 'decembrie', img: 'images/angajari.jpg', angajator: 'UZINA MECANICA ORASTIE SA', adresa: 'Str. NICOLAE TITULESCU 60, Loc. ORĂŞTIE, tel.', locDeMuncaVacant: 'LACATUS MECANIC', conditiiDeOcupare: 'Fără Experiență', nrLocuri: '2', telefon: '', email:'' },
{id:'462', judet: 'hunedoara', luna: 'decembrie', img: 'images/angajari.jpg', angajator: 'UZINA MECANICA ORASTIE SA', adresa: 'Str. NICOLAE TITULESCU 60, Loc. ORĂŞTIE, tel.', locDeMuncaVacant: 'LACATUS MECANIC', conditiiDeOcupare: 'Fără Experiență', nrLocuri: '1', telefon: '', email:'' },
{id:'463', judet: 'hunedoara', luna: 'decembrie', img: 'images/angajari.jpg', angajator: 'CHIMSPORT S.A.', adresa: 'Str. Codrului 24, C.P. 335700, Loc. ORĂŞTIE, tel.', locDeMuncaVacant: 'LACATUS MECANIC DE ÎNTRETINERE SI REPARATII UNIVERSALE', conditiiDeOcupare: 'Fără Experiență', nrLocuri: '1', telefon: '', email:'' },
{id:'464', judet: 'hunedoara', luna: 'decembrie', img: 'images/angajari.jpg', angajator: 'NEW FASHION GROUP SRL', adresa: 'Str. TARGULUI 29, Loc. ORĂŞTIE, tel. 0254246204', locDeMuncaVacant: 'LACATUS MECANIC DE ÎNTRETINERE SI REPARATII UNIVERSALE', conditiiDeOcupare: 'Fără Experiență', nrLocuri: '1', telefon: '', email:'' },
{id:'465', judet: 'hunedoara', luna: 'decembrie', img: 'images/angajari.jpg', angajator: 'MAVE STIL SRL', adresa: 'STR. MINERULUI, Bl. E, Sc. C, Et. P, Ap. 50, Loc. DEVA, tel. 0254222863', locDeMuncaVacant: 'LACATUS-MONTATOR', conditiiDeOcupare: 'Fără Experiență', nrLocuri: '1', telefon: '', email:'' },
{id:'466', judet: 'hunedoara', luna: 'decembrie', img: 'images/angajari.jpg', angajator: 'TERACO PROD SRL', adresa: 'Bdul Libertatii 6, Ap. 33, C.P. 331032, Loc. HUNEDOARA, tel. 0723382241', locDeMuncaVacant: 'LEGATOR DE SARCINA', conditiiDeOcupare: 'Fără Experiență', nrLocuri: '4', telefon: '', email:'' },
{id:'467', judet: 'hunedoara', luna: 'decembrie', img: 'images/angajari.jpg', angajator: 'M&F MASTER CAFFE SRL', adresa: 'Str. Libertatii 4, C.P. 331128, Loc. HUNEDOARA, tel. 0768103419', locDeMuncaVacant: 'LUCRATOR BUCATARIE (SPALATOR VASE MARI)', conditiiDeOcupare: 'Fără Experiență', nrLocuri: '2', telefon: '', email:'' },
{id:'468', judet: 'hunedoara', luna: 'decembrie', img: 'images/angajari.jpg', angajator: 'ALBATROS EXPRESS S.R.L.', adresa: 'VICTORIEI 5, Loc. HUNEDOARA, tel. 0254711220', locDeMuncaVacant: 'LUCRATOR BUCATARIE (SPALATOR VASE MARI)', conditiiDeOcupare: 'Fără Experiență', nrLocuri: '1', telefon: '', email:'' },
{id:'469', judet: 'hunedoara', luna: 'decembrie', img: 'images/angajari.jpg', angajator: 'IVA XSOUND SRL', adresa: 'STR. ANTON PANN 76, Loc. PETROŞANI, tel. 0744574440', locDeMuncaVacant: 'LUCRATOR BUCATARIE (SPALATOR VASE MARI)', conditiiDeOcupare: 'Fără Experiență', nrLocuri: '1', telefon: '', email:'' },
{id:'470', judet: 'hunedoara', luna: 'decembrie', img: 'images/angajari.jpg', angajator: 'NAIRDA VIO PAN S.R.L.-D.', adresa: 'Str. Gen. Vasile Milea, Bl. D2, PARTER, Loc. BRAD, tel.', locDeMuncaVacant: 'LUCRATOR COMERCIAL', conditiiDeOcupare: 'Fără Experiență', nrLocuri: '1', telefon: '', email:'' },
{id:'471', judet: 'hunedoara', luna: 'decembrie', img: 'images/angajari.jpg', angajator: 'BIA MINIMARKET JUNIOR', adresa: 'Bdul Dacia, Bl. 11, PARTER, C.P. 330106, Loc. DEVA, tel. 0724099101', locDeMuncaVacant: 'LUCRATOR COMERCIAL', conditiiDeOcupare: 'Fără Experiență', nrLocuri: '1', telefon: '', email:'' },
{id:'472', judet: 'hunedoara', luna: 'decembrie', img: 'images/angajari.jpg', angajator: 'COFFEE & BEVERAGE S.R.L.', adresa: 'Str. 1 Decembrie 1918, 18, Loc. DEVA, tel. 0736335414', locDeMuncaVacant: 'LUCRATOR COMERCIAL', conditiiDeOcupare: 'Fără Experiență', nrLocuri: '2', telefon: '', email:'' },
{id:'473', judet: 'hunedoara', luna: 'decembrie', img: 'images/angajari.jpg', angajator: 'NOBLESSE FLOWERS & EVENTS', adresa: 'Str. PANSELUŢELOR, Bl. 27, Sc. 3, PARTER, Ap. 30, Loc. DEVA, tel.', locDeMuncaVacant: 'LUCRATOR COMERCIAL', conditiiDeOcupare: 'Fără Experiență', nrLocuri: '1', telefon: '', email:'' },
{id:'474', judet: 'hunedoara', luna: 'decembrie', img: 'images/angajari.jpg', angajator: 'VLADYX WORLD', adresa: 'Str. Ulpia 25, Ap. 7, C.P. 330013, Loc. DEVA, tel. 0744505284', locDeMuncaVacant: 'LUCRATOR COMERCIAL', conditiiDeOcupare: 'Începător', nrLocuri: '1', telefon: '', email:'' },
{id:'475', judet: 'hunedoara', luna: 'decembrie', img: 'images/angajari.jpg', angajator: 'DURAM SRL', adresa: 'Str. 22 Decembrie 5, Bl. CM2, Ap. 59, C.P. 331021, Loc. HUNEDOARA, tel. 0722185395', locDeMuncaVacant: 'LUCRATOR COMERCIAL', conditiiDeOcupare: 'Fără Experiență', nrLocuri: '1', telefon: '', email:'' },
{id:'476', judet: 'hunedoara', luna: 'decembrie', img: 'images/angajari.jpg', angajator: 'DAV SERVCOM', adresa: 'Str. Tudor Vladimirescu, Bl. 38, C.P. 335800, Loc. PETRILA, tel. 0726373967', locDeMuncaVacant: 'LUCRATOR COMERCIAL', conditiiDeOcupare: 'Începător', nrLocuri: '1', telefon: '', email:'' },
{id:'477', judet: 'hunedoara', luna: 'decembrie', img: 'images/angajari.jpg', angajator: 'S.C.PROD MOB O VIS', adresa: 'Str. Republicii, Bl. 54, Ap. 42, C.P. 335800, Loc. PETRILA, tel. 0725497488', locDeMuncaVacant: 'LUCRATOR COMERCIAL', conditiiDeOcupare: 'Fără Experiență', nrLocuri: '1', telefon: '', email:'' },
{id:'478', judet: 'hunedoara', luna: 'decembrie', img: 'images/angajari.jpg', angajator: 'CASTECO INVEST SRL', adresa: 'Str. MURESULUI 18, Loc. DEVA, tel. 0254231888', locDeMuncaVacant: 'LUCRATOR SORTATOR DESEURI RECICLABILE', conditiiDeOcupare: 'Fără Experiență', nrLocuri: '2', telefon: '', email:'' },
{id:'479', judet: 'hunedoara', luna: 'decembrie', img: 'images/angajari.jpg', angajator: 'CASTECO INVEST SRL', adresa: 'Str. MURESULUI 18, Loc. DEVA, tel. 0254231888', locDeMuncaVacant: 'LUCRATOR SORTATOR DESEURI RECICLABILE', conditiiDeOcupare: 'Fără Experiență', nrLocuri: '1', telefon: '', email:'' },
{id:'480', judet: 'hunedoara', luna: 'decembrie', img: 'images/angajari.jpg', angajator: 'CADELPLAST GROUP SRL', adresa: 'Str. Carpati 51-55, C.P. 331032, Loc. HUNEDOARA, tel. 0254716518', locDeMuncaVacant: 'LUCRATOR SORTATOR DESEURI RECICLABILE', conditiiDeOcupare: 'Fără Experiență', nrLocuri: '2', telefon: '', email:'' },
{id:'481', judet: 'hunedoara', luna: 'decembrie', img: 'images/angajari.jpg', angajator: 'INTERMEDIA CALL 2005 SRL', adresa: 'STR. CONSTANTIN BURSAN 14, Loc. HUNEDOARA, tel. 0723170931', locDeMuncaVacant: 'MAGAZINER', conditiiDeOcupare: 'Experimentat', nrLocuri: '1', telefon: '', email:'' },
{id:'482', judet: 'hunedoara', luna: 'decembrie', img: 'images/angajari.jpg', angajator: 'INTERMEDIA CALL 2005 SRL', adresa: 'STR. CONSTANTIN BURSAN 14, Loc. HUNEDOARA, tel. 0723170931', locDeMuncaVacant: 'MAISTRU ÎN INDUSTRIILE TEXTILA, PIELARIE', conditiiDeOcupare: 'Fără Experiență', nrLocuri: '1', telefon: '', email:'' },
{id:'483', judet: 'hunedoara', luna: 'decembrie', img: 'images/angajari.jpg', angajator: 'VISA SA', adresa: 'STR. INDEPENDENTEI 5, Loc. PETROŞANI, tel. 0254545454', locDeMuncaVacant: 'MANAGER MARKETING (TARIFE, CONTRACTE, ACHIZITII)', conditiiDeOcupare: 'Fără Experiență', nrLocuri: '1', telefon: '', email:'' },
{id:'484', judet: 'hunedoara', luna: 'decembrie', img: 'images/angajari.jpg', angajator: 'EUROSPORT DHS SA', adresa: 'Str. SÂNTUHALM 35A, Loc. DEVA, tel. 0254210001', locDeMuncaVacant: 'MANIPULANT MARFURI', conditiiDeOcupare: 'Fără Experiență', nrLocuri: '10', telefon: '', email:'' },
{id:'485', judet: 'hunedoara', luna: 'decembrie', img: 'images/angajari.jpg', angajator: 'POLIROMITA SRL', adresa: 'Str. DOROBANTI 32A, Loc. DEVA, tel.', locDeMuncaVacant: 'MANIPULANT MARFURI', conditiiDeOcupare: 'Fără Experiență', nrLocuri: '1', telefon: '', email:'' },
{id:'486', judet: 'hunedoara', luna: 'decembrie', img: 'images/angajari.jpg', angajator: 'DURAKRON CONVERT SRL', adresa: 'Bdul Dacia 9, Bl. A1-2, Ap. 16, C.P. 331013, Loc. HUNEDOARA, tel. 0766773746', locDeMuncaVacant: 'MANIPULANT MARFURI', conditiiDeOcupare: 'Fără Experiență', nrLocuri: '2', telefon: '', email:'' },
{id:'487', judet: 'hunedoara', luna: 'decembrie', img: 'images/angajari.jpg', angajator: 'CART MET PLAST SRL', adresa: 'Str. LUNCII 1, Loc. ORĂŞTIE, tel. 0254247470', locDeMuncaVacant: 'MANIPULANT MARFURI', conditiiDeOcupare: 'Fără Experiență', nrLocuri: '1', telefon: '', email:'' },
{id:'488', judet: 'hunedoara', luna: 'decembrie', img: 'images/angajari.jpg', angajator: 'GILEX PROD SRL', adresa: 'Localitate BERIU, tel. 0254246070', locDeMuncaVacant: 'MANIPULANT MARFURI', conditiiDeOcupare: 'Fără Experiență', nrLocuri: '1', telefon: '', email:'' },
{id:'489', judet: 'hunedoara', luna: 'decembrie', img: 'images/angajari.jpg', angajator: 'M3 CONDESIGN SRL-D', adresa: 'Str. Petofi Şandor 15, Loc. HUNEDOARA, tel. 0744218929', locDeMuncaVacant: 'MASINIST LA MASINI CALE MECANIZARE USOARA SI GREA', conditiiDeOcupare: 'Avansat', nrLocuri: '1', telefon: '', email:'' },
{id:'490', judet: 'hunedoara', luna: 'decembrie', img: 'images/angajari.jpg', angajator: 'INSTALATII GEVIS SRL', adresa: 'Str. ARDEALULUI 1, Loc. DEVA, tel. 0254225049', locDeMuncaVacant: 'MASINIST LA MASINI PENTRU TERASAMENTE (IFRONIST)', conditiiDeOcupare: 'Fără Experiență', nrLocuri: '1', telefon: '', email:'' },
{id:'491', judet: 'hunedoara', luna: 'decembrie', img: 'images/angajari.jpg', angajator: 'MACON SRL', adresa: 'STR. SANTUHALM 1, Loc. DEVA, tel. 0254213930', locDeMuncaVacant: 'MASINIST PENTRU PREFABRICATE DIN BETON SI BETON ARMAT', conditiiDeOcupare: 'Fără Experiență', nrLocuri: '1', telefon: '', email:'' },
{id:'492', judet: 'hunedoara', luna: 'decembrie', img: 'images/angajari.jpg', angajator: 'MACON SRL', adresa: 'STR. SANTUHALM 1, Loc. DEVA, tel. 0254213930', locDeMuncaVacant: 'MASINIST PENTRU PREFABRICATE DIN BETON SI BETON ARMAT', conditiiDeOcupare: 'Fără Experiență', nrLocuri: '4', telefon: '', email:'' },
{id:'493', judet: 'hunedoara', luna: 'decembrie', img: 'images/angajari.jpg', angajator: 'EXPLOMIN SRL', adresa: 'Str. ARDEALULUI 1, Loc. DEVA, tel.', locDeMuncaVacant: 'MASINIST PENTRU UTILAJE SPECIFICE LA EXTRACTIE SI EXECUTIA TUNELURILOR', conditiiDeOcupare: 'Fără Experiență', nrLocuri: '2', telefon: '', email:'' },
{id:'494', judet: 'hunedoara', luna: 'decembrie', img: 'images/angajari.jpg', angajator: 'MCA INVEST INDUSTRIAL SRL', adresa: 'STR. IMPARATUL TRAIAN 34, DEVA, tel. 0721508378', locDeMuncaVacant: 'MECANIC AUTO', conditiiDeOcupare: 'Fără Experiență', nrLocuri: '5', telefon: '', email:'' },
{id:'495', judet: 'hunedoara', luna: 'decembrie', img: 'images/angajari.jpg', angajator: 'FORCE PROD SERV SRL', adresa: 'STR. COROESTI 18, Loc. VULCAN, tel.', locDeMuncaVacant: 'MECANIC AUTO', conditiiDeOcupare: 'Începător', nrLocuri: '1', telefon: '', email:'' },
{id:'496', judet: 'hunedoara', luna: 'decembrie', img: 'images/angajari.jpg', angajator: 'INTERMEDIA CALL 2005 SRL', adresa: 'STR. CONSTANTIN BURSAN 14, Loc. HUNEDOARA, tel. 0723170931', locDeMuncaVacant: 'MECANIC ÎNTRETINERE SI REPARATII MASINI DE CUSUT INDUSTRIALE', conditiiDeOcupare: 'Fără Experiență', nrLocuri: '1', telefon: '', email:'' },
{id:'497', judet: 'hunedoara', luna: 'decembrie', img: 'images/angajari.jpg', angajator: 'VOL SPRINT TRUCK SRL', adresa: 'STR. ION CREANGA, Bl. 36, Sc. D, Ap. 44, Loc. DEVA, tel. 0758836584', locDeMuncaVacant: 'MECANIC UTILAJ', conditiiDeOcupare: 'Fără Experiență', nrLocuri: '1', telefon: '', email:'' },
{id:'498', judet: 'hunedoara', luna: 'decembrie', img: 'images/angajari.jpg', angajator: 'VOL SPRINT TRUCK SRL', adresa: 'STR. ION CREANGA, Bl. 36, Sc. D, Ap. 44, Loc. DEVA, tel. 0758836584', locDeMuncaVacant: 'MECANIC UTILAJ', conditiiDeOcupare: 'Începător', nrLocuri: '2', telefon: '', email:'' },
{id:'499', judet: 'hunedoara', luna: 'decembrie', img: 'images/angajari.jpg', angajator: 'ALIM COM MH SRL', adresa: 'B-dul MIHAI VITEAZU 43, HUNEDOARA, tel. 0354881118', locDeMuncaVacant: 'MECANIC UTILAJ', conditiiDeOcupare: 'Fără Experiență', nrLocuri: '2', telefon: '', email:'' },
{id:'500', judet: 'hunedoara', luna: 'decembrie', img: 'images/angajari.jpg', angajator: 'COLBER CORPORATION SRL', adresa: 'SAT PESTISUL MARE DJ 687,INCINTA 4, Bl. HALA 1, Loc. HUNEDOARA, tel. 0354808280', locDeMuncaVacant: 'MONTATOR SUBANSAMBLE', conditiiDeOcupare: 'Fără Experiență', nrLocuri: '10', telefon: '', email:'' },
{id:'501', judet: 'hunedoara', luna: 'decembrie', img: 'images/angajari.jpg', angajator: 'DAR DRAXLMAIER AUTOMOTIVE', adresa: 'Bdul Traian 19, C.P. 331023, HUNEDOARA, tel. 0354403725', locDeMuncaVacant: 'MONTATOR SUBANSAMBLE', conditiiDeOcupare: 'Fără Experiență', nrLocuri: '3', telefon: '', email:'' },
{id:'502', judet: 'hunedoara', luna: 'decembrie', img: 'images/angajari.jpg', angajator: 'DAR DRAXLMAIER AUTOMOTIVE', adresa: 'Bdul Traian 19, C.P. 331023, Loc. HUNEDOARA, tel. 0354403725', locDeMuncaVacant: 'MONTATOR SUBANSAMBLE', conditiiDeOcupare: 'Fără Experiență', nrLocuri: '40', telefon: '', email:'' },
{id:'503', judet: 'hunedoara', luna: 'decembrie', img: 'images/angajari.jpg', angajator: 'AGROZOOTEHNICA SRL', adresa: 'Str. Aurel Vlaicu 25, Loc. DEVA, tel.', locDeMuncaVacant: 'MUNC NEC ÎN AGRICULTURA', conditiiDeOcupare: 'Fără Experiență', nrLocuri: '4', telefon: '', email:'' },
{id:'504', judet: 'hunedoara', luna: 'decembrie', img: 'images/angajari.jpg', angajator: 'BOSCO AMICO SRL', adresa: 'Str. PROGRESULUI 35, Loc. HAŢEG, tel.', locDeMuncaVacant: 'MUNC NEC ÎN AGRICULTURA', conditiiDeOcupare: 'Fără Experiență', nrLocuri: '1', telefon: '', email:'' },
{id:'505', judet: 'hunedoara', luna: 'decembrie', img: 'images/angajari.jpg', angajator: 'ROSTYLE ALEX SRL', adresa: 'Str. ABATORULUI 3, Loc. BRAD, tel. 0254612768', locDeMuncaVacant: 'MUNC NEC ÎN INDUSTRIA CONFECTIILOR', conditiiDeOcupare: 'Fără Experiență', nrLocuri: '5', telefon: '', email:'' },
{id:'506', judet: 'hunedoara', luna: 'decembrie', img: 'images/angajari.jpg', angajator: 'REPARATII SIDERURGICE SA', adresa: 'Str. FURNALISTULUI 17G, Loc. CĂLAN, tel.', locDeMuncaVacant: 'MUNC NEC ÎN INDUSTRIA CONFECTIILOR', conditiiDeOcupare: 'Fără Experiență', nrLocuri: '1', telefon: '', email:'' },
{id:'507', judet: 'hunedoara', luna: 'decembrie', img: 'images/angajari.jpg', angajator: 'SC ROM LEATHER SOFAS SRL', adresa: 'Satul Soimus 409, Loc. DEVA, tel. 0254237411', locDeMuncaVacant: 'MUNC NEC ÎN INDUSTRIA CONFECTIILOR', conditiiDeOcupare: 'Fără Experiență', nrLocuri: '4', telefon: '', email:'' },
{id:'508', judet: 'hunedoara', luna: 'decembrie', img: 'images/angajari.jpg', angajator: 'SC ROM LEATHER SOFAS SRL', adresa: 'Satul Soimus 409, Loc. DEVA, tel. 0254237411', locDeMuncaVacant: 'MUNC NEC ÎN INDUSTRIA CONFECTIILOR', conditiiDeOcupare: 'Fără Experiență', nrLocuri: '5', telefon: '', email:'' },
{id:'509', judet: 'hunedoara', luna: 'decembrie', img: 'images/angajari.jpg', angajator: 'EXPLOMIN SRL', adresa: 'Str. ARDEALULUI 1, Loc. DEVA, tel.', locDeMuncaVacant: 'MUNC NEC ÎN MINE SI CARIERE', conditiiDeOcupare: 'Fără Experiență', nrLocuri: '2', telefon: '', email:'' },
{id:'510', judet: 'hunedoara', luna: 'decembrie', img: 'images/angajari.jpg', angajator: 'MEYSTAR SRL', adresa: 'Str. SCHITULUI 6, TELIUCU INFERIOR, tel. 0254738776', locDeMuncaVacant: 'MUNC NEC ÎN SILVICULTURA', conditiiDeOcupare: 'Fără Experiență', nrLocuri: '1', telefon: '', email:'' },
{id:'511', judet: 'hunedoara', luna: 'decembrie', img: 'images/angajari.jpg', angajator: 'SC SAMCARLIS', adresa: 'Str. Independentei 1, C.P. 335300, Loc. CĂLAN, tel.', locDeMuncaVacant: 'MUNC NEC LA AMBALAREA PRODUSELOR SOLIDE SI SEMISOLIDE', conditiiDeOcupare: 'Începător', nrLocuri: '1', telefon: '', email:'' },
{id:'512', judet: 'hunedoara', luna: 'decembrie', img: 'images/angajari.jpg', angajator: 'SARMISMOB SA', adresa: 'Str. DR. VICTOR SUIAGA 2, Loc. DEVA, tel. 0737034621', locDeMuncaVacant: 'MUNC NEC LA ASAMBL., MONTAREA PIESELOR', conditiiDeOcupare: 'Fără Experiență', nrLocuri: '13', telefon: '', email:'' },
{id:'513', judet: 'hunedoara', luna: 'decembrie', img: 'images/angajari.jpg', angajator: 'SARMISMOB SA', adresa: 'Str. DR. VICTOR SUIAGA 2, Loc. DEVA, tel. 0737034621', locDeMuncaVacant: 'MUNC NEC LA ASAMBL., MONTAREA PIESELOR', conditiiDeOcupare: 'Fără Experiență', nrLocuri: '1', telefon: '', email:'' },
{id:'514', judet: 'hunedoara', luna: 'decembrie', img: 'images/angajari.jpg', angajator: 'CERURIM S.R.L.', adresa: 'Str. SÂNTUHALM 35A, Loc. DEVA, tel. 0746161652', locDeMuncaVacant: 'MUNC NEC LA ASAMBL., MONTAREA PIESELOR', conditiiDeOcupare: 'Începător', nrLocuri: '1', telefon: '', email:'' },
{id:'515', judet: 'hunedoara', luna: 'decembrie', img: 'images/angajari.jpg', angajator: 'EUROSPORT DHS SA', adresa: 'Str. SÂNTUHALM 35A, Loc. DEVA, tel. 0254210001', locDeMuncaVacant: 'MUNC NEC LA ASAMBL., MONTAREA PIESELOR', conditiiDeOcupare: 'Fără Experiență', nrLocuri: '50', telefon: '', email:'' },
{id:'516', judet: 'hunedoara', luna: 'decembrie', img: 'images/angajari.jpg', angajator: 'SEWS ROMANIA SRL', adresa: 'Calea Zarandului 166, C.P. 330092, DEVA, tel. 0254206600', locDeMuncaVacant: 'MUNC NEC LA ASAMBL., MONTAREA PIESELOR', conditiiDeOcupare: 'Experiență Medie', nrLocuri: '2', telefon: '', email:'' },
{id:'517', judet: 'hunedoara', luna: 'decembrie', img: 'images/angajari.jpg', angajator: 'SC DEVA STEEL CORPORATION', adresa: 'Piaţa IANCU DE HUNEDOARA 1, Loc. HUNEDOARA, tel. 0723819493', locDeMuncaVacant: 'MUNC NEC LA ASAMBL., MONTAREA PIESELOR', conditiiDeOcupare: 'Fără Experiență', nrLocuri: '4', telefon: '', email:'' },
{id:'518', judet: 'hunedoara', luna: 'decembrie', img: 'images/angajari.jpg', angajator: 'CHIMSPORT S.A.', adresa: 'Str. Codrului 24, C.P. 335700, Loc. ORĂŞTIE, tel.', locDeMuncaVacant: 'MUNC NEC LA ASAMBL., MONTAREA PIESELOR', conditiiDeOcupare: 'Fără Experiență', nrLocuri: '1', telefon: '', email:'' },
{id:'519', judet: 'hunedoara', luna: 'decembrie', img: 'images/angajari.jpg', angajator: 'PETRA PAM S.R.L.', adresa: 'BRAII, Bl. 7, Sc. 2, Et. 1, Ap. 25, Loc. LUPENI, tel.', locDeMuncaVacant: 'MUNC NEC LA DEMOLAREA CLADIRILOR, CAPTUSELI ZIDARIE, PLACI MOZAIC, FAIANTA, GRESIE, PARCHET', conditiiDeOcupare: 'Începător', nrLocuri: '4', telefon: '', email:'' },
{id:'520', judet: 'hunedoara', luna: 'decembrie', img: 'images/angajari.jpg', angajator: 'VALE PROFESSIONAL CONSTRUCT', adresa: 'Str. VAIDEI, Loc. ORĂŞTIE, tel.', locDeMuncaVacant: 'MUNC NEC LA DEMOLAREA CLADIRILOR, CAPTUSELI ZIDARIE, PLACI MOZAIC, FAIANTA, GRESIE, PARCHET', conditiiDeOcupare: 'Fără Experiență', nrLocuri: '2', telefon: '', email:'' },
{id:'521', judet: 'hunedoara', luna: 'decembrie', img: 'images/angajari.jpg', angajator: 'ALIM COM MH SRL', adresa: 'B-dul MIHAI VITEAZU 43, Loc. HUNEDOARA, tel. 0354881118', locDeMuncaVacant: 'MUNC NEC LA SPARGEREA SI TAIEREA MATERIALELOR DE CONSTRUCTII', conditiiDeOcupare: 'Fără Experiență', nrLocuri: '6', telefon: '', email:'' },
{id:'522', judet: 'hunedoara', luna: 'decembrie', img: 'images/angajari.jpg', angajator: 'MIRA MON PRESTCOM SRL', adresa: 'Bdul Mihai Viteazu 46, C.P. 331039, Loc. HUNEDOARA, tel. 0354881118', locDeMuncaVacant: 'MUNC NEC LA SPARGEREA SI TAIEREA MATERIALELOR DE CONSTRUCTII', conditiiDeOcupare: 'Fără Experiență', nrLocuri: '5', telefon: '', email:'' },
{id:'523', judet: 'hunedoara', luna: 'decembrie', img: 'images/angajari.jpg', angajator: 'CART MET PLAST SRL', adresa: 'Str. LUNCII 11, Loc. ORĂŞTIE, tel. 0254247470', locDeMuncaVacant: 'MUNCITOR SPALARE SI CURATARE CISTERNE', conditiiDeOcupare: 'Fără Experiență', nrLocuri: '1', telefon: '', email:'' },
{id:'524', judet: 'hunedoara', luna: 'decembrie', img: 'images/angajari.jpg', angajator: 'sc alin cont expert srl', adresa: 'Satul CLOPOTIVA 247, Loc. RÂU DE MORI, tel.', locDeMuncaVacant: 'OPERATOR CALCULATOR ELECTRONIC SI RETELE', conditiiDeOcupare: 'Începător', nrLocuri: '1', telefon: '', email:'' },
{id:'525', judet: 'hunedoara', luna: 'decembrie', img: 'images/angajari.jpg', angajator: 'RESITEX GROUP S.R.L.', adresa: 'B-dul IULIU MANIU, Bl. 6, Sc. 1, Et. 1, Ap. 8, Loc. DEVA, tel. 0354414150', locDeMuncaVacant: 'OPERATOR CONFECTIONER INDUSTRIAL ÎMBRACAMINTE DIN TESATURI, TRICOTAJE, MATERIALE SINTETICE', conditiiDeOcupare: 'Experiență Medie', nrLocuri: '1', telefon: '', email:'' },
{id:'526', judet: 'hunedoara', luna: 'decembrie', img: 'images/angajari.jpg', angajator: 'SARMISMOB SA', adresa: 'Str. DR. VICTOR SUIAGA 2, Loc. DEVA, tel. 0737034621', locDeMuncaVacant: 'OPERATOR LA MASINI-UNELTE CU COMANDA NUMERICA', conditiiDeOcupare: 'Fără Experiență', nrLocuri: '3', telefon: '', email:'' },
{id:'527', judet: 'hunedoara', luna: 'decembrie', img: 'images/angajari.jpg', angajator: 'SC PERNAT ROMANIA SRL', adresa: 'Str. Codrului 30, C.P. 335700, ORĂŞTIE, tel. 0254206327', locDeMuncaVacant: 'OPERATOR LA MASINI-UNELTE CU COMANDA NUMERICA', conditiiDeOcupare: 'Fără Experiență', nrLocuri: '1', telefon: '', email:'' },
{id:'528', judet: 'hunedoara', luna: 'decembrie', img: 'images/angajari.jpg', angajator: 'SC PERNAT ROMANIA SRL', adresa: 'Str. Codrului 30, C.P. 335700, Loc. ORĂŞTIE, tel. 0254206327', locDeMuncaVacant: 'OPERATOR LA MASINI-UNELTE CU COMANDA NUMERICA', conditiiDeOcupare: 'Fără Experiență', nrLocuri: '1', telefon: '', email:'' },
{id:'529', judet: 'hunedoara', luna: 'decembrie', img: 'images/angajari.jpg', angajator: 'CHIMSPORT S.A.', adresa: 'Str. Codrului 24, C.P. 335700, Loc. ORĂŞTIE, tel.', locDeMuncaVacant: 'OPERATOR LA PRELUCRAREA MASELOR PLASTICE', conditiiDeOcupare: 'Fără Experiență', nrLocuri: '1', telefon: '', email:'' },
{id:'530', judet: 'hunedoara', luna: 'decembrie', img: 'images/angajari.jpg', angajator: 'ASSA ABLOY ENTRANCE SYSTEMS PRODUCTION ROMANIA S.R.L.', adresa: 'Str. Peştişul Mare 363, C.P. 331008, Loc. HUNEDOARA, tel. 0354808380', locDeMuncaVacant: 'OPERATOR LA ROBOTI INDUSTRIALI', conditiiDeOcupare: 'Fără Experiență', nrLocuri: '2', telefon: '', email:'' },
{id:'531', judet: 'hunedoara', luna: 'decembrie', img: 'images/angajari.jpg', angajator: 'DAR DRAXLMAIER AUTOMOTIVE', adresa: 'Bdul Traian 19, C.P. 331023, HUNEDOARA, tel. 0354403725', locDeMuncaVacant: 'OPERATOR LA ROBOTI INDUSTRIALI', conditiiDeOcupare: 'Fără Experiență', nrLocuri: '30', telefon: '', email:'' },
{id:'532', judet: 'hunedoara', luna: 'decembrie', img: 'images/angajari.jpg', angajator: 'FILPLAST SRL', adresa: 'STR. NICOLAE TITULESCU 60, C.P. 335700, Loc. ORĂŞTIE, tel. 0254243109', locDeMuncaVacant: 'OPERATOR MASE PLASTICE', conditiiDeOcupare: 'Fără Experiență', nrLocuri: '1', telefon: '', email:'' },
{id:'533', judet: 'hunedoara', luna: 'decembrie', img: 'images/angajari.jpg', angajator: 'CASTECO INVEST SRL', adresa: 'Str. MURESULUI 18, Loc. DEVA, tel. 0254231888', locDeMuncaVacant: 'OPERATOR TAIERE', conditiiDeOcupare: 'Experiență Medie', nrLocuri: '1', telefon: '', email:'' },
{id:'534', judet: 'hunedoara', luna: 'decembrie', img: 'images/angajari.jpg', angajator: 'CASTECO INVEST SRL', adresa: 'Str. MURESULUI 18, Loc. DEVA, tel. 0254231888', locDeMuncaVacant: 'OPERATOR TAIERE', conditiiDeOcupare: 'Experiență Medie', nrLocuri: '1', telefon: '', email:'' },
{id:'535', judet: 'hunedoara', luna: 'decembrie', img: 'images/angajari.jpg', angajator: 'BLISS EVENTS DELUX SRL', adresa: 'Str. ATELIERILOR 1, Loc. DEVA, tel. 0254211424', locDeMuncaVacant: 'OSPATAR (CHELNER)', conditiiDeOcupare: 'Fără Experiență', nrLocuri: '1', telefon: '', email:'' },
{id:'536', judet: 'hunedoara', luna: 'decembrie', img: 'images/angajari.jpg', angajator: 'PARADIS TOUR STRAJA S.R.L.', adresa: 'Str. STRAJA, Loc. LUPENI, tel. 0724887293', locDeMuncaVacant: 'OSPATAR (CHELNER)', conditiiDeOcupare: 'Fără Experiență', nrLocuri: '1', telefon: '', email:'' },
{id:'537', judet: 'hunedoara', luna: 'decembrie', img: 'images/angajari.jpg', angajator: 'PARADIS TOUR STRAJA S.R.L.', adresa: 'Str. STRAJA, Loc. LUPENI, tel. 0724887293', locDeMuncaVacant: 'OSPATAR (CHELNER)', conditiiDeOcupare: 'Începător', nrLocuri: '3', telefon: '', email:'' },
{id:'538', judet: 'hunedoara', luna: 'decembrie', img: 'images/angajari.jpg', angajator: 'OCOLUL SILVIC RETEZATUL CLOPOTIVA RÂU DE MORI SRL', adresa: 'PRINCIPALA 1, Loc. RÂU DE MORI, tel. 0722519147', locDeMuncaVacant: 'PADURAR', conditiiDeOcupare: 'Fără Experiență', nrLocuri: '2', telefon: '', email:'' },
{id:'539', judet: 'hunedoara', luna: 'decembrie', img: 'images/angajari.jpg', angajator: 'PAPY DOLCE S.R.L.', adresa: '1848 34, Bl. 34, Sc. A, Ap. 3, Loc. HUNEDOARA, tel. 0727740890', locDeMuncaVacant: 'PATISER', conditiiDeOcupare: 'Fără Experiență', nrLocuri: '2', telefon: '', email:'' },
{id:'540', judet: 'hunedoara', luna: 'decembrie', img: 'images/angajari.jpg', angajator: 'GALLI TECHNIC INTERNATIONAL', adresa: 'Str. Orizontului 1, C.P. 330181, DEVA, tel. 0737233590', locDeMuncaVacant: 'RECTIFICATOR UNIVERSAL', conditiiDeOcupare: 'Fără Experiență', nrLocuri: '4', telefon: '', email:'' },
{id:'541', judet: 'hunedoara', luna: 'decembrie', img: 'images/angajari.jpg', angajator: 'SC TRANSPORT PUBLIC LOCAL DEVA SRL', adresa: 'Piaţa Unirii 4, C.P. 330152, Loc. DEVA, tel. 0727936959', locDeMuncaVacant: 'REFERENT', conditiiDeOcupare: 'Fără Experiență', nrLocuri: '1', telefon: '', email:'' },
{id:'542', judet: 'hunedoara', luna: 'decembrie', img: 'images/angajari.jpg', angajator: 'DAR DRAXLMAIER AUTOMOTIVE', adresa: 'Bdul Traian 19, C.P. 331023, HUNEDOARA, tel. 0354403725', locDeMuncaVacant: 'REGLOR-MONTATOR', conditiiDeOcupare: 'Fără Experiență', nrLocuri: '3', telefon: '', email:'' },
{id:'543', judet: 'hunedoara', luna: 'decembrie', img: 'images/angajari.jpg', angajator: 'INSTALATII GEVIS SRL', adresa: 'Str. ARDEALULUI 1, Loc. DEVA, tel. 0254225049', locDeMuncaVacant: 'SAPATOR MANUAL', conditiiDeOcupare: 'Fără Experiență', nrLocuri: '1', telefon: '', email:'' },
{id:'544', judet: 'hunedoara', luna: 'decembrie', img: 'images/angajari.jpg', angajator: 'DAR DRAXLMAIER AUTOMOTIVE', adresa: 'Bdul Traian 19, C.P. 331023, Loc. HUNEDOARA, tel. 0354403725', locDeMuncaVacant: 'SCULER-MATRITER', conditiiDeOcupare: 'Fără Experiență', nrLocuri: '2', telefon: '', email:'' },
{id:'545', judet: 'hunedoara', luna: 'decembrie', img: 'images/angajari.jpg', angajator: 'CENTRUL DE AFACERI MASTER', adresa: 'STR. IMPARATUL TRAIAN 42, Loc. DEVA, tel. 0254218111', locDeMuncaVacant: 'SECRETARA', conditiiDeOcupare: 'Avansat', nrLocuri: '1', telefon: '', email:'' },
{id:'546', judet: 'hunedoara', luna: 'decembrie', img: 'images/angajari.jpg', angajator: 'PERSONAL REVCOM SRL', adresa: 'Str. LATURENI 27, Loc. HUNEDOARA, tel. 0751301455', locDeMuncaVacant: 'SECRETARA', conditiiDeOcupare: 'Fără Experiență', nrLocuri: '1', telefon: '', email:'' },
{id:'547', judet: 'hunedoara', luna: 'decembrie', img: 'images/angajari.jpg', angajator: 'ALIM COM MH SRL', adresa: 'B-dul MIHAI VITEAZU 43, HUNEDOARA, tel. 0354881118', locDeMuncaVacant: 'SECRETARA', conditiiDeOcupare: 'Fără Experiență', nrLocuri: '1', telefon: '', email:'' },
{id:'548', judet: 'hunedoara', luna: 'decembrie', img: 'images/angajari.jpg', angajator: 'SARMISMOB SA', adresa: 'Str. DR. VICTOR SUIAGA 2, Loc. DEVA, tel. 0737034621', locDeMuncaVacant: 'SERVANT POMPIER', conditiiDeOcupare: 'Fără Experiență', nrLocuri: '1', telefon: '', email:'' },
{id:'549', judet: 'hunedoara', luna: 'decembrie', img: 'images/angajari.jpg', angajator: 'POELZLEITNER GMBH SRL', adresa: '22 DECEMBRIE 37A, Et. 3, Ap. CAM.312/1B, Loc. DEVA', locDeMuncaVacant: 'SOFER AUTOCAMION/MASINA DE MARE TONAJ', conditiiDeOcupare: 'Începător', nrLocuri: '1', telefon: '', email:'' },
{id:'550', judet: 'hunedoara', luna: 'decembrie', img: 'images/angajari.jpg', angajator: 'MCA INVEST INDUSTRIAL SRL', adresa: 'STR. IMPARATUL TRAIAN 34, DEVA, tel. 0721508378', locDeMuncaVacant: 'SOFER AUTOCAMION/MASINA DE MARE TONAJ', conditiiDeOcupare: 'Fără Experiență', nrLocuri: '20', telefon: '', email:'' },
{id:'551', judet: 'hunedoara', luna: 'decembrie', img: 'images/angajari.jpg', angajator: 'MEM SPEED SRL', adresa: 'B-dul NICOLAE BALCESCU, Bl. 44A, Sc. B, Et. 2, Ap. 33, Loc. DEVA, tel. 0721981240', locDeMuncaVacant: 'SOFER AUTOCAMION/MASINA DE MARE TONAJ', conditiiDeOcupare: 'Fără Experiență', nrLocuri: '1', telefon: '', email:'' },
{id:'552', judet: 'hunedoara', luna: 'decembrie', img: 'images/angajari.jpg', angajator: 'RUMATI SERVTCOM SRL', adresa: 'Str. RACASTIE 49, Loc. HUNEDOARA, tel. 0742354079', locDeMuncaVacant: 'SOFER AUTOCAMION/MASINA DE MARE TONAJ', conditiiDeOcupare: 'Începător', nrLocuri: '2', telefon: '', email:'' },
{id:'553', judet: 'hunedoara', luna: 'decembrie', img: 'images/angajari.jpg', angajator: 'INDRA ALICOM SRL', adresa: 'STR. GRADISTEI 2, Loc. ORĂŞTIE, tel. 0744867960', locDeMuncaVacant: 'SOFER AUTOCAMION/MASINA DE MARE TONAJ', conditiiDeOcupare: 'Fără Experiență', nrLocuri: '1', telefon: '', email:'' },
{id:'554', judet: 'hunedoara', luna: 'decembrie', img: 'images/angajari.jpg', angajator: 'TEDEX COMPANY SRL CALAN', adresa: 'Satul STREISANGIORGIU 203, CĂLAN, tel. 0254730131', locDeMuncaVacant: 'SOFER DE AUTOTURISME SI CAMIONETE', conditiiDeOcupare: 'Începător', nrLocuri: '1', telefon: '', email:'' },
{id:'555', judet: 'hunedoara', luna: 'decembrie', img: 'images/angajari.jpg', angajator: 'PRIORITAR IMPEX SRL', adresa: 'Str. BRADULUI (PUNCT TERMIC NR. 2), Loc. CĂLAN, tel.', locDeMuncaVacant: 'SOFER DE AUTOTURISME SI CAMIONETE', conditiiDeOcupare: 'Experiență Medie', nrLocuri: '2', telefon: '', email:'' },
{id:'556', judet: 'hunedoara', luna: 'decembrie', img: 'images/angajari.jpg', angajator: 'DURAKRON CONVERT SRL', adresa: 'Bdul Dacia 9, Bl. A1-2, Ap. 16, C.P. 331013, Loc. HUNEDOARA, tel. 0766773746', locDeMuncaVacant: 'SOFER DE AUTOTURISME SI CAMIONETE', conditiiDeOcupare: 'Fără Experiență', nrLocuri: '2', telefon: '', email:'' },
{id:'557', judet: 'hunedoara', luna: 'decembrie', img: 'images/angajari.jpg', angajator: 'ALIM COM MH SRL', adresa: 'B-dul MIHAI VITEAZU 43, HUNEDOARA, tel. 0354881118', locDeMuncaVacant: 'SOFER DE AUTOTURISME SI CAMIONETE', conditiiDeOcupare: 'Fără Experiență', nrLocuri: '3', telefon: '', email:'' },
{id:'558', judet: 'hunedoara', luna: 'decembrie', img: 'images/angajari.jpg', angajator: 'SPITALUL MUNICIPAL ORASTIE', adresa: 'STR. PRICAZULUI 16, Loc. ORĂŞTIE, tel. 0254242950', locDeMuncaVacant: 'SPALATOREASA LENJERIE', conditiiDeOcupare: 'Fără Experiență', nrLocuri: '1', telefon: '', email:'' },
{id:'559', judet: 'hunedoara', luna: 'decembrie', img: 'images/angajari.jpg', angajator: 'CENTRUL DE AFACERI MASTER', adresa: 'STR. IMPARATUL TRAIAN 42, DEVA, tel. 0254218111', locDeMuncaVacant: 'SPECIALIST PLAN PROGRES', conditiiDeOcupare: 'Avansat', nrLocuri: '1', telefon: '', email:'' },
{id:'560', judet: 'hunedoara', luna: 'decembrie', img: 'images/angajari.jpg', angajator: 'SARMISMOB SA', adresa: 'Str. DR. VICTOR SUIAGA 2, Loc. DEVA, tel. 0737034621', locDeMuncaVacant: 'STIVUITORIST', conditiiDeOcupare: 'Fără Experiență', nrLocuri: '2', telefon: '', email:'' },
{id:'561', judet: 'hunedoara', luna: 'decembrie', img: 'images/angajari.jpg', angajator: 'REPARATII SIDERURGICE SA', adresa: 'Str. FURNALISTULUI 17G, Loc. CĂLAN, tel.', locDeMuncaVacant: 'STRUNGAR UNIVERSAL', conditiiDeOcupare: 'Experiență Medie', nrLocuri: '1', telefon: '', email:'' },
{id:'562', judet: 'hunedoara', luna: 'decembrie', img: 'images/angajari.jpg', angajator: 'ALIM COM MH SRL', adresa: 'B-dul MIHAI VITEAZU 43, HUNEDOARA, tel. 0354881118', locDeMuncaVacant: 'STRUNGAR UNIVERSAL', conditiiDeOcupare: 'Fără Experiență', nrLocuri: '1', telefon: '', email:'' },
{id:'563', judet: 'hunedoara', luna: 'decembrie', img: 'images/angajari.jpg', angajator: 'IMPERIAL PG SRL', adresa: 'Str. DACIA 2, Loc. PETROŞANI, tel.', locDeMuncaVacant: 'STRUNGAR UNIVERSAL', conditiiDeOcupare: 'Începător', nrLocuri: '1', telefon: '', email:'' },
{id:'564', judet: 'hunedoara', luna: 'decembrie', img: 'images/angajari.jpg', angajator: 'SC DEVA STEEL CORPORATION', adresa: 'Piaţa IANCU DE HUNEDOARA 1, Loc. HUNEDOARA, tel. 0723819493', locDeMuncaVacant: 'SUDOR', conditiiDeOcupare: 'Începător', nrLocuri: '5', telefon: '', email:'' },
{id:'565', judet: 'hunedoara', luna: 'decembrie', img: 'images/angajari.jpg', angajator: 'MIRA MON PRESTCOM SRL', adresa: 'Bdul Mihai Viteazu 46, C.P. 331039, Loc. HUNEDOARA, tel. 0354881118', locDeMuncaVacant: 'SUDOR', conditiiDeOcupare: 'Fără Experiență', nrLocuri: '3', telefon: '', email:'' },
{id:'566', judet: 'hunedoara', luna: 'decembrie', img: 'images/angajari.jpg', angajator: 'ALIM COM MH SRL', adresa: 'B-dul MIHAI VITEAZU 43, Loc. HUNEDOARA, tel. 0354881118', locDeMuncaVacant: 'SUDOR', conditiiDeOcupare: 'Fără Experiență', nrLocuri: '3', telefon: '', email:'' },
{id:'567', judet: 'hunedoara', luna: 'decembrie', img: 'images/angajari.jpg', angajator: 'ASSA ABLOY ENTRANCE SYSTEMS PRODUCTION ROMANIA S.R.L.', adresa: 'Str. Peştişul Mare 363, C.P. 331008, Loc. HUNEDOARA, tel. 0354808380', locDeMuncaVacant: 'SUDOR', conditiiDeOcupare: 'Fără Experiență', nrLocuri: '10', telefon: '', email:'' },
{id:'568', judet: 'hunedoara', luna: 'decembrie', img: 'images/angajari.jpg', angajator: 'IMPERIAL PG SRL', adresa: 'Str. DACIA 2, Loc. PETROŞANI, tel.', locDeMuncaVacant: 'SUDOR', conditiiDeOcupare: 'Fără Experiență', nrLocuri: '1', telefon: '', email:'' },
{id:'569', judet: 'hunedoara', luna: 'decembrie', img: 'images/angajari.jpg', angajator: 'SWISS TRADE SRL', adresa: 'Str. B-dul 1848 5, Loc. HUNEDOARA, tel. 0722103015', locDeMuncaVacant: 'SUDOR MANUAL CU ARC ELECTRIC', conditiiDeOcupare: 'Fără Experiență', nrLocuri: '1', telefon: '', email:'' },
{id:'570', judet: 'hunedoara', luna: 'decembrie', img: 'images/angajari.jpg', angajator: 'IMPERIAL PG SRL', adresa: 'Str. DACIA 2, Loc. PETROŞANI, tel.', locDeMuncaVacant: 'TAIETOR LA FERASTRAU PANGLICA', conditiiDeOcupare: 'Fără Experiență', nrLocuri: '1', telefon: '', email:'' },
{id:'571', judet: 'hunedoara', luna: 'decembrie', img: 'images/angajari.jpg', angajator: 'SARMISMOB SA', adresa: 'Str. DR. VICTOR SUIAGA 2, Loc. DEVA, tel. 0737034621', locDeMuncaVacant: 'TÂMPLAR UNIVERSAL', conditiiDeOcupare: 'Fără Experiență', nrLocuri: '6', telefon: '', email:'' },
{id:'572', judet: 'hunedoara', luna: 'decembrie', img: 'images/angajari.jpg', angajator: 'S.C.PROD MOB O VIS', adresa: 'Str. Republicii, Bl. 54, Ap. 42, C.P. 335800, Loc. PETRILA, tel. 0725497488', locDeMuncaVacant: 'TÂMPLAR UNIVERSAL', conditiiDeOcupare: 'Începător', nrLocuri: '1', telefon: '', email:'' },
{id:'573', judet: 'hunedoara', luna: 'decembrie', img: 'images/angajari.jpg', angajator: 'ITALROM LEATHER SRL', adresa: 'Satul MINTIA 202F, Loc. VEŢEL, tel. 0254236620', locDeMuncaVacant: 'TAPITER', conditiiDeOcupare: 'Fără Experiență', nrLocuri: '1', telefon: '', email:'' },
{id:'574', judet: 'hunedoara', luna: 'decembrie', img: 'images/angajari.jpg', angajator: 'INTERMEDIA CALL 2005 SRL', adresa: 'STR. CONSTANTIN BURSAN 14, Loc. HUNEDOARA, tel. 0723170931', locDeMuncaVacant: 'TEHNICIAN ÎN INDUSTRIA TEXTILA', conditiiDeOcupare: 'Fără Experiență', nrLocuri: '1', telefon: '', email:'' },
{id:'575', judet: 'hunedoara', luna: 'decembrie', img: 'images/angajari.jpg', angajator: 'CAFE BAR FARCASIU LUCIANO SRL', adresa: 'Str. PRINCIPALA 21, C.P. 335300, Loc. CĂLAN, tel.', locDeMuncaVacant: 'VÂNZATOR', conditiiDeOcupare: 'Începător', nrLocuri: '1', telefon: '', email:'' },
{id:'576', judet: 'hunedoara', luna: 'decembrie', img: 'images/angajari.jpg', angajator: 'CAFE BAR FARCASIU LUCIANO SRL', adresa: 'Str. PRINCIPALA 21, C.P. 335300, Loc. CĂLAN, tel.', locDeMuncaVacant: 'VÂNZATOR', conditiiDeOcupare: 'Începător', nrLocuri: '1', telefon: '', email:'' },
{id:'577', judet: 'hunedoara', luna: 'decembrie', img: 'images/angajari.jpg', angajator: 'SC LUCKY MIRAJ PLUS SRL', adresa: 'Str. NICOLAE BĂLCESCU, Bl. 3, Ap. 21, Loc. DEVA, tel. 0747047700', locDeMuncaVacant: 'VÂNZATOR', conditiiDeOcupare: 'Fără Experiență', nrLocuri: '1', telefon: '', email:'' },
{id:'578', judet: 'hunedoara', luna: 'decembrie', img: 'images/angajari.jpg', angajator: 'RUMATI SERVTCOM SRL', adresa: 'Str. RACASTIE 49, Loc. HUNEDOARA, tel. 0742354079', locDeMuncaVacant: 'VÂNZATOR', conditiiDeOcupare: 'Fără Experiență', nrLocuri: '2', telefon: '', email:'' },
{id:'579', judet: 'hunedoara', luna: 'decembrie', img: 'images/angajari.jpg', angajator: 'PAPY DOLCE S.R.L.', adresa: '1848 34, Bl. 34, Sc. A, Ap. 3, Loc. HUNEDOARA, tel. 0727740890', locDeMuncaVacant: 'VÂNZATOR', conditiiDeOcupare: 'Fără Experiență', nrLocuri: '2', telefon: '', email:'' },
{id:'580', judet: 'hunedoara', luna: 'decembrie', img: 'images/angajari.jpg', angajator: 'FASHION STAR STYLE SRL', adresa: 'Str. Saturn, Bl. 4, Ap. 9, Loc. PETROŞANI, tel. 0731656900', locDeMuncaVacant: 'VÂNZATOR', conditiiDeOcupare: 'Începător', nrLocuri: '1', telefon: '', email:'' },
{id:'581', judet: 'hunedoara', luna: 'decembrie', img: 'images/angajari.jpg', angajator: 'SESY SI DADU', adresa: 'Str. Vasile Alecsandri 3, Bl. 37, Sc. 1, Ap. 2, C.P. 336200, Loc. VULCAN, tel.', locDeMuncaVacant: 'VÂNZATOR', conditiiDeOcupare: 'Începător', nrLocuri: '1', telefon: '', email:'' },
{id:'582', judet: 'hunedoara', luna: 'decembrie', img: 'images/angajari.jpg', angajator: 'ALIMAR & ANASTASIA SRL', adresa: 'Str. Traian 10, C.P. 336200, Loc. VULCAN, tel. 0762438923', locDeMuncaVacant: 'VÂNZATOR', conditiiDeOcupare: 'Fără Experiență', nrLocuri: '1', telefon: '', email:'' },
{id:'583', judet: 'hunedoara', luna: 'decembrie', img: 'images/angajari.jpg', angajator: 'SC DIRECT TEXTIL SHOP', adresa: 'Str. TEODORA LUCACIU 12, Loc. VULCAN, tel. 0760861295', locDeMuncaVacant: 'VÂNZATOR', conditiiDeOcupare: 'Fără Experiență', nrLocuri: '1', telefon: '', email:'' },
{id:'584', judet: 'hunedoara', luna: 'decembrie', img: 'images/angajari.jpg', angajator: 'ASSA ABLOY ENTRANCE SYSTEMS PRODUCTION ROMANIA S.R.L.', adresa: 'Str. Peştişul Mare 363, C.P. 331008, Loc. HUNEDOARA, tel. 0354808380', locDeMuncaVacant: 'VOPSITOR INDUSTRIAL', conditiiDeOcupare: 'Fără Experiență', nrLocuri: '2', telefon: '', email:'' },
{id:'585', judet: 'hunedoara', luna: 'decembrie', img: 'images/angajari.jpg', angajator: 'ALIM COM MH SRL', adresa: 'B-dul MIHAI VITEAZU 43, Loc. HUNEDOARA, tel. 0354881118', locDeMuncaVacant: 'ZIDAR ROSAR-TENCUITOR', conditiiDeOcupare: 'Fără Experiență', nrLocuri: '2', telefon: '', email:'' },
{id:'586', judet: 'hunedoara', luna: 'decembrie', img: 'images/angajari.jpg', angajator: 'TERACO PROD SRL', adresa: 'Bdul Libertatii 6, Ap. 33, C.P. 331032, Loc. HUNEDOARA, tel. 0723382241', locDeMuncaVacant: 'ZIDAR ROSAR-TENCUITOR', conditiiDeOcupare: 'Fără Experiență', nrLocuri: '2', telefon: '', email:'' },
{id:'587', judet: 'hunedoara', luna: 'decembrie', img: 'images/angajari.jpg', angajator: 'MIRA MON PRESTCOM SRL', adresa: 'Bdul Mihai Viteazu 46, C.P. 331039, Loc. HUNEDOARA, tel. 0354881118', locDeMuncaVacant: 'ZIDAR ROSAR-TENCUITOR', conditiiDeOcupare: 'Fără Experiență', nrLocuri: '2', telefon: '', email:'' },
{id:'588', judet: 'dolj', luna: 'noiembrie', img: 'images/angajari.jpg', angajator: 'Universitatea din Craiova', adresa: 'Str. A. I. Cuza nr.13,  sala nr. 118, Craiova,  judetul Dolj,', locDeMuncaVacant: 'Muncitori fochisti', conditiiDeOcupare: 'calificat de calificare in meseria de fochist; autorizatie de fochist eliberata de I.S.C.I.R. valabila (insotita de talon).', nrLocuri: '4', telefon: '0251 414987', email:'scopi@apsg.ro' },
{id:'589', judet: 'dolj', luna: 'noiembrie', img: 'images/angajari.jpg', angajator: 'Alyss-nicky SRL', adresa: 'B-dul 1 Mai 64, Loc. Craiova', locDeMuncaVacant: 'Patiser', conditiiDeOcupare: 'Calificare în domeniu', nrLocuri: '1', telefon: '0743291161', email:'scopi@apsg.ro' },
{id:'590', judet: 'gorj', luna: 'noiembrie', img: 'images/angajari.jpg', angajator: 'Anairo SRL', adresa: 'Str.N Titulescu nr.1,Tg-Jiu Gorj', locDeMuncaVacant: 'Mecanic Utilaje', conditiiDeOcupare: 'Stapanirea tehnicilor de lucru legate de functie,cunostinte si experienta in domeniu', nrLocuri: '1', telefon: '0725913415', email:'anairosrl@yahoo.com' },
{id:'591', judet: 'dolj', luna: 'noiembrie', img: 'images/angajari.jpg', angajator: 'Auchan Romania Sa', adresa: 'Bulevardul Iuliu Maniu 546-560, Loc. Sectorul 6   Bucuresti', locDeMuncaVacant: 'Lucrator Comercial in Craiova', conditiiDeOcupare: 'Calificare în domeniu', nrLocuri: '2', telefon: '0214090599', email:'cbondici@auchan.ro' },
{id:'592', judet: 'gorj', luna: 'noiembrie', img: 'images/angajari.jpg', angajator: 'COMPUTER GENERATED SOLUTIONS ROMANIA SRL', adresa: 'Splaiul Independentei 319,  SECTORUL 6,BUCUREŞTI,loc munca Tg-Jiu', locDeMuncaVacant: 'OPERATOR SUPORT TEHNIC PENTRU SERVICII DE COMUNICATII ELECTRONICE', conditiiDeOcupare: 'Studii medii,cunoasterea unei limbi straine la nivel conversational', nrLocuri: '10', telefon: '0215270000', email:'hrgl@cgsinc.ro' },
{id:'593', judet: 'gorj', luna: 'noiembrie', img: 'images/angajari.jpg', angajator: 'DMA QUALITY FOOD SRL', adresa: 'Str. George Coşbuc 25A, BAIA MARE, Jud. MARAMUREŞ', locDeMuncaVacant: 'LUCRATOR COMERCIAL', conditiiDeOcupare: 'Calificare in domeniu,aspect fizic placut,experienta', nrLocuri: '3', telefon: '0761320147', email:'recrutare@dmagroup.ro' },
{id:'594', judet: 'gorj', luna: 'noiembrie', img: 'images/angajari.jpg', angajator: 'EUROLINES TUI TRAVEL CENTER', adresa: 'BDUL. Prefect Gavril Tudoras 15 B', locDeMuncaVacant: 'Consultanti turism', conditiiDeOcupare: 'Studii medii,abilitati foarte bune de comunicare si negociere', nrLocuri: '3', telefon: '0786408054', email:'scopi@apsg.ro' },
{id:'595', judet: 'gorj', luna: 'noiembrie', img: 'images/angajari.jpg', angajator: 'EUROSPORT TRADING SA', adresa: 'Strada Calea Bucuresti 9,  Loc. TÂRGU JIU, Jud. GORJ', locDeMuncaVacant: 'AGENT DE VÂNZARI', conditiiDeOcupare: 'Minim studii medii,disponibilitate deplasare', nrLocuri: '2', telefon: '0253214443', email:'office@eurosport-sa.ro' },
{id:'596', judet: 'gorj', luna: 'noiembrie', img: 'images/angajari.jpg', angajator: 'G T P D SRL', adresa: 'STR. 23 AUGUST 170, Loc. TÂRGU JIU, Jud. GORJ', locDeMuncaVacant: 'PATISER', conditiiDeOcupare: 'Fara experienta in domeniu,minim 10 clase', nrLocuri: '10', telefon: '0253227920', email:'scopi@apsg.ro' },
{id:'597', judet: 'dolj', luna: 'noiembrie', img: 'images/angajari.jpg', angajator: 'Helin Management Srl', adresa: 'Str. Aviatorilor 1010, Loc. Ghercesti, Jud. Dolj', locDeMuncaVacant: 'Lucratorbucatarie (spalator Vase Mari)', conditiiDeOcupare: 'Calificare in domeniu', nrLocuri: '1', telefon: '0762634842', email:'scopi@apsg.ro' },
{id:'598', judet: 'dolj', luna: 'noiembrie', img: 'images/angajari.jpg', angajator: 'Helin Management Srl', adresa: 'Str. Aviatorilor 1010, Loc. Ghercesti, Jud. Dolj', locDeMuncaVacant: 'Camerista Hotel', conditiiDeOcupare: 'Calificare în domeniu', nrLocuri: '2', telefon: '0762634842', email:'scopi@apsg.ro' },
{id:'599', judet: 'gorj', luna: 'noiembrie', img: 'images/angajari.jpg', angajator: 'MIRUAL PROD SRL', adresa: 'Str. ANA IPĂTESCU  7  TÎRGU JIU', locDeMuncaVacant: 'PERSONAL MONTAJ MOBILA', conditiiDeOcupare: 'Calificare in domeniu, experienta minim 1 an', nrLocuri: '5', telefon: '0253218264', email:'office@hansoberding.ro' },
{id:'600', judet: 'dolj', luna: 'noiembrie', img: 'images/angajari.jpg', angajator: 'Pan Group SA', adresa: 'Dacia 1a, Loc. Craiova, Jud. Dolj', locDeMuncaVacant: 'Patiser', conditiiDeOcupare: 'Calificare în domeniu', nrLocuri: '2', telefon: '0740115152', email:'lilisafta@pangrup.ro' },
{id:'601', judet: 'dolj', luna: 'noiembrie', img: 'images/angajari.jpg', angajator: 'Premier Restaurants Romania Srl', adresa: 'Ploiesti,B-ld Republicii,nr.136', locDeMuncaVacant: 'Lucrator Comercial', conditiiDeOcupare: 'Calificare în domeniu', nrLocuri: '1', telefon: '0244407331', email:'craiova@ro.mcd.com' },
{id:'602', judet: 'dolj', luna: 'noiembrie', img: 'images/angajari.jpg', angajator: 'Profi Rom Food Srl', adresa: 'Str.Calea Sever Bocu, nr.31', locDeMuncaVacant: 'Vanzator', conditiiDeOcupare: 'Calificare în domeniu', nrLocuri: '1', telefon: '0372568911', email:'resurseumane@profi.ro' },
{id:'603', judet: 'dolj', luna: 'noiembrie', img: 'images/angajari.jpg', angajator: 'Restaurant Bacolux SRL', adresa: 'CALEA SEVERINULUI 3 CRAIOVA', locDeMuncaVacant: 'Bucatar', conditiiDeOcupare: 'Calificare în domeniu', nrLocuri: '1', telefon: '0251 487 217', email:'ru@bacolux.ro' },
{id:'604', judet: 'dolj', luna: 'noiembrie', img: 'images/angajari.jpg', angajator: 'Restaurant Bacolux SRL', adresa: 'CALEA SEVERINULUI 3 CRAIOVA', locDeMuncaVacant: 'Ajutor Ospatar', conditiiDeOcupare: 'Calificare în domeniu', nrLocuri: '2', telefon: '0251 487 217', email:'ru@bacolux.ro' },
{id:'605', judet: 'dolj', luna: 'noiembrie', img: 'images/angajari.jpg', angajator: 'Romanian Security Systems Srl', adresa: 'Bulevardul Dimitrie Pompeiu 10a, Et. 3, Loc. Bucuresti, Jud. Bucuresti', locDeMuncaVacant: 'Agent De Securitate', conditiiDeOcupare: 'Calificare în domeniu', nrLocuri: '1', telefon: '0724572564', email:'ofice.galati@r-ss.ro' },
{id:'606', judet: 'dolj', luna: 'noiembrie', img: 'images/angajari.jpg', angajator: 'S.C. Stimir Com Srl', adresa: 'Calea Bucuresti , Bl. P4, Sc. 1, Ap. 6, Loc. Craiova, Jud. Dol', locDeMuncaVacant: 'Bucatar', conditiiDeOcupare: 'Calificare în domeniu', nrLocuri: '1', telefon: '0765955081', email:'predoi_giorgi@yanoo.com' },
{id:'607', judet: 'gorj', luna: 'noiembrie', img: 'images/angajari.jpg', angajator: 'SC Baile Ticleni SRL', adresa: 'Str Villeneuve D ascq, Ticleni Gorj', locDeMuncaVacant: 'Receptioner', conditiiDeOcupare: 'Minim studii medii, disponibilitati de dialog, comportament civilizat', nrLocuri: '1', telefon: '0733051667', email:'scopi@apsg.ro' },
{id:'608', judet: 'gorj', luna: 'noiembrie', img: 'images/angajari.jpg', angajator: 'Sc Marsat SA', adresa: 'Str.Termocentralei ,Nr.2,Tg-Jiu', locDeMuncaVacant: 'Sudor', conditiiDeOcupare: 'Calificare in domeniu,studii medii, disponibilitate deplasare', nrLocuri: '2', telefon: '0253210047', email:'office@marsat.com.ro' },
{id:'609', judet: 'gorj', luna: 'noiembrie', img: 'images/angajari.jpg', angajator: 'Sc Marsat SA', adresa: 'Str.Termocentralei ,Nr.2,Tg-Jiu', locDeMuncaVacant: 'Lacatus mecanic', conditiiDeOcupare: 'Calificare in domeniu,studii medii,disponibilitate deplasare', nrLocuri: '2', telefon: '0253210047', email:'office@marsat.com.ro' },
{id:'610', judet: 'gorj', luna: 'noiembrie', img: 'images/angajari.jpg', angajator: 'Sc Marsat SA', adresa: 'Str.Termocentralei ,Nr.2,Tg-Jiu', locDeMuncaVacant: 'Inginer', conditiiDeOcupare: 'Studii superioare,experienta in domeniu', nrLocuri: '2', telefon: '0253210047', email:'office@marsat.com.ro' },
{id:'611', judet: 'gorj', luna: 'noiembrie', img: 'images/angajari.jpg', angajator: 'Sc Marsat SA', adresa: 'Str.Termocentralei ,Nr.2,Tg-Jiu', locDeMuncaVacant: 'Electrician', conditiiDeOcupare: 'Calificare in domeniu,studii medii,disponibilitate deplasare', nrLocuri: '2', telefon: '0253210047', email:'office@marsat.com.ro' },
{id:'612', judet: 'dolj', luna: 'noiembrie', img: 'images/angajari.jpg', angajator: 'SC Metro Cash & Carry Romania Srl', adresa: 'Otopeni, Str: BUCURESTI- PLOIESTI, nr:289', locDeMuncaVacant: 'Lucrator Comercial', conditiiDeOcupare: 'Calificare în domeniu', nrLocuri: '1', telefon: '0265 202 150', email:'resurseumane.targumures@metro.ro' },
{id:'613', judet: 'dolj', luna: 'noiembrie', img: 'images/angajari.jpg', angajator: 'Sc Tanidro Farm Srl', adresa: 'Strada Brestei 296, Cod Postal 200207, Loc. Craiova, Jud. Dolj', locDeMuncaVacant: 'Lucrator Comercial', conditiiDeOcupare: 'Calificare în domeniu', nrLocuri: '1', telefon: '0747017017', email:'scopi@apsg.ro' },
{id:'614', judet: 'gorj', luna: 'noiembrie', img: 'images/angajari.jpg', angajator: 'SE BORDNETZE SRL,PL TG-JIU', adresa: 'BUCHIN,LUNCA GROFULUI DN6,KM 450', locDeMuncaVacant: 'CONFECTIONER CABLAJE AUTO', conditiiDeOcupare: '8 clase,fara experienta in domeniu,spirit de echipa.', nrLocuri: '130', telefon: '0255506424', email:'scopi@apsg.ro' },
{id:'615', judet: 'gorj', luna: 'noiembrie', img: 'images/angajari.jpg', angajator: 'SE BORDNETZE SRL,PL TG-JIU', adresa: 'BUCHIN,LUNCA GROFULUI DN6,KM 450', locDeMuncaVacant: 'TEHNICIAN PROIECTANT', conditiiDeOcupare: 'Studii medii,vechime minim 6 luni', nrLocuri: '1', telefon: '0255506424', email:'scopi@apsg.ro' },
{id:'616', judet: 'gorj', luna: 'noiembrie', img: 'images/angajari.jpg', angajator: 'SE BORDNETZE SRL,PL TG-JIU', adresa: 'BUCHIN,LUNCA GROFULUI DN6,KM 450', locDeMuncaVacant: 'ADMINISTRATOR RETEA CALCULATOARE', conditiiDeOcupare: 'Studii superioare,vechime minim 1 an', nrLocuri: '1', telefon: '0255506424', email:'scopi@apsg.ro' },
{id:'617', judet: 'gorj', luna: 'noiembrie', img: 'images/angajari.jpg', angajator: 'SE BORNETZE SRL,PL TG-JIU', adresa: 'BUCHIN,LUNCA GROFULUI DN6,KM 450', locDeMuncaVacant: 'INGINER PRODUCTIE', conditiiDeOcupare: 'Studii superioare,vechime minim 1 an', nrLocuri: '1', telefon: '0255506424', email:'scopi@apsg.ro' },
{id:'618', judet: 'gorj', luna: 'noiembrie', img: 'images/angajari.jpg', angajator: 'STAR MEDIA SRL', adresa: 'Slt. Vasile Militaru  Bl. 1, Sc. 1, Et. 4, Ap. 17 Loc. TÂRGU JIU, Jud. GORJ', locDeMuncaVacant: 'CONFECTIONER-ASAMBLOR ARTICOLE DIN TEXTILE', conditiiDeOcupare: 'Minim studii profesionale', nrLocuri: '10', telefon: '0766738490', email:'marlenpop@yahoo.com' },
{id:'619', judet: 'dolj', luna: 'noiembrie', img: 'images/angajari.jpg', angajator: 'Tregi Direct Service Srl', adresa: 'STR. FRAŢII GOLEŞTI, Nr. 108A', locDeMuncaVacant: 'Operator Vanzari Prin Telefon', conditiiDeOcupare: 'Calificare în domeniu', nrLocuri: '1', telefon: '0212308060', email:'Jobtregidirectservice.com' },
{id:'620', judet: 'dolj', luna: 'noiembrie', img: 'images/angajari.jpg', angajator: 'Valyscom Roiesti Srl', adresa: 'Calea Severinului 42a, Loc. Craiova, Jud. Dolj', locDeMuncaVacant: 'Bucatar', conditiiDeOcupare: 'Calificare în domeniu', nrLocuri: '1', telefon: '0251588414', email:'scopi@apsg.ro' },
{id:'621', judet: 'gorj', luna: 'noiembrie', img: 'images/angajari.jpg', angajator: 'VILOMAR COMPREST SRL', adresa: 'COMPLEX COMERCIAL PIAŢA CENTRALĂ, Loc. TÂRGU JIU, Jud. GORJ', locDeMuncaVacant: 'Vanzator', conditiiDeOcupare: 'Calificare in domeniu', nrLocuri: '2', telefon: '0749029236', email:'scopi@apsg.ro' },
{id:'623', judet: 'gorj', luna: 'octombrie', img: 'images/angajari.jpg', angajator: 'Universitatea din Craiova, Judetul Dolj',  adresa: 'Str. A. I. Cuza nr.13,  sala nr. 118, Craiova,  judetul Dolj,', locDeMuncaVacant: 'Muncitori fochisti Cod cor 818207',  conditiiDeOcupare: 'calificat de calificare in meseria de fochist; autorizatie de fochist eliberata de I.S.C.I.R. valabila (insotita de talon).', nrLocuri: '4', telefon:  '0251 414987', email: 'scopi@apsg.ro' },
{id:'624', judet: 'gorj', luna: 'octombrie', img: 'images/angajari.jpg', angajator: 'Alyss-nicky SRL',  adresa: 'B-dul 1 Mai 64, Loc. Craiova', locDeMuncaVacant: 'Patiser',  conditiiDeOcupare: 'Calificare în domeniu', nrLocuri: '1', telefon:  '0743291161', email: 'scopi@apsg.ro' },
{id:'625', judet: 'gorj', luna: 'octombrie', img: 'images/angajari.jpg', angajator: 'Anairo SRL',  adresa: 'Str.N Titulescu nr.1,Tg-Jiu Gorj', locDeMuncaVacant: 'Mecanic Utilaje',  conditiiDeOcupare: 'Stapanirea tehnicilor de lucru legate de functie,cunostinte si experienta in domeniu', nrLocuri: '1', telefon:  '0725913415', email: 'anairosrl@yahoo.com' },
{id:'626', judet: 'gorj', luna: 'octombrie', img: 'images/angajari.jpg', angajator: 'Auchan Romania Sa',  adresa: 'Bulevardul Iuliu Maniu 546-560, Loc. Sectorul 6   Bucuresti', locDeMuncaVacant: 'Lucrator Comercial in Craiova',  conditiiDeOcupare: 'Calificare în domeniu', nrLocuri: '2', telefon:  '0214090599', email: 'cbondici@auchan.ro' },
{id:'627', judet: 'gorj', luna: 'octombrie', img: 'images/angajari.jpg', angajator: 'COMPUTER GENERATED SOLUTIONS ROMANIA SRL',  adresa: 'Splaiul Independentei 319,  SECTORUL 6,BUCUREŞTI,loc munca Tg-Jiu', locDeMuncaVacant: 'OPERATOR SUPORT TEHNIC PENTRU SERVICII DE COMUNICATII ELECTRONICE cod COR 4222',  conditiiDeOcupare: 'Studii medii,cunoasterea unei limbi straine la nivel conversational', nrLocuri: '10', telefon:  '0215270000', email: 'hrgl@cgsinc.ro' },
{id:'628', judet: 'gorj', luna: 'octombrie', img: 'images/angajari.jpg', angajator: 'DMA QUALITY FOOD SRL',  adresa: 'Str. George Coşbuc 25A, BAIA MARE, Jud. MARAMUREŞ loc munca Tg-Jiu', locDeMuncaVacant: 'LUCRATOR COMERCIAL',  conditiiDeOcupare: 'Calificare in domeniu,aspect fizic placut,experienta', nrLocuri: '3', telefon:  '0761320147', email: 'recrutare@dmagroup.ro' },
{id:'629', judet: 'gorj', luna: 'octombrie', img: 'images/angajari.jpg', angajator: 'EUROLINES TUI TRAVEL CENTER',  adresa: 'BDUL. Prefect Gavril Tudoras 15 B,Loc munca Tg-Jiu', locDeMuncaVacant: 'Consultanti turism',  conditiiDeOcupare: 'Studii medii,abilitati foarte bune de comunicare si negociere', nrLocuri: '3', telefon:  '0786408054', email: 'scopi@apsg.ro' },
{id:'630', judet: 'gorj', luna: 'octombrie', img: 'images/angajari.jpg', angajator: 'EUROSPORT TRADING SA',  adresa: 'Strada Calea Bucuresti 9,  Loc. TÂRGU JIU, Jud. GORJ,Loc munca Tg-Jiu', locDeMuncaVacant: 'AGENT DE VÂNZARI cod COR 332203',  conditiiDeOcupare: 'Minim studii medii,disponibilitate deplasare', nrLocuri: '2', telefon:  '0253214443', email: 'office@eurosport-sa.ro' },
{id:'631', judet: 'gorj', luna: 'octombrie', img: 'images/angajari.jpg', angajator: 'G T P D SRL',  adresa: 'STR. 23 AUGUST 170, Loc. TÂRGU JIU, Jud. GORJ', locDeMuncaVacant: 'PATISER cod COR 751203',  conditiiDeOcupare: 'Fara experienta in domeniu,minim 10 clase', nrLocuri: '10', telefon:  '0253227920', email: 'scopi@apsg.ro' },
{id:'632', judet: 'dolj', luna: 'octombrie', img: 'images/angajari.jpg', angajator: 'Helin Management Srl',  adresa: 'Str. Aviatorilor 1010, Loc. Ghercesti, Jud. Dolj', locDeMuncaVacant: 'Lucratorbucatarie (spalator Vase Mari) in Craiova Cod Cor 941201',  conditiiDeOcupare: 'Calificare in domeniu', nrLocuri: '1', telefon:  '0762634842', email: 'scopi@apsg.ro' },
{id:'633', judet: 'dolj', luna: 'octombrie', img: 'images/angajari.jpg', angajator: 'Helin Management Srl',  adresa: 'Str. Aviatorilor 1010, Loc. Ghercesti, Jud. Dolj', locDeMuncaVacant: 'Camerista Hotel in Craiova',  conditiiDeOcupare: 'Calificare în domeniu', nrLocuri: '2', telefon:  '0762634842', email: 'scopi@apsg.ro' },
{id:'634', judet: 'dolj', luna: 'octombrie', img: 'images/angajari.jpg', angajator: 'Helin Management Srl',  adresa: 'Str. Aviatorilor 1010, Loc. Ghercesti, Jud. Dolj', locDeMuncaVacant: 'Camerista Hotel in Craiova',  conditiiDeOcupare: 'Calificare în deomeniu', nrLocuri: '2', telefon:  '0762634842', email: 'scopi@apsg.ro' },
{id:'635', judet: 'gorj', luna: 'octombrie', img: 'images/angajari.jpg', angajator: 'MIRUAL PROD SRL',  adresa: 'Str. ANA IPĂTESCU  7  TÎRGU JIU', locDeMuncaVacant: 'PERSONAL MONTAJ MOBILA',  conditiiDeOcupare: 'Calificare in domeniu, experienta minim 1 an', nrLocuri: '5', telefon:  '0253218264', email: 'office@hansoberding.ro' },
{id:'636', judet: 'dolj', luna: 'octombrie', img: 'images/angajari.jpg', angajator: 'Pan Group SA',  adresa: 'Dacia 1a, Loc. Craiova, Jud. Dolj', locDeMuncaVacant: 'Patiser in Craiova',  conditiiDeOcupare: 'Calificare în domeniu', nrLocuri: '2', telefon:  '0740115152', email: 'lilisafta@pangrup.ro' },
{id:'637', judet: 'dolj', luna: 'octombrie', img: 'images/angajari.jpg', angajator: 'Premier Restaurants Romania Srl',  adresa: 'Ploiesti,B-ld Republicii,nr.136', locDeMuncaVacant: 'Lucrator Comercial in Craiova',  conditiiDeOcupare: 'Calificare în domeniu', nrLocuri: '1', telefon:  '0244407331', email: 'craiova@ro.mcd.com' },
{id:'638', judet: 'gorj', luna: 'octombrie', img: 'images/angajari.jpg', angajator: 'Profi Rom Food Srl',  adresa: 'Str.Calea Sever Bocu, nr.31', locDeMuncaVacant: 'Vanzator in Coşoveni',  conditiiDeOcupare: 'Calificare în domeniu', nrLocuri: '1', telefon:  '0372568911', email: 'resurseumane@profi.ro' },
{id:'639', judet: 'gorj', luna: 'octombrie', img: 'images/angajari.jpg', angajator: 'Restaurant Bacolux SRL',  adresa: 'CALEA SEVERINULUI 3 CRAIOVA', locDeMuncaVacant: 'Bucatar',  conditiiDeOcupare: 'Calificare în domeniu', nrLocuri: '1', telefon:  '0251 487 217', email: 'ru@bacolux.ro' },
{id:'640', judet: 'gorj', luna: 'octombrie', img: 'images/angajari.jpg', angajator: 'Restaurant Bacolux SRL',  adresa: 'CALEA SEVERINULUI 3 CRAIOVA', locDeMuncaVacant: 'Ajutor Ospatar',  conditiiDeOcupare: 'Calificare în domeniu', nrLocuri: '2', telefon:  '0251 487 217', email: 'ru@bacolux.ro' },
{id:'641', judet: 'gorj', luna: 'octombrie', img: 'images/angajari.jpg', angajator: 'Romanian Security Systems Srl',  adresa: 'Bulevardul Dimitrie Pompeiu 10a, Et. 3, Loc. Bucuresti, Jud. Bucuresti', locDeMuncaVacant: 'Agent De Securitate in Craiova',  conditiiDeOcupare: 'Calificare în domeniu', nrLocuri: '1', telefon:  '0724572564', email: 'ofice.galati@r-ss.ro' },
{id:'642', judet: 'gorj', luna: 'octombrie', img: 'images/angajari.jpg', angajator: 'S.C. Stimir Com Srl',  adresa: 'Calea Bucuresti , Bl. P4, Sc. 1, Ap. 6, Loc. Craiova, Jud. Dol', locDeMuncaVacant: 'Bucatar in Craiova',  conditiiDeOcupare: 'Calificare în domeniu', nrLocuri: '1', telefon:  '0765955081', email: 'predoi_giorgi@yanoo.com' },
{id:'643', judet: 'gorj', luna: 'octombrie', img: 'images/angajari.jpg', angajator: 'SC Baile Ticleni SRL',  adresa: 'Str Villeneuve D ascq, Ticleni Gorj', locDeMuncaVacant: 'Receptioner',  conditiiDeOcupare: 'Minim studii medii, disponibilitati de dialog, comportament civilizat', nrLocuri: '1', telefon:  '0733051667', email: 'scopi@apsg.ro' },
{id:'644', judet: 'gorj', luna: 'octombrie', img: 'images/angajari.jpg', angajator: 'Sc Marsat SA',  adresa: 'Str.Termocentralei ,Nr.2,Tg-Jiu', locDeMuncaVacant: 'Sudor',  conditiiDeOcupare: 'Calificare in domeniu,studii medii, disponibilitate deplasare', nrLocuri: '2', telefon:  '0253210047', email: 'office@marsat.com.ro' },
{id:'645', judet: 'gorj', luna: 'octombrie', img: 'images/angajari.jpg', angajator: 'Sc Marsat SA',  adresa: 'Str.Termocentralei ,Nr.2,Tg-Jiu', locDeMuncaVacant: 'Lacatus mecanic',  conditiiDeOcupare: 'Calificare in domeniu,studii medii,disponibilitate deplasare', nrLocuri: '2', telefon:  '0253210047', email: 'office@marsat.com.ro' },
{id:'646', judet: 'gorj', luna: 'octombrie', img: 'images/angajari.jpg', angajator: 'Sc Marsat SA',  adresa: 'Str.Termocentralei ,Nr.2,Tg-Jiu', locDeMuncaVacant: 'Inginer',  conditiiDeOcupare: 'Studii superioare,experienta in domeniu', nrLocuri: '2', telefon:  '0253210047', email: 'office@marsat.com.ro' },
{id:'647', judet: 'gorj', luna: 'octombrie', img: 'images/angajari.jpg', angajator: 'Sc Marsat SA',  adresa: 'Str.Termocentralei ,Nr.2,Tg-Jiu', locDeMuncaVacant: 'Electrician',  conditiiDeOcupare: 'Calificare in domeniu,studii medii,disponibilitate deplasare', nrLocuri: '2', telefon:  '0253210047', email: 'office@marsat.com.ro' },
{id:'648', judet: 'gorj', luna: 'octombrie', img: 'images/angajari.jpg', angajator: 'SC Metro Cash & Carry Romania Srl',  adresa: 'Otopeni, Str: BUCURESTI- PLOIESTI, nr:289', locDeMuncaVacant: 'Lucrator Comercial in Craiova',  conditiiDeOcupare: 'Calificare în domeniu', nrLocuri: '1', telefon:  '0265 202 150', email: 'resurseumane.targumures@metro.ro' },
{id:'649', judet: 'gorj', luna: 'octombrie', img: 'images/angajari.jpg', angajator: 'Sc Tanidro Farm Srl',  adresa: 'Strada Brestei 296, Cod Postal 200207, Loc. Craiova, Jud. Dolj', locDeMuncaVacant: 'Lucrator Comercial in Craiova',  conditiiDeOcupare: 'Calificare în domeniu', nrLocuri: '1', telefon:  '0747017017', email: 'scopi@apsg.ro' },
{id:'650', judet: 'gorj', luna: 'octombrie', img: 'images/angajari.jpg', angajator: 'SE BORDNETZE SRL,PL TG-JIU',  adresa: 'BUCHIN,LUNCA GROFULUI DN6,KM 450', locDeMuncaVacant: 'CONFECTIONER CABLAJE AUTO',  conditiiDeOcupare: '8 clase,fara experienta in domeniu,spirit de echipa.', nrLocuri: '130', telefon:  '0255506424', email: 'scopi@apsg.ro' },
{id:'651', judet: 'gorj', luna: 'octombrie', img: 'images/angajari.jpg', angajator: 'SE BORDNETZE SRL,PL TG-JIU',  adresa: 'BUCHIN,LUNCA GROFULUI DN6,KM 450', locDeMuncaVacant: 'TEHNICIAN PROIECTANT',  conditiiDeOcupare: 'Studii medii,vechime minim 6 luni', nrLocuri: '1', telefon:  '0255506424', email: 'scopi@apsg.ro' },
{id:'652', judet: 'gorj', luna: 'octombrie', img: 'images/angajari.jpg', angajator: 'SE BORDNETZE SRL,PL TG-JIU',  adresa: 'BUCHIN,LUNCA GROFULUI DN6,KM 450', locDeMuncaVacant: 'ADMINISTRATOR RETEA CALCULATOARE',  conditiiDeOcupare: 'Studii superioare,vechime minim 1 an', nrLocuri: '1', telefon:  '0255506424', email: 'scopi@apsg.ro' },
{id:'653', judet: 'gorj', luna: 'octombrie', img: 'images/angajari.jpg', angajator: 'SE BORNETZE SRL,PL TG-JIU',  adresa: 'BUCHIN,LUNCA GROFULUI DN6,KM 450', locDeMuncaVacant: 'INGINER PRODUCTIE',  conditiiDeOcupare: 'Studii superioare,vechime minim 1 an', nrLocuri: '1', telefon:  '0255506424', email: 'scopi@apsg.ro' },
{id:'654', judet: 'gorj', luna: 'octombrie', img: 'images/angajari.jpg', angajator: 'STAR MEDIA SRL',  adresa: 'Slt. Vasile Militaru  Bl. 1, Sc. 1, Et. 4, Ap. 17 Loc. TÂRGU JIU, Jud. GORJ', locDeMuncaVacant: 'CONFECTIONER-ASAMBLOR ARTICOLE DIN TEXTILE',  conditiiDeOcupare: 'Minim studii profesionale', nrLocuri: '10', telefon:  '0766738490', email: 'marlenpop@yahoo.com' },
{id:'655', judet: 'gorj', luna: 'octombrie', img: 'images/angajari.jpg', angajator: 'Tregi Direct Service Srl',  adresa: 'STR. FRAŢII GOLEŞTI, Nr. 108A', locDeMuncaVacant: 'Operator Vanzari Prin Telefon in Craiova',  conditiiDeOcupare: 'Calificare în domeniu', nrLocuri: '1', telefon:  '0212308060', email: 'Jobtregidirectservice.com' },
{id:'656', judet: 'gorj', luna: 'octombrie', img: 'images/angajari.jpg', angajator: 'Valyscom Roiesti Srl',  adresa: 'Calea Severinului 42a, Loc. Craiova, Jud. Dolj', locDeMuncaVacant: 'Bucatar in Craiova',  conditiiDeOcupare: 'Calificare în domeniu', nrLocuri: '1', telefon:  '0251588414', email: 'scopi@apsg.ro' },
{id:'657', judet: 'gorj', luna: 'octombrie', img: 'images/angajari.jpg', angajator: 'VILOMAR COMPREST SRL',  adresa: 'COMPLEX COMERCIAL PIAŢA CENTRALĂ , Loc. TÂRGU JIU, Jud. GORJ', locDeMuncaVacant: 'Vanzator cod COR 522101',  conditiiDeOcupare: 'Calificare in domeniu', nrLocuri: '2', telefon:  '0749029236', email: 'scopi@apsg.ro' },
{id:'658', judet: 'gorj', luna: 'octombrie', img: 'images/angajari.jpg', angajator: 'VOTICOM SRL',  adresa: 'Str. Alexandru Ioan Ghica 2A, Loc. BUMBEŞTI-JIU, Jud. GORJ', locDeMuncaVacant: 'LUCRATOR GESTIONAR',  conditiiDeOcupare: 'Fara experienta, calificare,', nrLocuri: '1', telefon:  '0785111471', email: 'scopi@apsg.ro' },
{id:'678', judet: 'gorj', luna: 'decembrie', img: 'images/angajari.jpg', angajator: 'Auto Class Srl',  adresa: 'Str. Aeroportului 207, Loc. Carcea, Jud. Dolj', locDeMuncaVacant: 'Gestionar Depozit',  conditiiDeOcupare: 'Calificare în domeniu', nrLocuri: '1', telefon:  '0251468467', email: 'office@auto-class.ro' },
{id:'692', judet: 'dolj', luna: 'decembrie', img: 'images/angajari.jpg', angajator: 'Auto Class Srl',  adresa: 'Str. Aeroportului 207, Loc. Carcea, Jud. Dolj', locDeMuncaVacant: 'Sef Atelier Reparatii',  conditiiDeOcupare: 'Studii superioare in domeniu auto vechime minim 1 an', nrLocuri: '1', telefon:  '0251468467', email: 'office@auto-class.ro' },
{id:'694', judet: 'dolj', luna: 'decembrie', img: 'images/angajari.jpg', angajator: 'Auto Class Srl',  adresa: 'Str. Bujorului 24, Loc. Craiova Str. Aeroportului 207, Loc. Carcea, Jud. Dolj', locDeMuncaVacant: 'Mecanic Auto',  conditiiDeOcupare: 'Calificare în domeniu', nrLocuri: '2', telefon:  '0251468467', email: 'office@auto-class.ro' },
{id:'688', judet: 'gorj', luna: 'decembrie', img: 'images/angajari.jpg', angajator: 'AVICARVIL SRL',  adresa: 'COM. FRANCESTI 11, Loc. FRÂNCEŞTI, Jud. VÂLCEA', locDeMuncaVacant: 'OPERATOR INTRODUCERE, VALIDARE SI PRELUCRARE DATE',  conditiiDeOcupare: 'STUDII LICEALE,CALIFICARE', nrLocuri: '3', telefon:  '0735789645', email: 'scopi@apsg.ro' },
{id:'677', judet: 'gorj', luna: 'decembrie', img: 'images/angajari.jpg', angajator: 'BELLAPAV SRL',  adresa: 'STR. 30 DECEMBRIE 25, Loc. TÂRGU JIU, Jud. GORJ', locDeMuncaVacant: 'LUCRATOR GESTIONAR',  conditiiDeOcupare: 'STUDII MEDII,CALIFICARE IN DOMENIU,SERIOZITATE,ABILITATI DE COMUNICARE', nrLocuri: '2', telefon:  '0730700000', email: 'scopi@apsg.ro' },
{id:'665', judet: 'dolj', luna: 'decembrie', img: 'images/angajari.jpg', angajator: 'Exflor Srl',  adresa: 'Strada Str. Plaiului 19, Loc. Carcea, Jud. Dolj', locDeMuncaVacant: 'Lucrator Comercial',  conditiiDeOcupare: 'Calificare în domeniu', nrLocuri: '2', telefon:  '3722747026', email: 'office@exflor.ro' },
{id:'662', judet: 'gorj', luna: 'decembrie', img: 'images/angajari.jpg', angajator: 'IOACHIM-CLAS SR',  adresa: 'Bulevardul Republicii 24, Bl. 24, Sc. 1, Et. 2, Ap. 7, Cod postal 210152, Loc. TÂRGU JIU, Jud. GORJ', locDeMuncaVacant: 'INSPECTOR/REFERENT RESURSE UMANE',  conditiiDeOcupare: 'Calificare,studii medii', nrLocuri: '1', telefon:  '0761909948', email: 'scopi@apsg.ro' },
{id:'676', judet: 'gorj', luna: 'decembrie', img: 'images/angajari.jpg', angajator: 'IVIDI COM SRL',  adresa: 'STR. 1 DECEMBRIE 1918 , Bl. 70, Ap. 9,  Loc. TÂRGU JIU, Jud. GORJ', locDeMuncaVacant: 'LUCRATOR GESTIONAR',  conditiiDeOcupare: 'STUDII MEDII,CALIFICARE IN DOMENIU,SERIOZITATE,ABILITATI DE COMUNICARE', nrLocuri: '1', telefon:  '0769240819', email: 'scopi@apsg.ro' },
{id:'666', judet: 'dolj', luna: 'decembrie', img: 'images/angajari.jpg', angajator: 'Liceul „Traian Vuia” din Craiova',  adresa: 'Str. Rovinari, nr. 1A Loc. Craiova', locDeMuncaVacant: 'Tehnician',  conditiiDeOcupare: 'Studii medii, treapta profesionala IA-1 post', nrLocuri: '1', telefon:  '0351407201', email: 'scopi@apsg.ro' },
{id:'667', judet: 'dolj', luna: 'decembrie', img: 'images/angajari.jpg', angajator: 'Liceul „Traian Vuia” din Craiova',  adresa: 'Str. Rovinari, nr. 1A Loc. Craiova', locDeMuncaVacant: 'Muncitor calificat (fochist)',  conditiiDeOcupare: '(fochist), treapta profesionala III – 1 post.', nrLocuri: '1', telefon:  '0351407201', email: 'scopi@apsg.ro' },
{id:'663', judet: 'gorj', luna: 'decembrie', img: 'images/angajari.jpg', angajator: 'LUPULESCU-JITIANU ELENA CRISTINA',  adresa: 'Str.Aleea Mioritei bl 5,sc1,ap4,jud Gorj', locDeMuncaVacant: 'ECONOMIST',  conditiiDeOcupare: 'Studii superioare,experienta', nrLocuri: '1', telefon:  '0766409052', email: 'scopi@apsg.ro' },
{id:'679', judet: 'dolj', luna: 'decembrie', img: 'images/angajari.jpg', angajator: 'Novara T Impex SRL',  adresa: 'Str. Primaverii 35 Craiova', locDeMuncaVacant: 'Mecanic Utilaj',  conditiiDeOcupare: 'Calificare în domeniu', nrLocuri: '1', telefon:  '0251594025', email: 'novaramaketing@yahoo.com' },
{id:'680', judet: 'dolj', luna: 'decembrie', img: 'images/angajari.jpg', angajator: 'Novara T Impex SRL',  adresa: 'Str. Primaverii 35 Craiova', locDeMuncaVacant: 'Instalator Incalzire Centrala Si Gaze',  conditiiDeOcupare: 'Calificare în domeniu', nrLocuri: '1', telefon:  '0251594025', email: 'novaramaketing@yahoo.com' },
{id:'681', judet: 'dolj', luna: 'decembrie', img: 'images/angajari.jpg', angajator: 'Novara T Impex SRL',  adresa: 'Str. Primaverii 35 Craiova', locDeMuncaVacant: 'Electrician In Constructii',  conditiiDeOcupare: 'Calificare în domeniu', nrLocuri: '1', telefon:  '0251594025', email: 'novaramaketing@yahoo.com' },
{id:'691', judet: 'dolj', luna: 'decembrie', img: 'images/angajari.jpg', angajator: 'Novara T Impex SRL',  adresa: 'Str. Primaverii 35 Craiova', locDeMuncaVacant: 'Mecanic Auto',  conditiiDeOcupare: 'Calificare în domeniu', nrLocuri: '2', telefon:  '0251594025', email: 'novaramaketing@yahoo.com' },
{id:'693', judet: 'dolj', luna: 'decembrie', img: 'images/angajari.jpg', angajator: 'Ocealan-dezmembrari Srl',  adresa: 'Str. Fulger 211, Loc. Craiova', locDeMuncaVacant: 'Mecanic Auto',  conditiiDeOcupare: 'Studii medii, calificare in domeniu auto vechime momim 1 an', nrLocuri: '1', telefon:  '0761681237', email: 'scopi@apsg.ro' },
{id:'686', judet: 'gorj', luna: 'decembrie', img: 'images/angajari.jpg', angajator: 'OFICIUL DE CADASTRU SI PUBLICITATE IMOBILIARA GORJ',  adresa: 'STR. 8 MARTIE 3A, Loc. TÂRGU JIU, Jud. GORJ', locDeMuncaVacant: 'ASISTENT REGISTRATOR',  conditiiDeOcupare: 'STUDII LICEALE, concurs', nrLocuri: '3', telefon:  '0253217189', email: 'scopi@apsg.ro' },
{id:'672', judet: 'dolj', luna: 'decembrie', img: 'images/angajari.jpg', angajator: 'PACOSIN PROD SRL',  adresa: 'Sat MUSCULESTI,com BARBATESTI', locDeMuncaVacant: 'MANIPULANT MARFURI',  conditiiDeOcupare: 'STUDII MEDII,DISPONIBILITATE MUNCA GREA', nrLocuri: '1', telefon:  '0763923381', email: 'scopi@apsg.ro' },
{id:'675', judet: 'gorj', luna: 'decembrie', img: 'images/angajari.jpg', angajator: 'PAY IMOB SRL',  adresa: 'VICTORIEI , Bl. 194 Loc. TÂRGU JIU, Jud. GORJ', locDeMuncaVacant: 'AGENT DE VÂNZARI',  conditiiDeOcupare: 'STUDII MEDII,CALIFICARE IN DOMENIU,SERIOZITATE,ABILITATI DE COMUNICARE', nrLocuri: '3', telefon:  '0762111133', email: 'scopi@apsg.ro' },
{id:'695', judet: 'dolj', luna: 'decembrie', img: 'images/angajari.jpg', angajator: 'Popeci Utilaj Greu Srl',  adresa: 'Strada Tehnicii 1  Loc. Craiova', locDeMuncaVacant: 'Lacatus Mecanic',  conditiiDeOcupare: 'Calificare în domeniu', nrLocuri: '1', telefon:  '0251435100', email: 'office@popeci.ro' },
{id:'664', judet: 'dolj', luna: 'decembrie', img: 'images/angajari.jpg', angajator: 'Premier Restaurants Romania Srl',  adresa: 'Ploiesti,B-ld Republicii,nr.136', locDeMuncaVacant: 'Lucrator Comercial',  conditiiDeOcupare: 'Calificare în domeniu', nrLocuri: '1', telefon:  '0244407331', email: 'craiova@ro.mcd.com' },
{id:'684', judet: 'gorj', luna: 'decembrie', img: 'images/angajari.jpg', angajator: 'PROTECTIA SRL',  adresa: 'Strada Str. VASILE ALECSANDRI 40, Loc. TÂRGU JIU, Jud. GORJ', locDeMuncaVacant: 'AGENT DE SECURITATE',  conditiiDeOcupare: 'STUDII GIMNAZIALE,CALIFICARE', nrLocuri: '1', telefon:  '0253222743', email: 'protectia1999@yahoo.com' },
{id:'670', judet: 'dolj', luna: 'decembrie', img: 'images/angajari.jpg', angajator: 'SC BARECOB SRL',  adresa: 'Str.M.LATARETU nr.11', locDeMuncaVacant: 'LUCRATOR GESTIONAR',  conditiiDeOcupare: 'STUDII LICEALE,CALIFICARE', nrLocuri: '1', telefon:  '0786409085', email: 'scopi@apsg.ro' },
{id:'671', judet: 'dolj', luna: 'decembrie', img: 'images/angajari.jpg', angajator: 'SC BARECOB SRL',  adresa: 'Str.M.LATARETU nr.11', locDeMuncaVacant: 'AGENT VANZARI',  conditiiDeOcupare: 'STUDII LICEALE,CALIFICARE', nrLocuri: '1', telefon:  '0786409085', email: 'scopi@apsg.ro' },
{id:'659', judet: 'gorj', luna: 'decembrie', img: 'images/angajari.jpg', angajator: 'SC BONIDANIS SRL',  adresa: 'Str.MARIN SORESCU nr.35', locDeMuncaVacant: 'LUCRATOR COMERCIAL',  conditiiDeOcupare: 'Calificare in domeniu,experienta minim 1 an', nrLocuri: '2', telefon:  '0733911110', email: 'scopi@apsg.ro' },
{id:'668', judet: 'dolj', luna: 'decembrie', img: 'images/angajari.jpg', angajator: 'Sc Indaeltrac Srl',  adresa: 'Str. Bujorului 24, Loc. Craiova', locDeMuncaVacant: 'Muncitor Necalificat La Asamblarea, Montarea Pieselor',  conditiiDeOcupare: 'Calificare în domeniu', nrLocuri: '1', telefon:  '0746125818', email: 'scopi@apsg.ro' },
{id:'682', judet: 'dolj', luna: 'decembrie', img: 'images/angajari.jpg', angajator: 'Sc Indaeltrac Srl',  adresa: 'Str. Bujorului 24, Loc. Craiova', locDeMuncaVacant: 'Inginer Mecanic',  conditiiDeOcupare: 'Calificare în domeniu', nrLocuri: '1', telefon:  '0746125818', email: 'scopi@apsg.ro' },
{id:'683', judet: 'dolj', luna: 'decembrie', img: 'images/angajari.jpg', angajator: 'Sc Indaeltrac Srl',  adresa: 'Str. Bujorului 24, Loc. Craiova', locDeMuncaVacant: 'Operator Standuri',  conditiiDeOcupare: 'Calificare în domeniu', nrLocuri: '2', telefon:  '0746125818', email: 'scopi@apsg.ro' },
{id:'673', judet: 'dolj', luna: 'decembrie', img: 'images/angajari.jpg', angajator: 'SC IVATRAND SRL',  adresa: 'Sat COMANESTI,com BALA,MEHEDINTI', locDeMuncaVacant: 'LUCRATOR GESTIONAR',  conditiiDeOcupare: 'STUDII MEDII,DISPONIBILITATE ORE SUPLIMENTARE', nrLocuri: '1', telefon:  '0755523880', email: 'scopi@apsg.ro' },
{id:'674', judet: 'gorj', luna: 'decembrie', img: 'images/angajari.jpg', angajator: 'SC RAINBOW OUTLET SRL',  adresa: 'CALEA BUCURESTI 141,CRAIOVA', locDeMuncaVacant: 'LUCRATOR COMERCIAL',  conditiiDeOcupare: 'STUDII MEDII,CALIFICARE IN DOMENIU,SERIOZITATE,ABILITATI DE COMUNICARE', nrLocuri: '1', telefon:  '0767322072', email: 'scopi@apsg.ro' },
{id:'660', judet: 'gorj', luna: 'decembrie', img: 'images/angajari.jpg', angajator: 'SC SUCCES NIC COM SRL',  adresa: 'Str.BUCEGI nr.1,VOLUNTARI,ILFOV', locDeMuncaVacant: 'LUCRATOR COMERCIAL',  conditiiDeOcupare: 'Calificare in domeniu,aspect fizic placut,experienta', nrLocuri: '10', telefon:  '0752181000', email: 'resurse.umane@succes.ro' },
{id:'661', judet: 'gorj', luna: 'decembrie', img: 'images/angajari.jpg', angajator: 'SC SUCCES NIC COM SRL',  adresa: 'Str.BUCEGI nr.1,VOLUNTARI,ILFOV', locDeMuncaVacant: 'LUCRATOR GESTIONAR',  conditiiDeOcupare: 'Calificare in domeniu,aspect fizic placut,experienta', nrLocuri: '5', telefon:  '0752181000', email: 'resurse.umane@succes.ro' },
{id:'685', judet: 'gorj', luna: 'decembrie', img: 'images/angajari.jpg', angajator: 'TMG GUARD SRL',  adresa: 'Bulevardul Republicii 26,Loc. TÂRGU JIU, Jud. GORJ', locDeMuncaVacant: 'AGENT DE SECURITATE',  conditiiDeOcupare: 'STUDII LICEALE,CALIFICARE', nrLocuri: '2', telefon:  '0253238227', email: 'teamguard_personal@yahoo.com' },
{id:'690', judet: 'dolj', luna: 'decembrie', img: 'images/angajari.jpg', angajator: 'Universitatea Din Craiova',  adresa: 'Strada Alexandru Ioan Cuza 13 Craiova', locDeMuncaVacant: 'Fochist Pentru Cazane De Abur Si De Apa Fierbinte in Craiova',  conditiiDeOcupare: 'Fochist Pentru Cazane De Abur Si De Apa Fierbinte in Craiova', nrLocuri: '1', telefon:  '0251414398', email: 'scopi@apsg.ro' },
{id:'687', judet: 'gorj', luna: 'decembrie', img: 'images/angajari.jpg', angajator: 'VADUL BANIEI SRL',  adresa: 'Localitate BAIA DE FIER, Judet GORJ', locDeMuncaVacant: 'MANIPULANT MARFURI',  conditiiDeOcupare: 'STUDII GIMNAZIALE', nrLocuri: '1', telefon:  '0253461331', email: 'scopi@apsg.ro' },
{id:'689', judet: 'gorj', luna: 'decembrie', img: 'images/angajari.jpg', angajator: 'VOTICOM SRL',  adresa: 'Strada Alexandru Ioan Ghica 2A BUMBEŞTI-JIU, Jud.GORJ', locDeMuncaVacant: 'LUCRATOR GESTIONAR',  conditiiDeOcupare: 'STUDII LICEALE,CALIFICARE', nrLocuri: '4', telefon:  '0253213041', email: 'scopi@apsg.ro' },

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
      <div className="page-intro">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <ol className="breadcrumb">
                <li><i className="fa fa-home pr-10"></i><a href="/">Home</a></li>
                <li className="active"></li>
              </ol>
            </div>
          </div>
        </div>
      </div>
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
                  <li><a href="" data-filter=".hunedoara">Hunedoara</a></li>
                  <li><a href="" data-filter=".septembrie">Septembrie 2018</a></li>
                  <li><a href="" data-filter=".octombrie">Octombrie 2018</a></li>
                  <li><a href="" data-filter=".noiembrie">Noiembrie 2018</a></li>
                  <li><a href="" data-filter=".decembrie">Decembrie 2018</a></li>
                  <li><a href="" data-filter=".ianuarie">Ianuarie 2019</a></li>
                </ul>
              </div>
              <div className="isotope-container row grid-space-20">
                {locuri
                    .map(lmvs =>
                <div key={lmvs.id} className={`${lmvs.judet} ${lmvs.luna} col-sm-4 isotope-item margin-bottom-clear`}>
                          <div className="box-style-1 white-bg">
                            <div className="overlay-container">
                              <img src={lmvs.img} alt=""/>
                              <a href={`/lmvs/${lmvs.id}`} className="overlay small">
                                <i className="fa fa-plus"></i>
                                <span>{lmvs.locDeMuncaVacant}</span>
                              </a>
                            </div>
                            <h3><a href={`/lmvs/${lmvs.id}`}>{lmvs.angajator}</a></h3>
                            <p>{lmvs.locDeMuncaVacant}</p>
                            <a href={`/lmvs/${lmvs.id}`} className="btn btn-default" style={{color: 'white'}}>Detalii</a>
                        </div>
                        </div>
                    )}
                </div>

              </div>
            </div>
          </div>

    <div className="section gray-bg text-muted footer-top clearfix">
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <div className="owl-carousel clients">
                {locuri
                .map(lmvsa =>
                <div key={lmvsa.id} className="client">
                  <a href={`/lmvs/${lmvsa.id}`}><img src={lmvsa.img} alt={lmvsa.locDeMuncaVacant}/></a>
                </div>
                )}
              </div>
            </div>
            <div className="col-md-6">
              <blockquote className="inline">
                <p className="margin-clear">Minds are like parachutes. They only function when open.</p>
                <footer><cite title="Source Title">Thomas Dewar</cite></footer>
              </blockquote>
            </div>
          </div>
        </div>
      </div>
        </div>
      </section>
  );
}

function ImageView({ match }) {
  let image = locuri[parseInt(match.params.id, 10)];
  if (!image) return <div>Image not found</div>;
  return (
    <section className="gray-bg">
       <div className="page-intro">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <ol className="breadcrumb">
                <li><i className="fa fa-home pr-10"></i><a href="/">Home</a></li>
                <li className="active">{`Loc vacant / ${image.id}`}</li>
              </ol>
            </div>
          </div>
        </div>
      </div>
      <div className="section gray-bg text-muted footer-top clearfix ">
      <div className="container">
      <h1>{image.angajator} angajeaza</h1>
      <div className="separator-2"></div>
      <div className="container">
          <div className="row">
              <div className="col-md-8 col-md-offset-2 cmw_anunt_job_box_left">
                  <div className="vacancy">
                            <h2>{image.locDeMuncaVacant}</h2>
                            <p>Conditii de ocupare:{image.conditiiDeOcupare}</p>
                  </div>
                <hr/>
            <div className="company">
                    <h2>{image.angajator}</h2>
                    <p>Adresa:{image.adresa}</p>
                    <p>Telefon:{image.telefon}</p>
            </div>
            </div>
           </div>
      </div>
      </div>

        </div>
        <div className="section gray-bg text-muted footer-top clearfix">
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <div className="owl-carousel clients">
                {locuri
                .map(lmvsa =>
                <div key={lmvsa.id} className="client">
                  <a href={`/lmvs/${lmvsa.id}`}><img src={`../${lmvsa.img}`} alt={lmvsa.locDeMuncaVacant}/></a>
                </div>
                )}
              </div>
            </div>
            <div className="col-md-6">
              <blockquote className="inline">
                <p className="margin-clear">Minds are like parachutes. They only function when open.</p>
                <footer><cite title="Source Title">Thomas Dewar</cite></footer>
              </blockquote>
            </div>
          </div>
        </div>
      </div>
    </section>

  );
}
function App() {
  return (
    <Router>
      <Route component={ModalSwitch} />
    </Router>
  );
}
export default App;
