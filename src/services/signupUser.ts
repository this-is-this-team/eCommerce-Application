import { ISignupData } from '../types/interfaces';
import apiRoot from './apiRoot';

export default async function signupUser(body: ISignupData, formReset: () => void) {
  try {
    const customer = await apiRoot
      .me()
      .signup()
      .post({
        body,
      })
      .execute();

    formReset();

    console.log(customer);
  } catch (error) {
    console.error(error);
    // TODO: handle the errors https://github.com/orgs/this-is-this-team/projects/3/views/2?pane=issue&itemId=34789670 (use https://apvarun.github.io/toastify-js/)
  }
}
