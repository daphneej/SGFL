const SimpleForm = ({ handler, children }) => {
  return <form onSubmit={handler}>{children}</form>;
};

export default SimpleForm;
