import React, { useReducer, useContext, useState, useEffect } from 'react';
import {fetchLiveResultsHook} from './hooks';
import {frequencyReducer} from './reducers';

import gamesStyles from './games.scss';

const FrequencyContext = React.createContext({});

/**
 * Games component
 */
function Games() {

    const [frequency, dispatch] = useReducer(frequencyReducer, 1500);
    const results = fetchLiveResultsHook(frequency);

    const { online, medals } = results;


    return <FrequencyContext.Provider value={{frequency, dispatch}}>
        <React.Fragment>
            <FrequencyUpdater />
            <Notification online={online}/>
            <div id="games">

                <h3>Live Olympic Games medals status</h3>

                <ul className="games-medals">
                    {Object.keys(medals).map((v) => {
                        const props = {key: v, medal: v, val: medals[v]};
                        return <Item {...props} />;
                    })}
                </ul>
            </div>
        </React.Fragment>
    </FrequencyContext.Provider>;
}

/**
 * FrequencyUpdater component
 */
const FrequencyUpdater = React.memo(function FrequencyUpdater() {
    const {frequency, dispatch} = useContext(FrequencyContext);

    const updateFrequency = (e) => {
        const value = parseInt(e.target.value);
        dispatch({payload: value});
    };

    return <div className="frequency-updater">
        <input type="range" id="start" name="frequency"
            onChange={updateFrequency}
            min="300" max="3000" value={frequency} step="200"/>
        <label htmlFor="frequency">Updates frequency = 1 request / {frequency / 1000}s</label>
    </div>;
});

/**
 * Item component
 * @TODO propsTypes
 */
const Item = React.memo(function Item(props) {

    let colLabel = "";
    if(props.medal === "n_Total"){
        colLabel = "Total";
    }

    return <li>
        <div className={`medal-type ${props.medal}`}> {colLabel} </div>
        <div>{props.val}</div>
    </li>;
});

/**
 * Notification component
 * @TODO propsTypes
 */
const Notification = React.memo(function Notification(props) {

    const [ init, setInit ] = useState(0);

    const { online } = props;

    /**
     * @TODO extract hook or change css [prevent network status notification at page loading]
     */
    let notStillInit= "hide";
    if(init < 2 && online === false){
        setInit(init+1);
    }
    if(init == 2) {
        notStillInit = "";
    }

    const showNotification = online ? "notification-back-online notification-animation-on" : "notification-offline notification-animation-off",
        message = online ? "Back online" : "Offline, network interuptions";

    return <div className={`notification ${showNotification} ${notStillInit}`}>
        {message}
    </div>;
});

export default Games;
export {Item, FrequencyUpdater, Notification };