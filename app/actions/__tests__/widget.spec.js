import * as actions from 'actions/widget';
import * as CATEGORY from 'actions/constant/actionCategory';
import * as TYPES from 'actions/constant/actionTypes';

describe('test widget actions', () => {
  const mockId = 'mock-id';
  const mockInfo = {
    name: 'mock-name',
    url: 'mock-url',
    isOpen: false,
  };

  it('should handle widgetAllocateIdTarget', () => {
    const mockAction = {
      type: TYPES.WIDGET_ALLOCATE_ID_TARGET,
      payload: {
        id: mockId,
      },
      meta: {
        category: CATEGORY.TARGET,
        target: [mockId],
        self: false,
      },
    };

    expect(actions.widgetAllocateIdTarget(mockId))
      .toEqual(mockAction);
  });

  it('should handle widgetClose', () => {
    const mockAction = {
      type: TYPES.WIDGET_CLOSE,
      payload: {
        id: mockId,
      },
      meta: {
        category: CATEGORY.BROADCAST,
      },
    };

    expect(actions.widgetClose(mockId))
      .toEqual(mockAction);
  });

  it('should handle widgetClosed', () => {
    const mockAction = {
      type: TYPES.WIDGET_CLOSED,
      payload: {
        id: mockId,
      },
      meta: {
        category: CATEGORY.BROADCAST,
      },
    };

    expect(actions.widgetClosed(mockId))
      .toEqual(mockAction);
  });

  it('should handle widgetDelete', () => {
    const mockAction = {
      type: TYPES.WIDGET_DELETE,
      payload: {
        id: mockId,
      },
      meta: {
        category: CATEGORY.BROADCAST,
      },
    };

    expect(actions.widgetDelete(mockId))
      .toEqual(mockAction);
  });

  it('should handle widgetFocus', () => {
    const mockAction = {
      type: TYPES.WIDGET_FOCUS,
      payload: {
        id: mockId,
      },
      meta: {
        category: CATEGORY.BROADCAST,
      },
    };

    expect(actions.widgetFocus(mockId))
      .toEqual(mockAction);
  });

  it('should handle widgetMake', () => {
    const mockAction = {
      type: TYPES.WIDGET_MAKE,
      payload: {
        id: mockId,
        info: mockInfo,
      },
      meta: {
        category: CATEGORY.BROADCAST,
      },
    };

    expect(actions.widgetMake(mockId, mockInfo))
      .toEqual(mockAction);
  });


  it('should handle widgetOpen', () => {
    const mockAction = {
      type: TYPES.WIDGET_OPEN,
      payload: {
        id: mockId,
        isFocus: false,
      },
      meta: {
        category: CATEGORY.BROADCAST,
      },
    };

    expect(actions.widgetOpen(mockId, false))
      .toEqual(mockAction);
  });

  it('should handle widgetUpdateInfo', () => {
    const mockAction = {
      type: TYPES.WIDGET_UPDATE_INFO,
      payload: {
        id: mockId,
        info: mockInfo,
      },
      meta: {
        category: CATEGORY.BROADCAST,
      },
    };

    expect(actions.widgetUpdateInfo(mockId, mockInfo))
      .toEqual(mockAction);
  });

  it('should handle widgetCloseWhole', () => {
    const mockAction = {
      type: TYPES.WIDGET_CLOSE_WHOLE,
      meta: {
        category: CATEGORY.SELF,
      },
    };

    expect(actions.widgetCloseWhole())
      .toEqual(mockAction);
  });
});
