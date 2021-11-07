
import React from 'react';
import * as yup from 'yup';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import CircularProgress from '@material-ui/core/CircularProgress';
import { useFormik } from 'formik';
import { createPet, clearNameAndTag } from '../actions/create-actions';
import { connect } from 'react-redux'
import { LOADING_STATES } from '../../globals/globals';
import './pets-create.component.scss';

const validationSchema = yup.object({
  name: yup
    .string()
    .required('Pet name is required'),
  tag: yup
    .string()
    .required('Tag is required')
});

const PetCreate = (props) => {
  const [open, setOpen] = React.useState(true);
  const [lastname, setlastname] = React.useState(true);
  const doCreatePet = props.createPet.bind(this);
  const formik = useFormik({
    initialValues: {
      name: props.name || '',
      tag: props.tag || ''
    },
    enableReinitialize: true,
    mapPropsToValues: props => ({ name: props.name, tag: props.tag }),
    validationSchema: validationSchema,
    validateOnMount: true,
    onSubmit: (values) => {
      setOpen(false);
      setlastname(values.name);
      doCreatePet(values);
    }
  });

  return (
    <div className="pet-app__page-wrapper">
      <div className="pet-app__page-spacer">
        <h1> Create Pet </h1>
        
        <div className="create-pet__form">
          { props.creationProcessState === LOADING_STATES.completed && !open &&
            (<Alert onClose={() => {setOpen(true)}} variant='outlined' severity='success' className="util-m-b-8">
              <AlertTitle> {lastname} was successfully created!</AlertTitle>
            </Alert>)
          }

          { props.creationProcessState === LOADING_STATES.failed && !open &&
            <Alert onClose={() => {setOpen(true)}} variant='outlined' severity='error' className="util-m-b-8 alert__failure-background">
              <AlertTitle>Failed to create {lastname}, please try again.</AlertTitle>
            </Alert>
          }

          <form onSubmit={formik.handleSubmit}>
            <TextField
              fullWidth
              id='name'
              name='name'
              label='Pet Name'
              className="util-m-b-8"
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              inputProps={{'aria-label': 'Pet name text field'}}
              error={formik.touched.name && Boolean(formik.errors.name)}
              helperText={formik.touched.name && formik.errors.name}
            />
            <TextField
              fullWidth
              id='tag'
              name='tag'
              label='Tag'
              className="util-m-b-8"
              value={formik.values.tag}
              onChange={formik.handleChange}
              inputProps={{'aria-label': 'Pet tag text field'}}
              onBlur={formik.handleBlur}
              error={formik.touched.tag && Boolean(formik.errors.tag)}
              helperText={formik.touched.tag && formik.errors.tag}
            />
            <div className="create-pet__button-wrapper">
              <Button color='primary' 
                      variant='contained' 
                      type='submit' 
                      aria-label='Submit pet creation button'
                      className='util-float-right util-m-t-8'
                      disabled={!formik.dirty || !formik.isValid || props.creationProcessState === LOADING_STATES.loading}>
                { props.creationProcessState !== LOADING_STATES.loading ? 
                  'Create' : 
                  <CircularProgress className='circular-progress__in-processing-button' color='inherit'/> }
              </Button>
              <Button color='default' 
                      variant='contained' 
                      onClick={() => { formik.resetForm(); props.clearNameAndTag(); }} 
                      aria-label='Clear all progress of Pet creation form button'
                      className='util-float-right util-m-r-8 util-m-t-8'>
                Clear
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = state => {
  const {
    name,
    tag,
    creationProcessState,
    error
  } = state.petCreation;

  return {
    name,
    tag,
    creationProcessState,
    error
  }
}

const mapDispatchToProps = dispatch => {
  return {
    createPet: (vals) => {
      return dispatch(createPet(vals));
    },
    clearNameAndTag: (vals) => {
      return dispatch(clearNameAndTag());
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PetCreate);
