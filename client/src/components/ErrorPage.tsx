import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';

function App() {
  const navigate = useNavigate() ;

  const handleClick = () => {
    navigate('/login')
  };

  return (
    <div>
        <div>Ooops! it seems that what you looked for is not here...</div>
        <Button variant="secondary" onClick={handleClick}>Home</Button>
    </div> 
   
  )

};

export default App; 