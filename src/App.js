import React, { Component } from 'react';
import Lmv from './lmv.js'
import { 
    Stitch,
    RemoteMongoClient,
    AnonymousCredential
} from "mongodb-stitch-browser-sdk";

import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { items: [] };
    this.state = { super: [
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
    ] };
  }

 
  render() {
const client = Stitch.initializeDefaultAppClient('talentati-rtvdi');

const db = client.getServiceClient(RemoteMongoClient.factory, 'mongodb-atlas').db('talent');

client.auth.loginWithCredential(new AnonymousCredential()).then(user => 
  db.collection('talentati').updateOne({owner_id: client.auth.user.id}, {$set:{number:42}}, {upsert:true})
).then(() => 
  db.collection('talentati').find({owner_id: client.auth.user.id}, { limit: 100}).asArray()
).then(docs => {
    console.log("Found docs", docs)
    console.log("[MongoDB Stitch] Connected to Stitch")
}).catch(err => {
    console.error(err)
});
      return (
      
      <div className="App">
       <Lmv
       locuri={this.state.super}
       />
                
      </div>
    );
  }
}

export default App;
