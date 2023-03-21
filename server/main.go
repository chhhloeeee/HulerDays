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
	router.HandleFunc("/insertUser", controller.InsertUser).Methods("POST")
	router.HandleFunc("/updateUser", controller.UpdateUser).Methods("PUT")
	router.HandleFunc("/deleteUser", controller.DeleteUser).Methods("DELETE")
	http.Handle("/", router)
	fmt.Println("Connected to port 1234")
	log.Fatal(http.ListenAndServe(":1234", router))
}
