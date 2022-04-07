class GruppenTag extends React.Component {
  constructor() {
    super();
    this.state= {
      aufgeklappt: true
    }
  }
  aufZuKlappen() {
    this.setState({aufgeklappt: !this.state.aufgeklappt})
  }

  /**
   * Artikelentfernen wird dafür benutzt um Eizelne Artikel aus den Gruppen zu Löschen.
   * @param artikel
   */
  artikelEntfernen = (artikel) => {
    this.props.gruppe.artikelEntfernen(artikel)
    this.props.aktiveGruppeHandler(this.props.gruppe.id)
  }



  render = () => {
    const erledigt = this.props.erledigt
   let itemsRelevant = this.props.gruppe.artikelListe.filter(item => item.gekauft == erledigt)
    return (
      <div>
        <dt className = {this.props.aktiv && !erledigt ?"aktiv" : "inaktiv"}
          onClick={()=> !erledigt ? this.props.aktiveGruppeHandler(this.props.gruppe.id) : ''}>
          <span>{this.props.gruppe.name}</span>
          <i onClick ={()=> this.aufZuKlappen()} className="material-icons">
            {this.state.aufgeklappt ? 'expand_more' : 'expand_less'}
          </i>
        </dt>
        {this.state.aufgeklappt ?
          itemsRelevant.map(artikel =>(
          <ArtikelTag key={artikel.id} artikel={artikel} checkHandler={this.props.checkHandler} deleteHandler={this.artikelEntfernen}/>

        ))
          :''}
      </div>
    )
  }
}
