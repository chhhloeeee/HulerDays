package config

import (
	"database/sql"
	"fmt"
	"os"
)

func Connect() *sql.DB {
	dbDriver := "mysql"
	dbUser := "root"
	dbPass := "ChloeBaker1!"
	dbName := "HulerDays"

	dsn := os.Getenv("MYSQL_WRITEDSN")
	fmt.Println(dsn)
	if dsn == "" {
		dsn = dbUser + ":" + dbPass + "@/" + dbName
	}

	db, err := sql.Open(dbDriver, dsn)
	if err != nil {
		panic(err.Error())
	}
	return db
}
