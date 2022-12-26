import React from "react";

class InputFild extends React.Component {
    render() {
      return (
        <input
          style={{ margin: 10 }}
          type="text"
          name={this.props.name}
          maxLength={this.props.length}
          onChange={this.props.handleChange}
        ></input>
      );
    }
  }

  export default InputFild;