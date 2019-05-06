import { SAMPLE_DATA } from './medalTableNoc';

/**
 * generate random Int
 */
function generateRandomInt(max){
    return Math.floor(Math.random()*max);
}

/**
 * @desc use random signal of 1 or 0 to create entropy when generate data
 * parameter limit is used for increase or decrease probability; ex. limit 10 = 90% chances
 */
function getRandomSignal (limit) {
    const randomized = generateRandomInt(10);
    return randomized < limit ? 1 : 0;
}

/**
 *  aggregate the generated medals
 */
function collectMedals () {
    const medalsFrecuancies = [
        {value: 2, type: "n_Gold"},
        {value: 4, type: "n_Silver"},
        {value: 6, type: "n_Bronze"}
    ];

    return medalsFrecuancies.reduce((acc, obj) => {
        const generated = getRandomSignal(obj.value),
            medal = {[obj.type]: generated};

        return Object.assign({}, acc, medal);
    }, {});
}

export {generateRandomInt, collectMedals, getRandomSignal};
