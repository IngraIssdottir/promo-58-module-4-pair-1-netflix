// login

const getMoviesFromApi = (params) => {
  const searchParams = new URLSearchParams();

  if (params.genre !== "") {
    searchParams.append("genre", params.genre);
  }

  if (params.sort !== "") {
    searchParams.append("sort", params.sort.toUpperCase());
  }

  return fetch(`http://localhost:4000/api/movies?${searchParams.toString()}`)
    .then((response) => response.json())
    .then((data) => {
      return data.movies; 
    });
};

export default {
  getMoviesFromApi,
};
