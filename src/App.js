import "./styles.css";
import React, { Component } from "react";
import pokemon from "./pokemon.png";
import pokeball from "./pokeball.png";
import {
  Grid,
  Card,
  CardContent,
  CardMedia,
  AppBar,
  Toolbar
} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import GetPokemonDetails from "./GetPokemonDetails";
import { cloneDeep, isUndefined } from "lodash";

const GetPokemonCard = (props) => {
  const sprite = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${props.id}.png`;
  return (
    <Grid item xs={6} sm={4} md={3} className="grid">
      <Card onClick={props.handleClick} className="card">
        <CardContent className="name">
          #{props.id} {props.name}
        </CardContent>
        <CardMedia className="img" image={sprite}></CardMedia>
      </Card>
    </Grid>
  );
};

class App extends Component {
  constructor() {
    super();

    this.state = {
      pokemon: [],
      filter: "",
      pokedetails: {}
    };
  }

  componentDidMount() {
    fetch("https://pokeapi.co/api/v2/pokemon?limit=200")
      .then((Response) => Response.json())
      .then((data) => {
        this.setState({ pokemon: data.results });
      });
  }

  searchfnc = (event) => {
    this.setState({ filter: event.target.value });
  };

  handleClick = (index) => {
    let newPokeDetails = cloneDeep(this.state.pokedetails);

    newPokeDetails[index] = isUndefined(this.state.pokedetails[index])
      ? true
      : !this.state.pokedetails[index];
    this.setState({
      pokedetails: newPokeDetails
    });
  };

  render() {
    return (
      <div>
        <AppBar position="static" className="navbar">
          <Toolbar>
            <img src={pokemon} className="pokeimg" alt="" />
            <SearchIcon className="searchicon" />
            <input
              type="text"
              className="searchbox"
              placeholder="Search your favourite Pokemon here..."
              onChange={this.searchfnc}
            ></input>
            <img src={pokeball} className="pokeballimg" alt="" />
          </Toolbar>
        </AppBar>

        <Grid className="grid" container spacing={3}>
          {this.state.pokemon.map((i, index) => {
            if (i.name.includes(this.state.filter)) {
              if (this.state.pokedetails[index] !== true) {
                return (
                  <GetPokemonCard
                    key={index}
                    id={index + 1}
                    name={i.name}
                    handleClick={() => this.handleClick(index)}
                  />
                );
              } else {
                return (
                  <GetPokemonDetails
                    key={index}
                    id={index + 1}
                    name={i.name}
                    handleClick={() => this.handleClick(index)}
                  />
                );
              }
            }
          })}
        </Grid>
      </div>
    );
  }
}

export default App;
