(window.webpackJsonp=window.webpackJsonp||[]).push([[21],{750:function(e,t,a){"use strict";a.r(t);var n=a(14),r=a(15),o=a(17),c=a(16),l=a(18),i=a(0),s=a.n(i),d=a(436),u=a(738),m=a(102),p=a(13),h=a(739),g=a(20),f=a(45),E=a(746),b=a(76),y=a(41),k=a(479),v=a.n(k),S=a(23),w=a(150),T={fontSize:16,color:"rgba(0,0,0,0.85)",lineHeight:"24px",display:"block",marginBottom:16},q=function(e){var t=e.title,a=e.content;return s.a.createElement("div",{style:{fontSize:14,lineHeight:"22px",marginBottom:7,color:"rgba(0,0,0,0.65)"}},s.a.createElement("p",{style:{marginRight:8,display:"inline-block",color:"rgba(0,0,0,0.85)"}},t,":"),a)},x=function(e){function t(){var e,a;Object(n.a)(this,t);for(var r=arguments.length,l=new Array(r),i=0;i<r;i++)l[i]=arguments[i];return(a=Object(o.a)(this,(e=Object(c.a)(t)).call.apply(e,[this].concat(l)))).state={record:{},loaded:!1,accepted:!1,declined:!1,loading:!1,error:null},a.acceptHandler=function(){a.setState({loading:!0});var e=localStorage.getItem("token"),t={status:"accepted"};setTimeout(function(){g.a.patch("/modification-requests/".concat(a.props.record.id,"/"),t,{headers:{Authorization:"Token ".concat(e)}}).then(function(e){"accepted"===e.data.status&&a.setState({accepted:!0,loading:!1})}).catch(function(e){return a.setState({error:e,loading:!1})})},1e3)},a.declineHandler=function(){a.setState({loading:!0});var e=localStorage.getItem("token"),t={status:"declined"};setTimeout(function(){g.a.patch("/modification-requests/".concat(a.props.record.id,"/"),t,{headers:{Authorization:"Token ".concat(e)}}).then(function(e){"declined"===e.data.status&&(a.setState({loading:!1}),!1===a.state.loading&&a.props.onClose("declined",e.data.id))}).catch(function(e){return a.setState({error:e,loading:!1})})},1e3)},a}return Object(l.a)(t,e),Object(r.a)(t,[{key:"componentDidMount",value:function(){this.setState({loaded:!0})}},{key:"render",value:function(){var e=null;return this.state.loaded&&(e=s.a.createElement(E.a,{width:640,placement:"right",closable:!1,onClose:this.props.onClose,visible:this.props.visible},s.a.createElement("div",{style:{marginTop:"9.4rem"}}),s.a.createElement("p",{style:T},"Request Detail"),s.a.createElement(b.a,null,s.a.createElement(y.a,{span:12},s.a.createElement(q,{title:"Sender",content:this.props.record.username})),s.a.createElement(y.a,{span:12},s.a.createElement(q,{title:"Date",content:s.a.createElement(m.a,{title:v()(this.props.record.timestamp).format("HH:mm:ss")},s.a.createElement("span",null,v()(this.props.record.timestamp).format("MM-DD-YYYY")))})),s.a.createElement(y.a,{span:12},s.a.createElement(q,{title:"Days",content:this.props.record.days})),s.a.createElement(y.a,{span:12},s.a.createElement(q,{title:"Budget",content:"$"+this.props.record.budget}))),s.a.createElement(b.a,null,s.a.createElement(y.a,{span:24},s.a.createElement(q,{title:"Description",content:this.props.record.content})),s.a.createElement(y.a,{span:24},s.a.createElement(q,{title:"Attachment",content:s.a.createElement(S.a,{btnType:" Btn-md btn-block bg-transparent text-primary mx-auto",clicked:this.props.download},"download")}))),s.a.createElement(u.a,null),s.a.createElement("p",{style:T},"Response"),s.a.createElement(b.a,{className:"text-center "},this.state.accepted||"accepted"===this.props.record.status?s.a.createElement("h2",null,s.a.createElement(p.a,{type:"check-circle",theme:"twoTone",twoToneColor:"#05C0BA"}),"\xa0\xa0Accepted"):s.a.createElement(s.a.Fragment,null,this.state.loading?s.a.createElement(w.a,null):s.a.createElement(s.a.Fragment,null,s.a.createElement(y.a,{span:11},s.a.createElement(S.a,{btnType:"Btn-primary Btn-md btn-block mx-auto",clicked:this.acceptHandler},"accept")),s.a.createElement(y.a,{span:11},s.a.createElement(S.a,{btnType:" Btn-md btn-block bg-transparent border text-danger mx-auto",clicked:this.declineHandler},"decline"))))))),s.a.createElement(s.a.Fragment,null,e)}}]),t}(s.a.Component),A=d.a.confirm,C=function(e){function t(){var e,a;Object(n.a)(this,t);for(var r=arguments.length,l=new Array(r),i=0;i<r;i++)l[i]=arguments[i];return(a=Object(o.a)(this,(e=Object(c.a)(t)).call.apply(e,[this].concat(l)))).state={requests:[],record:{},loading:!1,error:null,accepted:!1,visible:!1},a.fetchRecords=function(){a.setState({loading:!0});var e=localStorage.getItem("userId"),t=localStorage.getItem("occupation"),n=localStorage.getItem("token");setTimeout(function(){"buyer"===t?g.a.get("/modification-requests/",{params:{user:e},headers:{Authorization:"Token ".concat(n)}}).then(function(e){a.setState({requests:e.data,loading:!1,error:null})}).catch(function(e){return a.setState({error:e,loading:!1})}):g.a.get("/modification-requests/",{params:{developer:e},headers:{Authorization:"Token ".concat(n)}}).then(function(e){a.setState({requests:e.data,loading:!1,error:null})}).catch(function(e){return a.setState({error:e,loading:!1})})},1e3)},a.showDrawer=function(e){a.setState({visible:!0,record:e})},a.onClose=function(e,t){if(a.setState({visible:!1}),"declined"===e){var n=a.state.requests.filter(function(e){return e.id!==t});a.setState({requests:n})}},a.downloadAttachmentHandler=function(){var e=a.state.record.id,t=a.state.record.user;g.a.get("/modification-requests/attachment-download/".concat(e,"/?user=").concat(t)).then(function(e){}).catch(function(e){console.log(e)})},a.deleteHandler=function(e){A({title:"Are you sure to delete this?",content:"This operation can not be undo",okText:"Yes",okType:"danger",cancelText:"No",id:e,onOk:function(){var t=localStorage.getItem("token");g.a.delete("/modification-requests/".concat(e,"/"),{headers:{Authorization:"Token ".concat(t)}}).then(function(t){if(204===t.status){var n=a.state.requests.filter(function(t){return t.id!==e});a.setState({requests:n,error:null})}}).catch(function(e){return a.setState({error:e,loading:!1})})},onCancel:function(){}})},a}return Object(l.a)(t,e),Object(r.a)(t,[{key:"componentDidMount",value:function(){this.fetchRecords()}},{key:"error",value:function(){d.a.error({title:"Error",content:"Something went wrong, please try again!",onOk:function(){}})}},{key:"render",value:function(){var e=this,t=[{title:"Request",dataIndex:"content",key:"content",render:function(e){return s.a.createElement("span",null,e.substring(0,90),e.length>90?"...":null," ")}},{title:"Action",key:"action",render:function(t,a){return s.a.createElement("span",null,"buyer"===localStorage.getItem("occupation")?s.a.createElement(s.a.Fragment,null,s.a.createElement("span",{className:"text-primary"},a.status),s.a.createElement(u.a,{type:"vertical"}),s.a.createElement("span",{className:"text-danger",style:{cursor:"pointer"},onClick:function(){return e.deleteHandler(a.id)}},"delete")):s.a.createElement("span",{className:"text-primary",style:{cursor:"pointer"},onClick:function(){return e.showDrawer(a)}},"View"))}},{title:s.a.createElement(m.a,{title:"Reload"},s.a.createElement(p.a,{type:"reload",style:{cursor:"pointer"},onClick:this.fetchRecords}))}];return s.a.createElement("div",{className:"container bg-white border"},this.state.error?this.error():null,s.a.createElement(f.a,{className:"mt-2"},"Requests"),s.a.createElement(h.a,{loading:this.state.loading,columns:t,dataSource:this.state.requests}),s.a.createElement(x,{visible:this.state.visible,onClose:this.onClose,record:this.state.record,download:function(){return e.downloadAttachmentHandler()}}))}}]),t}(i.Component);t.default=C}}]);
//# sourceMappingURL=21.947aa567.chunk.js.map