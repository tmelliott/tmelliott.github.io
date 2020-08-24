# set some options
options(
    blogdown.author = "Tom Elliott",
    blogdown.ext = ".Rmd"
)

publish <- function(commit) {
    blogdown::build_site()
    system("git commit -am 'Build site for publishing.'")
    system("git subtree push --prefix public origin gh-pages")
}

if (interactive() && toupper(readline('Serve site? [Y,n] ')) %in% c("", "Y"))
    blogdown::serve_site()
