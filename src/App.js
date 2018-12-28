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
                  <li><a href="" data-filter=".iulie">Iulie 2018</a></li>
                  <li><a href="" data-filter=".august">August 2018</a></li>
                  <li><a href="" data-filter=".septembrie">Septembrie 2018</a></li>
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
