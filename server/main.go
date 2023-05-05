package main

import (
	"database/sql"
	"net/http"

	_ "github.com/go-sql-driver/mysql"
	"github.com/gorilla/mux"

	"github.com/HulerDays/controller"
)

var db *sql.DB
var err error

func main() {

	router := mux.NewRouter()

	router.HandleFunc("/users", controller.GetUsers).Methods("GET")
	router.HandleFunc("/users", controller.AddUsers).Methods("POST")
	router.HandleFunc("/users/{id}", controller.GetUser).Methods("GET")
	router.HandleFunc("/users/{id}", controller.UpdateUser).Methods("PUT")
	router.HandleFunc("/users/{id}", controller.DeleteUser).Methods("DELETE")

	// http.HandleFunc("/users", controller.ReturnAllUsers)
	// router.HandleFunc("/getUsers", controller.AllUsers).Methods("GET")
	// router.HandleFunc("/getUserById/{id}", controller.GetUserById).Methods("GET")
	// router.HandleFunc("/addUser", controller.InsertUser).Methods("POST")
	// router.HandleFunc("/updateUser", controller.UpdateUser).Methods("PUT")
	// router.HandleFunc("/deleteUser", controller.DeleteUser).Methods("DELETE")

	// router.HandleFunc("/getRequests", controller.AllRequests).Methods("GET")
	// router.HandleFunc("/getRequestByLeaveId", controller.GetRequestbyLeaveId).Methods("GET")
	// router.HandleFunc("/getRequestByUserId", controller.GetRequestbyUserId).Methods("GET")
	// router.HandleFunc("/addRequest", controller.Insertrequest).Methods("POST")
	// router.HandleFunc("/updateRequest", controller.UpdateRequest).Methods("PUT")
	// router.HandleFunc("/deleteRequest", controller.DeleteRequest).Methods("DELETE")
	// http.Handle("/", router)
	// fmt.Println("Connected to port 1234")
	http.ListenAndServe(":8000", router)
}
