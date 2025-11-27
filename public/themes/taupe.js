{
    $("html").dataset.bsTheme = "dark";
    $("html").classList.add("dark");
    $$(".table-light").forEach(e => {
        e.classList.remove("table-light")
        e.classList.add("table-dark")
    })
    $$(".bg-light").forEach(e => {
        e.classList.remove("bg-light")
        e.classList.add("bg-dark")
    })
}