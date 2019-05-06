import  React from 'react';

import Header from './header';
import mainStyle from '../../main.scss';
import Games from 'components/games';

/**
 * @description <Layout /> component.
 */
export default function Layout () {

    return (
            <div>
                <Header />
                <section>
                    <Games />
                    { /* empty */}
                </section>
                <footer></footer>
            </div>
    );
};
