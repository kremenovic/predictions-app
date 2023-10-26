import { loadState, saveState } from "./localStorage";

const localStorageMiddleware = (store) => (next) => (action) => {
    let result = next(action);
    saveState(store.getState());
    return result;
};

export default localStorageMiddleware;
