import * as statusActions from 'actions/status';
import lang from '../../reducers/lang';

describe('test lang reducer', () => {
  const initialState = 'English';

  it('should test initialState', () => {
    expect(lang(undefined, {})).toBe(initialState);
  });

  it('should handle setLanguageEnglish', () => {
    expect(lang(undefined, statusActions.setLanguageEnglish())).toBe('English');
  });

  it('should handle setLanguageKorean', () => {
    expect(lang(undefined, statusActions.setLanguageKorean())).toBe('Korean');
  });
});
