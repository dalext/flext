import React from 'react';
import HeaderHorizontal from './HeaderHorizontal'
import ContentWrapper from './ContentWrapper'
import Offsidebar from './Offsidebar'
import Footer from './Footer'
import { Row, Col } from 'react-bootstrap';
import ReactCSSTransitionGroup from "react-addons-css-transition-group";
class Base extends React.Component {

    componentWillMount() {
        $('body').addClass('layout-h');
    }

    render() {

        // Animations supported
        //      'rag-fadeIn'
        //      'rag-fadeInUp'
        //      'rag-fadeInDown'
        //      'rag-fadeInRight'
        //      'rag-fadeInLeft'
        //      'rag-fadeInUpBig'
        //      'rag-fadeInDownBig'
        //      'rag-fadeInRightBig'
        //      'rag-fadeInLeftBig'
        //      'rag-zoomBackDown'
        const animationName = 'rag-fadeIn'

        return (
            <div className="wrapper">
                <HeaderHorizontal />
                <ReactCSSTransitionGroup
                  component="homepage"
                  transitionName={animationName}
                  transitionEnterTimeout={500}
                  transitionLeaveTimeout={500}
                >
                  {React.cloneElement(this.props.children, {
                    key: Math.random()
                  })}
                </ReactCSSTransitionGroup>                
                <Footer />
            </div>
        );
    }

}

export default Base;
