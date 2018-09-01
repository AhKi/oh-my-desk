import * as statusActions from 'actions/status';
import language from '../language';

describe('test language reducer', () => {
  const initialState = 'English';

  it('should test initialState', () => {
    expect(language(undefined, {})).toBe(initialState);
  });

  it('should handle setLanguageEnglish', () => {
    expect(language(undefined, statusActions.setLanguageEnglish())).toBe('English');
  });

  it('should handle setLanguageKorean', () => {
    expect(language(undefined, statusActions.setLanguageKorean())).toBe('Korean');
  });
});
