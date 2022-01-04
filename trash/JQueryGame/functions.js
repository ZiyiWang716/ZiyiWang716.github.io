$(document).on('mousemove', function (e) {
    basket.css('left', e.pageX);
});

function goodnut_down(goodnut) {
    goodnut_current_position = parseInt(goodnut.css('top'));
    goodnut.css('top', goodnut_current_position + speed);
}

function check_goodnut_hits_floor(goodnut) {
    if (collision(goodnut, floor)) {
        show_badnut(goodnut);
        decrement_life();
        return true;
    }
    return false;
}

function set_goodnut_to_initial_position(goodnut) {
    goodnut.css('top', goodnut_initial_position);
}

function show_badnut(goodnut) {
    badnut_num = goodnut.attr('data-goodnut');
    $('#badnut' + badnut_num).show();
    hide_badnut(badnut_num);
}

function hide_badnut(badnut_num) {
    setTimeout(function () {
        $('#badnut' + badnut_num).hide();
    }, 800);
}

function decrement_life() {
    life--;
    life_span.text(life);
}

function check_goodnut_hits_basket(goodnut) {
    if (collision(goodnut, basket)) {
        goodnut_top = parseInt(goodnut.css('top'));
        if (goodnut_top < basket_top) {
            update_score();
            return true;
        }
    }
    return false;
}

function update_score() {
    score++;
    if (score % 10 === 0 && speed <= max_speed) {
        speed++;
    }
    score_span.text(score);
    score_1.text(score);
}

function stop_the_game() {
    cancelAnimationFrame(anim_id);
    restart.slideDown();
}

restart.click(function () {
    location.reload();
});