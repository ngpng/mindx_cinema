const API_KEY = "51ce916d19fbeb3d8481ea109a7109be";
const IMG_URL = "https://image.tmdb.org/t/p/w500";

const params = new URLSearchParams(window.location.search);
const movieId = params.get("id");

if (movieId) {
  fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${API_KEY}`)
    .then((res) => res.json())
    .then((movie) => {
      document.getElementById("movie-pic").src = IMG_URL + movie.poster_path;
      document.getElementById("movie-title").innerText = movie.title;
      document.getElementById("movie-desc").innerText =
        movie.overview || "No description available.";
      document.getElementById("movie-date").innerText =
        `Release Date: ${movie.release_date}`;

      // Hiển thị các thể loại (tags)
      const tagsContainer = document.getElementById("movie-tags");
      tagsContainer.innerHTML = "";
      for (let i = 0; i < movie.genres.length; i++) {
        tagsContainer.innerHTML += `<span>${movie.genres[i].name}</span>`;
      }
    })
    .catch((err) => console.log("Lỗi tải phim:", err));
} else {
  document.getElementById("movie-title").innerText = "Movie not found!";
}
