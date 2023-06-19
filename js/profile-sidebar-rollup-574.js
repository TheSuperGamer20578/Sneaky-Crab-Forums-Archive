/*
 =======================================================================*\
|| ###################################################################### ||
|| # vBulletin 5.7.4
|| # ------------------------------------------------------------------ # ||
|| # Copyright 2000-2023 MH Sub I, LLC dba vBulletin. All Rights Reserved.  # ||
|| # This file may not be redistributed in whole or significant part.   # ||
|| # ----------------- VBULLETIN IS NOT FREE SOFTWARE ----------------- # ||
|| # http://www.vbulletin.com | http://www.vbulletin.com/license.html   # ||
|| ###################################################################### ||
\*========================================================================*/
// ***************************
// js.compressed/subscribe.js
// ***************************
vBulletin.precache(["follow","following","following_pending","social_group_count_members_x","unsubscribe_overlay_error"],[]);
(function(){function h(a,b){a=$(".js-replace-member-count-"+a);a.length&&a.each(function(){var a=$(this),f=a.data("replace-phrase-varname"),d=parseInt(a.data("member-count"),10)+b;a.text(vBulletin.phrase.get(f,d));a.data("member-count",d)})}vBulletin.subscribe={};var g=function(a,b){a.children(".js-button__text-primary").text(vBulletin.phrase.get(b))},d=function(a,b,c,f){g(a,b);a.addClass((c||"")+" b-button--special").removeClass((f||"")+" b-button--secondary")},e=function(a,b,c,f){g(a,b);a.addClass((c||
"")+" b-button--secondary").removeClass((f||"")+" b-button--special")},k=function(a,b,c){vBulletin.AJAX({call:b,data:c,success:function(b){!isNaN(b)&&1<=b?1==b?d(a,"following","isSubscribed"):d(a,"following_pending","is-pending"):vBulletin.error("follow","follow_error")},title_phrase:"follow",error_phrase:"follow_error"})},l=function(a){var b=$(a),c=parseInt(b.attr("data-node-id"),10);a=parseInt(b.attr("data-owner-id"),10);vBulletin.AJAX({call:"/ajax/api/node/requestChannel",data:{channelid:c,recipient:a,
requestType:"sg_member"},success:function(a){!0===a?(d(b,"joined","has-joined"),h(c,1),(b.hasClass("join-to-post-btn")||b.hasClass("js-refresh"))&&window.location.reload()):isNaN(a)||d(b,"following_pending","is-pending")},title_phrase:"join",error_phrase:"join_error"})},m=function(a){var b=$(a),c=parseInt($(a).attr("data-node-id"),10);vBulletin.AJAX({call:"/ajax/api/blog/leaveChannel",data:{channelId:c},success:function(a){!0===a?(b.hasClass("js-button--follow")?(g(b,"follow"),b.addClass("b-button--special").removeClass("isSubscribed b-button--unfollow")):
(g(b,"join"),b.removeClass("has-joined b-button--special leave-btn")),h(c,-1),b.is(".js-no-refresh")||location.reload()):vBulletin.error("leave","invalid_server_response_please_try_again")},title_phrase:"leave",error_phrase:"invalid_server_response_please_try_again"})},n=function(a){var b=$(a);a=$(a).attr("data-node-id");vBulletin.AJAX({call:"/ajax/api/follow/delete",data:{follow_item:a,type:"follow_contents"},success:function(a){1==a?e(b,"follow","","isSubscribed b-button--unfollow"):vBulletin.error("follow",
"unfollow_error")},title_phrase:"follow",error_phrase:"unfollow_error"})};vBulletin.subscribe.updateSubscribeButton=function(a){if("undefined"!=typeof a){var b=$(".js-button--follow").filter(function(){return $(this).data("node-id")==pageData.nodeid&&pageData.nodeid!=pageData.channelid});switch(a){case 0:e(b,"follow","","isSubscribed b-button--unfollow");break;case 1:e(b,"following","isSubscribed");break;case 2:e(b,"following_pending","is-pending")}}};$(".js-button--follow").on("click",function(a){if($(this).hasClass("isSubscribed"))$(this).hasClass("b-button--unfollow")&&
($(this).hasClass("is-blog-channel")?m(this):n(this));else if(a=$(this),!a.hasClass("isSubscribed")&&!a.hasClass("is-pending")){var b=parseInt(a.attr("data-node-id"),10),c={};a.hasClass("is-topic")?(c.follow_item=b,c.type="follow_contents",k(a,"/ajax/api/follow/add",c)):(c={},c.channelid=b,c.recipient=parseInt(a.attr("data-owner-id"),10),a.hasClass("is-blog-channel")?c.requestType="member":a.hasClass("is-sg-channel")?c.requestType="sg_subscriber":c.requestType="subscriber",k(a,"/ajax/api/node/requestChannel",
c))}});$(".js-button--follow").on("mouseover",function(a){a=$(this);a.hasClass("isSubscribed")&&!a.hasClass("is-owner")&&e(a,"following_remove","b-button--unfollow")});$(".js-button--follow").on("mouseout",function(a){a=$(this);a.hasClass("b-button--unfollow")&&d(a,"following","","b-button--unfollow")});$(".join-to-post-btn").on("click",function(a){$(this).hasClass("has-joined")||$(this).hasClass("is-pending")||l(this)});$(document).on("click",".join-btn",function(a){$(this).hasClass("has-joined")||
$(this).hasClass("is-pending")?$(this).hasClass("leave-btn")&&!$(this).hasClass("is-owner")&&m(this):l(this)});$(document).on("mouseover",".join-btn",function(a){a=$(this);a.hasClass("has-joined")&&!a.hasClass("is-owner")&&e(a,"leave","leave-btn")});$(document).on("mouseout",".join-btn",function(a){a=$(this);a.hasClass("leave-btn")&&!a.hasClass("is-owner")&&d(a,"joined","","leave-btn")})})();
;

// ***************************
// js.compressed/profile.js
// ***************************
vBulletin.precache("error error_trying_to_change_user_status error_x follow following following_pending following_remove invalid_server_response_please_try_again profile_guser edit_avatar invalid_data no_permission upload_invalid_url unable_to_upload_profile_photo profile_media album album_saved please_enter_message_x_chars please_enter_title_x_chars unable_to_contact_server_please_try_again".split(" "),[]);var albumPhotoCount=0;
(function(a){function c(){var c=a(this).closest(".section-content").find(".js-user-status-text"),b=a.trim(c.val()),d=a(".js-profile-about-container").data("user-id");vBulletin.AJAX({call:"/ajax/api/user/updateStatus",data:{userid:d,status:b},title_phrase:"profile_guser",error_phrase:"error_trying_to_change_user_status",success:function(b){c.val(b);b&&(b='"'+b+'"');a("#userStatus").text(b)},allowEmptyResponse:!0})}if(!vBulletin.pageHasSelectors([".profile-sidebar-widget"]))return!1;a(function(){var e=
vBulletin.tabtools,b=a(".profile-widget"),d=a("#profileTabs");if(0<d.length){var k=function(b,c,d,e){if(p.isEnabled()){var h=p.getState();(e||!h||a.isEmptyObject(h.data))&&p.setDefaultState({from:b,tab:c,page:"undefined"==typeof d?void 0:d},document.title,location.href)}},g=d.find(".ui-tabs-nav > li");0==g.length&&(g=d.find(".profile-tabs-nav > li"));var l=g.filter(".ui-tabs-active");0==l.length&&(l=g.filter(".b-comp-menu-dropdown__content-item--current"));0==l.length&&(l=function(b,c){var d=[];b.find(".ui-tabs-nav > li > a, .widget-tabs-panel").each(function(b,
c){b=a(this).data("url-path");-1==a.inArray(b,d)&&d.push(b)});b=new RegExp("\\/("+d.join("|")+")/?$");var h=location.pathname.match(b);if(h){var e=!1;c.each(function(){var b=a(this);if(b.find("a").data("url-path")==h[1])return e=b,!1});if(e)return e}return a()}(d,g));var t=l.index(),m,n,q={},u="1"==g.parent().data("allow-history"),p=new vBulletin.history.instance(u);-1==t&&(t=0,l=g.first());var v=l.find("> a").attr("href");var w=function(b,c){c.setOption("context",b);"undefined"!=typeof c.lastFilters&&
0<a(".conversation-empty:not(.h-hide)",b).length&&delete c.lastFilters},x=function(b,c,d,f,k){var h=a(".conversation-list",b);return e.newTab(b,null,!1,!1,c,h,f,k,d)};e.initTabs(d,p,g,u,t,v,[m,n],!1,function(b,c,d){var f=a(d);b="#"+f.attr("id");var h=v==b;b in q||(q[b]=e.tabAllowHistory(f));if("#activities-tab"==b)m?w(f,m):(d=function(){vBulletin.upload&&vBulletin.upload.initializePhotoUpload(f)},m=x(f,h,q[b],d,d).filter),m.applyFilters(!1,!0);else if("#subscribed-tab"==b)n?w(f,n):n=x(f,h,q[b],null,
null).filter,n.applyFilters(!1,!0);else if("#about-tab"==b)if(h)k("tabs","about");else{var r=a(".js-profile-about-container",d);0==a(".section",r).length&&vBulletin.AJAX({call:"/profile/fetchAbout",data:{userid:r.data("user-id"),isAjaxTemplateRender:!0,isAjaxTemplateRenderWithData:!0},success:function(b){r.html(b.template)}})}else if("#media-tab"==b)if(b=Number(a("#mediaCurrentPage").val()),h)k("media_filter","media",b,!0),f.data("media-statechange-set",!0);else{var g=a(".js-profile-media-container",
d);0==a(".item-album",g).length?(d=0,"undefined"==typeof vBulletin.contentEntryBox&&(d=1),vBulletin.AJAX({call:"/profile/fetchMedia",data:{userid:g.data("user-id"),perpage:g.data("perpage"),allowHistory:1,includeJs:d,isAjaxTemplateRender:!0,isAjaxTemplateRenderWithData:!0},success:function(b){g.html(b.template);h&&(b=Number(a("#mediaCurrentPage").val()),k("media_filter","media",b,!0));vBulletin.media.setHistoryStateChange();f.data("media-statechange-set",!0);g.trigger("vb-instrument");"undefined"!=
typeof vBulletin.contentEntryBox&&vBulletin.contentEntryBox.init();"function"==typeof vBulletin.Responsive.ChannelContent.cloneAndMoveToolbarButtons&&vBulletin.Responsive.ChannelContent.cloneAndMoveToolbarButtons()}})):f.data("media-statechange-set")||(k("media_filter","media",b,!0),f.data("media-statechange-set",!0))}else"#infractions-tab"==b&&(b=Number(a(".pagenav-form .js-pagenum",d).val())||1,h?(a(".pagenav-form",d).length&&!f.data("pagination-instance")&&(new vBulletin.pagination({context:f,
tabParamAsQueryString:!1,allowHistory:1==f.find(".conversation-toolbar-wrapper").data("allow-history"),onPageChanged:function(b,a){vBulletin.infraction.loadUserInfractions({container:f,userid:f.data("userid"),pageNumber:b,replaceState:!0})}}),f.data("pagination-instance",!0)),k("infraction_filter","infractions",b,!0),vBulletin.infraction.setHistoryStateChange(),f.data("infraction-statechange-set",!0)):0==a(".infraction-list",d).length?(k("infraction_filter","infractions",b,!0),vBulletin.infraction.loadUserInfractions({container:f,
userid:f.data("userid"),pageNumber:b,callback:function(){vBulletin.infraction.setHistoryStateChange();f.data("infraction-statechange-set",!0)}})):f.data("infraction-statechange-set")||(k("infraction_filter","infractions",b,!0),vBulletin.infraction.setHistoryStateChange(),f.data("infraction-statechange-set",!0)))});a(".customize-theme").off("click").on("click",function(b){var d=a(".profile_custom_edit");if(d.is(":hidden")){var c=function(){d.removeClass("h-hide");vBulletin.animateScrollTop(d.offset().top,
{duration:"slow"})};0<a(".profileNavTabs",d).length?c():vBulletin.AJAX({call:"/ajax/render/profile_custom_edit",userid:d.data("page-userid"),success:function(b){d.html(b);d.prependTo("#content");window.setTimeout(function(){var b=d.find(".tab:hidden").css("display","block"),a=d.find(".h-hide").removeClass("h-hide");d.find("select").selectBox();a.addClass("h-hide");b.css("display","none")},0);c()},error_phrase:"unable_to_contact_server_please_try_again"})}else vBulletin.animateScrollTop(d.offset().top,
{duration:"slow"})})}else a(".customize-theme").addClass("h-hide-imp");a(".profileDetailTabs").tabs();a(".toggle_customizations").off("click").on("click",function(b){b="show"==a(this).attr("data-action")?1:0;vBulletin.AJAX({call:"/profile/toggle-profile-customizations",data:{showusercss:b},complete:function(){a("body").css("cursor","auto")},success:function(b){window.location.reload()}})});0<d.length&&(a(document).off("click",".profileTabs .action_button").on("click",".profileTabs .action_button",
function(){if(!a(this).hasClass("subscribepending_button")){var b=a(this),d=parseInt(b.attr("data-userid")),c="";b.hasClass("subscribe_button")?c="add":b.hasClass("unsubscribe_button")&&(c="delete");"number"==typeof d&&c&&vBulletin.AJAX({call:"/profile/follow-button",data:{"do":c,follower:d,type:"follow_members"},success:function(a){if(1==a||2==a){if("add"==c){var d=1==a?"subscribed":"subscribepending";a=1==a?"following":"following_pending";b.removeClass("subscribe_button").addClass(d+"_button b-button").find(".js-button__text-primary").text(vBulletin.phrase.get(a))}else"delete"==
c&&b.removeClass("subscribed_button unsubscribe_button b-button b-button--special").addClass("subscribe_button b-button b-button--secondary").find(".js-button__text-primary").text(vBulletin.phrase.get("follow"));location.reload()}},title_phrase:"profile_guser"})}}),a(document).off("mouseover",".profileTabs .action_button.subscribed_button").on("mouseover",".profileTabs .action_button.subscribed_button",function(b){a(this).html(vBulletin.phrase.get("following_remove")).addClass("b-button").toggleClass("subscribed_button unsubscribe_button b-button--special b-button--secondary")}),
a(document).off("mouseout",".profileTabs .action_button.unsubscribe_button").on("mouseout",".profileTabs .action_button.unsubscribe_button",function(b){a(this).html(vBulletin.phrase.get("following")).addClass("b-button").toggleClass("subscribed_button unsubscribe_button b-button--special b-button--secondary")}),a(document).offon("click",".js-update-status-btn",c),vBulletin.conversation.bindEditFormEventHandlers("all"),vBulletin.conversation.initPollEvents(b),vBulletin.conversation.initContentEvents(b),
b.off("click",".js-comment-entry__post").on("click",".js-comment-entry__post",function(b){vBulletin.conversation.postComment.apply(this,[b,function(){location.reload()}])}));a("body").is(".view-mode")&&(a(".js-edit-profile").off("click").on("click",editProfilePhoto),a("#btnProfilePhotoSave").off("click").on("click",cropProfilePhoto));a("#btnProfilePhotoContinue").off("click").on("click",function(){var b=a("[name=profile-img-option]:checked").val();switch(parseInt(b)){case 2:b=a("#profilePhotoUrl").val();
if(!b){vBulletin.error("edit_avatar","upload_invalid_url");break}initIAS();a("#profilePicImgCrop").attr("src",b);case 1:a("div#cropFrame").removeClass("h-hide");a("#btnProfilePhotoSave").removeClass("h-hide-imp");a("#btnProfilePhotoContinue").addClass("h-hide-imp");a("div#uploadFrame").addClass("h-hide");a("#btnProfilePhotoClose").focus();break;case 4:resetAvatar()}});a("#btnProfilePhotoClose").off("click").on("click",function(){closeUploader();resetCropValues();a("div#uploadFrame").removeClass("h-hide");
a("div#cropFrame").addClass("h-hide");a("#btnProfilePhotoSave").addClass("h-hide-imp");a("#btnProfilePhotoContinue").removeClass("h-hide-imp");a("#editProfilePhotoDlg").dialog("close").find("form").trigger("reset")});a(document).off("click",".gallery-upload-form .files a:not([target^=_blank])").on("click",".gallery-upload-form .files a:not([target^=_blank])",function(b){b.preventDefault();a('<iframe style="display:none;"></iframe>').prop("src",this.href).appendTo("body")})})})(jQuery);var ias=null;
editProfilePhoto=function(a){$(".defaultAvatarSet").removeClass("defaultAvatarSelected");$("#defaultAvatars").html("");var c=$("#editProfilePhotoDlg").dialog({width:734,title:vBulletin.phrase.get("edit_avatar"),autoOpen:!1,modal:!0,resizable:!1,closeOnEscape:!1,showCloseButton:!1,dialogClass:"dialog-container edit-profile-photo-dialog-container dialog-box",close:function(){modifyIasForTouch("disable")}}).dialog("open");c.on("vbulletin:dialogresize",function(b){resizeAvatarEditDialog()});$(".profile-img-option-container .browse-option").off("click").on("click",
function(b){$(".avatarHolder .defaultAvatarSet.defaultAvatarSelected").removeClass("defaultAvatarSelected")});$(".profile-img-option-container .url-option").off("click").on("click",function(b){var a=$(this);$(".avatarHolder .defaultAvatarSet.defaultAvatarSelected").removeClass("defaultAvatarSelected");setTimeout(function(){a.closest(".profile-img-option-container").find(".profilePhotoUrl").trigger("focus.photourl")},10)});$(".profile-img-option-container .default-option").off("click").on("click",
function(b){if(0==$("#defaultAvatars .avatarHolder").length){var a=$(this);a.closest(".profile-img-option-container").find(".js-upload-progress").removeClass("h-hide");vBulletin.AJAX({call:"/profile/getdefaultavatars",dataType:"html",success:function(b){$("#defaultAvatars").html(b);$(".defaultAvatarSet").off("click").on("click",function(){$(".defaultAvatarSet").removeClass("defaultAvatarSelected");$(this).addClass("defaultAvatarSelected");$(".profile-img-option-container .default-option").trigger("click")})},
complete:function(){a.closest(".profile-img-option-container").find(".js-upload-progress").addClass("h-hide")},title_phrase:"edit_avatar"})}});$(".js-edit-profile").data("avatarmaxsize");var e=!1;$("#profilePhotoFile").off("click").on("click",function(){$(this).closest(".profile-img-option-container").find(".browse-option").trigger("click")}).fileupload({url:vBulletin.getAjaxBaseurl()+"/profile/upload-profilepicture",dropZone:$(".frmprofilePhoto"),dataType:"json",add:function(b,a){if(a.crop)a.crop.resized_width=
$("#profilePicImgCrop").width(),a.crop.resized_height=$("#profilePicImgCrop").height(),e.formData=a.crop,e.formData.securitytoken=pageData.securitytoken,e.submit(),closeUploader();else{e=a;var c=(b="undefined"!==typeof window.createObjectURL&&window||"undefined"!==typeof URL&&URL||"undefined"!==typeof webkitURL&&webkitURL)?b.createObjectURL(a.files[0]):$(a.fileInput).val();a=a.files[0].fileName||a.files[0].name;$(".profile-img-option-container .fileText").val(a);b?($("#btnProfilePhotoContinue").trigger("click"),
initIAS(),$("#profilePicImgCrop").attr("src",c)):(e.fileInput.attr("name","profilePhotoFull"),e.submit(),e.fileInput.attr("name","profilePhotoFile"),closeUploader())}},done:function(b,a){b=a.result||{errors:[["invalid_server_response_please_try_again"]]};if(b.errors)return vBulletin.ajaxtools.showApiError(b.errors,b,{title:"edit_avatar"}),!1;if(b.imageUrl)return $("#profilePhotoUrl").val(b.imageUrl).data("filedataid",b.filedataid),$("#profilePhotoUrl").trigger("focus"),$("#btnProfilePhotoContinue").trigger("click"),
!1;$("#defaultAvatars").html(b);$(".defaultAvatarSet").off("click").on("click",function(){$(".defaultAvatarSet").removeClass("defaultAvatarSelected");$(this).addClass("defaultAvatarSelected");$(".profile-img-option-container .default-option").trigger("click")});a=-1==b.avatarpath.indexOf("?")?"?":"&";b=b.avatarpath?b.avatarpath+a+"random="+Math.random():b[0];b=$("#profilePicImg").attr("src",pageData.baseurl_core+"/"+b).attr("src");$(".avatar-"+pageData.userid).attr("src",b);$("#profilePicImgCrop").attr("src",
"");$("#btnProfilePhotoClose").trigger("click")},fail:function(b,a){b="error";if(a&&0<a.files.length)switch(a.files[0].error){case "acceptFileTypes":b="warning"}vBulletin.alert("upload","error",b,function(){c.find(".fileText").val("");c.find(".browse-option").focus()})},always:function(b,a){c.find(".js-upload-progress").addClass("h-hide");c.find("input,button").prop("disabled",!1);c.find(".js-upload-button").removeClass("h-disabled");return!1}});$("#profilePhotoUrl").off("focus").on("focus",function(){$(this).closest(".profile-img-option-container").find(".url-option").trigger("click")})};
cropProfilePhoto=function(a){if(""==$("#profilePicImgCrop").attr("src"))return closeUploader(),vBulletin.error("edit_avatar","please_select_a_image_to_crop"),$("#btnProfilePhotoSave").addClass("h-hide-imp"),$("#btnProfilePhotoContinue").removeClass("h-hide-imp"),$("div#cropFrame").addClass("h-hide"),$("div#uploadFrame").removeClass("h-hide"),!1;a={crop:{}};var c=$(".js-edit-profile"),e=c.data("avatarmaxwidth");c=c.data("avatarmaxheight");a.crop.x1=$("#x1").val()||0;a.crop.x2=$("#x2").val()||e;a.crop.y1=
$("#y1").val()||0;a.crop.y2=$("#y2").val()||c;a.crop.width=$("#width").val()||e;a.crop.height=$("#height").val()||c;a.crop.resized_width=$("#profilePicImgCrop").width();a.crop.resized_height=$("#profilePicImgCrop").height();a.securitytoken=pageData.securitytoken;e=$("[name=profile-img-option]:checked").val();"1"==e?(a.files=$("#profilePhotoFile"),a.url=pageData.baseurl+"/profile/upload-profilepicture",$("#profilePhotoFile").fileupload("add",a)):"2"==e&&(a.profilePhotoUrl=$("#profilePhotoUrl").val(),
a.filedataid=$("#profilePhotoUrl").data("filedataid"),vBulletin.AJAX({url:vBulletin.getAjaxBaseurl()+"/profile/upload-profilepicture",data:a,success:function(b){var a=-1==b.avatarpath.indexOf("?")?"?":"&";b=b.avatarpath?b.avatarpath+a+"random="+Math.random():b[0];b=$("#profilePicImg").attr("src",pageData.baseurl_core+"/"+b).attr("src");$(".avatar-"+pageData.userid).attr("src",b);$("#profilePicImgCrop").attr("src","");$("#btnProfilePhotoClose").trigger("click");$("#profilePhotoUrl").data("filedataid",
"")}}));resetCropValues()};resetCropValues=function(){$("#x1").val("");$("#x2").val("");$("#y1").val("");$("#y2").val("")};
initIAS=function(){var a=!1,c=$("#profilePicImgCrop"),e=$(".js-edit-profile"),b=e.data("avatarmaxwidth"),d=e.data("avatarmaxheight");c.off("load").on("load",function(){if(!a){c[0].style.setProperty("max-width","none","important");c[0].style.setProperty("max-height","none","important");var e=c.width(),g=c.height();c[0].style.setProperty("max-width","");c[0].style.setProperty("max-height","");e>b||g>d?(a=!0,e=c.width(),g=c.height(),e=Math.min(b,d,e,g),ias=c.imgAreaSelect({aspectRatio:"1:1",handles:!0,
zIndex:1012,enable:!0,show:!0,x1:0,y1:0,x2:e,y2:e,onSelectChange:setDimensions,resizeMargin:"ontouchstart"in document?30:15,instance:!0,keys:!0,persistent:!0}),modifyIasForTouch("enable"),resizeAvatarEditDialog()):$("#btnProfilePhotoSave").trigger("click")}})};
function resizeAvatarEditDialog(){var a=$("#editProfilePhotoDlg");a.dialog("option","position",{my:"center",at:"center",of:window,collision:"flipfit"});var c=$(".profile-photo-wrapper",a);c.height("auto");var e=$(window).height(),b=a.closest(".edit-profile-photo-dialog-container").height(),d=c.height();a=$("#profilePicImgCrop");var k=a.imgAreaSelect({instance:!0});b>e&&(c.height(d-(b-e)),e=$(".js-edit-profile"),c=e.data("avatarmaxwidth"),e=e.data("avatarmaxheight"),b=a.width(),d=a.height(),c=Math.min(c,
e,b,d),a.imgAreaSelect({x1:0,y1:0,x2:c,y2:c}));k.update()}
function modifyIasForTouch(a){function c(a){var b=a.originalEvent.touches;if(!(1<b.length)){var c={touchstart:"mousedown",touchmove:"mousemove",touchend:"mouseup",touchcancel:"mouseout"};if("undefined"!=typeof c[a.type]){var e=b[0];b={bubbles:!0,cancelable:!1,view:window,detail:1,screenX:0,screenY:0,clientX:0,clientY:0,ctrlKey:!1,altKey:!1,shiftKey:!1,metaKey:!1,button:0,buttons:0,relatedTarget:null};try{b.screenX=e.screenX,b.screenY=e.screenY,b.clientX=e.clientX,b.clientY=e.clientY}catch(g){}"touchstart"==
a.type&&(b.buttons=0,e=new MouseEvent("mousemove",b),a.target.dispatchEvent(e));b.buttons=1;c=new MouseEvent(c[a.type],b);a.target.dispatchEvent(c);if(a.target.className.match(/imgareaselect-/))return a.preventDefault(),!1}}}"ontouchstart"in document&&("enable"==a?($(document).off(".iastouch").on("touchstart.iastouch touchmove.iastouch touchend.iastouch touchcancel.iastouch",c),$("#editProfilePhotoDlg").css("-webkit-touch-callout","none"),$("body, html").addClass("h-prevent-scroll-v")):($(document).off(".iastouch"),
$("#editProfilePhotoDlg").css("-webkit-touch-callout","default"),$("body, html").removeClass("h-prevent-scroll-v")))}
setDefaultAvatar=function(a){var c=$("#editProfilePhotoDlg");c.find(".js-upload-progress").removeClass("h-hide");c.find("button, input").prop("disabled",!0);c.find(".js-upload-button").addClass("h-disabled");vBulletin.AJAX({call:"/profile/set-default-avatar",data:{avatarid:a},success:function(a){a=$("#profilePicImg").attr("src",pageData.baseurl_core+"/"+a.avatarpath).attr("src");$(".avatar-"+pageData.userid).attr("src",a);c.dialog("close");c.find("form").trigger("reset")},complete:function(){c.find(".js-upload-progress").addClass("h-hide");
c.find("input,button").prop("disabled",!1);c.find(".js-upload-button").removeClass("h-disabled")},title_phrase:"edit_avatar"})};setDimensions=function(a,c){$("#x1").val(c.x1);$("#y1").val(c.y1);$("#x2").val(c.x2);$("#y2").val(c.y2);$("#width").val(c.width);$("#height").val(c.height)};
resetAvatar=function(){vBulletin.AJAX({call:"/profile/resetAvatar",success:function(a){a=$("#profilePicImg").attr("src",pageData.baseurl_core+"/"+a.avatarpath).attr("src");$(".avatar-"+pageData.userid).attr("src",a);$("#btnProfilePhotoClose").trigger("click");$("#editProfilePhotoDlg").find("form").trigger("reset")},complete:function(){var a=$("#editProfilePhotoDlg");a.find(".js-upload-progress").addClass("h-hide");a.find("input,button").prop("disabled",!1);a.find(".js-upload-button").removeClass("h-disabled")}})};
closeUploader=function(){modifyIasForTouch("disable");$("#profilePicImgCrop").imgAreaSelect({remove:!0});null!=ias&&(ias=null);$("#profilePhotoFile").removeData(["fileupload","blueimp.fileupload.form"])};
;

// ***************************
// js.compressed/jquery/jquery.imgareaselect.min.js
// ***************************
/*
 imgAreaSelect jQuery plugin
 version 0.9.10

 Copyright (c) 2008-2013 Michal Wojciechowski (odyniec.net)

 Dual licensed under the MIT (MIT-LICENSE.txt)
 and GPL (GPL-LICENSE.txt) licenses.

 http://odyniec.net/projects/imgareaselect/

*/
(function(b){function C(){return b("<div/>")}var D=Math.abs,n=Math.max,p=Math.min,e=Math.round;b.imgAreaSelect=function(A,c){function P(a){return a+B.left-w.left}function Q(a){return a+B.top-w.top}function K(a){return a-B.left+w.left}function L(a){return a-B.top+w.top}function G(a){var c=a||V;a=a||W;return{x1:e(d.x1*c),y1:e(d.y1*a),x2:e(d.x2*c),y2:e(d.y2*a),width:e(d.x2*c)-e(d.x1*c),height:e(d.y2*a)-e(d.y1*a)}}function ka(a,c,b,g,f){var h=f||V;f=f||W;d={x1:e(a/h||0),y1:e(c/f||0),x2:e(b/
h||0),y2:e(g/f||0)};d.width=d.x2-d.x1;d.height=d.y2-d.y1}function M(){ba&&x.width()&&(B={left:e(x.offset().left),top:e(x.offset().top)},y=x.innerWidth(),v=x.innerHeight(),B.top+=x.outerHeight()-v>>1,B.left+=x.outerWidth()-y>>1,X=e(c.minWidth/V)||0,Y=e(c.minHeight/W)||0,la=e(p(c.maxWidth/V||16777216,y)),ma=e(p(c.maxHeight/W||16777216,v)),"1.3.2"!=b().jquery||"fixed"!=ca||na.getBoundingClientRect||(B.top+=n(document.body.scrollTop,na.scrollTop),B.left+=n(document.body.scrollLeft,na.scrollLeft)),w=/absolute|relative/.test(R.css("position"))?
{left:e(R.offset().left)-R.scrollLeft(),top:e(R.offset().top)-R.scrollTop()}:"fixed"==ca?{left:b(document).scrollLeft(),top:b(document).scrollTop()}:{left:0,top:0},q=P(0),r=Q(0),(d.x2>y||d.y2>v)&&da())}function ea(a){if(fa){l.css({left:P(d.x1),top:Q(d.y1)}).add(S).width(H=d.width).height(N=d.height);S.add(u).add(t).css({left:0,top:0});u.width(n(H-u.outerWidth()+u.innerWidth(),0)).height(n(N-u.outerHeight()+u.innerHeight(),0));b(m[0]).css({left:q,top:r,width:d.x1,height:v});b(m[1]).css({left:q+d.x1,
top:r,width:H,height:d.y1});b(m[2]).css({left:q+d.x2,top:r,width:y-d.x2,height:v});b(m[3]).css({left:q+d.x1,top:r+d.y2,width:H,height:v-d.y2});H-=t.outerWidth();N-=t.outerHeight();switch(t.length){case 8:b(t[4]).css({left:H>>1}),b(t[5]).css({left:H,top:N>>1}),b(t[6]).css({left:H>>1,top:N}),b(t[7]).css({top:N>>1});case 4:t.slice(1,3).css({left:H}),t.slice(2,4).css({top:N})}if(!1!==a&&(b.imgAreaSelect.onKeyPress!=wa&&b(document).off(b.imgAreaSelect.keyPress,b.imgAreaSelect.onKeyPress),c.keys))b(document)[b.imgAreaSelect.keyPress](b.imgAreaSelect.onKeyPress=
wa);T&&2==u.outerWidth()-u.innerWidth()&&(u.css("margin",0),setTimeout(function(){u.css("margin","auto")},0))}}function oa(a){M();ea(a);g=P(d.x1);f=Q(d.y1);h=P(d.x2);k=Q(d.y2)}function pa(a,b){c.fadeSpeed?a.fadeOut(c.fadeSpeed,b):a.hide()}function O(a){var b=K(a.pageX-w.left)-d.x1;a=L(a.pageY-w.top)-d.y1;qa||(M(),qa=!0,l.one("mouseout",function(){qa=!1}));z="";c.resizable&&(a<=c.resizeMargin?z="n":a>=d.height-c.resizeMargin&&(z="s"),b<=c.resizeMargin?z+="w":b>=d.width-c.resizeMargin&&(z+="e"));l.css("cursor",
z?z+"-resize":c.movable?"move":"");ha&&ha.toggle()}function xa(a){b("body").css("cursor","");(c.autoHide||0==d.width*d.height)&&pa(l.add(m),function(){b(this).hide()});b(document).off("mousemove",ra);l.mousemove(O);c.onSelectEnd(A,G())}function ya(a){if(1!=a.which)return!1;M();z?(b("body").css("cursor",z+"-resize"),g=P(d[/w/.test(z)?"x2":"x1"]),f=Q(d[/n/.test(z)?"y2":"y1"]),b(document).mousemove(ra).one("mouseup",xa),l.off("mousemove",O)):c.movable?(sa=q+d.x1-(a.pageX-w.left),ta=r+d.y1-(a.pageY-w.top),
l.off("mousemove",O),b(document).mousemove(za).one("mouseup",function(){c.onSelectEnd(A,G());b(document).off("mousemove",za);l.mousemove(O)})):x.mousedown(a);return!1}function Z(a){I&&(a?(h=n(q,p(q+y,g+D(k-f)*I*(h>g||-1))),k=e(n(r,p(r+v,f+D(h-g)/I*(k>f||-1)))),h=e(h)):(k=n(r,p(r+v,f+D(h-g)/I*(k>f||-1))),h=e(n(q,p(q+y,g+D(k-f)*I*(h>g||-1)))),k=e(k)))}function da(){g=p(g,q+y);f=p(f,r+v);D(h-g)<X&&(h=g-X*(h<g||-1),h<q?g=q+X:h>q+y&&(g=q+y-X));D(k-f)<Y&&(k=f-Y*(k<f||-1),k<r?f=r+Y:k>r+v&&(f=r+v-Y));h=n(q,
p(h,q+y));k=n(r,p(k,r+v));Z(D(h-g)<D(k-f)*I);D(h-g)>la&&(h=g-la*(h<g||-1),Z());D(k-f)>ma&&(k=f-ma*(k<f||-1),Z(!0));d={x1:K(p(g,h)),x2:K(n(g,h)),y1:L(p(f,k)),y2:L(n(f,k)),width:D(h-g),height:D(k-f)};ea();c.onSelectChange(A,G())}function ra(a){h=/w|e|^$/.test(z)||I?a.pageX-w.left:P(d.x2);k=/n|s|^$/.test(z)||I?a.pageY-w.top:Q(d.y2);da();return!1}function aa(a,e){h=(g=a)+d.width;k=(f=e)+d.height;b.extend(d,{x1:K(g),y1:L(f),x2:K(h),y2:L(k)});ea();c.onSelectChange(A,G())}function za(a){g=n(q,p(sa+(a.pageX-
w.left),q+y-d.width));f=n(r,p(ta+(a.pageY-w.top),r+v-d.height));aa(g,f);a.preventDefault();return!1}function ua(){b(document).off("mousemove",ua);M();h=g;k=f;da();z="";m.is(":visible")||l.add(m).hide().fadeIn(c.fadeSpeed||0);fa=!0;b(document).off("mouseup",ia).mousemove(ra).one("mouseup",xa);l.off("mousemove",O);c.onSelectStart(A,G())}function ia(){b(document).off("mousemove",ua).off("mouseup",ia);pa(l.add(m));ka(K(g),L(f),K(g),L(f));this instanceof b.imgAreaSelect||(c.onSelectChange(A,G()),c.onSelectEnd(A,
G()))}function Aa(a){if(1!=a.which||m.is(":animated"))return!1;M();sa=g=a.pageX-w.left;ta=f=a.pageY-w.top;b(document).mousemove(ua).mouseup(ia);return!1}function Ba(){oa(!1)}function Ca(){ba=!0;va(c=b.extend({classPrefix:"imgareaselect",movable:!0,parent:"body",resizable:!0,resizeMargin:10,onInit:function(){},onSelectStart:function(){},onSelectChange:function(){},onSelectEnd:function(){}},c));l.add(m).css({visibility:""});c.show&&(fa=!0,M(),ea(),l.add(m).hide().fadeIn(c.fadeSpeed||0));setTimeout(function(){c.onInit(A,
G())},0)}function ja(a,b){for(var d in b)void 0!==c[d]&&a.css(b[d],c[d])}function va(a){a.parent&&(R=b(a.parent)).append(l.add(m));b.extend(c,a);M();if(null!=a.handles){t.remove();t=b([]);for(U=a.handles?"corners"==a.handles?4:8:0;U--;)t=t.add(C());t.addClass(c.classPrefix+"-handle").css({position:"absolute",fontSize:0,zIndex:J+1||1});0<=!parseInt(t.css("width"))&&t.width(5).height(5);(F=c.borderWidth)&&t.css({borderWidth:F,borderStyle:"solid"});ja(t,{borderColor1:"border-color",borderColor2:"background-color",
borderOpacity:"opacity"})}V=c.imageWidth/y||1;W=c.imageHeight/v||1;null!=a.x1&&(ka(a.x1,a.y1,a.x2,a.y2),a.show=!a.hide);a.keys&&(c.keys=b.extend({shift:1,ctrl:"resize"},a.keys));m.addClass(c.classPrefix+"-outer");S.addClass(c.classPrefix+"-selection");for(U=0;4>U++;)b(u[U-1]).addClass(c.classPrefix+"-border"+U);ja(S,{selectionColor:"background-color",selectionOpacity:"opacity"});ja(u,{borderOpacity:"opacity",borderWidth:"border-width"});ja(m,{outerColor:"background-color",outerOpacity:"opacity"});
(F=c.borderColor1)&&b(u[0]).css({borderStyle:"solid",borderColor:F});(F=c.borderColor2)&&b(u[1]).css({borderStyle:"dashed",borderColor:F});l.append(S.add(u).add(ha)).append(t);T&&((F=(m.css("filter")||"").match(/opacity=(\d+)/))&&m.css("opacity",F[1]/100),(F=(u.css("filter")||"").match(/opacity=(\d+)/))&&u.css("opacity",F[1]/100));a.hide?pa(l.add(m)):a.show&&ba&&(fa=!0,l.add(m).fadeIn(c.fadeSpeed||0),oa());I=(Da=(c.aspectRatio||"").split(/:/))[0]/Da[1];x.add(m).off("mousedown",Aa);if(c.disable||!1===
c.enable)l.off("mousemove",O).off("mousedown",ya),b(window).off("resize",Ba);else{if(c.enable||!1===c.disable)(c.resizable||c.movable)&&l.mousemove(O).mousedown(ya),b(window).resize(Ba);c.persistent||x.add(m).mousedown(Aa)}c.enable=c.disable=void 0}var x=b(A),ba,l=C(),S=C(),u=C().add(C()).add(C()).add(C()),m=C().add(C()).add(C()).add(C()),t=b([]),ha,q,r,B={left:0,top:0},y,v,R,w={left:0,top:0},J=0,ca="absolute",sa,ta,V,W,z,X,Y,la,ma,I,fa,g,f,h,k,d={x1:0,y1:0,x2:0,y2:0,width:0,height:0},na=document.documentElement,
E=navigator.userAgent,Da,U,F,H,N,qa,wa=function(a){var b=c.keys,d=a.keyCode;var e=isNaN(b.alt)||!a.altKey&&!a.originalEvent.altKey?!isNaN(b.ctrl)&&a.ctrlKey?b.ctrl:!isNaN(b.shift)&&a.shiftKey?b.shift:isNaN(b.arrows)?10:b.arrows:b.alt;if("resize"==b.arrows||"resize"==b.shift&&a.shiftKey||"resize"==b.ctrl&&a.ctrlKey||"resize"==b.alt&&(a.altKey||a.originalEvent.altKey)){switch(d){case 37:e=-e;case 39:a=n(g,h);g=p(g,h);h=n(a+e,g);Z();break;case 38:e=-e;case 40:a=n(f,k);f=p(f,k);k=n(a+e,f);Z(!0);break;
default:return}da()}else switch(g=p(g,h),f=p(f,k),d){case 37:aa(n(g-e,q),f);break;case 38:aa(g,n(f-e,r));break;case 39:aa(g+p(e,y-K(h)),f);break;case 40:aa(g,f+p(e,v-L(k)));break;default:return}return!1};this.remove=function(){va({disable:!0});l.add(m).remove()};this.getOptions=function(){return c};this.setOptions=va;this.getSelection=G;this.setSelection=ka;this.cancelSelection=ia;this.update=oa;var T=(/msie ([\w.]+)/i.exec(E)||[])[1],Ea=/opera/i.test(E),Fa=/webkit/i.test(E)&&!/chrome/i.test(E);for(E=
x;E.length;)J=n(J,isNaN(E.css("z-index"))?J:E.css("z-index")),"fixed"==E.css("position")&&(ca="fixed"),E=E.parent(":not(body)");J=c.zIndex||J;T&&x.attr("unselectable","on");b.imgAreaSelect.keyPress=T||Fa?"keydown":"keypress";Ea&&(ha=C().css({width:"100%",height:"100%",position:"absolute",zIndex:J+2||2}));l.add(m).css({visibility:"hidden",position:ca,overflow:"hidden",zIndex:J||"0"});l.css({zIndex:J+2||2});S.add(u).css({position:"absolute",fontSize:0});A.complete||"complete"==A.readyState||!x.is("img")?
Ca():x.one("load",Ca);!ba&&T&&7<=T&&(A.src=A.src)};b.fn.imgAreaSelect=function(e){e=e||{};this.each(function(){b(this).data("imgAreaSelect")?e.remove?(b(this).data("imgAreaSelect").remove(),b(this).removeData("imgAreaSelect")):b(this).data("imgAreaSelect").setOptions(e):e.remove||(void 0===e.enable&&void 0===e.disable&&(e.enable=!0),b(this).data("imgAreaSelect",new b.imgAreaSelect(this,e)))});return e.instance?b(this).data("imgAreaSelect"):this}})(jQuery);
;
