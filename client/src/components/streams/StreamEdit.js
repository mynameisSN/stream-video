import _ from 'lodash';
import React from 'react';
import {connect} from 'react-redux';
import {fetchStream, editStream} from '../../actions';
import StreamForm from './StreamForm';


class StreamEdit extends React.Component {
  //console.log("edit ", this.props) this default props comes from brower router, like history, location, match, staticContext

  componentDidMount () {
    this.props.fetchStream (this.props.match.params.id);
  }

  onSubmit = formValues => {
    // console.log ('edit formvalues ', formValues);
    this.props.editStream(this.props.match.params.id, formValues);
  };
  render () {
    console.log (this.props);
    if (!this.props.stream) {
      return <div>Loading...</div>;
    }
    return (
      <div>
        <h3>Edit a Stream</h3>
        <StreamForm
          // initialValues={{title: 'edit me', description: 'change'}}

          // initialValues={this.props.stream}

          // initialValues={{
          //   title: this.props.stream.title,
          //   description: this.props.stream.description,
          // }}
          initialValues={_.pick(this.props.stream, 'title', 'description')}
          onSubmit={this.onSubmit}
        />
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  // console.log(ownProps)// this will the same props which we will get inside render method like history, location, match, staticContext
  // state will give the props which is defined inside reducer. like we setting here stream props and dispatch
  return {stream: state.streams[ownProps.match.params.id]};
};

export default connect (mapStateToProps, {fetchStream, editStream}) (
  StreamEdit
);
