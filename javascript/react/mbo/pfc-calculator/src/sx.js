const sx = {
  app: {
    width: 1,
    minHeight: '100vh',
    p: 8,
    color: 'text.primary',
    fontSize: '20px',
    boxSizing: 'border-box',
  },
  contents: {
    minHeight: 'calc(100vh - 80px)',
    borderRadius: 5,
    p: 8,
    boxSizing: 'border-box',
  },
  button: {
    minWidth: 200,
    height: 45,
    borderRadius: 8,
    color: 'text.reverse',
    fontWeight: 'bold',
    boxShadow: 0,
    transition: '0.3s'
  },
  tooltip: {
    backgroundColor: '#AA2121',
    color: '#fff',
    fontSize: 14,
    paddingX: 6,
    py: 2,
    fontFamily: "'Hind', sans-serif",
    fontWeight: 'bold',
    transform: 'rotetate(-15deg)'
  },
  valueBox: {
    bgcolor: 'background.opacity',
    px: 5,
    pt: 1,
    fontFamily: "'Hind', sans-serif",
    fontSize: 35,
    borderRadius: 2,
    minWidth: 50,
    display: 'inline',
  },
}
export default sx
