import React, { useEffect } from 'react';
import LoadingSpinner from '../../loading-spinner/loading-spinner.component';
import CircularProgress from '@material-ui/core/CircularProgress';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import { Button, Box } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { fetchPets, fetchNextPets } from '../actions/view-actions';
import { connect } from 'react-redux'
import { LOADING_STATES } from '../../globals/globals';
import { DataGrid,
  GridToolbarContainer,
  GridToolbarColumnsButton,
  GridToolbarFilterButton,
  GridToolbarExport,
  GridToolbarDensitySelector 
} from '@mui/x-data-grid';

import './pets-view.component.scss';

const columns = [
  {field: 'name', headerName: "Pet's name", id: 1, width: 200},
  {field: 'tag', headerName: 'Tag', id: 2, width: 200}
];

const PetTable = (props) => {

  const [pageSize, setPageSize] = React.useState(5);
  const [loadCount, setLoadCount] = React.useState(1);
  const [open, setOpen] = React.useState(false);

  useEffect(() => {
    if (loadCount === 1) {
      props.fetchPets();
    } else {
      props.fetchNextPets((props.pets.length / 100) + 1);
    }
  }, [loadCount]);

  const CustomToolbar = () => {
    return (
      <GridToolbarContainer className="util-display-block">
        <GridToolbarColumnsButton />
        <GridToolbarFilterButton />
        <GridToolbarDensitySelector />
        <GridToolbarExport />
        <Button className='util-float-right' 
                component={Link} 
                to='/create-pet' 
                variant='contained'
                color='primary'
                aria-label='Navigate to create new pets page'>
          Create new Pet
        </Button>
        <Button 
          className='util-float-right util-m-r-8'
          onClick={() => {setLoadCount(loadCount+1)}} variant='contained' color='primary' 
          disabled={!props.hasNext|| props.loadingPetsState === LOADING_STATES.loading}
          aria-label='Load more pets into the table'>
          { props.loadingPetsState !== LOADING_STATES.loading ? 
            'Load more pets' : 
            <CircularProgress className='circular-progress__in-processing-button' color='inherit'/> }
        </Button>
      </GridToolbarContainer>
    );
  }

  return (
    <div className="pet-app__page-wrapper">
      <div className="pet-app__page-spacer">
        <h1> Pets </h1>  
        <div className="alert__failure-background">
          { 
            props.loadingPetsState === LOADING_STATES.failed && !open && loadCount > 1 &&
            <Alert onClose={() => {setOpen(true)}} variant='outlined' severity='error' className="util-m-b-8">
              <AlertTitle>Failed to load more pets, please try again.</AlertTitle>
            </Alert>
          }
        </div>
        <div className='display-table__wrapper'>
          { 
            (props.loadingPetsState === LOADING_STATES.loading || props.loadingPetsState === LOADING_STATES.failed) && loadCount === 1 &&
            <LoadingSpinner loading={props.loadingPetsState === LOADING_STATES.loading} 
                          failed={props.loadingPetsState === LOADING_STATES.failed} 
                          loadingMessage='Loading pets'
                          failedMessage='Failed to load pets. Please refresh the page to try again.'>
            </LoadingSpinner>
          }
        
          {
            (props.loadingPetsState === LOADING_STATES.completed || loadCount > 1) &&
            <Box className="util-full-width util-background-white">
              <DataGrid
                className="util-full-width"
                autoHeight={true}
                rows={props.pets}
                columns={columns}
                onPageChange={(...arr) => {console.log(arr)}}
                pageSize={pageSize}
                rowsPerPageOptions={[5, 10, 25]}
                onPageSizeChange={(val) => {setPageSize(val)}}
                disableSelectionOnClick={true}
                components={{
                  Toolbar: CustomToolbar,
                }}>
              </DataGrid>
            </Box>
          }
        </div>
      </div>
    </div>
  );
  
}
const mapStateToProps = state => {
  const {
    pets,
    loadingPetsState,
    hasNext
  } = state.petHandling;

  return {
    pets,
    loadingPetsState,
    hasNext
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchPets: () => {
      return dispatch(fetchPets());
    },
    fetchNextPets: (page) => {
      return dispatch(fetchNextPets(page))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PetTable)
