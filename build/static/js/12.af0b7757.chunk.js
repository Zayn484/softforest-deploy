(window.webpackJsonp=window.webpackJsonp||[]).push([[12],{704:function(e,t,a){var n={"./develperDumyProfilePic.png":131};function r(e){var t=l(e);return a(t)}function l(e){var t=n[e];if(!(t+1)){var a=new Error("Cannot find module '"+e+"'");throw a.code="MODULE_NOT_FOUND",a}return t}r.keys=function(){return Object.keys(n)},r.resolve=l,e.exports=r,r.id=704},744:function(e,t,a){"use strict";a.r(t);var n=a(14),r=a(15),l=a(17),c=a(16),o=a(18),s=a(0),m=a.n(s),i=a(49),d=a(189),u=a(634),E=function(e){function t(){var e,a;Object(n.a)(this,t);for(var r=arguments.length,o=new Array(r),s=0;s<r;s++)o[s]=arguments[s];return(a=Object(l.a)(this,(e=Object(c.a)(t)).call.apply(e,[this].concat(o)))).state={type:"line",data:a.props.data},a}return Object(o.a)(t,e),Object(r.a)(t,[{key:"render",value:function(){return m.a.createElement("div",{className:"Dashboard__Chart"},m.a.createElement(u.a,{data:this.state.data,width:100,height:45,options:{title:{display:this.props.displayTitle,text:"Bar Chart",fontSize:"25"},legend:{display:this.props.displayLengent,position:this.props.legendPosition}}}))}}]),t}(s.Component);E.defaultProps={displayTitle:!0,displayLengent:!0,legendPosition:"right"};var h=E,p=function(e){return m.a.createElement("div",{className:"row"},m.a.createElement("div",{className:"Dashboard__Profile col-md-4"},m.a.createElement(d.a,e)),m.a.createElement("div",{className:"Dashboard__Statistics col-md-7 ml-md-5 mt-sm-5 mt-md-0"},m.a.createElement("div",{className:"Dashboard__Statistics__Container"},m.a.createElement("div",{className:"Dashboard__Statistics--Upper row"},m.a.createElement("div",{className:"col-10 col-sm-10 col-md-10"},m.a.createElement(i.a,null,"Statistics")),m.a.createElement("div",{className:"col-2 col-sm-2 col-md-2"},m.a.createElement("select",null,m.a.createElement("option",null,"Last 6 Month"),m.a.createElement("option",null,"Last 7 Month")))),m.a.createElement("div",{className:"Dashboard__Statistics--Lower row"},m.a.createElement("div",{className:"Dashboard__Statistics__GraphBox col-md-12"},m.a.createElement(h,{data:e.data,legendPosition:"bottom"}))))))},b=a(686),f=a.n(b),v=function(e){function t(){var e,a;Object(n.a)(this,t);for(var r=arguments.length,o=new Array(r),s=0;s<r;s++)o[s]=arguments[s];return(a=Object(l.a)(this,(e=Object(c.a)(t)).call.apply(e,[this].concat(o)))).state={date:new Date},a.onChange=function(e){return a.setState({date:e})},a}return Object(o.a)(t,e),Object(r.a)(t,[{key:"render",value:function(){return m.a.createElement(f.a,{onChange:this.onChange,value:this.state.date})}}]),t}(s.Component),_=a(747),g=a(39),y=function(e){return m.a.createElement(m.a.Fragment,null,m.a.createElement(i.a,{className:"mb-5"},"Top Projects"),m.a.createElement(_.a,{hover:!0,responsive:!0,className:"text-center Table"},m.a.createElement("thead",null,m.a.createElement("tr",{style:{backgroundColor:"#F5F6FA",fontSize:"1.5rem"}},m.a.createElement("th",null,"Project"),m.a.createElement("th",null,"Price"),m.a.createElement("th",null,"Catagory"))),m.a.createElement("tbody",null,m.a.createElement("tr",{style:{fontSize:"1.5rem"}},m.a.createElement("td",null,"SoftForest"),m.a.createElement("td",null,"$500"),m.a.createElement("td",null,"E-Commerce")),m.a.createElement("tr",{style:{fontSize:"1.5rem"}},m.a.createElement("td",null,"SoftForest"),m.a.createElement("td",null,"$500"),m.a.createElement("td",null,"E-Commerce")),m.a.createElement("tr",{style:{fontSize:"1.5rem"}},m.a.createElement("td",null,"SoftForest"),m.a.createElement("td",null,"$500"),m.a.createElement("td",null,"E-Commerce")),m.a.createElement("tr",{style:{fontSize:"1.5rem"}},m.a.createElement("td",null,"SoftForest"),m.a.createElement("td",null,"$500"),m.a.createElement("td",null,"E-Commerce")))),m.a.createElement("div",{className:"text-center"},m.a.createElement(g.a,null,m.a.createElement("a",{href:"/"}," See All"))))},N=function(){return m.a.createElement("div",{className:"row Lower-section align-items-center"},m.a.createElement("div",{className:"Dashboard__Calender col-md-4"},m.a.createElement("div",{className:"Dashboard__Calender__Container pt-5 pb-5  pl-sm-3 pl-md-0"},m.a.createElement("div",{className:"ml-sm-5 p-5 py-md-4 px-md-0 ml-md-0 "},m.a.createElement(v,null)))),m.a.createElement("div",{className:"Dashboard__ProjectTable col-md-7 ml-md-5 mt-sm-5 mt-md-0 "},m.a.createElement("div",{className:"Dashboard__ProjectTable__Container"},m.a.createElement(y,null))))},C=a(704),P=function(e){function t(){var e,a;Object(n.a)(this,t);for(var r=arguments.length,o=new Array(r),s=0;s<r;s++)o[s]=arguments[s];return(a=Object(l.a)(this,(e=Object(c.a)(t)).call.apply(e,[this].concat(o)))).state={ProfilePic:C("./develperDumyProfilePic.png"),Name:"KHIZAR",Response_rate:"70%",Earning:"$500",data:null},a}return Object(o.a)(t,e),Object(r.a)(t,[{key:"componentWillMount",value:function(){this.setState({data:{labels:["Red","Blue","Yellow","Green","Purple","Orange"],datasets:[{label:"# of Votes",data:[12,19,3,5,50,3],backgroundColor:["rgba(255, 0, 255, 0.4)"],borderColor:["rgba(255,99,132,1)"],borderWidth:1},{label:"Khizar",backgroundColor:"rgba(0, 255, 0, 0.4)",data:[12,18,4,10,2,3,4]}]}})}},{key:"render",value:function(){return m.a.createElement("section",{className:"Section-Dashboard"},m.a.createElement("div",{className:"Dashboard container"},m.a.createElement(p,{ProfilePic:this.state.ProfilePic,Name:this.state.Name,Response_rate:this.state.Response_rate,Earning:this.state.Earning,data:this.state.data}),m.a.createElement(N,null)))}}]),t}(s.Component);t.default=P}}]);
//# sourceMappingURL=12.af0b7757.chunk.js.map