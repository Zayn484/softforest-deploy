import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions/index';

const ListItem = ({ value, onClick }) => (
    <li onClick={onClick}>{value}</li>
);

const List = ({ items, onItemClick }) => (
    <ul>
        {
            items.map((item, i) => <ListItem key={i} value={item} onClick={onItemClick} />)
        }
    </ul>
);

class DynamicFieldSet extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            inputValue: '',
            fruites: []
        };
    }

    onClick = (type) => {
        const { inputValue, fruites } = this.state;
        if (inputValue) {
            const nextState = [...fruites, inputValue];
            this.setState({ fruites: nextState, inputValue: '' });
        }
        switch (type) {
            case 'Module':
                this.props.addModule(inputValue)
                break;
            case 'Technology':
                this.props.addTechnology(inputValue)
                break;
            case 'Requirement':
                this.props.addRequirement(inputValue)
                break;
            default:
                break;
        }
    }

    onChange = (e) => this.setState({ inputValue: e.target.value });

    handleItemClick = (e) => { console.log(e.target.innerHTML) }

    render() {
        const { fruites, inputValue } = this.state;
        return (
            // <div>
            //     <input type="text" value={inputValue} onChange={this.onChange} />
            //     <button onClick={() => this.onClick(this.props.btnLabel)}>Add</button>
            //     <List items={fruites} onItemClick={this.handleItemClick} />
            // </div>
            <>
                <div className="input-group input-group-md col-md-6  mb-1" >
                    <input type="text" value={inputValue} onChange={this.onChange} className="form-control" placeholder="Add..." aria-label="Add..." aria-describedby="add-button" />
                    <div className="input-group-append">
                        <button onClick={() => this.onClick(this.props.btnLabel)} className="Btn-primary btn" type="button" id="add-button" ><i className="fas fa-plus"></i></button>
                    </div> <br />

                </div>
                <List items={fruites} onItemClick={this.handleItemClick} />
            </>
        );
    }
}













// let id = 0;

// class DynamicFieldSet extends React.Component {

//     state = {
//         control: {
//             value: ''
//         }
//     }

//     remove = (k) => {
//         const { form } = this.props;
//         // can use data-binding to get
//         const keys = form.getFieldValue('keys');
//         // We need at least one passenger
//         if (keys.length === 1) {
//             return;
//         }
//         // can use data-binding to set
//         form.setFieldsValue({
//             keys: keys.filter(key => key !== k)
//         });
//         // this.props.removeModule(k);
//         if (this.props.modules) {
//             this.props.removeModule(k);
//         }
//         // else if (this.props.technologies) {
//         //     this.props.removeTechnology(k);
//         // }
//         // else if (this.props.requirements) {
//         //     this.props.removeRequirement(k);
//         // }
//     }

//     add = () => {
//         const { form } = this.props;
//         // can use data-binding to get
//         const keys = form.getFieldValue('keys');
//         const nextKeys = keys.concat(id++);
//         // can use data-binding to set
//         // important! notify form to detect changes
//         form.setFieldsValue({
//             keys: nextKeys
//         });


//     }

//     onChangeHandler = (event, index) => {
//         console.log(this.props.form.getFieldValue('names'))
//         if (this.props.modules) {

//             const updatedControl = {
//                 ...this.state.control,
//                 value: event.target.value
//             }
//             this.setState({ control: updatedControl });
//         }
//     }

//     sendValueHandler = (index) => {
//         if (this.props.modules) {
//             this.props.addModule(this.state.control.value, index);
//         }
//         // if (this.props.technologies) {
//         //     this.props.addTechnology(this.state.control.value, index);
//         // }
//         // else if (this.props.requirements) {
//         //     this.props.addRequirement(this.state.control.value, index);
//         // }
//     }

//     handleSubmit = (e) => {
//         e.preventDefault();
//         this.props.form.validateFields((err, values) => {
//             if (!err) {
//                 console.log('Received values of form: ', values);
//             }
//         });
//     }

//     render() {
//         const { getFieldDecorator, getFieldValue } = this.props.form;
//         const formItemLayout = {
//             labelCol: {
//                 xs: { span: 24 },
//                 sm: { span: 4 },
//             },
//             wrapperCol: {
//                 xs: { span: 24 },
//                 sm: { span: 20 },
//             },
//         };
//         const formItemLayoutWithOutLabel = {
//             wrapperCol: {
//                 xs: { span: 24, offset: 0 },
//                 sm: { span: 20, offset: 4 },
//             },
//         };
//         getFieldDecorator('keys', { initialValue: [] });
//         const keys = getFieldValue('keys');
//         const formItems = keys.map((k, index) => (
//             <Form.Item
//                 {...(index === 0 ? formItemLayout : formItemLayoutWithOutLabel)}
//                 label={index === 0 ? '          ' : ''}
//                 required={false}
//                 key={k}
//             >
//                 {getFieldDecorator(`names[${k}]`, {
//                     validateTrigger: ['onChange', 'onBlur'],
//                     rules: [{
//                         required: true,
//                         whitespace: true,
//                         message: "Please enter atleast one field.",
//                     }],
//                 })(
//                     <Input placeholder="Name"
//                         style={{ width: '60%', marginRight: 8 }}
//                         onChange={(event) => this.onChangeHandler(event, index)}
//                         onBlur={() => this.sendValueHandler(index)} />
//                 )}
//                 {keys.length > 1 ? (
//                     <Icon
//                         className="dynamic-delete-button"
//                         type="minus-circle-o"
//                         disabled={keys.length === 1}
//                         onClick={() => this.remove(k)}
//                     />
//                 ) : null}
//             </Form.Item>
//         ));
//         return (
//             <Form onSubmit={this.handleSubmit}>
//                 {formItems}
//                 <Form.Item {...formItemLayoutWithOutLabel}>
//                     <Button type="dashed" onClick={this.add} style={{ width: '60%' }}>
//                         <Icon type="plus" /> Add <span className='ml-2'>{this.props.btnLabel}</span>
//                     </Button>
//                 </Form.Item>
//             </Form>
//         );
//     }
// }

// const WrappedDynamicFieldSet = Form.create({ name: 'dynamic_form_item' })(DynamicFieldSet);

const mapStateToProps = state => {
    return {
        // categories: state.dynamicFormItemReducer.modules,
        // technologies: state.dynamicFormItemReducer.technologies,
        // requirements: state.dynamicFormItemReducer.requirements
    };
}

const mapDispatchToProps = dispatch => {
    return {
        addModule: (value, index) => dispatch(actions.addModule(value, index)),
        removeModule: (index) => dispatch(actions.removeModule(index)),
        addTechnology: (value, index) => dispatch(actions.addTechnology(value, index)),
        removeTechnology: (index) => dispatch(actions.removeTechnology(index)),
        addRequirement: (value, index) => dispatch(actions.addRequirement(value, index)),
        removeRequirement: (index) => dispatch(actions.removeRequirement(index)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DynamicFieldSet);