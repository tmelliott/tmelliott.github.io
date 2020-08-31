local:
	@Rscript -e "blogdown::serve_site()"

build:
	@rm -rf public
	@Rscript -e "blogdown::build_site()"
