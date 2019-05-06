import { useReducer, useEffect } from 'react';
import { fetchData } from './fetchApi';
import { gamesReducer } from './reducers';

/**
 * mock a websocket
 */
function getSocket(source, frequency) {
    return (handle) => {
        const timerId = setInterval(() => {
            handle(source);
        }, frequency);

        return timerId;
    };
}

/**
 * separate the dispatch logic
 */
function fetchHandler(dispatch) {
    return (fetch) => {
        fetch().then((data) => {
            dispatch({ type: "update", payload: data});
        }).catch(() => {
            dispatch({ type: "error", payload: {online: false}});
        });
    };
}

/**
 * extract the job of fetching data
 */
function fetchLiveResultsHook (frequency = 3000) {
    const [ state, dispatch ] = useReducer(gamesReducer, {medals: {}});

    useEffect(() => {
        const handleFn = fetchHandler(dispatch),
            withInterval = getSocket(fetchData, frequency),
            timerId = withInterval(handleFn);
        return () => {
            clearInterval(timerId);};
    }, [state]);

    return state;
}

export { fetchLiveResultsHook };