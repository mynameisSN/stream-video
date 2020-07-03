import React from 'react';
import {Field, reduxForm} from 'redux-form';

class StreamForm extends React.Component {
  renderError({error, touched}) {
    if (touched && error) {
      return (
        <div className="ui error message">
          <div className="header">{error}</div>
        </div>
      );
    }
  }
  //   renderInput (formProps) {
  renderInput = ({input, label, meta}) => {
    // console.log (formProps);
    // console.log (meta);// show error msg here

    const className = `field ${meta.error && meta.touched ? 'error' : ''}`;

    return (
      <div className={className}>
        <label>{label}</label>
        {/* <input
          onChange={formProps.input.onChange}
          value={formProps.input.value}
        />
      shorthand of above input is
      <input {...formProps.input} />
      now destucture the above input */}

        <input {...input} autoComplete="off" />
        {this.renderError (meta)}
        {/* <div>{meta.error}</div> */}
      </div>
    );
  };

  onSubmit = formValues => {
    console.log (formValues);
    this.props.onSubmit (formValues);
  };
  render () {
    return (
      <form
        onSubmit={this.props.handleSubmit (this.onSubmit)}
        className="ui form error"
      >
        <Field name="title" component={this.renderInput} label="Enter title" />
        <Field
          name="description"
          component={this.renderInput}
          label="Enter description"
        />
        <button className="ui button primary">Submit</button>
      </form>
    );
  }
}

const validate = formValues => {
  const errors = {};
  if (!formValues.title) {
    errors.title = 'you must enter a title';
  }
  if (!formValues.description) {
    errors.description = 'you must enter a description';
  }
  return errors;
};

export default reduxForm ({
  // receive single object
  form: 'streamForm',
  validate: validate,
}) (StreamForm);
