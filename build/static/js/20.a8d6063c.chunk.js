(window.webpackJsonp=window.webpackJsonp||[]).push([[20],{745:function(e,t,a){"use strict";a.r(t);var n=a(32),l=a(8),r=a(14),o=a(15),s=a(17),c=a(16),i=a(18),u=a(0),m=a.n(u),p=a(569),d=a.n(p),h=a(20),f=a(22),g=a(218),v=a(86),E=a(436),b=a(217),y=a(49),j=a(39),C=a(26),N=a(31),k=function(e){var t=e.value,a=e.onClick;return m.a.createElement("li",{onClick:a},t)},S=function(e){var t=e.items,a=e.onItemClick;return m.a.createElement("ul",null,t.map(function(e,t){return m.a.createElement(k,{key:t,value:e,onClick:a})}))},O=function(e){function t(e){var a;return Object(r.a)(this,t),(a=Object(s.a)(this,Object(c.a)(t).call(this,e))).onClick=function(e){var t=a.state,n=t.inputValue,l=t.fruites;if(n){var r=[].concat(Object(C.a)(l),[n]);a.setState({fruites:r,inputValue:""})}switch(e){case"Module":a.props.addModule(n);break;case"Technology":a.props.addTechnology(n);break;case"Requirement":a.props.addRequirement(n)}},a.onChange=function(e){return a.setState({inputValue:e.target.value})},a.handleItemClick=function(e){console.log(e.target.innerHTML)},a.state={inputValue:"",fruites:[]},a}return Object(i.a)(t,e),Object(o.a)(t,[{key:"render",value:function(){var e=this,t=this.state,a=t.fruites,n=t.inputValue;return m.a.createElement(m.a.Fragment,null,m.a.createElement("div",{className:"input-group input-group-md col-md-6  mb-1"},m.a.createElement("input",{type:"text",value:n,onChange:this.onChange,className:"form-control",placeholder:"Add...","aria-label":"Add...","aria-describedby":"add-button"}),m.a.createElement("div",{className:"input-group-append"},m.a.createElement("button",{onClick:function(){return e.onClick(e.props.btnLabel)},className:"Btn-primary btn",type:"button",id:"add-button"},m.a.createElement("i",{className:"fas fa-plus"})))," ",m.a.createElement("br",null)),m.a.createElement(S,{items:a,onItemClick:this.handleItemClick}))}}]),t}(m.a.Component),w=Object(f.b)(function(e){return{}},function(e){return{addModule:function(t,a){return e(N.b(t,a))},removeModule:function(t){return e(N.r(t))},addTechnology:function(t,a){return e(N.h(t,a))},removeTechnology:function(t){return e(N.t(t))},addRequirement:function(t,a){return e(N.e(t,a))},removeRequirement:function(t){return e(N.s(t))}}})(O),F=a(191),x=a(83),T=a(630),I=a.n(T),q=function(e){function t(e){var a;return Object(r.a)(this,t),(a=Object(s.a)(this,Object(c.a)(t).call(this,e))).setSnapshotProps=function(){a.props.addSnapshot(a.state.pictures)},a.onDrop=function(e,t){a.setState({pictures:e}),setTimeout(a.setSnapshotProps,1e3)},a.state={pictures:[]},a.onDrop=a.onDrop.bind(Object(x.a)(Object(x.a)(a))),a}return Object(i.a)(t,e),Object(o.a)(t,[{key:"render",value:function(){return m.a.createElement(I.a,{label:"Max file size: 2mb, accepted: jpg/png",withPreview:!0,withIcon:!0,buttonText:"Choose images",onChange:this.onDrop,imgExtension:[".jpg",".png"],maxFileSize:2242880})}}]),t}(m.a.Component),R=Object(f.b)(null,function(e){return{addSnapshot:function(t){return e(N.a(t))}}})(q),V=a(23),D=a(447),M=a(102),H=a(743),U=a(13),A=function(e){function t(){var e,a;Object(r.a)(this,t);for(var n=arguments.length,l=new Array(n),o=0;o<n;o++)l[o]=arguments[o];return(a=Object(s.a)(this,(e=Object(c.a)(t)).call.apply(e,[this].concat(l)))).state={tags:["Specific tags"],inputVisible:!1,inputValue:""},a.handleClose=function(e){var t=a.state.tags.filter(function(t){return t!==e});a.setState({tags:t})},a.showInput=function(){a.setState({inputVisible:!0},function(){return a.input.focus()})},a.handleInputChange=function(e){a.setState({inputValue:e.target.value})},a.handleInputConfirm=function(){var e=a.state,t=e.inputValue,n=e.tags;t&&-1===n.indexOf(t)&&(n=[].concat(Object(C.a)(n),[t])),a.setState({tags:n,inputVisible:!1,inputValue:""}),a.props.addTag(t)},a.saveInputRef=function(e){return a.input=e},a}return Object(i.a)(t,e),Object(o.a)(t,[{key:"render",value:function(){var e=this,t=this.state,a=t.tags,n=t.inputVisible,l=t.inputValue;return m.a.createElement("div",null,a.map(function(t,a){var n=t.length>20,l=m.a.createElement(D.a,{key:t,closable:0!==a,afterClose:function(){return e.handleClose(t)}},n?"".concat(t.slice(0,20),"..."):t);return n?m.a.createElement(M.a,{title:t,key:t},l):l}),n&&m.a.createElement(H.a,{ref:this.saveInputRef,type:"text",size:"small",style:{width:78},value:l,onChange:this.handleInputChange,onBlur:this.handleInputConfirm,onPressEnter:this.handleInputConfirm}),!n&&m.a.createElement(D.a,{onClick:this.showInput,style:{background:"#fff",borderStyle:"dashed"}},m.a.createElement(U.a,{type:"plus"})," New Tag"))}}]),t}(m.a.Component),L=Object(f.b)(null,function(e){return{addTag:function(t){return e(N.g(t))}}})(A),P=a(736),z=function(e){return m.a.createElement(P.a,{placement:e.placement,title:e.title,content:e.content,trigger:"click"},e.children)},B=a(54),W=a(131),G=a.n(W);g.a.config({top:100,duration:2,maxCount:3});var $=v.a.Option,J=function(e){function t(){var e,a;Object(r.a)(this,t);for(var o=arguments.length,i=new Array(o),u=0;u<o;u++)i[u]=arguments[u];return(a=Object(s.a)(this,(e=Object(c.a)(t)).call.apply(e,[this].concat(i)))).state={controls:{title:{elementType:"input",elementConfig:{type:"text",placeholder:"Cafe Management System"},value:""},price:{elementType:"input",elementConfig:{type:"text",placeholder:"100"},value:""},description:{elementType:"input",elementConfig:{type:"text",placeholder:"Description about your project"},value:""},link:{elementType:"input",elementConfig:{type:"text",placeholder:""},value:""},category:{value:""}},uploaded:!1,error:!1,loading:!1,visible:!1,percent:0,user:null,id:null,image:G.a,imageUrl:G.a,modules:[],technologies:[],requirements:[],tags:[],pricing:{serviceFee:0}},a.showModal=function(){for(var e=function(e){setTimeout(function(){100===e&&a.setState({percent:e}),a.setState({percent:e})},2e3)},t=1;t<=100;t++)e(t);a.setState({visible:!0})},a.validateForm=function(){return d.a.isHalfWidth(a.state.controls.title.value)?d.a.isHalfWidth(a.state.controls.description.value)?4!==a.props.snapshots.length?(g.a.error("4 snapshot images are required"),!1):d.a.isFloat(a.state.controls.price.value,{min:9.99,max:4999.99})?""==a.state.controls.link.value?(g.a.error("Please provide link of source files"),!1):void 0:(g.a.error("Specify price between 9.99 - 4999.99"),!1):(g.a.error("Description field contains only letters and numbers"),!1):(g.a.error("Name field contains only letters and numbers"),!1)},a.inputChangedHandler=function(e,t){var r=Object(l.a)({},a.state.controls,Object(n.a)({},t,Object(l.a)({},a.state.controls[t],{value:e.target.value})));a.setState({controls:r,pricing:{serviceFee:.05*r.price.value}})},a.onImageChange=function(e){e.target.files&&e.target.files[0]&&a.setState({imageUrl:URL.createObjectURL(e.target.files[0]),image:e.target.files[0]})},a.submitHandler=function(e){if(e.preventDefault(),a.setState({loading:!0}),!1!==a.validateForm()){a.showModal();for(var t=0;t<a.props.modules.length;t++){var n={project:a.state.controls.title.value,name:a.props.modules[t]};a.setState({modules:a.state.modules.push(n)})}for(var l=0;l<a.props.technologies.length;l++){var r={project:a.state.controls.title.value,name:a.props.technologies[l]};a.setState({technologies:a.state.technologies.push(r)})}for(var o=0;o<a.props.requirements.length;o++){var s={project:a.state.controls.title.value,name:a.props.requirements[o]};a.setState({requirements:a.state.requirements.push(s)})}for(var c=0;c<a.props.tags.length;c++){var i={project:a.state.controls.title.value,title:a.props.tags[c]};a.setState({tags:a.state.tags.push(i)})}var u={};for(var m in a.state.controls)u[m]=a.state.controls[m].value,u.user=a.state.user,u.modules=a.state.modules,u.technologies=a.state.technologies,u.requirements=a.state.requirements,u.tags=a.state.tags,u.service_fees=a.state.pricing.serviceFee.toFixed(2);h.a.post("/projects/",u).then(function(e){a.setState({id:e.data.id}),setTimeout(a.sendImage,1e3)}).catch(function(e){console.log(e)})}},a.sendImage=function(){var e=new FormData;e.append("project",a.state.id),e.append("image",a.state.image),h.a.post("/projects/".concat(a.state.id,"/upload-thumbnail/"),e).then(function(t){if(201===t.status){e.delete("image");var n=a.props.snapshots;e.append("image",n[0]),h.a.post("/projects/".concat(a.state.id,"/upload-snapshot/"),e).then(function(t){201===t.status&&(e.delete("image"),e.append("image",n[1]),h.a.post("/projects/".concat(a.state.id,"/upload-snapshot/"),e).then(function(t){201===t.status&&(e.delete("image"),e.append("image",n[2]),h.a.post("/projects/".concat(a.state.id,"/upload-snapshot/"),e).then(function(t){201===t.status&&(e.delete("image"),e.append("image",n[3]),h.a.post("/projects/".concat(a.state.id,"/upload-snapshot/"),e).then(function(t){201===t.status&&(e.delete("project"),e.delete("image"),console.log("executing send video function"),a.sendVideo())}).catch(function(e){console.log(e)}))}))}))})}}).catch(function(e){console.log(e)})},a.sendVideo=function(){console.log("sendVideo");var e=new FormData;e.append("project",a.state.id),e.append("video",a.props.video),h.a.post("/projects/".concat(a.state.id,"/upload-video/"),e).then(function(e){console.log(e),201===e.status&&(console.log(e.data),a.sendFile())}).catch(function(e){console.log(e)})},a.sendFile=function(){var e=new FormData;e.append("project",a.state.id),e.append("file",a.props.file),h.a.post("/projects/".concat(a.state.id,"/upload-file/"),e).then(function(e){201===e.status&&(a.props.modules.length=0,a.props.technologies.length=0,a.props.requirements.length=0,a.setState({uploaded:!0}))}).catch(function(e){console.log(e)})},a}return Object(i.a)(t,e),Object(o.a)(t,[{key:"componentDidMount",value:function(){var e=localStorage.getItem("userId");this.setState({user:e})}},{key:"componentDidUpdate",value:function(){var e=this;this.state.uploaded&&(console.log("uploaded"),setTimeout(function(){e.props.history.push("/profile")},1e3))}},{key:"handleChange",value:function(e,t){var a=Object(l.a)({},this.state.controls,Object(n.a)({},t,Object(l.a)({},this.state.controls[t],{value:e})));this.setState({controls:a})}},{key:"render",value:function(){var e=this,t=[];for(var a in this.state.controls)t.push({id:a,config:this.state.controls[a]});return m.a.createElement("section",{className:"container"},m.a.createElement("div",{className:"container"},m.a.createElement("div",{className:"row"},m.a.createElement("div",{className:"col-md-8 col-md-offset-2 "},m.a.createElement(y.a,null,"Upload your project"),m.a.createElement("br",null),m.a.createElement("div",{className:"border bg-white d-inline-block px-4 py-2 mb-5"},m.a.createElement(j.a,null,"Before you upload, make sure to read our terms."),m.a.createElement("ul",null,m.a.createElement("li",null,"Read the standards and requirements for item(s) you want to sell."),m.a.createElement("li",null,"Make sure your files are well organized."),m.a.createElement("li",null,"Always provide complete details about your project."))),m.a.createElement("form",null,m.a.createElement("div",{className:"form-group"},m.a.createElement(j.a,null,"Name and Description"),m.a.createElement("br",null),m.a.createElement("input",{type:"text",className:"form-control",name:"title",placeholder:"Name",onChange:function(t){return e.inputChangedHandler(t,"title")}})),m.a.createElement("div",{className:"form-group"},m.a.createElement("textarea",{rows:"8",className:"form-control",name:"description",placeholder:"Write overview of your project...",onChange:function(t){return e.inputChangedHandler(t,"description")}}))),m.a.createElement("hr",null),m.a.createElement("div",{className:"mt-5"},m.a.createElement(j.a,null,"Features and Requirements"),m.a.createElement("br",null),m.a.createElement("div",{className:""},m.a.createElement("label",{htmlFor:"description"},"Modules"),m.a.createElement(w,{btnLabel:"Module"})),m.a.createElement("div",{className:""},m.a.createElement("label",{htmlFor:"description"},"Technologies"),m.a.createElement(w,{btnLabel:"Technology"})),m.a.createElement("div",{className:""},m.a.createElement("label",{htmlFor:"description"},"Requirements"),m.a.createElement(w,{btnLabel:"Requirement"}))),m.a.createElement("hr",null),m.a.createElement("div",{className:"mt-5"},m.a.createElement(j.a,null,"Choose Snapshots"),m.a.createElement("br",null),m.a.createElement(R,null)),m.a.createElement("hr",null),m.a.createElement("div",{className:"mt-5"},m.a.createElement(j.a,null,"Upload Video"),m.a.createElement("br",null),m.a.createElement(F.a,{video:!0})),m.a.createElement("hr",null),m.a.createElement("div",{className:"mt-5"},m.a.createElement(j.a,null,"Pricing"),m.a.createElement("br",null),m.a.createElement("div",{className:"row"},m.a.createElement("div",{className:"col-6"},m.a.createElement("p",null,"Total amount the customers will see on your project")),m.a.createElement("div",{className:"col-4 ml-auto"},m.a.createElement("input",{type:"text",className:"form-control ",style:{textAlign:"right"},name:"price",placeholder:"$150.00",onChange:function(t){return e.inputChangedHandler(t,"price")}}))),m.a.createElement("div",{className:"row"},m.a.createElement("div",{className:"col-6"},m.a.createElement("p",null,"SoftForest service fee",m.a.createElement(z,{placement:"right",title:m.a.createElement("strong",null," SoftForest service fee"),content:m.a.createElement("div",null,m.a.createElement("p",null,"SoftForest takes 5% of your price as per service charges."))},m.a.createElement("strong",{style:{cursor:"pointer"}},"\xa0\xa0Explain")))),m.a.createElement("div",{className:"col-4 ml-auto text-right"},m.a.createElement("p",null,"$",this.state.pricing.serviceFee.toFixed(2),"\xa0\xa0"))),m.a.createElement("div",{className:"row"},m.a.createElement("div",{className:"col-6"},m.a.createElement("p",null,"Amount you will recieve after service fees")),m.a.createElement("div",{className:"col-4 ml-auto text-right"},m.a.createElement("p",null,"$",(this.state.controls.price.value-this.state.pricing.serviceFee).toFixed(2),"\xa0\xa0")))),m.a.createElement("hr",null),m.a.createElement("div",{className:"mt-5"},m.a.createElement(j.a,null,"Category"),m.a.createElement("div",{className:"col-5 mt-5"},m.a.createElement(v.a,{showSearch:!0,style:{width:200},placeholder:"Select a category",optionFilterProp:"children",onChange:function(t){return e.handleChange(t,"category")},filterOption:function(e,t){return t.props.children.toLowerCase().indexOf(e.toLowerCase())>=0}},m.a.createElement($,{value:"Desktop"},"Desktop"),m.a.createElement($,{value:"Mobile"},"Mobile"),m.a.createElement($,{value:"Web"},"Web")))),m.a.createElement("hr",null),m.a.createElement("div",{className:"mt-5"},m.a.createElement(j.a,null,"Demo"),m.a.createElement("br",null),m.a.createElement("p",null," ","You can add demo of your project or skip this",m.a.createElement(z,{placement:"right",title:m.a.createElement("strong",null,"Demo files"),content:m.a.createElement("div",null,m.a.createElement("p",null,"Upload your files/setup to any cloud based file hosting ",m.a.createElement("br",null)," service and paste link here."))},m.a.createElement("strong",{style:{cursor:"pointer"}},"\xa0\xa0Explain"))),m.a.createElement(B.a,{elementType:this.state.controls.link.elementType,elementConfig:this.state.controls.link.elementConfig,value:this.state.controls.link.value,changed:function(t){return e.inputChangedHandler(t,"link")}})),m.a.createElement("hr",null),m.a.createElement("div",{className:"mt-5"},m.a.createElement(j.a,null,"Source files"),m.a.createElement("br",null),m.a.createElement("p",null,"Add your source files in .zip format"),m.a.createElement(F.a,{file:!0})),m.a.createElement("hr",null),m.a.createElement("div",{className:"mt-5"},m.a.createElement(j.a,null,"Tags"),m.a.createElement("br",null),m.a.createElement(L,null))),m.a.createElement("div",{className:"col-md-4 mt-5"},m.a.createElement(j.a,null,"Choose Thumbnail"),m.a.createElement("br",null),m.a.createElement("div",{className:"input-group mb-3"}),m.a.createElement("div",{className:"text-center"},m.a.createElement("img",{src:this.state.imageUrl,alt:"profile",className:"rounded img-fluid profile_img"}),m.a.createElement("div",{className:"custom-file"},m.a.createElement("input",{type:"file",className:"custom-file-input",id:"inputGroupFile01","aria-describedby":"inputGroupFileAddon01",onChange:this.onImageChange}),m.a.createElement("label",{className:"custom-file-label",htmlFor:"inputGroupFile01"},"Choose file"))))),m.a.createElement("form",{onSubmit:function(t){return e.submitHandler(t)}},m.a.createElement("div",{className:"form-group mt-5"},m.a.createElement(V.a,{btnType:"Btn-primary Btn-md "},"Submit"))),m.a.createElement(E.a,{title:"Uploading...",centered:!0,visible:this.state.visible,footer:null},m.a.createElement("p",{className:"text-center"},m.a.createElement(b.a,{type:"circle",percent:this.state.percent,className:"mx-auto"})))))}}]),t}(u.Component);t.default=Object(f.b)(function(e){return{modules:e.dynamicFormItemReducer.modules,technologies:e.dynamicFormItemReducer.technologies,requirements:e.dynamicFormItemReducer.requirements,tags:e.tagReducer.tags,snapshots:e.snapShotsReducer.snapshots,video:e.videoReducer.video,file:e.fileReducer.file}},null)(J)}}]);
//# sourceMappingURL=20.a8d6063c.chunk.js.map