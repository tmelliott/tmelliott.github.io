# set some options
options(
    blogdown.author = "Tom Elliott",
    blogdown.ext = ".Rmd"
)

publish <- function(msg = "Build site for publishing.") {
    unlink("public", TRUE, TRUE)
    blogdown::build_site()
    system(sprintf("git commit -am '%s'", msg))
    system("git push")
    system("git subtree push --prefix public origin gh-pages")
}

if (interactive() && toupper(readline('Serve site? [Y,n] ')) %in% c("", "Y"))
    blogdown::serve_site()
