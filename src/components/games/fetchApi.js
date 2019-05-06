
import * as dataAPI from './dataApi';
import { SAMPLE_DATA } from "./medalTableNoc";

let MEDAL_DATA = SAMPLE_DATA["NOCMedals"]["Medals"];
const DEFAULT_ENTROPY_FOR_NETWORK_INTERRUPTIONS = 9;


function setMedalData(data){
    MEDAL_DATA = data;
}

/**
 * return immutable reference
 */
function getMedalData(){
    return Object.assign({}, MEDAL_DATA);
}

/**
 * compose function
 */
function compose(fns) {
    return (data)=> {
        if(fns.length == 1){
            return fns[0](data)
        }

        return fns.slice(1).reduce((acc, fn)=>{
            return fn(acc);
        }, fns[0](data));
    }
}

/**
 * sum the number of medals
 */
function sumMedals (medals) {
    const update = Object.keys(medals).reduce((acc, medalType)=>{
        const keyToAdd = ["n_Gold", "n_Silver", "n_Bronze"].indexOf(medalType) > -1;

        if(keyToAdd && medals[medalType] != null) {
            const total = acc["n_Total"] || 0;
            acc["n_Total"] = total + parseInt(medals[medalType]);
        }

        return acc;
    }, Object.assign({}, medals));

    return update;
}

/**
 * update the current medals with the new fetched batch
 */
function getMedalAggregator (dataSource) {
    return (newBatch)=> {
        const currentMedalData = dataSource();
        const update = Object.keys(currentMedalData).reduce((acc, medalType) => {
            acc[medalType] = currentMedalData[medalType] + newBatch[medalType];

            return acc;
        }, {});

        return update;
    }
}

/**
 *
 * aggregate medals in a context of a datasource
 */
const appendMedals = getMedalAggregator(getMedalData);

/**
 * Parameter entropy 11 collects medals always and entropy 0 throws error
 * In between probability varies depending on entropy value
 */
function fetchData (entropy = DEFAULT_ENTROPY_FOR_NETWORK_INTERRUPTIONS) {
    return new Promise((resolve, reject)=> {

        const collectSignal = dataAPI.getRandomSignal(entropy);

        if(collectSignal === 1) {
            const collectedMedals = dataAPI.collectMedals(),
                updatedMedalData = compose([appendMedals, sumMedals])(collectedMedals);

            setMedalData(updatedMedalData);
            resolve({medals: updatedMedalData});
        } else {
            reject("api error");
        }
    });
}

export { fetchData, sumMedals, getMedalAggregator };
