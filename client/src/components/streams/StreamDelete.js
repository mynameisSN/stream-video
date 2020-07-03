import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import Modal from '../Modal';
import history from '../../history';
import {fetchStream, deleteStream} from '../../actions';

class StreamDelete extends React.Component {
  componentDidMount () {
    this.props.fetchStream (this.props.match.params.id);
  }
  renderActions () {
    // const id = this.props.match.params.id;
    // es2015 destructure above coe
    const {id} = this.props.match.params;
    return (
      // <React.Fragment> USE when we don't want to use extra <div>. on the browser it will not show up any div and also resolve the jsx error to wrap block level code inside DIV
      // shorthand of <React.Fragment> is <> </>

      (
        <React.Fragment>
          {/* <div> */}
          <button onClick={()=> this.props.deleteStream(id)} className="ui button negative">Delete</button>
          {/* <button className="ui button">Cancel</button> */}
          <Link to="/" className="ui button">Cancel</Link>
          {/* </div> */}
        </React.Fragment>
      )
    );
  }

  renderContent () {
    if (!this.props.stream) {
      return 'Are you sure you want to delete this stream?';
    }
    return `Are you sure you want to delete the stream with title: ${this.props.stream.title}`;
  }
  render () {
    // if(!this.props.stream){
    //   return <div>Loading...</div>
    // }
    return (
      <Modal
        title="Delete Stream"
        content={this.renderContent ()}
        actions={this.renderActions ()}
        onDismiss={() => history.push ('/')}
      />
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {stream: state.streams[ownProps.match.params.id]};
};

export default connect (mapStateToProps, {fetchStream, deleteStream}) (StreamDelete);
