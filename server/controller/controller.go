package controller

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"

	"github.com/HulerDays/model"

	"github.com/HulerDays/config"
)

// AllUsers = Select User API
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

// GetUserById = Select User by Id API
func GetUserById(w http.ResponseWriter, r *http.Request) {
	var users model.Users
	var response model.UserResponse
	var arrUsers []model.Users

	db := config.Connect()
	defer db.Close()

	id := r.FormValue("id")

	rows, err := db.Query("SELECT id, email, password, holiday, isManager, managerId from users WHERE id=?", id)

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

// UpdateUser = Update User API
func UpdateUser(w http.ResponseWriter, r *http.Request) {
	var response model.UserResponse

	db := config.Connect()
	defer db.Close()

	err := r.ParseMultipartForm(4096)

	if err != nil {
		panic(err)
	}
	id := r.FormValue("id")
	email := r.FormValue("email")
	password := r.FormValue("password")
	holiday := r.FormValue("holiday")
	isManager := r.FormValue("isManager")
	managerId := r.FormValue("managerId")

	_, err = db.Exec("UPDATE users SET email=?, password=?, holiday=?, isManager=?, managerId=? WHERE id=?", email, password, holiday, isManager, managerId, id)

	if err != nil {
		log.Print(err)
	}

	response.Status = 200
	response.Message = "Update data successfully"
	fmt.Print("Update data successfully")

	w.Header().Set("Content-Type", "application/json")
	w.Header().Set("Access-Control-Allow-Origin", "*")
	json.NewEncoder(w).Encode(response)
}

// DeleteUser = Delete User API
func DeleteUser(w http.ResponseWriter, r *http.Request) {
	var response model.UserResponse

	db := config.Connect()
	defer db.Close()

	err := r.ParseMultipartForm(4096)

	if err != nil {
		panic(err)
	}

	id := r.FormValue("id")

	_, err = db.Exec("DELETE FROM users WHERE id=?", id)

	if err != nil {
		log.Print(err)
		return
	}

	response.Status = 200
	response.Message = "Delete data successfully"
	fmt.Print("Delete data successfully")

	w.Header().Set("Content-Type", "application/json")
	w.Header().Set("Access-Control-Allow-Origin", "*")
	json.NewEncoder(w).Encode(response)
}

// AllRequests = Select Request API
func AllRequests(w http.ResponseWriter, r *http.Request) {
	var requests model.Requests
	var response model.RequestsResponse
	var arrRequests []model.Requests

	db := config.Connect()
	defer db.Close()

	rows, err := db.Query("SELECT leaveId, startDate, endDate, userId, status, requestType from holiday")

	if err != nil {
		log.Print(err)
	}

	for rows.Next() {
		err = rows.Scan(&requests.LeaveId, &requests.StartDate, &requests.EndDate, &requests.UserId, &requests.Status, &requests.RequestType)
		if err != nil {
			log.Fatal(err.Error())
		} else {
			arrRequests = append(arrRequests, requests)
		}
	}

	response.Status = 200
	response.Message = "Success"
	response.Data = arrRequests

	w.Header().Set("Content-Type", "application/json")
	w.Header().Set("Access-Control-Allow-Origin", "*")
	json.NewEncoder(w).Encode(response)
}

// GetRequestByLeaveId = Select Request by Id API
func GetRequestbyLeaveId(w http.ResponseWriter, r *http.Request) {
	var requests model.Requests
	var response model.RequestsResponse
	var arrRequests []model.Requests

	db := config.Connect()
	defer db.Close()

	leaveId := r.FormValue("leaveId")

	rows, err := db.Query("SELECT leaveId, startDate, endDate, userId, status, requestType from holiday WHERE leaveId=?", leaveId)

	if err != nil {
		log.Print(err)
	}

	for rows.Next() {
		err = rows.Scan(&requests.LeaveId, &requests.StartDate, &requests.EndDate, &requests.UserId, &requests.Status, &requests.RequestType)
		if err != nil {
			log.Fatal(err.Error())
		} else {
			arrRequests = append(arrRequests, requests)
		}
	}

	response.Status = 200
	response.Message = "Success"
	response.Data = arrRequests

	w.Header().Set("Content-Type", "application/json")
	w.Header().Set("Access-Control-Allow-Origin", "*")
	json.NewEncoder(w).Encode(response)
}

// GetRequestByUserId = Select Request by Id API
func GetRequestbyUserId(w http.ResponseWriter, r *http.Request) {
	var requests model.Requests
	var response model.RequestsResponse
	var arrRequests []model.Requests

	db := config.Connect()
	defer db.Close()

	userId := r.FormValue("userId")

	rows, err := db.Query("SELECT leaveId, startDate, endDate, userId, status, requestType from holiday WHERE userId=?", userId)

	if err != nil {
		log.Print(err)
	}

	for rows.Next() {
		err = rows.Scan(&requests.LeaveId, &requests.StartDate, &requests.EndDate, &requests.UserId, &requests.Status, &requests.RequestType)
		if err != nil {
			log.Fatal(err.Error())
		} else {
			arrRequests = append(arrRequests, requests)
		}
	}

	response.Status = 200
	response.Message = "Success"
	response.Data = arrRequests

	w.Header().Set("Content-Type", "application/json")
	w.Header().Set("Access-Control-Allow-Origin", "*")
	json.NewEncoder(w).Encode(response)
}

// GetApprovedRequestByUserId = Select Request by Id where status = apprved API
func GetApprovedRequestbyUserId(w http.ResponseWriter, r *http.Request) {
	var requests model.Requests
	var response model.RequestsResponse
	var arrRequests []model.Requests

	db := config.Connect()
	defer db.Close()

	userId := r.FormValue("userId")

	rows, err := db.Query("SELECT leaveId, startDate, endDate, userId, status, requestType from holiday WHERE status=Approved AND userId=?", userId)

	if err != nil {
		log.Print(err)
	}

	for rows.Next() {
		err = rows.Scan(&requests.LeaveId, &requests.StartDate, &requests.EndDate, &requests.UserId, &requests.Status, &requests.RequestType)
		if err != nil {
			log.Fatal(err.Error())
		} else {
			arrRequests = append(arrRequests, requests)
		}
	}

	response.Status = 200
	response.Message = "Success"
	response.Data = arrRequests

	w.Header().Set("Content-Type", "application/json")
	w.Header().Set("Access-Control-Allow-Origin", "*")
	json.NewEncoder(w).Encode(response)
}

// InsertRequest = Insert Request API
func Insertrequest(w http.ResponseWriter, r *http.Request) {
	var response model.RequestsResponse

	db := config.Connect()
	defer db.Close()

	err := r.ParseMultipartForm(4096)
	if err != nil {
		panic(err)
	}
	startDate := r.FormValue("startDate")
	endDate := r.FormValue("endDate")
	userId := r.FormValue("userId")
	status := r.FormValue("status")
	requestType := r.FormValue("requestType")

	_, err = db.Exec("INSERT INTO holiday(startDate, endDate, userId, status, requestType) VALUES(?, ?, ?, ?, ?)", startDate, endDate, userId, status, requestType)

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

// UpdateRequest = Update Request API
func UpdateRequest(w http.ResponseWriter, r *http.Request) {
	var response model.RequestsResponse

	if r.Method == "OPTIONS" {
		response.Status = 200
	}

	if r.Method == "PUT" {
		db := config.Connect()
		defer db.Close()

		err := r.ParseMultipartForm(4096)

		if err != nil {
			panic(err)
		}
		leaveId := r.FormValue("leaveId")
		status := r.FormValue("status")
		requestType := r.FormValue("requestType")

		_, err = db.Exec("UPDATE holiday SET status=?, requestType=? WHERE leaveId=?", status, requestType, leaveId)

		if err != nil {
			log.Print(err)
		}

		response.Status = 200
		response.Message = "Update data successfully"
		fmt.Print("Update data successfully")

		w.Header().Set("Content-Type", "application/json")
		json.NewEncoder(w).Encode(response)
	}
}

// DeleteRequest = Delete Request API
func DeleteRequest(w http.ResponseWriter, r *http.Request) {
	var response model.RequestsResponse

	if r.Method == "OPTIONS" {
		response.Status = 200
	}

	if r.Method == "DELETE" {
		w.WriteHeader(http.StatusOK)

		db := config.Connect()
		defer db.Close()

		err := r.ParseMultipartForm(4096)

		if err != nil {
			panic(err)
		}

		leaveId := r.FormValue("leaveId")

		_, err = db.Exec("DELETE FROM holiday WHERE leaveId=?", leaveId)

		if err != nil {
			log.Print(err)
			return
		}

	}

	response.Status = 200
	response.Message = "Delete data successfully"
	fmt.Print("Delete data successfully")

	w.Header().Set("Content-Type", "application/json")
	w.Header().Set("Access-Control-Allow-Origin", "http://localhost:3000")
	json.NewEncoder(w).Encode(response)
}

// GetRequestsByManagerId = Get all requests by manager id
func GetRequestsByManagerId(w http.ResponseWriter, r *http.Request) {
	var requests model.TeamLeave
	var response model.TeamLeaveResponse
	var arrRequests []model.TeamLeave

	db := config.Connect()
	defer db.Close()

	id := r.FormValue("users.managerId")
	status := r.FormValue("holiday.status")

	rows, err := db.Query(`SELECT holiday.leaveId, holiday.startDate, holiday.endDate, holiday.status, holiday.requestType, holiday.userId, users.managerId FROM holiday  LEFT JOIN users ON holiday.userId = users.id WHERE users.managerId =? AND holiday.status =? `, id, status)

	if err != nil {
		log.Print(err)
	}

	for rows.Next() {
		err = rows.Scan(&requests.LeaveId, &requests.StartDate, &requests.EndDate, &requests.Status, &requests.RequestType, &requests.UserId, &requests.ManagerId)
		if err != nil {
			log.Fatal(err.Error())
		} else {
			arrRequests = append(arrRequests, requests)
		}
	}

	response.Status = 200
	response.Message = "Success"
	response.Data = arrRequests

	w.Header().Set("Content-Type", "application/json")
	w.Header().Set("Access-Control-Allow-Origin", "*")
	json.NewEncoder(w).Encode(response)
}
