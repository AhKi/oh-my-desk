import * as settingActions from 'actions/setting';
import language from '../language';

describe('test language reducer', () => {
  const initialState = 'English';

  it('should test initialState', () => {
    expect(language(undefined, {})).toBe(initialState);
  });

  it('should handle setLanguageEnglish', () => {
    expect(language(undefined, settingActions.setLanguageEnglish())).toBe('English');
  });

  it('should handle setLanguageKorean', () => {
    expect(language(undefined, settingActions.setLanguageKorean())).toBe('Korean');
  });
});
