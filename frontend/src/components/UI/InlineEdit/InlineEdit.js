import React from 'react';
import EditableLabel from 'react-inline-editing';

class InlineEdit extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return <div>
            <EditableLabel text={this.props.text}
                labelClassName='myLabelClass'
                inputClassName='myInputClass'
                inputWidth='200px'
                inputHeight='25px'
                inputMaxLength='50'
                labelFontWeight='bold'
                inputFontWeight='bold'
                onFocus={this._handleFocus}
                onFocusOut={this._handleFocusOut}
            />
        </div>
    }
}

export default InlineEdit;