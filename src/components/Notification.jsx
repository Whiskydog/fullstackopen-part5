const Notification = ({ spec }) => {
  if (!spec) return null;

  const { type, content } = spec;
  const styles = {
    fontSize: '1.5rem',
    border: '4px solid',
    borderRadius: 6,
    padding: '0.5rem',
    marginBottom: '0.5rem',
    color: type === 'success' ? '#1a854c' : '#971012',
    backgroundColor: type === 'success' ? '#d3f2e2' : '#f7d1d1',
    borderColor: 'currentColor',
  };

  return <div style={styles}>{content}</div>;
};

export default Notification;
