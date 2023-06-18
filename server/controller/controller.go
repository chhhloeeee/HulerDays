package controller

import (
	"context"
	"database/sql"
	"encoding/json"
	"errors"
	"fmt"
	"log"
	"net/http"

	"github.com/HulerDays/model"
	"github.com/google/uuid"
)

var DB *sql.DB

// AllUsers = Select User API
func AllUsers(w http.ResponseWriter, r *http.Request) {
	var users model.Users
	var response model.UserResponse
	var arrUsers []model.Users

	rows, err := DB.Query("SELECT id, email, password, holiday, isManager, managerId from users")

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
	tkn := GetTokenFromRequest(r)
	fmt.Println(tkn)

	var users model.Users
	var response model.UserResponse
	var arrUsers []model.Users

	id := r.FormValue("id")

	rows, err := DB.Query("SELECT id, email, password, holiday, isManager, managerId from users WHERE id=?", id)

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

type ContextString string

// AuthenticationContext adds the sent user token - if there is one - to the request context.
// this saves implementing the lookup code in requests that require aurthentication
func AuthenticationContext(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		var ctx = r.Context()
		tkn := GetTokenFromRequest(r)

		user, usererr := GetUserByToken(tkn)
		if usererr != nil {
			log.Println("Received error from authentication service, trying to authenticate with :", tkn)

		}
		ctx = context.WithValue(ctx, ContextString("userinfo"), user)
		next.ServeHTTP(w, r.WithContext(ctx))

	})
}

func GetUserFromRequest(r *http.Request) model.Users {
	return r.Context().Value(ContextString("userinfo")).(model.Users)
}

// RemoveUserToken

// GetUserById = Select User by Id API
func GetUserByToken(token string) (model.Users, error) {

	var users model.Users
	if token == "" {
		return users, errors.New("no token provided")
	}
	row := DB.QueryRow("SELECT id, email, holiday, isManager, managerId from users WHERE accessToken=?", token)

	err := row.Scan(&users.Id, &users.Email, &users.Holiday, &users.IsManager, &users.ManagerId)
	if err != nil {
		fmt.Println("Error checking token.", err.Error())
		return users, errors.New("could not authenticate token")
	}
	return users, nil
}

// InsertUser = Insert User API
func InsertUser(w http.ResponseWriter, r *http.Request) {
	var response model.UserResponse

	err := r.ParseMultipartForm(4096)
	if err != nil {
		panic(err)
	}
	email := r.FormValue("email")
	password := r.FormValue("password")
	holiday := r.FormValue("holiday")
	isManager := r.FormValue("isManager")
	managerId := r.FormValue("managerId")

	_, err = DB.Exec("INSERT INTO users(email, password, holiday, isManager, managerId) VALUES(?, ?, ?, ?, ?)", email, password, holiday, isManager, managerId)

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

	_, err = DB.Exec("UPDATE users SET email=?, password=?, holiday=?, isManager=?, managerId=? WHERE id=?", email, password, holiday, isManager, managerId, id)

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

	err := r.ParseMultipartForm(4096)

	if err != nil {
		panic(err)
	}

	id := r.FormValue("id")

	_, err = DB.Exec("DELETE FROM users WHERE id=?", id)

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

	rows, err := DB.Query("SELECT leaveId, startDate, endDate, userId, status, requestType from holiday")

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

	leaveId := r.FormValue("leaveId")

	rows, err := DB.Query("SELECT leaveId, startDate, endDate, userId, status, requestType from holiday WHERE leaveId=?", leaveId)

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

	userId := r.FormValue("userId")

	rows, err := DB.Query("SELECT leaveId, startDate, endDate, userId, status, requestType from holiday WHERE userId=?", userId)

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

	userId := r.FormValue("userId")

	rows, err := DB.Query("SELECT leaveId, startDate, endDate, userId, status, requestType from holiday WHERE status='Approved' AND userId=?", userId)

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

// Logout handles an incoming login request
func Logout(w http.ResponseWriter, r *http.Request) {

	user := GetUserFromRequest(r)
	fmt.Println(user)
	if user.Email != "" {
		qry := "UPDATE users SET accessToken = null WHERE id = ?"
		_, err := DB.Exec(qry, user.Id)
		if err != nil {
			fmt.Println(err.Error())
		}
	}

	json.NewEncoder(w).Encode(user)

}

// Login handles an incoming login request
func Login(w http.ResponseWriter, r *http.Request) {
	var uid string
	var pwd string
	if r.Method == "POST" {

		err := r.ParseMultipartForm(4096)
		if err != nil {
			panic(err)
		}
		uid = r.FormValue("uid")
		pwd = r.FormValue("pwd")
	}
	if r.Method == "GET" {
		uid = r.URL.Query().Get("uid")
		pwd = r.URL.Query().Get("pwd")
	}
	if uid == "" || pwd == "" {
		fmt.Println("Login Error. Empty username and/or password")
		w.WriteHeader(http.StatusUnauthorized)
		return

	}

	qry := "SELECT password from users WHERE email = ?"
	row := DB.QueryRow(qry, uid)
	var dbpwd sql.NullString
	err := row.Scan(&dbpwd)
	if err != nil {
		//We don't provide any further info if a login request fails
		//we just return "Unauth" but we do fmt.Println the error for logging
		fmt.Println("Login Error for user", uid, " error was: ", err.Error())
		w.WriteHeader(http.StatusUnauthorized)
		return
	}
	if !dbpwd.Valid {
		//We don't provide any further info if a login request fails
		//we just return "Unauth" but we do fmt.Println the error for logging
		fmt.Println("Login Error for user", uid, " Password is null in DB")
		w.WriteHeader(http.StatusUnauthorized)
		return
	}
	if pwd != dbpwd.String {
		//We don't provide any further info if a login request fails
		//we just return "Unauth" but we do fmt.Println the error for logging
		fmt.Println("Login Error for user", uid, " incorrect password")
		w.WriteHeader(http.StatusUnauthorized)
		return
	}
	tkn := uuid.New()

	qry = "UPDATE users SET accessToken = ? WHERE email = ?"

	_, err = DB.Exec(qry, tkn.String(), uid)
	if err != nil {
		//We don't provide any further info if a login request fails
		//we just return "Unauth" but we do fmt.Println the error for logging
		fmt.Println("Login Error for user", uid, " failed to update token")
		w.WriteHeader(http.StatusUnauthorized)
		return
	}

	if err != nil {
		log.Print(err)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	w.Header().Set("Access-Control-Allow-Origin", "*")
	json.NewEncoder(w).Encode(model.LoginResponse{
		Status: 200,
		Token:  tkn.String(),
	})

}

// InsertRequest = Insert Request API
func Insertrequest(w http.ResponseWriter, r *http.Request) {
	var response model.RequestsResponse

	err := r.ParseMultipartForm(4096)
	if err != nil {
		panic(err)
	}
	startDate := r.FormValue("startDate")
	endDate := r.FormValue("endDate")
	userId := r.FormValue("userId")
	status := r.FormValue("status")
	requestType := r.FormValue("requestType")

	_, err = DB.Exec("INSERT INTO holiday(startDate, endDate, userId, status, requestType) VALUES(?, ?, ?, ?, ?)", startDate, endDate, userId, status, requestType)

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

		err := r.ParseMultipartForm(4096)

		if err != nil {
			panic(err)
		}
		leaveId := r.FormValue("leaveId")
		status := r.FormValue("status")
		requestType := r.FormValue("requestType")

		_, err = DB.Exec("UPDATE holiday SET status=?, requestType=? WHERE leaveId=?", status, requestType, leaveId)

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

		err := r.ParseMultipartForm(4096)

		if err != nil {
			panic(err)
		}

		leaveId := r.FormValue("leaveId")

		_, err = DB.Exec("DELETE FROM holiday WHERE leaveId=?", leaveId)

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

	id := r.FormValue("users.managerId")
	status := r.FormValue("holiday.status")

	rows, err := DB.Query(`SELECT holiday.leaveId, holiday.startDate, holiday.endDate, holiday.status, holiday.requestType, holiday.userId, users.managerId, users.email FROM holiday  LEFT JOIN users ON holiday.userId = users.id WHERE users.managerId =? AND holiday.status =? `, id, status)

	if err != nil {
		log.Print(err)
	}

	for rows.Next() {
		err = rows.Scan(&requests.LeaveId, &requests.StartDate, &requests.EndDate, &requests.Status, &requests.RequestType, &requests.UserId, &requests.ManagerId, &requests.Email)
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

// AddHolidayDays = Update holiday days API
func AddHolidayDays(w http.ResponseWriter, r *http.Request) {
	var response model.RequestsResponse

	if r.Method == "OPTIONS" {
		response.Status = 200
	}

	if r.Method == "PUT" {

		err := r.ParseMultipartForm(4096)

		if err != nil {
			panic(err)
		}
		id := r.FormValue("id")
		days := r.FormValue("days")

		_, err = DB.Exec("UPDATE users SET holiday = holiday + ? WHERE id = ?", days, id)

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

// RemoveHolidayDays = Update holiday days API
func RemoveHolidayDays(w http.ResponseWriter, r *http.Request) {
	var response model.RequestsResponse
	fmt.Println("HERE")

	if r.Method == "PUT" || r.Method == "GET" {

		err := r.ParseMultipartForm(4096)

		if err != nil {
			panic(err)
		}
		id := r.FormValue("id")
		days := r.FormValue("days")
		//daysInt, _ := strconv.Atoi(days)
		fmt.Println("Here")

		//leaveErr := CheckLeave(daysInt, users.Holiday)

		//if leaveErr != nil {
		//	fmt.Println(leaveErr)
		//	response.Status = 400
		//	response.Message = "MAJOR ERR"
		//	return
		//}
		_, err = DB.Exec("UPDATE users SET holiday = holiday - ? WHERE id = ?", days, id)

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
func GetTokenFromRequest(r *http.Request) string {
	var tmptoken string
	tmptoken = r.Header.Get("AUTH-TOKEN")
	if tmptoken != "" {
		return tmptoken
	}
	tmptoken = r.URL.Query().Get("token")
	if tmptoken != "" {
		return tmptoken
	}
	return tmptoken
}
