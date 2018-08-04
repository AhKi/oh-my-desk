import * as actions from '.';
import * as TYPES from '../actionTypes';
import * as CATEGORY from '../category';

describe('test action about widget', () => {
  const mockId = 'mock-id';
  const mockInfo = {
    name: 'mock-name',
    url: 'mock-url',
    isOpen: false,
  };
  const broadcastMeta = {
    category: CATEGORY.BROADCAST,
  };

  it('should handle allocateIdTargetWidget', () => {
    const mockAction = {
      type: TYPES.ALLOCATE_ID_TARGET_WIDGET,
      payload: {
        id: mockId,
      },
      meta: {
        category: CATEGORY.TARGET,
        target: [mockId],
        self: false,
      },
    };

    expect(actions.allocateIdTargetWidget(mockId))
      .toEqual(mockAction);
  });

  it('should handle closeTargetWidget', () => {
    const mockAction = {
      type: TYPES.CLOSE_TARGET_WIDGET,
      payload: {
        id: mockId,
      },
      meta: broadcastMeta,
    };

    expect(actions.closeTargetWidget(mockId))
      .toEqual(mockAction);
  });

  it('should handle closeTargetWidgetForced', () => {
    const mockAction = {
      type: TYPES.CLOSE_TARGET_WIDGET_FORCED,
      payload: {
        id: mockId,
      },
      meta: broadcastMeta,
    };

    expect(actions.closeTargetWidgetForced(mockId))
      .toEqual(mockAction);
  });

  it('should handle deleteTargetWidget', () => {
    const mockAction = {
      type: TYPES.DELETE_TARGET_WIDGET,
      payload: {
        id: mockId,
      },
      meta: broadcastMeta,
    };

    expect(actions.deleteTargetWidget(mockId))
      .toEqual(mockAction);
  });

  it('should handle focusWidget', () => {
    const mockAction = {
      type: TYPES.FOCUS_WIDGET,
      payload: {
        id: mockId,
      },
      meta: broadcastMeta,
    };

    expect(actions.focusWidget(mockId))
      .toEqual(mockAction);
  });

  it('should handle registerNewWidget', () => {
    const mockAction = {
      type: TYPES.REGISTER_NEW_WIDGET,
      payload: {
        id: mockId,
        info: mockInfo,
      },
      meta: broadcastMeta,
    };

    expect(actions.registerNewWidget(mockId, mockInfo))
      .toEqual(mockAction);
  });


  it('should handle showTargetWidget', () => {
    const mockAction = {
      type: TYPES.SHOW_TARGET_WIDGET,
      payload: {
        id: mockId,
        isFocus: false,
      },
      meta: broadcastMeta,
    };

    expect(actions.showTargetWidget(mockId, false))
      .toEqual(mockAction);
  });

  it('should handle updateTargetWidgetInfo', () => {
    const mockAction = {
      type: TYPES.UPDATE_TARGET_WIDGET_INFO,
      payload: {
        id: mockId,
        info: mockInfo,
      },
      meta: broadcastMeta,
    };

    expect(actions.updateTargetWidgetInfo(mockId, mockInfo))
      .toEqual(mockAction);
  });

  it('should handle setAllWidgetIsOpenFalse', () => {
    const mockAction = {
      type: TYPES.SET_ALL_WIDGET_ISOPEN_FALSE,
      meta: {
        category: CATEGORY.SELF,
      },
    };

    expect(actions.setAllWidgetIsOpenFalse())
      .toEqual(mockAction);
  });
});
