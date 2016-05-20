YUI.add("moodle-mod_quiz-toolboxes",function(e,t){var n={ACTIVITYINSTANCE:"activityinstance",AVAILABILITYINFODIV:"div.availabilityinfo",CONTENTWITHOUTLINK:"contentwithoutlink",CONDITIONALHIDDEN:"conditionalhidden",DIMCLASS:"dimmed",DIMMEDTEXT:"dimmed_text",EDITINSTRUCTIONS:"editinstructions",EDITINGMAXMARK:"editor_displayed",HIDE:"hide",JOIN:"page_join",MODINDENTCOUNT:"mod-indent-",MODINDENTHUGE:"mod-indent-huge",PAGE:"page",SECTIONHIDDENCLASS:"hidden",SECTIONIDPREFIX:"section-",SLOT:"slot",SHOW:"editing_show",TITLEEDITOR:"titleeditor"},r={ACTIONAREA:".actions",ACTIONLINKTEXT:".actionlinktext",ACTIVITYACTION:"a.cm-edit-action[data-action], a.editing_maxmark, a.editing_section, input.shuffle_questions",ACTIVITYFORM:"span.instancemaxmarkcontainer form",ACTIVITYINSTANCE:"."+n.ACTIVITYINSTANCE,SECTIONINSTANCE:".sectioninstance",ACTIVITYLI:"li.activity, li.section",ACTIVITYMAXMARK:"input[name=maxmark]",COMMANDSPAN:".commands",CONTENTAFTERLINK:"div.contentafterlink",CONTENTWITHOUTLINK:"div.contentwithoutlink",DELETESECTIONICON:"a.editing_delete img",EDITMAXMARK:"a.editing_maxmark",EDITSECTION:"a.editing_section",EDITSECTIONICON:"a.editing_section img",EDITSHUFFLEQUESTIONSACTION:"input.cm-edit-action[data-action]",EDITSHUFFLEAREA:".instanceshufflequestions .shuffle-progress",HIDE:"a.editing_hide",HIGHLIGHT:"a.editing_highlight",INSTANCENAME:"span.instancename",INSTANCEMAXMARK:"span.instancemaxmark",INSTANCESECTION:"span.instancesection",INSTANCESECTIONAREA:"div.section-heading",MODINDENTDIV:".mod-indent",MODINDENTOUTER:".mod-indent-outer",NUMQUESTIONS:".numberofquestions",PAGECONTENT:"div#page-content",PAGELI:"li.page",SECTIONUL:"ul.section",SECTIONFORM:".instancesectioncontainer form",SECTIONINPUT:"input[name=section]",SHOW:"a."+n.SHOW,SLOTLI:"li.slot",SUMMARKS:".mod_quiz_summarks"},i=e.one(document.body);M.mod_quiz=M.mod_quiz||{};var s=function(){s.superclass.constructor.apply(this,arguments)};e.extend(s,e.Base,{send_request:function(t,n,i,s){t||(t={});var o=this.get("config").pageparams,u;for(u in o)t[u]=o[u];t.sesskey=M.cfg.sesskey,t.courseid=this.get("courseid"),t.quizid=this.get("quizid");var a=M.cfg.wwwroot+this.get("ajaxurl"),f=[],l={method:"POST",data:t,on:{success:function(t,s){try{f=e.JSON.parse(s.responseText),f.error&&new M.core.ajaxException(f)}catch(o){}f.hasOwnProperty("newsummarks")&&e.one(r.SUMMARKS).setHTML(f.newsummarks),f.hasOwnProperty("newnumquestions")&&e.one(r.NUMQUESTIONS).setHTML(M.util.get_string("numquestionsx","quiz",f.newnumquestions)),i&&e.bind(i,this,f)(),n&&window.setTimeout(function(){n.hide()},400)},failure:function(e,t){n&&n.hide(),new M.core.ajaxException(t)}},context:this};if(s)for(u in s)l[u]=s[u];return n&&n.show(),e.io(a,l),this}},{NAME:"mod_quiz-toolbox",ATTRS:{courseid:{value:0},quizid:{value:0},ajaxurl:{value:null},config:{value:{}}}});var o=function(){o.superclass.constructor.apply(this,arguments)};e.extend(o,s,{editmaxmarkevents:[],NODE_PAGE:1,NODE_SLOT:2,NODE_JOIN:3,initializer:function(){M.mod_quiz.quizbase.register_module(this),e.delegate("click",this.handle_data_action,i,r.ACTIVITYACTION,this),e.delegate("click",this.handle_data_action,i,r.DEPENDENCY_LINK,this)},handle_data_action:function(e){var t=e.target;t.test("a")||(t=t.ancestor(r.ACTIVITYACTION));var n=t.getData("action"),i=t.ancestor(r.ACTIVITYLI);if(!t.test("a")||!n||!i)return;switch(n){case"editmaxmark":this.edit_maxmark(e,t,i,n);break;case"delete":this.delete_with_confirmation(e,t,i,n);break;case"addpagebreak":case"removepagebreak":this.update_page_break(e,t,i,n);break;case"adddependency":case"removedependency":this.update_dependency(e,t,i,n);break;default:}},add_spinner:function(t){var n=t.one(r.ACTIONAREA);return n?M.util.add_spinner(e,n):null},delete_with_confirmation:function(t,n,r){t.preventDefault();var i=r,s="",o=M.util.get_string("pluginname","qtype_"+i.getAttribute("class").match(/qtype_([^\s]*)/)[1]);s=M.util.get_string("confirmremovequestion","quiz",o);var u=new M.core.confirm({question:s,modal:!0});return u.on("complete-yes",function(){var n=this.add_spinner(i),r={"class":"resource",action:"DELETE",id:e.Moodle.mod_quiz.util.slot.getId(i)};this.send_request(r,n,function(n){n.deleted&&(e.Moodle.mod_quiz.util.slot.remove(i),this.reorganise_edit_page(),M.core.actionmenu&&M.core.actionmenu.instance&&M.core.actionmenu.instance.hideMenu(t))})},this),this},edit_maxmark:function(t,i,s){var o=s.one(r.INSTANCEMAXMARK),u=s.one(r.ACTIVITYINSTANCE),a=o.get("firstChild"),f=a.get("data"),l=f,c,h=o,p={"class":"resource",field:"getmaxmark",id:e.Moodle.mod_quiz.util.slot.getId(s)};t.preventDefault(),this.send_request(p,null,function(r){M.core.actionmenu&&M.core.actionmenu.instance&&M.core.actionmenu.instance.hideMenu(t),r.instancemaxmark&&(l=r.instancemaxmark);var i=e.Node.create('<form action="#" />'),o=e.Node.create('<span class="'+n.EDITINSTRUCTIONS+'" id="id_editinstructions" />').set("innerHTML",M.util.get_string("edittitleinstructions","moodle")),a=e.Node.create('<input name="maxmark" type="text" class="'+n.TITLEEDITOR+'" />').setAttrs({value:l,autocomplete:"off","aria-describedby":"id_editinstructions",maxLength:"12",size:parseInt(this.get("config").questiondecimalpoints,10)+2});i.appendChild(a),i.setData("anchor",h),u.insert(o,"before"),h.replace(i);var p="left";window.right_to_left()&&(p="right"),s.addClass(n.EDITINGMAXMARK),a.focus().select(),c=a.on("blur",this.edit_maxmark_cancel,this,s,!1),this.editmaxmarkevents.push(c),c=a.on("key",this.edit_maxmark_cancel,"esc",this,s,!0),this.editmaxmarkevents.push(c),c=i.on("submit",this.edit_maxmark_submit,this,s,f),this.editmaxmarkevents.push(c)})},edit_maxmark_submit:function(t,n,i){t.preventDefault();var s=e.Lang.trim(n.one(r.ACTIVITYFORM+" "+r.ACTIVITYMAXMARK).get("value")),o=this.add_spinner(n);this.edit_maxmark_clear(n),n.one(r.INSTANCEMAXMARK).setContent(s);if(s!==null&&s!==""&&s!==i){var u={"class":"resource",field:"updatemaxmark",maxmark:s,id:e.Moodle.mod_quiz.util.slot.getId(n)};this.send_request(u,o,function(e){e.instancemaxmark&&n
.one(r.INSTANCEMAXMARK).setContent(e.instancemaxmark)})}},edit_maxmark_cancel:function(e,t,n){n&&e.preventDefault(),this.edit_maxmark_clear(t)},edit_maxmark_clear:function(t){(new e.EventHandle(this.editmaxmarkevents)).detach();var i=t.one(r.ACTIVITYFORM),s=t.one("#id_editinstructions");i&&i.replace(i.getData("anchor")),s&&s.remove(),t.removeClass(n.EDITINGMAXMARK),e.later(100,this,function(){t.one(r.EDITMAXMARK).focus()}),e.one("input[name=maxmark")||e.one("body").append('<input type="text" name="maxmark" style="display: none">')},update_page_break:function(t,n,r,i){t.preventDefault();var s=r.next("li.activity.slot"),o=this.add_spinner(s),u=i==="removepagebreak"?1:2,a={"class":"resource",field:"updatepagebreak",id:e.Moodle.mod_quiz.util.slot.getId(s),value:u};return this.send_request(a,o,function(t){if(t.slots){if(i==="addpagebreak")e.Moodle.mod_quiz.util.page.add(r);else{var n=r.next(e.Moodle.mod_quiz.util.page.SELECTORS.PAGE);e.Moodle.mod_quiz.util.page.remove(n,!0)}this.reorganise_edit_page()}}),this},update_dependency:function(t,n,r,i){t.preventDefault();var s=this.add_spinner(r),o={"class":"resource",field:"updatedependency",id:e.Moodle.mod_quiz.util.slot.getId(r),value:i==="adddependency"?1:0};return this.send_request(o,s,function(t){t.hasOwnProperty("requireprevious")&&e.Moodle.mod_quiz.util.slot.updateDependencyIcon(r,t.requireprevious)}),this},reorganise_edit_page:function(){e.Moodle.mod_quiz.util.slot.reorderSlots(),e.Moodle.mod_quiz.util.slot.reorderPageBreaks(),e.Moodle.mod_quiz.util.page.reorderPages(),e.Moodle.mod_quiz.util.slot.updateOneSlotSections(),e.Moodle.mod_quiz.util.slot.updateAllDependencyIcons()},NAME:"mod_quiz-resource-toolbox",ATTRS:{courseid:{value:0},quizid:{value:0}}}),M.mod_quiz.resource_toolbox=null,M.mod_quiz.init_resource_toolbox=function(t){M.mod_quiz.resource_toolbox=new o(t);var n=function(){var t={QUIZBULKACTIONMODE:"quiz-bulk-action-mode"},n={BULKACTIONS:"#bulkactionscommand",CANCELBULKACTIONS:"#bulkactionscancelcommand",SELECTALL:"#questionselectall",DESELECTALL:"#questiondeselectall",CHECKBOXES:".quiz-question-bulk-selector"};e.one(n.BULKACTIONS).on("click",function(n){n.preventDefault(),e.one("body").addClass(t.QUIZBULKACTIONMODE)}),e.one(n.CANCELBULKACTIONS).on("click",function(n){n.preventDefault(),e.one("body").removeClass(t.QUIZBULKACTIONMODE)}),e.one(n.SELECTALL).on("click",function(t){t.preventDefault(),e.all(n.CHECKBOXES).set("checked","checked")}),e.one(n.DESELECTALL).on("click",function(t){t.preventDefault(),e.all(n.CHECKBOXES).set("checked","")})};return n(),M.mod_quiz.resource_toolbox};var u=function(){u.superclass.constructor.apply(this,arguments)};e.extend(u,s,{editsectionevents:[],initializer:function(){M.mod_quiz.quizbase.register_module(this),i.delegate("key",this.handle_data_action,"down:enter",r.ACTIVITYACTION,this),e.delegate("click",this.handle_data_action,i,r.ACTIVITYACTION,this),e.delegate("change",this.handle_data_action,i,r.EDITSHUFFLEQUESTIONSACTION,this)},handle_data_action:function(e){var t=e.target;!t.test("a")&&!t.test("input[data-action]")&&(t=t.ancestor(r.ACTIVITYACTION));var n=t.getData("action"),i=t.ancestor(r.ACTIVITYLI);if(!t.test("a")&&!t.test("input[data-action]")||!n||!i)return;switch(n){case"edit_section_title":this.edit_section_title(e,t,i,n);break;case"shuffle_questions":this.edit_shuffle_questions(e,t,i,n);break;case"deletesection":this.delete_section_with_confirmation(e,t,i,n);break;default:}},delete_section_with_confirmation:function(t,n,i){t.preventDefault();var s=new M.core.confirm({question:M.util.get_string("confirmremovesectionheading","quiz",i.get("aria-label")),modal:!0});s.on("complete-yes",function(){var t=M.util.add_spinner(e,i.one(r.ACTIONAREA)),n={"class":"section",action:"DELETE",id:i.get("id").replace("section-","")};this.send_request(n,t,function(e){e.deleted&&window.location.reload(!0)})},this)},edit_section_title:function(t,i,s){var o=s.get("id").replace("section-",""),u=s.one(r.INSTANCESECTION),a,f=u,l={"class":"section",field:"getsectiontitle",id:o};t.preventDefault(),this.send_request(l,null,function(t){var r=t.instancesection,i=e.Node.create('<form action="#" />'),o=e.Node.create('<span class="'+n.EDITINSTRUCTIONS+'" id="id_editinstructions" />').set("innerHTML",M.util.get_string("edittitleinstructions","moodle")),l=e.Node.create('<input name="section" type="text" />').setAttrs({value:r,autocomplete:"off","aria-describedby":"id_editinstructions",maxLength:"255"});i.appendChild(l),i.setData("anchor",f),u.insert(o,"before"),f.replace(i),l.focus().select(),a=l.on("blur",this.edit_section_title_cancel,this,s,!1),this.editsectionevents.push(a),a=l.on("key",this.edit_section_title_cancel,"esc",this,s,!0),this.editsectionevents.push(a),a=i.on("submit",this.edit_section_title_submit,this,s,r),this.editsectionevents.push(a)})},edit_section_title_submit:function(t,n,i){t.preventDefault();var s=e.Lang.trim(n.one(r.SECTIONFORM+" "+r.SECTIONINPUT).get("value")),o=M.util.add_spinner(e,n.one(r.INSTANCESECTIONAREA));this.edit_section_title_clear(n);if(s!==null&&s!==i){n.one(r.INSTANCESECTION).setContent(s);var u={"class":"section",field:"updatesectiontitle",newheading:s,id:n.get("id").replace("section-","")};this.send_request(u,o,function(e){if(e){n.one(r.INSTANCESECTION).setContent(e.instancesection),n.one(r.EDITSECTIONICON).set("title",M.util.get_string("sectionheadingedit","quiz",e.instancesection)),n.one(r.EDITSECTIONICON).set("alt",M.util.get_string("sectionheadingedit","quiz",e.instancesection));var t=n.one(r.DELETESECTIONICON);t&&(t.set("title",M.util.get_string("sectionheadingremove","quiz",e.instancesection)),t.set("alt",M.util.get_string("sectionheadingremove","quiz",e.instancesection)))}})}},edit_section_title_cancel:function(e,t,n){n&&e.preventDefault(),this.edit_section_title_clear(t)},edit_section_title_clear:function(t){(new e.EventHandle(this.editsectionevents)).detach();var n=t.one(r.SECTIONFORM),i=t.one("#id_editinstructions");n&&n.replace(n.getData("anchor")),i&&i.remove(),e.later
(100,this,function(){t.one(r.EDITSECTION).focus()}),e.one("input[name=section]")||e.one("body").append('<input type="text" name="section" style="display: none">')},edit_shuffle_questions:function(t,n,i){var s;i.one(r.EDITSHUFFLEQUESTIONSACTION).get("checked")?s=1:s=0;var o={"class":"section",field:"updateshufflequestions",id:i.get("id").replace("section-",""),newshuffle:s};t.preventDefault();var u=M.util.add_spinner(e,i.one(r.EDITSHUFFLEAREA));this.send_request(o,u)}},{NAME:"mod_quiz-section-toolbox",ATTRS:{courseid:{value:0},quizid:{value:0}}}),M.mod_quiz.init_section_toolbox=function(e){return new u(e)}},"@VERSION@",{requires:["base","node","event","event-key","io","moodle-mod_quiz-quizbase","moodle-mod_quiz-util-slot","moodle-core-notification-ajaxexception"]});
