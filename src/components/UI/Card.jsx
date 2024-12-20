import React from "react";
import PropTypes from "prop-types";
import "./Card.css";

class Card extends React.Component {
  render() {
    return (
      <div className="card">
        <div>{this.props.quote}</div>
        <div>
          <em>{this.props.author}</em>
        </div>
      </div>
    );
  }
}
Card.propTypes = {
  quote: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
};

export default Card;
