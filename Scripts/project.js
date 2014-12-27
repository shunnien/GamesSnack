/// <reference path="_references.js" />
var snake = [];
var oDivSize = 500;
var dir = "left";
var fruit = null;
var snakeWidth = 20;
var t = null;

(function (window)
{
    $('#container').css({
        'position': 'absolute',
        'width': oDivSize + 'px',
        'height': oDivSize + 'px',
        'left': '350px',
        'top': '20px',
        'border': '15px solid rgba(35,150,60,1)'
    });
    
    init(400);
    $.each($('input'), function (indexInArray, valueOfElement)
    {
        var speed = 550;
        switch (indexInArray)
        {
            case 1:
                speed = 280;
                break;
            case 2:
                speed = 150;
                break;
            case 3:
                speed = 100;
                break;
            case 4:
                speed = 50;
                break;
            default:
                break;
        }
        $(valueOfElement).click(function() {
            changeLevel(valueOfElement, speed);
        });
    });

    $('body').keyup(function (event)
    {
        onKeyupEvent(event);
    });

    
})(window);

function changeLevel(valueOfElement, parameters)
{
    var first = snake[0];
    var fruitLeft = parseInt(fruit.css('left'));
    var fruitTop = parseInt(fruit.css('top'));
    var firstLeft = parseInt(first.css('left'));
    var firstTop = parseInt(first.css('top'));
    if (!(firstLeft == -snakeWidth || firstLeft == oDivSize || firstTop == -snakeWidth || firstTop == oDivSize))
    {
        clearInterval(t);
        t = setInterval(move, parameters);
        $('input').css('background','');
        $(valueOfElement).css('background', '#ae5');
    }
}

function move()
{
    for (var i = snake.length - 1; i > 0; i--)
    {
        var s = snake[i];
        var s2 = snake[i - 1];
        s.css('left', s2.css('left'));
        s.css('top', s2.css('top'));
    }
    var ss = snake[0];
    if (dir == "left")
    {
        ss.css('left', (parseInt(ss.css('left')) - snakeWidth) + "px");
    }
    else if (dir == "right")
    {
        ss.css('left', (parseInt(ss.css('left')) + snakeWidth) + "px");
    }
    else if (dir == "top")
    {
        ss.css('top', (parseInt(ss.css('top')) - snakeWidth) + "px");
    } else if (dir == "buttom")
    {
        ss.css('top', (parseInt(ss.css('top')) + snakeWidth) + "px");
    }
    check();
}
function init(appear)
{

    /// <summary>
    /// Initializes .
    /// </summary>
    /// <param name="appear">起始位置 x 座標</param>
    /// <returns></returns>
    for (var i = 0; i < 3; i++) {
        var oneSnake = create(appear + snakeWidth * i, snakeWidth * 2);
        snake.push(oneSnake);
        $('#container').append(oneSnake);
    }
    addFruit();
}

function create(left, top)
{
    /// <summary>
    /// 建立貪食蛇身體與食物點
    /// </summary>
    /// <param name="left">The left.</param>
    /// <param name="top">The top.</param>
    /// <returns></returns>
    var div = $('<div class="snacknode"></div>');
    div.css({
        'position': 'absolute',
        'width': snakeWidth + 'px',
        'height': snakeWidth + 'px',
        'left': left + 'px',
        'top': top + 'px',
        'border': '1px solid aqua'
    });
    return div;
}
function addFruit()
{
    var left = Math.floor(Math.random() * (oDivSize / snakeWidth)) * snakeWidth;
    var top = Math.floor(Math.random() * (oDivSize / snakeWidth)) * snakeWidth;
    for (i = 0; i < snake.length; i++)
    {
        var s = snake[i];
        if (left == parseInt(s.css('left')) && parseInt(top == s.css('top')))
        {
            addFruit();
            return;
        }
    }
    fruit = create(left, top);
    $('#container').append(fruit);
}

function onKeyupEvent(event)
{
    var code = event.keyCode;
    if (code == 38 && dir != "buttom")
    {
        dir = "top";
    } if (code == 40 && dir != "top")
    {
        dir = "buttom";
    } if (code == 37 && dir != "right")
    {
        dir = "left";
    } if (code == 39 && dir != "left")
    {
        dir = "right";
    }
    check();
}


function check()
{
    var num = 0;
    var first = snake[0];
    var fruitLeft = parseInt(fruit.css('left'));
    var fruitTop = parseInt(fruit.css('top'));
    var firstLeft = parseInt(first.css('left'));
    var firstTop = parseInt(first.css('top'));

    if (firstLeft == -snakeWidth
        || firstLeft == oDivSize
        || firstTop == -snakeWidth
        || firstTop == oDivSize)
    {
        clearInterval(t);
        var M = confirm('撞到牆壁，遊戲結束!是否重新開始？');
        if (M)
        {
            document.location.reload();
        } else
        {
            return false;
        }
        return null; //檢查是否撞到牆壁
    }
    for (var i = 1; i < snake.length ; i++)
    {
        var s = snake[i];
        if (firstLeft == parseInt(s.css('left')) && firstTop == parseInt(s.css('top')))
        {
            clearInterval(t);
            var N = confirm('撞到自身了，遊戲結束!是否重新開始？');
            if (N)
            {
                document.location.reload();
            } else
            {
                return false;
            }
            return null; //檢查是否撞到自身
        }
    }

    if ((dir == "buttom" && (fruitTop - firstTop == snakeWidth) && fruitLeft == firstLeft) ||
       (dir == "top" && (fruitTop - firstTop == -snakeWidth) && fruitLeft == firstLeft) ||
       (dir == "right" && (fruitLeft - firstLeft == snakeWidth) && fruitTop == firstTop) ||
       (dir == "left" && (fruitLeft - firstLeft == -snakeWidth) && fruitTop == firstTop))
    {
        var temp = [];
        temp.push(fruit);
        snake = temp.concat(snake);//吃了
        num++;
        addFruit();
    }
}