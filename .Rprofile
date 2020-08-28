# set some options
options(
    blogdown.author = "Tom Elliott",
    blogdown.ext = ".Rmd",
    editor = if (!is.null(Sys.getenv("VISUAL"))) Sys.getenv("VISUAL") else ""
)

publish <- function(msg = "Build site for publishing.") {
    unlink("public", TRUE, TRUE)
    blogdown::build_site()
    system("git add .")
    system(sprintf("git commit -am '%s'", msg))
    system("git push")
    system("git subtree push --prefix public origin gh-pages")
}

new_content <- function(filename, type = "post", ext = "Rmd") {
    blogdown::new_content(
        file.path(type, paste(filename, ext, sep = "."))
    )
}

relurl <- function(url) {
    paste0(blogdown:::site_base_dir(), url)
}

if (interactive() && toupper(readline('Serve site? [Y,n] ')) %in% c("", "Y"))
    blogdown::serve_site()
