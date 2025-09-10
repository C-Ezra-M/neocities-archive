{
    const contents = $$("main > :not(h1:first-child)")
    const header = $("main > h1:first-child")

    $.create("div", { className: "page-content" })._.set({ after: header, contents })
    //$.create("div", { className: "gap", after: $("nav .page-menu") })
    $.create("dialog", {
        id: "footer-dialog",
        after: $("main"),
        contents: [
            $("footer"),
            $.create("form", {
                method: "dialog",
                contents: [
                    $.create("button", {
                        contents: ["Close"]
                    })
                ]
            }),
        ]
    })
    $.create("li", {
        contents: [
            $.create("button", { 
            events: {
                click: (e) => {
                    $("#footer-dialog").show()
                }
            },
            contents: ["ℹ️"],
            })
        ],
        after: $(".end-section > :last-child"),
    })
    // <li class="neocities-logo"><a href="https://neocities.org/site/cezram"><img src="/neocities.png" alt="Hosted by Neocities"></a></li>
    $.create("li", {
        className: "profile-bar",
        contents: [
            $.create("a", {
                href: "https://neocities.org/site/cezram",
                className: "profile-picture-frame",
                contents: [
                    $.create("img", {
                        src: "/neocitieslogo.png",
                        height: 75,
                        alt: "Neocities logo",
                    })
                ],
            })
        ],
        before: $(".page-menu > :first-child"),
    })
}