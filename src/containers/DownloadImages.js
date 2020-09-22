import React, { Component } from "react";
import PhotoContextProvider from "./context/PhotoContext";
import { HashRouter, Route, Switch } from "react-router-dom";
import Header from "./components/Header";
import Item from "./components/Item";
import Search from "./components/Search";
import NotFound from "./components/NotFound";
import Images from "./Images"


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
                                path="/"
                                render={() => <Item searchTerm="null" />}
                            />

                            <Route
                                path="/search/:searchInput" //TODO: Change me
                                render={props => (
                                    <Search searchTerm={props.match.params.searchInput} />
                                )}
                            />
                            <Route
                                path="/image/:imgId"
                                render={props => (
                                    <Images imgId={props.imgId} />
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