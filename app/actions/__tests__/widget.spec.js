import uuid from 'uuid';
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

  it('should handle widgetEditRequest', () => {
    const mockAction = {
      type: TYPES.WIDGET_EDIT_REQUEST,
      payload: {
        id: mockId,
      },
      meta: {
        category: CATEGORY.BROADCAST,
      },
    };

    expect(actions.widgetEditRequest(mockId))
      .toEqual(mockAction);
  });

  it('should handle widgetEditCancel', () => {
    const mockAction = {
      type: TYPES.WIDGET_EDIT_CANCEL,
      payload: {
        id: mockId,
      },
      meta: {
        category: CATEGORY.BROADCAST,
      },
    };

    expect(actions.widgetEditCancel(mockId))
      .toEqual(mockAction);
  });

  it('should handle widgetMakeRequest', () => {
    uuid.v4 = jest.fn(() => mockId);
    const mockAction = {
      type: TYPES.WIDGET_MAKE_REQUEST,
      payload: {
        id: mockId,
        info: mockInfo,
      },
      meta: {
        category: CATEGORY.BROADCAST,
      },
    };

    expect(actions.widgetMakeRequest(mockInfo))
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

  it('should handle widgetUrlCheckRequest', () => {
    const mockAction = {
      type: TYPES.WIDGET_URL_CHECK_REQUEST,
      meta: {
        category: CATEGORY.BROADCAST,
      },
    };

    expect(actions.widgetUrlCheckRequest())
      .toEqual(mockAction);
  });

  it('should handle widgetUrlCheckSuccess', () => {
    const mockAction = {
      type: TYPES.WIDGET_URL_CHECK_SUCCESS,
      meta: {
        category: CATEGORY.BROADCAST,
      },
    };

    expect(actions.widgetUrlCheckSuccess())
      .toEqual(mockAction);
  });

  it('should handle widgetUrlValidCheck', () => {
    const mockAction = {
      type: TYPES.WIDGET_URL_VALID_CHECK,
      payload: {
        id: 'mock-id',
        name: 'mock-name',
        url: 'mock-url',
      },
      meta: {
        category: CATEGORY.TARGET,
        self: false,
        containMain: true,
      },
    };

    expect(actions.widgetUrlValidCheck('mock-id', 'mock-name', 'mock-url'))
      .toEqual(mockAction);
  });
});
