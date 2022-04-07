
class ShoppingTag extends React.Component {
  constructor(props) {
    super(props);

    this.state ={
    aktiveGruppe: null,
      showGruppenDialog: false
    }
    this.startzustandLaden()
  }

  /**
   * Läd den gespeicherten des localstorage, für mehr Informationen siehe App.datenEinlesen.
   * @returns {Promise<void>}
   */
   async startzustandLaden(){
    await App.datenEinlesen()
     this.setState(this.state)
    console.debug(this.state)
   }

  /**
   * Setzt Aktive Gruppe auf Aktiv in der State.
   * @param gruppenId
   */
  setAktiveGruppe = (gruppenId) => {
    App.aktiveGruppe = gruppenId
    const gruppe = App.gruppeFinden(gruppenId)
    App.informieren(`[App] Gruppe "${gruppe.name}" ist nun aktiv`)
    this.setState({aktiveGruppe: App.aktiveGruppe})
  }
  /**
   * harkt die Checkbox ab und verschiebt sie zu Erledigt, und kann sie auch Reaktivieren.
   * @param artikel
   */
  artikelChecken = (artikel) => {
    artikel.gekauft = !artikel.gekauft
    const aktion= artikel.gekauft ? "erledigt" : "reaktiviert"
    App.informieren(`[App] Artikel "${artikel.name}" ${aktion}`)
    this.setState(this.state)
  }
  /**
   * Mit dieser Methode kann man in Text feld Artikel zu einer Gruppehinzufügen.
   */
  artikelHinzufuegen = () => {
    let eingabe = document.getElementById("eingabe")
  if (eingabe.value.trim().length > 0) {
    console.debug(App.aktiveGruppe)
    let aktiveGruppe = App.gruppeFinden(App.aktiveGruppe)
    console.debug(aktiveGruppe)
    aktiveGruppe.artikelHinzufuegen(eingabe.value)
    this.setState(this.state)

  }
  eingabe.value=""
  eingabe.focus()
}




  render = () => {
    return (
      <div>
        <header>
          <h1>Einkaufsliste</h1>
          <nav className="Artikel">
            <input type="text" id="eingabe" placeholder="Artikel hinzufügen"/>
            <button className="material-icons Plus" onClick={() => this.artikelHinzufuegen()}>add_circle</button>
          </nav>
        </header>
        <hr/>
        <main>
          <section>
            <h2>Einkaufen<i className="material-icons">expand_less</i></h2>
            <dl>

              {App.gruppenListe.map(gruppe =>(
                <GruppenTag checkHandler= {this.artikelChecken} key={gruppe.id} gruppe={gruppe} erledigt={false}
                aktiveGruppeHandler={this.setAktiveGruppe}
                aktiv={gruppe.id == App.aktiveGruppe}/>
              ))}

            </dl>



          </section>
          <hr/>
          <section>
            <h2>Erledigt<i className="material-icons">expand_less</i></h2>
            <dl>
              {App.gruppenListe.map(gruppe =>(
                <GruppenTag key={gruppe.id} checkHandler= {this.artikelChecken} gruppe={gruppe} erledigt={true}/>
              ))}
            </dl>
          </section>
        </main>
        <hr/>
        <footer>

          <nav>
            <GruppenDialog  visible={this.state.showGruppenDialog} gruppenListe={App.gruppenListe}
                           onDialogClose={() => this.setState({showGruppenDialog: false})}/>

            <button id="Gruppe" onClick={()=> this.setState({showGruppenDialog:true})}><span className="material-icons">bookmark_add</span>Gruppen</button>
          </nav>
        </footer>



      </div>
    )
  }
}
