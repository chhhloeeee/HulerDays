package controller

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"

	"github.com/HulerDays/model"

	"github.com/HulerDays/config"
)

// AllUsers = Select Employee API
func AllUsers(w http.ResponseWriter, r *http.Request) {
	var users model.Users
	var response model.UserResponse
	var arrUsers []model.Users

	db := config.Connect()
	defer db.Close()

	rows, err := db.Query("SELECT id, email, password, holiday, isManager, managerId from users")

	if err != nil {
		log.Print(err)
	}

	for rows.Next() {
		err = rows.Scan(&users.Id, &users.Email, &users.Password, &users.Holiday, &users.IsManager, &users.ManagerId)
		if err != nil {
			log.Fatal(err.Error())
		} else {
			arrUsers = append(arrUsers, users)
		}
	}

	response.Status = 200
	response.Message = "Success"
	response.Data = arrUsers

	w.Header().Set("Content-Type", "application/json")
	w.Header().Set("Access-Control-Allow-Origin", "*")
	json.NewEncoder(w).Encode(response)
}

// InsertUser = Insert User API
func InsertUser(w http.ResponseWriter, r *http.Request) {
	var response model.UserResponse

	db := config.Connect()
	defer db.Close()

	err := r.ParseMultipartForm(4096)
	if err != nil {
		panic(err)
	}
	email := r.FormValue("email")
	password := r.FormValue("password")
	holiday := r.FormValue("holiday")
	isManager := r.FormValue("isManager")
	managerId := r.FormValue("managerId")

	_, err = db.Exec("INSERT INTO users(email, password, holiday, isManager, managerId) VALUES(?, ?, ?, ?, ?)", email, password, holiday, isManager, managerId)

	if err != nil {
		log.Print(err)
		return
	}
	response.Status = 200
	response.Message = "Insert data successfully"
	fmt.Print("Insert data to database")

	w.Header().Set("Content-Type", "application/json")
	w.Header().Set("Access-Control-Allow-Origin", "*")
	json.NewEncoder(w).Encode(response)
}
