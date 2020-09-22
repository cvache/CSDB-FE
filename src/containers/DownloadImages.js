import React, { Component } from "react";
import PhotoContextProvider from "./context/PhotoContext";
import { HashRouter, Route, Switch, Redirect } from "react-router-dom";
import Header from "./components/Header";
import Item from "./components/Item";
import Search from "./components/Search";
import NotFound from "./components/NotFound";



class DownloadImages extends Component {
    handleSubmit = (e, history, searchInput) => {
        e.preventDefault();
        e.currentTarget.reset();
        let url = `/search/${searchInput}`;
        history.push(url);
    };

    render() {
        return (
            <PhotoContextProvider>
                <HashRouter basename="/csmidb">
                    <div className="container">
                        <Route
                            render={props => (
                                <Header
                                    handleSubmit={this.handleSubmit}
                                    history={props.history}
                                /> 
                            )}
                        />
                        <Switch>
                            <Route
                                exact
                                path="/" //TODO: this will need to be changed for it to work I think
                                render={() => <Redirect to="/all" />}
                            />

                            <Route
                                path="/search/:searchInput" //TODO: Change me
                                render={props => (
                                    <Search searchTerm={props.match.params.searchInput} />
                                )}
                            />
                            <Route component={NotFound} />
                        </Switch>
                    </div>
                </HashRouter>
            </PhotoContextProvider>
        )
    }
}

export default DownloadImages;