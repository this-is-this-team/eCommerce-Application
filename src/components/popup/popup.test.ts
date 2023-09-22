import PopupPassword from './popup-password';

const popupHTML = `<div class="popup open popup-password"><div class="popup__content"><div class="popup__close"></div><h2 class="popup__title">Create new password</h2><form class="form__form"><div class="form--password"><div class="form-field form-field-password"><div class="form-field__check"></div><label class="form-field__label" for="currentPassword">Current Password</label><input class="form-field__input" type="password" name="currentPassword" id="currentPassword" placeholder="Current Password"></div><div class="form-field form-field-password"><div class="form-field__check"></div><label class="form-field__label" for="newPassword">New password</label><input class="form-field__input" type="password" name="newPassword" id="newPassword" placeholder="New password"></div></div><div class="form__action"><button class="button" type="submit">Save password</button><button class="button button--cancel" type="button">Cancel</button></div></form></div></div>`;

describe('Popup', () => {
  const popup: HTMLElement = new PopupPassword().getElement();

  it('should render correct html-element', () => {
    expect(popup.outerHTML).toBe(popupHTML);
  });

  it('should active popup', () => {
    document.body.append(popup);
    const isPopup = document.querySelector('.popup') as HTMLElement;
    expect(isPopup.classList.contains('open')).toBe(true);
  });

  it('should close popup', () => {
    document.body.append(popup);
    const closeBtn = document.querySelector('.popup__close') as HTMLElement;
    closeBtn.click();
    const isPopup = document.querySelector('.popup') as HTMLElement;
    expect(isPopup.classList.contains('open')).toBe(false);
  });
});
