import testManager from './testManager';
import windowManager from './windowManager';
import * as config from './config';

jest.setTimeout(30000);

describe('test search window', async () => {
  const app = config.createApp();
  const browser = windowManager(app);
  const test = testManager(app);

  beforeAll(async () => {
    config.resetConfigFile();
    await app.start();
  });
  afterAll(async () => {
    await app.stop();
    config.resetConfigFile();
  });

  beforeEach(async () => {
    await app.client.waitUntilWindowLoaded();
  });

  it('start initial app', async () => {
    await test.matchWindowCount(2);
    await test.matchWindowTitle('oh-my-desk widget');
  });

  it('open search window and focus', async () => {
    await browser.searchWindowOpen();
    await test.matchWindowCount(3);
    await app.client.windowByIndex(2);
    await test.matchWindowTitle('oh-my-desk search');
    await test.matchValue('.SearchInput__input', '');
  });

  it('assert default widget list', async () => {
    const container = await test.getElement('.SearchList');
    const list = container.querySelectorAll('.SearchItem');
    const expectText = ['google', 'translator', 'trello'];

    list.forEach((item, index) => {
      expect(item.querySelector('strong').textContent)
        .toBe(expectText[index]);
    });
  });

  it('type search input', async () => {
    await test.matchValue('.SearchInput__input', '');
    await app.client.keys('trans');
    await test.matchValue('.SearchInput__input', 'trans');
  });

  it('assert searched widget list', async () => {
    const container = await test.getElement('.SearchList');
    const list = container.querySelectorAll('.SearchItem');
    expect(list.length).toBe(1);
    expect(list[0].querySelector('strong').textContent)
      .toBe('translator');
  });

  it('open widget using enter key', async () => {
    await app.client.keys('Enter');
    expect(await app.browserWindow.isVisible()).toBe(false);
    await app.client.pause(1000);
    await app.client.windowByIndex(4);
    await test.matchWindowCount(5);
    await test.matchWindowTitle('oh-my-desk widget');
    await test.matchText('.TitleBar__title', 'translator');
  });

  it('close widget using toggle btn', async () => {
    await browser.searchWindowOpen();
    await app.client.windowByIndex(2);
    await test.matchWindowTitle('oh-my-desk search');
    await test.matchValue('.SearchInput__input', '');
    expect(await app.browserWindow.isVisible()).toBe(true);

    let btn = await test.getElement('.ToggleButton__wrapper', 0);
    expect(btn.classList.contains('ToggleButton__wrapper-active'))
      .toBe(true);

    await app.client.click('.SearchItem__toggle-btn');
    await test.matchWindowCount(3);

    btn = await test.getElement('.ToggleButton__wrapper', 0);
    expect(btn.classList.contains('ToggleButton__wrapper-active'))
      .toBe(false);
  });

  it('open widget using toggle btn', async () => {
    await app.client.click('.SearchItem__toggle-btn');
    await app.client.pause(1000);
    await test.matchWindowCount(5);

    const btn = await test.getElement('.ToggleButton__wrapper', 0);
    expect(btn.classList.contains('ToggleButton__wrapper-active'))
      .toBe(true);
  });
});
