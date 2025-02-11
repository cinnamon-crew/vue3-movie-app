import axios from "axios";
import _uniqBy from "lodash/uniqBy";

const _defaultMessage = "Search for the movie title!";

export default {
  namespaced: true,
  state: () => ({
    movies: [],
    message: _defaultMessage,
    loading: false,
    theMovie: {},
  }),
  getters: {},
  mutations: {
    updateState(state, payload) {
      //['movies','message','loading']
      Object.keys(payload).forEach((key) => {
        // state.movies = payload.movies  //state['movies'] = payload['movies'] 와 동일 하므로
        // state.message = payload.message
        state[key] = payload[key];
      });
    },
    resetMovies(state) {
      state.movies = [];
      state.message = _defaultMessage;
      state.loading = false;
    },
  },
  actions: {
    async searchMovies({ state, commit }, payload) {
      if (state.loading) {
        return;
      }

      commit("updateState", {
        message: "",
        loading: true,
      });
      try {
        const res = await _fetchMovie({
          ...payload,
          page: 1,
        });
        const { Search, totalResults } = res.data;
        commit("updateState", {
          movies: _uniqBy(Search, "imdbID"),
          // message: "Hello world!",
          // loading: true,
        });
        console.log(totalResults); //268=>27
        console.log(typeof totalResults); //string

        const total = parseInt(totalResults, 10);
        const pageLength = Math.ceil(total / 10);

        //추가 요청!
        if (pageLength > 1) {
          for (let page = 2; page <= pageLength; page++) {
            if (page > payload.number / 10) {
              break;
            }
            const res = await _fetchMovie({
              ...payload,
              page,
            });
            const { Search } = res.data;
            commit("updateState", {
              movies: [...state.movies, ..._uniqBy(Search, "imdbID")],
            });
          }
        }
      } catch ({ message }) {
        commit("updateState", {
          movies: [], //상태 초기화
          message,
        });
      } finally {
        commit("updateState", {
          loading: false,
        });
      }
    },
    async searchMovieWithId({ state, commit }, payload) {
      if (state.loading) return;
      commit("updateState", {
        theMovie: {},
        loading: true,
      });

      // const { id } = payload;
      try {
        // const res = await _fetchMovie({
        // id,
        // });
        const res = await _fetchMovie(payload);
        console.log("res=", res);
        commit("updateState", {
          theMovie: res.data,
        });
      } catch (error) {
        commit("updateState", {
          theMovie: {},
        });
      } finally {
        commit("updateState", {
          loading: false,
        });
      }
    },
  },
};

async function _fetchMovie(payload) {
  return await axios.post("./netlify/functions/movie", payload);
}
