const testManager = app => ({
  matchWindowCount: async (expectNumber) => {
    const count = await app.client.getWindowCount();

    expect(count).toBe(expectNumber);
  },
  matchWindowTitle: async (expectTitle) => {
    const windowTitle = await app.client.getTitle();

    expect(windowTitle).toBe(expectTitle);
  },
  matchValue: async (selector, expectValue) => {
    const value = await app.client.getValue(selector);

    expect(value).toBe(expectValue);
  },
  matchText: async (selector, expectText) => {
    const value = await app.client.getText(selector);

    expect(value).toBe(expectText);
  },
  getElement: async (selector, index) => {
    const container = document.createElement('div');
    let html = await app.client.getHTML(selector);

    if (typeof html !== 'string') {
      html = html[index];
    }

    container.innerHTML = html;

    const selected = container.querySelector(selector);

    return selected;
  },
});

export default testManager;
