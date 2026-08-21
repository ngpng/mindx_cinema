const API_KEY = "51ce916d19fbeb3d8481ea109a7109be";
const IMG_URL = "https://image.tmdb.org/t/p/w500";

const searchInput = document.querySelector(".searchMovies");
const listContainer = document.getElementById("movie-list-container");

fetchMovies(`https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`);

searchInput.addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    const keyword = searchInput.value.trim();
    if (keyword !== "") {
      fetchMovies(
        `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(keyword)}`,
      );
    }
  }
});

function fetchMovies(url) {
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      listContainer.innerHTML = "";
      const movies = data.results;

      if (!movies || movies.length === 0) {
        listContainer.innerHTML = `<p style="color: #888; padding-left: 25px;">No movies found.</p>`;
        return;
      }

      for (let i = 0; i < movies.length; i++) {
        const movie = movies[i];
        if (movie.poster_path) {
          listContainer.innerHTML += `
            <div class="movie-card" onclick="goToInfo(${movie.id})">
                <img src="${IMG_URL + movie.poster_path}" alt="${movie.title}">
                <p style="margin-top: 8px; font-size: 14px; color: #fff;">${movie.title}</p>
            </div>
          `;
        }
      }
    })
    .catch((err) => console.log("error", err));
}

function goToInfo(id) {
  window.location.href = `info_page.html?id=${id}`;
}
