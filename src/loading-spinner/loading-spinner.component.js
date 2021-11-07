import React from 'react'
import PropTypes from 'prop-types'
import CircularProgress from '@mui/material/CircularProgress';
import './loading-spinner.component.scss';

const LoadingSpinner = ({ loading, failed, loadingMessage, failedMessage }) => (
  <div>
    {
      loading && 
      <div className="loading-spinner">
        <CircularProgress className="loading-spinner__loader"/>
        <div className="messages">
          <span className="loading-spinner__message"> {loadingMessage} </span>
        </div>
      </div>
    }
    {
      failed && (
        <div className="loading-spinner">
          <div className="loading-spinner__loader failed"></div>
          <div className="messages">
            <div>
              <span className="loading-spinner__message"> { failedMessage } </span>
              <div className="icon-attribute">Icons made by <a href="https://www.flaticon.com/authors/vectors-market" title="Vectors Market">Vectors Market</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>
            </div>
          </div>
        </div>
      )
    }
  </div>
);

LoadingSpinner.propTypes = {
  loading: PropTypes.bool.isRequired,
  failed: PropTypes.bool.isRequired,
  loadingMessage: PropTypes.string,
  failedMessage: PropTypes.string,
}

export default LoadingSpinner
