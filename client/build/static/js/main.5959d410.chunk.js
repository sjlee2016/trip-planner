(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{41:function(e,a,t){e.exports=t(78)},77:function(e,a,t){},78:function(e,a,t){"use strict";t.r(a);var n=t(0),r=t.n(n),l=t(16),c=t.n(l),o=t(2),s=t(10),i=function(e){return r.a.createElement("nav",{className:"navbar bg-dark"},r.a.createElement("h1",null,r.a.createElement(o.b,{to:"/"},r.a.createElement("i",{className:"fas fa-code"})," Se Jin Website")),r.a.createElement("ul",null,r.a.createElement("li",null,r.a.createElement(o.b,{to:"/profile"},"Developers")),r.a.createElement("li",null,r.a.createElement(o.b,{to:"/register"},"Register")),r.a.createElement("li",null,r.a.createElement(o.b,{to:"/login"},"Login"))))},m=function(e){return r.a.createElement("section",{className:"landing"},r.a.createElement("div",{className:"dark-overlay"},r.a.createElement("div",{className:"landing-inner"},r.a.createElement("h1",{className:"x-large"},"Developer Connector"),r.a.createElement("p",{className:"lead"},"Create a developer profile/portfolio, share posts and get help from other developers"),r.a.createElement("div",{className:"buttons"},r.a.createElement(o.b,{to:"/register",className:"btn btn-primary"},"Sign Up "),r.a.createElement(o.b,{to:"/login",className:"btn btn-light"},"Login ")))))},u=function(e){return r.a.createElement(n.Fragment,null,r.a.createElement("section",{class:"container"},r.a.createElement("div",{class:"alert alert-danger"},"Invalid credentials"),r.a.createElement("h1",{class:"large text-primary"},"Sign In"),r.a.createElement("p",{class:"lead"},r.a.createElement("i",{class:"fas fa-user"})," Sign into Your Account"),r.a.createElement("form",{class:"form",action:"dashboard.html"},r.a.createElement("div",{class:"form-group"},r.a.createElement("input",{type:"email",placeholder:"Email Address",name:"email",required:!0})),r.a.createElement("div",{class:"form-group"},r.a.createElement("input",{type:"password",placeholder:"Password",name:"password"})),r.a.createElement("input",{type:"submit",class:"btn btn-primary",value:"Login"})),r.a.createElement("p",{class:"my-1"},"Don't have an account? ",r.a.createElement(o.b,{to:"/register"},"Sign Up"))))},p=t(12),d=t.n(p),E=t(18),g=t(19),f=t(14),v=t(39),h=t(11),b=t(35),y=t.n(b),w=function(e,a){var t=arguments.length>2&&void 0!==arguments[2]?arguments[2]:5e3;return function(n){var r=y.a.v4();n({type:"SET_ALERT",payload:{msg:e,alertType:a,id:r}}),setTimeout(function(){return n({type:"REMOVE_ALERT",payload:r})},t)}},S=t(36),N=t.n(S),k=Object(h.b)(null,{setAlert:w,register:function(e){var a=e.name,t=e.email,n=e.password;return function(){var e=Object(E.a)(d.a.mark(function e(r){var l,c,o;return d.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return console.log("trying to register.. "),l={headers:{"Access-Control-Allow-Origin":"*","Content-Type":"application/json"}},c=JSON.stringify({name:a,email:t,password:n}),e.prev=3,e.next=6,N.a.post("/api/users",c,l);case 6:o=e.sent,console.log(o),r({type:"REGISTER_SUCCESS",payload:o.data}),console.log("success"),e.next=23;break;case 12:if(e.prev=12,e.t0=e.catch(3),!e.t0.response){e.next=22;break}e.t1=e.t0.response.status,e.next=404===e.t1?19:21;break;case 19:return r(w("Server Error","danger")),e.abrupt("break",22);case 21:r(w("Internal Error","danger"));case 22:r({type:"REGISTER_FAIL"});case 23:case"end":return e.stop()}},e,null,[[3,12]])}));return function(a){return e.apply(this,arguments)}}()}})(function(e){var a=e.setAlert,t=e.register,l=Object(n.useState)({name:"",email:"",password:"",password2:""}),c=Object(v.a)(l,2),s=c[0],i=c[1],m=s.name,u=s.email,p=s.password,h=s.password2,b=function(e){return i(Object(f.a)({},s,Object(g.a)({},e.target.name,e.target.value)))},y=function(){var e=Object(E.a)(d.a.mark(function e(n){return d.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:n.preventDefault(),p!==h?a("Password do not match","danger"):(console.log("i am activated"),t({name:m,email:u,password:p}));case 2:case"end":return e.stop()}},e)}));return function(a){return e.apply(this,arguments)}}();return r.a.createElement(n.Fragment,null,r.a.createElement("section",{className:"container"},r.a.createElement("h1",{className:"large text-primary"},"Sign Up"),r.a.createElement("p",{className:"lead"},r.a.createElement("i",{className:"fas fa-user"})," Create Your Account"),r.a.createElement("form",{className:"form",onSubmit:function(e){return y(e)}},r.a.createElement("div",{className:"form-group"},r.a.createElement("input",{type:"text",placeholder:"Name",name:"name",value:m,onChange:function(e){return b(e)},required:!0})),r.a.createElement("div",{className:"form-group"},r.a.createElement("input",{type:"email",placeholder:"Email Address",name:"email",value:u,onChange:function(e){return b(e)}}),r.a.createElement("small",{className:"form-text"},"This site uses Gravatar so if you want a profile image, use a Gravatar email")),r.a.createElement("div",{className:"form-group"},r.a.createElement("input",{type:"password",placeholder:"Password",name:"password",minLength:"6",value:p,onChange:function(e){return b(e)}})),r.a.createElement("div",{className:"form-group"},r.a.createElement("input",{type:"password",placeholder:"Confirm Password",name:"password2",minLength:"6",value:h,onChange:function(e){return b(e)}})),r.a.createElement("input",{type:"submit",className:"btn btn-primary",value:"Register"})),r.a.createElement("p",{className:"my-1"},"Already have an account? ",r.a.createElement(o.b,{to:"/login"},"Sign In"))))}),A=Object(h.b)(function(e){return{alerts:e.alert}})(function(e){var a=e.alerts;return null!==a&&a.length>0&&a.map(function(e){return r.a.createElement("div",{key:e.id,className:"alert alert-".concat(e.alertType)},e.msg)})}),O=(t(77),t(9)),R=t(37),T=t(38),j=t(40),x=[],C={token:localStorage.getItem("token"),isAuthenticated:null,loading:!0,user:null},I=Object(O.combineReducers)({alert:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:x,a=arguments.length>1?arguments[1]:void 0,t=a.type,n=a.payload;switch(t){case"SET_ALERT":return[].concat(Object(j.a)(e),[n]);case"REMOVE_ALERT":return e.filter(function(e){return e.id!==n});default:return e}},auth:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:C,a=arguments.length>1?arguments[1]:void 0,t=a.type,n=a.payload;switch(t){case"REGISTER_SUCCESS":return localStorage.setItem("token",n.token),Object(f.a)({},e,n,{isAuthenticated:!0,loading:!1});case"REGISTER_FAIL":return localStorage.removeItem("token"),Object(f.a)({},e,{token:null,isAuthenticated:!1,loading:!1});default:return e}}}),L=[T.a],_=Object(O.createStore)(I,{},Object(R.composeWithDevTools)(O.applyMiddleware.apply(void 0,L))),G=function(){return r.a.createElement(h.a,{store:_},r.a.createElement(o.a,null,r.a.createElement(n.Fragment,null,r.a.createElement(i,null),r.a.createElement(s.a,{exact:!0,path:"/",component:m}),r.a.createElement("section",{className:"container"},r.a.createElement(A,null),r.a.createElement(s.c,null,r.a.createElement(s.a,{exact:!0,path:"/register",component:k}),r.a.createElement(s.a,{exact:!0,path:"/login",component:u}))))))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));c.a.render(r.a.createElement(G,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})}},[[41,1,2]]]);
//# sourceMappingURL=main.5959d410.chunk.js.map