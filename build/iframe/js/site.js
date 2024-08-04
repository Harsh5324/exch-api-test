// Please see documentation at https://docs.microsoft.com/aspnet/core/client-side/bundling-and-minification
// for details on configuring this project to bundle and minify static web assets.

// Write your JavaScript code.
$(document).ready(function () {
    SIR("addWidget", ".sr-widget-1", "match.lmtPlus", {
        showOdds: false,
        layout: "double",
        scoreboard: "extended",
        collapseTo: "momentum",
        tabsPosition: "top",
        goalBannerCustomBgColor: "#FFFFFF",
        matchId: window.location.href.split("=")[1].split("&")[0],
    });

    //$("#__scoreFrame").attr('src', `https://score.onlyscore.live/Scorebord?id=${$("#__mid").text()}`);

    /* aboutReload();*/
});

//function aboutReload() {

//   var ifrm = document.createElement('iframe');
//    ifrm.style.width = '1px';
//    ifrm.style.minWidth = '100%';
//    ifrm.style.minheight = '750px';
//    ifrm.setAttribute('src', 'javascript:void 0');
//    ifrm.setAttribute('frameborder', 0);
//    //ifrm.setAttribute('scrolling', 'no');
//    ifrm.setAttribute('allowfullscreen', '');
//    ifrm.setAttribute('allow', 'autoplay');
//    ifrm.setAttribute('id', 'tvbet-iframe');
//    document.getElementById("Reloader").appendChild(ifrm);
//    ifrm.src = "http://localhost:57983/login?Token=dZb7NkWKB8OW6oVIhp0wWbuJJeZ%2fP%2bRp6YFa14NGAsa9KesIOHZ7ll1ZZe%2bL6L2nR6Pg1tpLxDSOd0T1djS92g%3d%3d";
//}
