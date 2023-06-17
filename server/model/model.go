package model

type Users struct {
	Id        int    `form:"id" json:"id"`
	Email     string `form:"email" json:"email"`
	Password  string `form:"password" json:"password"`
	Holiday   int    `form:"holiday" json:"holiday"`
	IsManager bool   `form:"isManager" json:"isManager"`
	ManagerId int    `form:"managerID" json:"managerId"`
}

type UserResponse struct {
	Status  int    `json:"status"`
	Message string `json:"message"`
	Data    []Users
}

type Requests struct {
	LeaveId     int    `form:"leaveId" json:"leaveId"`
	StartDate   string `form:"startDate" json:"startDate"`
	EndDate     string `form:"endDate" json:"endDate"`
	UserId      int    `form:"userId" json:"userId"`
	Status      string `form:"status" json:"status"`
	RequestType string `form:"requestType" json:"requestType"`
}

type TeamLeave struct {
	LeaveId     int    `form:"leaveId" json:"leaveId"`
	StartDate   string `form:"startDate" json:"startDate"`
	EndDate     string `form:"endDate" json:"endDate"`
	UserId      int    `form:"userId" json:"userId"`
	Status      string `form:"status" json:"status"`
	RequestType string `form:"requestType" json:"requestType"`
	ManagerId   int    `form:"managerID" json:"managerId"`
	Email       string `form:"email" json:"email"`
}

type RequestsResponse struct {
	Status  int    `json:"status"`
	Message string `json:"message"`
	Data    []Requests
}

type TeamLeaveResponse struct {
	Status  int    `json:"status"`
	Message string `json:"message"`
	Data    []TeamLeave
}
