import { Card } from './Card';
import { Link } from 'react-router-dom';
import Routes from '../constants/routes';

const Footer = () => {
  return (
    <Card className='mt-4 rounded-none'>
        <footer>
            <div className="mx-auto flex justify-between items-center">
            <Link to={Routes.HOME}>
      <img src="/assets/logo.png" alt="Parksync" width={150} className='me-4 max-sm:mb-2'/>
      </Link>
                
                <p className="text-gray-500">Parksync &copy; {new Date().getFullYear()}</p>
            </div>
        </footer>
    </Card>
  );
};

export default Footer;