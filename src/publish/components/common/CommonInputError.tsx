function CommonInputError(props) {
  const { errorMessage } = props;
  return (
    <>
      <span className="error-text" style={{ display: errorMessage ? '' : 'none' }}>
        {errorMessage}
      </span>
    </>
  );
}

export default CommonInputError;
