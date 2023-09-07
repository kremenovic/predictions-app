// localStorage.js
export const loadState = () => {
    try {
        const serializedState = localStorage.getItem("state");
        if (serializedState === null) {
            return undefined;
        }

        const state = JSON.parse(serializedState);

        const today = new Date().toISOString().split("T")[0];
        if (state.game && state.game.selectedDate.split("T")[0] !== today) {
            state.game.selectedDate = new Date().toISOString();
        }

        return state;
    } catch (err) {
        return undefined;
    }
};

export const saveState = (state) => {
    try {
        const serializedState = JSON.stringify(state);
        localStorage.setItem("state", serializedState);
    } catch {
        // Ignore write errors
    }
};
