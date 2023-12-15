const Copyright = () => {
  const date = new Date().getFullYear();

  return (
    <p className="text-white text-sm">
      Copyright &copy; {date} by TheTernHub. All Rights Reserved
    </p>
  );
};

export default Copyright;
