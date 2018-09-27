      const items = [
      {id:'1', judet: 'gorj', luna: 'iulie', img: 'images/portfolio-1.jpg', angajator: 'SC TEHNOINSTAL SRL',
      adresa: 'Str.1 Decembrie 1918,Tg-Jiu,Gorj', locDeMuncaVacant: 'MECANIC UTILAJ',
      conditiiDeOcupare: 'LICEU', nrLocuri: '1', telefon:  '0786409053', email: 'scopi@apsg.eu'
      },
      {id:'2', judet: 'gorj', luna: 'iulie', img: 'images/portfolio-1.jpg', angajator: 'RADU S 81 SRL',
      adresa: 'Str Gen.Magheru,Tg-Jiu,jud.Gorj', locDeMuncaVacant: 'LUCRATOR GESTIONAR',
      conditiiDeOcupare: 'LICEU', nrLocuri: '1', telefon:  '0765451836', email: 'scopi@apsg.eu'
      },
      ]
      
      let token = localStorage.token
      if (!token)
      token = localStorage.token = Math.random().toString(36).substr(-8)

      const headers = {
      'Accept': 'application/json',
      'Authorization': token
      }

      export const Dates = () =>
      fetch(`{items}`, { headers })
      .then(res => res.json())
      .then(data => data.items)
   