$(function () {

    the_game = function () {

        if (check_goodnut_hits_floor(goodnut1) || check_goodnut_hits_basket(goodnut1)) {
            set_goodnut_to_initial_position(goodnut1);
        } else {
            goodnut_down(goodnut1);
        }

        if (check_goodnut_hits_floor(goodnut2) || check_goodnut_hits_basket(goodnut2)) {
            set_goodnut_to_initial_position(goodnut2);
        } else {
            goodnut_down(goodnut2);
        }

        if (check_goodnut_hits_floor(goodnut3) || check_goodnut_hits_basket(goodnut3)) {
            set_goodnut_to_initial_position(goodnut3);
        } else {
            goodnut_down(goodnut3);
        }

        if (life > 0) {
            anim_id = requestAnimationFrame(the_game);
        } else {
            stop_the_game();
        }
    };

    anim_id = requestAnimationFrame(the_game);

});