import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Switch, withRouter } from 'react-router-dom';
import propTypes from 'prop-types';
import Path from './path';
import Forks from '../../containers/forks';
// import Loading from '../../components/loading';

class Root extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <Switch>
                <Path
                    path='/'
                >
                    <Forks />
                </Path>
            </Switch>
        )
    }
}

const mapStateToProps = store => {
    return {
    }
}
const mapDispatchToProps = dispatch => {
    return {
    };
};

Root.propTypes = {
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Root));