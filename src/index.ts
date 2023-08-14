import SignupPage from './components/pages/signup-page/signup-page';
import './styles/index.scss';

const signupPage = new SignupPage().getElement();
document.body.append(signupPage);
