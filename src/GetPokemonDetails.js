import React, { Component } from "react";
import { Grid, Card, CardContent, LinearProgress } from "@material-ui/core";

class GetPokemonDetails extends Component {
  constructor() {
    super();

    this.state = {
      details: {}
    };
  }

  componentDidMount() {
    fetch(`https://pokeapi.co/api/v2/pokemon/${this.props.id}`)
      .then((Response) => Response.json())
      .then((data) => {
        this.setState({
          details: {
            hp: data.stats[0].base_stat,
            attack: data.stats[1].base_stat,
            defense: data.stats[2].base_stat,
            specialattack: data.stats[3].base_stat,
            specialdefense: data.stats[4].base_stat,
            speed: data.stats[5].base_stat
          }
        });
      });
  }

  render() {
    return (
      <Grid item xs={6} sm={4} md={3} className="grid">
        <Card onClick={this.props.handleClick} className="card">
          <CardContent className="namedet">
            #{this.props.id} {this.props.name}
          </CardContent>

          <div className="detparent">
            <div className="flex-container">
              <h3 className="heading">HP:</h3>
              <LinearProgress
                variant="determinate"
                color="secondary"
                value={Number(this.state.details.hp)}
                className="progressBar"
              />
            </div>
            <div className="flex-container">
              <h3 className="heading">Attack:</h3>
              <LinearProgress
                variant="determinate"
                color="secondary"
                value={Number(this.state.details.attack)}
                className="progressBar"
              />
            </div>
            <div className="flex-container">
              <h3 className="heading">Defense:</h3>
              <LinearProgress
                variant="determinate"
                color="secondary"
                value={Number(this.state.details.defense)}
                className="progressBar"
              />
            </div>
            <div className="flex-container">
              <h3 className="heading">Special-Attack:</h3>
              <LinearProgress
                variant="determinate"
                color="secondary"
                value={Number(this.state.details.specialattack)}
                className="progressBar"
              />
            </div>
            <div className="flex-container">
              <h3 className="heading">Special-Defense:</h3>
              <LinearProgress
                variant="determinate"
                color="secondary"
                value={Number(this.state.details.specialdefense)}
                className="progressBar"
              />
            </div>
            <div className="flex-container">
              <h3 className="heading">Speed:</h3>
              <LinearProgress
                variant="determinate"
                color="secondary"
                value={Number(this.state.details.speed)}
                className="progressBar"
              />
            </div>
          </div>
        </Card>
      </Grid>
    );
  }
}

export default GetPokemonDetails;
