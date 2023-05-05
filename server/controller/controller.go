package controller

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"net/http"

	"github.com/HulerDays/config"
	"github.com/HulerDays/model"
	"github.com/gorilla/mux"
)

func GetUsers(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	var users []model.User

	db := config.Connect()
	defer db.Close()

	result, err := db.Query("SELECT id, email, password, holiday, isManager, managerId from users")
	if err != nil {
		panic(err.Error())
	}

	defer result.Close()

	for result.Next() {
		var user model.User
		err := result.Scan(&user.Id, &user.Email, &user.Password, &user.Holiday, &user.IsManager, &user.ManagerId)
		if err != nil {
			panic(err.Error())
		}
		users = append(users, user)
	}
	json.NewEncoder(w).Encode(users)
}

func CreateUser(w http.ResponseWriter, r *http.Request) {

	db := config.Connect()
	defer db.Close()

	stmt, err := db.Prepare("INSERT INTO users(email, password, holiday, isManager, managerId) VALUES(?, ?, ?, ?, ?)")
	if err != nil {
		panic(err.Error())
	}
	body, err := ioutil.ReadAll(r.Body)
	if err != nil {
		panic(err.Error())
	}
	keyVal := make(map[string]any)
	json.Unmarshal(body, &keyVal)
	email := keyVal["email"]
	password := keyVal["password"]
	holiday := keyVal["holiday"]
	isManager := keyVal["isManager"]
	managerId := keyVal["managerId"]
	_, err = stmt.Exec(email, password, holiday, isManager, managerId)
	if err != nil {
		panic(err.Error())
	}
	fmt.Fprintf(w, "New user was created")
}

func GetUser(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	params := mux.Vars(r)

	db := config.Connect()
	defer db.Close()

	result, err := db.Query("SELECT id, email, password, holiday, isManager, managerId FROM users WHERE id = ?", params["id"])
	if err != nil {
		panic(err.Error())
	}
	defer result.Close()
	var user model.User
	for result.Next() {
		err := result.Scan(&user.Id, &user.Email, &user.Password, &user.Holiday, &user.IsManager, &user.ManagerId)
		if err != nil {
			panic(err.Error())
		}
	}
	json.NewEncoder(w).Encode(user)
}

func UpdateUser(w http.ResponseWriter, r *http.Request) {
	params := mux.Vars(r)

	db := config.Connect()
	defer db.Close()

	stmt, err := db.Prepare("UPDATE users SET email = ?, password = ?, holiday = ?, isManager = ?, managerId = ? WHERE id = ?")
	if err != nil {
		panic(err.Error())
	}
	body, err := ioutil.ReadAll(r.Body)
	if err != nil {
		panic(err.Error())
	}
	keyVal := make(map[string]any)
	json.Unmarshal(body, &keyVal)
	newEmail := keyVal["email"]
	newPassword := keyVal["password"]
	newHoliday := keyVal["holiday"]
	newIsManager := keyVal["isManager"]
	newManagerId := keyVal["managerId"]
	_, err = stmt.Exec(newEmail, newPassword, newHoliday, newIsManager, newManagerId, params["id"])
	if err != nil {
		panic(err.Error())
	}
	fmt.Fprintf(w, "Post with ID = %s was updated", params["id"])
}

func DeleteUser(w http.ResponseWriter, r *http.Request) {
	params := mux.Vars(r)

	db := config.Connect()
	defer db.Close()

	stmt, err := db.Prepare("DELETE FROM users WHERE id = ?")
	if err != nil {
		panic(err.Error())
	}
	_, err = stmt.Exec(params["id"])
	if err != nil {
		panic(err.Error())
	}
	fmt.Fprintf(w, "Post with ID = %s was deleted", params["id"])
}

// // AllUsers = Select User API
// func AllUsers(w http.ResponseWriter, r *http.Request) {
// 	var users model.User
// 	var response model.UserResponse
// 	var arrUsers []model.User

// 	db := config.Connect()
// 	defer db.Close()

// 	rows, err := db.Query("SELECT id, email, password, holiday, isManager, managerId from users")

// 	if err != nil {
// 		log.Print(err)
// 	}

// 	for rows.Next() {
// 		err = rows.Scan(&users.Id, &users.Email, &users.Password, &users.Holiday, &users.IsManager, &users.ManagerId)
// 		if err != nil {
// 			log.Fatal(err.Error())
// 		} else {
// 			arrUsers = append(arrUsers, users)
// 		}
// 	}

// 	response.Status = 200
// 	response.Message = "Success"
// 	response.Data = arrUsers

// 	w.Header().Set("Content-Type", "application/json")
// 	w.Header().Set("Access-Control-Allow-Origin", "*")
// 	json.NewEncoder(w).Encode(response)
// }

// func ReturnAllUsers(w http.ResponseWriter, r *http.Request) {
// 	var response model.UserResponse
// 	fmt.Println("Endpoint Hit: returnAllUsers")
// 	json.NewEncoder(w).Encode(response)
// }

// // GetUserById = Select User by Id API
// func GetUserById(w http.ResponseWriter, r *http.Request) {
// 	var response model.UserResponse
// 	vars := mux.Vars(r)
// 	key := vars["id"]

// 	for _, user := range response.Data {
// 		if user.Id == key {
// 			json.NewEncoder(w).Encode(user)
// 		}

// 	}

// }

// // InsertUser = Insert User API
// func InsertUser(w http.ResponseWriter, r *http.Request) {
// 	var response model.UserResponse

// 	db := config.Connect()
// 	defer db.Close()

// 	err := r.ParseMultipartForm(4096)
// 	if err != nil {
// 		panic(err)
// 	}
// 	email := r.FormValue("email")
// 	password := r.FormValue("password")
// 	holiday := r.FormValue("holiday")
// 	isManager := r.FormValue("isManager")
// 	managerId := r.FormValue("managerId")

// 	_, err = db.Exec("INSERT INTO users(email, password, holiday, isManager, managerId) VALUES(?, ?, ?, ?, ?)", email, password, holiday, isManager, managerId)

// 	if err != nil {
// 		log.Print(err)
// 		return
// 	}
// 	response.Status = 200
// 	response.Message = "Insert data successfully"
// 	fmt.Print("Insert data to database")

// 	w.Header().Set("Content-Type", "application/json")
// 	w.Header().Set("Access-Control-Allow-Origin", "*")
// 	json.NewEncoder(w).Encode(response)
// }

// // UpdateUser = Update User API
// func UpdateUser(w http.ResponseWriter, r *http.Request) {
// 	var response model.UserResponse

// 	db := config.Connect()
// 	defer db.Close()

// 	err := r.ParseMultipartForm(4096)

// 	if err != nil {
// 		panic(err)
// 	}
// 	id := r.FormValue("id")
// 	email := r.FormValue("email")
// 	password := r.FormValue("password")
// 	holiday := r.FormValue("holiday")
// 	isManager := r.FormValue("isManager")
// 	managerId := r.FormValue("managerId")

// 	_, err = db.Exec("UPDATE users SET email=?, password=?, holiday=?, isManager=?, managerId=? WHERE id=?", email, password, holiday, isManager, managerId, id)

// 	if err != nil {
// 		log.Print(err)
// 	}

// 	response.Status = 200
// 	response.Message = "Update data successfully"
// 	fmt.Print("Update data successfully")

// 	w.Header().Set("Content-Type", "application/json")
// 	json.NewEncoder(w).Encode(response)
// }

// // DeleteUser = Delete User API
// func DeleteUser(w http.ResponseWriter, r *http.Request) {
// 	var response model.UserResponse

// 	db := config.Connect()
// 	defer db.Close()

// 	err := r.ParseMultipartForm(4096)

// 	if err != nil {
// 		panic(err)
// 	}

// 	id := r.FormValue("id")

// 	_, err = db.Exec("DELETE FROM employee WHERE id=?", id)

// 	if err != nil {
// 		log.Print(err)
// 		return
// 	}

// 	response.Status = 200
// 	response.Message = "Delete data successfully"
// 	fmt.Print("Delete data successfully")

// 	w.Header().Set("Content-Type", "application/json")
// 	json.NewEncoder(w).Encode(response)
// }

// // AllRequests = Select Request API
// func AllRequests(w http.ResponseWriter, r *http.Request) {
// 	var requests model.Requests
// 	var response model.RequestsResponse
// 	var arrRequests []model.Requests

// 	db := config.Connect()
// 	defer db.Close()

// 	rows, err := db.Query("SELECT leaveId, startDate, endDate, userId, status, requestType from holiday")

// 	if err != nil {
// 		log.Print(err)
// 	}

// 	for rows.Next() {
// 		err = rows.Scan(&requests.LeaveId, &requests.StartDate, &requests.EndDate, &requests.UserId, &requests.Status, &requests.RequestType)
// 		if err != nil {
// 			log.Fatal(err.Error())
// 		} else {
// 			arrRequests = append(arrRequests, requests)
// 		}
// 	}

// 	response.Status = 200
// 	response.Message = "Success"
// 	response.Data = arrRequests

// 	w.Header().Set("Content-Type", "application/json")
// 	w.Header().Set("Access-Control-Allow-Origin", "*")
// 	json.NewEncoder(w).Encode(response)
// }

// // GetRequestByLeaveId = Select Request by Id API
// func GetRequestbyLeaveId(w http.ResponseWriter, r *http.Request) {
// 	var requests model.Requests
// 	var response model.RequestsResponse
// 	var arrRequests []model.Requests

// 	db := config.Connect()
// 	defer db.Close()

// 	leaveId := r.FormValue("leaveId")

// 	rows, err := db.Query("SELECT leaveId, startDate, endDate, userId, status, requestType from holiday WHERE leaveId=?", leaveId)

// 	if err != nil {
// 		log.Print(err)
// 	}

// 	for rows.Next() {
// 		err = rows.Scan(&requests.LeaveId, &requests.StartDate, &requests.EndDate, &requests.UserId, &requests.Status, &requests.RequestType)
// 		if err != nil {
// 			log.Fatal(err.Error())
// 		} else {
// 			arrRequests = append(arrRequests, requests)
// 		}
// 	}

// 	response.Status = 200
// 	response.Message = "Success"
// 	response.Data = arrRequests

// 	w.Header().Set("Content-Type", "application/json")
// 	w.Header().Set("Access-Control-Allow-Origin", "*")
// 	json.NewEncoder(w).Encode(response)
// }

// // GetRequestByUserId = Select Request by Id API
// func GetRequestbyUserId(w http.ResponseWriter, r *http.Request) {
// 	var requests model.Requests
// 	var response model.RequestsResponse
// 	var arrRequests []model.Requests

// 	db := config.Connect()
// 	defer db.Close()

// 	userId := r.FormValue("userId")

// 	rows, err := db.Query("SELECT leaveId, startDate, endDate, userId, status, requestType from holiday WHERE userId=?", userId)

// 	if err != nil {
// 		log.Print(err)
// 	}

// 	for rows.Next() {
// 		err = rows.Scan(&requests.LeaveId, &requests.StartDate, &requests.EndDate, &requests.UserId, &requests.Status, &requests.RequestType)
// 		if err != nil {
// 			log.Fatal(err.Error())
// 		} else {
// 			arrRequests = append(arrRequests, requests)
// 		}
// 	}

// 	response.Status = 200
// 	response.Message = "Success"
// 	response.Data = arrRequests

// 	w.Header().Set("Content-Type", "application/json")
// 	w.Header().Set("Access-Control-Allow-Origin", "*")
// 	json.NewEncoder(w).Encode(response)
// }

// // InsertRequest = Insert Request API
// func Insertrequest(w http.ResponseWriter, r *http.Request) {
// 	var response model.RequestsResponse

// 	db := config.Connect()
// 	defer db.Close()

// 	err := r.ParseMultipartForm(4096)
// 	if err != nil {
// 		panic(err)
// 	}
// 	startDate := r.FormValue("startDate")
// 	endDate := r.FormValue("endDate")
// 	userId := r.FormValue("userId")
// 	status := r.FormValue("status")
// 	requestType := r.FormValue("requestType")

// 	_, err = db.Exec("INSERT INTO holiday(startDate, endDate, userId, status, requestType) VALUES(?, ?, ?, ?, ?)", startDate, endDate, userId, status, requestType)

// 	if err != nil {
// 		log.Print(err)
// 		return
// 	}
// 	response.Status = 200
// 	response.Message = "Insert data successfully"
// 	fmt.Print("Insert data to database")

// 	w.Header().Set("Content-Type", "application/json")
// 	w.Header().Set("Access-Control-Allow-Origin", "*")
// 	json.NewEncoder(w).Encode(response)
// }

// // UpdateRequest = Update Request API
// func UpdateRequest(w http.ResponseWriter, r *http.Request) {
// 	var response model.RequestsResponse

// 	db := config.Connect()
// 	defer db.Close()

// 	err := r.ParseMultipartForm(4096)

// 	if err != nil {
// 		panic(err)
// 	}
// 	leaveId := r.FormValue("leaveId")
// 	startDate := r.FormValue("startDate")
// 	endDate := r.FormValue("endDate")
// 	userId := r.FormValue("userId")
// 	status := r.FormValue("status")
// 	requestType := r.FormValue("requestType")

// 	_, err = db.Exec("UPDATE holiday SET startDate=?, endDate=?, userId=?, status=?, requestType=? WHERE leaveId=?", startDate, endDate, userId, status, requestType, leaveId)

// 	if err != nil {
// 		log.Print(err)
// 	}

// 	response.Status = 200
// 	response.Message = "Update data successfully"
// 	fmt.Print("Update data successfully")

// 	w.Header().Set("Content-Type", "application/json")
// 	json.NewEncoder(w).Encode(response)
// }

// // DeleteRequest = Delete Request API
// func DeleteRequest(w http.ResponseWriter, r *http.Request) {
// 	var response model.RequestsResponse

// 	db := config.Connect()
// 	defer db.Close()

// 	err := r.ParseMultipartForm(4096)

// 	if err != nil {
// 		panic(err)
// 	}

// 	leaveId := r.FormValue("leaveId")

// 	_, err = db.Exec("DELETE FROM holidays WHERE leaveId=?", leaveId)

// 	if err != nil {
// 		log.Print(err)
// 		return
// 	}

// 	response.Status = 200
// 	response.Message = "Delete data successfully"
// 	fmt.Print("Delete data successfully")

// 	w.Header().Set("Content-Type", "application/json")
// 	json.NewEncoder(w).Encode(response)
// }
