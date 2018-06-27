import React from 'react';
import './WidgetStore.scss';

class WidgetStore extends React.Component {
  render() {
    return (
      <div className="WidgetStore">
        <div className="WidgetStore__content">
          <h4>
            {'"'}
            Store
            {'"'}
            function is
            <br />
            Comming soon.
          </h4>
        </div>
      </div>
    );
  }
}

export default WidgetStore;
