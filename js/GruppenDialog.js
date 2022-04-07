class GruppenDialog extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      showDialog: this.props.visible,
      gruppenListe: App.gruppenListe,
    };console.debug(App.gruppenListe)
  }

  /**
   * Mit GruppenHinzufügen kann man im Gruppendialog Tag neue Gruppenhinzufügen.
   */
  gruppeHinzufuegen = () => {
    let eingabe = document.getElementById("Enter")
    if (eingabe.value.trim().length > 0) {
      App.gruppeHinzufuegen(eingabe.value)
      this.setState({gruppenListe: App.gruppenListe})
    }
    eingabe.value = ""
    eingabe.focus()
  }
  
  gruppeBearbeiten = (gruppe) => {
    let bearbeiten = document.getElementById("bearbeiten")
    if (bearbeiten.value.trim().length > 0) {
      App.gruppeUmbenennen(gruppe, bearbeiten.value)
      this.setState({gruppenListe: App.gruppenListe})
    }
    bearbeiten.value = ""
    bearbeiten.focus()
  }
  /**
   * Gruppe entfernen ist dafür da um gruppen zu Löschen, die nicht mehr benötigt werden
   * @param gruppe
   */
  gruppeEntfernen = (gruppe) => {
    App.gruppeEntfernen(gruppe)
    this.setState({gruppenListe: App.gruppenListe})
  }

  render() {
    
    return (
      <div className={'mdc-dialog ' + (this.props.visible ? 'mdc-dialog--open' : '')}>
        <div className="mdc-dialog__container">
          <div className="mdc-dialog__surface">
            <h2 className="mdc-dialog__title">Gruppen bearbeiten</h2>

            <div className="mdc-dialog__content">
              <nav>
                <input type="text" id="Enter"  placeholder="Gruppe hinzufügen"
                       onKeyUp={event => (event.keyCode == 13) ? this.gruppeHinzufuegen() : ''}/>
                <button className="material-icons"
                        onClick={() => this.gruppeHinzufuegen()}>add_circle</button>
              </nav>
              <hr/>

              <dl className="mdc-deprecated-list">
                {App.gruppenListe.map(gruppe => (
                  <dt key={gruppe.id}>
                    <span>{gruppe.name}</span>
                    <i className="material-icons" onClick={()=>this.gruppeBearbeiten(gruppe.id)}>
                      drive_file_rename_outline</i>
                    <i className="material-icons" onClick={()=>this.gruppeEntfernen(gruppe.id)}>delete</i>
                  </dt>
                ))}
              </dl>
            </div>

            <div className="mdc-dialog__actions">
              <button type="button" className="mdc-button mdc-dialog__button"
                      onClick={()=>this.props.onDialogClose()}>
                <span className="mdc-button__label">Schließen</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
