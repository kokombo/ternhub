const ErrorComponent = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-2">
      <p>Oops! An error occured, try again!</p>

      <button
        type="reset"
        onClick={() => {
          window.location.reload();
        }}
        className="blue_button"
      >
        Try Again
      </button>
    </div>
  );
};

export default ErrorComponent;
