import { createAction } from 'redux-actions';
import * as selectors from 'store/widget/selectors';
import updateWidget from 'utils/updateWidget';
import * as TYPES from '../actionTypes';

export const widgetListInfoStore = createAction(TYPES.WIDGET_LIST_INFO_STORE);
export const widgetListSelect = createAction(TYPES.WIDGET_LIST_SELECT);
export const widgetInfoUpdate = createAction(TYPES.WIDGET_INFO_UPDATE,
	(id, update) => ({ id, update }),
);

export const widgetInfoUpdateWithIPC = (id, update) => (dispatch, getState) => {
	const byId = selectors.byIdSelector(getState());
	const target = byId.get(id).toObject();
	const nextData = Object.assign({}, target, update);

	dispatch(widgetInfoUpdate(id, update));
	updateWidget('web', nextData);
};