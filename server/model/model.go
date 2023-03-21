package model

type Users struct {
	Id        string `form:"id" json:"id"`
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
