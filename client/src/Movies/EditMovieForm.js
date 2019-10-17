import React, { useState, useEffect } from "react";
import axios from "axios";

const initialMovie = {
  id: "",
  title: "",
  director: "",
  metascore: 0,
  stars: []
};

const EditMovieForm = props => {
  console.log(props);
  const [edited, setEdited] = useState(initialMovie);

  useEffect(() => {
    const movieToEdit = props.movie.find(
      movie => movie.id === props.match.params.id
    );

    if (movieToEdit) setEdited(movieToEdit);
  }, [props.movie, props.match.params.id]);

  const changeHandler = e => {
      e.persist();
      //changes metascore string entry to int?
      //parseInt(<variable to make int>, <base> )
      let value = e.target.value;
      if (e.target.name === "metascore") {
          value = parseInt(value, 10);
      }

      setEdited({
          ...edited,
          [e.target.name]: value
      });
  };

  const handleSubmit = e => {
      e.preventDefault();
      axios
      .put(`http//localhost:5555/update-movie/${edited.id}`, edited)
      .then(res => {
          props.addToSavedList(res.data);
          props.history.push(`/movies/${edited.id}`)
      })
      .catch(err => console.log(err.response));
      };

  return(
      <div>
          <h2>Update Movie Details</h2>
          <form>
              <input
              type= 'text'
              name= 'title'
              onChange={changeHandler}
              placeholder="Title"
              value={movie.title}
              />
          </form>
      </div>
  );
};


    // title: "The Godfather",
    // director: "Francis Ford Coppola",
    // metascore: 100,
    // stars: ["Marlon Brando", "Al Pacino", "Robert Duvall"]
export default EditMovieForm;
