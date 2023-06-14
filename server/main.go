package main

import (
	"fmt"
	"log"
	"net/http"

	_ "github.com/go-sql-driver/mysql"
	"github.com/gorilla/mux"

	"github.com/HulerDays/controller"
)

func main() {
	router := mux.NewRouter()
	router.HandleFunc("/getUsers", controller.AllUsers).Methods("GET")
	router.HandleFunc("/getUserById", controller.GetUserById).Methods("GET")
	router.HandleFunc("/addUser", controller.InsertUser).Methods("POST")
	router.HandleFunc("/updateUser", controller.UpdateUser).Methods("PUT")
	router.HandleFunc("/deleteUser", controller.DeleteUser).Methods("DELETE", "OPTIONS")
	router.HandleFunc("/getRequests", controller.AllRequests).Methods("GET")
	router.HandleFunc("/getRequestByLeaveId", controller.GetRequestbyLeaveId).Methods("GET")
	router.HandleFunc("/getRequestByUserId", controller.GetRequestbyUserId).Methods("GET")
	router.HandleFunc("/addRequest", controller.Insertrequest).Methods("POST")
	router.HandleFunc("/updateRequest", controller.UpdateRequest).Methods("PUT", "OPTIONS")
	router.HandleFunc("/deleteRequest", controller.DeleteRequest).Methods("DELETE", "OPTIONS")
	router.HandleFunc("/getRequestByManagerId", controller.GetRequestsByManagerId).Methods("GET")
	router.HandleFunc("/updateHolidayDays", controller.UpdateHolidayDays).Methods("PUT", "OPTIONS")
	http.Handle("/", router)
	fmt.Println("Connected to port 1234")
	log.Fatal(http.ListenAndServe(":1234", router))
}
