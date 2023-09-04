export default function changeVisibleAddressesBtns(addresses: HTMLDivElement[], isDisabled: boolean): void {
  addresses.forEach((item: HTMLDivElement) => {
    for (const itemChild of item.children) {
      if (itemChild.className === 'address__actions') {
        for (const btn of itemChild.children) {
          (btn as HTMLButtonElement).disabled = isDisabled;
        }
      }
    }
  });
}
