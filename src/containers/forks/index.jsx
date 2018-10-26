import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import Pagination from "react-js-pagination";
import { GetForks } from '../../action/forks';
import { AddFavorite } from '../../action/favorites';
import Loading from '../../components/loading';

const URL = 'github.com';
class Forks extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activePage: 1, //currentPage
            itemsCount: 10, //const pageCount = 3;
            limit: 10, //const limit = 2;
            offset: 0,
            params: '',
            asideLinks: [],
        };
        this.handlerChange = this.handlerChange.bind(this);
        this.handlerClick = this.handlerClick.bind(this);
        this.handlePageChange = this.handlePageChange.bind(this);
        this.handleStared = this.handleStared.bind(this);
    }
    handlerChange(e) {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }
    handlerClick(params) {
        this.props.GetForks(params);
        this.state.asideLinks.push(`${URL}/${params}`);
        this.setState({ params: '' });
    }
    handlePageChange(page) {
        const { params } = this.state;
        this.setState({ activePage: page });
        this.props.GetForks(params);
    }
    async handleStared(e, favoriteUrl) {
        if ((document.getElementById(favoriteUrl).src).match("unstar")) {
            if (await window.modal.confirm('Are you sure?', 'Do you want to set this fork to your favorites?')) {
                document.getElementById(favoriteUrl).src = "public/images/star.png";
                this.props.AddFavorite(favoriteUrl);
            }
        }
    }
    render() {
        const { forks, loading, stars, favorites } = this.props;
        const { asideLinks, itemsCount } = this.state;
        let ifPagination = forks.length > itemsCount;
        let isStarred = false;
        if (loading) {
            return (
                <Loading />
            )
        } else {
            return (
                <div className="forks">
                    <div className="forksContent">
                        <div className="searchField">
                            <input type="text" name="params" value={this.state.params} onChange={this.handlerChange} autoFocus />
                            <button onClick={() => this.handlerClick(this.state.params)}>Search</button>
                        </div>
                        <div className="tables">
                            <table className="first">
                                <thead>
                                    <tr>
                                        <th>Repo Name</th>
                                        <th>Owner</th>
                                        <th>Link to</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        forks && forks.map((item) => {
                                            return (
                                                <tr key={item.id}>
                                                    <td>{item.full_name}</td>
                                                    <td>{item.owner.login}</td>
                                                    <td><Link target="_blank" to={`//${URL}/${item.full_name}`}>{item.html_url}</Link></td>
                                                </tr>)
                                        })

                                    }
                                </tbody>
                            </table>
                            <table className="second">
                                <thead>
                                    <tr>
                                        <th>Stars</th>
                                        <th>Favorites</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        stars && stars.map((item) => {
                                            return (
                                                <tr key={item[1]}>
                                                    <td>{item[0].length}</td>
                                                    <td>
                                                        {
                                                            favorites.map(favorite => {
                                                                (favorite[0] == item[1]) ?
                                                                    isStarred = true
                                                                    : ''
                                                            })
                                                        }
                                                        {
                                                            isStarred ? (
                                                                <img src="public/images/star.png" key={`${item[1]}${item[1]}`} />
                                                            )
                                                                : <img src="public/images/unstar.png" key={item[1]} id={item[1]} onClick={(e) => { this.handleStared(e, item[1]) }} />
                                                        }
                                                        {isStarred = false}
                                                    </td>
                                                </tr>
                                            )
                                        })
                                    }
                                </tbody>
                            </table>
                        </div>
                        {
                            ifPagination && <Pagination
                                activePage={this.state.activePage}
                                itemsCountPerPage={10}
                                totalItemsCount={this.props.forks.length}
                                pageRangeDisplayed={5}
                                onChange={this.handlePageChange}
                                prevPageText='<'
                                nextPageText='>'
                            />
                        }
                    </div>
                    <div className='aside'>
                        {
                            asideLinks.map((link, indx) => {
                                return <Link target="_blank" to={`//${link}`} key={indx} >{`https://${link}`}</Link>
                            })
                        }
                    </div>
                </div >
            );
        }
    }
}

const mapStateToProps = store => {
    return {
        loading: store.forks.loading,
        forks: store.forks.forksData,
        stars: store.forks.starsData,
        favorites: store.favorites.data,
    };
}
const mapDispatchToProps = dispatch => {
    return {
        GetForks: (params) => dispatch(GetForks(params)),
        AddFavorite: (favoriteUrl) => dispatch(AddFavorite(favoriteUrl))
    };
};
Forks.defaultTypes = {
    stars: [],
}
Forks.propTypes = {
    GetForks: propTypes.func.isRequired,
    AddFavorite: propTypes.func.isRequired,
    forks: propTypes.arrayOf(propTypes.any).isRequired,
    stars: propTypes.arrayOf(propTypes.any),
    favorites: propTypes.arrayOf(propTypes.any).isRequired,
    loading: propTypes.bool.isRequired,
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Forks));