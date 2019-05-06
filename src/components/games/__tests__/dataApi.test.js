
import { collectMedals } from '../dataApi';
import { fetchData, sumMedals, getMedalAggregator } from '../fetchApi';

describe("test data api", ()=> {

    it("collect medals", ()=>{
        const medals = collectMedals(),
            expected = expect.objectContaining({
                n_Gold: expect.any(Number),
                n_Silver: expect.any(Number),
                n_Bronze: expect.any(Number)
            });

        expect(medals).toEqual(expected);
    });

});

describe("test utils functions", ()=> {

    let INIT, BATCH;

    beforeEach(()=> {
        INIT = {"n_Gold": 0,
            "n_Silver": 0,
            "n_Bronze": 0 };

        BATCH = {"n_Gold": 1,
            "n_Silver": 2,
            "n_Bronze": 3 };
    });

    it("sum medals with new batch", () => {
        const expected = 6;
        const actual = sumMedals(BATCH);

        expect(actual["n_Total"]).toEqual(expected);

    });

    it("sum medals with empty batch", () => {
        const expected = 0;
        const actual = sumMedals(INIT);

        expect(actual["n_Total"]).toEqual(expected);
    });

    it("appendMedals medals with new batch", () => {
        const expected = Object.assign({}, BATCH);
        const appendMedals = getMedalAggregator(()=>{return INIT}),
            actual = appendMedals(BATCH);

        expect(actual).toEqual(expected);
    });

    it("appendMedals medals with empty batch", () => {
        const expected = Object.assign({}, INIT);
        const appendMedals = getMedalAggregator(()=>{return INIT}),
            actual = appendMedals(INIT);

        expect(actual).toEqual(expected);
    });

});

describe("test async fetch api", ()=> {

    it("fetch async data", () => {
        const minEntropy = 11;

        return fetchData(minEntropy).then((response) => {
            expect(response).toBeTruthy();
        });
    });

    it("fetch async data catch error", () => {
        const maxEntropy = 0;

        expect.assertions(1);
        return fetchData(maxEntropy).catch(e => expect(e).toMatch('api error'));
    });

});
