import React from 'react';
import {shallow} from 'enzyme';
import Games, { Item, FrequencyUpdater, Notification } from 'components/games';


describe("test components", ()=> {

    it("load Games component", ()=>{
        const gamesWrapper = shallow(<Games />);

        expect(gamesWrapper).toBeDefined();
    });

    it("load Item component", ()=>{
        const itemWrapper = shallow(<Item />);

        expect(itemWrapper).toBeDefined();
    });

    it("load FrequencyUpdater component", ()=>{
        const frequencyWrapper = shallow(<FrequencyUpdater />);

        expect(frequencyWrapper).toBeDefined();
    });

    it("load Notification component", ()=>{
        const notificationWrapper = shallow(<Notification />);

        expect(notificationWrapper).toBeDefined();
    });

});

describe("test Notification component", ()=> {

    it("online Notification component", ()=>{
        const props = {online: true}
        const notificationWrapper = shallow(<Notification {...props}/>);
        const clsNotification = notificationWrapper.find(".notification-back-online");

        expect(clsNotification).toHaveLength(1);
    });

    it("offline Notification component", ()=>{
        const props = {online: false}
        const notificationWrapper = shallow(<Notification {...props}/>);
        const clsNotification = notificationWrapper.find(".notification-back-online");

        expect(clsNotification).toHaveLength(0);
    });

});

// @TODO describe("test Games component", ()=> {});
// @TODO describe("test Item component", ()=> {});
// @TODO describe("test FrequencyUpdater component", ()=> {});
