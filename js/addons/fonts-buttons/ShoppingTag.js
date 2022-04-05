class ShoppingTag extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      aktiveGruppe: null
    }
    this.startzustandLaden()
  }

  async startzustandLaden() {
    await App.datenEinlesen()
    this.setState(this.state)
  }

  setAktiveGruppe = (gruppenId) => {
    App.aktiveGruppe = gruppenId
    this.setState({aktiveGruppe: App.aktiveGruppe})
    this.setState(this.state)
  }

  artikelChecken = (artikel) => {
    artikel.gekauft = !artikel.gekauft
    this.setState({state: this.state})
  }

  render = () => {
    return (
      <div id="container">
        <header>
          <h1>Einkaufsliste</h1>
          <nav>
            <input type="search" id="artikelEingabe" placeholder="Artikel hinzufügen"/>
            <button className="mdc-button material-icons">
              add_circle
            </button>
          </nav>
        </header>
        <hr/>

        <main>
          <section>
            <h2>Einkaufen
              <i className="material-icons">expand_less</i>
            </h2>
            <dl>
              {
                App.gruppenListe.map(gruppe => (
                  <GruppenTag key={gruppe.id} gruppe={gruppe} gekauft={"false"}
                              aktiveGruppeHandler={this.setAktiveGruppe}
                              aktiv={gruppe.id == App.aktiveGruppe}
                              checkHandler={this.artikelChecken}/>
                ))}

            </dl>
          </section>
          <hr/>

          <section>
            <h2>Erledigt
              <i className="material-icons">expand_less</i>
            </h2>
            {this.state.erledigtAufgeklappt
              ? App.gruppenListe.map(gruppe =>
                <GruppenTag key={gruppe.id} gruppe={gruppe} gekauft={true}
                            aktiveGruppeHandler={() => this.setAktiveGruppe(gruppe.id)}
                            checkHandler={this.artikelChecken}/>)
              : ''}
          </section>
        </main>
        <hr/>

        <footer>
          <button className="mdc-button mdc-button--raised">
            <span className="mdc-button__ripple"></span>
            Gruppen
          </button>
          <button className="mdc-button mdc-button--raised">
            <span className="mdc-button__ripple"></span>
            <span className="material-icons">sort</span> Sort
          </button>
          <button className="mdc-button mdc-button--raised">
            <span className="mdc-button__ripple"></span>
            <span className="material-icons">settings</span> Setup
          </button>
        </footer>
      </div>
    )
  }
}
