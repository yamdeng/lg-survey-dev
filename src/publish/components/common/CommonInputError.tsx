function CommonInputError(props) {
  const { errorMessage, error } = props;
  return (
    <>
      <span className="error-text" style={{ display: error ? '' : 'none' }}>
        {errorMessage}
      </span>
    </>
  );
}

export default CommonInputError;
