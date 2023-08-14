import LoginPage from './components/pages/login-page/login-page';
import './styles/index.scss';

// TODO: Remove after the implementation of routing
const loginPage = new LoginPage().getElement();

document.body.append(loginPage);
