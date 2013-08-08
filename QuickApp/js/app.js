var RouteManger=(function($){
    var currentRoute;
    var route={};

    function execFuncList(){
        var i=0;
        var _currentFuncList=route[currentRoute];
        if(typeof _currentFuncList ===undefined){
            return;
        }
        for(i;i<_currentFuncList.length;i++){
            _currentFuncList[i]();
        }
    }

    function changeRoute(routeName){
        if(routeName===currentRoute){
            return;
        }
        currentRoute=routeName;
        execFuncList();
    }

    function on(routeName,func){
        if($.isArray(route[routeName])){
            route[routeName].push(func);
        }else{
            route[routeName]=[func];
        }
    }

    function reExec(){
        execFuncList();
    }


    return {
        on:on,
        changeRoute:changeRoute,
        route:route
    };



})(jQuery);



var app=(function($){
    var route={
        'main.html':function(){
            $.get('index.html').done(function(result){
                $('body').html(result);
                RouteManger.changeRoute('index.html')
            });
        },
        'index.html':function(){
            $('a').on('click',function(e){
                e.preventDefault();
                var url=$(this).attr('href');
                $.get(url).done(function(result){
                    alert(result);
                });
                return false;
            });
        }
    };

    function init(){
        var key;
        for(key in route){
            RouteManger.on(key,route[key]);
        }
    };



    return {
        run:function(){
            $(function(){
                init();
                RouteManger.changeRoute('main.html');
            });

        }
    };



})(jQuery,RouteManger);

app.run();