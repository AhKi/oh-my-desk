import { ipcRenderer } from 'electron';
import * as CATEGORY from 'actions/constant/actionCategory';
import categorizeActionInRenderer from '../categorizeActionInRenderer';

describe('test categorizeActionInRenderer', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  const next = jest.fn();

  it('when action is not FSA', () => {
    const mockAction = () => {};

    categorizeActionInRenderer()(next)(mockAction);

    expect(next).toHaveBeenCalledTimes(1);
    expect(next).toHaveBeenCalledWith(mockAction);
  });

  it('when action don\t contain category', () => {
    const mockAction = {
      type: 'SOME_TYPE',
    };

    categorizeActionInRenderer()(next)(mockAction);

    expect(next).toHaveBeenCalledTimes(1);
    expect(next).toHaveBeenCalledWith(mockAction);
  });

  it('when action category is SELF', () => {
    const mockAction = {
      type: 'SOME_TYPE',
      meta: {
        category: CATEGORY.SELF,
      },
    };

    categorizeActionInRenderer()(next)(mockAction);

    expect(next).toHaveBeenCalledTimes(1);
    expect(next).toHaveBeenCalledWith(mockAction);
  });
  describe('test category is BROADCAST or TARGET', () => {
    it('when transmitted === true', () => {
      const mockAction = {
        type: 'SOME_TYPE',
        meta: {
          category: CATEGORY.BROADCAST,
          transmitted: true,
        },
      };

      categorizeActionInRenderer()(next)(mockAction);

      expect(next).toHaveBeenCalledTimes(1);
      expect(next).toHaveBeenCalledWith(mockAction);
    });

    it('when transmitted is undefined or false', () => {
      const mockAction = {
        type: 'SOME_TYPE',
        meta: {
          category: CATEGORY.BROADCAST,
        },
      };
      const transmitAction = {
        type: 'SOME_TYPE',
        meta: {
          category: CATEGORY.BROADCAST,
          transmitted: false,
        },
      };

      categorizeActionInRenderer()(next)(mockAction);

      expect(ipcRenderer.send).toHaveBeenCalledTimes(1);
      expect(ipcRenderer.send).toHaveBeenCalledWith(
        'redux-action',
        transmitAction,
      );
    });

    describe('test about meta.self', () => {
      it('when self is true', () => {
        const mockAction = {
          type: 'SOME_TYPE',
          meta: {
            category: CATEGORY.BROADCAST,
            self: true,
          },
        };

        categorizeActionInRenderer()(next)(mockAction);

        expect(next).toHaveBeenCalledTimes(1);
        expect(next).toHaveBeenCalledWith(mockAction);
      });

      it('when self is false', () => {
        const mockAction = {
          type: 'SOME_TYPE',
          meta: {
            category: CATEGORY.BROADCAST,
            self: false,
          },
        };

        categorizeActionInRenderer()(next)(mockAction);

        expect(next).toHaveBeenCalledTimes(0);
      });
    });

    it('should handle category is TARGET', () => {
      const mockAction = {
        type: 'SOME_TYPE',
        meta: {
          category: CATEGORY.TARGET,
          id: ['mockId'],
        },
      };
      const transmitAction = {
        type: 'SOME_TYPE',
        meta: {
          category: CATEGORY.TARGET,
          id: ['mockId'],
          transmitted: false,
        },
      };

      categorizeActionInRenderer()(next)(mockAction);

      expect(ipcRenderer.send).toHaveBeenCalledTimes(1);
      expect(ipcRenderer.send).toHaveBeenCalledWith(
        'redux-action',
        transmitAction,
      );
    });
  });
});
