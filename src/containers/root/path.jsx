import React, { Component } from 'react';
import propTypes from 'prop-types';
import { Route } from 'react-router-dom';
import Footer from '../../components/footer';
import Header from '../../components/header';

export default class Path extends Component {
    render() {
            return (
                <Route {...this.props} >
                    <div className="mainPath">
                        <Header/>
                        <div className="content">
                            {this.props.children}
                        </div>
                        <Footer />
                    </div>
                </Route>
            );
    }
}

Path.propTypes = {
    path: propTypes.string.isRequired,
}