package main

import (
	"flag"
	"fmt"
	"github.com/NYTimes/gziphandler"
	"log"
	"net/http"
	"net/http/httputil"
	"net/url"
	"os"
	"time"
)

const Version = "0.0.0"

// Backend for the Frontend
func main() {

	bind := flag.String("server.bind", ":1313", "Web server bind address")
	ver := flag.Bool("v", false, "Print version and exit")
	faktAPIHost := flag.String("api.fakt.host", "http://localhost:8080/api/v1", "Proxy api to avoid CORS crap")

	flag.Parse()

	if *ver {
		fmt.Printf("%s", Version)
		os.Exit(0)
	}

	//public assets
	staticFileServer := http.FileServer(http.Dir("ui/public"))

	//routing
	mux := http.NewServeMux()
	mux.Handle("/ui/", http.RedirectHandler("/", http.StatusMovedPermanently))
	mux.Handle("/", http.StripPrefix("/", gziphandler.GzipHandler(staticFileServer)))

	//API proxy
	apiHostParsed, err := url.Parse(*faktAPIHost)
	if err != nil {
		log.Fatalf("Invalid URL for api.host: %s", *faktAPIHost)
	}
	log.Printf("Proxying API calls to: %s", apiHostParsed)
	mux.Handle(
		"/api/v1/",
		http.StripPrefix("/api/v1/", httputil.NewSingleHostReverseProxy(apiHostParsed)),
	)

	for true {
		log.Printf("Listening on %s", *bind)
		err := http.ListenAndServe(*bind, mux)
		log.Printf("SERVER FAILED: %s", err.Error())
		time.Sleep(1 * time.Second) //retry in 1 second
	}
}
