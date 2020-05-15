import React from 'react';
import { useSelector } from 'react-redux';
import { getRes, getLoading, getError } from '../../selectors/selectors';
import Results from '../../components/Results/Results';
import styles from './ResultsContainer.css';


const ResultsContainer = () => {

  const res = useSelector(getRes);
  const loading = useSelector(getLoading);
  const error = useSelector(getError);

  const resultsObj = res.map((item, index) => <Results key={index} item={item}/>);

  return (
    <>
      <div className={styles.resultsContainer}>
        <h3>Results</h3>
        <hr />
        { loading ? (
          <p>Loading...</p> 
        ) : (
          <>{resultsObj}</>
        )}
        { error && <p className={styles.error}>{error}</p> }
      </div>
    </>
  );
};

export default ResultsContainer;
