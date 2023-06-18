package main

import (
	"context"
	"log"
	"net/http"
	"os"
	"os/signal"
	"syscall"
	"time"

	"github.com/HulerDays/controller"
	"github.com/gorilla/handlers"
	"github.com/gorilla/mux"
)

//"github.com/gorilla/handlers"
type myServer struct {
	http.Server
	shutdownReq chan bool
}

// NewServer - this is the init function for the server process
func NewServer(port string) *myServer {

	//create server
	s := &myServer{
		Server: http.Server{
			Addr:         ":" + port,
			ReadTimeout:  30 * time.Second,
			WriteTimeout: 30 * time.Second,
		},
		shutdownReq: make(chan bool),
	}

	router := mux.NewRouter()

	//register handlers
	router.Handle("/getUsers", controller.AuthenticationContext(http.HandlerFunc(controller.AllUsers))).Methods("GET")
	router.HandleFunc("/getUserById", controller.GetUserById).Methods("GET")
	router.HandleFunc("/addUser", controller.InsertUser).Methods("POST")
	router.HandleFunc("/updateUser", controller.UpdateUser).Methods("PUT")
	router.HandleFunc("/deleteUser", controller.DeleteUser).Methods("DELETE", "OPTIONS")
	router.HandleFunc("/getRequests", controller.AllRequests).Methods("GET")
	router.HandleFunc("/getRequestByLeaveId", controller.GetRequestbyLeaveId).Methods("GET")
	router.HandleFunc("/getRequestByUserId", controller.GetRequestbyUserId).Methods("GET")
	router.HandleFunc("/getApprovedRequestByUserId", controller.GetApprovedRequestbyUserId).Methods("GET")
	router.HandleFunc("/addRequest", controller.Insertrequest).Methods("POST")
	router.HandleFunc("/updateRequest", controller.UpdateRequest).Methods("PUT", "OPTIONS")
	router.HandleFunc("/deleteRequest", controller.DeleteRequest).Methods("DELETE", "OPTIONS")
	router.HandleFunc("/getRequestByManagerId", controller.GetRequestsByManagerId).Methods("GET")
	router.HandleFunc("/addHolidayDays", controller.AddHolidayDays).Methods("PUT", "OPTIONS")
	router.HandleFunc("/removeHolidayDays", controller.RemoveHolidayDays).Methods("PUT", "GET")
	router.HandleFunc("/login", controller.Login).Methods("PUT", "GET")
	router.Handle("/logout", controller.AuthenticationContext(http.HandlerFunc(controller.Logout))).Methods("GET")
	// CORS stuff
	headersOk := handlers.AllowedHeaders([]string{"AUTH-TOKEN", "X-API-KEY", "X-Request-Token", "Content-Type"})
	originsOk := handlers.AllowedOrigins([]string{"*"})
	methodsOk := handlers.AllowedMethods([]string{"GET", "HEAD", "POST", "PUT", "DELETE", "OPTIONS"})
	s.Handler = handlers.CORS(headersOk, originsOk, methodsOk)(router)

	return s
}

func (s *myServer) WaitShutdown() {
	irqSig := make(chan os.Signal, 1)
	signal.Notify(irqSig, syscall.SIGINT, syscall.SIGTERM)

	//Wait interrupt or shutdown request through /shutdown
	select {
	case sig := <-irqSig:
		log.Printf("Shutdown request (signal: %v)", sig)
	case sig := <-s.shutdownReq:
		log.Printf("Shutdown request (/shutdown %v)", sig)
	}
	log.Printf("Stopping API server ...")
	close(Done)
	//Create shutdown context with 10 second timeout
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	//shutdown the server
	err := s.Shutdown(ctx)
	if err != nil {
		log.Printf("Shutdown request error: %v", err)
	}

}

func (s *myServer) RootHandler(w http.ResponseWriter, r *http.Request) {
	w.Write([]byte("Holidays\n"))
}
