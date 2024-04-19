const searchForm = document.querySelector("form");
const inputBox = document.querySelector(".inputBox");
let container = document.querySelector(".container");

const fetchDATA = async (movie) => {
  let moviekey = "c938d8d2";
  let API = `http://www.omdbapi.com/?apikey=${moviekey}&t=${movie}`;
  try {
    let res = await fetch(API);
    if (!res.ok) {
      throw new Error("Network response was not ok");
    }
    let data = await res.json();
    console.log(data);

    if (data.Response === "False") {
      throw new Error("Movie not available");
    }

    MovieDATA(data);

    localStorage.setItem("movieData", JSON.stringify(data));
  } catch (error) {
    console.error("Error fetching data:", error);
    container.innerHTML = "<p>Sorry, the movie is not available.</p>";
  }
};

searchForm.addEventListener("submit", function (e) {
  e.preventDefault();

  const movieName = inputBox.value.trim();

  if (movieName === "") {
    alert("Please enter a movie name to search.");
    return;
  }

  fetchDATA(movieName);
});

function MovieDATA(data) {
  let card = document.createElement("div");
  card.classList.add("movie-card");

  let Poster = document.createElement("img");
  Poster.setAttribute("src", data.Poster);

  let Title = document.createElement("h1");
  Title.innerText = "Title: " + data.Title;

  let Country = document.createElement("p");
  Country.innerText = "Country: " + data.Country;

  let Actors = document.createElement("p");
  Actors.innerText = "Actors: " + data.Actors;

  let Awards = document.createElement("h3");
  Awards.innerText = "Awards: " + data.Awards;

  let Director = document.createElement("h2");
  Director.innerText = "Director: " + data.Director;

  let Plot = document.createElement("h4");
  Plot.innerText = "Plot: " + data.Plot;

  let Genre = document.createElement("h2");
  Genre.innerText = "Genre: " + data.Genre;

  card.append(Poster, Title, Actors, Country, Awards, Director, Plot, Genre);

  container.innerHTML = "";
  container.appendChild(card);
}
