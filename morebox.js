const _serviceMethods = {
    getMaxNumber: $numberArray => {
        let max = 0;

        for (let number of $numberArray) {
            if (number > max) {
                max = number;
            }
        }

        return max;
    }
};
const _moreboxMethods = {
    getSingleLevelItemHeight: $items => {
        let firstItem = $items.filter(":first"),
            firstItemTop = firstItem.offset().top,
            arr = [];

        $items.each(function() {
            let _thisItem = $(this),
                thisItemTop = _thisItem.offset().top;

            if (thisItemTop === firstItemTop) {
                let height = _thisItem.outerHeight();
                arr.push(height);
            }
        });

        return arr;
    },
    initHeightToggle: ($btn, $btnText, $contentBox, $heightMax, $heightMin) => {
        $btn.on("click", function() {
            let _thisBtn = $(this),
                textOfThis = _thisBtn.text();

            if (textOfThis === $btnText) {
                _thisBtn.text("Hide");
                $contentBox.css({
                    "max-height": $heightMax
                });
            } else {
                _thisBtn.text($btnText);
                $contentBox.css({
                    "max-height": $heightMin
                });
            }
        });
    }
};

let morebox = $container => {
    $container.each(function() {
        let _container = $(this),
            content = _container.find("[data-morebox-content]"),
            contentItem = content.find("[data-morebox-item]"),
            button = _container.find("[data-morebox-btn]"),
            buttonOriginText = button.text(),
            contentHeight = content.outerHeight(),
            contentItemsHeights = _moreboxMethods.getSingleLevelItemHeight(
                contentItem
            ),
            contentItemMaxHeight = _serviceMethods.getMaxNumber(
                contentItemsHeights
            );

        content.css({
            "max-height": contentItemMaxHeight,
            overflow: "hidden",
            transition: "max-height 0.2s"
        });

        _moreboxMethods.initHeightToggle(
            button,
            buttonOriginText,
            content,
            contentHeight,
            contentItemMaxHeight
        );
    });
};

morebox($("[data-morebox]"));
