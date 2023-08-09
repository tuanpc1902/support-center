import PropTypes from 'prop-types';
import './GlobalStyles.scss';
import {Component} from "react";

function GlobalStyles(children: Component ) {
    return children;
}

GlobalStyles.propTypes = {
    children: PropTypes.node.isRequired,
};

export default GlobalStyles;
