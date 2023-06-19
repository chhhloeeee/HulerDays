package main

import (
	"fmt"
	"log"

	_ "github.com/go-sql-driver/mysql"

	"github.com/HulerDays/config"
	"github.com/HulerDays/controller"
)

var Done chan int

func main() {

	Done = make(chan int)

	//DB, err := config.Connect()
	t, err := config.Connect()
	if err != nil {
		log.Fatal("could not initialise connection with database")
	}
	controller.DB = t

	server := NewServer("1234")

	fmt.Printf("Starting Holiday Server on port %v\n", server.Addr)
	log.Printf("Starting Server on port %v\n", server.Addr)

	go func() {
		// This starts the HTTP server
		err := server.ListenAndServe()

		if err != nil {

			log.Fatalln("Cannot Start Server, exiting:", err.Error())

		}
	}()
	server.WaitShutdown()

}
