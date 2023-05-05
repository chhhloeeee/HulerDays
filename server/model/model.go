package model

type User struct {
	Id        string `json:"id"`
	Email     string `json:"email"`
	Password  string `json:"password"`
	Holiday   int    `json:"holiday"`
	IsManager bool   `json:"isManager"`
	ManagerId int    `json:"managerId"`
}

type UserResponse struct {
	Status  int    `json:"status"`
	Message string `json:"message"`
	Data    []User
}

type Requests struct {
	LeaveId     int    `form:"leaveId" json:"leaveId"`
	StartDate   string `form:"startDate" json:"startDate"`
	EndDate     string `form:"endDate" json:"endDate"`
	UserId      int    `form:"userId" json:"userId"`
	Status      string `form:"status" json:"status"`
	RequestType string `form:"requestType" json:"requestType"`
}

type RequestsResponse struct {
	Status  int    `json:"status"`
	Message string `json:"message"`
	Data    []Requests
}
